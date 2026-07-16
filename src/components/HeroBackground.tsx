// San Antonio hero backdrop: seamlessly-looping River Walk clip (free/license-clear,
// no watermark). Encoded to a smooth loop with a poster frame for fast first paint.
const HERO_VIDEO = "/hero-sanantonio.mp4";
const HERO_POSTER = "/hero-sanantonio.jpg";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-dark">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      {/* Overlay strategy: keep the white headline legible while letting the River Walk
          foliage show through. Mobile text is full-width, so darken more uniformly there;
          on desktop the copy is left-aligned, so fade darker-left → lighter-right. */}
      {/* Mobile / small screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/55 to-forest-dark/80 md:hidden" />
      {/* Desktop: dark behind the left column, lighter over the scenery on the right */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-forest-dark/85 via-forest-dark/45 to-forest-dark/10" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-forest-dark/55 to-transparent" />
    </div>
  );
}
