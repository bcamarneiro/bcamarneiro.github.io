## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-19 - Accessible Link Focus Styles and Decorative SVGs
**Learning:** Adding universal hover styles on links (like underline or text color changes) without accompanying focus-visible styles hurts keyboard accessibility. Additionally, SVG icons used next to text inside links (like GitHub/LinkedIn links) create redundant noise for screen readers if they are not explicitly hidden.
**Action:** Always add explicit focus visible styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) when modifying global link interactions. Add `aria-hidden="true"` to any decorative SVG that accompanies text to improve the screen reader experience.
