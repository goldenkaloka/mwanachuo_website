import { Smartphone, Shirt, Home, Wrench, ShoppingBasket, Heart, Dumbbell, Car, Bed, Book, FileText, Sparkles, MoreHorizontal, Library, Music, Gamepad, Palette, Camera, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { useCategories } from "@/hooks/useCategories";

const iconMap: Record<string, any> = {
  book: Book,
  devices: Smartphone,
  chair: Home,
  note: FileText,
  shirt: Shirt,
  fitness: Dumbbell,
  cosmetics: Sparkles,
  food: ShoppingBasket,
  pen: FileText,
  car: Car,
  home: Home,
  library: Library,
  music: Music,
  gamepad: Gamepad,
  palette: Palette,
  camera: Camera,
  laptop: Laptop,
  phone: Smartphone,
  more: MoreHorizontal,
};

interface CategoryBarProps {
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

const CategoryBar = ({ activeCategory, onSelect }: CategoryBarProps) => {
  const { data: dynamicCategories, isLoading } = useCategories();

  // Special categories that aren't in product_categories
  const specialCategories = [
    { id: "accommodations", label: "Accommodations", icon: Bed },
    { id: "services", label: "Services", icon: Wrench },
  ];

  return (
    <div className="py-4 overflow-x-auto no-scrollbar scrollbar-hide -mx-4 px-4 sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all border ${!activeCategory ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
        >
          All Items
        </button>

        {/* Render special categories first */}
        {specialCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.label)}
            className={`px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all border ${activeCategory === category.label ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
          >
            <div className="flex items-center gap-2">
              <category.icon size={16} />
              {category.label}
            </div>
          </button>
        ))}

        {/* Render dynamic product categories */}
        {!isLoading && dynamicCategories?.map((category) => {
          const Icon = iconMap[category.icon] || MoreHorizontal;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.name)}
              className={`px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all border ${activeCategory === category.name ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} />
                {category.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
