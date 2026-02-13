<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RestaurantTableController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', function () {
    return redirect()->route('menu');
})->name('home');

// Test admin login (temporary)
Route::get('/test-admin-login', function () {
    $user = App\Models\User::where('email', 'admin@teashop.com')->first();
    if ($user) { 
        Auth::login($user);
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('login')->with('error', 'Admin user not found');
})->name('test.admin.login');

// Public Menu Routes  
Route::get('/menu', [MenuController::class, 'index'])->name('menu');
Route::get('/public/menu', [MenuController::class, 'index'])->name('public.menu');
Route::post('/menu/filter', [MenuController::class, 'filter'])->name('menu.filter');

// Public checkout routes
Route::get('/checkout', [OrderController::class, 'checkout'])->name('public.checkout');
Route::post('/select-table', [OrderController::class, 'selectTable'])->name('public.select-table');

// Cart Routes (Session-based, no auth required)
Route::prefix('cart')->name('cart.')->group(function () {
    Route::post('add', [CartController::class, 'add'])->name('add');
    Route::post('update', [CartController::class, 'update'])->name('update');
    Route::post('remove', [CartController::class, 'remove'])->name('remove');
    Route::post('clear', [CartController::class, 'clear'])->name('clear');
    Route::get('/', [CartController::class, 'index'])->name('index');
});

// Order Routes
Route::prefix('order')->name('order.')->group(function () {
    Route::post('place', [OrderController::class, 'place'])->name('place');
    Route::get('{orderNumber}/success', [OrderController::class, 'success'])->name('success');
});

// Public order placement (alias)
Route::post('/place-order', [OrderController::class, 'place'])->name('public.place-order');

// Public order status
Route::get('/order/{orderNumber}/status', [OrderController::class, 'getStatus'])->name('public.order.status');

// Auth Routes (Breeze provides these)
require __DIR__.'/auth.php';

// Backwards-compatible dashboard route used by Breeze/stubs
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes (Protected by authentication and role)
Route::middleware(['auth', 'verified', 'role:admin,manager'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Categories Management
    Route::resource('categories', CategoryController::class);
    Route::post('categories/reorder', [CategoryController::class, 'reorder'])->name('categories.reorder');
    
    // Products Management
    Route::resource('products', ProductController::class);
    Route::post('products/bulk-delete', [ProductController::class, 'bulkDelete'])->name('products.bulk-delete');
    Route::post('products/bulk-toggle', [ProductController::class, 'bulkToggle'])->name('products.bulk-toggle');
    
    // Tables Management
    Route::resource('tables', RestaurantTableController::class);
    Route::post('tables/{table}/generate-qr', [RestaurantTableController::class, 'generateQr'])->name('tables.generate-qr');
    Route::get('tables/{table}/download-qr', [RestaurantTableController::class, 'downloadQr'])->name('tables.download-qr');
    Route::get('tables/{table}/download-qr-pdf', [RestaurantTableController::class, 'downloadQrPdf'])->name('tables.download-qr-pdf');
    
    // Orders Management
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('live', [OrderController::class, 'liveDisplay'])->name('live');
        Route::get('live-feed', [OrderController::class, 'liveFeed'])->name('live-feed');
        Route::post('{order}/update-status', [OrderController::class, 'updateStatus'])->name('update-status');
        Route::get('history', [OrderController::class, 'history'])->name('history');
        Route::get('{order}', [OrderController::class, 'show'])->name('show');
        Route::post('{order}/cancel', [OrderController::class, 'cancel'])->name('cancel');
        Route::get('export', [OrderController::class, 'export'])->name('export');
    });
    
    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
    
    // Analytics & Reports
    Route::prefix('analytics')->name('analytics.')->group(function () {
        Route::get('/', [AdminController::class, 'analytics'])->name('index');
        Route::get('sales', [AdminController::class, 'salesReport'])->name('sales');
        Route::get('products', [AdminController::class, 'productReport'])->name('products');
    });
});

// Profile Routes (from Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});