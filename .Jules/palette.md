## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-28 - Skip-to-content target focusability
**Learning:** Found that the skip-to-content link correctly pointed to `#main-content`, but the target `<main>` element lacked `tabindex="-1"`. Without this, programmatic focus via the link may fail in some screen readers, and adding it ensures focus correctly moves to the main content area. Furthermore, adding `focus:outline-none` prevents an unwanted visual focus ring from appearing around the entire main content area when a keyboard user activates the skip link.
**Action:** Always ensure that skip-to-content link targets (like `<main>`) include `tabindex="-1"` and `focus:outline-none` (or similar reset) so they can receive programmatic focus without degrading the visual experience.
