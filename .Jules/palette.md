## 2026-04-25 - [Keyboard Navigation & Focus Indicators]
**Learning:** Global focus indicators and a 'Skip to content' link are essential accessibility requirements that are often overlooked. Relying on default browser focus rings is insufficient, as they can be hard to see against certain backgrounds.
**Action:** Ensure all interactive elements have explicit, high-contrast `:focus-visible` styles defined globally. Always include a hidden 'Skip to content' link at the beginning of the DOM that becomes visible on focus to allow keyboard users to bypass repetitive navigation.
