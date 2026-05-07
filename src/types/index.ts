export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  avatar_url?: string;
  bio?: string;
  user_type: "student" | "business";
  primary_university_id?: string;
  business_name?: string;
  business_category?: string;
  year_of_study?: number;
  current_semester?: number;
  enrolled_course_id?: string;
  role: string;
  registration_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface University {
  id: string;
  name: string;
  location?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  icon?: string;
  created_at?: string;
}

export interface Condition {
  id: string;
  name: string;
  created_at?: string;
}

export interface BaseListing {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  price: number;
  category?: string;
  category_id?: string;
  location?: string;
  images?: string[];
  is_active?: boolean;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, unknown>;
}

export interface Product extends BaseListing {
  seller_id?: string;
  condition?: string;
  condition_id?: string;
  rating?: number;
  review_count?: number;
  old_price?: number;
  seller?: Pick<UserProfile, "full_name" | "avatar_url" | "phone_number">;
}

export interface Service extends BaseListing {
  provider_id?: string;
  price_type?: "fixed" | "hourly" | "daily";
  availability?: string[];
  rating?: number;
  review_count?: number;
  provider?: Pick<UserProfile, "full_name" | "avatar_url" | "phone_number">;
}

export interface Accommodation extends BaseListing {
  owner_id?: string;
  room_type?: "hostel" | "single" | "bed-sitter" | "apartment" | "shared";
  bedrooms?: number;
  amenities?: string[];
  rating?: number;
  owner?: Pick<UserProfile, "full_name" | "avatar_url" | "phone_number">;
}

export interface Review {
  id: string;
  item_id: string;
  item_type: "product" | "service" | "accommodation";
  user_id: string;
  rating: number;
  comment: string;
  images?: string[];
  created_at?: string;
  user?: Pick<UserProfile, "full_name" | "avatar_url">;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  created_at?: string;
  updated_at?: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: "deposit" | "withdrawal" | "purchase" | "sale";
  amount: number;
  description?: string;
  created_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}

export interface PaymentTransaction {
  id: string;
  external_reference: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  provider?: string;
  created_at?: string;
}
