## 2026-04-24 - Added Skip to Content Link
**Learning:** Keyboard-only users and screen readers benefit from a 'Skip to content' link at the start of the document, allowing them to bypass repetitive navigation links on every page load.
**Action:** Always include an accessible 'Skip to content' link as the first focusable element inside the `<body>`, pointing to an `id` on the `<main>` element. In Tailwind projects, use `sr-only focus:not-sr-only` along with visible focus styles so it's hidden by default but visible when tabbed to.
