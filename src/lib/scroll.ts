// Scroll to the top of the page for the Home link and logo so they glide
// instead of teleporting. The positional scrollTo() inherits the html
// `scroll-behavior` set by the motion-safe:scroll-smooth class — so it animates
// for most visitors and jumps instantly for those who prefer reduced motion.
export function scrollToTopSmooth(e?: { preventDefault: () => void }) {
  e?.preventDefault();
  if (typeof window === "undefined") return;
  window.scrollTo(0, 0);
}
