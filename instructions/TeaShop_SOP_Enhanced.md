# TeaShop Web Application - Complete Technical Specification
**Version:** 2.0.0  
**Last Updated:** February 12, 2026  
**Project Type:** Dynamic E-Commerce & Hospitality Management System  
**Framework:** Laravel 11.x (Full Stack - Blade/Bootstrap/jQuery)  
**Database:** MySQL 8.0+

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Technical Stack](#2-technical-stack-specification)
3. [Database Architecture](#3-database-architecture-mysql)
4. [Feature Specifications](#4-feature-specifications)
5. [Admin Panel - Complete Requirements](#5-admin-panel-complete-requirements)
6. [Public Interface - Customer Features](#6-public-interface-customer-features)
7. [Security & Validation Rules](#7-security--validation-rules)
8. [UI/UX Design System](#8-uiux-design-system)
9. [Implementation Roadmap](#9-implementation-roadmap)
10. [API Endpoints](#10-api-endpoints)
11. [Testing Requirements](#11-testing-requirements)

---

## 1. Executive Summary

### Project Overview
TeaShop is a QR-code-based ordering system designed for tea shops and cafes. The application eliminates customer friction by removing the need for app downloads or account creation.

### Key User Flows

**Customer Journey:**
1. Customer scans QR code at table → Lands on menu
2. Browses products by category
3. Adds items to cart (stored in session)
4. Places order (persisted to database with table reference)
5. Views order confirmation with order number

**Admin Journey:**
1. Secure login to admin dashboard
2. Manage products (CRUD with image upload)
3. Manage categories (CRUD)
4. Manage tables & generate QR codes
5. View live orders in kitchen display
6. Update order status (Pending → Preparing → Completed → Served)
7. View analytics and reports

### Core Principles
- **Zero Friction:** No customer authentication required
- **Real-Time Updates:** Live order feed for kitchen staff
- **Mobile-First:** Responsive design for customer phones
- **Admin-Friendly:** Intuitive dashboard for non-technical staff

---

## 2. Technical Stack Specification

### Backend
- **Framework:** Laravel 11.x
- **PHP Version:** 8.2+
- **Authentication:** Laravel Breeze / Sanctum
- **Validation:** Form Requests
- **File Storage:** Laravel Storage (local/S3)
- **Sessions:** Database driver (for scalability)

### Frontend
- **Templating Engine:** Blade
- **CSS Framework:** Bootstrap 5.3.2
- **JavaScript:** jQuery 3.7.0 + Axios
- **Icons:** Bootstrap Icons / Font Awesome
- **Image Processing:** Intervention Image

### Database
- **Primary:** MySQL 8.0+
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci
- **Engine:** InnoDB (for transactions)

### Development Tools
- **Package Manager:** Composer, NPM
- **Build Tool:** Vite
- **Version Control:** Git
- **Local Environment:** Laravel Sail / Homestead

---

## 3. Database Architecture (MySQL)

### 3.1 Complete Schema Definition

#### Table 1: `users`
```sql
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `email_verified_at` TIMESTAMP NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'staff', 'manager') DEFAULT 'staff',
  `is_active` BOOLEAN DEFAULT TRUE,
  `last_login_at` TIMESTAMP NULL,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 2: `categories`
```sql
CREATE TABLE `categories` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) UNIQUE NOT NULL,
  `description` TEXT NULL,
  `image_path` VARCHAR(500) NULL,
  `display_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_active_order` (`is_active`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 3: `products`
```sql
CREATE TABLE `products` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(220) UNIQUE NOT NULL,
  `description` TEXT NULL,
  `short_description` VARCHAR(500) NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `cost_price` DECIMAL(10, 2) NULL COMMENT 'For profit calculation',
  `image_path` VARCHAR(500) NULL,
  `thumbnail_path` VARCHAR(500) NULL,
  `is_available` BOOLEAN DEFAULT TRUE,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `stock_quantity` INT DEFAULT 0 COMMENT 'NULL = unlimited stock',
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE,
  INDEX `idx_category` (`category_id`),
  INDEX `idx_available` (`is_available`),
  INDEX `idx_featured` (`is_featured`),
  FULLTEXT KEY `ft_search` (`name`, `description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 4: `restaurant_tables`
```sql
CREATE TABLE `restaurant_tables` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `table_number` VARCHAR(20) UNIQUE NOT NULL,
  `table_name` VARCHAR(100) NULL COMMENT 'Optional friendly name',
  `qr_code_string` VARCHAR(255) UNIQUE NOT NULL,
  `qr_code_image_path` VARCHAR(500) NULL,
  `seating_capacity` TINYINT DEFAULT 4,
  `location` VARCHAR(100) NULL COMMENT 'Indoor/Outdoor/Patio',
  `status` ENUM('available', 'occupied', 'reserved', 'maintenance') DEFAULT 'available',
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_qr` (`qr_code_string`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 5: `orders`
```sql
CREATE TABLE `orders` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) UNIQUE NOT NULL COMMENT 'Human-readable order number',
  `table_id` BIGINT UNSIGNED NOT NULL,
  `customer_name` VARCHAR(100) NULL COMMENT 'Optional if customer provides',
  `customer_notes` TEXT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `tax_amount` DECIMAL(10, 2) DEFAULT 0.00,
  `discount_amount` DECIMAL(10, 2) DEFAULT 0.00,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled') DEFAULT 'pending',
  `payment_status` ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
  `payment_method` VARCHAR(50) NULL,
  `served_at` TIMESTAMP NULL,
  `cancelled_at` TIMESTAMP NULL,
  `cancellation_reason` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`table_id`) REFERENCES `restaurant_tables`(`id`) ON DELETE RESTRICT,
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_table` (`table_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 6: `order_items`
```sql
CREATE TABLE `order_items` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `product_name` VARCHAR(200) NOT NULL COMMENT 'Snapshot for historical record',
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10, 2) NOT NULL COMMENT 'Price at time of order',
  `subtotal` DECIMAL(10, 2) NOT NULL COMMENT 'quantity * unit_price',
  `special_instructions` TEXT NULL COMMENT 'e.g., "No ice", "Extra sugar"',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT,
  INDEX `idx_order` (`order_id`),
  INDEX `idx_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 7: `settings`
```sql
CREATE TABLE `settings` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) UNIQUE NOT NULL,
  `value` TEXT NULL,
  `type` ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
  `description` VARCHAR(255) NULL,
  `is_public` BOOLEAN DEFAULT FALSE COMMENT 'Can be accessed without auth',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table 8: `sessions` (Laravel Session Driver)
```sql
CREATE TABLE `sessions` (
  `id` VARCHAR(255) PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `payload` LONGTEXT NOT NULL,
  `last_activity` INT NOT NULL,
  INDEX `idx_user` (`user_id`),
  INDEX `idx_last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3.2 Default Seeder Data

#### Settings Seeder
```sql
INSERT INTO `settings` (`key`, `value`, `type`, `description`, `is_public`) VALUES
('shop_name', 'TeaShop Delight', 'string', 'Business name', TRUE),
('shop_open', '1', 'boolean', 'Is shop accepting orders', TRUE),
('tax_rate', '0.10', 'string', 'Tax percentage (10%)', FALSE),
('currency_symbol', '$', 'string', 'Currency symbol', TRUE),
('order_prefix', 'TS', 'string', 'Order number prefix', FALSE),
('min_order_amount', '5.00', 'string', 'Minimum order amount', TRUE),
('auto_print_orders', '1', 'boolean', 'Auto-print new orders', FALSE);
```

---

## 4. Feature Specifications

### 4.1 Table Session Management

#### Mechanism: QR Code → Session Persistence

**QR Code Generation Logic:**
```
QR Code URL Format: https://teashop.com/menu?table={table_id}
QR String: Unique UUID for security (e.g., uuid-v4)
Storage: Generated QR images in public/storage/qr-codes/
```

**Middleware: `EnsureTableSelected`**
```php
// Pseudocode
if (request has 'table' parameter) {
    $table = RestaurantTable::where('qr_code_string', request('table'))->first();
    if ($table && $table->is_active) {
        session(['table_id' => $table->id, 'table_number' => $table->table_number]);
        // Update table status to 'occupied'
    }
}

if (!session('table_id')) {
    redirect to '/scan-required' page;
}
```

**Session Data Structure:**
```php
session()->put([
    'table_id' => 3,
    'table_number' => 'T-03',
    'cart' => [
        ['product_id' => 5, 'quantity' => 2, 'price' => 4.50],
        ['product_id' => 12, 'quantity' => 1, 'price' => 6.00]
    ],
    'cart_updated_at' => Carbon::now()
]);
```

### 4.2 Shopping Cart Logic

**Cart Operations:**
- **Add Item:** Validate product exists & is available, update session
- **Update Quantity:** Min: 1, Max: 20 per item
- **Remove Item:** Unset from session array
- **Clear Cart:** On order placement or timeout (30 min)

**Cart Calculation:**
```php
function calculateCartTotals() {
    $subtotal = array_sum(cart items: quantity * price);
    $tax = $subtotal * setting('tax_rate');
    $total = $subtotal + $tax;
    return compact('subtotal', 'tax', 'total');
}
```

### 4.3 Order Placement Workflow

**Step-by-Step Process:**
1. **Validation:**
   - Session has table_id
   - Cart is not empty
   - All products still available
   - Total >= min_order_amount

2. **Database Transaction:**
   ```php
   DB::beginTransaction();
   try {
       $order = Order::create([...]);
       foreach (session('cart') as $item) {
           OrderItem::create([...]);
       }
       session()->forget('cart');
       DB::commit();
   } catch (\Exception $e) {
       DB::rollBack();
   }
   ```

3. **Order Number Generation:**
   ```
   Format: {PREFIX}-{DATE}-{SEQUENCE}
   Example: TS-20260212-0034
   ```

4. **Post-Order Actions:**
   - Send to kitchen display (WebSocket/Polling)
   - Optional: SMS notification to staff
   - Print receipt (if auto_print enabled)

---

## 5. Admin Panel - Complete Requirements

### 5.1 Product Management

#### 5.1.1 Product List Page (`/admin/products`)

**Features:**
- DataTable with server-side pagination (50 items/page)
- Search: Name, Description (FULLTEXT search)
- Filter: Category, Availability, Featured
- Bulk Actions: Delete, Toggle Availability
- Column Display: Thumbnail, Name, Category, Price, Stock, Status, Actions

**Table UI:**
```
| Image | Product Name      | Category  | Price  | Stock | Available | Featured | Actions      |
|-------|-------------------|-----------|--------|-------|-----------|----------|--------------|
| [img] | Matcha Latte      | Milk Tea  | $4.50  | ∞     | ✓         | ★        | Edit Delete  |
| [img] | Mango Smoothie    | Fruit Tea | $5.00  | 25    | ✓         | -        | Edit Delete  |
```

#### 5.1.2 Add/Edit Product Form

**Form Fields (with Validation):**

**Basic Information:**
- **Product Name** (required, max: 200 chars, unique per category)
- **Category** (required, dropdown from active categories)
- **Short Description** (optional, max: 500 chars, shown in cards)
- **Full Description** (optional, rich text editor / textarea)

**Pricing:**
- **Selling Price** (required, decimal 10,2, min: 0.01, max: 9999.99)
- **Cost Price** (optional, for profit margin calculation)

**Inventory:**
- **Stock Management** (toggle: enabled/disabled)
- **Stock Quantity** (if enabled, integer, min: 0, max: 9999)

**Visibility:**
- **Is Available** (checkbox, default: checked)
- **Is Featured** (checkbox, show on homepage)
- **Display Order** (integer, for custom sorting)

**Image Upload Section:**

##### Primary Image Upload Requirements

**Validation Rules:**
```
File Type: JPEG, PNG, WebP only
Max Size: 2MB (2048 KB)
Dimensions: Min 400x400px, Max 2000x2000px
Aspect Ratio: Square preferred (1:1), Allow up to 4:3
```

**Upload Form HTML:**
```html
<div class="mb-3">
    <label class="form-label">Product Image <span class="text-danger">*</span></label>
    <input type="file" 
           name="product_image" 
           id="productImage" 
           class="form-control" 
           accept="image/jpeg,image/png,image/webp">
    
    <!-- Restriction Display -->
    <div class="form-text">
        <i class="bi bi-info-circle"></i> 
        <strong>Requirements:</strong> JPG, PNG, or WebP | Max 2MB | Min 400x400px | Square format recommended
    </div>
    
    <!-- Image Preview -->
    <div id="imagePreview" class="mt-3" style="display:none;">
        <img src="" alt="Preview" class="img-thumbnail" style="max-width: 200px;">
        <button type="button" class="btn btn-sm btn-danger ms-2" id="removeImage">
            <i class="bi bi-trash"></i> Remove
        </button>
    </div>
</div>
```

**Backend Processing (ProductController):**
```php
// Validation in StoreProductRequest
public function rules() {
    return [
        'product_image' => [
            'required_without:existing_image',
            'image',
            'mimes:jpeg,png,webp',
            'max:2048', // KB
            'dimensions:min_width=400,min_height=400,max_width=2000,max_height=2000'
        ]
    ];
}

// Custom error messages
public function messages() {
    return [
        'product_image.required_without' => 'Please upload a product image.',
        'product_image.image' => 'File must be an image.',
        'product_image.mimes' => 'Only JPG, PNG, and WebP formats allowed.',
        'product_image.max' => 'Image size must not exceed 2MB.',
        'product_image.dimensions' => 'Image must be at least 400x400px and maximum 2000x2000px.'
    ];
}

// Image processing in controller
public function store(StoreProductRequest $request) {
    DB::beginTransaction();
    try {
        if ($request->hasFile('product_image')) {
            // Generate unique filename
            $filename = 'product_' . time() . '_' . uniqid() . '.' . $request->file('product_image')->extension();
            
            // Store original
            $path = $request->file('product_image')->storeAs(
                'products/images',
                $filename,
                'public'
            );
            
            // Create thumbnail (300x300)
            $thumbnailPath = 'products/thumbnails/' . $filename;
            Image::make($request->file('product_image'))
                ->fit(300, 300)
                ->save(storage_path('app/public/' . $thumbnailPath));
            
            // Save paths to product
            $product->image_path = $path;
            $product->thumbnail_path = $thumbnailPath;
        }
        
        $product->save();
        DB::commit();
        
        return redirect()->route('admin.products.index')
                         ->with('success', 'Product created successfully!');
    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['error' => 'Failed to upload image: ' . $e->getMessage()]);
    }
}
```

**Display in Admin Product List:**
```html
<!-- Thumbnail column -->
<td>
    @if($product->thumbnail_path)
        <img src="{{ asset('storage/' . $product->thumbnail_path) }}" 
             alt="{{ $product->name }}"
             class="img-thumbnail"
             style="width: 60px; height: 60px; object-fit: cover;"
             data-bs-toggle="modal"
             data-bs-target="#imageModal{{ $product->id }}">
    @else
        <div class="bg-light d-flex align-items-center justify-content-center" 
             style="width: 60px; height: 60px;">
            <i class="bi bi-image text-muted"></i>
        </div>
    @endif
</td>

<!-- Full image modal (on click) -->
<div class="modal fade" id="imageModal{{ $product->id }}">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ $product->name }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
                <img src="{{ asset('storage/' . $product->image_path) }}" 
                     class="img-fluid"
                     alt="{{ $product->name }}">
            </div>
        </div>
    </div>
</div>
```

**JavaScript for Client-Side Preview:**
```javascript
document.getElementById('productImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    // File size check
    if (file.size > 2 * 1024 * 1024) {
        alert('File size must not exceed 2MB');
        this.value = '';
        return;
    }
    
    // File type check
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and WebP formats allowed');
        this.value = '';
        return;
    }
    
    // Image dimension check
    const img = new Image();
    img.onload = function() {
        if (this.width < 400 || this.height < 400) {
            alert('Image must be at least 400x400 pixels');
            document.getElementById('productImage').value = '';
            return;
        }
        if (this.width > 2000 || this.height > 2000) {
            alert('Image must not exceed 2000x2000 pixels');
            document.getElementById('productImage').value = '';
            return;
        }
        
        // Show preview
        document.getElementById('imagePreview').style.display = 'block';
        document.querySelector('#imagePreview img').src = URL.createObjectURL(file);
    };
    img.src = URL.createObjectURL(file);
});

document.getElementById('removeImage').addEventListener('click', function() {
    document.getElementById('productImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
});
```

#### 5.1.3 Bulk Actions

**Delete Multiple Products:**
- Checkbox selection in table
- "Delete Selected" button
- Confirmation modal: "Delete {count} products?"
- Soft delete or hard delete based on config

**Toggle Availability:**
- Batch update `is_available` status
- Useful for seasonal items or stock-outs

### 5.2 Category Management

#### 5.2.1 Category List (`/admin/categories`)

**Features:**
- Simple table (usually <20 categories)
- Drag-and-drop reordering (for display_order)
- Inline edit for name (AJAX update)
- Toggle active status

**Category Form Fields:**
- Name (required, max: 100 chars)
- Slug (auto-generated from name, editable)
- Description (optional, textarea)
- Category Image (optional, same validation as product image)
- Display Order (integer, for menu organization)
- Is Active (checkbox)

**Image Upload for Categories:**
```
Validation: Same as products (JPEG/PNG/WebP, max 2MB)
Purpose: Category banners or icons
Display: In menu as category headers
```

### 5.3 Table Management

#### 5.3.1 Table List (`/admin/tables`)

**Table Display:**
```
| Table # | Name        | QR Code       | Capacity | Location | Status      | Actions           |
|---------|-------------|---------------|----------|----------|-------------|-------------------|
| T-01    | Window Seat | [QR Preview]  | 2        | Indoor   | Available   | Edit QR Download  |
| T-02    | Corner      | [QR Preview]  | 4        | Indoor   | Occupied    | Edit QR Download  |
| T-03    | Patio-1     | [QR Preview]  | 6        | Outdoor  | Reserved    | Edit QR Download  |
```

**Add/Edit Table Form:**
- Table Number (required, unique, max: 20 chars)
- Table Name (optional, friendly name)
- Seating Capacity (integer, 1-20)
- Location (dropdown: Indoor/Outdoor/Patio/VIP)
- Is Active (checkbox)

**QR Code Generation:**

**Button: "Generate QR Code"**
```php
// Using SimpleSoftwareIO/simple-qrcode package
use SimpleSoftwareIO\QrCode\Facades\QrCode;

// Generate unique QR string
$qrString = Str::uuid()->toString();

// Generate QR code image
$qrCodeImage = QrCode::format('png')
    ->size(500)
    ->margin(2)
    ->errorCorrection('H')
    ->generate(route('menu', ['table' => $qrString]));

// Save to storage
$filename = 'table_' . $table->table_number . '_qr.png';
Storage::disk('public')->put('qr-codes/' . $filename, $qrCodeImage);

// Update table record
$table->update([
    'qr_code_string' => $qrString,
    'qr_code_image_path' => 'qr-codes/' . $filename
]);
```

**Download QR Code Button:**
- Downloads PNG file with table name
- Prints-ready format (8x8 inches @ 300dpi)
- Includes text below QR: "Table {number} - Scan to Order"

### 5.4 Order Management Dashboard

#### 5.4.1 Live Kitchen Display (`/admin/orders/live`)

**Layout: Kanban Board**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  PENDING    │  CONFIRMED  │  PREPARING  │    READY    │
│  (New)      │             │  (Cooking)  │  (Pickup)   │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ Order #1234 │ Order #1230 │ Order #1228 │ Order #1225 │
│ Table T-03  │ Table T-01  │ Table T-05  │ Table T-02  │
│ 2 items     │ 3 items     │ 1 item      │ 4 items     │
│ $15.50      │ $22.00      │ $6.50       │ $31.00      │
│ 2m ago      │ 5m ago      │ 12m ago     │ 18m ago     │
│ [Confirm]   │ [Start]     │ [Complete]  │ [Served]    │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Order Card Details (on click):**
```
ORDER #TS-20260212-0034
Table: T-03
Time: 2:35 PM (3 minutes ago)

Items:
• Matcha Latte (x2) - $9.00
• Mango Smoothie (x1) - $5.00
• Chocolate Cake (x1) - $4.50

Subtotal: $18.50
Tax (10%): $1.85
TOTAL: $20.35

Customer Notes: "Extra ice for smoothie"

[Move to Preparing] [Cancel Order]
```

**Real-Time Updates:**
```javascript
// AJAX Polling (every 10 seconds)
setInterval(function() {
    $.ajax({
        url: '/admin/orders/live-feed',
        method: 'GET',
        success: function(response) {
            // Update each status column
            updateKanbanBoard(response.orders);
            
            // Play sound for new orders
            if (response.new_orders_count > 0) {
                playNotificationSound();
                showBrowserNotification(response.new_orders_count + ' new order(s)');
            }
        }
    });
}, 10000);
```

**Status Transitions:**
```
pending → confirmed (Admin clicks "Confirm")
confirmed → preparing (Chef clicks "Start Cooking")
preparing → ready (Chef clicks "Ready")
ready → served (Waiter clicks "Served")

Any status → cancelled (Admin action with reason)
```

#### 5.4.2 Order History (`/admin/orders/history`)

**Filters:**
- Date Range (Today, Yesterday, Last 7 days, Last 30 days, Custom)
- Table Number (dropdown)
- Status (dropdown: All, Served, Cancelled)
- Payment Status (dropdown: All, Paid, Unpaid)

**Export Options:**
- CSV Export (filtered results)
- PDF Report (daily/weekly/monthly sales)

**Order Details View:**
- Full order breakdown
- Timeline of status changes
- Payment information
- Option to reprint receipt

### 5.5 Analytics & Reports

#### 5.5.1 Dashboard Statistics (`/admin/dashboard`)

**Top Metrics Cards:**
```
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ TODAY'S SALES        │ ORDERS TODAY         │ AVERAGE ORDER        │
│ $1,245.50           │ 47                   │ $26.50              │
│ ↑ 12% from yesterday │ ↑ 3 from yesterday   │ ↓ 2% from yesterday  │
└──────────────────────┴──────────────────────┴──────────────────────┘

┌──────────────────────┬──────────────────────┬──────────────────────┐
│ ACTIVE TABLES        │ TOP SELLING          │ LOW STOCK ALERT      │
│ 8 / 15 occupied      │ Matcha Latte (23x)   │ 3 products           │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

**Sales Chart:**
- Line chart: Last 7 days revenue
- Bar chart: Today's hourly orders
- Pie chart: Revenue by category

**Top Products Table:**
```
| Product Name      | Orders | Revenue  | Profit Margin |
|-------------------|--------|----------|---------------|
| Matcha Latte      | 23     | $103.50  | 65%           |
| Mango Smoothie    | 18     | $90.00   | 58%           |
| Bubble Tea        | 15     | $67.50   | 62%           |
```

### 5.6 Settings & Configuration

#### 5.6.1 General Settings (`/admin/settings`)

**Sections:**

**Business Information:**
- Shop Name
- Contact Email
- Phone Number
- Address
- Business Hours (JSON: {day: {open, close}})

**Ordering Settings:**
- Is Shop Open (toggle, disables ordering when off)
- Minimum Order Amount
- Tax Rate (percentage)
- Service Charge (optional, percentage)
- Accept Cash Payment (toggle)
- Accept Card Payment (toggle)

**Notification Settings:**
- Email Notifications (toggle, admin email for new orders)
- SMS Notifications (Twilio integration)
- Browser Push Notifications (toggle)
- Auto-Print Orders (toggle, requires thermal printer setup)

**Display Settings:**
- Currency Symbol
- Currency Position (Before/After amount)
- Date Format (MM/DD/YYYY, DD/MM/YYYY, etc.)
- Time Format (12h/24h)

---

## 6. Public Interface - Customer Features

### 6.1 Landing Page (`/`)

**Sections:**
1. **Hero Section:**
   - Full-screen image/video of tea shop
   - Tagline: "Scan. Sip. Smile."
   - CTA Button: "Scan QR Code to Order"

2. **About Us:**
   - Brief story (2-3 paragraphs)
   - Mission statement

3. **Featured Products:**
   - 6 product cards (from is_featured = true)
   - Lazy-loaded images

4. **How It Works:**
   ```
   Step 1: Scan QR Code at your table
   Step 2: Browse our menu
   Step 3: Add to cart & order
   Step 4: Enjoy your tea!
   ```

5. **Footer:**
   - Operating hours
   - Social media links
   - Contact information

### 6.2 Menu Page (`/menu`)

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ [Logo]  TeaShop Menu       [Cart Icon] 3 items      │
├─────────────────────────────────────────────────────┤
│ Table: T-03                                          │
├─────────────────────────────────────────────────────┤
│ Categories: [All] [Milk Tea] [Fruit Tea] [Snacks]   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────┐  ┌──────┐  ┌──────┐                      │
│  │ IMG  │  │ IMG  │  │ IMG  │                      │
│  │      │  │      │  │      │                      │
│  │Matcha│  │Mango │  │Thai  │                      │
│  │Latte │  │Smth  │  │Tea   │                      │
│  │$4.50 │  │$5.00 │  │$3.50 │                      │
│  │[Add] │  │[Add] │  │[Add] │                      │
│  └──────┘  └──────┘  └──────┘                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Product Card (Mobile-Optimized):**
```html
<div class="col-6 col-md-4 col-lg-3 mb-3">
    <div class="card product-card h-100">
        <div class="position-relative">
            <img src="{{ asset('storage/' . $product->thumbnail_path) }}" 
                 class="card-img-top" 
                 alt="{{ $product->name }}"
                 loading="lazy">
            @if($product->is_featured)
                <span class="badge bg-warning position-absolute top-0 end-0 m-2">
                    <i class="bi bi-star-fill"></i> Featured
                </span>
            @endif
        </div>
        <div class="card-body p-2">
            <h6 class="card-title mb-1">{{ $product->name }}</h6>
            <p class="card-text small text-muted mb-2">
                {{ Str::limit($product->short_description, 50) }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="h5 mb-0 text-primary">${{ number_format($product->price, 2) }}</span>
                <button class="btn btn-sm btn-primary add-to-cart" 
                        data-id="{{ $product->id }}"
                        data-name="{{ $product->name }}"
                        data-price="{{ $product->price }}">
                    <i class="bi bi-plus-circle"></i> Add
                </button>
            </div>
        </div>
    </div>
</div>
```

**Category Filter (AJAX):**
```javascript
$('.category-filter').on('click', function() {
    const categoryId = $(this).data('category-id');
    
    $.ajax({
        url: '/menu/filter',
        method: 'GET',
        data: { category: categoryId },
        success: function(response) {
            $('#product-grid').html(response.html);
        }
    });
});
```

### 6.3 Shopping Cart

**Floating Cart Button (FAB):**
```html
<div class="cart-fab" id="cartFab">
    <button class="btn btn-primary btn-lg rounded-circle position-relative">
        <i class="bi bi-cart3"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ count(session('cart', [])) }}
        </span>
    </button>
</div>
```

**Cart Modal/Page:**
```
┌─────────────────────────────────────────┐
│ YOUR CART                      [X Close] │
├─────────────────────────────────────────┤
│                                          │
│ Table: T-03                              │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Matcha Latte              $4.50    │  │
│ │ [- 2 +]                   $9.00    │  │
│ │ [Remove]                           │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Mango Smoothie            $5.00    │  │
│ │ [- 1 +]                   $5.00    │  │
│ │ [Remove]                           │  │
│ │ Note: [Extra ice_______]           │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ─────────────────────────────────────   │
│ Subtotal:                     $14.00    │
│ Tax (10%):                    $1.40     │
│ ─────────────────────────────────────   │
│ TOTAL:                        $15.40    │
│                                          │
│ [Continue Shopping] [Place Order]       │
│                                          │
└─────────────────────────────────────────┘
```

**Add to Cart (AJAX):**
```javascript
$('.add-to-cart').on('click', function() {
    const productId = $(this).data('id');
    const productName = $(this).data('name');
    const productPrice = $(this).data('price');
    
    $.ajax({
        url: '/cart/add',
        method: 'POST',
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            product_id: productId,
            quantity: 1
        },
        success: function(response) {
            // Update cart count
            $('#cartCount').text(response.cart_count);
            
            // Show toast notification
            showToast('success', productName + ' added to cart!');
            
            // Optional: Animate FAB
            $('#cartFab').addClass('bounce');
            setTimeout(() => $('#cartFab').removeClass('bounce'), 500);
        },
        error: function(xhr) {
            showToast('error', xhr.responseJSON.message);
        }
    });
});
```

### 6.4 Order Confirmation

**Order Success Page (`/order/{orderNumber}/success`):**
```
┌─────────────────────────────────────────┐
│   ✓ Order Placed Successfully!          │
├─────────────────────────────────────────┤
│                                          │
│ Order Number: TS-20260212-0034          │
│ Table: T-03                              │
│ Time: 2:35 PM                            │
│                                          │
│ Your order has been sent to the kitchen. │
│ We'll bring it to your table shortly!   │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ ORDER SUMMARY                      │  │
│ │                                    │  │
│ │ Matcha Latte (x2)        $9.00    │  │
│ │ Mango Smoothie (x1)      $5.00    │  │
│ │                                    │  │
│ │ Subtotal:                $14.00    │  │
│ │ Tax:                     $1.40     │  │
│ │ Total:                   $15.40    │  │
│ └────────────────────────────────────┘  │
│                                          │
│ [Order Another Round] [View Menu]       │
│                                          │
└─────────────────────────────────────────┘
```

---

## 7. Security & Validation Rules

### 7.1 Input Validation

**Product Validation:**
```php
// App\Http\Requests\StoreProductRequest

public function rules() {
    return [
        'name' => 'required|string|max:200|unique:products,name,' . $this->product?->id,
        'category_id' => 'required|exists:categories,id',
        'description' => 'nullable|string|max:5000',
        'short_description' => 'nullable|string|max:500',
        'price' => 'required|numeric|min:0.01|max:9999.99|regex:/^\d+(\.\d{1,2})?$/',
        'cost_price' => 'nullable|numeric|min:0|max:9999.99',
        'product_image' => [
            'required_without:existing_image',
            'image',
            'mimes:jpeg,png,webp',
            'max:2048',
            'dimensions:min_width=400,min_height=400,max_width=2000,max_height=2000'
        ],
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'stock_quantity' => 'nullable|integer|min:0|max:9999',
        'display_order' => 'nullable|integer|min:0'
    ];
}
```

**Order Validation:**
```php
// App\Http\Requests\PlaceOrderRequest

public function rules() {
    return [
        'items' => 'required|array|min:1',
        'items.*.product_id' => 'required|exists:products,id',
        'items.*.quantity' => 'required|integer|min:1|max:20',
        'customer_name' => 'nullable|string|max:100',
        'customer_notes' => 'nullable|string|max:1000'
    ];
}

public function withValidator($validator) {
    $validator->after(function ($validator) {
        // Validate table session exists
        if (!session('table_id')) {
            $validator->errors()->add('table', 'No table selected. Please scan QR code.');
        }
        
        // Validate min order amount
        $total = $this->calculateTotal();
        $minAmount = setting('min_order_amount', 5.00);
        if ($total < $minAmount) {
            $validator->errors()->add('total', "Minimum order amount is $" . $minAmount);
        }
        
        // Validate shop is open
        if (!setting('shop_open', true)) {
            $validator->errors()->add('shop', 'Shop is currently closed for orders.');
        }
        
        // Validate product availability
        foreach ($this->items as $item) {
            $product = Product::find($item['product_id']);
            if (!$product->is_available) {
                $validator->errors()->add('product_' . $product->id, $product->name . ' is currently unavailable.');
            }
        }
    });
}
```

### 7.2 CSRF Protection

**All Forms Must Include:**
```html
<form method="POST">
    @csrf
    <!-- form fields -->
</form>
```

**AJAX Requests:**
```javascript
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```

### 7.3 SQL Injection Prevention

**Use Eloquent ORM:**
```php
// SAFE - Parameterized query
$products = Product::where('category_id', $categoryId)->get();

// UNSAFE - Never do this
$products = DB::select("SELECT * FROM products WHERE category_id = " . $categoryId);
```

### 7.4 XSS Prevention

**Blade Escaping (Default):**
```blade
{{ $product->name }} <!-- Auto-escaped -->
{!! $product->description !!} <!-- Raw HTML - use with caution -->
```

**Sanitize Rich Text:**
```php
use HTMLPurifier;

$clean = HTMLPurifier::purify($request->description);
```

### 7.5 File Upload Security

**Validation:**
- Whitelist extensions (jpeg, png, webp only)
- Validate MIME type
- Check magic bytes (not just extension)
- Limit file size
- Generate random filenames (prevent overwrite attacks)

**Storage:**
- Store uploads outside webroot if possible
- Use `storage_path('app/public')` with symlink
- Set proper permissions (644 for files, 755 for directories)

### 7.6 Rate Limiting

**Prevent Spam Orders:**
```php
// routes/web.php
Route::post('/order/place', [OrderController::class, 'store'])
    ->middleware('throttle:5,1'); // 5 requests per minute
```

**Admin Login:**
```php
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:3,1'); // 3 attempts per minute
```

### 7.7 Authentication & Authorization

**Middleware Stack:**
```php
// Admin routes
Route::middleware(['auth', 'verified', 'role:admin'])->group(function() {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
    // ... other admin routes
});

// Public routes (no auth needed)
Route::get('/menu', [MenuController::class, 'index']);
```

**Role-Based Access:**
```php
// App\Http\Middleware\CheckRole

public function handle($request, Closure $next, $role) {
    if (!auth()->check() || auth()->user()->role !== $role) {
        abort(403, 'Unauthorized access.');
    }
    return $next($request);
}
```

---

## 8. UI/UX Design System

### 8.1 Color Palette

**Primary Colors:**
```css
:root {
    /* Tea Theme Colors */
    --color-matcha: #6B8E23;         /* Olive Drab Green */
    --color-chai: #D2691E;           /* Chocolate/Cinnamon */
    --color-cream: #FAF9F6;          /* Off-White Background */
    --color-slate: #2F4F4F;          /* Dark Slate Gray Text */
    
    /* Semantic Colors */
    --color-success: #28A745;
    --color-warning: #FFC107;
    --color-danger: #DC3545;
    --color-info: #17A2B8;
    
    /* Neutral Grays */
    --gray-100: #F8F9FA;
    --gray-300: #DEE2E6;
    --gray-500: #6C757D;
    --gray-700: #495057;
    --gray-900: #212529;
}
```

**Bootstrap Override:**
```scss
// Override Bootstrap variables
$primary: #6B8E23;
$secondary: #D2691E;
$body-bg: #FAF9F6;
$body-color: #2F4F4F;

@import "bootstrap/scss/bootstrap";
```

### 8.2 Typography

**Font Stack:**
```css
:root {
    --font-primary: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    --font-heading: 'Playfair Display', Georgia, serif;
    --font-mono: 'Fira Code', 'Courier New', monospace;
}

body {
    font-family: var(--font-primary);
    font-size: 16px;
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
}
```

**Font Sizes:**
```css
.text-xs { font-size: 0.75rem; }   /* 12px */
.text-sm { font-size: 0.875rem; }  /* 14px */
.text-base { font-size: 1rem; }    /* 16px */
.text-lg { font-size: 1.125rem; }  /* 18px */
.text-xl { font-size: 1.25rem; }   /* 20px */
.text-2xl { font-size: 1.5rem; }   /* 24px */
.text-3xl { font-size: 1.875rem; } /* 30px */
.text-4xl { font-size: 2.25rem; }  /* 36px */
```

### 8.3 Spacing System

**Consistent Spacing:**
```css
/* Follows 4px base unit */
.spacing-1 { margin/padding: 4px; }
.spacing-2 { margin/padding: 8px; }
.spacing-3 { margin/padding: 12px; }
.spacing-4 { margin/padding: 16px; }
.spacing-5 { margin/padding: 20px; }
.spacing-6 { margin/padding: 24px; }
.spacing-8 { margin/padding: 32px; }
.spacing-10 { margin/padding: 40px; }
```

### 8.4 Component Library

#### Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">
    <i class="bi bi-plus-circle me-2"></i>Add Product
</button>

<!-- Outline Button -->
<button class="btn btn-outline-primary">View Details</button>

<!-- Icon-only Button -->
<button class="btn btn-sm btn-light">
    <i class="bi bi-pencil"></i>
</button>

<!-- Loading State -->
<button class="btn btn-primary" disabled>
    <span class="spinner-border spinner-border-sm me-2"></span>Processing...
</button>
```

#### Cards
```html
<div class="card shadow-sm">
    <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Dashboard Stats</h5>
    </div>
    <div class="card-body">
        <h2 class="display-4">$1,245.50</h2>
        <p class="text-muted">Today's Revenue</p>
    </div>
</div>
```

#### Badges
```html
<span class="badge bg-success">Available</span>
<span class="badge bg-warning text-dark">Pending</span>
<span class="badge bg-danger">Out of Stock</span>
```

#### Alerts
```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
    <i class="bi bi-check-circle me-2"></i>
    Product created successfully!
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### 8.5 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Extra small devices (phones, <576px) - Default */

/* Small devices (tablets, ≥576px) */
@media (min-width: 576px) { }

/* Medium devices (tablets, ≥768px) */
@media (min-width: 768px) { }

/* Large devices (desktops, ≥992px) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops, ≥1200px) */
@media (min-width: 1200px) { }
```

**Grid Adjustments:**
```html
<!-- Product Grid: 2 cols on mobile, 3 on tablet, 4 on desktop -->
<div class="col-6 col-md-4 col-lg-3">
    <!-- Product Card -->
</div>
```

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Week 1)
**Duration:** 5-7 days

**Day 1-2: Environment Setup**
- [ ] Install Laravel 11.x
- [ ] Configure database (MySQL 8.0)
- [ ] Set up version control (Git)
- [ ] Install Laravel Breeze for authentication
- [ ] Configure `.env` file
- [ ] Set up storage symlink: `php artisan storage:link`

**Day 3-4: Database Schema**
- [ ] Create all 8 migrations
- [ ] Write seeders for:
  - Default admin user
  - 5 sample categories
  - 20 sample products
  - 10 restaurant tables
  - Sample settings
- [ ] Run migrations and seeders
- [ ] Test database relationships

**Day 5-7: Admin Authentication**
- [ ] Set up login/logout routes
- [ ] Create admin layout (`resources/views/layouts/admin.blade.php`)
- [ ] Implement role middleware
- [ ] Create admin dashboard landing page

### Phase 2: Admin Panel - Product Management (Week 2)
**Duration:** 5-7 days

**Day 1-2: Product CRUD**
- [ ] Create `ProductController`
- [ ] Create form requests with validation
- [ ] Build product list view (DataTable)
- [ ] Implement search and filter

**Day 3-4: Image Upload System**
- [ ] Install Intervention Image package
- [ ] Create image upload logic
- [ ] Implement thumbnail generation
- [ ] Add client-side preview
- [ ] Test validation rules

**Day 5: Category Management**
- [ ] Create `CategoryController`
- [ ] Build category CRUD views
- [ ] Implement drag-and-drop ordering

**Day 6-7: Table Management**
- [ ] Create `RestaurantTableController`
- [ ] Install QR code package (`simple-qrcode`)
- [ ] Implement QR generation
- [ ] Create downloadable QR codes

### Phase 3: Public Menu Interface (Week 3)
**Duration:** 5-7 days

**Day 1-2: Landing Page**
- [ ] Create homepage layout
- [ ] Add hero section
- [ ] Display featured products
- [ ] Implement responsive design

**Day 3-4: Menu System**
- [ ] Create menu page
- [ ] Implement category filtering (AJAX)
- [ ] Build product cards
- [ ] Add lazy loading for images

**Day 5-6: Table Session Logic**
- [ ] Create `EnsureTableSelected` middleware
- [ ] Implement QR code scanning flow
- [ ] Test session persistence
- [ ] Create "Scan Required" page

**Day 7: Testing**
- [ ] Test on multiple devices
- [ ] Test with real QR codes
- [ ] Fix responsive issues

### Phase 4: Shopping Cart & Orders (Week 4)
**Duration:** 5-7 days

**Day 1-2: Cart System**
- [ ] Create cart session logic
- [ ] Implement AJAX add to cart
- [ ] Build cart modal/page
- [ ] Add quantity adjustment

**Day 3-4: Order Placement**
- [ ] Create `OrderController`
- [ ] Implement checkout validation
- [ ] Create database transaction logic
- [ ] Generate order numbers

**Day 5: Order Confirmation**
- [ ] Build success page
- [ ] Send notification (optional)
- [ ] Clear cart after order

**Day 6-7: Error Handling**
- [ ] Test edge cases (empty cart, unavailable products)
- [ ] Implement user-friendly error messages
- [ ] Add loading states

### Phase 5: Kitchen Display & Order Management (Week 5)
**Duration:** 5-7 days

**Day 1-3: Live Kitchen Display**
- [ ] Create Kanban board layout
- [ ] Implement AJAX polling
- [ ] Add status update buttons
- [ ] Test real-time updates

**Day 4-5: Order History**
- [ ] Create order history page
- [ ] Implement filters (date, status, table)
- [ ] Add order details modal
- [ ] Create export functionality (CSV/PDF)

**Day 6-7: Notifications**
- [ ] Add browser notifications for new orders
- [ ] Implement sound alerts
- [ ] Test notification permissions

### Phase 6: Analytics & Settings (Week 6)
**Duration:** 3-5 days

**Day 1-2: Dashboard Analytics**
- [ ] Create stats widgets
- [ ] Implement sales charts (Chart.js)
- [ ] Add top products report
- [ ] Show active tables status

**Day 3: Settings Management**
- [ ] Create settings CRUD
- [ ] Build settings form
- [ ] Implement validation

**Day 4-5: Final Testing**
- [ ] End-to-end testing
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization

### Phase 7: Deployment & Polish (Week 7)
**Duration:** 3-5 days

**Day 1-2: Deployment Preparation**
- [ ] Set up production server
- [ ] Configure SSL certificate
- [ ] Set up database backup
- [ ] Configure email service

**Day 3: Launch**
- [ ] Deploy to production
- [ ] Test in production environment
- [ ] Monitor for errors

**Day 4-5: Documentation & Training**
- [ ] Write admin user manual
- [ ] Create video tutorials
- [ ] Train staff on system usage

---

## 10. API Endpoints

### 10.1 Public Routes (No Auth Required)

**Menu & Products:**
```
GET  /                          - Landing page
GET  /menu                      - Menu page (requires table session)
GET  /menu?table={qr_string}    - Menu with table selection
POST /menu/filter               - Filter products by category (AJAX)
GET  /products/{id}             - Product details (modal/page)
```

**Cart Operations:**
```
POST /cart/add                  - Add item to cart
POST /cart/update               - Update item quantity
POST /cart/remove               - Remove item from cart
GET  /cart                      - View cart (modal/page)
POST /cart/clear                - Clear entire cart
```

**Orders:**
```
POST /order/place               - Place order
GET  /order/{orderNumber}/success - Order confirmation page
```

### 10.2 Admin Routes (Auth + Role Required)

**Dashboard:**
```
GET  /admin/dashboard           - Admin homepage with stats
```

**Products:**
```
GET    /admin/products          - List all products (DataTable)
GET    /admin/products/create   - Create product form
POST   /admin/products          - Store new product
GET    /admin/products/{id}/edit - Edit product form
PUT    /admin/products/{id}     - Update product
DELETE /admin/products/{id}     - Delete product
POST   /admin/products/bulk-delete - Delete multiple products
POST   /admin/products/bulk-toggle - Toggle availability
```

**Categories:**
```
GET    /admin/categories        - List all categories
GET    /admin/categories/create - Create category form
POST   /admin/categories        - Store new category
GET    /admin/categories/{id}/edit - Edit category form
PUT    /admin/categories/{id}   - Update category
DELETE /admin/categories/{id}   - Delete category
POST   /admin/categories/reorder - Update display order (drag-drop)
```

**Tables:**
```
GET    /admin/tables            - List all tables
GET    /admin/tables/create     - Create table form
POST   /admin/tables            - Store new table
GET    /admin/tables/{id}/edit  - Edit table form
PUT    /admin/tables/{id}       - Update table
DELETE /admin/tables/{id}       - Delete table
POST   /admin/tables/{id}/generate-qr - Generate QR code
GET    /admin/tables/{id}/download-qr - Download QR image
```

**Orders:**
```
GET    /admin/orders/live       - Live kitchen display
GET    /admin/orders/live-feed  - AJAX endpoint for new orders (JSON)
POST   /admin/orders/{id}/update-status - Change order status
GET    /admin/orders/history    - Order history with filters
GET    /admin/orders/{id}       - Order details
POST   /admin/orders/{id}/cancel - Cancel order
GET    /admin/orders/export     - Export orders (CSV/PDF)
```

**Settings:**
```
GET    /admin/settings          - Settings page
PUT    /admin/settings          - Update settings
```

**Analytics:**
```
GET    /admin/analytics         - Analytics dashboard
GET    /admin/reports/sales     - Sales reports
GET    /admin/reports/products  - Product performance
```

### 10.3 AJAX Response Format

**Standard Success Response:**
```json
{
    "success": true,
    "message": "Product added to cart successfully",
    "data": {
        "cart_count": 3,
        "cart_total": 15.40
    }
}
```

**Standard Error Response:**
```json
{
    "success": false,
    "message": "Product is out of stock",
    "errors": {
        "product_id": ["The selected product is unavailable"]
    }
}
```

**Live Orders Feed Response:**
```json
{
    "success": true,
    "new_orders_count": 2,
    "orders": {
        "pending": [
            {
                "id": 45,
                "order_number": "TS-20260212-0045",
                "table_number": "T-03",
                "total": 15.40,
                "items_count": 3,
                "created_at": "2 minutes ago",
                "items": [...]
            }
        ],
        "confirmed": [...],
        "preparing": [...],
        "ready": [...]
    }
}
```

---

## 11. Testing Requirements

### 11.1 Unit Tests

**Models:**
```php
// tests/Unit/ProductTest.php
public function test_product_belongs_to_category()
public function test_product_price_is_formatted()
public function test_product_availability_scope()
```

**Validation:**
```php
// tests/Unit/ProductValidationTest.php
public function test_product_name_is_required()
public function test_product_price_must_be_positive()
public function test_image_must_be_valid_format()
```

### 11.2 Feature Tests

**Order Flow:**
```php
// tests/Feature/OrderFlowTest.php
public function test_customer_can_place_order()
public function test_order_requires_table_session()
public function test_order_validates_minimum_amount()
public function test_order_creates_order_items()
```

**Admin CRUD:**
```php
// tests/Feature/Admin/ProductManagementTest.php
public function test_admin_can_create_product_with_image()
public function test_admin_can_update_product()
public function test_admin_can_delete_product()
public function test_image_validation_works()
```

### 11.3 Browser Tests (Laravel Dusk)

**Customer Journey:**
```php
// tests/Browser/OrderingTest.php
public function test_full_ordering_flow()
{
    $this->browse(function ($browser) {
        $browser->visit('/menu?table=test-uuid')
                ->assertSee('Menu')
                ->click('@add-to-cart-1')
                ->click('@cart-icon')
                ->assertSee('Your Cart')
                ->click('@place-order')
                ->assertSee('Order Placed Successfully');
    });
}
```

### 11.4 Manual Testing Checklist

**Before Launch:**
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad
- [ ] Test on desktop (Chrome, Firefox, Edge)
- [ ] Test image upload (JPEG, PNG, WebP)
- [ ] Test image upload rejection (wrong format, too large)
- [ ] Test QR code scanning
- [ ] Test order placement
- [ ] Test kitchen display updates
- [ ] Test with slow network (3G simulation)
- [ ] Test with multiple concurrent users
- [ ] Test cart persistence across pages
- [ ] Test session expiration
- [ ] Test SQL injection attempts
- [ ] Test XSS attempts
- [ ] Test CSRF protection

---

## 12. Deployment Checklist

### 12.1 Pre-Deployment

**Environment:**
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Generate new `APP_KEY`
- [ ] Configure production database credentials
- [ ] Set up email service (SendGrid/Mailgun)
- [ ] Configure file storage (local/S3)

**Security:**
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set secure session configuration
- [ ] Configure CORS if needed
- [ ] Set up firewall rules
- [ ] Disable directory listing
- [ ] Set proper file permissions

**Optimization:**
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Run `php artisan view:cache`
- [ ] Compile assets: `npm run build`
- [ ] Enable OPcache
- [ ] Set up Redis for sessions/cache (optional)

### 12.2 Server Requirements

**Minimum:**
- PHP 8.2+
- MySQL 8.0+
- Composer
- Node.js & NPM
- Apache/Nginx
- 1GB RAM (minimum)
- 10GB disk space

**Recommended:**
- 2GB+ RAM
- SSD storage
- Redis for caching
- Supervisor for queue workers

### 12.3 Post-Deployment

**Monitoring:**
- [ ] Set up error logging (Sentry/Bugsnag)
- [ ] Configure uptime monitoring
- [ ] Set up database backups (daily)
- [ ] Monitor disk space usage
- [ ] Track response times

**Maintenance:**
- [ ] Schedule database backups
- [ ] Schedule log rotation
- [ ] Plan for regular updates
- [ ] Document admin procedures

---

## 13. Future Enhancements

**Phase 2 Features (Post-Launch):**
1. **Customer Accounts:**
   - Order history
   - Favorite items
   - Loyalty points

2. **Payment Integration:**
   - Stripe/PayPal checkout
   - In-app payment

3. **Advanced Analytics:**
   - Profit margins per product
   - Peak hours analysis
   - Customer behavior tracking

4. **Multi-Language Support:**
   - English, Spanish, etc.
   - RTL support for Arabic

5. **Inventory Management:**
   - Stock alerts
   - Supplier management
   - Purchase orders

6. **Staff Management:**
   - Shift scheduling
   - Performance tracking
   - Permissions system

7. **Marketing Features:**
   - Discount codes
   - Seasonal promotions
   - Email newsletters

---

## Document History

| Version | Date       | Changes                                          | Author         |
|---------|------------|--------------------------------------------------|----------------|
| 1.0.0   | 2026-02-12 | Initial draft                                    | System Architect |
| 2.0.0   | 2026-02-12 | Enhanced with MySQL specs and admin requirements | System Architect |

---

**End of Document**

For questions or clarifications, please contact the development team.
