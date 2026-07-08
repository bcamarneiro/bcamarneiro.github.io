## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-07-08 - Skip-to-content target focusability
**Learning:** For a skip-to-content link to work reliably across different screen readers and browsers, the target element (usually `<main>`) must be focusable. However, we don't want a visible focus ring on the main layout element when simply skipping to it.
**Action:** Always add `tabindex="-1"` and `focus:outline-none` (or `focus-visible:outline-none`) to the target of a skip-to-content link. This allows the element to receive programmatic focus from the link, without showing an unwanted focus outline when the user is just navigating.
