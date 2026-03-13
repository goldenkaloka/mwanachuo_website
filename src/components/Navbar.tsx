import { useState } from "react";
import { MapPin, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useUniversity } from "@/hooks/useUniversity";
import { useAuth } from "@/hooks/useAuth";

import { useCategories } from "@/hooks/useCategories";

interface NavbarProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

const Navbar = ({ searchQuery, onSearch }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { selectedUniversity } = useUniversity();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: dynamicCategories } = useCategories();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Define static/special categories
  const specialCategories = ["Accommodations", "Services"];

  // Combine for navigation, showing special ones first
  const navItems = [
    ...specialCategories,
    ...(dynamicCategories?.map(c => c.name) || [])
  ];

  return (
    <header className="sticky top-0 z-50 glass-premium text-white">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-primary-foreground">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="font-display text-2xl md:text-3xl font-black tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">mwanachuo</span>
              <span className="text-white/40 font-medium">shop</span>
            </Link>
          </div>

          {/* University display */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-sm font-medium text-primary-foreground border border-white/10 select-none">
            <MapPin size={16} className="text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest leading-none mb-0.5">{user ? "Your Campus" : "Service Area"}</span>
              <span className="font-bold truncate text-white leading-none">
                {selectedUniversity?.name || "Global Shop"}
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search products, services..."
                value={searchQuery ?? ""}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/[0.07] focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="p-2 rounded-lg hover:bg-white/10 transition-colors text-primary-foreground" title="Profile">
                  <User size={22} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hidden md:block text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors px-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-5 py-2.5 rounded-md bg-white text-primary text-sm font-bold hover:bg-white/90 transition-all active:scale-95">
                Login
              </Link>
            )}
            <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-primary-foreground">
              <ShoppingCart size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-sm bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-primary">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search products, services..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          {/* Mobile university display */}
          <div className="mt-2 flex items-center gap-2 text-[11px] text-white/70 w-full select-none">
            <MapPin size={12} className="text-white shrink-0" />
            <span className="whitespace-nowrap uppercase tracking-wider font-medium">Delivering to:</span>
            <span className="font-bold text-white truncate">
              {selectedUniversity?.name || "Global Shop"}
            </span>
          </div>
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
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={`/?category=${item}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Category bar - desktop */}
      <nav className="hidden lg:block bg-black/40 backdrop-blur-sm border-t border-white/[0.03]">
        <div className="container mx-auto px-4 flex items-center gap-8 h-12 overflow-x-auto no-scrollbar scrollbar-hide">
          {navItems.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className="text-[10px] font-black text-white/40 hover:text-white transition-all whitespace-nowrap uppercase tracking-[0.15em] hover:scale-105"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>


    </header>
  );
};

export default Navbar;
