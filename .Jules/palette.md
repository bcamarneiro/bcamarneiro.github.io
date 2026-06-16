## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-16 - Skip-to-Content Focus Handling
**Learning:** Targets of skip-to-content links (like `<main>`) require `tabindex="-1"` and `focus:outline-none` to properly receive programmatic focus from screen readers without displaying an unwanted default focus ring.
**Action:** Always ensure skip-link targets have these attributes applied to maintain accessibility and visual cleanliness.
