## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-07-02 - Skip-to-content target accessibility
**Learning:** Found that the skip-to-content link target element (`<main>`) requires `tabindex="-1"` and `focus:outline-none` to properly receive programmatic focus from screen readers without displaying an unwanted default focus ring.
**Action:** Always verify that skip-to-content target elements are focusable programmatically but visually seamless when focused.
