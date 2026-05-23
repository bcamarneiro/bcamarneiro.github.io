## 2024-04-22 - Skip to content links and main nav landmarks
**Learning:** Found missing skip-to-content functionality and lacking aria-label on primary navigation which are key features for proper screen reader and keyboard accessibility, especially on layouts with large sticky headers.
**Action:** Always verify keyboard accessibility of layouts specifically ensuring a skip-to-content visually hidden link exists (e.g. `sr-only focus:not-sr-only`) targeting the main wrapper, and ensure `nav` tags have distinctive aria labels to be read out well.

## 2026-05-23 - Focus Visible Styles for Custom Backgrounds
**Learning:** This app uses custom theme colors (like `bg-beige`) instead of standard tailwind gray palettes. Standard browser focus rings or generic tailwind rings often don't provide sufficient contrast against these custom backgrounds, rendering keyboard navigation difficult to track.
**Action:** Always apply explicit focus visible styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color] focus-visible:ring-offset-2 focus-visible:ring-offset-[bg-color]`) tailored to the specific background context to ensure accessible contrast and avoid visual clutter for mouse/touch users.
