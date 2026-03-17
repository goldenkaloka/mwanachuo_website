import { Home, Loader2, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getOptimizedImageUrl } from "@/utils/imageOptim";
import { SectionSkeleton } from "./HomeSkeletons";
import { cacheStore } from "@/utils/cacheStore";

const formatPrice = (price: number) => {
    return `TSh ${price.toLocaleString()}`;
};

const AccommodationsSection = () => {
    const { selectedUniversity } = useUniversity();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Instant-On Persistence
    const cacheKey = `cached_accommodations_${selectedUniversity?.id || 'global'}`;
    const getCachedData = () => {
        return cacheStore.getItem<any[]>(cacheKey) || null;
    };

    // Prefetch function for details
    const prefetchAccommodation = (id: string) => {
        queryClient.prefetchQuery({
            queryKey: ["accommodation", id],
            queryFn: async () => {
                const { data, error } = await supabase
                    .from("accommodations")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (error) throw error;
                return data;
            },
            staleTime: 60 * 1000,
        });
    };

    const { data: accommodations, isLoading, isError } = useQuery({
        queryKey: ["accommodations", selectedUniversity?.id, !!user],
        initialData: getCachedData() || undefined,
    queryFn: async () => {
      let query = supabase
        .from("accommodations")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (user && selectedUniversity) {
        query = query.or(`metadata->is_global.eq.true,university_ids.cs.{${selectedUniversity.id}}`);
      }

      const { data, error } = await query.limit(10); // Candidate pool

      if (error) throw error;
      if (!data) return [];

      const now = new Date();
      const finalData = data
        .map(item => {
          let score = Math.random() * 5; // Low jitter for hostels (stability is better)
          // Accommodations don't have is_featured yet, but they have ratings
          if (item.rating >= 4.5) score += 20;
          
          const hoursOld = (now.getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60);
          if (hoursOld < 336) { // 2 week boost for hostels (long listing lifecycle)
            score += Math.max(0, 30 * (1 - hoursOld / 336));
          }
          return { ...item, _score: score };
        })
        .sort((a, b) => b._score - a._score)
        .slice(0, 4);

      cacheStore.setItem(cacheKey, finalData);
      return finalData;
    },
    staleTime: 0, // Force background refresh (SWR) even with initialData
    });

    if (isLoading) {
        return <SectionSkeleton />;
    }

    if (isError) return null;

    if (!accommodations || accommodations.length === 0) {
        return null;
    }

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Find a place to stay</h2>
                    <p className="text-sm text-muted-foreground mt-1">Hostels and rooms {user && selectedUniversity ? `near ${selectedUniversity.name}` : "anywhere"}</p>
                </div>
                <Link to="/accommodations" className="text-sm font-semibold text-primary hover:underline">See all</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {accommodations.map((acc, i) => (
                    <motion.div
                        key={acc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onMouseEnter={() => prefetchAccommodation(acc.id)}
                        onClick={() => navigate(`/accommodation/${acc.id}`)}
                        className="flex flex-col bg-card rounded-md overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="w-full sm:w-48 h-48 shrink-0 bg-muted relative">
                            {acc.images && acc.images.length > 0 ? (
                                <img
                                    src={getOptimizedImageUrl(acc.images[0], { width: 400, height: 400, quality: 75 })}
                                    alt={acc.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <Home size={32} />
                                </div>
                            )}
                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-lg uppercase">
                                {acc.room_type || "Hostel"}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="font-display font-bold text-lg text-foreground mb-1 line-clamp-1">{acc.name}</h3>
                                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                                    <MapPin size={12} className="text-primary" />
                                    <span className="line-clamp-1">{acc.location}</span>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="fill-brand-gold text-brand-gold" />
                                        <span className="text-xs font-semibold">{acc.rating || "5.0"}</span>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                        {acc.amenities?.slice(0, 2).join(" • ") || "Verified"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Starting from</span>
                                    <span className="font-display font-bold text-primary">
                                        {formatPrice(Number(acc.price))}
                                        <span className="text-[10px] text-muted-foreground font-normal"> /{acc.price_type?.replace('per_', '') || "month"}</span>
                                    </span>
                                </div>
                                <Link
                                    to={`/accommodation/${acc.id}`}
                                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold transition-all"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AccommodationsSection;
