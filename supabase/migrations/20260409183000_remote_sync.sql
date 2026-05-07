-- SUPABASE REMOTE SYNC (GENERATED VIA MCP)

-- Table: users
CREATE TABLE IF NOT EXISTS public."users" (
    "id" undefined,
    "enrolled_course_id" undefined,
    "id" undefined,
    "email" undefined,
    "id" undefined,
    "primary_university_id" undefined
);

-- Table: notification_preferences
CREATE TABLE IF NOT EXISTS public."notification_preferences" (
    "id" undefined,
    "user_id" undefined,
    "user_id" undefined
);

-- Table: subscription_plans
CREATE TABLE IF NOT EXISTS public."subscription_plans" (
    "id" undefined
);

-- Table: listing_universities
CREATE TABLE IF NOT EXISTS public."listing_universities" (
    "university_id" undefined,
    "university_id" undefined,
    "university_id" undefined,
    "listing_id" undefined,
    "listing_id" undefined,
    "listing_id" undefined,
    "listing_type" undefined,
    "listing_type" undefined,
    "listing_type" undefined,
    "university_id" undefined,
    "id" undefined
);

-- Table: promotions
CREATE TABLE IF NOT EXISTS public."promotions" (
    "user_id" undefined,
    "id" undefined
);

-- Table: seller_subscriptions
CREATE TABLE IF NOT EXISTS public."seller_subscriptions" (
    "id" undefined,
    "seller_id" undefined,
    "plan_id" undefined
);

-- Table: seller_requests
CREATE TABLE IF NOT EXISTS public."seller_requests" (
    "reviewed_by" undefined,
    "id" undefined,
    "user_id" undefined
);

-- Table: subscription_payments
CREATE TABLE IF NOT EXISTS public."subscription_payments" (
    "id" undefined,
    "subscription_id" undefined
);

-- Table: subscription_usage
CREATE TABLE IF NOT EXISTS public."subscription_usage" (
    "id" undefined,
    "subscription_id" undefined,
    "subscription_id" undefined,
    "subscription_id" undefined,
    "listing_type" undefined,
    "listing_type" undefined,
    "listing_type" undefined,
    "period_start" undefined,
    "period_start" undefined,
    "period_start" undefined,
    "subscription_id" undefined
);

-- Table: products
CREATE TABLE IF NOT EXISTS public."products" (
    "category_id" undefined,
    "condition_id" undefined,
    "id" undefined,
    "seller_id" undefined
);

-- Table: courses
CREATE TABLE IF NOT EXISTS public."courses" (
    "id" undefined,
    "university_id" undefined
);

-- Table: user_universities
CREATE TABLE IF NOT EXISTS public."user_universities" (
    "user_id" undefined,
    "user_id" undefined,
    "university_id" undefined,
    "university_id" undefined,
    "user_id" undefined,
    "university_id" undefined
);

-- Table: amenities
CREATE TABLE IF NOT EXISTS public."amenities" (
    "id" undefined,
    "name" undefined
);

-- Table: services
CREATE TABLE IF NOT EXISTS public."services" (
    "id" undefined,
    "provider_id" undefined
);

-- Table: accommodations
CREATE TABLE IF NOT EXISTS public."accommodations" (
    "id" undefined,
    "owner_id" undefined
);

-- Table: product_reviews
CREATE TABLE IF NOT EXISTS public."product_reviews" (
    "id" undefined,
    "user_id" undefined,
    "user_id" undefined,
    "item_id" undefined,
    "item_id" undefined,
    "user_id" undefined,
    "item_id" undefined
);

-- Table: accommodation_amenities
CREATE TABLE IF NOT EXISTS public."accommodation_amenities" (
    "accommodation_id" undefined,
    "accommodation_id" undefined,
    "amenity_id" undefined,
    "amenity_id" undefined,
    "accommodation_id" undefined,
    "amenity_id" undefined
);

-- Table: riders
CREATE TABLE IF NOT EXISTS public."riders" (
    "id" undefined,
    "user_id" undefined,
    "user_id" undefined
);

-- Table: universities
CREATE TABLE IF NOT EXISTS public."universities" (
    "id" undefined,
    "name" undefined
);

-- Table: service_reviews
CREATE TABLE IF NOT EXISTS public."service_reviews" (
    "id" undefined,
    "user_id" undefined,
    "user_id" undefined,
    "item_id" undefined,
    "item_id" undefined,
    "user_id" undefined,
    "item_id" undefined
);

-- Table: accommodation_reviews
CREATE TABLE IF NOT EXISTS public."accommodation_reviews" (
    "id" undefined,
    "user_id" undefined,
    "user_id" undefined,
    "item_id" undefined,
    "item_id" undefined,
    "user_id" undefined,
    "item_id" undefined
);

-- Table: notifications
CREATE TABLE IF NOT EXISTS public."notifications" (
    "id" undefined,
    "user_id" undefined
);

-- Table: app_settings
CREATE TABLE IF NOT EXISTS public."app_settings" (
    "key" undefined
);

-- Table: device_tokens
CREATE TABLE IF NOT EXISTS public."device_tokens" (
    "id" undefined,
    "player_id" undefined,
    "user_id" undefined
);

-- Table: notification_actions
CREATE TABLE IF NOT EXISTS public."notification_actions" (
    "id" undefined,
    "user_id" undefined
);

-- Table: product_categories
CREATE TABLE IF NOT EXISTS public."product_categories" (
    "id" undefined,
    "name" undefined
);

-- Table: product_conditions
CREATE TABLE IF NOT EXISTS public."product_conditions" (
    "id" undefined,
    "name" undefined
);

-- Table: wallets
CREATE TABLE IF NOT EXISTS public."wallets" (
    "user_id" undefined,
    "user_id" undefined
);

-- Table: wallet_transactions
CREATE TABLE IF NOT EXISTS public."wallet_transactions" (
    "id" undefined,
    "wallet_id" undefined
);

-- Table: zenopay_orders
CREATE TABLE IF NOT EXISTS public."zenopay_orders" (
    "order_id" undefined,
    "user_id" undefined
);

-- Table: manual_payment_requests
CREATE TABLE IF NOT EXISTS public."manual_payment_requests" (
    "id" undefined,
    "user_id" undefined
);

-- Table: coupons
CREATE TABLE IF NOT EXISTS public."coupons" (
    "code" undefined
);

-- Table: user_coupons
CREATE TABLE IF NOT EXISTS public."user_coupons" (
    "id" undefined,
    "user_id" undefined,
    "user_id" undefined,
    "coupon_code" undefined,
    "coupon_code" undefined,
    "user_id" undefined,
    "coupon_code" undefined
);

-- Table: referrals
CREATE TABLE IF NOT EXISTS public."referrals" (
    "id" undefined,
    "referee_id" undefined,
    "referrer_id" undefined,
    "referee_id" undefined
);

-- Table: app_secrets
CREATE TABLE IF NOT EXISTS public."app_secrets" (
    "key" undefined
);

-- Table: reviews
CREATE TABLE IF NOT EXISTS public."reviews" (
    "id" undefined,
    "user_id" undefined
);

-- Table: restaurants
CREATE TABLE IF NOT EXISTS public."restaurants" (
    "id" undefined,
    "owner_id" undefined,
    "owner_id" undefined
);

-- Table: food_items
CREATE TABLE IF NOT EXISTS public."food_items" (
    "id" undefined,
    "restaurant_id" undefined
);

-- Table: orders
CREATE TABLE IF NOT EXISTS public."orders" (
    "id" undefined,
    "student_id" undefined,
    "restaurant_id" undefined,
    "rider_id" undefined,
    "student_id" undefined
);

-- Table: escrow_transactions
CREATE TABLE IF NOT EXISTS public."escrow_transactions" (
    "id" undefined,
    "order_id" undefined,
    "student_id" undefined
);

-- Table: order_items
CREATE TABLE IF NOT EXISTS public."order_items" (
    "id" undefined,
    "order_id" undefined,
    "food_item_id" undefined
);

-- Table: food_additives
CREATE TABLE IF NOT EXISTS public."food_additives" (
    "id" undefined,
    "food_item_id" undefined
);

-- Table: rider_jobs
CREATE TABLE IF NOT EXISTS public."rider_jobs" (
    "id" undefined,
    "order_id" undefined,
    "rider_id" undefined
);

-- Table: students
CREATE TABLE IF NOT EXISTS public."students" (
    "user_id" undefined,
    "user_id" undefined
);

-- Table: sellers
CREATE TABLE IF NOT EXISTS public."sellers" (
    "user_id" undefined,
    "user_id" undefined
);

-- Table: payment_transactions
CREATE TABLE IF NOT EXISTS public."payment_transactions" (
    "id" undefined,
    "external_reference" undefined,
    "user_id" undefined
);


-- FUNCTIONS --
CREATE OR REPLACE FUNCTION public.cleanup_old_typing_indicators()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM public.typing_indicators
    WHERE updated_at < NOW() - INTERVAL '10 seconds';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_device_tokens_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_notification_group()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE notification_groups
  SET 
    unread_count = unread_count + 1,
    latest_notification_id = NEW.notification_id,
    latest_notification_at = NOW(),
    updated_at = NOW()
  WHERE id = NEW.group_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.mark_notification_group_read(group_id_param uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE notification_groups
  SET unread_count = 0
  WHERE id = group_id_param AND user_id = auth.uid();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.can_create_listing(p_user_id uuid, p_listing_type text)
 RETURNS TABLE(can_create boolean, reason text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_role TEXT;
  v_subscription_status TEXT;
  v_has_active BOOLEAN;
  v_is_trial BOOLEAN;
  v_trial_ends_at TIMESTAMP WITH TIME ZONE;
  v_current_period_end TIMESTAMP WITH TIME ZONE;
  v_grace_period_end TIMESTAMP WITH TIME ZONE;
  v_listing_count INT;
  v_max_listings INT;
  v_subscription_id UUID;
BEGIN
  -- Check if user is admin - admins have lifetime membership
  SELECT role INTO v_user_role FROM users WHERE id = p_user_id;
  
  IF v_user_role = 'admin' THEN
    RETURN QUERY SELECT true, 'Admin has lifetime membership'::TEXT;
    RETURN;
  END IF;

  -- Check if user is a seller
  IF v_user_role != 'seller' THEN
    RETURN QUERY SELECT false, 'User is not a seller'::TEXT;
    RETURN;
  END IF;

  -- Get subscription status
  SELECT 
    has_active_subscription,
    subscription_id,
    status,
    is_trial,
    trial_ends_at,
    current_period_end,
    grace_period_end
  INTO 
    v_has_active,
    v_subscription_id,
    v_subscription_status,
    v_is_trial,
    v_trial_ends_at,
    v_current_period_end,
    v_grace_period_end
  FROM check_seller_subscription_status(p_user_id);

  -- If no subscription found
  IF v_subscription_id IS NULL THEN
    RETURN QUERY SELECT false, 'No subscription found. Please subscribe to continue.'::TEXT;
    RETURN;
  END IF;

  -- Check if subscription is active (including trial and grace period)
  IF NOT v_has_active THEN
    RETURN QUERY SELECT false, 'Subscription expired. Please renew to continue listing.'::TEXT;
    RETURN;
  END IF;

  -- Get current listing count
  SELECT get_seller_listing_count(p_user_id, p_listing_type) INTO v_listing_count;

  -- Get max listings from plan (if subscription exists)
  IF v_subscription_id IS NOT NULL THEN
    SELECT sp.max_listings INTO v_max_listings
    FROM seller_subscriptions ss
    JOIN subscription_plans sp ON ss.plan_id = sp.id
    WHERE ss.id = v_subscription_id;
  END IF;

  -- Check listing limit (NULL means unlimited)
  IF v_max_listings IS NOT NULL AND v_listing_count >= v_max_listings THEN
    RETURN QUERY SELECT false, format('Listing limit reached (%s/%s). Upgrade your plan for more listings.', v_listing_count, v_max_listings)::TEXT;
    RETURN;
  END IF;

  -- All checks passed
  RETURN QUERY SELECT true, 'OK'::TEXT;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.send_push_notification(p_user_id uuid, p_title text, p_message text, p_type text DEFAULT 'system'::text, p_action_url text DEFAULT NULL::text, p_metadata jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_device_tokens TEXT[];
  v_player_ids TEXT[];
  v_preferences RECORD;
  v_should_send BOOLEAN := true;
BEGIN
  -- Get user's notification preferences
  SELECT * INTO v_preferences
  FROM notification_preferences
  WHERE user_id = p_user_id;

  -- Check if push notifications are enabled
  IF v_preferences IS NULL THEN
    -- No preferences found, use defaults (enabled)
    v_should_send := true;
  ELSE
    -- Check global push setting
    IF v_preferences.push_enabled = false THEN
      v_should_send := false;
    ELSE
      -- Check type-specific settings
      CASE p_type
        WHEN 'message' THEN
          v_should_send := v_preferences.messages_enabled;
        WHEN 'review' THEN
          v_should_send := v_preferences.reviews_enabled;
        WHEN 'promotion' THEN
          v_should_send := v_preferences.promotions_enabled;
        WHEN 'sellerRequest' THEN
          v_should_send := v_preferences.seller_requests_enabled;
        ELSE
          -- For new listings (products, services, accommodations)
          v_should_send := v_preferences.listings_enabled;
      END CASE;
    END IF;
  END IF;

  -- If preferences say not to send, return early
  IF v_should_send = false THEN
    RAISE NOTICE 'Push notification skipped for user % due to preferences', p_user_id;
    RETURN;
  END IF;

  -- Get all device tokens (OneSignal player IDs) for the user
  SELECT ARRAY_AGG(player_id)
  INTO v_player_ids
  FROM device_tokens
  WHERE user_id = p_user_id;

  -- If no device tokens found, return early
  IF v_player_ids IS NULL OR array_length(v_player_ids, 1) = 0 THEN
    RAISE NOTICE 'No device tokens found for user %', p_user_id;
    RETURN;
  END IF;

  -- Insert notification record (for in-app notifications)
  INSERT INTO notifications (
    user_id,
    type,
    title,
    message,
    action_url,
    metadata,
    is_read,
    created_at
  ) VALUES (
    p_user_id,
    p_type,
    p_title,
    p_message,
    p_action_url,
    p_metadata,
    false,
    NOW()
  );

  -- Note: The actual OneSignal API call should be made via:
  -- 1. Supabase Edge Function (recommended)
  -- 2. Database webhook
  -- 3. External service
  
  RAISE NOTICE 'Push notification queued for user % with % device tokens', 
    p_user_id, array_length(v_player_ids, 1);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.send_immediate_push_notification(p_user_id uuid, p_title text, p_message text, p_type text DEFAULT 'message'::text, p_action_url text DEFAULT NULL::text, p_metadata jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Call the main push notification function
  PERFORM send_push_notification(
    p_user_id,
    p_title,
    p_message,
    p_type,
    p_action_url,
    p_metadata
  );
  
  -- Immediate notifications are sent right away
  -- The Edge Function/webhook should prioritize these
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_seller_requests_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_accommodation_with_universities(p_name text, p_description text, p_price numeric, p_price_type text, p_room_type text, p_images text[], p_owner_id uuid, p_location text, p_contact_phone text, p_contact_email text DEFAULT NULL::text, p_amenities text[] DEFAULT '{}'::text[], p_bedrooms integer DEFAULT 1, p_bathrooms integer DEFAULT 1, p_metadata jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_accommodation_id UUID;
  v_universities UUID[];
  v_affected_user_ids UUID[];
  v_user_role TEXT;
  v_is_seller_approved BOOLEAN;
  v_user_id UUID;
BEGIN
  -- Check user's role and seller approval status
  SELECT role, is_seller_approved
  INTO v_user_role, v_is_seller_approved
  FROM users
  WHERE id = p_owner_id;
  
  -- Only sellers and admins can list accommodations
  IF v_user_role = 'buyer' OR (v_user_role = 'seller' AND v_is_seller_approved = false) THEN
    RAISE EXCEPTION 'Only approved sellers and admins can list accommodations. Please request seller access first.';
  END IF;
  
  -- Get owner's universities
  v_universities := get_user_universities(p_owner_id);
  
  -- Validate that user has at least one university
  IF v_universities IS NULL OR array_length(v_universities, 1) = 0 THEN
    RAISE EXCEPTION 'User must have at least one university to list accommodations';
  END IF;
  
  -- Create the accommodation
  INSERT INTO accommodations (
    name, description, price, price_type, room_type, images,
    owner_id, university_ids, location, contact_phone, contact_email,
    amenities, bedrooms, bathrooms, metadata, created_at
  ) VALUES (
    p_name, p_description, p_price, p_price_type, p_room_type, p_images,
    p_owner_id, v_universities, p_location, p_contact_phone, p_contact_email,
    p_amenities, p_bedrooms, p_bathrooms, p_metadata, NOW()
  )
  RETURNING id INTO v_accommodation_id;
  
  -- Find users who share at least one university
  SELECT ARRAY_AGG(DISTINCT id) INTO v_affected_user_ids
  FROM users
  WHERE id != p_owner_id
    AND (
      primary_university_id = ANY(v_universities)
      OR subsidiary_university_ids && v_universities
    );
  
  -- Create notifications and send push notifications for matching users
  IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
    -- Create in-app notifications
    INSERT INTO notifications (user_id, type, title, message, action_url, metadata, created_at)
    SELECT 
      unnest(v_affected_user_ids),
      'promotion',
      'New Housing Available',
      p_name || ' is now available in your university',
      '/accommodation-details?accommodationId=' || v_accommodation_id,
      jsonb_build_object(
        'accommodation_id', v_accommodation_id,
        'owner_id', p_owner_id,
        'room_type', p_room_type
      ),
      NOW();
    
    -- Send push notifications
    FOREACH v_user_id IN ARRAY v_affected_user_ids
    LOOP
      PERFORM send_push_notification(
        v_user_id,
        'New Housing Available',
        p_name || ' is now available in your university',
        'promotion',
        '/accommodation-details?accommodationId=' || v_accommodation_id,
        jsonb_build_object(
          'accommodationId', v_accommodation_id,
          'itemType', 'accommodation'
        )
      );
    END LOOP;
  END IF;
  
  RETURN v_accommodation_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_service_with_universities(p_title text, p_description text, p_price numeric, p_category text, p_price_type text, p_images text[], p_provider_id uuid, p_location text, p_contact_phone text, p_contact_email text DEFAULT NULL::text, p_availability text[] DEFAULT '{}'::text[], p_metadata jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_service_id UUID;
  v_universities UUID[];
  v_affected_user_ids UUID[];
  v_user_role TEXT;
  v_is_seller_approved BOOLEAN;
  v_user_id UUID;
BEGIN
  -- Check user's role and seller approval status
  SELECT role, is_seller_approved
  INTO v_user_role, v_is_seller_approved
  FROM users
  WHERE id = p_provider_id;
  
  -- Only sellers and admins can offer services
  IF v_user_role = 'buyer' OR (v_user_role = 'seller' AND v_is_seller_approved = false) THEN
    RAISE EXCEPTION 'Only approved sellers and admins can offer services. Please request seller access first.';
  END IF;
  
  -- Get provider's universities
  v_universities := get_user_universities(p_provider_id);
  
  -- Validate that user has at least one university
  IF v_universities IS NULL OR array_length(v_universities, 1) = 0 THEN
    RAISE EXCEPTION 'User must have at least one university to offer services';
  END IF;
  
  -- Create the service
  INSERT INTO services (
    title, description, price, category, price_type, images,
    provider_id, university_ids, location, contact_phone, contact_email,
    availability, metadata, created_at
  ) VALUES (
    p_title, p_description, p_price, p_category, p_price_type, p_images,
    p_provider_id, v_universities, p_location, p_contact_phone, p_contact_email,
    p_availability, p_metadata, NOW()
  )
  RETURNING id INTO v_service_id;
  
  -- Find users who share at least one university
  SELECT ARRAY_AGG(DISTINCT id) INTO v_affected_user_ids
  FROM users
  WHERE id != p_provider_id
    AND (
      primary_university_id = ANY(v_universities)
      OR subsidiary_university_ids && v_universities
    );
  
  -- Create notifications and send push notifications for matching users
  IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
    -- Create in-app notifications
    INSERT INTO notifications (user_id, type, title, message, action_url, metadata, created_at)
    SELECT 
      unnest(v_affected_user_ids),
      'promotion',
      'New Service Available',
      p_title || ' is now available in your university',
      '/service-details?serviceId=' || v_service_id,
      jsonb_build_object(
        'service_id', v_service_id,
        'provider_id', p_provider_id,
        'category', p_category
      ),
      NOW();
    
    -- Send push notifications
    FOREACH v_user_id IN ARRAY v_affected_user_ids
    LOOP
      PERFORM send_push_notification(
        v_user_id,
        'New Service Available',
        p_title || ' is now available in your university',
        'promotion',
        '/service-details?serviceId=' || v_service_id,
        jsonb_build_object(
          'serviceId', v_service_id,
          'itemType', 'service'
        )
      );
    END LOOP;
  END IF;
  
  RETURN v_service_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_notification_preferences_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_seller_subscription_status(p_user_id uuid)
 RETURNS TABLE(has_active_subscription boolean, subscription_id uuid, status text, is_trial boolean, trial_ends_at timestamp with time zone, current_period_end timestamp with time zone, grace_period_end timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN ss.status IN ('trial', 'active') THEN true
      WHEN ss.status = 'expired' AND ss.grace_period_end > NOW() THEN true
      ELSE false
    END as has_active_subscription,
    ss.id as subscription_id,
    ss.status,
    ss.is_trial,
    ss.trial_ends_at,
    ss.current_period_end,
    ss.grace_period_end
  FROM seller_subscriptions ss
  WHERE ss.seller_id = p_user_id
  ORDER BY ss.created_at DESC
  LIMIT 1;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_seller_listing_count(p_user_id uuid, p_listing_type text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_count INT;
BEGIN
  IF p_listing_type = 'product' THEN
    SELECT COUNT(*) INTO v_count
    FROM products
    WHERE seller_id = p_user_id AND is_active = true;
  ELSIF p_listing_type = 'service' THEN
    SELECT COUNT(*) INTO v_count
    FROM services
    WHERE provider_id = p_user_id AND is_active = true;
  ELSIF p_listing_type = 'accommodation' THEN
    SELECT COUNT(*) INTO v_count
    FROM accommodations
    WHERE owner_id = p_user_id AND is_active = true;
  ELSE
    RETURN 0;
  END IF;
  
  RETURN COALESCE(v_count, 0);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_subscription_usage(p_subscription_id uuid, p_listing_type text, p_increment integer DEFAULT 1)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_period_start TIMESTAMP WITH TIME ZONE;
  v_period_end TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get current period from subscription
  SELECT current_period_start, current_period_end
  INTO v_period_start, v_period_end
  FROM seller_subscriptions
  WHERE id = p_subscription_id;

  -- Insert or update usage
  INSERT INTO subscription_usage (
    subscription_id,
    listing_type,
    listing_count,
    period_start,
    period_end
  )
  VALUES (
    p_subscription_id,
    p_listing_type,
    p_increment,
    v_period_start,
    v_period_end
  )
  ON CONFLICT (subscription_id, listing_type, period_start)
  DO UPDATE SET
    listing_count = subscription_usage.listing_count + p_increment,
    updated_at = NOW();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_free_trial_subscription(p_seller_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_plan_id UUID;
  v_subscription_id UUID;
  v_trial_start TIMESTAMP WITH TIME ZONE;
  v_trial_end TIMESTAMP WITH TIME ZONE;
  v_grace_period_end TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get the default/active subscription plan
  SELECT id INTO v_plan_id
  FROM subscription_plans
  WHERE is_active = true
  ORDER BY created_at ASC
  LIMIT 1;

  -- If no plan exists, we can't create a trial
  IF v_plan_id IS NULL THEN
    RAISE EXCEPTION 'No active subscription plan found';
  END IF;

  -- Set trial period (1 month from now)
  v_trial_start := NOW();
  v_trial_end := v_trial_start + INTERVAL '1 month';
  v_grace_period_end := v_trial_end + INTERVAL '7 days';

  -- Create trial subscription
  INSERT INTO seller_subscriptions (
    seller_id,
    plan_id,
    status,
    billing_period,
    current_period_start,
    current_period_end,
    grace_period_end,
    is_trial,
    trial_ends_at,
    auto_renew
  )
  VALUES (
    p_seller_id,
    v_plan_id,
    'trial',
    'trial',
    v_trial_start,
    v_trial_end,
    v_grace_period_end,
    true,
    v_trial_end,
    false
  )
  RETURNING id INTO v_subscription_id;

  RETURN v_subscription_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_subscription_expiry()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Update expired subscriptions (beyond grace period)
  UPDATE seller_subscriptions
  SET status = 'expired',
      updated_at = NOW()
  WHERE status IN ('trial', 'active', 'past_due')
    AND grace_period_end < NOW()
    AND status != 'expired';

  -- Update subscriptions that entered grace period
  UPDATE seller_subscriptions
  SET status = 'expired',
      updated_at = NOW()
  WHERE status IN ('trial', 'active')
    AND current_period_end < NOW()
    AND grace_period_end >= NOW();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.match_documents(query_embedding vector, match_threshold double precision, match_count integer, filter_course_id uuid, filter_document_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, content text, metadata jsonb, similarity double precision, document_id uuid)
 LANGUAGE plpgsql
AS $function$
begin
  return query
  select
    document_chunks.id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity,
    document_chunks.document_id
  from document_chunks
  join documents on documents.id = document_chunks.document_id
  where 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  and documents.course_id = filter_course_id
  and (filter_document_id is null or documents.id = filter_document_id)
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_document_ingestion_v2()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://mwanachuo-worker.example.com/process/',
      headers := '{"Content-Type": "application/json", "X-Supabase-Event": "INSERT"}'::jsonb,
      body := jsonb_build_object('record', row_to_json(new)),
      timeout_milliseconds := 5000
    );
  RETURN new;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.match_documents_v2(query_embedding vector, match_threshold double precision, match_count integer, filter_course_id uuid DEFAULT NULL::uuid, filter_document_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, content text, metadata jsonb, similarity double precision)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks dc
  JOIN public.documents d ON d.id = dc.document_id
  WHERE (filter_course_id IS NULL OR d.course_id = filter_course_id)
    AND (filter_document_id IS NULL OR dc.document_id = filter_document_id)
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_document_ingestion()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Add document to processing queue
  INSERT INTO public.document_processing_queue (document_id, status)
  VALUES (NEW.id, 'pending');
  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_university_users_product(p_product_id uuid, p_seller_id uuid, p_university_ids uuid[], p_title text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_affected_user_ids UUID[];
BEGIN
  -- Get users from the same university network
  SELECT ARRAY_AGG(DISTINCT id) INTO v_affected_user_ids
  FROM public.users
  WHERE id != p_seller_id
    AND (
      primary_university_id = ANY(p_university_ids)
      OR subsidiary_university_ids && p_university_ids
    );
  
  IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
    INSERT INTO public.notifications (user_id, type, title, message, action_url, metadata, created_at)
    SELECT 
      u_id,
      'product',
      'New Product Available',
      p_title || ' is now available in your university network',
      '/product/' || p_product_id,
      jsonb_build_object(
        'product_id', p_product_id,
        'seller_id', p_seller_id
      ),
      NOW()
    FROM unnest(v_affected_user_ids) as u_id;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_send_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_payload JSONB;
  v_supabase_url TEXT := 'https://yhuujolmbqvntzifoaed.supabase.co';
  v_service_role_key TEXT;
  v_request_id BIGINT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    SELECT value INTO v_service_role_key
    FROM public.app_secrets
    WHERE key = 'service_role_key';
    
    IF v_service_role_key IS NULL OR v_service_role_key = '' THEN
      RAISE EXCEPTION 'Service role key not found in app_secrets.';
    END IF;
    
    v_payload := jsonb_build_object(
      'user_id', NEW.user_id,
      'title', NEW.title,
      'message', NEW.message,
      'type', NEW.type,
      'action_url', NEW.action_url,
      'metadata', COALESCE(NEW.metadata, '{}'::jsonb)
    );

    SELECT net.http_post(
      url := v_supabase_url || '/functions/v1/send-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || v_service_role_key
      ),
      body := v_payload
    ) INTO v_request_id;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_limit(real)
 RETURNS real
 LANGUAGE c
 STRICT
AS '$libdir/pg_trgm', $function$set_limit$function$
;

CREATE OR REPLACE FUNCTION public.show_limit()
 RETURNS real
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$show_limit$function$
;

CREATE OR REPLACE FUNCTION public.show_trgm(text)
 RETURNS text[]
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$show_trgm$function$
;

CREATE OR REPLACE FUNCTION public.similarity(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$similarity$function$
;

CREATE OR REPLACE FUNCTION public.similarity_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$similarity_op$function$
;

CREATE OR REPLACE FUNCTION public.word_similarity(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity$function$
;

CREATE OR REPLACE FUNCTION public.word_similarity_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_op$function$
;

CREATE OR REPLACE FUNCTION public._handle_listing_notifications(p_listing_id uuid, p_listing_type text, p_creator_id uuid, p_title text, p_universities uuid[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_affected_user_ids UUID[];
    v_user_id UUID;
    v_action_url TEXT;
    v_item_label TEXT;
BEGIN
    CASE p_listing_type
        WHEN 'product' THEN 
            v_action_url := '/product-details?productId=' || p_listing_id;
            v_item_label := 'Product';
        WHEN 'service' THEN 
            v_action_url := '/service-details?serviceId=' || p_listing_id;
            v_item_label := 'Service';
        WHEN 'accommodation' THEN 
            v_action_url := '/accommodation-details?accommodationId=' || p_listing_id;
            v_item_label := 'Housing';
    END CASE;

    SELECT ARRAY_AGG(DISTINCT user_id) INTO v_affected_user_ids
    FROM public.user_universities
    WHERE user_id != p_creator_id
      AND university_id = ANY(p_universities);

    IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
        INSERT INTO public.notifications (user_id, type, title, message, action_url, metadata)
        SELECT 
            unnest(v_affected_user_ids),
            'promotion',
            'New ' || v_item_label || ' Available',
            p_title || ' is now available in your university',
            v_action_url,
            jsonb_build_object('id', p_listing_id, 'type', p_listing_type);

        FOREACH v_user_id IN ARRAY v_affected_user_ids
        LOOP
            PERFORM send_push_notification(
                v_user_id,
                'New ' || v_item_label || ' Available',
                p_title || ' is now available in your university',
                'promotion',
                v_action_url,
                jsonb_build_object('id', p_listing_id, 'type', p_listing_type)
            );
        END LOOP;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.match_note_chunks(query_embedding vector, match_threshold double precision, match_count integer, filter jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(id uuid, note_id uuid, content text, metadata jsonb, embedding vector, similarity double precision)
 LANGUAGE plpgsql
AS $function$
#variable_conflict use_column
begin
  return query
  select
    note_chunks.id,
    note_chunks.note_id,
    note_chunks.content,
    note_chunks.metadata,
    note_chunks.embedding,
    1 - (note_chunks.embedding <=> query_embedding) as similarity
  from note_chunks
  where 1 - (note_chunks.embedding <=> query_embedding) > match_threshold
  and note_chunks.metadata @> filter
  order by note_chunks.embedding <=> query_embedding
  limit match_count;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.reactivate_listing(listing_id uuid, listing_type text)
 RETURNS timestamp with time zone
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_price numeric;
    v_owner_id uuid;
    v_title text;
    v_fee numeric;
    v_balance numeric;
    v_expires_at timestamptz;
BEGIN
    -- 1. Fetch details based on type
    IF listing_type = 'product' THEN
        SELECT price, seller_id, title INTO v_price, v_owner_id, v_title FROM public.products WHERE id = listing_id;
    ELSIF listing_type = 'service' THEN
        SELECT price, provider_id, title INTO v_price, v_owner_id, v_title FROM public.services WHERE id = listing_id;
    ELSIF listing_type = 'accommodation' THEN
        SELECT price, owner_id, name INTO v_price, v_owner_id, v_title FROM public.accommodations WHERE id = listing_id;
    ELSE
        RAISE EXCEPTION 'Invalid listing type';
    END IF;

    -- 2. Security Check
    IF v_owner_id != auth.uid() THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    -- 3. Calculate Fee (0.1%)
    v_fee := v_price * 0.001;

    -- 4. Check Wallet
    SELECT balance INTO v_balance FROM public.wallets WHERE user_id = auth.uid();
    IF v_balance < v_fee THEN
        RAISE EXCEPTION 'Insufficient wallet balance for reactivation fee (TZS %)', v_fee;
    END IF;

    -- 5. Process Transaction
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = auth.uid();
    
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, description, reference_id)
    SELECT id, v_fee, 'fee', 'Reactivation fee for ' || v_title, listing_id::text
    FROM public.wallets WHERE user_id = auth.uid();

    -- 6. Reactivate (Trigger will reset expires_at)
    IF listing_type = 'product' THEN UPDATE public.products SET is_active = true WHERE id = listing_id RETURNING expires_at INTO v_expires_at;
    ELSIF listing_type = 'service' THEN UPDATE public.services SET is_active = true WHERE id = listing_id RETURNING expires_at INTO v_expires_at;
    ELSIF listing_type = 'accommodation' THEN UPDATE public.accommodations SET is_active = true WHERE id = listing_id RETURNING expires_at INTO v_expires_at;
    END IF;

    RETURN v_expires_at;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.deduct_wallet_balance(p_user_id uuid, p_amount numeric, p_description text, p_reference_id text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_current_balance NUMERIC;
    v_new_balance NUMERIC;
BEGIN
    SELECT balance INTO v_current_balance FROM public.wallets WHERE user_id = p_user_id FOR UPDATE;
    IF v_current_balance IS NULL THEN
        INSERT INTO public.wallets (user_id, balance) VALUES (p_user_id, 0) RETURNING balance INTO v_current_balance;
    END IF;
    IF v_current_balance < p_amount THEN
        RETURN jsonb_build_object('success', false, 'message', 'Insufficient balance');
    END IF;
    v_new_balance := v_current_balance - p_amount;
    UPDATE public.wallets SET balance = v_new_balance WHERE user_id = p_user_id;
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_user_id, -p_amount, 'fee', p_reference_id, p_description);
    RETURN jsonb_build_object('success', true, 'new_balance', v_new_balance);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.submit_payment_proof(p_amount numeric, p_transaction_ref text, p_payer_phone text, p_type text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS manual_payment_requests
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_request public.manual_payment_requests;
BEGIN
    -- Check for existing reference before trying to insert to give a cleaner error if possible
    -- However, the UNIQUE index will catch it anyway.
    INSERT INTO public.manual_payment_requests (user_id, amount, transaction_ref, payer_phone, type, metadata)
    VALUES (auth.uid(), p_amount, p_transaction_ref, p_payer_phone, p_type, p_metadata)
    RETURNING * INTO v_request;
    RETURN v_request;
EXCEPTION 
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Transaction reference % already submitted', p_transaction_ref;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.perform_maintenance()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- Mark listings as expired if they reached their date
    -- (Assuming they have an expires_at column as seen in triggers)
    UPDATE public.products SET status = 'expired' WHERE expires_at < NOW() AND status = 'active';
    UPDATE public.services SET status = 'expired' WHERE expires_at < NOW() AND status = 'active';
    UPDATE public.accommodations SET status = 'expired' WHERE expires_at < NOW() AND status = 'active';

    -- Cleanup old trigger logs (keep last 30 days)
    DELETE FROM public.trigger_logs WHERE created_at < NOW() - INTERVAL '30 days';
    
    RAISE NOTICE 'Maintenance completed.';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.word_similarity_commutator_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_commutator_op$function$
;

CREATE OR REPLACE FUNCTION public.similarity_dist(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$similarity_dist$function$
;

CREATE OR REPLACE FUNCTION public.word_similarity_dist_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_dist_op$function$
;

CREATE OR REPLACE FUNCTION public.word_similarity_dist_commutator_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$word_similarity_dist_commutator_op$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_in(cstring)
 RETURNS gtrgm
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_in$function$
;

CREATE OR REPLACE FUNCTION public.approve_manual_payment(p_request_id uuid, p_admin_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_request public.manual_payment_requests;
    v_wallet_result JSONB;
BEGIN
    -- AUTH CHECK
    IF NOT public.is_admin() THEN
        RETURN jsonb_build_object('success', false, 'message', 'Unauthorized: Admin access required');
    END IF;

    SELECT * INTO v_request FROM public.manual_payment_requests WHERE id = p_request_id AND status = 'pending' FOR UPDATE;
    IF v_request IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Request not found or already processed');
    END IF;
    
    SELECT credit_wallet_balance(v_request.user_id, v_request.amount, v_request.transaction_ref, 'Manual Payment Approved') INTO v_wallet_result;
    
    IF (v_wallet_result->>'success')::BOOLEAN THEN
        UPDATE public.manual_payment_requests SET status = 'approved', admin_note = p_admin_note, updated_at = now() WHERE id = p_request_id;
        RETURN jsonb_build_object('success', true, 'message', 'Approved and credited');
    ELSE
        RETURN v_wallet_result;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_subscription_renewal()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- Only act if transitioning TO active
    IF NEW.status = 'active' AND (OLD.status != 'active' OR OLD.status IS NULL) THEN
        -- Restore Products
        UPDATE public.products 
        SET is_active = true, 
            metadata = metadata - 'deactivated_reason'
        WHERE seller_id = NEW.seller_id 
        AND metadata->>'deactivated_reason' = 'subscription_expired';

        -- Restore Services
        UPDATE public.services 
        SET is_active = true, 
            metadata = metadata - 'deactivated_reason'
        WHERE provider_id = NEW.seller_id 
        AND metadata->>'deactivated_reason' = 'subscription_expired';

        -- Restore Accommodations
        UPDATE public.accommodations 
        SET is_active = true, 
            metadata = metadata - 'deactivated_reason'
        WHERE owner_id = NEW.seller_id 
        AND metadata->>'deactivated_reason' = 'subscription_expired';
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_order_status_notification()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF (OLD.status != NEW.status) THEN
        INSERT INTO public.notifications (user_id, title, message, type)
        VALUES (
            NEW.student_id, 
            'Order Update', 
            'Your order #' || NEW.id || ' is now ' || NEW.status, 
            'info'
        );
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_out(gtrgm)
 RETURNS cstring
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_out$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_consistent(internal, text, smallint, oid, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_consistent$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_distance(internal, text, smallint, oid, internal)
 RETURNS double precision
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_distance$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_compress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_compress$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_decompress(internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_decompress$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_penalty(internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_penalty$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_picksplit(internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_picksplit$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_union(internal, internal)
 RETURNS gtrgm
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_union$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_same(gtrgm, gtrgm, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_same$function$
;

CREATE OR REPLACE FUNCTION public.gin_extract_value_trgm(text, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_extract_value_trgm$function$
;

CREATE OR REPLACE FUNCTION public.gin_extract_query_trgm(text, internal, smallint, internal, internal, internal, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_extract_query_trgm$function$
;

CREATE OR REPLACE FUNCTION public.gin_trgm_consistent(internal, smallint, text, integer, internal, internal, internal, internal)
 RETURNS boolean
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_trgm_consistent$function$
;

CREATE OR REPLACE FUNCTION public.decrement_free_listings(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE public.users 
    SET free_listings_count = GREATEST(0, free_listings_count - 1)
    WHERE id = p_user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.debug_realtime()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  RAISE NOTICE 'REALTIME DEBUG: Message inserted into public.messages with ID %', NEW.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_subscription_expiry()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update expired subscriptions
    UPDATE public.enterprise_subscriptions 
    SET status = 'expired'
    WHERE end_date < NOW() AND status = 'active';
    
    -- Update user subscription status
    UPDATE public.users 
    SET subscription_status = 'expired'
    WHERE id IN (
        SELECT user_id FROM public.enterprise_subscriptions 
        WHERE end_date < NOW() AND status = 'expired'
    );
    
    -- Send notifications for expired subscriptions
    INSERT INTO public.notifications (user_id, title, message, type, data)
    SELECT 
        user_id,
        'Subscription Expired',
        'Your enterprise subscription has expired. Renew now to continue enjoying unlimited listings.',
        'subscription_expiry',
        jsonb_build_object('subscription_id', id)
    FROM public.enterprise_subscriptions 
    WHERE end_date < NOW() AND status = 'expired';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_wallet_balance()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update wallet balance when transaction is completed
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE public.wallets 
        SET balance = balance + NEW.amount
        WHERE id = NEW.wallet_id;
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_listing_expiry()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update expired listings
    UPDATE public.products 
    SET is_active_listing = false
    WHERE listing_end_date < NOW() AND is_active_listing = true;
    
    -- Send notifications for expired listings
    INSERT INTO public.notifications (user_id, title, message, type, data)
    SELECT 
        seller_id,
        'Listing Expired',
        'Your product "' || name || '" has expired. You can renew it now.',
        'listing_expiry',
        jsonb_build_object('product_id', id, 'product_name', name)
    FROM public.products 
    WHERE listing_end_date < NOW() AND is_active_listing = false;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_promotion_expiry()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update expired promotions
    UPDATE public.promotions 
    SET status = 'expired'
    WHERE end_date < NOW() AND status = 'active';
    
    -- Send notifications for expired promotions
    INSERT INTO public.notifications (user_id, title, message, type, data)
    SELECT 
        user_id,
        'Promotion Expired',
        'Your promotion "' || title || '" has expired. Create a new promotion to continue advertising.',
        'promotion_expiry',
        jsonb_build_object('promotion_id', id, 'promotion_title', title)
    FROM public.promotions 
    WHERE end_date < NOW() AND status = 'expired';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.ensure_single_default_payment_method()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- If setting a payment method as default, unset all other defaults for this user
    IF NEW.is_default = true THEN
        UPDATE public.payment_methods 
        SET is_default = false 
        WHERE user_id = NEW.user_id AND id != NEW.id;
    END IF;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.process_azampay_callback(p_payment_id uuid, p_status text, p_transaction_id text DEFAULT NULL::text, p_message text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update the payment status
    UPDATE public.azampay_payments
    SET 
        status = p_status,
        transaction_id = p_transaction_id,
        message = p_message,
        updated_at = now()
    WHERE id = p_payment_id;
    
    -- If payment is successful, create a corresponding payment transaction
    IF p_status = 'success' THEN
        INSERT INTO public.payment_transactions (
            user_id,
            provider,
            amount,
            currency,
            description,
            status,
            external_transaction_id,
            payment_reference,
            metadata,
            created_at,
            updated_at,
            completed_at
        )
        SELECT 
            user_id,
            payment_provider,
            amount,
            currency,
            description,
            'completed',
            p_transaction_id,
            bill_reference,
            jsonb_build_object(
                'azampay_payment_id', p_payment_id,
                'payment_provider', payment_provider
            ),
            now(),
            now(),
            now()
        FROM public.azampay_payments
        WHERE id = p_payment_id;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_payment_statistics(p_user_id uuid, p_start_date timestamp with time zone DEFAULT NULL::timestamp with time zone, p_end_date timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS TABLE(total_transactions bigint, total_amount numeric, successful_transactions bigint, failed_transactions bigint, pending_transactions bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(amount), 0) as total_amount,
        COUNT(*) FILTER (WHERE status = 'completed') as successful_transactions,
        COUNT(*) FILTER (WHERE status = 'failed') as failed_transactions,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_transactions
    FROM public.payment_transactions
    WHERE user_id = p_user_id
    AND (p_start_date IS NULL OR created_at >= p_start_date)
    AND (p_end_date IS NULL OR created_at <= p_end_date);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_payment_method_usage(p_user_id uuid)
 RETURNS TABLE(provider text, usage_count bigint, total_amount numeric, last_used timestamp with time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        pt.provider,
        COUNT(*) as usage_count,
        COALESCE(SUM(pt.amount), 0) as total_amount,
        MAX(pt.created_at) as last_used
    FROM public.payment_transactions pt
    WHERE pt.user_id = p_user_id
    AND pt.status = 'completed'
    GROUP BY pt.provider
    ORDER BY usage_count DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.process_payment_refund(p_transaction_id uuid, p_refund_amount numeric, p_reason text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_original_transaction record;
    v_refund_transaction_id uuid;
BEGIN
    -- Get original transaction details
    SELECT * INTO v_original_transaction
    FROM public.payment_transactions
    WHERE id = p_transaction_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Transaction not found';
    END IF;
    
    -- Create refund transaction
    INSERT INTO public.payment_transactions (
        user_id,
        provider,
        amount,
        currency,
        description,
        status,
        metadata,
        created_at,
        updated_at
    )
    VALUES (
        v_original_transaction.user_id,
        v_original_transaction.provider,
        -p_refund_amount, -- Negative amount for refund
        v_original_transaction.currency,
        'Refund: ' || p_reason,
        'pending',
        jsonb_build_object(
            'refund_for', p_transaction_id,
            'reason', p_reason,
            'original_amount', v_original_transaction.amount
        ),
        now(),
        now()
    )
    RETURNING id INTO v_refund_transaction_id;
    
    RETURN v_refund_transaction_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_user_wallet()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.wallets (user_id, balance, currency)
    VALUES (NEW.id, 0.0, 'TZS');
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gin_trgm_triconsistent(internal, smallint, text, integer, internal, internal, internal)
 RETURNS "char"
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gin_trgm_triconsistent$function$
;

CREATE OR REPLACE FUNCTION public.strict_word_similarity(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity$function$
;

CREATE OR REPLACE FUNCTION public.strict_word_similarity_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_op$function$
;

CREATE OR REPLACE FUNCTION public.strict_word_similarity_commutator_op(text, text)
 RETURNS boolean
 LANGUAGE c
 STABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_commutator_op$function$
;

CREATE OR REPLACE FUNCTION public.strict_word_similarity_dist_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_dist_op$function$
;

CREATE OR REPLACE FUNCTION public.strict_word_similarity_dist_commutator_op(text, text)
 RETURNS real
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$strict_word_similarity_dist_commutator_op$function$
;

CREATE OR REPLACE FUNCTION public.gtrgm_options(internal)
 RETURNS void
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE
AS '$libdir/pg_trgm', $function$gtrgm_options$function$
;

CREATE OR REPLACE FUNCTION public.mark_notification_read(notification_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE public.notifications
    SET is_read = TRUE, updated_at = NOW()
    WHERE id = notification_id AND user_id = auth.uid();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.mark_all_notifications_read()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE public.notifications
    SET is_read = TRUE, updated_at = NOW()
    WHERE user_id = auth.uid() AND is_read = FALSE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cleanup_old_notifications()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM public.notifications
    WHERE is_read = TRUE 
    AND created_at < NOW() - INTERVAL '30 days';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_accommodation_views(accommodation_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.accommodations SET view_count = view_count + 1 WHERE id = accommodation_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_helpful_count(review_id uuid, table_name text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  EXECUTE format('UPDATE %I SET helpful_count = helpful_count + 1 WHERE id = $1', table_name)
  USING review_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_product_rating()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.products
  SET 
    rating = (SELECT AVG(rating) FROM public.product_reviews WHERE item_id = COALESCE(NEW.item_id, OLD.item_id)),
    review_count = (SELECT COUNT(*) FROM public.product_reviews WHERE item_id = COALESCE(NEW.item_id, OLD.item_id))
  WHERE id = COALESCE(NEW.item_id, OLD.item_id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_service_rating()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.services
  SET 
    rating = (SELECT AVG(rating) FROM public.service_reviews WHERE item_id = COALESCE(NEW.item_id, OLD.item_id)),
    review_count = (SELECT COUNT(*) FROM public.service_reviews WHERE item_id = COALESCE(NEW.item_id, OLD.item_id))
  WHERE id = COALESCE(NEW.item_id, OLD.item_id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_accommodation_rating()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.accommodations
  SET 
    rating = (SELECT AVG(rating) FROM public.accommodation_reviews WHERE item_id = COALESCE(NEW.item_id, OLD.item_id)),
    review_count = (SELECT COUNT(*) FROM public.accommodation_reviews WHERE item_id = COALESCE(NEW.item_id, OLD.item_id))
  WHERE id = COALESCE(NEW.item_id, OLD.item_id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_all_test_users()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Delete from public.users first (due to foreign keys)
  DELETE FROM public.users;
  
  -- Note: Deleting from auth.users requires service_role key
  -- This function can only delete from public.users via SQL
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_product_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  user_university_ids uuid[];
  recipient_user_id uuid;
  user_prefs jsonb;
BEGIN
  -- Get the universities associated with the new product
  user_university_ids := NEW.university_ids;

  -- Find users who have overlapping university preferences and are not the product creator
  FOR recipient_user_id IN
    SELECT id
    FROM public.users
    WHERE id != NEW.seller_id
      AND university_ids && user_university_ids -- Use && operator for array overlap
  LOOP
    -- Check if user has product notifications enabled
    SELECT notification_preferences INTO user_prefs
    FROM public.users
    WHERE id = recipient_user_id;
    
    -- Only send notification if user has product notifications enabled
    IF user_prefs->>'products' = 'true' THEN
      INSERT INTO public.notifications (user_id, type, title, message, data)
      VALUES (
        recipient_user_id,
        'product',
        'New Product in Your University!',
        'A new product "' || NEW.name || '" has been posted in one of your preferred universities.',
        jsonb_build_object('product_id', NEW.id)
      );
    END IF;
  END LOOP;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_promotion_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  user_prefs jsonb;
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  SELECT
    id,
    'promotion',
    'New Promotion: ' || NEW.title,
    NEW.description,
    jsonb_build_object('promotion_id', NEW.id)
  FROM public.users
  WHERE id != NEW.created_by -- Exclude the promoter
    AND notification_preferences->>'promotions' = 'true'; -- Only if enabled

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_notifications_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_university_users_product()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    product_universities TEXT[];
    user_record RECORD;
    university_count INTEGER;
BEGIN
    -- Get the universities associated with the new product
    product_universities := NEW.university_ids;
    
    -- Skip if no universities are associated
    IF product_universities IS NULL OR array_length(product_universities, 1) IS NULL THEN
        RETURN NEW;
    END IF;
    
    -- Count how many users we're about to notify
    SELECT COUNT(*) INTO university_count
    FROM public.users u
    WHERE u.id != NEW.seller_id  -- Don't notify the seller
    AND (
        -- Users with university_ids that overlap with product universities
        (u.university_ids IS NOT NULL AND array_length(u.university_ids, 1) > 0 AND u.university_ids && product_universities)
        OR
        -- Users without university_ids (notify them too for better engagement)
        (u.university_ids IS NULL OR array_length(u.university_ids, 1) IS NULL)
    );
    
    -- Log the notification attempt
    RAISE NOTICE 'Creating notifications for % users for product: %', university_count, NEW.name;
    
    -- Find all users who should be notified
    FOR user_record IN
        SELECT DISTINCT u.id, u.username, u.university_ids
        FROM public.users u
        WHERE u.id != NEW.seller_id  -- Don't notify the seller
        AND (
            -- Users with university_ids that overlap with product universities
            (u.university_ids IS NOT NULL AND array_length(u.university_ids, 1) > 0 AND u.university_ids && product_universities)
            OR
            -- Users without university_ids (notify them too for better engagement)
            (u.university_ids IS NULL OR array_length(u.university_ids, 1) IS NULL)
        )
    LOOP
        -- Create notification for each matching user
        INSERT INTO public.notifications (
            user_id,
            type,
            title,
            message,
            data,
            created_at
        ) VALUES (
            user_record.id,
            'product',
            CASE 
                WHEN user_record.university_ids IS NOT NULL AND array_length(user_record.university_ids, 1) > 0 
                THEN 'New Product in Your University'
                ELSE 'New Product Available'
            END,
            CASE 
                WHEN user_record.university_ids IS NOT NULL AND array_length(user_record.university_ids, 1) > 0 
                THEN 'A new product "' || NEW.name || '" has been listed in your university network!'
                ELSE 'A new product "' || NEW.name || '" has been listed! Check it out.'
            END,
            jsonb_build_object(
                'product_id', NEW.id,
                'product_name', NEW.name,
                'seller_id', NEW.seller_id,
                'price', NEW.price,
                'category', NEW.category,
                'university_ids', NEW.university_ids
            ),
            NOW()
        );
        
        -- Log each notification creation
        RAISE NOTICE 'Created notification for user: % (username: %)', user_record.id, user_record.username;
    END LOOP;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_university_users_promotion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    user_record RECORD;
    user_count INTEGER;
BEGIN
    -- Count users to notify
    SELECT COUNT(*) INTO user_count
    FROM public.users
    WHERE id != NEW.created_by;  -- Don't notify the creator
    
    -- Log the notification attempt
    RAISE NOTICE 'Creating promotion notifications for % users', user_count;
    
    -- Notify all active users about new promotions
    FOR user_record IN
        SELECT DISTINCT id, username
        FROM public.users
        WHERE id != NEW.created_by  -- Don't notify the creator
    LOOP
        -- Create notification for each user
        INSERT INTO public.notifications (
            user_id,
            type,
            title,
            message,
            data,
            created_at
        ) VALUES (
            user_record.id,
            'promotion',
            'New Promotion Available!',
            NEW.title || ' - ' || COALESCE(NEW.description, 'Check out this amazing offer!'),
            jsonb_build_object(
                'promotion_id', NEW.id,
                'title', NEW.title,
                'discount_type', NEW.discount_type,
                'discount_value', NEW.discount_value,
                'start_date', NEW.start_date,
                'end_date', NEW.end_date
            ),
            NOW()
        );
        
        -- Log each notification creation
        RAISE NOTICE 'Created promotion notification for user: % (username: %)', user_record.id, user_record.username;
    END LOOP;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_user_universities(university_ids text[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- Validate that we don't exceed 5 universities
    IF array_length(university_ids, 1) > 5 THEN
        RAISE EXCEPTION 'Users can select up to 5 universities maximum';
    END IF;
    
    -- Update the user's university preferences
    UPDATE public.users
    SET university_ids = university_ids,
        updated_at = NOW()
    WHERE id = auth.uid();
    
    -- Log the update
    RAISE NOTICE 'Updated university preferences for user: %', auth.uid();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_universities()
 RETURNS text[]
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    user_universities TEXT[];
BEGIN
    SELECT university_ids INTO user_universities
    FROM public.users
    WHERE id = auth.uid();
    
    RETURN COALESCE(user_universities, ARRAY[]::TEXT[]);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_product_views(product_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.products SET view_count = view_count + 1 WHERE id = product_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_service_views(service_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.services SET view_count = view_count + 1 WHERE id = service_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_service_with_universities(p_title text, p_description text, p_price numeric, p_category text, p_price_type text, p_images text[], p_provider_id uuid, p_location text, p_contact_phone text, p_contact_email text, p_availability text[], p_metadata jsonb DEFAULT '{}'::jsonb, p_is_global boolean DEFAULT false)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_service_id UUID;
  v_universities UUID[];
BEGIN
  IF p_is_global THEN
    v_universities := ARRAY[]::UUID[];
  ELSE
    v_universities := get_user_universities(p_provider_id);
    IF v_universities IS NULL OR array_length(v_universities, 1) = 0 THEN
      RAISE EXCEPTION 'User must have at least one university to post services locally.';
    END IF;
  END IF;

  INSERT INTO services (
    title, description, price, category, price_type, images,
    provider_id, university_ids, location, contact_phone, contact_email,
    availability, metadata, created_at
  ) VALUES (
    p_title, p_description, p_price, p_category, p_price_type, p_images,
    p_provider_id, v_universities, p_location, p_contact_phone, p_contact_email,
    p_availability, p_metadata, NOW()
  )
  RETURNING id INTO v_service_id;
  
  RETURN v_service_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cancel_incomplete_registration(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Delete user if registration not completed
  DELETE FROM users 
  WHERE id = p_user_id 
  AND registration_completed = false;
  
  -- Also delete from auth.users (if admin policy allows)
  -- Note: This requires special permissions and might need manual admin action
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cleanup_abandoned_registrations()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_deleted_count INTEGER;
BEGIN
  -- Delete users who didn't complete registration within 24 hours
  WITH deleted AS (
    DELETE FROM users
    WHERE registration_completed = false
    AND created_at < NOW() - INTERVAL '24 hours'
    RETURNING id
  )
  SELECT COUNT(*) INTO v_deleted_count FROM deleted;
  
  RETURN v_deleted_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.complete_registration_with_universities(p_user_id uuid, p_primary_university_id uuid, p_subsidiary_university_ids uuid[] DEFAULT '{}'::uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_result JSONB;
  v_user_exists BOOLEAN;
  v_primary_uni_exists BOOLEAN;
BEGIN
  -- Start transaction (implicit in function)
  
  -- Check if user exists and is not already completed
  SELECT EXISTS(
    SELECT 1 FROM users 
    WHERE id = p_user_id 
    AND registration_completed = false
  ) INTO v_user_exists;
  
  IF NOT v_user_exists THEN
    RAISE EXCEPTION 'User not found or registration already completed';
  END IF;
  
  -- Validate primary university exists
  SELECT EXISTS(
    SELECT 1 FROM universities WHERE id = p_primary_university_id
  ) INTO v_primary_uni_exists;
  
  IF NOT v_primary_uni_exists THEN
    RAISE EXCEPTION 'Primary university not found';
  END IF;
  
  -- Validate all subsidiary universities exist (if provided)
  IF p_subsidiary_university_ids IS NOT NULL AND array_length(p_subsidiary_university_ids, 1) > 0 THEN
    IF array_length(p_subsidiary_university_ids, 1) > 4 THEN
      RAISE EXCEPTION 'Cannot have more than 4 subsidiary universities';
    END IF;
    
    -- Check all subsidiary universities exist
    IF (
      SELECT COUNT(*) FROM universities 
      WHERE id = ANY(p_subsidiary_university_ids)
    ) <> array_length(p_subsidiary_university_ids, 1) THEN
      RAISE EXCEPTION 'One or more subsidiary universities not found';
    END IF;
  END IF;
  
  -- Update user with university selections and mark registration as complete
  -- Only set primary_university_id and subsidiary_university_ids (no more university_id)
  UPDATE users SET
    primary_university_id = p_primary_university_id,
    subsidiary_university_ids = p_subsidiary_university_ids,
    registration_completed = true,
    registration_step = 'completed',
    updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Return success with user data
  SELECT jsonb_build_object(
    'success', true,
    'user_id', p_user_id,
    'primary_university_id', p_primary_university_id,
    'subsidiary_count', COALESCE(array_length(p_subsidiary_university_ids, 1), 0)
  ) INTO v_result;
  
  RETURN v_result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Rollback happens automatically on exception
    RAISE EXCEPTION 'Registration completion failed: %', SQLERRM;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_universities(p_user_id uuid)
 RETURNS uuid[]
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_universities UUID[];
  v_primary_id UUID;
  v_subsidiary_ids UUID[];
BEGIN
  -- Get user's primary and subsidiary universities
  SELECT 
    primary_university_id,
    subsidiary_university_ids
  INTO v_primary_id, v_subsidiary_ids
  FROM users
  WHERE id = p_user_id;
  
  -- Start with primary university
  IF v_primary_id IS NOT NULL THEN
    v_universities := ARRAY[v_primary_id];
  ELSE
    v_universities := ARRAY[]::UUID[];
  END IF;
  
  -- Add subsidiary universities if they exist
  IF v_subsidiary_ids IS NOT NULL AND array_length(v_subsidiary_ids, 1) > 0 THEN
    v_universities := v_universities || v_subsidiary_ids;
  END IF;
  
  -- Remove duplicates using DISTINCT
  SELECT ARRAY_AGG(DISTINCT uni_id)
  INTO v_universities
  FROM unnest(v_universities) AS uni_id
  WHERE uni_id IS NOT NULL;
  
  RETURN COALESCE(v_universities, ARRAY[]::UUID[]);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_admins_on_seller_request()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  admin_user RECORD;
  requester_name TEXT;
  requester_email TEXT;
BEGIN
  -- Only process new seller requests (not updates)
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- Get requester information
    SELECT full_name, email INTO requester_name, requester_email
    FROM users
    WHERE id = NEW.user_id;
    
    -- Loop through all admin users and create notifications
    FOR admin_user IN 
      SELECT id, full_name, email
      FROM users
      WHERE role = 'admin'
    LOOP
      -- Insert notification for each admin
      INSERT INTO notifications (
        user_id,
        type,
        title,
        message,
        action_url,
        metadata
      ) VALUES (
        admin_user.id,
        'seller_request',
        'New Seller Request',
        COALESCE(requester_name, 'A user') || ' has requested to become a seller.',
        '/admin/seller-requests',
        jsonb_build_object(
          'seller_request_id', NEW.id,
          'requester_id', NEW.user_id,
          'requester_name', requester_name,
          'requester_email', requester_email,
          'reason', NEW.reason
        )
      );
    END LOOP;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_product_with_universities(p_title text, p_description text, p_price numeric, p_category text, p_condition text, p_images text[], p_seller_id uuid, p_location text, p_metadata jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_product_id UUID;
  v_universities UUID[];
  v_affected_user_ids UUID[];
  v_user_role TEXT;
  v_is_seller_approved BOOLEAN;
  v_user_id UUID;
BEGIN
  -- Check user's role and seller approval status
  SELECT role, is_seller_approved
  INTO v_user_role, v_is_seller_approved
  FROM users
  WHERE id = p_seller_id;
  
  -- Only sellers and admins can post products
  IF v_user_role = 'buyer' OR (v_user_role = 'seller' AND v_is_seller_approved = false) THEN
    RAISE EXCEPTION 'Only approved sellers and admins can post products. Please request seller access first.';
  END IF;
  
  -- Get seller's universities
  v_universities := get_user_universities(p_seller_id);
  
  -- Validate that user has at least one university
  IF v_universities IS NULL OR array_length(v_universities, 1) = 0 THEN
    RAISE EXCEPTION 'User must have at least one university to post products';
  END IF;
  
  -- Create the product
  INSERT INTO products (
    title, description, price, category, condition, images,
    seller_id, university_ids, location, metadata, created_at
  ) VALUES (
    p_title, p_description, p_price, p_category, p_condition, p_images,
    p_seller_id, v_universities, p_location, p_metadata, NOW()
  )
  RETURNING id INTO v_product_id;
  
  -- Find users who share at least one university
  SELECT ARRAY_AGG(DISTINCT id) INTO v_affected_user_ids
  FROM users
  WHERE id != p_seller_id
    AND (
      primary_university_id = ANY(v_universities)
      OR subsidiary_university_ids && v_universities
    );
  
  -- Create notifications and send push notifications for matching users
  IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
    -- Create in-app notifications
    INSERT INTO notifications (user_id, type, title, message, action_url, metadata, created_at)
    SELECT 
      unnest(v_affected_user_ids),
      'promotion',
      'New Product Available',
      p_title || ' is now available in your university',
      '/product-details?productId=' || v_product_id,
      jsonb_build_object(
        'product_id', v_product_id,
        'seller_id', p_seller_id,
        'category', p_category
      ),
      NOW();
    
    -- Send push notifications
    FOREACH v_user_id IN ARRAY v_affected_user_ids
    LOOP
      PERFORM send_push_notification(
        v_user_id,
        'New Product Available',
        p_title || ' is now available in your university',
        'promotion',
        '/product-details?productId=' || v_product_id,
        jsonb_build_object(
          'productId', v_product_id,
          'itemType', 'product'
        )
      );
    END LOOP;
  END IF;
  
  RETURN v_product_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_user_last_seen(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE users
  SET 
    last_seen_at = NOW(),
    is_online = TRUE
  WHERE id = user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.mark_user_offline(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE users
  SET is_online = FALSE
  WHERE id = user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_online_status(user_id uuid)
 RETURNS TABLE(is_online boolean, last_seen_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT users.is_online, users.last_seen_at
  FROM users
  WHERE users.id = user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_product_with_universities(p_title text, p_description text, p_price numeric, p_category text, p_condition text, p_images text[], p_seller_id uuid, p_location text, p_metadata jsonb DEFAULT '{}'::jsonb, p_is_global boolean DEFAULT false)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_product_id UUID;
  v_universities UUID[];
  v_affected_user_ids UUID[];
  v_user_role TEXT;
  v_is_seller_approved BOOLEAN;
  v_user_id UUID;
BEGIN
  -- Check user's role and seller approval status
  SELECT role, is_seller_approved
  INTO v_user_role, v_is_seller_approved
  FROM users
  WHERE id = p_seller_id;
  
  -- Only sellers and admins can post products
  IF v_user_role = 'buyer' OR (v_user_role = 'seller' AND v_is_seller_approved = false) THEN
    RAISE EXCEPTION 'Only approved sellers and admins can post products. Please request seller access first.';
  END IF;
  
  -- Determine university tagging
  IF p_is_global THEN
    v_universities := ARRAY[]::UUID[];
  ELSE
    -- Get seller's universities
    v_universities := get_user_universities(p_seller_id);
    
    -- Validate that user has at least one university if not global
    IF v_universities IS NULL OR array_length(v_universities, 1) = 0 THEN
      RAISE EXCEPTION 'User must have at least one university to post products locally. Use Global Posting if you are a business.';
    END IF;
  END IF;
  
  -- Create the product
  INSERT INTO products (
    title, description, price, category, condition, images,
    seller_id, university_ids, location, metadata, created_at
  ) VALUES (
    p_title, p_description, p_price, p_category, p_condition, p_images,
    p_seller_id, v_universities, p_location, p_metadata, NOW()
  )
  RETURNING id INTO v_product_id;
  
  -- Notification logic (only for matching universities or global?)
  -- For now, let's notify users in the seller's universities if tagging exists, 
  -- or all users if it's truly global? (Global notification might be too much, 
  -- usually businesses target universities. Let's stick to seller's universities for notifications)
  
  IF NOT p_is_global AND v_universities IS NOT NULL AND array_length(v_universities, 1) > 0 THEN
    SELECT ARRAY_AGG(DISTINCT id) INTO v_affected_user_ids
    FROM users
    WHERE id != p_seller_id
      AND (
        primary_university_id = ANY(v_universities)
        OR subsidiary_university_ids && v_universities
      );
    
    IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
      INSERT INTO notifications (user_id, type, title, message, action_url, metadata, created_at)
      SELECT 
        unnest(v_affected_user_ids),
        'promotion',
        'New Product Available',
        p_title || ' is now available in your university',
        '/product-details?productId=' || v_product_id,
        jsonb_build_object(
          'product_id', v_product_id,
          'seller_id', p_seller_id,
          'category', p_category
        ),
        NOW();
    END IF;
  END IF;
  
  RETURN v_product_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reject_seller_request(request_id uuid, admin_id uuid, notes text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  requester_id UUID;
  requester_name TEXT;
BEGIN
  -- Get requester info
  SELECT user_id INTO requester_id
  FROM seller_requests
  WHERE id = request_id AND status = 'pending';

  IF requester_id IS NULL THEN
    RAISE EXCEPTION 'Request not found or already processed';
  END IF;

  SELECT full_name INTO requester_name
  FROM users
  WHERE id = requester_id;

  -- Update seller request
  UPDATE seller_requests
  SET 
    status = 'rejected',
    reviewed_by = admin_id,
    reviewed_at = NOW(),
    review_notes = notes
  WHERE id = request_id;

  -- Notify the user
  INSERT INTO notifications (
    id,
    user_id,
    type,
    title,
    message,
    data,
    is_read,
    created_at
  ) VALUES (
    gen_random_uuid(),
    requester_id,
    'seller_request_rejected',
    'Seller Request Update',
    'Your request to become a seller has been reviewed. ' || COALESCE(notes, 'Please contact support for more information.'),
    jsonb_build_object(
      'request_id', request_id,
      'review_notes', notes
    ),
    false,
    NOW()
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.enqueue_rag_processing(p_note_id uuid, p_file_path text, p_bucket_name text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  v_msg_id bigint;
begin
  -- 1. Track status
  insert into document_processing_status (note_id, status)
  values (p_note_id, 'PENDING')
  on conflict (note_id) do update set 
    status = 'PENDING', 
    updated_at = now();

  -- 2. Enqueue message
  select * into v_msg_id from pgmq.send(
    queue_name := 'rag_processing_queue',
    msg := jsonb_build_object(
      'note_id', p_note_id,
      'file_path', p_file_path,
      'bucket_name', p_bucket_name
    )
  );
  
  return jsonb_build_object('msg_id', v_msg_id, 'status', 'queued');
end;
$function$
;

CREATE OR REPLACE FUNCTION public.approve_seller_request(request_id uuid, admin_id uuid, notes text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  request_user_id UUID;
  v_trial_subscription_id UUID;
BEGIN
  -- Check if caller is admin
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = admin_id AND role = 'admin') THEN
    RAISE EXCEPTION 'Only admins can approve seller requests';
  END IF;
  
  -- Get user_id from request
  SELECT user_id INTO request_user_id FROM seller_requests WHERE id = request_id;
  
  IF request_user_id IS NULL THEN
    RAISE EXCEPTION 'Seller request not found';
  END IF;
  
  -- Update request status
  UPDATE seller_requests
  SET 
    status = 'approved',
    reviewed_by = admin_id,
    review_notes = notes,
    reviewed_at = NOW(),
    updated_at = NOW()
  WHERE id = request_id;
  
  -- Update user role
  UPDATE users SET role = 'seller', updated_at = NOW() WHERE id = request_user_id;
  
  -- Create free trial subscription (1 month free)
  SELECT create_free_trial_subscription(request_user_id) INTO v_trial_subscription_id;
  
  -- Create notification
  INSERT INTO notifications (user_id, type, title, message, data)
  VALUES (
    request_user_id,
    'seller_request',
    'Seller Request Approved',
    'Congratulations! You are now a seller. You have received a 1-month free trial to start listing your products, services, and accommodations.',
    jsonb_build_object(
      'subscription_id', v_trial_subscription_id,
      'trial_ends_at', (SELECT trial_ends_at FROM seller_subscriptions WHERE id = v_trial_subscription_id)
    )
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.fetch_rag_job()
 RETURNS TABLE(msg_id bigint, read_ct integer, enqueued_at timestamp with time zone, vt timestamp with time zone, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  return query
  select * from pgmq.read(
    queue_name := 'rag_processing_queue',
    vt := 60, -- 60 seconds visibility timeout (processing time)
    qty := 1
  );
end;
$function$
;

CREATE OR REPLACE FUNCTION public.complete_rag_job(p_msg_id bigint, p_note_id uuid, p_success boolean, p_error text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  -- 1. Remove from queue (Archive if success, Delete if you want to clean up)
  -- We'll delete for now to keep table small, or archive if you want history.
  -- pgmq.delete acts as "ACK".
  perform pgmq.delete('rag_processing_queue', p_msg_id);

  -- 2. Update status
  update document_processing_status
  set 
    status = case when p_success then 'COMPLETED' else 'FAILED' end,
    error_message = p_error,
    updated_at = now()
  where note_id = p_note_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_university_users_service(p_service_id uuid, p_provider_id uuid, p_university_ids uuid[], p_title text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_affected_user_ids UUID[];
BEGIN
  SELECT ARRAY_AGG(DISTINCT id) INTO v_affected_user_ids
  FROM users
  WHERE id != p_provider_id
    AND (
      primary_university_id = ANY(p_university_ids)
      OR subsidiary_university_ids && p_university_ids
    );
  
  IF v_affected_user_ids IS NOT NULL AND array_length(v_affected_user_ids, 1) > 0 THEN
    INSERT INTO notifications (user_id, type, title, message, action_url, metadata, created_at)
    SELECT 
      unnest(v_affected_user_ids),
      'service',
      'New Service Available',
      p_title || ' is now available in your university',
      '/service-details?serviceId=' || p_service_id,
      jsonb_build_object(
        'service_id', p_service_id,
        'provider_id', p_provider_id
      ),
      NOW();
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_accommodation_with_universities(p_name text, p_description text, p_price numeric, p_price_type text, p_room_type text, p_images text[], p_owner_id uuid, p_location text, p_contact_phone text, p_contact_email text, p_amenities text[], p_bedrooms integer, p_bathrooms integer, p_metadata jsonb DEFAULT '{}'::jsonb, p_is_global boolean DEFAULT false)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_accommodation_id UUID;
  v_universities UUID[];
BEGIN
  IF p_is_global THEN
    v_universities := ARRAY[]::UUID[];
  ELSE
    v_universities := get_user_universities(p_owner_id);
    IF v_universities IS NULL OR array_length(v_universities, 1) = 0 THEN
      RAISE EXCEPTION 'User must have at least one university to post accommodations locally.';
    END IF;
  END IF;

  INSERT INTO accommodations (
    name, description, price, price_type, room_type, images,
    owner_id, university_ids, location, contact_phone, contact_email,
    amenities, bedrooms, bathrooms, metadata, created_at
  ) VALUES (
    p_name, p_description, p_price, p_price_type, p_room_type, p_images,
    p_owner_id, v_universities, p_location, p_contact_phone, p_contact_email,
    p_amenities, p_bedrooms, p_bathrooms, p_metadata, NOW()
  )
  RETURNING id INTO v_accommodation_id;
  
  RETURN v_accommodation_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reject_manual_payment(p_request_id uuid, p_admin_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_request public.manual_payment_requests;
BEGIN
    -- AUTH CHECK
    IF NOT public.is_admin() THEN
        RETURN jsonb_build_object('success', false, 'message', 'Unauthorized: Admin access required');
    END IF;

    SELECT * INTO v_request FROM public.manual_payment_requests WHERE id = p_request_id AND status = 'pending' FOR UPDATE;
    IF v_request IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Request not found or already processed');
    END IF;
    
    UPDATE public.manual_payment_requests 
    SET status = 'rejected', admin_note = p_admin_note, updated_at = now() 
    WHERE id = p_request_id;
    
    RETURN jsonb_build_object('success', true, 'message', 'Request rejected');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_listing_v2(p_type text, p_data jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_listing_id UUID;
    v_creator_id UUID;
    v_universities UUID[];
    v_title TEXT := p_data->>'title';
    v_category_id UUID;
    v_condition_id UUID;
BEGIN
    v_creator_id := auth.uid();
    IF v_creator_id IS NULL THEN 
        v_creator_id := (p_data->>'user_id')::UUID; 
    END IF;

    -- Extract IDs if present, otherwise try to lookup by name (for backward compatibility during migration)
    v_category_id := (p_data->>'category_id')::UUID;
    IF v_category_id IS NULL AND p_data ? 'category' THEN
        SELECT id INTO v_category_id FROM public.product_categories WHERE name = p_data->>'category' LIMIT 1;
    END IF;

    v_condition_id := (p_data->>'condition_id')::UUID;
    IF v_condition_id IS NULL AND p_data ? 'condition' THEN
        SELECT id INTO v_condition_id FROM public.product_conditions WHERE name = p_data->>'condition' LIMIT 1;
    END IF;

    -- Fetch user's universities
    SELECT ARRAY_AGG(university_id) INTO v_universities
    FROM public.user_universities WHERE user_id = v_creator_id;

    IF v_universities IS NULL OR CARDINALITY(v_universities) = 0 THEN
        SELECT ARRAY[primary_university_id] INTO v_universities
        FROM public.users WHERE id = v_creator_id AND primary_university_id IS NOT NULL;
    END IF;

    CASE p_type
        WHEN 'product' THEN
            INSERT INTO public.products (
                title, description, price, category_id, condition_id, 
                images, seller_id, location, university_ids, metadata,
                category, condition -- Still setting text versions for compatibility if columns exist
            ) VALUES (
                v_title, p_data->>'description', (p_data->>'price')::NUMERIC, 
                v_category_id, v_condition_id,
                ARRAY(SELECT jsonb_array_elements_text(p_data->'images')),
                v_creator_id, COALESCE(p_data->>'location', 'Campus'), v_universities,
                COALESCE(p_data->'metadata', '{}'::jsonb),
                p_data->>'category', p_data->>'condition'
            ) RETURNING id INTO v_listing_id;
            
        WHEN 'service' THEN
            INSERT INTO public.services (
                title, description, price, category, price_type, 
                images, provider_id, location, university_ids, metadata
            ) VALUES (
                v_title, p_data->>'description', (p_data->>'price')::NUMERIC, 
                p_data->>'category', COALESCE(p_data->>'price_type', 'fixed'),
                ARRAY(SELECT jsonb_array_elements_text(p_data->'images')),
                v_creator_id, COALESCE(p_data->>'location', 'Campus'), v_universities,
                COALESCE(p_data->'metadata', '{}'::jsonb)
            ) RETURNING id INTO v_listing_id;

        WHEN 'accommodation' THEN
            v_title := COALESCE(p_data->>'name', p_data->>'title');
            INSERT INTO public.accommodations (
                name, description, price, price_type, room_type, 
                images, owner_id, location, university_ids, metadata
            ) VALUES (
                v_title, p_data->>'description', (p_data->>'price')::NUMERIC, 
                COALESCE(p_data->>'price_type', 'per_month'), p_data->>'room_type',
                ARRAY(SELECT jsonb_array_elements_text(p_data->'images')),
                v_creator_id, COALESCE(p_data->>'location', 'Near Campus'), v_universities,
                COALESCE(p_data->'metadata', '{}'::jsonb)
            ) RETURNING id INTO v_listing_id;

            -- Handle amenities
            IF p_data ? 'amenities' AND jsonb_array_length(p_data->'amenities') > 0 THEN
                INSERT INTO public.accommodation_amenities (accommodation_id, amenity_id)
                SELECT v_listing_id, (elem)::UUID
                FROM jsonb_array_elements_text(p_data->'amenities') AS elem
                ON CONFLICT DO NOTHING;
            END IF;
    END CASE;

    -- Junction table for universities
    IF v_listing_id IS NOT NULL AND v_universities IS NOT NULL THEN
        INSERT INTO public.listing_universities (listing_id, university_id, listing_type)
        SELECT v_listing_id, unnest(v_universities), p_type
        ON CONFLICT DO NOTHING;
    END IF;

    -- Notifications
    PERFORM public._handle_listing_notifications(v_listing_id, p_type, v_creator_id, v_title, v_universities);

    RETURN v_listing_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_promotion_atomic(p_title text, p_subtitle text, p_description text, p_start_date timestamp with time zone, p_end_date timestamp with time zone, p_image_url text, p_target_url text DEFAULT NULL::text, p_terms text[] DEFAULT '{}'::text[], p_type text DEFAULT 'banner'::text, p_video_url text DEFAULT NULL::text, p_priority integer DEFAULT 0, p_button_text text DEFAULT 'Shop Now'::text, p_user_id uuid DEFAULT NULL::uuid, p_external_link text DEFAULT NULL::text)
 RETURNS promotions
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_wallet_balance NUMERIC;
  v_fee NUMERIC := 0;
  v_days INT;
  v_promo public.promotions;
  v_user_role TEXT;
BEGIN
  -- Check user role
  SELECT role INTO v_user_role FROM public.users WHERE id = p_user_id;

  -- Logic: Admins promote for free. Others pay (e.g., 500 TZS per day)
  IF v_user_role = 'admin' THEN
    v_fee := 0;
  ELSE
    v_days := EXTRACT(DAY FROM (p_end_date - p_start_date));
    IF v_days <= 0 THEN v_days := 1; END IF;
    v_fee := v_days * 500; -- 500 TZS per day
  END IF;

  -- Get wallet balance
  SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = p_user_id;

  -- Balance check
  IF v_fee > 0 AND (v_wallet_balance IS NULL OR v_wallet_balance < v_fee) THEN
    RAISE EXCEPTION 'Insufficient balance. Promotion fee required: % TZS', v_fee;
  END IF;

  -- Deduct Fee
  IF v_fee > 0 THEN
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = p_user_id;
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_user_id, v_fee, 'fee', p_user_id::text, 'Promotion Fee: ' || p_title);
  END IF;

  -- Insert Promotion
  INSERT INTO public.promotions (
    title, subtitle, description, start_date, end_date, image_url, target_url, 
    terms, type, video_url, priority, button_text, user_id, external_link, is_active
  ) VALUES (
    p_title, p_subtitle, p_description, p_start_date, p_end_date, p_image_url, p_target_url, 
    p_terms, p_type, p_video_url, p_priority, p_button_text, p_user_id, p_external_link, TRUE
  ) RETURNING * INTO v_promo;

  RETURN v_promo;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.match_course_content(p_course_id uuid, query_embedding vector, match_threshold double precision DEFAULT 0.3, match_count integer DEFAULT 5, p_filter_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, content text, metadata jsonb, similarity double precision, source_id uuid, source_type text, source_title text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    combined.id,
    combined.content,
    combined.metadata,
    combined.similarity,
    combined.source_id,
    combined.source_type,
    combined.source_title
  FROM (
    -- Search note chunks
    SELECT
      nc.id,
      nc.content,
      nc.metadata,
      1 - (nc.embedding <=> query_embedding) as similarity,
      cn.id as source_id,
      'note'::text as source_type,
      cn.title as source_title
    FROM note_chunks nc
    JOIN course_notes cn ON cn.id = nc.note_id
    WHERE (p_course_id IS NULL OR cn.course_id = p_course_id)
    AND (p_filter_id IS NULL OR nc.note_id = p_filter_id)
    AND 1 - (nc.embedding <=> query_embedding) > match_threshold

    UNION ALL

    -- Search document chunks (official course materials)
    SELECT
      dc.id,
      dc.content,
      dc.metadata,
      1 - (dc.embedding <=> query_embedding) as similarity,
      d.id as source_id,
      'document'::text as source_type,
      d.title as source_title
    FROM document_chunks dc
    JOIN documents d ON d.id = dc.document_id
    WHERE (p_course_id IS NULL OR d.course_id = p_course_id)
    AND (p_filter_id IS NULL OR d.id = p_filter_id)
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ) AS combined
  ORDER BY combined.similarity DESC
  LIMIT match_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_manual_payment_event()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  admin_user RECORD;
  requester_name TEXT;
BEGIN
  -- 1. NOTIFY ADMINS on a NEW pending request
  IF (TG_OP = 'INSERT' AND NEW.status = 'pending') THEN
    -- Get requester name for the notification
    SELECT full_name INTO requester_name FROM public.users WHERE id = NEW.user_id;
    
    FOR admin_user IN SELECT id FROM public.users WHERE role = 'admin' LOOP
      INSERT INTO public.notifications (
        user_id,
        type,
        title,
        message,
        metadata
      ) VALUES (
        admin_user.id,
        'manual_payment_verification_required',
        'New Payment Verification',
        'User ' || COALESCE(requester_name, 'Unknown') || ' submitted a payment proof for TZS ' || NEW.amount || '.',
        jsonb_build_object(
          'request_id', NEW.id,
          'user_id', NEW.user_id,
          'amount', NEW.amount,
          'transaction_ref', NEW.transaction_ref
        )
      );
    END LOOP;
  END IF;

  -- 2. NOTIFY USER on status change (Approved/Rejected)
  IF (TG_OP = 'UPDATE' AND OLD.status = 'pending' AND NEW.status != 'pending') THEN
    IF NEW.status = 'approved' THEN
      INSERT INTO public.notifications (
        user_id,
        type,
        title,
        message,
        metadata
      ) VALUES (
        NEW.user_id,
        'manual_payment_approved',
        'Payment Verified!',
        'Your payment of TZS ' || NEW.amount || ' has been verified and added to your wallet.',
        jsonb_build_object(
          'request_id', NEW.id,
          'amount', NEW.amount,
          'status', 'approved'
        )
      );
    ELSIF NEW.status = 'rejected' THEN
      INSERT INTO public.notifications (
        user_id,
        type,
        title,
        message,
        metadata
      ) VALUES (
        NEW.user_id,
        'manual_payment_rejected',
        'Payment Rejected',
        'Your payment proof was rejected. ' || COALESCE(NEW.admin_note, 'Please check your transaction details and try again.'),
        jsonb_build_object(
          'request_id', NEW.id,
          'amount', NEW.amount,
          'status', 'rejected',
          'reason', NEW.admin_note
        )
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.process_listing_expirations()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- 1. Handling Student Expirations in Bulk
    -- Insert notifications for Expired Products
    INSERT INTO public.notifications (user_id, title, message, type, metadata)
    SELECT seller_id, 'Listing Expired', 'Your product "' || title || '" has expired after 21 days. You can repost it from your dashboard.', 'listing_expired', jsonb_build_object('id', id, 'type', 'product')
    FROM public.products WHERE expires_at < NOW() AND is_active = true;
    
    -- Deactivate Expired Products
    UPDATE public.products SET is_active = false WHERE expires_at < NOW() AND is_active = true;

    -- Insert notifications for Expired Services
    INSERT INTO public.notifications (user_id, title, message, type, metadata)
    SELECT provider_id, 'Listing Expired', 'Your service "' || title || '" has expired after 21 days. You can repost it from your dashboard.', 'listing_expired', jsonb_build_object('id', id, 'type', 'service')
    FROM public.services WHERE expires_at < NOW() AND is_active = true;

    -- Deactivate Expired Services
    UPDATE public.services SET is_active = false WHERE expires_at < NOW() AND is_active = true;

    -- Insert notifications for Expired Accommodations
    INSERT INTO public.notifications (user_id, title, message, type, metadata)
    SELECT owner_id, 'Listing Expired', 'Your accommodation "' || name || '" has expired after 21 days. You can repost it from your dashboard.', 'listing_expired', jsonb_build_object('id', id, 'type', 'accommodation')
    FROM public.accommodations WHERE expires_at < NOW() AND is_active = true;

    -- Deactivate Expired Accommodations
    UPDATE public.accommodations SET is_active = false WHERE expires_at < NOW() AND is_active = true;


    -- 2. Handling Business Subscription Expirations in Bulk
    -- CTE to find expired subs
    WITH expired_subs AS (
        SELECT seller_id FROM public.seller_subscriptions WHERE current_period_end < NOW() AND status = 'active'
    )
    -- Notify owners
    INSERT INTO public.notifications (user_id, title, message, type)
    SELECT seller_id, 'Subscription Expired', 'Your subscription has ended and your listings are now inactive. Renew now to restore visibility.', 'subscription_expired'
    FROM expired_subs;

    -- Update Products in bulk for expired subs
    UPDATE public.products p
    SET is_active = false,
        metadata = jsonb_set(COALESCE(metadata, '{}'::jsonb), '{deactivated_reason}', '"subscription_expired"')
    FROM public.seller_subscriptions s
    WHERE p.seller_id = s.seller_id AND s.current_period_end < NOW() AND s.status = 'active' AND p.is_active = true;

    -- Update Services in bulk
    UPDATE public.services p
    SET is_active = false,
        metadata = jsonb_set(COALESCE(metadata, '{}'::jsonb), '{deactivated_reason}', '"subscription_expired"')
    FROM public.seller_subscriptions s
    WHERE p.provider_id = s.seller_id AND s.current_period_end < NOW() AND s.status = 'active' AND p.is_active = true;

    -- Update Accommodations in bulk
    UPDATE public.accommodations p
    SET is_active = false,
        metadata = jsonb_set(COALESCE(metadata, '{}'::jsonb), '{deactivated_reason}', '"subscription_expired"')
    FROM public.seller_subscriptions s
    WHERE p.owner_id = s.seller_id AND s.current_period_end < NOW() AND s.status = 'active' AND p.is_active = true;

    -- Finalize sub statuses
    UPDATE public.seller_subscriptions SET status = 'expired' WHERE current_period_end < NOW() AND status = 'active';

END;
$function$
;

CREATE OR REPLACE FUNCTION public.finalize_payment_atomic(p_order_id uuid, p_user_id uuid, p_amount numeric)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_order_status TEXT;
BEGIN
  -- 1. Check if order is already completed to prevent double-crediting
  SELECT status INTO v_order_status FROM public.zenopay_orders WHERE id = p_order_id;
  
  IF v_order_status = 'completed' THEN
    RETURN TRUE; -- Already processed
  END IF;

  -- 2. Update Order Status
  UPDATE public.zenopay_orders 
  SET status = 'completed', updated_at = NOW() 
  WHERE id = p_order_id;

  -- 3. Credit Wallet
  UPDATE public.wallets 
  SET balance = balance + p_amount, updated_at = NOW() 
  WHERE user_id = p_user_id;

  -- 4. Log Transaction
  INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
  VALUES (p_user_id, p_amount, 'deposit', p_order_id::text, 'Wallet Topup via Zenopay');

  RETURN TRUE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reactivate_listing_atomic(p_listing_id uuid, p_listing_type text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_price NUMERIC;
  v_fee NUMERIC;
  v_wallet_balance NUMERIC;
BEGIN
  IF p_listing_type = 'product' THEN
    SELECT seller_id, price INTO v_user_id, v_price FROM public.products WHERE id = p_listing_id;
    v_fee := v_price * 0.001; -- 0.1%
    
    SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = v_user_id;
    IF v_wallet_balance IS NULL OR v_wallet_balance < v_fee THEN RAISE EXCEPTION 'Insufficient balance'; END IF;
    
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = v_user_id;
    UPDATE public.products SET is_active = TRUE, expires_at = now() + interval '21 days' WHERE id = p_listing_id;
  ELSIF p_listing_type = 'accommodation' THEN
    SELECT owner_id, price INTO v_user_id, v_price FROM public.accommodations WHERE id = p_listing_id;
    v_fee := v_price * 0.001; -- 0.1%
    
    SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = v_user_id;
    IF v_wallet_balance IS NULL OR v_wallet_balance < v_fee THEN RAISE EXCEPTION 'Insufficient balance'; END IF;
    
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = v_user_id;
    UPDATE public.accommodations SET is_active = TRUE, expires_at = now() + interval '21 days' WHERE id = p_listing_id;
  ELSE
    RAISE EXCEPTION 'Invalid listing type';
  END IF;

  INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
  VALUES (v_user_id, v_fee, 'fee', p_listing_id::text, 'Reactivation Fee for ' || p_listing_type);

  RETURN TRUE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_accommodation_atomic(p_name text, p_description text, p_price numeric, p_price_type text, p_room_type text, p_images text[], p_owner_id uuid, p_location text, p_contact_phone text, p_contact_email text, p_amenities text[], p_bedrooms integer, p_bathrooms integer, p_university_ids uuid[], p_is_global boolean, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS accommodations
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_role TEXT;
  v_user_type TEXT;
  v_user_free_listings INT;
  v_wallet_balance NUMERIC;
  v_fee NUMERIC := 0;
  v_expires_at TIMESTAMP WITH TIME ZONE := NULL;
  v_acc public.accommodations;
BEGIN
  -- Get user info
  SELECT role, user_type, free_listings_count INTO v_user_role, v_user_type, v_user_free_listings
  FROM public.users WHERE id = p_owner_id;

  -- Get wallet balance
  SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = p_owner_id;

  -- Logic:
  -- 1. Admin: Free
  -- 2. Student: 21 days expiry. If free_listings > 0, use one. Else deduct 2% fee.
  -- 3. Business: Deduct 2% fee.

  IF v_user_role = 'admin' THEN
    v_fee := 0;
    v_expires_at := NULL;
  ELSIF v_user_type = 'student' THEN
    v_expires_at := now() + interval '21 days';
    IF v_user_free_listings > 0 THEN
      UPDATE public.users SET free_listings_count = free_listings_count - 1 WHERE id = p_owner_id;
      v_fee := 0;
    ELSE
      v_fee := p_price * 0.02; -- 2%
    END IF;
  ELSE
    v_fee := p_price * 0.02;
    v_expires_at := NULL;
  END IF;

  -- Balance check
  IF v_fee > 0 AND (v_wallet_balance IS NULL OR v_wallet_balance < v_fee) THEN
    RAISE EXCEPTION 'Insufficient balance. Fee required: %', v_fee;
  END IF;

  -- Deduct Fee
  IF v_fee > 0 THEN
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = p_owner_id;
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_owner_id, v_fee, 'fee', p_owner_id::text, 'Accommodation Listing Fee: ' || p_name);
  END IF;

  -- Insert Accommodation
  INSERT INTO public.accommodations (
    name, description, price, price_type, room_type, images, owner_id, location, contact_phone, contact_email, amenities, bedrooms, bathrooms, university_ids, is_active, expires_at, metadata
  ) VALUES (
    p_name, p_description, p_price, p_price_type, p_room_type, p_images, p_owner_id, p_location, p_contact_phone, p_contact_email, p_amenities, p_bedrooms, p_bathrooms, p_university_ids, TRUE, v_expires_at, p_metadata
  ) RETURNING * INTO v_acc;

  RETURN v_acc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_service_atomic(p_title text, p_description text, p_price numeric, p_category text, p_price_type text, p_images text[], p_provider_id uuid, p_location text, p_contact_phone text, p_contact_email text DEFAULT NULL::text, p_availability text[] DEFAULT '{}'::text[], p_is_global boolean DEFAULT false, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_role TEXT;
  v_user_type TEXT;
  v_user_free_listings INT;
  v_wallet_balance NUMERIC;
  v_fee NUMERIC := 0;
  v_universities UUID[];
  v_service_id UUID;
BEGIN
  -- Get user info
  SELECT role, user_type, free_listings_count INTO v_user_role, v_user_type, v_user_free_listings
  FROM public.users WHERE id = p_provider_id;

  -- Get wallet balance
  SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = p_provider_id;

  -- Get user's universities (Crucial for scoping)
  v_universities := get_user_universities(p_provider_id);

  -- Admin check
  IF v_user_role = 'admin' THEN
    v_fee := 0;
  -- Student logic: use free listing if available, else fee (e.g., 0.5% or fixed)
  ELSIF v_user_type = 'student' THEN
    IF v_user_free_listings > 0 THEN
      UPDATE public.users SET free_listings_count = free_listings_count - 1 WHERE id = p_provider_id;
      v_fee := 0;
    ELSE
      v_fee := p_price * 0.005; -- 0.5%
    END IF;
  ELSE
    -- Default / Business
    v_fee := p_price * 0.005;
  END IF;

  -- Balance check
  IF v_fee > 0 AND (v_wallet_balance IS NULL OR v_wallet_balance < v_fee) THEN
    RAISE EXCEPTION 'Insufficient balance. Fee required: %', v_fee;
  END IF;

  -- Deduct Fee
  IF v_fee > 0 THEN
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = p_provider_id;
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_provider_id, v_fee, 'fee', p_provider_id::text, 'Service Listing Fee: ' || p_title);
  END IF;

  -- Insert Service
  INSERT INTO public.services (
    title, description, price, category, price_type, images, provider_id, 
    location, contact_phone, contact_email, availability, university_ids, 
    is_active, metadata
  ) VALUES (
    p_title, p_description, p_price, p_category, p_price_type, p_images, p_provider_id, 
    p_location, p_contact_phone, p_contact_email, p_availability, v_universities, 
    TRUE, p_metadata
  ) RETURNING id INTO v_service_id;

  -- Notify users in the same university (borrowed from create_service_with_universities logic)
  IF NOT p_is_global AND array_length(v_universities, 1) > 0 THEN
    PERFORM notify_university_users_service(v_service_id, p_provider_id, v_universities, p_title);
  END IF;

  RETURN v_service_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_product_atomic(p_title text, p_description text, p_price numeric, p_category text, p_condition text, p_images text[], p_seller_id uuid, p_location text, p_university_ids uuid[], p_is_global boolean, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS products
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_role TEXT;
  v_user_type TEXT;
  v_user_free_listings INT;
  v_wallet_balance NUMERIC;
  v_fee NUMERIC := 0;
  v_expires_at TIMESTAMP WITH TIME ZONE := NULL;
  v_universities UUID[];
  v_product public.products;
BEGIN
  -- Get user info
  SELECT role, user_type, free_listings_count INTO v_user_role, v_user_type, v_user_free_listings
  FROM public.users WHERE id = p_seller_id;

  -- Get wallet balance
  SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = p_seller_id;

  -- University Scoping Logic
  IF p_is_global THEN
    v_universities := ARRAY[]::UUID[];
  ELSIF p_university_ids IS NOT NULL AND array_length(p_university_ids, 1) > 0 THEN
    v_universities := p_university_ids;
  ELSE
    v_universities := get_user_universities(p_seller_id);
  END IF;

  -- Fee Logic:
  -- 1. Admin: Free, No Expiry
  IF v_user_role = 'admin' THEN
    v_fee := 0;
    v_expires_at := NULL;
  -- 2. Student: 21 days expiry. 
  ELSIF v_user_type = 'student' THEN
    v_expires_at := now() + interval '21 days';
    IF v_user_free_listings > 0 THEN
      UPDATE public.users SET free_listings_count = free_listings_count - 1 WHERE id = p_seller_id;
      v_fee := 0;
    ELSE
      v_fee := p_price * 0.005; -- 0.5%
    END IF;
  ELSE
    -- Default / Business
    v_fee := p_price * 0.005;
    v_expires_at := NULL; 
  END IF;

  -- Balance check
  IF v_fee > 0 AND (v_wallet_balance IS NULL OR v_wallet_balance < v_fee) THEN
    RAISE EXCEPTION 'Insufficient balance. Fee required: %', v_fee;
  END IF;

  -- Deduct Fee
  IF v_fee > 0 THEN
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = p_seller_id;
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_seller_id, v_fee, 'fee', p_seller_id::text, 'Listing Fee: ' || p_title);
  END IF;

  -- Insert Product
  INSERT INTO public.products (
    title, description, price, category, condition, images, seller_id, 
    location, university_ids, is_active, expires_at, metadata
  ) VALUES (
    p_title, p_description, p_price, p_category, p_condition, p_images, p_seller_id, 
    p_location, v_universities, TRUE, v_expires_at, p_metadata
  ) RETURNING * INTO v_product;

  -- Notify locally if not global
  IF NOT p_is_global AND array_length(v_universities, 1) > 0 THEN
    PERFORM notify_university_users_product(v_product.id, p_seller_id, v_universities, p_title);
  END IF;

  RETURN v_product;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_accommodation_atomic(p_name text, p_description text, p_price numeric, p_price_type text, p_room_type text, p_images text[], p_owner_id uuid, p_location text, p_contact_phone text, p_contact_email text, p_amenities text[], p_bedrooms integer, p_bathrooms integer, p_university_ids uuid[], p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS accommodations
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_role TEXT;
  v_user_type TEXT;
  v_user_free_listings INT;
  v_wallet_balance NUMERIC;
  v_fee NUMERIC := 0;
  v_expires_at TIMESTAMP WITH TIME ZONE := NULL;
  v_universities UUID[];
  v_acc public.accommodations;
BEGIN
  -- Get user info
  SELECT role, user_type, free_listings_count INTO v_user_role, v_user_type, v_user_free_listings
  FROM public.users WHERE id = p_owner_id;

  -- Get wallet balance
  SELECT balance INTO v_wallet_balance FROM public.wallets WHERE user_id = p_owner_id;

  -- University Scoping Logic (Accommodations are rarely "global", but we support the parameter)
  IF p_university_ids IS NOT NULL AND array_length(p_university_ids, 1) > 0 THEN
    v_universities := p_university_ids;
  ELSE
    v_universities := get_user_universities(p_owner_id);
  END IF;

  -- Logic:
  IF v_user_role = 'admin' THEN
    v_fee := 0;
    v_expires_at := NULL;
  ELSIF v_user_type = 'student' THEN
    v_expires_at := now() + interval '21 days';
    IF v_user_free_listings > 0 THEN
      UPDATE public.users SET free_listings_count = free_listings_count - 1 WHERE id = p_owner_id;
      v_fee := 0;
    ELSE
      v_fee := p_price * 0.02; -- 2%
    END IF;
  ELSE
    v_fee := p_price * 0.02;
    v_expires_at := NULL;
  END IF;

  -- Balance check
  IF v_fee > 0 AND (v_wallet_balance IS NULL OR v_wallet_balance < v_fee) THEN
    RAISE EXCEPTION 'Insufficient balance. Fee required: %', v_fee;
  END IF;

  -- Deduct Fee
  IF v_fee > 0 THEN
    UPDATE public.wallets SET balance = balance - v_fee WHERE user_id = p_owner_id;
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_owner_id, v_fee, 'fee', p_owner_id::text, 'Accommodation Listing Fee: ' || p_name);
  END IF;

  -- Insert Accommodation
  INSERT INTO public.accommodations (
    name, description, price, price_type, room_type, images, owner_id, 
    location, contact_phone, contact_email, amenities, bedrooms, bathrooms, 
    university_ids, is_active, expires_at, metadata
  ) VALUES (
    p_name, p_description, p_price, p_price_type, p_room_type, p_images, p_owner_id, 
    p_location, p_contact_phone, p_contact_email, p_amenities, p_bedrooms, p_bathrooms, 
    v_universities, TRUE, v_expires_at, p_metadata
  ) RETURNING * INTO v_acc;

  RETURN v_acc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_listing_expiration()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_user_type TEXT;
    v_user_id UUID;
BEGIN
    -- Determine user_id: use seller_id/provider_id/owner_id from the record
    -- This is safer than auth.uid() when called from RPCs or background processes
    IF TG_TABLE_NAME = 'products' THEN
        v_user_id := NEW.seller_id;
    ELSIF TG_TABLE_NAME = 'services' THEN
        v_user_id := NEW.provider_id;
    ELSIF TG_TABLE_NAME = 'accommodations' THEN
        v_user_id := NEW.owner_id;
    ELSE
        v_user_id := auth.uid();
    END IF;

    -- Resolve user_type from public.users
    SELECT u.user_type INTO v_user_type FROM public.users u WHERE u.id = v_user_id;

    -- Apply/Reset 21-day expiration only for student users
    -- Trigger on INSERT or when transitioning from inactive to active
    IF v_user_type = 'student' THEN
        IF (TG_OP = 'INSERT') OR (NEW.is_active = true AND (OLD.is_active = false OR OLD.is_active IS NULL)) THEN
            NEW.expires_at := (NOW() + INTERVAL '21 days');
        END IF;
    ELSE
        -- Business users and Admins have no forced expiration
        IF TG_OP = 'INSERT' THEN
            NEW.expires_at := NULL;
        END IF;
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.lock_order_funds(p_order_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_student_id UUID;
    v_amount NUMERIC;
BEGIN
    SELECT student_id, total_amount INTO v_student_id, v_amount FROM public.orders WHERE id = p_order_id;
    
    -- Check balance
    IF (SELECT balance FROM public.wallets WHERE user_id = v_student_id) < v_amount THEN
        RAISE EXCEPTION 'Insufficient balance in wallet';
    END IF;
    
    -- Move funds to escrow
    UPDATE public.wallets 
    SET balance = balance - v_amount,
        escrow_balance = escrow_balance + v_amount
    WHERE user_id = v_student_id;
    
    -- Log transaction
    INSERT INTO public.escrow_transactions (order_id, student_id, amount)
    VALUES (p_order_id, v_student_id, v_amount);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.determine_order_logistics()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    rest_loc GEOGRAPHY;
    v_rider_id UUID;
    v_dist_meters FLOAT;
BEGIN
    -- 1. Get restaurant location
    SELECT location INTO rest_loc FROM public.restaurants WHERE id = NEW.restaurant_id;
    
    -- 2. Calculate distance to customer
    v_dist_meters := ST_Distance(rest_loc, NEW.delivery_location);
    
    -- 3. Initial routing decision
    IF v_dist_meters > 5000 THEN
        -- Too far for internal students, use BOLT
        NEW.logistics_type := 'BOLT';
    ELSE
        -- Within 5km, try to find an available internal rider
        SELECT id INTO v_rider_id
        FROM public.riders
        WHERE status = 'idle' 
          AND is_active = true
          -- Using PostGIS <-> operator for nearest neighbor search
          ORDER BY current_location <-> rest_loc
        LIMIT 1;

        IF v_rider_id IS NOT NULL THEN
            NEW.logistics_type := 'INTERNAL';
            NEW.rider_id := v_rider_id;
            
            -- Set rider to busy
            UPDATE public.riders SET status = 'busy' WHERE id = v_rider_id;
        ELSE
            -- No internal riders available, fallback to BOLT
            NEW.logistics_type := 'BOLT';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.lock_funds(p_order_id uuid, p_user_id uuid, p_amount numeric)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE public.wallets
    SET balance = balance - p_amount,
        escrow_balance = escrow_balance + p_amount
    WHERE user_id = p_user_id AND balance >= p_amount;
    
    IF FOUND THEN
        INSERT INTO public.escrow_transactions (order_id, amount)
        VALUES (p_order_id, p_amount);
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.release_funds(p_order_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_amount NUMERIC;
    v_student_id UUID;
    v_restaurant_id UUID;
    v_restaurant_owner_id UUID;
BEGIN
    -- Get order details
    SELECT total_amount, student_id, restaurant_id 
    INTO v_amount, v_student_id, v_restaurant_id
    FROM public.orders WHERE id = p_order_id;
    
    -- Verify escrow
    IF EXISTS (SELECT 1 FROM public.escrow_transactions WHERE order_id = p_order_id AND NOT is_released) THEN
        -- Get restaurant owner
        SELECT owner_id INTO v_restaurant_owner_id FROM public.restaurants WHERE id = v_restaurant_id;
        
        -- Deduct from student's escrow
        UPDATE public.wallets SET escrow_balance = escrow_balance - v_amount WHERE user_id = v_student_id;
        
        -- Pay restaurant owner (90% for demo, 10% commission)
        UPDATE public.wallets SET balance = balance + (v_amount * 0.9) WHERE user_id = v_restaurant_owner_id;
        
        -- Mark as released
        UPDATE public.escrow_transactions SET is_released = TRUE WHERE order_id = p_order_id;
        UPDATE public.orders SET status = 'completed' WHERE id = p_order_id;
        
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.route_logistics()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_restaurant_location GEOGRAPHY(POINT);
    v_distance FLOAT;
BEGIN
    -- Get restaurant location
    SELECT location INTO v_restaurant_location FROM public.restaurants WHERE id = NEW.restaurant_id;
    
    -- Calculate distance in meters
    v_distance := ST_Distance(v_restaurant_location, NEW.delivery_location);
    
    -- Routing rule: > 2km uses BOLT, < 2km uses INTERNAL
    IF v_distance > 2000 THEN
        NEW.logistics_type := 'BOLT';
    ELSE
        NEW.logistics_type := 'INTERNAL';
    END IF;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.confirm_delivery(p_order_id uuid, p_scanned_hash text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_stored_hash TEXT;
BEGIN
    -- Match the 'pickup_code_hash' column found in the table
    SELECT pickup_code_hash INTO v_stored_hash FROM public.orders WHERE id = p_order_id;
    
    IF v_stored_hash = p_scanned_hash THEN
        PERFORM public.release_funds(p_order_id);
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.http_set_curlopt(curlopt character varying, value character varying)
 RETURNS boolean
 LANGUAGE c
AS '$libdir/http', $function$http_set_curlopt$function$
;

CREATE OR REPLACE FUNCTION public.http_reset_curlopt()
 RETURNS boolean
 LANGUAGE c
AS '$libdir/http', $function$http_reset_curlopt$function$
;

CREATE OR REPLACE FUNCTION public.http_list_curlopt()
 RETURNS TABLE(curlopt text, value text)
 LANGUAGE c
AS '$libdir/http', $function$http_list_curlopt$function$
;

CREATE OR REPLACE FUNCTION public.http_header(field character varying, value character varying)
 RETURNS http_header
 LANGUAGE sql
AS $function$ SELECT $1, $2 $function$
;

CREATE OR REPLACE FUNCTION public.http(request http_request)
 RETURNS http_response
 LANGUAGE c
AS '$libdir/http', $function$http_request$function$
;

CREATE OR REPLACE FUNCTION public.http_get(uri character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('GET', $1, NULL, NULL, NULL)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.http_post(uri character varying, content character varying, content_type character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('POST', $1, NULL, $3, $2)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.http_put(uri character varying, content character varying, content_type character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('PUT', $1, NULL, $3, $2)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.http_patch(uri character varying, content character varying, content_type character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('PATCH', $1, NULL, $3, $2)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.http_delete(uri character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('DELETE', $1, NULL, NULL, NULL)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.http_delete(uri character varying, content character varying, content_type character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('DELETE', $1, NULL, $3, $2)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.http_head(uri character varying)
 RETURNS http_response
 LANGUAGE sql
AS $function$ SELECT public.http(('HEAD', $1, NULL, NULL, NULL)::public.http_request) $function$
;

CREATE OR REPLACE FUNCTION public.urlencode(string character varying)
 RETURNS text
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/http', $function$urlencode$function$
;

CREATE OR REPLACE FUNCTION public.urlencode(string bytea)
 RETURNS text
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/http', $function$urlencode$function$
;

CREATE OR REPLACE FUNCTION public.urlencode(data jsonb)
 RETURNS text
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/http', $function$urlencode_jsonb$function$
;

CREATE OR REPLACE FUNCTION public.http_get(uri character varying, data jsonb)
 RETURNS http_response
 LANGUAGE sql
AS $function$
        SELECT public.http(('GET', $1 || '?' || public.urlencode($2), NULL, NULL, NULL)::public.http_request)
    $function$
;

CREATE OR REPLACE FUNCTION public.http_post(uri character varying, data jsonb)
 RETURNS http_response
 LANGUAGE sql
AS $function$
        SELECT public.http(('POST', $1, NULL, 'application/x-www-form-urlencoded', public.urlencode($2))::public.http_request)
    $function$
;

CREATE OR REPLACE FUNCTION public.text_to_bytea(data text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/http', $function$text_to_bytea$function$
;

CREATE OR REPLACE FUNCTION public.bytea_to_text(data bytea)
 RETURNS text
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/http', $function$bytea_to_text$function$
;

CREATE OR REPLACE FUNCTION public.get_restaurants_with_coords(p_limit integer DEFAULT 20, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, name text, description text, image_url text, address text, phone text, category text, rating double precision, lat double precision, lng double precision, is_active boolean, delivery_time text, delivery_fee numeric)
 LANGUAGE sql
AS $function$
  SELECT
    r.id,
    r.name,
    r.description,
    r.image_url,
    r.address,
    r.phone,
    r.category,
    r.rating,
    ST_Y(r.location::geometry) AS lat,
    ST_X(r.location::geometry) AS lng,
    r.is_active,
    r.delivery_time,
    r.delivery_fee
  FROM public.restaurants r
  WHERE r.is_active = true
  ORDER BY r.rating DESC NULLS LAST
  LIMIT p_limit
  OFFSET p_offset;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_bolt_delivery()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Only trigger for BOLT logistics
    IF NEW.logistics_type = 'BOLT' AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.logistics_type != 'BOLT')) THEN
        -- We use pg_net for async HTTP to avoid blocking the transaction
        PERFORM net.http_post(
            url := 'https://yhuujolmbqvntzifoaed.supabase.co/functions/v1/bolt-delivery',
            headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', current_setting('request.headers', true)::jsonb->>'authorization'),
            body := jsonb_build_object(
                'order_id', NEW.id,
                'restaurant_id', NEW.restaurant_id,
                'total_amount', NEW.total_amount,
                'delivery_location', ST_AsText(NEW.delivery_location)
            )
        );
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_location_in_university(p_university_id uuid, p_lat double precision, p_lng double precision)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_boundary geography;
    v_location geography;
BEGIN
    -- Get the boundary for the university
    SELECT boundary INTO v_boundary
    FROM public.universities
    WHERE id = p_university_id;

    IF v_boundary IS NULL THEN
        RETURN TRUE; -- If no boundary defined, allow ordering by default (or change to FALSE if desired)
    END IF;

    -- Create a point from the lat/lng
    v_location := ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography;

    -- Check if boundary contains the location
    RETURN ST_Contains(v_boundary::geometry, v_location::geometry);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_rider_proximity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_order RECORD;
BEGIN
  -- Only trigger if the location actually changed
  IF NEW.current_location IS DISTINCT FROM OLD.current_location AND NEW.current_location IS NOT NULL THEN
    
    -- Loop through all active 'picked_up' orders assigned to this rider that haven't been notified
    FOR v_order IN 
      SELECT id, student_id, delivery_location 
      FROM public.orders 
      WHERE rider_id = NEW.id 
        AND status = 'picked_up' 
        AND rider_near_notified = false
    LOOP
      
      -- Check if rider is within 200 meters of the delivery location
      IF ST_DWithin(NEW.current_location::geography, v_order.delivery_location::geography, 200) THEN
        
        -- Mark as notified to prevent spam
        UPDATE public.orders 
        SET rider_near_notified = true
        WHERE id = v_order.id;

        -- Insert notification for the student
        INSERT INTO public.notifications (
          user_id,
          type,
          title,
          message,
          data
        ) VALUES (
          v_order.student_id,
          'order_update',
          'Your Rider is Arriving!',
          'Your rider is within 200 meters of your delivery location. Please be ready to receive your order.',
          jsonb_build_object('order_id', v_order.id, 'event', 'rider_arriving')
        );

      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_restaurants_with_distance(p_lat double precision DEFAULT NULL::double precision, p_lng double precision DEFAULT NULL::double precision, p_limit integer DEFAULT 20, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, name text, description text, image_url text, address text, phone text, category text, rating double precision, lat double precision, lng double precision, is_active boolean, delivery_time text, delivery_fee double precision, distance_meters double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        r.id,
        r.name,
        r.description,
        r.image_url,
        r.address,
        r.phone,
        r.category,
        r.rating,
        ST_Y(r.location::geometry) AS lat,
        ST_X(r.location::geometry) AS lng,
        r.is_active,
        r.delivery_time,
        -- Calculate dynamic delivery fee: 1000 for first km, then 500 for each additional km
        CASE 
            WHEN p_lat IS NOT NULL AND p_lng IS NOT NULL AND r.location IS NOT NULL THEN
                GREATEST(1000.0, 1000.0 + CEIL(GREATEST(0.0, (ST_Distance(r.location, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography) - 1000.0)) / 1000.0) * 500.0)::float8
            ELSE r.delivery_fee
        END AS delivery_fee,
        -- Calculate distance in meters
        CASE 
            WHEN p_lat IS NOT NULL AND p_lng IS NOT NULL AND r.location IS NOT NULL THEN
                ST_Distance(r.location, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography)::float8
            ELSE NULL::float8
        END AS distance_meters
    FROM public.restaurants r
    WHERE r.is_active = true
    ORDER BY 
        CASE 
            WHEN p_lat IS NOT NULL AND p_lng IS NOT NULL AND r.location IS NOT NULL THEN ST_Distance(r.location, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography)
            ELSE 0
        END ASC,
        r.rating DESC NULLS LAST
    LIMIT p_limit
    OFFSET p_offset;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_nearby_riders(p_lat double precision, p_lng double precision, p_radius_km double precision)
 RETURNS TABLE(rider_id uuid, distance_km double precision)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    r.id as rider_id,
    (ST_Distance(
      ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
      r.current_location
    ) / 1000) AS distance_km
  FROM riders r
  WHERE r.is_online = true
  AND r.current_location IS NOT NULL
  AND ST_DWithin(
    ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
    r.current_location,
    p_radius_km * 1000
  )
  ORDER BY distance_km ASC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_welcome_amount NUMERIC := 0.00;
    v_free_listings INTEGER := 0;
    v_user_type TEXT;
BEGIN
    -- Determine user type
    v_user_type := COALESCE(NEW.raw_user_meta_data->>'user_type', 'student');
    
    -- Welcome offers only for students
    IF v_user_type = 'student' THEN
        v_welcome_amount := 2000.00;
        v_free_listings := 10;
    END IF;

    -- Insert into public.users (Core Profile only)
    INSERT INTO public.users (
        id, 
        email, 
        full_name, 
        phone_number, 
        user_type, 
        role,
        primary_university_id,
        enrolled_course_id,
        free_listings_count
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
        NEW.raw_user_meta_data->>'phone_number',
        v_user_type,
        COALESCE(NEW.raw_user_meta_data->>'role', 'buyer'),
        (NEW.raw_user_meta_data->>'primary_university_id')::uuid,
        (NEW.raw_user_meta_data->>'enrolled_course_id')::uuid,
        v_free_listings
    )
    ON CONFLICT (id) DO UPDATE
    SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        phone_number = EXCLUDED.phone_number,
        user_type = EXCLUDED.user_type,
        primary_university_id = EXCLUDED.primary_university_id,
        enrolled_course_id = EXCLUDED.enrolled_course_id,
        free_listings_count = COALESCE(public.users.free_listings_count, EXCLUDED.free_listings_count);

    -- Create wallet
    INSERT INTO public.wallets (user_id, balance, currency)
    VALUES (NEW.id, v_welcome_amount, 'TZS')
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Log bonus if applicable
    -- Using NEW.id as wallet_id assumes wallet_id = user_id which is common in this app
    IF v_welcome_amount > 0 AND NOT EXISTS (SELECT 1 FROM public.wallet_transactions WHERE wallet_id = NEW.id AND (description = 'Welcome Bonus' OR description = 'Welcome Bonus Deposit')) THEN
        INSERT INTO public.wallet_transactions (wallet_id, amount, type, description)
        VALUES (NEW.id, v_welcome_amount, 'deposit', 'Welcome Bonus');
    END IF;

    -- Coupons
    INSERT INTO public.user_coupons (user_id, coupon_code)
    VALUES (NEW.id, 'WELCOME100')
    ON CONFLICT (user_id, coupon_code) DO NOTHING;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.credit_wallet_balance(p_user_id uuid, p_amount numeric, p_reference_id text, p_description text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_new_balance NUMERIC;
BEGIN
    INSERT INTO public.wallets (user_id, balance)
    VALUES (p_user_id, p_amount)
    ON CONFLICT (user_id) 
    DO UPDATE SET balance = public.wallets.balance + excluded.balance
    RETURNING balance INTO v_new_balance;
    
    INSERT INTO public.wallet_transactions (wallet_id, amount, type, reference_id, description)
    VALUES (p_user_id, p_amount, 'deposit', p_reference_id, p_description);
    
    RETURN jsonb_build_object('success', true, 'new_balance', v_new_balance);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_order_escrow()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Only attempt to lock if it's a new order
    -- We use PERFORM because lock_order_funds might RAISE EXCEPTION if balance is low, 
    -- which is GOOD because it prevents order creation without funds if that's the desired behavior.
    -- However, to allow 'Cash on Delivery' or other methods later, we should probably check a flag.
    -- For now, we assume all orders need escrow locking.
    PERFORM public.lock_order_funds(NEW.id);
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- If locking fails (e.g. insufficient funds), we actually WANT to allow the order to be created 
    -- but maybe in a 'pending_payment' status?
    -- For now, let's just log it and leave it to the app, OR block if you want strict escrow.
    -- The user said 'automatic', so let's log a notification if it fails.
    INSERT INTO public.notifications (user_id, title, message, type)
    VALUES (NEW.student_id, 'Payment Required', 'Order placed but wallet balance is insufficient. Please top up.', 'alert');
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.finalize_payment(p_reference_id text, p_provider_txn_id text, p_amount numeric, p_status text DEFAULT 'completed'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_txn RECORD;
BEGIN
    -- Get transaction details
    SELECT * INTO v_txn FROM public.payment_transactions WHERE external_reference = p_reference_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Transaction not found');
    END IF;
    
    IF v_txn.status = 'completed' THEN
        RETURN jsonb_build_object('success', true, 'message', 'Already processed');
    END IF;

    -- Update transaction
    UPDATE public.payment_transactions
    SET status = p_status, 
        provider_transaction_id = p_provider_txn_id,
        updated_at = now()
    WHERE id = v_txn.id;

    IF p_status = 'completed' THEN
        -- Handle based on payment type
        IF v_txn.payment_type = 'wallet_topup' THEN
            PERFORM public.credit_wallet_balance(v_txn.user_id, p_amount, p_reference_id, 'Wallet Topup via ' || v_txn.payment_method);
        ELSIF v_txn.payment_type = 'order_payment' THEN
            -- If it was a direct order payment, we might want to lock it in escrow immediately
            PERFORM public.lock_order_funds(v_txn.metadata->>'order_id');
        END IF;
    END IF;

    RETURN jsonb_build_object('success', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_order_completion_escrow()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF (OLD.status != 'completed' AND NEW.status = 'completed') THEN
        PERFORM public.release_funds(NEW.id);
    END IF;
    RETURN NEW;
END;
$function$
;


-- TRIGGERS --
CREATE TRIGGER trigger_update_product_rating AFTER INSERT OR DELETE OR UPDATE ON public.product_reviews FOR EACH ROW EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER trigger_update_service_rating AFTER INSERT OR DELETE OR UPDATE ON public.service_reviews FOR EACH ROW EXECUTE FUNCTION update_service_rating();

CREATE TRIGGER trigger_update_accommodation_rating AFTER INSERT OR DELETE OR UPDATE ON public.accommodation_reviews FOR EACH ROW EXECUTE FUNCTION update_accommodation_rating();

CREATE TRIGGER on_seller_request_created AFTER INSERT ON public.seller_requests FOR EACH ROW WHEN ((new.status = 'pending'::text)) EXECUTE FUNCTION notify_admins_on_seller_request();

CREATE TRIGGER device_tokens_updated_at BEFORE UPDATE ON public.device_tokens FOR EACH ROW EXECUTE FUNCTION update_device_tokens_updated_at();

CREATE TRIGGER notification_preferences_updated_at BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION update_notification_preferences_updated_at();

CREATE TRIGGER update_seller_subscriptions_updated_at BEFORE UPDATE ON public.seller_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER tr_notify_manual_payment AFTER INSERT OR UPDATE ON public.manual_payment_requests FOR EACH ROW EXECUTE FUNCTION notify_manual_payment_event();

CREATE TRIGGER send_notification_trigger AFTER INSERT ON public.notifications FOR EACH ROW EXECUTE FUNCTION trigger_send_notification();

CREATE TRIGGER seller_requests_updated_at_trigger BEFORE UPDATE ON public.seller_requests FOR EACH ROW EXECUTE FUNCTION update_seller_requests_updated_at();

CREATE TRIGGER notify_admins_seller_request_trigger AFTER INSERT ON public.seller_requests FOR EACH ROW EXECUTE FUNCTION notify_admins_on_seller_request();

CREATE TRIGGER tr_set_product_expiration BEFORE INSERT ON public.products FOR EACH ROW EXECUTE FUNCTION set_listing_expiration();

CREATE TRIGGER tr_set_service_expiration BEFORE INSERT ON public.services FOR EACH ROW EXECUTE FUNCTION set_listing_expiration();

CREATE TRIGGER tr_set_accommodation_expiration BEFORE INSERT ON public.accommodations FOR EACH ROW EXECUTE FUNCTION set_listing_expiration();

CREATE TRIGGER a_determine_logistics_trigger BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION determine_order_logistics();

CREATE TRIGGER b_bolt_delivery_trigger AFTER INSERT OR UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION trigger_bolt_delivery();

CREATE TRIGGER tr_on_subscription_renewal AFTER UPDATE ON public.seller_subscriptions FOR EACH ROW EXECUTE FUNCTION handle_subscription_renewal();

CREATE TRIGGER trigger_check_rider_proximity AFTER UPDATE OF current_location ON public.riders FOR EACH ROW EXECUTE FUNCTION check_rider_proximity();

CREATE TRIGGER tr_order_completion_escrow AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION handle_order_completion_escrow();

CREATE TRIGGER tr_new_order_escrow_lock AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION handle_new_order_escrow();

CREATE TRIGGER tr_order_status_notification AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION handle_order_status_notification();

