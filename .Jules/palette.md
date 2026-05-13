## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-13 - Focus Visible Styles
**Learning:** Found that the project's interactive elements (links and buttons) were missing explicit `focus-visible` styles, which are crucial for keyboard navigation accessibility. Relying solely on default browser outlines can sometimes result in low contrast or inconsistent visuals across browsers, and mouse users might see a focus ring when clicking which is not always desirable.
**Action:** Always ensure that explicit `focus-visible` styles are defined for interactive elements. I applied these globally to `a` and `button` tags in `src/styles/global.css` using existing Tailwind theme colors (e.g., `ring-ink` and `ring-offset-beige`) to maintain visual consistency while significantly improving the experience for keyboard users.
