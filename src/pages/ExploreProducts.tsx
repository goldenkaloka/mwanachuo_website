import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Search, Star, ShoppingCart, MapPin, Loader2, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formatPrice = (price: number) => {
    return `TSh ${price.toLocaleString()}`;
};

const ExploreProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { selectedUniversity } = useUniversity();
    const categoryFilter = searchParams.get("category");
    const searchQuery = searchParams.get("search");

    const { data: products, isLoading } = useQuery({
        queryKey: ["explore-products", selectedUniversity?.id, categoryFilter, searchQuery],
        queryFn: async () => {
            let query = supabase
                .from("products")
                .select("*")
                .eq("is_active", true)
                .order("created_at", { ascending: false });

            if (selectedUniversity) {
                query = query.or(`university_ids.cs.{${selectedUniversity.id}},university_ids.eq.{}`);
            }

            if (categoryFilter) {
                query = query.ilike("category", `%${categoryFilter}%`);
            }

            if (searchQuery) {
                query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
            }

            const { data, error } = await query;
            if (error) throw error;
            return data || [];
        },
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
                            <ArrowLeft size={14} />
                            Back to Home
                        </Link>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                            Explore Products
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {products?.length || 0} items available {selectedUniversity ? `near ${selectedUniversity.name}` : "globally"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 md:w-64">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                value={searchQuery || ""}
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams);
                                    if (e.target.value) params.set("search", e.target.value);
                                    else params.delete("search");
                                    setSearchParams(params);
                                }}
                                className="w-full pl-10 pr-4 py-2 rounded-md bg-muted border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                        <button className="p-2 rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    <button
                        onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.delete("category");
                            setSearchParams(params);
                        }}
                        className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${!categoryFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                    >
                        All Items
                    </button>
                    {["Electronics", "Fashion", "Home", "Groceries", "Books", "Sports", "Health"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                const params = new URLSearchParams(searchParams);
                                params.set("category", cat);
                                setSearchParams(params);
                            }}
                            className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground font-medium">Loading amazing products...</p>
                    </div>
                ) : products && products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.02 }}
                                className="group bg-card rounded-md overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
                            >
                                <Link to={`/product/${product.id}`}>
                                    <div className="relative aspect-square overflow-hidden bg-muted">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic">
                                                No image available
                                            </div>
                                        )}
                                        {product.is_featured && (
                                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-[0.1em] bg-primary text-primary-foreground">
                                                Featured
                                            </span>
                                        )}
                                        <button className="absolute bottom-2 right-2 p-2 rounded-xl bg-card/90 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground shadow-sm">
                                            <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-sm font-bold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star size={10} className="fill-brand-gold text-brand-gold" />
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                {product.rating || "5.0"} • {product.review_count || 0} Reviews
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="font-display font-black text-primary text-lg leading-none">
                                                {formatPrice(Number(product.price))}
                                            </span>
                                            {product.location && (
                                                <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-0.5 uppercase tracking-tighter">
                                                    <MapPin size={10} className="text-primary" />
                                                    {product.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                        <h3 className="text-lg font-bold text-foreground">No matches found</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                            We couldn't find any products matching your current criteria. Try adjusting your filters or search query.
                        </p>
                        <button
                            onClick={() => {
                                setSearchParams({});
                            }}
                            className="mt-6 text-primary font-bold text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ExploreProducts;
