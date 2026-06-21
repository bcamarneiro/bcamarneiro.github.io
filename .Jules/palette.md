## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2025-03-09 - Focusable Skip-To-Content Targets
**Learning:** Adding a visual skip-to-content link is only half the battle. If the target of the link (like `<main>`) cannot receive focus via `tabindex="-1"`, the next tab will reset focus to the top of the page, completely defeating the purpose of the skip link for keyboard users.
**Action:** When implementing a skip-to-content feature, always ensure the target element (usually `<main>`) has `tabindex="-1"` and `focus:outline-none` so it can programmatically receive focus without showing a visually distracting focus ring to sighted users.
