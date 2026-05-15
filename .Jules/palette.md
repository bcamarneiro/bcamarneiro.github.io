## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-05-15 - Focus Visible Styles for Keyboard Navigation
**Learning:** Interactive elements like links and buttons often lack clear visual feedback when navigating via keyboard, making it hard for keyboard-only or screen-reader users to know what element has focus.
**Action:** Use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color] focus-visible:ring-offset-2` across global base elements (`a`, `button`) to ensure accessible contrast and clear indications of focus without cluttering the UI for mouse/touch users.
