## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-04-23 - Focus styles and decorative SVG screen reader visibility
**Learning:** Found that keyboard users lack clear visibility of focus states, and decorative SVGs in interactive elements can cause redundant/confusing screen reader announcements.
**Action:** Use `:focus-visible` to add visible rings to interactive elements without impacting mouse users. Always add `aria-hidden="true"` to decorative SVGs within links or buttons to improve screen reader experience.
