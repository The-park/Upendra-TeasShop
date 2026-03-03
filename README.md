# TeaShop Restaurant Management System
 
A comprehensive restaurant management system built with Laravel 11, featuring admin panel, order management, QR code integration, and customer-facing menu interface.

## 🌟 Features

### Admin Panel
- **Dashboard**: Real-time analytics and key metrics
- **Product Management**: CRUD operations for menu items with image upload
- **Category Management**: Organize menu items by categories
- **Table Management**: QR code generation and table assignment
- **Order Management**: Live order tracking and status updates
- **Reports & Analytics**: Sales reports, product performance, revenue tracking
- **User Management**: Role-based access control

### Customer Interface
- **Digital Menu**: Beautiful, responsive menu display
- **QR Code Scanning**: Scan table QR codes for seamless ordering
- **Shopping Cart**: Add/remove items with real-time totals
- **Order Placement**: Simple checkout process with multiple payment options
- **Order Tracking**: Real-time order status updates

### Technical Features
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Real-time Updates**: Live order status and kitchen display
- **Image Management**: Secure file upload and storage
- **Database Optimization**: Efficient queries and relationships
- **Security**: CSRF protection, authentication, and authorization
- **Testing**: Comprehensive feature and unit tests
- **Deployment Ready**: Docker configuration and deployment scripts

## 📋 Requirements

- PHP 8.1 or higher
- MySQL 8.0 or higher
- Composer
- Node.js & NPM
- Web server (Apache/Nginx)

## 🚀 Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/teashop-application.git
   cd teashop-application
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   Update `.env` with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=teashop
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Create storage symlink**
   ```bash
   php artisan storage:link
   ```

8. **Build frontend assets**
   ```bash
   npm run dev
   ```

9. **Start development server**
   ```bash
   php artisan serve
   ```

### Default Admin Account
- **Email**: admin@teashop.com
- **Password**: admin123

## 🧪 Testing

### Run all tests
```bash
php artisan test
```

### Run specific test suites
```bash
# Feature tests
php artisan test --testsuite=Feature

# Unit tests
php artisan test --testsuite=Unit

# With coverage
php artisan test --coverage
```

## 🎯 Key Features Completed

✅ **Phase 1: Environment Setup** - Laravel 11.x with Bootstrap 5.3.2  
✅ **Phase 2: Database & Models** - Complete schema with relationships  
✅ **Phase 3: Authentication** - Role-based access with middleware  
✅ **Phase 4: Product Management** - Full CRUD with image upload  
✅ **Phase 5: Category Management** - Hierarchical organization  
✅ **Phase 6: Table & QR Management** - QR code generation & scanning  
✅ **Phase 7: Order Management** - Live tracking and status updates  
✅ **Phase 8: Reports & Analytics** - Sales insights and performance metrics  
✅ **Phase 9: Public Frontend** - Customer menu and ordering interface  
✅ **Phase 10: Testing & Deployment** - Production-ready configuration  

## 🔧 Production Deployment

### Using Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

### Using Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📈 Performance & Security

### Optimizations Applied
- Route and config caching
- Database query optimization
- Image compression and storage
- Redis caching for sessions
- Asset minification and bundling

### Security Features
- CSRF protection
- Input validation and sanitization
- Role-based authentication
- Secure file uploads
- SQL injection prevention

## 🤝 Contributing

This is a complete restaurant management system ready for production use. Feel free to customize and extend based on your specific requirements.

## 📄 License

This project is open-sourced software licensed under the MIT License.

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
