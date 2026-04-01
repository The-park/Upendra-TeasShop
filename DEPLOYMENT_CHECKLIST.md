# Deployment Checklist for Upendra-TeasShop

## Before Uploading to Server

### 1. Build Vite Assets (Required for CSS/JS)
```bash
# Install dependencies if needed
npm install

# Build production assets
npm run build
```
This creates optimized files in `public/build/` directory.

### 2. Verify Files to Upload
Ensure these directories/files are ready:
- ✅ `public/js/games/stack-ball/` (all game JS files)
- ✅ `public/build/` (compiled Vite assets)
- ✅ `resources/views/` (Blade templates)
- ✅ `app/` (PHP application code)
- ✅ `routes/` (route files)
- ✅ `config/` (configuration files)

### 3. Files to EXCLUDE (Don't upload)
- ❌ `node_modules/`
- ❌ `.git/`
- ❌ `.env` (never upload - set on server separately)
- ❌ `storage/` (except ensure storage structure exists)
- ❌ `vendor/` (run composer on server instead)

## After Uploading to Server

### 1. Install Composer Dependencies
```bash
cd /home/taurius/teashop.byteperday.com
composer install --no-dev --optimize-autoloader
```

### 2. Clear All Laravel Caches
```bash
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:clear
php artisan optimize:clear
```

### 3. Set Correct Permissions
```bash
chmod -R 755 storage bootstrap/cache
chmod -R 755 public
```

### 4. Restart PHP/Apache (if possible)
```bash
# Via terminal (if SSH access):
sudo systemctl restart httpd
# OR via cPanel: PHP Version Selector → Restart
```

### 5. Clear OPcache
If you have access to PHP admin panel or can create a PHP file:

Create `public/clear-cache.php`:
```php
<?php
if (function_exists('opcache_reset')) {
    opcache_reset();
    echo "OPcache cleared!";
} else {
    echo "OPcache not available";
}
?>
```

Visit `https://teashop.byteperday.com/clear-cache.php`
Then DELETE the file immediately for security.

### 6. Clear Browser Cache
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or test in incognito/private window
- Or clear browser cache completely

### 7. Clear CDN Cache (if using Cloudflare/CDN)
- Go to Cloudflare Dashboard → Caching → Purge Everything
- Or whatever CDN you're using

## Verify Deployment

### Check these URLs work:
- `https://teashop.byteperday.com/` (homepage)
- `https://teashop.byteperday.com/js/games/stack-ball/main.js` (game loads)
- Order status page with game visible

### Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| 500 Error | Check `.env` file, run `composer install`, check permissions |
| Old design shows | Clear all caches (Laravel + browser + server) |
| Game not loading | Check `public/js/games/stack-ball/` files uploaded |
| Styles broken | Ensure `public/build/` directory uploaded with manifest.json |
| Mixed content error | Ensure all assets use HTTPS, not HTTP |

## For Future Deployments

### Option A: Manual Deployment (Current Method)
1. `npm run build` locally
2. Upload via FTP/cPanel
3. Run cache clear commands on server

### Option B: Automated via GitHub Actions (Recommended)
Update `.github/workflows/deploy.yml`:
```yaml
# Add these steps before "Copy files via SSH"
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'

- name: Install NPM Dependencies
  run: npm ci

- name: Build Vite Assets
  run: npm run build

# After copying files, add:
- name: Clear Laravel Caches
  uses: appleboy/ssh-action@v0.1.10
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.SSH_USERNAME }}
    password: ${{ secrets.PASSWORD }}
    port: ${{ secrets.PORT }}
    script: |
      cd /home/taurius/teashop.byteperday.com
      php artisan cache:clear
      php artisan view:clear
      php artisan route:clear
      php artisan config:clear
```
