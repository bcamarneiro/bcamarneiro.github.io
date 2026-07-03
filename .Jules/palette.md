## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2025-02-12 - Skip-to-content target focusability
**Learning:** Skip-to-content links that target non-interactive elements (like `<main>`) require the target to have `tabindex="-1"` so it can receive programmatic focus from the browser when the link is clicked. Otherwise, the skip link might not successfully move the screen reader's virtual cursor or the browser's focus down to the content.
**Action:** Always add `tabindex="-1"` and `focus:outline-none` (to hide the default browser focus ring on the main container) to the target of a skip-to-content link.
