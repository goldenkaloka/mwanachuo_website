import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// -----------------------------------------------------------------------------
// Utility Functions for AirPay Encryption
// -----------------------------------------------------------------------------

async function md5(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Checksum
async function generateChecksum(dataObj: Record<string, any>): Promise<string> {
  // Sort keys alphabetically
  const keys = Object.keys(dataObj).sort();
  let checksumDataStr = '';
  for (const key of keys) {
    checksumDataStr += String(dataObj[key]);
  }
  
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;
  
  return await sha256(checksumDataStr + dateStr);
}

// AES-256-CBC Encryption
async function encryptData(dataStr: string, encryptionKeyStr: string): Promise<string> {
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(dataStr);
  
  // Pad/truncate key to 32 bytes for AES-256
  const keyBuffer = textEncoder.encode(encryptionKeyStr);
  const rawKey = new Uint8Array(32);
  rawKey.set(keyBuffer.slice(0, 32));
    
  // Import the key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Generate 8 bytes random
  const random8Bytes = new Uint8Array(8);
  crypto.getRandomValues(random8Bytes);
  // PHP code converts it to 16 char hex string which is then used as IV (16 bytes)
  const hexIVString = Array.from(random8Bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const ivBuffer = textEncoder.encode(hexIVString);
  
  // Encrypt the data using Web Crypto API. WebCrypto automatically applies PKCS7 padding 
  // which is identical to PKCS5 for 16-byte blocks.
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBuffer },
    cryptoKey,
    data 
  );

  // Base64 encode encrypted data and combine with IV
  const encryptedBase64 = base64Encode(new Uint8Array(encryptedBuffer));
  return hexIVString + encryptedBase64;
}

// -----------------------------------------------------------------------------
// Edge Function Logic
// -----------------------------------------------------------------------------

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // 1. Get auth user
    const authHeader = req.headers.get('Authorization')!
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) throw new Error('Unauthorized')

    const { amount, phone, type, metadata } = await req.json()

    // 2. Get AirPay credentials from app_secrets
    const { data: secretData, error: secretError } = await supabaseClient
      .from('app_secrets')
      .select('key, value')
      .in('key', [
        'airpay_client_id', 
        'airpay_client_secret', 
        'airpay_merchant_id', 
        'airpay_secret_key', 
        'airpay_username', 
        'airpay_password',
        'airpay_secret'
      ])

    if (secretError) throw secretError
    
    const secrets: any = {}
    secretData.forEach((s: { key: string; value: string }) => secrets[s.key] = s.value)

    if (!secrets.airpay_merchant_id || !secrets.airpay_secret_key) {
        throw new Error('AirPay credentials missing in app_secrets')
    }

    // 3. Obtain OAuth2 Token
    const tokenParams = new URLSearchParams({
      client_id: secrets.airpay_client_id || '',
      client_secret: secrets.airpay_client_secret || '',
      merchant_id: secrets.airpay_merchant_id || '',
      grant_type: 'client_credentials'
    });

    const tokenRes = await fetch('https://kraken.airpay.tz/airpay/pay/v1/api/oauth2/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams
    })

    const tokenData = await tokenRes.json()
    console.log("Token Response:", tokenData)
    
    let accessToken = ''
    if (tokenData.access_token) {
        accessToken = tokenData.access_token
    } else if (tokenData.data && tokenData.data.access_token) {
        accessToken = tokenData.data.access_token
    } else {
        throw new Error('Failed to obtain AirPay access token')
    }

    // 4. Generate Order
    const orderId = `AIR_${crypto.randomUUID().split('-')[0].toUpperCase()}_${Date.now()}`
    
    // 5. Build Transaction Payload (as per AirPay simple transaction docs)
    const transactionPayload = {
      orderid: orderId,
      amount: amount.toString(),
      currency_code: '834',
      iso_currency: 'tzs',
      buyer_email: user.email || 'customer@mwanachuo.com',
      buyer_phone: phone || '0000000000',
      buyer_firstname: user.user_metadata?.first_name || 'Customer',
      buyer_lastname: user.user_metadata?.last_name || 'User',
      buyer_address: metadata?.address || 'Tanzania',
      buyer_city: metadata?.city || 'Dar es Salaam',
      buyer_state: metadata?.state || 'Dar es Salaam',
      buyer_pincode: metadata?.pincode || '11111',
      buyer_country: metadata?.country || 'TZ',
      customvar: 'app_mwanachuo',
      chmod: 'pg' // Payment mode
    }

    // 6. Save order metadata to ensure tracking
    const { error: dbError } = await supabaseClient
      .from('airpay_orders')
      .insert({
        order_id: orderId,
        user_id: user.id,
        amount: amount,
        type: type || 'wallet_topup',
        metadata: metadata
      })
    if (dbError) throw dbError

    // 7. Generate Checksum
    const checksumHash = await generateChecksum(transactionPayload);

    // 8. Encrypt Payload
    const encryptedData = await encryptData(JSON.stringify(transactionPayload), secrets.airpay_secret_key);

    // 9. Generate Private Key
    const privateKeyRaw = `${secrets.airpay_secret || ''}@${secrets.airpay_username || ''}:|:${secrets.airpay_password || ''}`;
    const privateKey = await sha256(privateKeyRaw);

    // 10. Return all values to frontend
    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderId,
        checkout_url: `https://payments.airpay.tz/pay/v1/?token=${accessToken}`,
        merchant_id: secrets.airpay_merchant_id,
        privatekey: privateKey,
        encdata: encryptedData,
        checksum: checksumHash
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error: any) {
    console.error('AirPay Payment Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
