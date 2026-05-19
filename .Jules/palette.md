## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2025-02-17 - Keyboard Focus States & Screen Reader Clarity
**Learning:** Found that custom focus indicators on links were lacking globally, making keyboard navigation difficult to track, and some purely decorative SVGs lacked `aria-hidden="true"`, causing unnecessary noise for screen readers.
**Action:** Ensure all interactive elements (like `a` tags) have distinct `focus-visible` styles using standard utility classes (`focus-visible:outline-none focus-visible:ring-2`, etc.) and always append `aria-hidden="true"` to SVGs that are accompanied by descriptive text to maintain a clean accessibility tree.
