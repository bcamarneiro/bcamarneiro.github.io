## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2024-05-29 - Global focus visible styles for interactive elements
**Learning:** Found missing clear focus indicators for interactive elements across the app. Keyboard users need clear visual feedback when an element receives focus. The default focus outline is often hidden or insufficient for the beige background.
**Action:** Implemented a global utility class update using `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige` on the global `a` tag in the base layer to ensure a crisp, on-brand focus ring for keyboard navigation without affecting mouse clicks.
