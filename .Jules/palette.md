## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-16 - Universal Focus Styles
**Learning:** Found that relying solely on browser default focus indicators can lead to inconsistent and sometimes hard-to-see outlines. Keyboard users need a prominent and predictable focus indicator.
**Action:** Applied standard focus ring utility classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-beige`) universally in global CSS to `a` and `button` tags to ensure clear visibility across all interactive elements while bypassing focus for regular mouse clicks via `focus-visible`.
