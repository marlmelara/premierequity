// Scroll to the top of the page for the Home link and logo so they glide
// instead of teleporting, and reflect it in the URL as `#home` (a ref, like the
// section links) without the jump.
//
// The positional scrollTo() inherits the html `scroll-behavior` set by the
// motion-safe:scroll-smooth class — so it animates for most visitors and jumps
// instantly for those who prefer reduced motion. The URL is only updated AFTER
// the scroll settles (scrollend, with a timeout fallback), because changing the
// history/fragment mid-scroll cancels the animation.
export function scrollToTopSmooth(e?: { preventDefault: () => void }) {
  e?.preventDefault();
  if (typeof window === "undefined") return;

  const setHash = () => {
    if (window.location.hash !== "#home") {
      window.history.pushState(null, "", "#home");
    }
  };

  // Already at the top — just reflect it in the URL, no scroll needed.
  if (window.scrollY < 1) {
    setHash();
    return;
  }

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", finish);
    setHash();
  };
  window.addEventListener("scrollend", finish);
  window.setTimeout(finish, 1200); // fallback if scrollend isn't emitted

  window.scrollTo(0, 0);
}
