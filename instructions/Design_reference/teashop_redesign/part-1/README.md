Part 1 — Global styles, variables, header & footer
-------------------------------------------------

Goal: establish a stable base so subsequent parts build consistently.

Tasks:
- Add design tokens: colors, spacing, typography, radius (SASS/SCSS or Tailwind config)
- Create global stylesheet and import order (reset, vars, utilities)
- Implement responsive container and grid helpers
- Implement `header` and `footer` Blade partials and include site nav
- Wire global assets (fonts, icons) and verify loading
- Add small smoke test: visit a couple of routes to ensure no PHP/Blade errors

Acceptance criteria:
- Site loads without layout-related errors
- Header/footer are available in main layout and visually match baseline
