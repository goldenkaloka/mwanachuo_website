import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Truck,
  RefreshCcw,
  MessageCircle,
  Share2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      console.log("[ProductDetail] Fetching ID:", id);
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            seller:seller_id (
              full_name,
              avatar_url,
              phone_number
            )
          `)
          .eq("id", id)
          .single();

        if (error) {
          console.error("[ProductDetail] Supabase error:", error);
          throw error;
        }
        console.log("[ProductDetail] Data fetched:", data);
        return data;
      } catch (err) {
        console.error("[ProductDetail] Catch error:", err);
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
          .eq("item_type", "product")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("[ProductDetail] Reviews fetch error:", err);
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/" className="text-primary mt-4 hover:underline">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors font-semibold py-2">
          <ArrowLeft size={16} />
          Back to Listings
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-md overflow-hidden bg-muted border border-border">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image available</div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((img: string, i: number) => (
                  <div key={i} className="aspect-square rounded-sm overflow-hidden bg-muted border border-border cursor-pointer hover:border-primary transition-colors">
                    <img src={img} alt={`${product.title} ${i + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-sm bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {product.category || "General"}
                </span>
                {product.condition && (
                  <span className="px-3 py-1 rounded-sm bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                    {product.condition}
                  </span>
                )}
                {product.is_featured && (
                  <span className="px-3 py-1 rounded-sm bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Truck size={14} className="text-primary" />
                <span>Location: {product.location || "On Campus"}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="fill-brand-gold text-brand-gold" size={18} />
                  <span className="font-bold text-lg">{product.rating || "5.0"}</span>
                  <span className="text-muted-foreground">({product.review_count || 0} reviews)</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2 text-success font-semibold">
                  <ShieldCheck size={18} />
                  <span>Verified Seller</span>
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 rounded-md bg-secondary/50 border border-border">
              <span className="text-sm text-muted-foreground block mb-1">Total Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-display font-black text-primary">
                  {formatPrice(Number(product.price))}
                </span>
                {product.old_price && (
                  <span className="text-xl text-muted-foreground line-through decoration-destructive/50">
                    {formatPrice(Number(product.old_price))}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-md bg-card border border-border hover:border-primary/20 transition-colors">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">On-Campus Delivery</h4>
                  <p className="text-xs text-muted-foreground">Fast delivery to hostels and cafeteria areas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-md bg-card border border-border hover:border-primary/20 transition-colors">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <RefreshCcw size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">7-Day Return</h4>
                  <p className="text-xs text-muted-foreground">Easy returns for eligible student purchases.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a
                href={`https://wa.me/${product.seller?.phone_number?.replace(/\+/g, '') || ''}?text=Hi, I'm interested in your ${product.title} on Mwanachuo Shop`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat via WhatsApp
              </a>
              <div className="flex gap-2">
                <a
                  href={`tel:${product.seller?.phone_number || ''}`}
                  className="p-4 rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-all border border-border flex items-center justify-center"
                >
                  <Truck size={20} />
                </a>
                <button className="p-4 rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-all border border-border">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description Section */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-6">Description</h2>
          <div className="prose prose-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {product.description || "No description provided."}
          </div>

          <div className="mt-12">
            <h3 className="font-bold text-lg mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.metadata || {}).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between p-3 rounded-xl bg-muted/50 text-sm">
                  <span className="capitalize text-muted-foreground">{key.replace('_', ' ')}</span>
                  <span className="font-semibold">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 border-t border-border pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold">Customer Reviews</h2>
              <button className="text-sm font-bold text-primary hover:underline">Write a Review</button>
            </div>

            {loadingReviews ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-8">
                {reviews.map((review: any) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 rounded-md">
                          <AvatarImage src={review.user?.avatar_url} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold font-display">
                            {review.user?.full_name?.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold">{review.user?.full_name}</p>
                          <div className="flex items-center gap-1">
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
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {review.images.map((img: string, i: number) => (
                          <div key={i} className="w-16 h-16 rounded-sm bg-muted overflow-hidden shrink-0 border border-border">
                            <img src={img} alt="Review attachment" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-md border border-dashed border-border">
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
