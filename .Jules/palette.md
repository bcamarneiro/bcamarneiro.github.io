## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-06-20 - Skip-to-content Targets and Focus-Visible Styles
**Learning:** Found that skip-to-content links pointing to semantic landmarks (like `<main>`) fail to effectively move programmatic focus for screen readers unless the target element has `tabindex="-1"`. Additionally, relying on default browser focus rings leads to inconsistent and often inaccessible contrast experiences.
**Action:** Always verify that programmatic focus targets (like main wrappers for skip links) include `tabindex="-1"` and `focus:outline-none`. Furthermore, ensure that global interactive elements (links, buttons) have explicitly defined, high-contrast `focus-visible` ring styles (e.g., `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) for keyboard accessibility.
