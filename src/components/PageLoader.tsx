import { Loader2 } from "lucide-react";

export const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading Page...</p>
    </div>
  </div>
);

export default PageLoader;
