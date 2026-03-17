import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getOptimizedImageUrl } from "@/utils/imageOptim";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Bed,
  Users,
  Wifi,
  Zap,
  Shield,
  CheckCircle2,
  Calendar,
  Waves,
  Phone,
  MessageSquare,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react"; // Added useState for activeImage

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const AccommodationDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0); // Added state for active image

  const { data: accommodation, isLoading, error } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: async () => {
      console.log("[AccommodationDetail] Fetching ID:", id);
      try {
        const { data, error } = await supabase
          .from("accommodations")
          .select(`
        *,
        owner:owner_id (
        full_name,
        avatar_url,
        phone_number
        )
      `)
          .eq("id", id)
          .single();

        if (error) {
          console.error("[AccommodationDetail] Supabase error:", error);
          throw error;
        }

        console.log("[AccommodationDetail] Data fetched:", data);
        return data;
      } catch (err) {
        console.error("[AccommodationDetail] Catch error:", err);
        throw err;
      }
    },
    enabled: !!id,
    retry: 1,
  });

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select(`
            *,
            user:user_id (full_name, avatar_url)
          `)
          .eq("item_id", id)
          .eq("item_type", "accommodation")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("[AccommodationDetail] Reviews fetch error:", err);
        return [];
      }
    },
    enabled: !!id,
  });

  const amenityIcons: Record<string, any> = {
    "wifi": Wifi,
    "electricity": Zap,
    "water": Waves,
    "security": Shield,
    "furnished": Bed,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h2 className="text-2xl font-bold">Accommodation not found</h2>
          <Link to="/" className="text-primary mt-4 hover:underline">Back to search</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors font-semibold">
          <ArrowLeft size={16} />
          Back to Listings
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden bg-muted h-[300px] md:h-[500px]"
          >
            {accommodation.images?.[activeImage] ? (
              <img
                src={getOptimizedImageUrl(accommodation.images[activeImage], { width: 1000, quality: 85 })}
                alt={accommodation.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><Bed size={48} className="text-muted-foreground" /></div>
            )}
          </motion.div>
          <div className="hidden lg:grid grid-rows-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden bg-muted"
            >
              {accommodation.images?.[1] ? (
                <img src={getOptimizedImageUrl(accommodation.images[1], { width: 500, quality: 75 })} alt={accommodation.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">Room view</div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden bg-muted"
            >
              {accommodation.images?.[2] ? (
                <img src={getOptimizedImageUrl(accommodation.images[2], { width: 500, quality: 75 })} alt={accommodation.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">Common Area</div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Image Thumbnails */}
        {accommodation.images && accommodation.images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-12">
            {accommodation.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative aspect-square w-24 h-24 rounded-md overflow-hidden bg-muted border-2 transition-all flex-shrink-0 ${activeImage === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={getOptimizedImageUrl(img, { width: 150, height: 150, quality: 60 })} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  {accommodation.room_type || "Hostel"}
                </span>
                <span className="text-sm font-semibold text-muted-foreground underline">
                  Near Campus
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                {accommodation.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} className="text-primary" />
                <span>{accommodation.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-border mb-12">
              <div className="flex flex-col items-center gap-2">
                <Bed className="text-primary" size={24} />
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Rooms</span>
                <span className="font-bold text-sm">{accommodation.bedrooms || "1"} Bedroom</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Users className="text-primary" size={24} />
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Share</span>
                <span className="font-bold text-sm">{accommodation.metadata?.sharing_status || "No Sharing"}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="text-primary" size={24} />
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Security</span>
                <span className="font-bold text-sm">24/7 Guarded</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="text-primary" size={24} />
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Deposit</span>
                <span className="font-bold text-sm">{accommodation.metadata?.deposit_required ? "One Month" : "None"}</span>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="font-display text-2xl font-bold mb-6">Amenitites</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                {(accommodation.amenities || ["Wi-Fi", "Electricity", "Water", "Fenced"]).map((amenity: string) => {
                  const Icon = amenityIcons[amenity.toLowerCase()] || CheckCircle2;
                  return (
                    <div key={amenity} className="flex items-center gap-3">
                      <Icon size={18} className="text-primary" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="font-display text-2xl font-bold mb-6">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {accommodation.description}
              </p>
            </div>
          </div>

          {/* Side Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-background border border-border rounded-3xl p-8 shadow-sm">
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-display font-black text-primary">
                    {formatPrice(Number(accommodation.price))}
                  </span>
                  <span className="text-muted-foreground font-medium">/ {accommodation.price_type?.replace('per_', '') || "month"}</span>
                </div>
                <p className="text-xs text-muted-foreground">Prices may vary based on room selection.</p>
              </div>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/${accommodation.owner?.phone_number?.replace(/\+/g, '') || ''}?text=Hi, I'm interested in viewing ${accommodation.name} on Mwanachuo Shop`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} />
                  Chat with Manager
                </a>
                <a
                  href={`tel:${accommodation.owner?.phone_number || ''}`}
                  className="w-full bg-secondary text-foreground py-4 rounded-md font-bold text-lg hover:bg-secondary/80 transition-all border border-border flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Call Manager
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-start gap-4 p-4 rounded-md bg-muted/50 border border-border/50">
                  <div className="p-2 rounded-xl bg-success/10 text-success">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground uppercase tracking-wider">Mwanachuo Guarantee</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      We verify all hostels. If the place doesn't match the photos, we'll help you find a new home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-border pt-12 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">Reviews & Feedback</h2>
            <button className="text-sm font-bold text-primary hover:underline">Leave a Review</button>
          </div>

          {loadingReviews ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review: any) => (
                <div key={review.id} className="p-6 rounded-2xl bg-card border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 rounded-md">
                        <AvatarImage src={review.user?.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold font-display">
                          {review.user?.full_name?.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{review.user?.full_name}</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={i < review.rating ? "fill-brand-gold text-brand-gold" : "text-muted-foreground"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{review.comment}"
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider text-right">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-3xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">No reviews yet for this accommodation.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccommodationDetail;
