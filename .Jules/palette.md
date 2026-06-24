## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-24 - High-visibility focus indicators for keyboard navigation
**Learning:** Adding `focus-visible` styles explicitly across all interactive elements (like `a` tags) significantly improves the experience for keyboard users without affecting mouse/touch users. Using `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige` provides a highly visible focus ring that matches the site's design.
**Action:** Always apply explicit `focus-visible` styling (outline or ring + offset) on global interactive elements to ensure visual clarity during keyboard navigation.
