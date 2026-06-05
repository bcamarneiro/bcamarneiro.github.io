## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-06-05 - Global Focus Rings & SVG Accessibility
**Learning:** Found that applying global `focus-visible` styles to base HTML tags (like `a`) is highly effective for establishing a baseline of keyboard accessibility across all pages without custom per-component CSS, and explicitly removing decorative SVGs from the accessibility tree prevents redundant announcements when combined with clear text labels.
**Action:** When working on navigation or link-heavy pages, check if focus rings are visible. If not, consider adding Tailwind's `focus-visible:ring-*` utilities at the global layer (e.g., in `global.css`) instead of component by component. Always check if icons next to text need `aria-hidden="true"`.
