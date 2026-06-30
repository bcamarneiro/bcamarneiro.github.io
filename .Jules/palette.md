## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-04-23 - Skip-to-content targets and focus visible rings
**Learning:** Found that targeting `<main>` with skip-to-content link requires it to be programmatically focusable using `tabindex="-1"`, and the unwanted default focus ring needs to be removed using `focus:outline-none`. Furthermore, focus styles should use `focus-visible` instead of `focus` to prevent showing the focus state when clicked with a mouse, and always use explicit accessible focus rings for keyboard users (e.g., `focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2`).
**Action:** Always ensure skip-to-content link targets like `<main>` include `tabindex="-1"` and `focus:outline-none`, and interactive elements use proper `focus-visible` ring styling.
