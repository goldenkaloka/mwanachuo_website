export const ProductSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex flex-col gap-4 animate-pulse bg-card/50 rounded-lg p-3 border border-border">
        <div className="aspect-square bg-muted rounded-md" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="flex justify-between mt-auto pt-2">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-8 bg-muted rounded-xl w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export const SectionSkeleton = () => (
    <div className="py-8 animate-pulse">
        <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-48" />
                <div className="h-4 bg-muted rounded w-32" />
            </div>
            <div className="h-4 bg-muted rounded w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-muted rounded-md" />
            ))}
        </div>
    </div>
);
