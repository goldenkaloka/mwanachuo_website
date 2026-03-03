import { Smartphone, Shirt, Home, Wrench, ShoppingBasket, Heart, Dumbbell, Car } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Electronics", icon: Smartphone, color: "bg-primary/10 text-primary" },
  { name: "Fashion", icon: Shirt, color: "bg-accent/10 text-accent" },
  { name: "Home", icon: Home, color: "bg-brand-green/10 text-brand-green" },
  { name: "Services", icon: Wrench, color: "bg-brand-gold/10 text-brand-gold" },
  { id: "electronics", label: "Electronics", name: "Electronics", icon: Smartphone, color: "bg-primary/10 text-primary" },
  { id: "fashion", label: "Fashion", name: "Fashion", icon: Shirt, color: "bg-accent/10 text-accent" },
  { id: "home", label: "Home", name: "Home", icon: Home, color: "bg-brand-green/10 text-brand-green" },
  { id: "services", label: "Services", name: "Services", icon: Wrench, color: "bg-brand-gold/10 text-brand-gold" },
  { id: "groceries", label: "Groceries", name: "Groceries", icon: ShoppingBasket, color: "bg-primary/10 text-primary" },
  { id: "health", label: "Health", name: "Health", icon: Heart, color: "bg-accent/10 text-accent" },
  { id: "sports", label: "Sports", name: "Sports", icon: Dumbbell, color: "bg-brand-green/10 text-brand-green" },
  { id: "auto", label: "Auto", name: "Auto", icon: Car, color: "bg-brand-gold/10 text-brand-gold" },
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
