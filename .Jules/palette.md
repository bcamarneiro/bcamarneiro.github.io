## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2024-05-18 - Global keyboard focus accessibility
**Learning:** Found that custom color schemas often result in keyboard focus rings with low contrast (e.g. against custom `bg-beige`). Found it's important to use `focus-visible` pseudo-class universally on interactive elements using offset styling matching the background color to ensure strong contrast (`focus-visible:ring-offset-beige`) without disrupting mouse user experience.
**Action:** Always apply global styling (e.g. `a, button { @apply focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-beige }`) to ensure a consistently accessible, distinct focus indicator across the application that adheres to WCAG contrast guidelines and specific application color palettes.
