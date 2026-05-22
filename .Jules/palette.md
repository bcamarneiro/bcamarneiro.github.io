## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-22 - Hide decorative SVGs from screen readers
**Learning:** Found multiple instances of `<svg>` icons next to descriptive text (e.g., Location, Email, LinkedIn, GitHub in `src/pages/cv.astro`) lacking `aria-hidden="true"`. Without this, screen readers may read confusing descriptions or raw SVG attributes before the actual text content.
**Action:** Always add `aria-hidden="true"` to decorative `<svg>` icons that accompany descriptive text to ensure a clean auditory experience for visually impaired users.
