## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2024-04-23 - Focus ring on skip-to-content targets
**Learning:** When implementing skip-to-content links that target a container (like `<main>`), simply providing an ID is not enough. The container needs `tabindex="-1"` to receive programmatic focus, and `focus:outline-none` so users clicking the link don't see a large, unhelpful focus ring around the entire main content area.
**Action:** Always pair `tabindex="-1"` and `focus:outline-none` on the target element of skip links (usually `<main>` or the main content wrapper).
