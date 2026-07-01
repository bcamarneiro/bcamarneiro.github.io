## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-17 - Skip-to-content target focusability
**Learning:** Found that the skip-to-content link targeted the `<main>` element, but since `<main>` is not naturally focusable, the programmatic focus doesn't stick for screen readers when the link is activated, breaking keyboard navigation flow.
**Action:** Always add `tabindex="-1"` to the target element (like `<main>`) of a skip-to-content link, and include `focus:outline-none` so it doesn't show a confusing visible focus ring to mouse users if they happen to click it, while still allowing screen readers to track the focus shift properly.
