## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-06-06 - Explicit Focus Indicators & Programmatic Skip Links
**Learning:** Default browser focus rings are often insufficient for good accessibility. Also, skip-to-content links fail to functionally move screen reader focus unless the target container explicitly handles programmatic focus (via `tabindex="-1"`).
**Action:** Always define clear, high-contrast `focus-visible` styles for interactive elements globally. Furthermore, when implementing skip-to-content links, ensure the target landmark (like `<main>`) has `tabindex="-1"` and `focus:outline-none` so it can receive focus programmatically without causing an unwanted visual outline.
