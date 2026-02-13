<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'TeaShop') }} - @yield('title', 'Welcome')</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <!-- Navigation for public site -->
    <nav class="navbar navbar-expand-lg navbar-light bg-cream shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold text-primary" href="{{ route('home') }}">
                <i class="bi bi-cup-hot me-2"></i>{{ setting('shop_name', 'TeaShop') }}
            </a>
            
            @if(request()->routeIs('menu*'))
            <div class="ms-auto">
                <button class="btn btn-primary position-relative" onclick="$('#cartModal').modal('show')">
                    <i class="bi bi-cart3 me-2"></i>Cart
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-count">
                        0
                    </span>
                </button>
            </div>
            @endif
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        @yield('content')
    </main>

    <!-- Cart Modal for Menu Page -->
    @if(request()->routeIs('menu*'))
    <div class="modal fade" id="cartModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Your Cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="cartContent">
                    <!-- Cart items loaded via AJAX -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
                    <button type="button" class="btn btn-primary" onclick="placeOrder()">Place Order</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Cart Button -->
    <div class="cart-fab" id="cartFab">
        <button class="btn btn-primary btn-lg rounded-circle position-relative" onclick="$('#cartModal').modal('show')">
            <i class="bi bi-cart3"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-count">
                0
            </span>
        </button>
    </div>
    @endif

    <!-- Footer -->
    <footer class="bg-primary text-white py-5 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5 class="fw-bold mb-3">{{ setting('shop_name', 'TeaShop') }}</h5>
                    <p class="mb-3">Quality teas and exceptional service since 2024.</p>
                </div>
                <div class="col-md-4">
                    <h6 class="fw-bold mb-3">Contact Info</h6>
                    <p class="mb-1">
                        <i class="bi bi-envelope me-2"></i>{{ setting('contact_email', 'info@teashop.com') }}
                    </p>
                    <p class="mb-1">
                        <i class="bi bi-telephone me-2"></i>{{ setting('contact_phone', '+1-555-123-4567') }}
                    </p>
                </div>
                <div class="col-md-4">
                    <h6 class="fw-bold mb-3">Hours</h6>
                    <p class="mb-1">Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p class="mb-1">Saturday - Sunday: 9:00 AM - 9:00 PM</p>
                </div>
            </div>
            <hr class="my-4">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0">&copy; {{ date('Y') }} {{ setting('shop_name', 'TeaShop') }}. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-end">
                    @auth
                    <a href="{{ route('admin.dashboard') }}" class="btn btn-outline-light btn-sm">
                        <i class="bi bi-gear me-1"></i>Admin Panel
                    </a>
                    @endauth
                </div>
            </div>
        </div>
    </footer>

    <!-- Additional Scripts -->
    @stack('scripts')
</body>
</html>