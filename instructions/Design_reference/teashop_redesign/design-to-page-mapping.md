Design → Page Mapping
----------------------

This file maps the attached Stitch design files to the site pages and suggested implementation targets.

- `stitch_teashop_product_inventory/teashop_product_inventory/code.html`  → Menu / Product Inventory page (resources/views/menu or resources/views/products)
- `matcha_heaven_landing_page/code.html`  → Landing page (resources/views/welcome.blade.php)
- `matcha_heaven_login_desktop/code.html` → Auth views (resources/views/auth/login.blade.php, register.blade.php)
- `matcha_heaven_kitchen_feed/code.html`  → Kitchen feed (resources/views/kitchen/feed.blade.php)
- `matcha_heaven_analytics_dashboard/code.html` → Analytics dashboard (resources/views/admin/dashboard.blade.php)
- `matcha_heaven_menu/code.html` → Menu listing and product detail templates

Recommendation: implement UI as Blade components under `resources/views/components/redesign/*` then gradually replace includes in layouts.
