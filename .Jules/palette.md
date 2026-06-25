## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-04-23 - Focusable skip link target
**Learning:** Skip-to-content links need to target an element that can receive programmatic focus, otherwise the keyboard focus flow gets disrupted.
**Action:** When adding skip-to-content links, ensure the target element (like `<main>`) has `tabindex="-1"` and `focus:outline-none` so it can be focused via the link without showing an unwanted default focus ring for mouse users.
