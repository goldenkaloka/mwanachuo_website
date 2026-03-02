import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Loader2 } from "lucide-react";
import { useUniversity } from "@/hooks/useUniversity";

interface LocationSelectorProps {
  open: boolean;
  onClose: () => void;
}

const LocationSelector = ({ open, onClose }: LocationSelectorProps) => {
  const { universities, selectedUniversity, setUniversity, loading } = useUniversity();

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-card rounded-2xl shadow-xl z-50 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-foreground">Select your University</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Show products and services near your campus
            </p>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                {universities.map((uni) => (
                  <button
                    key={uni.id}
                    onClick={() => {
                      setUniversity(uni);
                      onClose();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${selectedUniversity?.id === uni.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/70"
                      }`}
                  >
                    <MapPin size={16} className={selectedUniversity?.id === uni.id ? "text-primary-foreground" : "text-primary"} />
                    <div className="flex flex-col">
                      <span>{uni.name}</span>
                      <span className={`text-[10px] ${selectedUniversity?.id === uni.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {uni.location}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocationSelector;
