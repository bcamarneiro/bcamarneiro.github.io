## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2026-06-11 - Focus Management for Skip Links and Navigation
**Learning:** Skip-to-content links require the target element (like `<main>`) to have `tabindex="-1"` and `focus:outline-none` so they can receive programmatic focus without an ugly default ring. Also, applying explicit `focus-visible` classes improves navigation accessibility for keyboard users over default browser focus rings.
**Action:** Always ensure skip-to-content targets have `tabindex="-1"` and `focus:outline-none`, and add explicit focus visible styles to interactive elements like navigation links.
