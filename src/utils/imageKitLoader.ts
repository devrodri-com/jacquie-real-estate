// src/utils/imageKitLoader.ts
// ImageKit loader for Next.js <Image />
// Usage in a component:
//   import imageKitLoader from "@/utils/imageKitLoader";
//   <Image loader={imageKitLoader} src={"/real-estate/proyectos/72-park/hero.jpg"} ... />
// Notes:
//   - Prefer passing relative paths (without domain). We'll prepend IMAGEKIT_BASE_URL.
//   - Configure next.config.(js|ts) with images.remotePatterns to allow ik.imagekit.io.

export type ImageKitLoaderProps = {
  src: string;      // "/folder/file.jpg" or full IK URL
  width: number;    // requested width from Next
  quality?: number; // 1..100 (default ~75)
};

// Read base endpoint from env (e.g., https://ik.imagekit.io/your_id)
const BASE = process.env.NEXT_PUBLIC_IMAGEKIT_BASE_URL?.replace(/\/$/, "");

function isAbsolute(url: string) {
  return /^https?:\/\//i.test(url);
}

// Build an ImageKit URL with transformation params
export default function imageKitLoader({ src, width, quality }: ImageKitLoaderProps): string {
  // If the src is already an absolute ImageKit URL, keep domain and just manage the `tr` query.
  // If it's relative, prepend BASE (must be defined).
  const baseUrl = isAbsolute(src)
    ? src
    : `${BASE ?? ""}${src.startsWith("/") ? src : `/${src}`}`;

  // If BASE is missing and src is relative, fail loudly to help debugging.
  if (!isAbsolute(baseUrl)) {
    throw new Error(
      "imageKitLoader: NEXT_PUBLIC_IMAGEKIT_BASE_URL is required when using relative src paths"
    );
  }

  // Build transformation string:
  //  - w-<width>          => requested width from Next
  //  - q-<quality|75>     => JPEG/WebP quality
  //  - f-auto             => auto format (webp/avif when supported)
  //  - pr-true            => DPR aware for Retina screens
  const trParts = [
    `w-${Math.round(width)}`,
    `q-${quality ?? 75}`,
    "f-auto",
    "pr-true",
  ];

  // Merge with existing query params. If there's already a `tr` param, append with comma.
  const url = new URL(baseUrl);
  const existingTr = url.searchParams.get("tr");
  const nextTr = existingTr ? `${existingTr},${trParts.join(",")}` : trParts.join(",");
  url.searchParams.set("tr", nextTr);

  return url.toString();
}