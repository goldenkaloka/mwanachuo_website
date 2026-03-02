import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import ProductGrid from "@/components/ProductGrid";
import ServicesSection from "@/components/ServicesSection";
import AccommodationsSection from "@/components/AccommodationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
          <ProductGrid categoryFilter={activeCategory} searchFilter={searchQuery} />

          {!activeCategory && !searchQuery && (
            <>
              <AccommodationsSection />
              <ServicesSection />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
