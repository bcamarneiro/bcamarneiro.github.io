## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-26 - Programmatic focus for skip-to-content links
**Learning:** Skip-to-content targets need explicit `tabindex="-1"` and `focus:outline-none` so they can receive programmatic focus without showing a confusing focus ring for sighted users who might trigger it.
**Action:** Always ensure skip link target elements (like `<main>`) have `tabindex="-1"` and focus ring suppressed.
