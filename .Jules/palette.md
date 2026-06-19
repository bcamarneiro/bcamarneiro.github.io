## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-06-19 - Focus Management and Decorative Elements
**Learning:** Skip-to-content links require the target element (like `<main>`) to have `tabindex="-1"` and `focus:outline-none` to receive programmatic focus properly without showing a confusing focus ring to mouse users. Also, global anchor styling should explicitly define `focus-visible` states instead of relying on default browser rings, which can clash with custom backgrounds.
**Action:** Ensure all skip-to-content targets have `tabindex="-1"` and `focus:outline-none`. Define global explicit `focus-visible` styles (e.g., `focus-visible:ring-2 focus-visible:ring-ink`) for interactive elements, and aggressively hide decorative SVGs with `aria-hidden="true"` when accompanying text exists.
