## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-15 - Enhancing accessibility with tabindex and aria-hidden
**Learning:** Skip-to-content links need their target elements (like `<main>`) to have `tabindex="-1"` and `focus:outline-none` so they can receive programmatic focus correctly for screen readers and keyboard users without showing a distracting default focus ring. Also, decorative icons within links or buttons must explicitly have `aria-hidden="true"` to prevent screen readers from confusingly reading out arbitrary paths or generic image names alongside the link text.
**Action:** Always verify that skip link targets are properly configured with `tabindex="-1"` and `focus:outline-none`, and that all decorative `<svg>` icons have `aria-hidden="true"`.
