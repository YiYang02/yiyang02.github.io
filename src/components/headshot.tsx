// 80 px below the md breakpoint, 128 px from it up; the 160/256 files cover 2× displays.
const SIZES = "(min-width: 48rem) 128px, 80px";

function srcSet(extension: "avif" | "webp" | "jpg") {
  return `/headshot-160.${extension} 160w, /headshot-256.${extension} 256w`;
}

export function Headshot({ alt }: { alt: string }) {
  return (
    <picture className="block shrink-0">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={SIZES} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={SIZES} />
      <img
        src="/headshot-256.jpg"
        srcSet={srcSet("jpg")}
        sizes={SIZES}
        width={128}
        height={128}
        alt={alt}
        decoding="async"
        fetchPriority="high"
        className="size-20 rounded-[4px] border border-rule bg-rule object-cover md:size-32"
      />
    </picture>
  );
}
