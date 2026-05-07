import { Package, Search, Bell, ShoppingCart, Star, MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

const EmptyStateItem = ({ icon, title, description, action }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground/50">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-xs mb-6">{description}</p>
    {action && (
      action.href ? (
        <Link
          to={action.href}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </Link>
      ) : (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </button>
      )
    )}
  </motion.div>
);

export const EmptyProducts = ({ onClearFilters }: { onClearFilters?: () => void }) => (
  <EmptyStateItem
    icon={<Package size={40} strokeWidth={1} />}
    title="No products found"
    description="We couldn't find any products matching your current criteria. Try adjusting your filters or search query."
    action={{
      label: "Clear all filters",
      onClick: onClearFilters
    }}
  />
);

export const EmptyServices = ({ onClearFilters }: { onClearFilters?: () => void }) => (
  <EmptyStateItem
    icon={<Search size={40} strokeWidth={1} />}
    title="No services found"
    description="We couldn't find any services matching your current filtering. Try a different category or search term."
    action={{
      label: "Reset Filters",
      onClick: onClearFilters
    }}
  />
);

export const EmptyAccommodations = ({ onClearFilters }: { onClearFilters?: () => void }) => (
  <EmptyStateItem
    icon={<Home size={40} strokeWidth={1} />}
    title="No accommodations found"
    description="We couldn't find any rooms matching your search. Try picking a different university or clearing your filters."
    action={{
      label: "Reset All Filters",
      onClick: onClearFilters
    }}
  />
);

export const EmptyNotifications = () => (
  <EmptyStateItem
    icon={<Bell size={40} strokeWidth={1} />}
    title="No notifications yet"
    description="You're all caught up! Check back later for updates on your listings and orders."
  />
);

export const EmptyCart = () => (
  <EmptyStateItem
    icon={<ShoppingCart size={40} strokeWidth={1} />}
    title="Your cart is empty"
    description="Browse our marketplace and add items to your cart to see them here."
    action={{
      label: "Start Shopping",
      href: "/products"
    }}
  />
);

export const EmptyReviews = () => (
  <EmptyStateItem
    icon={<Star size={40} strokeWidth={1} />}
    title="No reviews yet"
    description="Be the first to share your experience with this item!"
  />
);

export const EmptySearch = ({ query }: { query?: string }) => (
  <EmptyStateItem
    icon={<Search size={40} strokeWidth={1} />}
    title="No results found"
    description={query ? `We couldn't find anything for "${query}". Try a different search term.` : "Start typing to search for products, services, or accommodations."}
  />
);

export const EmptyListings = () => (
  <EmptyStateItem
    icon={<Package size={40} strokeWidth={1} />}
    title="No listings yet"
    description="You haven't created any listings yet. Start selling to the campus community!"
    action={{
      label: "Create Listing",
      href: "/create-listing"
    }}
  />
);

export const EmptyLocation = () => (
  <EmptyStateItem
    icon={<MapPin size={40} strokeWidth={1} />}
    title="No location set"
    description="Select your university to see listings near your campus."
  />
);
