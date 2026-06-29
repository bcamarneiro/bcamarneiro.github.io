## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-29 - Global focus-visible rings and skip-link targets
**Learning:** Adding universal `focus-visible` styles to base elements (like `a` tags) via `@apply` provides a consistent keyboard navigation experience, but requires special care for functional links like skip-to-content targets to prevent unwanted focus rings.
**Action:** When a skip-to-content target (like `<main>`) receives programmatic focus, it should include `focus:outline-none` alongside `tabindex="-1"` so it doesn't show an interactive focus ring when activated.
