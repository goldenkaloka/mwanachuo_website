import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Search, Star, ShoppingCart, MapPin, Loader2, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCategories } from "@/hooks/useCategories";
import { ProductExploreSkeleton } from "@/components/ExploreSkeletons";
import { getOptimizedImageUrl } from "@/utils/imageOptim";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ExploreProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedUniversity } = useUniversity();
  const { user } = useAuth();
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const { data: dynamicCategories } = useCategories();

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading 
  } = useInfiniteQuery({
    queryKey: ["explore-products", selectedUniversity?.id, categoryFilter, searchQuery, !!user],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 15;
      let query = supabase
        .from("products")
        .select(`
          id, title, price, images, rating, review_count, location, is_featured, created_at, category, metadata
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (user && selectedUniversity) {
        query = query.or(`metadata->is_global.eq.true,university_ids.cs.{${selectedUniversity.id}}`);
      }

      if (categoryFilter) {
        if (categoryFilter.length === 36) {
          query = query.eq("category_id", categoryFilter);
        } else {
          query = query.ilike("category", `%${categoryFilter}%`);
        }
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Apply Marketplace Fairness Algorithm to the fetched chunk
      const now = new Date();
      const scoredData = (data || []).map(item => {
        let score = 0;
        if (item.is_featured) score += 100;
        const hoursOld = (now.getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60);
        if (hoursOld < 72) score += Math.max(0, 50 * (1 - hoursOld / 72));
        score += Math.random() * 15; // Jitter for variety
        return { ...item, _fairness_score: score };
      });

      return scoredData.sort((a, b) => b._fairness_score - a._fairness_score);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 15 ? allPages.length : undefined;
    },
  });

  const products = data?.pages.flat() || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Explore Products
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {products?.length || 0} items available {user && selectedUniversity ? `near ${selectedUniversity.name}` : "globally"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery || ""}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  if (e.target.value) params.set("search", e.target.value);
                  else params.delete("search");
                  setSearchParams(params);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-muted border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <button className="p-2 rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scrollbar-hide">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("category");
              setSearchParams(params);
            }}
            className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${!categoryFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            All Items
          </button>
          {dynamicCategories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("category", cat.name);
                setSearchParams(params);
              }}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${categoryFilter === cat.name ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {isLoading && products.length === 0 ? (
          <ProductExploreSkeleton />
        ) : products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={`${product.id}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 15) * 0.02 }}
                  className="group bg-card rounded-md overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={getOptimizedImageUrl(product.images[0], { width: 400, height: 400, quality: 75 })}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-0 data-[loaded=true]:opacity-100 transition-opacity"
                          onLoad={(e) => (e.currentTarget.dataset.loaded = "true")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic">
                          No image available
                        </div>
                      )}
                      {product.is_featured && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-[0.1em] bg-primary text-primary-foreground">
                          Featured
                        </span>
                      )}
                      <button className="absolute bottom-2 right-2 p-2 rounded-xl bg-card/90 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground shadow-sm">
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={10} className="fill-brand-gold text-brand-gold" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {product.rating || "5.0"} • {product.review_count || 0} Reviews
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-display font-black text-primary text-lg leading-none">
                          {formatPrice(Number(product.price))}
                        </span>
                        {product.location && (
                          <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-0.5 uppercase tracking-tighter">
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

            {hasNextPage && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 bg-secondary text-foreground rounded-md font-bold text-sm hover:bg-secondary/80 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading more...
                    </>
                  ) : (
                    "Load More Items"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
            <h3 className="text-lg font-bold text-foreground">No matches found</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              We couldn't find any products matching your current criteria. Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="mt-6 text-primary font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExploreProducts;
