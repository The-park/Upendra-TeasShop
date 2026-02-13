Teashop Redesign
=================

Purpose: staged refactor of the current site to match the Stitch designs. Work runs in ordered parts so each step is completed without introducing new errors.

Run order (strict):
- Part 1 — Global styles, variables, header & footer
- Part 2 — Landing page and auth flows
- Part 3 — Menu, product inventory & product pages
- Part 4 — Kitchen feed & analytics dashboard
- Migration — move Blade templates into components
- QA & Tests — responsive, accessibility, integration
- Staging deploy → Final review → Production deploy

Location: each part lives under this folder as `part-1`, `part-2`, etc.

Notes:
- Keep commits small and focused per-part.
- Fix only issues relevant to the current part to avoid cascading errors.
