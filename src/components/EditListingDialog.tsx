import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/useToast";
import { Loader2, Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditListingDialogProps {
  item: any | null;
  onClose: () => void;
  onSaved: () => void;
}

// Determine listing type from item shape
const getListingType = (item: any): "product" | "service" | "accommodation" => {
  if (item?.seller_id) return "product";
  if (item?.provider_id) return "service";
  return "accommodation";
};

const EditListingDialog = ({ item, onClose, onSaved }: EditListingDialogProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Shared fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Product specific
  const [condition, setCondition] = useState("");

  // Service specific
  const [availability, setAvailability] = useState("");

  // Accommodation specific
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    if (!item) return;
    const type = getListingType(item);
    setTitle(item.title || item.name || "");
    setDescription(item.description || "");
    setPrice(String(item.price || ""));
    setCategory(item.category || "");
    setIsActive(item.is_active ?? true);

    if (type === "product") {
      setCondition(item.condition || "");
    } else if (type === "service") {
      setAvailability(
        Array.isArray(item.availability)
          ? item.availability.join(", ")
          : item.availability || ""
      );
    } else {
      setRoomType(item.room_type || "");
    }
  }, [item]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    setSaving(true);
    const type = getListingType(item);
    let table = "";
    let payload: any = {};

    if (type === "product") {
      table = "products";
      payload = {
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        is_active: isActive,
      };
    } else if (type === "service") {
      table = "services";
      payload = {
        title,
        description,
        price: parseFloat(price),
        category,
        availability: availability.split(",").map((a) => a.trim()).filter(Boolean),
        is_active: isActive,
      };
    } else {
      table = "accommodations";
      payload = {
        name: title,
        description,
        price: parseFloat(price),
        room_type: roomType,
        is_active: isActive,
      };
    }

    const { error } = await supabase.from(table).update(payload).eq("id", item.id);

    setSaving(false);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Listing updated!", description: "Your changes have been saved." });
      onSaved();
      onClose();
    }
  };

  const type = item ? getListingType(item) : "product";

  return (
    <Dialog open={!!item} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg rounded-xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="font-display text-lg font-bold">Edit Listing</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Update the details for your {type}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {type === "accommodation" ? "Name" : "Title"}
            </label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-md"
              placeholder="e.g. Calculus Textbook"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="Describe your listing..."
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price (TSh)</label>
            <Input
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-11 rounded-md"
              placeholder="e.g. 15000"
            />
          </div>

          {/* Product: category + condition */}
          {type === "product" && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 rounded-md"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-muted text-sm border-none focus:ring-2 focus:ring-primary/30 appearance-none h-11"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </>
          )}

          {/* Service: category + availability */}
          {type === "service" && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 rounded-md"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Availability (comma separated)
                </label>
                <Input
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="h-11 rounded-md"
                  placeholder="e.g. Monday, Wednesday, Weekends"
                />
              </div>
            </>
          )}

          {/* Accommodation: room type */}
          {type === "accommodation" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-muted text-sm border-none focus:ring-2 focus:ring-primary/30 appearance-none h-11"
              >
                <option value="hostel">Hostel</option>
                <option value="apartment">Apartment</option>
                <option value="roommate">Roommate Search</option>
              </select>
            </div>
          )}

          {/* Visibility toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div>
              <p className="text-sm font-bold">Listing Visibility</p>
              <p className="text-xs text-muted-foreground">Toggle to hide this listing from the marketplace</p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isActive ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-11 rounded-md"
              onClick={onClose}
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 h-11 rounded-md font-bold"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin mr-2" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
