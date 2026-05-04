## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2024-05-04 - Focus Rings for Interactive Elements
**Learning:** Found missing clear focus indicators for interactive elements such as anchor links and buttons when navigating with the keyboard. Utilizing `focus` states provides visual clutter for mouse users but `focus-visible` addresses this perfectly.
**Action:** Always use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige` on interactive elements to ensure high-contrast accessible focus rings only when navigating via keyboard.
