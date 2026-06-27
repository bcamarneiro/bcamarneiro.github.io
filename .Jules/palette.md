## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-06-27 - Focus Management for Skip-to-Content Links
**Learning:** When using a skip-to-content link, the target element (such as `<main>`) must have `tabindex="-1"` and `focus:outline-none` (or equivalent) in order to successfully receive programmatic focus without showing a default browser focus outline, thereby ensuring screen readers and keyboard users start interacting at the correct point.
**Action:** Always verify that the element targeted by a skip-to-content link has `tabindex="-1"` and appropriate outline reset styles.
