## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2025-01-22 - Focus Styles and Skip Links
**Learning:** When using skip-to-content links, it's important to add `tabindex="-1"` and `style="outline: none;"` to the target (e.g. `<main>`) to ensure it receives programmatic focus without showing a weird focus ring to keyboard/screen reader users. Furthermore, relying only on default browser focus rings is not always good UX; explicitly defining `focus-visible` with contrast-friendly styles (e.g., using `ring-ink` and `ring-offset-beige`) makes keyboard navigation much clearer.
**Action:** Always add explicit focus-visible styles to `a` and `button` tags in global styling, and ensure skip link targets are properly configured with tabindex.
