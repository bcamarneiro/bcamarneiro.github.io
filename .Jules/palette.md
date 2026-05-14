## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-24 - Interactive Elements Need Focus Rings for Keyboard Accessibility
**Learning:** Found that anchor tags missed focus-visible states across the global stylesheet. Since styling convention suppresses global default focus rings or modifies element outlines, explicit visually distinct `focus-visible:` tailwind classes are mandatory for screen reader and keyboard accessibility workflows, allowing users to track what's selected.
**Action:** Added explicit accessible focus ring tailwind utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-sm`) to all anchor tags in `global.css`.
