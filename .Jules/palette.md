## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-07-04 - Skip-to-content focus management
**Learning:** Skip-to-content links that target elements like `<main>` may not properly receive programmatic focus from screen readers if they lack a tabindex.
**Action:** Always add `tabindex="-1"` and `focus:outline-none` to skip link targets so they can receive programmatic focus without showing an unwanted visual focus ring to mouse/keyboard users.
