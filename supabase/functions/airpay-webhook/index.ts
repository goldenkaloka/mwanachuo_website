import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// CRC32 implementation for Deno
const _crc32Table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  _crc32Table[i] = c;
}

function crc32(str: string): string {
  const buf = new TextEncoder().encode(str);
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ _crc32Table[(crc ^ buf[i]) & 0xFF];
  }
  return ((crc ^ 0xFFFFFFFF) >>> 0).toString(10);
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Form data parsing
    let payload;
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
        const formData = await req.formData();
        payload = Object.fromEntries(formData.entries());
    } else {
        payload = await req.json();
    }
    
    console.log('AirPay Webhook Received:', JSON.stringify(payload, null, 2))

    const { 
      TRANSACTIONID, 
      APTRANSACTIONID, 
      AMOUNT, 
      TRANSACTIONSTATUS, 
      MESSAGE, 
      ap_SecureHash,
      CUSTOMVAR
    } = payload

    if (!TRANSACTIONID) throw new Error('Missing TRANSACTIONID')

    // Get AirPay credentials from app_secrets
    const { data: secretData, error: secretError } = await supabaseClient
      .from('app_secrets')
      .select('key, value')
      .in('key', ['airpay_merchant_id', 'airpay_username'])

    if (secretError) throw secretError
    
    const secrets: any = {}
    secretData.forEach((s: any) => secrets[s.key] = s.value)

    const MID = secrets.airpay_merchant_id || '';
    const USERNAME = secrets.airpay_username || '';

    // Validate Signature
    // CRC32 of: TRANSACTIONID. : .APTRANSACTIONID. : .AMOUNT. : .TRANSACTIONSTATUS. : .MESSAGE. : .MID. : .USERNAME
    const hashString = `${TRANSACTIONID}:${APTRANSACTIONID}:${AMOUNT}:${TRANSACTIONSTATUS}:${MESSAGE}:${MID}:${USERNAME}`;
    const calculatedHash = crc32(hashString);

    if (calculatedHash !== ap_SecureHash) {
        console.error(`Hash mismatch: calculated ${calculatedHash}, received ${ap_SecureHash}`);
        throw new Error('Invalid signature');
    }

    // 1. Find the order
    const { data: order, error: orderErr } = await supabaseClient
      .from('airpay_orders')
      .select('*')
      .eq('order_id', TRANSACTIONID)
      .single()

    if (orderErr) {
        console.error("Order error", orderErr);
        throw new Error('Order lookup failed');
    }
    if (!order) {
        throw new Error('Order not found')
    }

    // Only process if status is 200 (Success)
    if (TRANSACTIONSTATUS === '200') {
      
      // Update order status if not already completed
      if (order.status !== 'completed') {
          // Process based on type (e.g., wallet credit)
          let customVars: any = {};
          try {
             customVars = typeof CUSTOMVAR === 'string' ? JSON.parse(CUSTOMVAR) : CUSTOMVAR;
          } catch(e) {
             console.log("Could not parse CUSTOMVAR", CUSTOMVAR);
          }

          if (customVars?.type === 'wallet_topup' || order.type === 'wallet_topup' || !order.type || order.type === 'pg') {
             // Top up Wallet
             const { error: creditError } = await supabaseClient.rpc('credit_wallet_balance', {
                 p_user_id: order.user_id,
                 p_amount: order.amount,
                 p_order_id: TRANSACTIONID,
                 p_description: 'Wallet top-up via AirPay'
             })
             
             if (creditError) {
                 console.error("Credit error", creditError);
                 throw creditError;
             }
          }

          await supabaseClient
            .from('airpay_orders')
            .update({ 
               status: 'completed', 
               ap_transaction_id: APTRANSACTIONID,
               updated_at: new Date().toISOString() 
            })
            .eq('order_id', TRANSACTIONID)
      } else {
          console.log(`Order ${TRANSACTIONID} already marked as completed.`);
      }
        
    } else {
      // Mark as failed
      await supabaseClient
        .from('airpay_orders')
        .update({ 
          status: 'failed', 
          updated_at: new Date().toISOString() 
        })
        .eq('order_id', TRANSACTIONID)
    }

    return new Response(JSON.stringify({ success: true }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
      status: 200 
    })

  } catch (error: any) {
    console.error('AirPay Webhook Error:', error)
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
      status: 400 
    })
  }
})
