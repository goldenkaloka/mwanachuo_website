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
import { ProductSkeleton, SectionSkeleton } from "@/components/HomeSkeletons";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <main className="container mx-auto px-4">
        {/* Only show the hero on the landing page if not filtered */}
        {!activeCategory && !searchQuery && (
          <div className="pt-4">
            <HeroCarousel />
          </div>
        )}

        <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />

        <div className="space-y-8">
          {/* Initial loading state vs Content */}
          {!uniInitialized ? (
            <div className="space-y-12 py-8">
              <ProductSkeleton />
              <SectionSkeleton />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
