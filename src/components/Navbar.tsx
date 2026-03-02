import { useState } from "react";
import { MapPin, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LocationSelector from "./LocationSelector";
import { useUniversity } from "@/hooks/useUniversity";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

const Navbar = ({ searchQuery, onSearch }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const { selectedUniversity } = useUniversity();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="font-display text-xl md:text-2xl font-bold">
              <span className="text-primary">mwanachuo</span>
              <span className="text-foreground">shop</span>
            </Link>
          </div>

          {/* Location button */}
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-foreground hover:bg-muted/80 transition-colors max-w-[200px]"
          >
            <MapPin size={16} className="text-primary shrink-0" />
            <span className="text-muted-foreground whitespace-nowrap">{user ? "Your Campus" : "Deliver to"}</span>
            <span className="font-semibold truncate">
              {selectedUniversity?.name || "Select University"}
            </span>
          </button>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, services..."
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground" title="Profile">
                  <User size={22} />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hidden md:block text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors px-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
                Login
              </Link>
            )}
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors text-foreground">
              <ShoppingCart size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, services..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="mt-2 flex items-center gap-2 text-sm text-muted-foreground w-full"
          >
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="whitespace-nowrap">Delivering to</span>
            <span className="font-semibold text-foreground truncate">
              {selectedUniversity?.name || "Select University"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {["Electronics", "Fashion", "Home & Garden", "Services", "Groceries"].map((item) => (
                <a key={item} href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Category bar - desktop */}
      <nav className="hidden lg:block bg-secondary">
        <div className="container mx-auto px-4 flex items-center gap-6 h-10">
          {["Electronics", "Fashion", "Home & Garden", "Services", "Groceries", "Health & Beauty", "Sports"].map((cat) => (
            <a key={cat} href="#" className="text-xs font-medium text-secondary-foreground/80 hover:text-primary transition-colors whitespace-nowrap">
              {cat}
            </a>
          ))}
        </div>
      </nav>

      <LocationSelector
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
      />
    </header>
  );
};

export default Navbar;
