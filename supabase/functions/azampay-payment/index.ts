import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "./cors.ts"

const AZAMPAY_AUTH_URL = "https://authenticator-sandbox.azampay.co.tz/AppRegistration/GenerateToken"
const AZAMPAY_CHECKOUT_URL = "https://sandbox.azampay.co.tz/azampay/mno/checkout"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, msisdn, provider, paymentType = 'wallet_topup', metadata = {} } = await req.json()
    
    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Fetch AzamPay Credentials
    const { data: secrets, error: secretsError } = await supabaseAdmin
      .from('app_secrets')
      .select('key, value')
      .in('key', ['azampay_app_name', 'azampay_client_id', 'azampay_client_secret', 'azampay_api_key'])

    if (secretsError || !secrets) throw new Error("Could not fetch AzamPay secrets")

    const getSecret = (key: string) => secrets.find(s => s.key === key)?.value
    const appName = getSecret('azampay_app_name')
    const clientId = getSecret('azampay_client_id')
    const clientSecret = getSecret('azampay_client_secret')
    const apiKey = getSecret('azampay_api_key')

    // 2. Generate Token
    const authRes = await fetch(AZAMPAY_AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appName, clientId, clientSecret })
    })
    
    const authData = await authRes.json()
    if (!authData.success) throw new Error("AzamPay Authentication failed: " + authData.message)
    
    const token = authData.data.accessToken

    // 3. Create Internal Transaction Reference
    const user = await supabaseAdmin.auth.getUser(req.headers.get('Authorization')?.split(' ')[1] ?? '')
    if (!user.data.user) throw new Error("Unauthorized")

    const externalReference = `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const { data: txn, error: txnError } = await supabaseAdmin
      .from('payment_transactions')
      .insert({
        user_id: user.data.user.id,
        amount,
        currency: 'TZS',
        payment_method: 'azampay',
        payment_type: paymentType,
        external_reference: externalReference,
        metadata: { ...metadata, msisdn, provider }
      })
      .select()
      .single()

    if (txnError) throw new Error("Failed to create transaction record: " + txnError.message)

    // 4. Trigger MNO Checkout
    const checkoutBody = {
      accountNumber: msisdn,
      amount: amount.toString(),
      currency: 'TZS',
      externalId: externalReference,
      provider: provider // e.g., 'Tigo', 'Vodacom', 'Airtel', 'Halotel'
    }

    const checkoutRes = await fetch(AZAMPAY_CHECKOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-Key': apiKey
      },
      body: JSON.stringify(checkoutBody)
    })

    const checkoutData = await checkoutRes.json()
    
    if (checkoutRes.status !== 200 || !checkoutData.success) {
        // Mark as failed if initiation failed
        await supabaseAdmin
            .from('payment_transactions')
            .update({ status: 'failed', metadata: { ...txn.metadata, checkout_error: checkoutData.message || 'Initiation failed' } })
            .eq('id', txn.id)
            
        throw new Error(checkoutData.message || "AzamPay Checkout initiation failed")
    }

    // Success - transaction is initiated
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment initiated", 
        transactionId: checkoutData.transactionId,
        reference: externalReference 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
