## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-06-04 - Consistent Keyboard Navigation Feedback
**Learning:** Found that relying on default browser focus rings creates inconsistent and often inaccessible experiences (poor contrast against the beige background) for keyboard users.
**Action:** Always add explicit `focus-visible` styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) globally to interactive elements like `a` and `button` tags to guarantee high contrast keyboard indicators while preserving standard mouse/touch behavior.
