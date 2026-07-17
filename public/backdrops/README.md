# Section backdrop photos

Drop background photos for site sections in this folder, then point a section at
one.

Suggested files (any web-friendly `.jpg`/`.webp`, ~1600–2400px wide, optimized):

- `process.jpg` — faint landscape behind the "See How Our Process Works" timeline

## How to turn one on

Each section that supports a backdrop has a constant near the top of its
component. For example, in `src/components/Process.tsx`:

```ts
const PROCESS_BACKDROP = ""; // -> set to "/backdrops/process.jpg"
```

Set it to the image path (e.g. `"/backdrops/process.jpg"`) and it renders behind
the content with a readability overlay. Leave it `""` to keep the plain
background. See `src/components/SectionBackdrop.tsx` for the overlay options
(`cream`, `light`, `dark`).
