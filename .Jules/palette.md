## 2024-04-26 - [Skip links & Decorative Icons]
**Learning:** Decorative icons like text arrows (→) used in links get announced by screen readers as "rightwards arrow", polluting the link context. Additionally, complex pages need a "skip to content" link for keyboard navigation efficiency.
**Action:** Always wrap decorative text icons in `<span aria-hidden="true">` when inside links. Add visually hidden but focusable skip links in the base layout to target the `<main id="main-content">` element.
