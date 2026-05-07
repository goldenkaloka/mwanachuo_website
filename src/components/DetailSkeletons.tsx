import { Shimmer } from "./ExploreSkeletons";

export const ProductDetailSkeleton = () => (
  <main className="flex-1 container mx-auto px-4 py-8">
    <div className="h-6 w-40 bg-muted rounded mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="aspect-square bg-muted rounded-md" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-6 w-20 bg-muted rounded" />
        </div>
        <div className="h-10 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded" />
        <div className="h-6 w-1/4 bg-muted rounded" />
        <div className="h-20 w-full bg-muted rounded" />
        <div className="flex gap-4">
          <div className="h-12 w-1/2 bg-muted rounded" />
          <div className="h-12 w-12 bg-muted rounded" />
          <div className="h-12 w-12 bg-muted rounded" />
        </div>
      </div>
    </div>
  </main>
);

export const ServiceDetailSkeleton = () => (
  <main className="flex-1 container mx-auto px-4 py-8">
    <div className="h-6 w-40 bg-muted rounded mb-6" />
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-md border border-border p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-muted rounded-md" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
          </div>
        </div>
        <div className="h-24 bg-muted rounded" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-1/2 bg-muted rounded" />
          <div className="h-12 w-1/3 bg-muted rounded" />
        </div>
      </div>
    </div>
  </main>
);

export const AccommodationDetailSkeleton = () => (
  <main className="flex-1 container mx-auto px-4 py-8">
    <div className="h-6 w-40 bg-muted rounded mb-6" />
    <div className="space-y-8">
      <div className="aspect-video bg-muted rounded-md max-h-96" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-10 w-1/3 bg-muted rounded" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
          <div className="h-12 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
  </main>
);
