import { Wrench, Truck, Paintbrush, Zap, Droplets, Shield, ArrowRight, Loader2, Scissors, GraduationCap, Car, Camera, Laptop, Music, Palette, Book } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SectionSkeleton } from "./HomeSkeletons";
import { cacheStore } from "@/utils/cacheStore";

const iconMap: Record<string, any> = {
  "plumbing": Droplets,
  "electrical": Zap,
  "painting": Paintbrush,
  "delivery": Truck,
  "repair": Wrench,
  "security": Shield,
  "salon": Scissors,
  "tutoring": GraduationCap,
  "transport": Car,
  "photography": Camera,
  "technical": Laptop,
  "design": Palette,
  "writing": Book,
  "music": Music,
};

const ServicesSection = () => {
  const { selectedUniversity } = useUniversity();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Instant-On Persistence
  const cacheKey = `cached_services_${selectedUniversity?.id || 'global'}`;
  const getCachedData = () => {
    return cacheStore.getItem<any[]>(cacheKey) || null;
  };

  // Prefetch function for details
  const prefetchService = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["service", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        return data;
      },
      staleTime: 60 * 1000,
    });
  };

  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services", selectedUniversity?.id, !!user],
    initialData: getCachedData() || undefined,
    queryFn: async () => {
      let query = supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (user && selectedUniversity) {
        query = query.or(`metadata->is_global.eq.true,university_ids.cs.{${selectedUniversity.id}}`);
      }

      const { data, error } = await query.limit(15); // Larger candidate pool

      if (error) throw error;
      if (!data) return [];

      const now = new Date();
      const finalData = data
        .map(item => {
          let score = Math.random() * 10; // Base jitter
          if (item.is_featured) score += 100;
          
          const hoursOld = (now.getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60);
          if (hoursOld < 168) { // 1 week boost for service providers
            score += Math.max(0, 40 * (1 - hoursOld / 168));
          }
          return { ...item, _score: score };
        })
        .sort((a, b) => b._score - a._score)
        .slice(0, 6);

      cacheStore.setItem(cacheKey, finalData);
      return finalData;
    },
    staleTime: 0, // Force background refresh (SWR) even with initialData
  });

  if (isLoading) {
    return <SectionSkeleton />;
  }

  if (isError) return null;

  if (!services || services.length === 0) {
    return null; // Don't show section if no services
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Services near you</h2>
          <p className="text-sm text-muted-foreground mt-1">Professional services available in your area</p>
        </div>
        <Link to="/services" className="text-sm font-semibold text-primary hover:underline">View all</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {services.map((service, i) => {
          const Icon = iconMap[service.category?.toLowerCase()] || Wrench;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => prefetchService(service.id)}
              onClick={() => navigate(`/service/${service.id}`)}
              className="relative group rounded-md border bg-card border-border hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <Link to={`/service/${service.id}`} className="p-4 md:p-5 block h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={22} />
                  </div>
                </div>
                <h3 className="font-display font-bold text-foreground mb-1 line-clamp-1">{service.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                  Book now <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
