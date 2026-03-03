import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Package,
    Wrench,
    Bed,
    Upload,
    Loader2,
    Plus,
    Trash2,
    Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useUniversity } from "@/hooks/useUniversity";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type ListingType = "product" | "service" | "accommodation";

const CreateListing = () => {
    const { user } = useAuth();
    const { selectedUniversity, universities } = useUniversity();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [type, setType] = useState<ListingType>("product");
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    // Product specific
    const [condition, setCondition] = useState("new");

    // Service specific
    const [availability, setAvailability] = useState("");

    // Accommodation specific
    const [accType, setAccType] = useState("hostel");
    const [sharing, setSharing] = useState("no");
    const [amenities, setAmenities] = useState<string[]>([]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user?.id}/${fileName}`;

            try {
                const { error: uploadError } = await supabase.storage
                    .from('listing-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('listing-images').getPublicUrl(filePath);
                newImages.push(data.publicUrl);
            } catch (error: any) {
                toast({
                    title: "Error uploading image",
                    description: error.message,
                    variant: "destructive"
                });
            }
        }

        setImages(newImages);
        setUploading(false);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!selectedUniversity) {
            toast({ title: "Please select a university", variant: "destructive" });
            return;
        }

        setLoading(true);

        try {
            const isGlobal = user?.user_metadata?.user_type === "business";

            if (type === "product") {
                const { error } = await supabase.rpc("create_product_atomic", {
                    p_title: title,
                    p_description: description,
                    p_price: parseFloat(price),
                    p_category: category,
                    p_condition: condition,
                    p_images: images,
                    p_seller_id: user.id,
                    p_location: "Campus", // Default location
                    p_university_ids: [selectedUniversity.id],
                    p_is_global: isGlobal,
                    p_metadata: {}
                });
                if (error) throw error;
            } else if (type === "service") {
                const { error } = await supabase.rpc("create_service_atomic", {
                    p_title: title,
                    p_description: description,
                    p_price: parseFloat(price),
                    p_category: category,
                    p_price_type: "fixed",
                    p_images: images,
                    p_provider_id: user.id,
                    p_location: "Campus",
                    p_contact_phone: "", // Will be pulled from profile in DB if needed
                    p_contact_email: user.email,
                    p_availability: availability,
                    p_is_global: isGlobal,
                    p_metadata: {}
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.rpc("create_accommodation_atomic", {
                    p_name: title,
                    p_description: description,
                    p_price: parseFloat(price),
                    p_price_type: "monthly",
                    p_room_type: accType,
                    p_images: images,
                    p_owner_id: user.id,
                    p_location: "Near Campus",
                    p_contact_phone: "",
                    p_contact_email: user.email,
                    p_amenities: amenities,
                    p_bedrooms: 1,
                    p_bathrooms: 1,
                    p_university_ids: [selectedUniversity.id],
                    p_metadata: { sharing }
                });
                if (error) throw error;
            }

            toast({
                title: "Listing created!",
                description: "Your item is now live in the marketplace.",
            });
            navigate("/dashboard");
        } catch (error: any) {
            toast({
                title: "Error creating listing",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
                <button
                    onClick={() => step > 1 ? setStep(step - 1) : navigate("/dashboard")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-8"
                >
                    <ArrowLeft size={16} />
                    {step === 1 ? "Back to Dashboard" : "Previous Step"}
                </button>

                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Create New Listing</h1>
                    <p className="text-muted-foreground">Share what you have with the {selectedUniversity?.name || "campus"} community.</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 gap-4"
                        >
                            <h2 className="text-lg font-bold mb-2">What are you listing today?</h2>
                            <div
                                onClick={() => { setType("product"); setStep(2); }}
                                className={`p-6 rounded-md border-2 transition-all cursor-pointer flex items-center gap-6 ${type === "product" ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"}`}
                            >
                                <div className="p-4 rounded-md bg-primary/10 text-primary">
                                    <Package size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Product</h3>
                                    <p className="text-sm text-muted-foreground">Sell books, electronics, fashion, or stationery.</p>
                                </div>
                            </div>

                            <div
                                onClick={() => { setType("service"); setStep(2); }}
                                className={`p-6 rounded-md border-2 transition-all cursor-pointer flex items-center gap-6 ${type === "service" ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"}`}
                            >
                                <div className="p-4 rounded-md bg-secondary text-foreground">
                                    <Wrench size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Service</h3>
                                    <p className="text-sm text-muted-foreground">Offer tutoring, cleaning, logistics, or printing.</p>
                                </div>
                            </div>

                            <div
                                onClick={() => { setType("accommodation"); setStep(2); }}
                                className={`p-6 rounded-md border-2 transition-all cursor-pointer flex items-center gap-6 ${type === "accommodation" ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"}`}
                            >
                                <div className="p-4 rounded-md bg-accent text-accent-foreground">
                                    <Bed size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Accommodation</h3>
                                    <p className="text-sm text-muted-foreground">List a room, hostel space, or find a roommate.</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-8 rounded-md">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1">Title</label>
                                        <input
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder={type === "product" ? "e.g. Calculus Textbook" : type === "service" ? "e.g. Thesis Proofreading" : "e.g. Single Room near Gate A"}
                                            className="w-full px-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold ml-1">Price (TSh)</label>
                                            <input
                                                required
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="15,000"
                                                className="w-full px-4 py-3 rounded-2xl bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold ml-1">Category</label>
                                            <select
                                                required
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 appearance-none"
                                            >
                                                <option value="">Select Category</option>
                                                {type === "product" ? (
                                                    <>
                                                        <option value="electronics">Electronics</option>
                                                        <option value="books">Books</option>
                                                        <option value="fashion">Fashion</option>
                                                        <option value="stationery">Stationery</option>
                                                    </>
                                                ) : type === "service" ? (
                                                    <>
                                                        <option value="tutoring">Tutoring</option>
                                                        <option value="cleaning">Cleaning</option>
                                                        <option value="logistics">Logistics</option>
                                                        <option value="beauty">Beauty & Salon</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="hostel">Hostel</option>
                                                        <option value="apartment">Apartment</option>
                                                        <option value="roommate">Roommate Search</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1">Description</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Give more details about your listing..."
                                            className="w-full px-4 py-3 rounded-2xl bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 resize-none"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold ml-1">Images</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {images.map((img, i) => (
                                                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
                                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(i)}
                                                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {images.length < 5 && (
                                                <label className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                                                    {uploading ? <Loader2 size={24} className="animate-spin text-primary" /> : <Plus size={24} className="text-muted-foreground group-hover:text-primary" />}
                                                    <span className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Upload</span>
                                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
                                    {loading ? "Publishing..." : "Create Listing"}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default CreateListing;
