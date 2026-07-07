## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-07-07 - Explicit Focus Rings and Skip-to-Content Targeting
**Learning:** Found that anchor tags were missing explicit focus states for keyboard navigation, and the skip-to-content target didn't have `tabindex="-1"` which is necessary for it to programmatically receive focus without showing an awkward default outline for screen reader users. Relying on default browser outlines can cause contrast issues.
**Action:** Always provide explicit, high-contrast `focus-visible` styles for interactive elements (using `focus-visible:ring-ink focus-visible:ring-offset-beige`) and always configure programmatic focus targets (like main content wrappers) with `tabindex="-1"` and `focus:outline-none`.
