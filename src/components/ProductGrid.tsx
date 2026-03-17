import { Star, ShoppingCart, Loader2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getOptimizedImageUrl } from "@/utils/imageOptim";
import { ProductSkeleton } from "./HomeSkeletons";
import { cacheStore } from "@/utils/cacheStore";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ProductGrid = ({ categoryFilter, searchFilter }: { categoryFilter?: string | null, searchFilter?: string | null }) => {
  const { selectedUniversity } = useUniversity();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Instant-On Persistence Logic
  const cacheKey = `cached_products_${selectedUniversity?.id || 'global'}_${categoryFilter || 'all'}_${searchFilter || 'none'}`;
  const getCachedData = () => {
    return cacheStore.getItem<any[]>(cacheKey) || null;
  };

  // Prefetch function for product details
  const prefetchProduct = (productId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();
        if (error) throw error;
        return data;
      },
      staleTime: 60 * 1000, // 1 minute
    });
  };

  const { data: products, isLoading, isError, error: queryError } = useQuery({
    queryKey: ["products", selectedUniversity?.id, categoryFilter, searchFilter, !!user],
    initialData: getCachedData() || undefined,
    queryFn: async () => {
      try {
        let query = supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        // ONLY restrict to university if the user is logged in.
        // If the user is NOT logged in, show EVERYTHING (Global Access).
        if (user && selectedUniversity) {
          query = query.or(`metadata->is_global.eq.true,university_ids.cs.{${selectedUniversity.id}}`);
        }

        if (categoryFilter) {
          // Handle both name and ID for backward compatibility
          if (categoryFilter.length === 36) {
            query = query.eq("category_id", categoryFilter);
          } else {
            query = query.ilike("category", `%${categoryFilter}%`);
          }
        }

        if (searchFilter) {
          query = query.ilike("title", `%${searchFilter}%`);
        }

        // Fetch a candidate pool (slightly more than we need) for weighted discovery
        const { data, error } = await query.limit(24);

        if (error) throw error;
        if (!data) return [];

        // --- Marketplace Fairness Algorithm ---
        // Weights: Featured (100) + Recent (50) + Discovery Jitter (0-15)
        const now = new Date();
        const scoredData = data.map(item => {
          let score = 0;
          
          // 1. Featured Boost (Seller Utility/Buyer Quality)
          if (item.is_featured) score += 100;
          
          // 2. Recency Boost (New Seller Exposure/Freshness)
          const createdDate = new Date(item.created_at);
          const hoursOld = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
          if (hoursOld < 72) { // 3 day boost
            score += Math.max(0, 50 * (1 - hoursOld / 72));
          }
          
          // 3. Discovery Jitter (Refresh Variance)
          // We use a pseudo-random jitter so the feed feels "alive" on every load
          score += Math.random() * 15;
          
          return { ...item, _fairness_score: score };
        });

        // Save to cache for Instant-On load next time
        const finalData = scoredData
          .sort((a, b) => b._fairness_score - a._fairness_score)
          .slice(0, 8);
        
        cacheStore.setItem(cacheKey, finalData);
        return finalData;
      } catch (err) {
        console.error("ProductGrid query error:", err);
        throw err;
      }
    },
    enabled: true,
    staleTime: 0, // Force background refresh (SWR) even with initialData
  });

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12 text-center">
        <h3 className="text-lg font-semibold text-foreground">No products found</h3>
        <p className="text-muted-foreground mt-2">Try selecting a different university or check back later.</p>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
            {user && selectedUniversity ? `Popular near ${selectedUniversity.name}` : "Popular Products"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Based on your location preferences</p>
        </div>
        <Link to="/products" className="text-sm font-semibold text-primary hover:underline">See all</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onMouseEnter={() => prefetchProduct(product.id)}
            className="group bg-card rounded-md overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 flex flex-col h-full cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden bg-muted">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={getOptimizedImageUrl(product.images[0], { width: 400, height: 400, quality: 75 })}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                {product.is_featured && (
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                    Featured
                  </span>
                )}
                <button className="absolute bottom-2 right-2 p-2 rounded-xl bg-card/90 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground">
                  <ShoppingCart size={16} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">{product.title}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="fill-brand-gold text-brand-gold" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating || "5.0"} ({product.review_count || 0})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-foreground">{formatPrice(Number(product.price))}</span>
                  </div>
                  {product.location && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <MapPin size={10} className="text-primary" />
                      {product.location}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
