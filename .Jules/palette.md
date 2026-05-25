## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-25 - Focus visible styles for interactive elements
**Learning:** Keyboard navigation lacks clear visual feedback on anchor tags, making accessibility challenging for users relying on keyboard tabbing.
**Action:** Always include explicit `focus-visible` styling (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) to ensure high contrast, visually distinct focus indicators on all interactive elements in this design system.
