## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.
## 2024-05-24 - Accessibility Enhancements
**Learning:** Adding global focus-visible styles to `a` elements and `aria-hidden="true"` to decorative SVGs within links ensures keyboard users have clear visual cues and screen reader users aren't confused by redundant announcements, improving the baseline accessibility across the Astro site.
**Action:** When creating or updating interactive elements (links, buttons) or decorative icons in future components, consistently apply explicit focus-visible rings (e.g., `focus-visible:ring-2 focus-visible:ring-ink`) and `aria-hidden` attributes to ensure robust keyboard and screen-reader accessibility.
