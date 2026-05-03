## 2024-03-08 - Accessible Skip Navigation and Active States
**Learning:** Skip-to-content links must not only be visibly hidden but completely focusable for keyboard users. Relying purely on visual layout without explicit `aria-current="page"` leaves screen reader users unaware of the current context in top-level navigation.
**Action:** Always include a `sr-only` class that toggles to `focus:not-sr-only` along with `aria-current="page"` checks for global navigational contexts in all Layout components.
