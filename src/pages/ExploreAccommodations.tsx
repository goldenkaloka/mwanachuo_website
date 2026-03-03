import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useUniversity } from "@/hooks/useUniversity";
import { Search, Bed, MapPin, Loader2, ArrowLeft, Home, Zap, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formatPrice = (price: number) => {
    return `TSh ${price.toLocaleString()}`;
};

const ExploreAccommodations = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { selectedUniversity } = useUniversity();
    const categoryFilter = searchParams.get("category"); // Room type effectively
    const searchQuery = searchParams.get("search");

    const { data: accommodations, isLoading } = useQuery({
        queryKey: ["explore-accommodations", selectedUniversity?.id, categoryFilter, searchQuery],
        queryFn: async () => {
            let query = supabase
                .from("accommodations")
                .select("*")
                .eq("is_active", true)
                .order("created_at", { ascending: false });

            if (selectedUniversity) {
                query = query.or(`university_ids.cs.{${selectedUniversity.id}},university_ids.eq.{}`);
            }

            if (categoryFilter) {
                query = query.ilike("room_type", `%${categoryFilter}%`);
            }

            if (searchQuery) {
                query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
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
                            Hostels & Rooms
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Find your next home {selectedUniversity ? `near ${selectedUniversity.name}` : "anywhere"}
                        </p>
                    </div>

                    <div className="relative flex-1 md:w-64">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by area or hostel..."
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
                </div>

                {/* Room Type Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    <button
                        onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.delete("category");
                            setSearchParams(params);
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${!categoryFilter ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                            }`}
                    >
                        All Types
                    </button>
                    {["Hostel", "Single Room", "Bed Sitter", "Apartment", "Shared"].map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                const params = new URLSearchParams(searchParams);
                                params.set("category", type);
                                setSearchParams(params);
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${categoryFilter === type ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground font-medium">Scanning the neighborhood for rooms...</p>
                    </div>
                ) : accommodations && accommodations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {accommodations.map((acc, i) => (
                            <motion.div
                                key={acc.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.02 }}
                                className="group bg-card rounded-md overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
                            >
                                <Link to={`/accommodation/${acc.id}`}>
                                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                        {acc.images && acc.images.length > 0 ? (
                                            <img
                                                src={acc.images[0]}
                                                alt={acc.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                                                <Home size={32} strokeWidth={1} />
                                                <span className="text-[10px] uppercase font-bold tracking-widest">No Photos</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                            <span className="px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md text-white">
                                                {acc.room_type || "Room"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-sm font-black text-foreground line-clamp-1 group-hover:text-primary transition-colors">{acc.name}</h3>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-4">
                                            <MapPin size={10} className="text-primary" />
                                            <span className="font-bold uppercase tracking-tighter truncate">{acc.location}</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 mb-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <Bed size={14} className="text-primary" />
                                                <span className="text-[8px] font-black text-muted-foreground uppercase">{acc.bedrooms || "1"} Bed</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <Zap size={14} className="text-primary" />
                                                <span className="text-[8px] font-black text-muted-foreground uppercase">Power</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <Shield size={14} className="text-primary" />
                                                <span className="text-[8px] font-black text-muted-foreground uppercase">Safe</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-0.5 leading-none">Price</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-lg font-black text-primary leading-none">{formatPrice(Number(acc.price))}</span>
                                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">/mo</span>
                                                </div>
                                            </div>
                                            <div className="p-2 rounded-sm bg-muted group-hover:bg-primary/10 transition-colors">
                                                <ArrowLeft size={16} className="rotate-180 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border">
                        <Home size={40} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-foreground font-display">No Accommodations Found</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                            We couldn't find any rooms matching your search. Try picking a different university or clearing your filters.
                        </p>
                        <button
                            onClick={() => setSearchParams({})}
                            className="mt-6 px-8 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-display font-black uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ExploreAccommodations;
