## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-09 - Focus Visible Styles
**Learning:** Found lacking explicit focus rings for keyboard accessibility on links and buttons, which makes keyboard navigation difficult to track for users, while default browser outlines can be confusing or visually unappealing if not designed cohesively.
**Action:** Always verify keyboard accessibility of layouts by ensuring explicit `focus-visible` styles are set (e.g. `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) on interactive elements like `a` and `button` via Tailwind to ensure consistent, highly-visible focus rings.
