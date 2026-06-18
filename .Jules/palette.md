## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-18 - Consistent Keyboard Navigation Focus
**Learning:** Found that globally styled interactive elements like anchor tags lacked consistent focus-visible rings across the application, making keyboard navigation hard to track. Also reinforced that programmatic focus via skip-links strictly requires targets to have `tabindex="-1"` and outline styles suppressed to behave appropriately for screen readers without confusing sighted users.
**Action:** Always apply explicit, high-contrast `focus-visible` styles with adequate offsets (e.g., `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) universally across standard elements like `a` or `button` to guarantee accessible keyboard interactions out-of-the-box.
