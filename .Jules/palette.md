## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-05-27 - Consistent Focus Indicators
**Learning:** Relying on default browser focus outlines often leads to poor contrast or is removed entirely by CSS resets. Setting explicit `focus-visible` styles globally ensures accessible contrast while avoiding visual clutter for pointer users.
**Action:** Always add explicit focus-visible styles (e.g. `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) to interactive elements like `<a>` and `<button>` in base global styles.
