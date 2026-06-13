## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-04-23 - Skip-to-content focus visibility
**Learning:** When a skip-to-content link shifts focus programmatically to a main content area (e.g. `<main id="main-content">`), adding `tabindex="-1"` is required for reliable screen reader behavior. Furthermore, applying `focus:outline-none` is essential to prevent browsers from displaying an unwanted, default focus ring on the entire page content wrapper when it receives this programmatic focus.
**Action:** Always ensure that skip-to-content link targets include both `tabindex="-1"` and `focus:outline-none` (or equivalent focus ring suppression) to balance screen reader compatibility and visual cleanliness.
