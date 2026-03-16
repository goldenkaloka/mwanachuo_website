import { motion } from "framer-motion";

const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
);

export const ProductExploreSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-card rounded-md overflow-hidden border border-border flex flex-col h-full">
          <div className="relative aspect-square bg-muted overflow-hidden">
            <Shimmer />
          </div>
          <div className="p-3 space-y-2">
            <div className="h-4 bg-muted rounded-sm w-3/4 overflow-hidden relative">
              <Shimmer />
            </div>
            <div className="h-3 bg-muted rounded-sm w-1/2 overflow-hidden relative">
              <Shimmer />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="h-5 bg-muted rounded-sm w-1/3 overflow-hidden relative">
                <Shimmer />
              </div>
              <div className="h-3 bg-muted rounded-sm w-1/4 overflow-hidden relative">
                <Shimmer />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ServiceExploreSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-card rounded-md overflow-hidden border border-border flex flex-col h-full">
          <div className="p-5 space-y-4">
            <div className="flex justify-between">
              <div className="w-10 h-10 rounded-sm bg-muted overflow-hidden relative">
                <Shimmer />
              </div>
              <div className="w-8 h-4 bg-muted rounded-sm overflow-hidden relative">
                <Shimmer />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-sm w-full overflow-hidden relative">
                <Shimmer />
              </div>
              <div className="h-3 bg-muted rounded-sm w-2/3 overflow-hidden relative">
                <Shimmer />
              </div>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded-sm w-1/4 overflow-hidden relative">
                  <Shimmer />
                </div>
                <div className="h-5 bg-muted rounded-sm w-1/3 overflow-hidden relative">
                  <Shimmer />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AccommodationExploreSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-card rounded-md overflow-hidden border border-border flex flex-col h-full">
          <div className="aspect-[4/3] bg-muted overflow-hidden relative">
            <Shimmer />
          </div>
          <div className="p-4 space-y-4">
            <div className="h-5 bg-muted rounded-sm w-3/4 overflow-hidden relative">
              <Shimmer />
            </div>
            <div className="h-3 bg-muted rounded-sm w-1/2 overflow-hidden relative">
              <Shimmer />
            </div>
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
              <div className="h-8 bg-muted rounded-sm overflow-hidden relative">
                <Shimmer />
              </div>
              <div className="h-8 bg-muted rounded-sm overflow-hidden relative">
                <Shimmer />
              </div>
              <div className="h-8 bg-muted rounded-sm overflow-hidden relative">
                <Shimmer />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-1 w-1/2">
                <div className="h-2 bg-muted rounded-sm w-full overflow-hidden relative">
                  <Shimmer />
                </div>
                <div className="h-6 bg-muted rounded-sm w-full overflow-hidden relative">
                  <Shimmer />
                </div>
              </div>
              <div className="w-8 h-8 rounded-sm bg-muted overflow-hidden relative">
                <Shimmer />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
