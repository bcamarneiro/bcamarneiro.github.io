## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-18 - Accessibility of Decorative Icons and Focus States
**Learning:** Found decorative SVGs inside links (like contact information on the CV page) lacking `aria-hidden="true"`, causing screen readers to redundantly announce the SVG. Additionally, discovered that global anchor tags lacked `focus-visible` styling, making keyboard navigation difficult to track visually.
**Action:** Always add `aria-hidden="true"` to decorative SVGs, particularly those next to text inside links or buttons. Ensure that a global accessible focus ring is configured for all interactive elements (e.g., using `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-sm`) without affecting mouse users.
