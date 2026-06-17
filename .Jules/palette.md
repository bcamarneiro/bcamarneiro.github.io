## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-15 - Decorative Icons and Skip-Link Targets Focus Handling
**Learning:** Decorative icons in contact links (like SVG logos) can create redundant screen reader noise if not explicitly hidden. Additionally, jump links (like skip-to-content) must target elements that can receive programmatic focus without showing a default outline to ensure a seamless experience for keyboard and screen reader users.
**Action:** Always add `aria-hidden="true"` to decorative SVGs inside links/buttons. For skip-link targets like `<main>`, always add `tabindex="-1"` and `focus:outline-none` to allow programmatic focus while hiding the focus ring.
