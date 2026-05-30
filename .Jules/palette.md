## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2024-05-15 - Focus-visible styling accessibility and screen reader hidden decorative SVGs
**Learning:** Found missing explicit focus styles (especially `focus-visible`) and lacking `aria-hidden` attributes on decorative SVGs (like icons alongside text) which is critical for making keyboard and screen reader accessibility smooth.
**Action:** Always ensure interactive elements (like buttons and links) define explicit `focus-visible:outline-none focus-visible:ring-2` to support keyboard navigation cleanly, and explicitly tag decorative `svg`s embedded in UI links with `aria-hidden="true"`.
