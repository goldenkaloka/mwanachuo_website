import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getOptimizedImageUrl } from "@/utils/imageOptim";
import heroPromo1 from "@/assets/hero-promo-1.jpg";
import heroPromo2 from "@/assets/hero-promo-2.jpg";

interface Promotion {
  id: string | number;
  type: "image" | "video";
  src: string;
  title: string;
  subtitle: string;
  cta: string;
  priority?: number;
  is_active?: boolean;
}

const VideoSlide = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isPlaying = false;
    if (videoRef.current) {
      // Ensure it's muted before playing
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        isPlaying = true;
      }).catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Video auto-play failed:", err);
        }
      });
    }

    return () => {
      // Cleanup: pause if we were playing to prevent AbortError on unmount
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
      autoPlay
    />
  );
};

const fallbackPromotions: Promotion[] = [
  {
    id: 1,
    type: "image",
    src: heroPromo1,
    title: "Mega Deals This Week",
    subtitle: "Up to 60% off on electronics, fashion & more",
    cta: "Shop Now",
  },
  {
    id: 2,
    type: "image",
    src: heroPromo2,
    title: "Flash Sale Live!",
    subtitle: "Limited time offers on top brands",
    cta: "Grab Deals",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const { data: promotionsData, isLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("promotions")
          .select("*")
          .eq("is_active", true)
          .order("priority", { ascending: false });

        if (error) {
          console.error("Promotions fetch error:", error);
          throw error;
        }

        if (!data || data.length === 0) return fallbackPromotions;

        // Map database columns to component props
        return data.map(item => ({
          ...item,
          src: item.image_url || item.src,
          cta: item.button_text || item.cta
        })) as Promotion[];
      } catch (err) {
        console.error("HeroCarousel query error:", err);
        return fallbackPromotions;
      }
    },
  });

  const activePromotions = promotionsData || fallbackPromotions;

  useEffect(() => {
    if (activePromotions.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activePromotions.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activePromotions.length]);

  const prev = () => setCurrent((c) => (c - 1 + activePromotions.length) % activePromotions.length);
  const next = () => setCurrent((c) => (c + 1) % activePromotions.length);

  if (isLoading) {
    return <div className="w-full rounded-md aspect-[4/3] md:aspect-[3/1] bg-muted animate-pulse" />;
  }

  return (
    <section className="relative w-full overflow-hidden rounded-md aspect-[16/10] md:aspect-[3/1]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePromotions[current].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {activePromotions[current].type === "video" ? (
            <VideoSlide src={activePromotions[current].src} />
          ) : (
            <img
              src={getOptimizedImageUrl(activePromotions[current].src, { width: 1200, height: 400, quality: 80 })}
              alt={activePromotions[current].title}
              className="w-full h-full object-cover"
              loading={current === 0 ? "eager" : "lazy"}
              // @ts-ignore - fetchpriority is a valid experimental/modern attribute for LCP optimization
              fetchpriority={current === 0 ? "high" : "auto"}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 md:via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-12 max-w-[85%] md:max-w-lg">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-display text-xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-4 tracking-tight leading-[1.1] md:leading-none"
              >
                {activePromotions[current].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-xs md:text-lg lg:text-xl mb-6 md:mb-8 font-medium leading-snug md:leading-relaxed max-w-[200px] md:max-w-sm"
              >
                {activePromotions[current].subtitle}
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="px-5 py-2.5 md:px-8 md:py-4 bg-primary text-white rounded-md font-black text-[9px] md:text-xs uppercase tracking-[0.15em] hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {activePromotions[current].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {activePromotions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary" : "w-2 bg-card/60"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
