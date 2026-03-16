/**
 * Utility functions for generating optimized Supabase image URLs.
 * Supabase Pro/Team plans or Image Transformations add-on is required for this to work natively.
 * If Image Transformations are not enabled, Supabase will simply return the original image 
 * (after redirect) so this is safe to use as a progressive enhancement.
 */

interface ImageOptions {
  width?: number;
  height?: number;
  resize?: "cover" | "contain" | "fill";
  quality?: number; // 1-100
  format?: "origin" | "webp" | "avif";
}

/**
 * Converts a raw Supabase storage public URL into an optimized transformation URL.
 * 
 * @param url The original Supabase storage public URL
 * @param options Transformation options
 * @returns The optimized URL
 */
export const getOptimizedImageUrl = (url: string | null | undefined, options: ImageOptions = {}): string => {
  if (!url) return "";

  // Check if it's actually a Supabase storage URL
  if (!url.includes("/storage/v1/object/public/")) {
    return url;
  }

  // Check if it's already a render URL
  if (url.includes("/storage/v1/render/image/public/")) {
    return url;
  }

  // Default options for fast loading
  const {
    width,
    height,
    resize = "cover",
    quality = 80,
    format = "webp" // WebP offers excellent compression for ecommerce
  } = options;

  try {
    const urlObj = new URL(url);
    
    // Convert /object/public/ path to /render/image/public/
    urlObj.pathname = urlObj.pathname.replace("/object/public/", "/render/image/public/");
    
    // Append transformation parameters
    if (width) urlObj.searchParams.set("width", width.toString());
    if (height) urlObj.searchParams.set("height", height.toString());
    if (resize) urlObj.searchParams.set("resize", resize);
    if (quality) urlObj.searchParams.set("quality", quality.toString());
    if (format) urlObj.searchParams.set("format", format);

    return urlObj.toString();
  } catch (e) {
    console.error("Failed to parse image URL for optimization:", e);
    return url; // Fallback to original
  }
};
