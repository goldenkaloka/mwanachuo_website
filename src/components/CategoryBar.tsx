import { Smartphone, Shirt, Home, Wrench, ShoppingBasket, Heart, Dumbbell, Car, Bed } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "electronics", label: "Electronics", icon: Smartphone, color: "bg-primary/10 text-primary" },
  { id: "fashion", label: "Fashion", icon: Shirt, color: "bg-accent/10 text-accent" },
  { id: "home", label: "Home", icon: Home, color: "bg-brand-green/10 text-brand-green" },
  { id: "accommodations", label: "Accommodations", icon: Bed, color: "bg-primary/10 text-primary" },
  { id: "services", label: "Services", icon: Wrench, color: "bg-brand-gold/10 text-brand-gold" },
  { id: "groceries", label: "Groceries", icon: ShoppingBasket, color: "bg-primary/10 text-primary" },
  { id: "health", label: "Health", icon: Heart, color: "bg-accent/10 text-accent" },
  { id: "sports", label: "Sports", icon: Dumbbell, color: "bg-brand-green/10 text-brand-green" },
  { id: "auto", label: "Auto", icon: Car, color: "bg-brand-gold/10 text-brand-gold" },
];

interface CategoryBarProps {
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

const CategoryBar = ({ activeCategory, onSelect }: CategoryBarProps) => {
  return (
    <div className="py-4 overflow-x-auto no-scrollbar -mx-4 px-4 sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all border ${!activeCategory ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.label)}
            className={`px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all border ${activeCategory === category.label ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
