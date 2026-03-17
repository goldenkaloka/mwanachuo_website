import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Phone,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  Star,
  Clock,
  Briefcase
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getOptimizedImageUrl } from "@/utils/imageOptim";
import { formatWhatsAppNumber } from "@/utils/phoneFormatter";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ServiceDetail = () => {
  const { id } = useParams();

  const { data: service, isLoading, error } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      console.log("[ServiceDetail] Fetching ID:", id);
      try {
        const { data, error } = await supabase
          .from("services")
          .select(`
        *,
        provider:provider_id (
        full_name,
        avatar_url,
        phone_number
        )
      `)
          .eq("id", id)
          .single();

        if (error) {
          console.error("[ServiceDetail] Supabase error:", error);
          throw error;
        }
        console.log("[ServiceDetail] Data fetched:", data);
        return data;
      } catch (err) {
        console.error("[ServiceDetail] Catch error:", err);
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
          .eq("item_type", "service")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("[ServiceDetail] Reviews fetch error:", err);
        return [];
      }
    },
    enabled: !!id,
  });

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

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h2 className="text-2xl font-bold">Service not found</h2>
          <Link to="/" className="text-primary mt-4 hover:underline">Back to exploring</Link>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-sm bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {service.category || "Service"}
                </span>
                <div className="flex items-center gap-1 text-brand-gold">
                  <Star size={14} className="fill-brand-gold" />
                  <span className="text-sm font-bold">{service.rating || "5.0"}</span>
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {service.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>{service.location || "On-campus & Delivery"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span>
                    {service.availability && service.availability.length > 0
                      ? `Available: ${service.availability.join(", ")}`
                      : `Available: ${service.availability_hours || "Flexible hours"}`}
                  </span>
                </div>
              </div>

              <div className="prose prose-lg text-muted-foreground leading-relaxed mb-12 max-w-none">
                <h3 className="text-foreground font-display text-xl bold mb-4">About this service</h3>
                <p className="whitespace-pre-wrap">{service.description}</p>
              </div>

              <div className="mb-12">
                <h3 className="text-foreground font-display text-xl font-bold mb-6">Service Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(service.features || service.metadata?.features || ["Student discount available", "Same-day service", "Trusted provider"]).map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-md bg-card border border-border">
                      <CheckCircle2 size={20} className="text-success" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-24 space-y-6"
            >
              <div className="bg-card border border-border rounded-md p-8">
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground block mb-1">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-black text-primary">
                      {formatPrice(Number(service.price))}
                    </span>
                    <span className="text-muted-foreground font-medium">/ {service.price_type?.replace('_', ' ') || "session"}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <a
                    href={`https://wa.me/${formatWhatsAppNumber(service.provider?.phone_number)}?text=Hi, I'm interested in your ${encodeURIComponent(service.title)} service on Mwanachuo Shop`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={20} />
                    Chat with Provider
                  </a>
                  <a
                    href={`tel:${service.provider?.phone_number || ''}`}
                    className="w-full bg-secondary text-foreground py-4 rounded-md font-bold text-lg hover:bg-secondary/80 transition-all border border-border flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call Provider
                  </a>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-bold text-sm mb-4">Provider Information</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-muted overflow-hidden">
                      <img
                        src={getOptimizedImageUrl(service.provider?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", { width: 100, height: 100, quality: 70 })}
                        alt={service.provider?.full_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{service.provider?.full_name || "Mwanachuo Pro"}</h5>
                      <p className="text-xs text-muted-foreground">Top Rated Provider</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-md p-6 flex items-start gap-4">
                <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary">Secure Payment</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Funds are held securely and only released after the service is completed to your satisfaction.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-border pt-12 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">Service Reviews</h2>
            <button className="text-sm font-bold text-primary hover:underline">Rate Service</button>
          </div>

          {loadingReviews ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review: any) => (
                <div key={review.id} className="p-6 rounded-md bg-card border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 rounded-sm">
                        <AvatarImage src={review.user?.avatar_url} />
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                          {review.user?.full_name?.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-bold">{review.user?.full_name}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < review.rating ? "fill-brand-gold text-brand-gold" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    {review.is_verified_purchase && (
                       <span className="text-[10px] text-success font-bold flex items-center gap-1 uppercase">
                         <CheckCircle2 size={10} /> Verified Booking
                       </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/10 rounded-md border border-dashed border-border/50">
              <p className="text-sm text-muted-foreground italic">No reviews yet for this service provider.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
