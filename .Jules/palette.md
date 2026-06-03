## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-03 - Consistent Keyboard Focus Visibility
**Learning:** Found that default browser focus outlines are often overridden or difficult to see against custom background colors (like `bg-beige`), leading to poor keyboard navigation experiences. Many interactive elements lacked explicit, high-contrast focus states.
**Action:** Added explicit focus-visible styles using Tailwind CSS (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-sm`) globally for `a` and `button` tags to ensure a high-contrast, accessible focus ring that only appears for keyboard users.
