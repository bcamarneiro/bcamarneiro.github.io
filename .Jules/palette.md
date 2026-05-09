## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-18 - Keyboard Focus & Decorative Icons
**Learning:** Found missing explicit focus indicators on interactive elements (`a` tags) and missing `aria-hidden` attributes on decorative SVG icons next to text in the CV layout. This makes keyboard navigation harder to track and creates redundant or confusing announcements for screen reader users.
**Action:** Always provide explicit, high-contrast focus rings (e.g. `focus-visible:ring-2 focus-visible:ring-ink`) for global interactive elements to aid keyboard users without affecting mouse users, and ensure `aria-hidden="true"` is added to purely decorative `<svg>` icons placed next to descriptive text.
