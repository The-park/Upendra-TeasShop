#!/bin/bash

# TeaShop Application Deployment Script
# This script automates the deployment process for production

set -e  # Exit on any error

echo "🚀 Starting TeaShop Application Deployment..."

# Configuration
APP_DIR="/var/www/teashop"
REPO_URL="https://github.com/yourusername/teashop-application.git"
BACKUP_DIR="/var/backups/teashop"
PHP_VERSION="8.2"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_status() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if script is run as root
if [[ $EUID -eq 0 ]]; then
   echo "This script should not be run as root for security reasons"
   exit 1
fi

# Step 1: Create backup
print_status "Creating backup..."
if [ -d "$APP_DIR" ]; then
    sudo mkdir -p "$BACKUP_DIR"
    BACKUP_FILE="$BACKUP_DIR/teashop-$(date +%Y%m%d-%H%M%S).tar.gz"
    sudo tar -czf "$BACKUP_FILE" -C "$(dirname $APP_DIR)" "$(basename $APP_DIR)"
    print_success "Backup created: $BACKUP_FILE"
else
    print_warning "No existing application found to backup"
fi

# Step 2: Clone or update repository
print_status "Updating application code..."
if [ ! -d "$APP_DIR" ]; then
    sudo git clone "$REPO_URL" "$APP_DIR"
    print_success "Repository cloned"
else
    cd "$APP_DIR"
    sudo git fetch origin
    sudo git reset --hard origin/main
    print_success "Repository updated"
fi

# Step 3: Set proper permissions
print_status "Setting file permissions..."
cd "$APP_DIR"
sudo chown -R www-data:www-data .
sudo chmod -R 755 .
sudo chmod -R 775 storage bootstrap/cache
print_success "Permissions set"

# Step 4: Install Composer dependencies
print_status "Installing Composer dependencies..."
sudo -u www-data composer install --no-dev --optimize-autoloader
print_success "Composer dependencies installed"

# Step 5: Install Node.js dependencies and build assets
print_status "Building frontend assets..."
sudo -u www-data npm ci
sudo -u www-data npm run build
print_success "Assets built successfully"

# Step 6: Environment configuration
print_status "Configuring environment..."
if [ ! -f ".env" ]; then
    sudo -u www-data cp .env.production .env
    print_warning "Created .env from .env.production template"
    print_warning "Please configure .env with your production settings"
fi

# Generate application key if not set
if grep -q "APP_KEY=base64:GENERATE_NEW_KEY_IN_PRODUCTION" .env; then
    sudo -u www-data php artisan key:generate
    print_success "Application key generated"
fi

# Step 7: Database operations
print_status "Running database migrations..."
sudo -u www-data php artisan migrate --force
print_success "Database migrations completed"

# Step 8: Cache optimization
print_status "Optimizing application caches..."
sudo -u www-data php artisan config:cache
sudo -u www-data php artisan route:cache
sudo -u www-data php artisan view:cache
sudo -u www-data php artisan event:cache
print_success "Caches optimized"

# Step 9: Storage link
print_status "Creating storage symlink..."
if [ ! -L "public/storage" ]; then
    sudo -u www-data php artisan storage:link
    print_success "Storage symlink created"
else
    print_success "Storage symlink already exists"
fi

# Step 10: Queue workers (if using queues)
print_status "Restarting queue workers..."
sudo -u www-data php artisan queue:restart
print_success "Queue workers restarted"

# Step 11: Verify installation
print_status "Verifying installation..."
if sudo -u www-data php artisan --version > /dev/null 2>&1; then
    print_success "Laravel application is responding"
else
    print_error "Laravel application verification failed"
    exit 1
fi

# Step 12: Restart web server
print_status "Restarting web server..."
if command -v nginx > /dev/null; then
    sudo systemctl reload nginx
    print_success "Nginx reloaded"
fi

if command -v apache2 > /dev/null; then
    sudo systemctl reload apache2
    print_success "Apache reloaded"
fi

# Step 13: Restart PHP-FPM
print_status "Restarting PHP-FPM..."
sudo systemctl restart php$PHP_VERSION-fpm
print_success "PHP-FPM restarted"

echo
print_success "🎉 Deployment completed successfully!"
echo
echo "Application URL: $(grep APP_URL .env | cut -d '=' -f2)"
echo "Backup location: $BACKUP_FILE"
echo
print_warning "Remember to:"
echo "1. Test the application thoroughly"
echo "2. Monitor logs for any errors"
echo "3. Update DNS if this is a new deployment"
echo "4. Configure SSL certificates if needed"
echo