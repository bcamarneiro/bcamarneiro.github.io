## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-04-23 - Proper focus-visible outlines for keyboard accessibility
**Learning:** Found that custom styles sometimes hide standard browser focus outlines, making keyboard navigation difficult. Utilizing explicit `focus-visible` states with specific color rings provides critical visual feedback for keyboard users without adding visual clutter for mouse users. Grouping elements with distinct default base styling (like links and buttons) under one CSS selector can lead to unintended visual inheritance and should be separated.
**Action:** Consistently apply offset ring patterns (e.g. `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) separating links from buttons in global styles to maintain accessibility without bleeding distinct font-colors or attributes.
