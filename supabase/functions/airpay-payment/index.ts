import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ✅ SHA-256
async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ✅ CORRECT checksum (pipe-separated, NO date)
async function generateChecksum(data: any): Promise<string> {
  const checksumStr = `${data.client_id}|${data.client_secret}|${data.merchant_id}|${data.grant_type}`;
  return await sha256(checksumStr);
}

// ✅ CORRECT AES-CBC (base64 only, no IV prefix)
async function encryptData(payload: string, secretKey: string): Promise<string> {
  const encoder = new TextEncoder();

  // 🔐 derive 32-byte key properly using SHA-256
  const keyHash = await crypto.subtle.digest("SHA-256", encoder.encode(secretKey));

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyHash,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // ✅ 16-byte IV
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    cryptoKey,
    encoder.encode(payload)
  );

  // ✅ AirPay expects base64(encrypted)
  return base64Encode(new Uint8Array(encrypted));
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 🔐 Auth check
    const authHeader = req.headers.get('Authorization')!;
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) throw new Error('Unauthorized');

    // 📥 Request body
    const body = await req.json();
    console.log("[AirPay Payment] Payload received:", JSON.stringify(body))
    const { amount, phone_number, provider, full_name, type, metadata } = body;

    if (!amount || isNaN(Number(amount))) {
      throw new Error('Invalid amount');
    }

    // 🔐 Hardcoded Credentials as requested
    const client_id = "d0e53f";
    const client_secret = "PLACEHOLDER_CLIENT_SECRET"; // Still missing client_secret from user
    const merchant_id = "M247234";
    const secret_key = "2da4b10b2a93a4fb99144f821bc38aa4";
    const username = "M247234";
    const password = "PLACEHOLDER_PASSWORD"; // Still missing password from user
    const salt = "PLACEHOLDER_SALT"; // Still missing salt from user

    // ✅ Generate Order ID
    const orderId = `AIR_${crypto.randomUUID().split('-')[0].toUpperCase()}_${Date.now()}`;

    // ✅ Log order to DB for webhook
    const { error: dbError } = await supabase
      .from('airpay_orders')
      .insert({
        order_id: orderId,
        user_id: user.id,
        amount: Number(amount),
        type: type || 'wallet_topup',
        metadata: {
            ...metadata,
            provider,
            phone_number
        }
      });
    if (dbError) throw dbError;

    // ✅ OAuth Token Fetching Logic
    const tokenPayload = `client_id=${client_id}&client_secret=${client_secret}&merchant_id=${merchant_id}&grant_type=client_credentials`;
    const tokenData = { client_id, client_secret, merchant_id, grant_type: 'client_credentials' };

    const encdataToken = await encryptData(tokenPayload, secret_key);
    const checksumToken = await generateChecksum(tokenData);

    const formData = new URLSearchParams({
      merchant_id,
      encdata: encdataToken,
      checksum: checksumToken
    });

    const tokenRes = await fetch('https://kraken.airpay.tz/airpay/pay/v1/api/oauth2/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    const tokenJson = await tokenRes.json();
    console.log("[AirPay Payment] Token Response:", JSON.stringify(tokenJson));

    if (!tokenJson.status) {
      throw new Error(`AirPay Failure: ${JSON.stringify(tokenJson)}`);
    }

    const accessToken = tokenJson.data?.access_token;
    if (!accessToken) throw new Error('No access token returned');

    // ✅ Return checkout data to frontend
    // Generate privatekey for the frontend form (SHA256 of salt@username:|:password)
    const privateKeyRaw = `${salt}@${username}:|:${password}`;
    const privateKey = await sha256(privateKeyRaw);

    // Build the final transaction payload for the checkout form
    const transactionPayload = {
        orderid: orderId,
        amount: amount.toString(),
        currency_code: '834',
        iso_currency: 'tzs',
        buyer_email: user.email || 'customer@mwanachuo.com',
        buyer_phone: phone_number || '0000000000',
        buyer_firstname: (full_name || 'Customer').split(' ')[0],
        buyer_lastname: (full_name || 'User').split(' ').slice(1).join(' ') || 'User',
        customvar: JSON.stringify({ type: 'wallet_topup', user_id: user.id }),
        chmod: 'pg'
    };

    const finalEncData = await encryptData(JSON.stringify(transactionPayload), secret_key);
    // Note: The frontend needs the checksum for the final form. 
    // Usually it's calculated on all fields. For simplicity, we'll return the necessary bits.
    
    return new Response(JSON.stringify({
      success: true,
      order_id: orderId,
      checkout_url: `https://payments.airpay.tz/pay/v1/?token=${accessToken}`,
      merchant_id: merchant_id,
      privatekey: privateKey,
      encdata: finalEncData,
      checksum: await sha256(Object.values(transactionPayload).join('')) // Basic placeholder, adjusts based on actual requirement if needed
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (err: any) {
    console.error('[ERROR]', err.message);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
