import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Link } from "react-router-dom";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ProductGrid = ({ categoryFilter, searchFilter }: { categoryFilter?: string | null, searchFilter?: string | null }) => {
  const { selectedUniversity } = useUniversity();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedUniversity?.id, categoryFilter, searchFilter],
    queryFn: async () => {
      try {
        let query = supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (selectedUniversity) {
          // Show university-specific products OR global products (empty university_ids)
          query = query.or(`university_ids.cs.{${selectedUniversity.id}},university_ids.eq.{}`);
        }

        if (categoryFilter) {
          query = query.ilike("category", `%${categoryFilter}%`);
        }

        if (searchFilter) {
          query = query.ilike("title", `%${searchFilter}%`);
        }

        const { data, error } = await query.limit(8);

        if (error) {
          console.error("ProductGrid fetch error:", error);
          throw error;
        }
        return data || [];
      } catch (err) {
        console.error("ProductGrid query error:", err);
        throw err;
      }
    },
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
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
            {selectedUniversity ? `Popular near ${selectedUniversity.name}` : "Popular Products"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Based on your location preferences</p>
        </div>
        <button className="text-sm font-semibold text-primary hover:underline">See all</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card rounded-2xl overflow-hidden shadow-product hover:shadow-product-hover transition-all duration-300"
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden bg-muted">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
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
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-foreground">{formatPrice(Number(product.price))}</span>
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
