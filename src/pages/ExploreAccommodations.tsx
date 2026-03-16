import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Search, Bed, MapPin, Loader2, ArrowLeft, Home, Zap, Shield, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AccommodationExploreSkeleton } from "@/components/ExploreSkeletons";
import { getOptimizedImageUrl } from "@/utils/imageOptim";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ExploreAccommodations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedUniversity } = useUniversity();
  const { user } = useAuth();
  const categoryFilter = searchParams.get("category"); // Room type effectively
  const searchQuery = searchParams.get("search");

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading 
  } = useInfiniteQuery({
    queryKey: ["explore-accommodations", selectedUniversity?.id, categoryFilter, searchQuery, !!user],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 15;
      let query = supabase
        .from("accommodations")
        .select(`
          id, name, description, price, location, room_type, bedrooms, images, is_active, created_at, rating
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (user && selectedUniversity) {
        query = query.or(`metadata->is_global.eq.true,university_ids.cs.{${selectedUniversity.id}}`);
      }

      if (categoryFilter) {
        query = query.ilike("room_type", `%${categoryFilter}%`);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Apply Marketplace Fairness Algorithm
      const now = new Date();
      const scoredData = (data || []).map(item => {
        let score = Math.random() * 5; // Low jitter for hostels
        if (item.rating >= 4.5) score += 20;
        const hoursOld = (now.getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60);
        if (hoursOld < 336) score += Math.max(0, 30 * (1 - hoursOld / 336)); // 2 week boost
        return { ...item, _fairness_score: score };
      });

      return scoredData.sort((a, b) => b._fairness_score - a._fairness_score);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 15 ? allPages.length : undefined;
    },
  });

  const accommodations = data?.pages.flat() || [];

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
              Hostels & Rooms
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Find your next home {user && selectedUniversity ? `near ${selectedUniversity.name}` : "anywhere"}
            </p>
          </div>

          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by area or hostel..."
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
        </div>

        {/* Room Type Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scrollbar-hide">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("category");
              setSearchParams(params);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${!categoryFilter ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
          >
            All Types
          </button>
          {["Hostel", "Single Room", "Bed Sitter", "Apartment", "Shared"].map((type) => (
            <button
              key={type}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("category", type);
                setSearchParams(params);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${categoryFilter === type ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {isLoading && accommodations.length === 0 ? (
          <AccommodationExploreSkeleton />
        ) : accommodations && accommodations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {accommodations.map((acc, i) => (
                <motion.div
                  key={`${acc.id}-${i}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 15) * 0.02 }}
                  className="group bg-card rounded-md overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
                >
                  <Link to={`/accommodation/${acc.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {acc.images && acc.images.length > 0 ? (
                        <img
                          src={getOptimizedImageUrl(acc.images[0], { width: 600, height: 450, quality: 75 })}
                          alt={acc.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-0 data-[loaded=true]:opacity-100 transition-opacity"
                          onLoad={(e) => (e.currentTarget.dataset.loaded = "true")}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                          <Home size={32} strokeWidth={1} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">No Photos</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md text-white">
                          {acc.room_type || "Room"}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-black text-foreground line-clamp-1 group-hover:text-primary transition-colors">{acc.name}</h3>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-4">
                        <MapPin size={10} className="text-primary" />
                        <span className="font-bold uppercase tracking-tighter truncate">{acc.location}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 mb-4">
                        <div className="flex flex-col items-center gap-1">
                          <Bed size={14} className="text-primary" />
                          <span className="text-[8px] font-black text-muted-foreground uppercase">{acc.bedrooms || "1"} Bed</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Zap size={14} className="text-primary" />
                          <span className="text-[8px] font-black text-muted-foreground uppercase">Power</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Shield size={14} className="text-primary" />
                          <span className="text-[8px] font-black text-muted-foreground uppercase">Safe</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-0.5 leading-none">Price</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-primary leading-none">{formatPrice(Number(acc.price))}</span>
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">/mo</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-sm bg-muted group-hover:bg-primary/10 transition-colors">
                          <ArrowLeft size={16} className="rotate-180 text-primary" />
                        </div>
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
                    "Load More Accommodations"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border">
            <Home size={40} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground font-display">No Accommodations Found</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              We couldn't find any rooms matching your search. Try picking a different university or clearing your filters.
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-6 px-8 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-display font-black uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExploreAccommodations;
