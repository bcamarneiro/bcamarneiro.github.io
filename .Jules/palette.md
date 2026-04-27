## 2026-04-27 - Keyboard Navigation and Focus Rings
**Learning:** Astro projects using basic semantic HTML and Tailwind often miss out-of-the-box keyboard navigation cues (like focus rings) and skip links, since basic link resets and custom styling often obscure default focus states. This makes keyboard-only navigation extremely difficult or confusing.
**Action:** Always ensure that global link/button resets include `focus-visible` utility classes to show focus rings and that `BaseLayout.astro` (or equivalent) implements a "Skip to content" link.
