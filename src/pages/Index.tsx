import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import ProductGrid from "@/components/ProductGrid";
import ServicesSection from "@/components/ServicesSection";
import AccommodationsSection from "@/components/AccommodationsSection";
import Footer from "@/components/Footer";

import { useAuth } from "@/hooks/useAuth";
import { useUniversity } from "@/hooks/useUniversity";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { loading: authLoading } = useAuth();
  const { isInitialized: uniInitialized } = useUniversity();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const setActiveCategory = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    console.log('[Index] Hydration State:', { authLoading, uniInitialized, searchQuery, activeCategory });
  }, [authLoading, uniInitialized, searchQuery, activeCategory]);

  const setSearchQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  if (authLoading || !uniInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Initializing Mwanachuo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <main className="container mx-auto px-4">
        {!activeCategory && !searchQuery && (
          <div className="pt-4">
            <HeroCarousel />
          </div>
        )}
        <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />

        <div className="space-y-8">
          {/* Show ProductGrid if not specifically viewing Accommodations or Services */}
          {activeCategory !== "Accommodations" && activeCategory !== "Services" && (
            <ProductGrid categoryFilter={activeCategory} searchFilter={searchQuery} />
          )}

          {/* Show Accommodations if no category is selected OR if "Accommodations" is selected */}
          {(!activeCategory || activeCategory === "Accommodations") && !searchQuery && (
            <AccommodationsSection />
          )}

          {/* Show Services if no category is selected OR if "Services" is selected */}
          {(!activeCategory || activeCategory === "Services") && !searchQuery && (
            <ServicesSection />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
