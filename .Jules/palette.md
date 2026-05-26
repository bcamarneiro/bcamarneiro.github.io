## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-26 - Accessible Focus States & Decorative Icons
**Learning:** Default focus states on interactive elements (`a` and `button`) often lack sufficient contrast and visibility for keyboard users. Additionally, SVG icons inside links or contact details can clutter screen reader output if not explicitly hidden.
**Action:** Always provide explicit, high-contrast `focus-visible` styles (e.g., rings with offsets) to all interactive elements globally. Ensure all decorative icons (like SVGs in contact links) include `aria-hidden="true"` to streamline the screen reader experience.
