## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2025-02-21 - Accessible focus rings blending with custom backgrounds
**Learning:** Found that native browser focus rings are sometimes hard to see or look unpolished against custom background colors (like `bg-beige`), leading to inconsistent keyboard navigation experiences. Adding a dedicated visible focus state that intentionally sets a contrast-friendly ring offset (matching the background) vastly improves the clarity of keyboard interactions without degrading mouse navigation visuals.
**Action:** When establishing global focus styles on interactive elements (e.g. `a`, `button`), utilize `focus-visible` with tailored ring colors and specific `ring-offset-[custom-bg]` utilities (such as `focus-visible:ring-offset-beige`) so the focus outline stands out cleanly from both the element and its container.
