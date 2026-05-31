## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-31 - Decorative SVG aria-hidden and global focus styles
**Learning:** Decorative inline SVG icons alongside text (like contact info) are announced redundantly by screen readers if not hidden. In addition, global anchor link focus styles improve keyboard accessibility but must be carefully applied to not disrupt the default UI or introduce layout shifting.
**Action:** Always add `aria-hidden="true"` to decorative SVGs in buttons or links. Apply explicit `focus-visible` styles with offset rings globally to interactive elements like `a` tags using Tailwind.
