## 2026-04-30 - Skip to content pattern
**Learning:** Added a skip-to-content link using Tailwind utility classes (`sr-only focus:not-sr-only`). The link successfully stays hidden until focused, then becomes visible allowing keyboard users to bypass repetitive navigation. Adding `aria-label` to the main `<nav>` complements this well for screen readers.
**Action:** When adding base layouts in Astro projects, consistently implement this `sr-only focus:not-sr-only` skip link pattern targeting a `main-content` id.
