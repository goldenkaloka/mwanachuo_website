/**
 * Utility functions for image URL handling.
 * 
 * Note: Supabase Image Transformations (/render/image/) require a paid add-on.
 * This function currently returns the original URL to ensure images always load.
 * To enable resizing/WebP conversion, activate "Image Transformations" in your Supabase project.
 */

interface ImageOptions {
  width?: number;
  height?: number;
  resize?: "cover" | "contain" | "fill";
  quality?: number; // 1-100
  format?: "origin" | "webp" | "avif";
}

/**
 * Returns the image URL. When Supabase Image Transformations are enabled on your
 * project (Dashboard → Storage → Image Transformations add-on), uncomment the
 * transformation logic below to get automatic WebP conversion and resizing.
 * 
 * @param url The original Supabase storage public URL
 * @param options Transformation options (used when transformations are enabled)
 * @returns The image URL
 */
export const getOptimizedImageUrl = (url: string | null | undefined, _options: ImageOptions = {}): string => {
  if (!url) return "";

  // ✅ Always return the original URL so images load reliably.
  // When you upgrade to a plan with Image Transformations, replace the line below
  // with the transformation logic (see commented code below).
  return url;

  /* --- ENABLE THIS BLOCK when Supabase Image Transformations are active ---
  if (!url.includes("/storage/v1/object/public/")) return url;
  if (url.includes("/storage/v1/render/image/public/")) return url;

  const { width, height, resize = "cover", quality = 80, format = "webp" } = _options;
  try {
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace("/object/public/", "/render/image/public/");
    if (width) urlObj.searchParams.set("width", width.toString());
    if (height) urlObj.searchParams.set("height", height.toString());
    if (resize) urlObj.searchParams.set("resize", resize);
    if (quality) urlObj.searchParams.set("quality", quality.toString());
    if (format) urlObj.searchParams.set("format", format);
    return urlObj.toString();
  } catch (e) {
    return url;
  }
  --- END BLOCK --- */
};
