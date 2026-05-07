import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const PUBLIC_KEY_URL = "https://sandbox.azampay.co.tz/azampay/v1/public-key?format=Pem"

serve(async (req) => {
  try {
    const payload = await req.json()
    console.log("AzamPay Webhook Payload:", JSON.stringify(payload, null, 2))

    const { 
      utilityref, 
      externalreference, 
      transactionstatus, 
      operator, 
      signature,
      amount
    } = payload

    if (!signature) throw new Error("Missing signature")

    // 1. Fetch AzamPay Public Key
    // In production, you would cache this for 24 hours.
    const pkRes = await fetch(PUBLIC_KEY_URL)
    const pkData = await pkRes.json()
    if (!pkData.success) throw new Error("Could not fetch AzamPay public key")
    
    const pemKey = pkData.publicKey

    // 2. Verify Signature
    const dataToVerify = `${utilityref}${externalreference}${transactionstatus}${operator}`
    const isValid = await verifySignature(dataToVerify, signature, pemKey)

    if (!isValid) {
      console.error("Signature verification failed for ref:", utilityref)
      return new Response(JSON.stringify({ success: false, message: "Invalid signature" }), { status: 401 })
    }

    // 3. Finalize Payment in DB
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const status = transactionstatus === 'success' ? 'completed' : 'failed'
    
    const { data: result, error: rpcError } = await supabaseAdmin.rpc('finalize_payment', {
      p_reference_id: utilityref,
      p_provider_txn_id: externalreference,
      p_amount: parseFloat(amount),
      p_status: status
    })

    if (rpcError) {
      console.error("RPC Error:", rpcError)
      throw new Error(rpcError.message)
    }

    console.log("Payment finalized successfully:", utilityref)
    return new Response(JSON.stringify({ success: true }), { status: 200 })

  } catch (error) {
    console.error("Webhook Error:", error.message)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 })
  }
})

async function verifySignature(data: string, signatureBase64: string, pemKey: string): Promise<boolean> {
  try {
    // Extract base64 part of PEM
    const pemContents = pemKey
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "")
      .replace(/\s/g, "");
    
    const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
    const signature = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));
    const dataBytes = new TextEncoder().encode(data);

    const key = await crypto.subtle.importKey(
      "spki",
      binaryKey,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["verify"],
    );

    return await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      dataBytes,
    );
  } catch (e) {
    console.error("verifySignature Exception:", e)
    return false
  }
}
