## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2026-05-10 - Focus visible styles and aria-hidden on svg icons
**Learning:** Found lacking focus states on interactive elements and missing aria-hidden on decorative SVG icons, which degrade keyboard and screen reader accessibility. Explicitly defining 'focus-visible' utility classes in base CSS provides clear styling without disrupting mouse users.
**Action:** Consistently enforce the addition of `focus-visible` classes to interactive components and ensure all decorative icons receive `aria-hidden="true"` across the design system to maintain high accessibility standards.
