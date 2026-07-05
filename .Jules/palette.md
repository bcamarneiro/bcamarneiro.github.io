## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-07-05 - Skip-to-content target focusability and explicit link focus
**Learning:** Found that skip-to-content targets lacking `tabindex="-1"` and explicit focus styles cause the programmatic focus to fail silently or display an unwanted default focus ring. Additionally, global link styles often lack high-contrast keyboard focus indicators out-of-the-box.
**Action:** Always verify that `<main>` or skip targets have `tabindex="-1"` with `focus:outline-none`, and ensure global link definitions include robust `focus-visible` ring styles to support keyboard navigation explicitly without relying on browser defaults.
