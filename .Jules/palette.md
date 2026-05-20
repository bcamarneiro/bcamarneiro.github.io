## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2024-05-20 - Global Focus Visible Styles
**Learning:** Adding explicit `focus-visible` styles universally to primary interactive elements like `a` and `button` via base Tailwind layers ensures a solid fallback for accessibility, preventing issues where outlines are stripped by default without an alternative indicator.
**Action:** Always provide explicit focus indicators in base global styles (e.g., `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2`) for all interactive elements to ensure consistent keyboard accessibility across the entire app.
