import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Search, Star, MessageSquare, MapPin, Loader2, ArrowLeft, Clock, Wrench } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServiceExploreSkeleton } from "@/components/ExploreSkeletons";

const formatPrice = (price: number) => {
  return `TSh ${price.toLocaleString()}`;
};

const ExploreServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedUniversity } = useUniversity();
  const { user } = useAuth();
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading 
  } = useInfiniteQuery({
    queryKey: ["explore-services", selectedUniversity?.id, categoryFilter, searchQuery, !!user],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 15;
      let query = supabase
        .from("services")
        .select(`
          id, title, description, price, price_type, category, rating, location, availability, is_active, created_at, is_featured
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (user && selectedUniversity) {
        query = query.or(`metadata->is_global.eq.true,university_ids.cs.{${selectedUniversity.id}}`);
      }

      if (categoryFilter) {
        query = query.ilike("category", `%${categoryFilter}%`);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Apply Marketplace Fairness Algorithm
      const now = new Date();
      const scoredData = (data || []).map(item => {
        let score = 0;
        if (item.is_featured) score += 100;
        const hoursOld = (now.getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60);
        if (hoursOld < 168) score += Math.max(0, 40 * (1 - hoursOld / 168)); // 1 week boost for services
        score += Math.random() * 10; // Jitter
        return { ...item, _fairness_score: score };
      });

      return scoredData.sort((a, b) => b._fairness_score - a._fairness_score);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 15 ? allPages.length : undefined;
    },
  });

  const services = data?.pages.flat() || [];

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
              Service Directory
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Find professional help {user && selectedUniversity ? `at ${selectedUniversity.name}` : "anywhere"}
            </p>
          </div>

          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="What do you need help with?"
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

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scrollbar-hide border-b border-border">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("category");
              setSearchParams(params);
            }}
            className={`px-4 py-2 border-b-2 transition-all whitespace-nowrap text-sm font-bold uppercase tracking-widest ${!categoryFilter ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            All Services
          </button>
          {["Academic", "Technical", "Styling", "Laundry", "Transport", "Design", "Writing"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("category", cat);
                setSearchParams(params);
              }}
              className={`px-4 py-2 border-b-2 transition-all whitespace-nowrap text-sm font-bold uppercase tracking-widest ${categoryFilter === cat ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading && services.length === 0 ? (
          <ServiceExploreSkeleton />
        ) : services && services.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={`${service.id}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 15) * 0.03 }}
                  className="group bg-card rounded-md overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
                >
                  <Link to={`/service/${service.id}`}>
                    <div className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-sm bg-primary/10 text-primary">
                          <Wrench size={24} />
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-brand-gold text-brand-gold" />
                          <span className="text-[10px] font-black">{service.rating || "5.0"}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{service.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-grow">{service.description}</p>

                      <div className="space-y-3 pt-4 border-t border-border mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Rate</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-primary">{formatPrice(Number(service.price))}</span>
                            <span className="text-[9px] text-muted-foreground font-bold uppercase">/{service.price_type || "hr"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                          <Clock size={12} className="text-primary" />
                          <span>{service.availability?.[0] || "Flexible"}</span>
                        </div>

                        {service.location && (
                          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                            <MapPin size={12} className="text-primary" />
                            <span>{service.location}</span>
                          </div>
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
                    "Load More Services"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Service not found</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              We couldn't find any services matching your current filtering. Try a different category or search term.
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-bold hover:bg-primary/90 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExploreServices;
