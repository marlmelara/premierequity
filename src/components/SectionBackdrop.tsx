import Image from "next/image";

// Reusable full-section background photo with a readability overlay.
//
// To add a backdrop to a section: drop an image in /public/backdrops/ and pass
// its path as `src` (e.g. "/backdrops/process.jpg"). If `src` is empty, nothing
// renders and the section keeps its normal background color — so it's safe to
// leave a placeholder until real photos are added.
//
// The parent <section> must be `relative isolate` (isolate makes a stacking
// context so this -z-10 layer sits above the section's own background but below
// the content) and usually `overflow-hidden`.
export function SectionBackdrop({
  src,
  overlay = "cream",
}: {
  src?: string;
  /** Overlay tint over the photo so text stays readable. */
  overlay?: "cream" | "light" | "dark";
}) {
  if (!src) return null;

  const overlayClass = {
    cream: "bg-cream/70",
    light: "bg-white/80",
    dark: "bg-forest-dark/70",
  }[overlay];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
