## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-06-07 - Programmatic Focus for Skip-to-Content Targets
**Learning:** Skip-to-content links that target non-interactive elements (like `<main>`) often fail to properly move focus for screen readers unless the target element is explicitly made focusable.
**Action:** Always add `tabindex="-1"` and `focus:outline-none` (to prevent an unwanted focus ring for mouse users) to the target element (e.g., `<main>`) of a skip-to-content link.
