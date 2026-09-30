## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-07-06 - Skip to content target focusability
**Learning:** Found that `<main>` tags functioning as targets for "Skip to content" links need specific attributes to handle programmatic focus without causing visual clutter.
**Action:** When implementing skip-to-content functionality, ensure the target container (like `<main>`) includes `tabindex="-1"` and `focus:outline-none` so it can properly receive focus from the skip link without displaying an unwanted default browser focus ring.
