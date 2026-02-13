<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'TeaShop') }} - @yield('title', 'Admin Dashboard')</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- Scripts -->
    <!-- Load jQuery before app scripts so inline/admin scripts depending on $ work -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" crossorigin="anonymous"></script>
    <script>window.$ = window.jQuery = window.$ || window.jQuery || jQuery;</script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="{{ route('admin.dashboard') }}">
                <i class="bi bi-cup-hot me-2"></i>{{ setting('shop_name', 'TeaShop') }} Admin
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}">
                            <i class="bi bi-speedometer2 me-1"></i>Dashboard
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle {{ request()->routeIs('admin.categories.*', 'admin.products.*') ? 'active' : '' }}" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-box-seam me-1"></i>Products
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ route('admin.categories.index') }}">Categories</a></li>
                            <li><a class="dropdown-item" href="{{ route('admin.products.index') }}">Products</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.tables.*') ? 'active' : '' }}" href="{{ route('admin.tables.index') }}">
                            <i class="bi bi-table me-1"></i>Tables
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-receipt me-1"></i>Orders
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ route('admin.orders.live') }}">Live Kitchen Display</a></li>
                            <li><a class="dropdown-item" href="{{ route('admin.orders.history') }}">Order History</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.analytics.*') ? 'active' : '' }}" href="{{ route('admin.analytics.index') }}">
                            <i class="bi bi-graph-up me-1"></i>Analytics
                        </a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('admin.settings.*') ? 'active' : '' }}" href="{{ route('admin.settings.index') }}">
                            <i class="bi bi-gear me-1"></i>Settings
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('home') }}" target="_blank">
                            <i class="bi bi-box-arrow-up-right me-1"></i>View Site
                        </a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle me-1"></i>{{ Auth::user()->name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="{{ route('profile.edit') }}">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button class="dropdown-item" type="submit">Logout</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid py-4">
        <!-- Breadcrumb -->
        @hasSection('breadcrumb')
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                @yield('breadcrumb')
            </ol>
        </nav>
        @endif

        <!-- Page Header -->
        @hasSection('header')
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="h3 mb-0">@yield('page-title')</h1>
                @hasSection('page-description')
                <p class="text-muted mb-0">@yield('page-description')</p>
                @endif
            </div>
            <div>
                @yield('page-actions')
            </div>
        </div>
        @endif

        <!-- Flash Messages -->
        @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle me-2"></i>{{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif

        @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-circle me-2"></i>{{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif

        @if($errors->any())
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-circle me-2"></i>
            <ul class="mb-0">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif

        <!-- Main Content -->
        @yield('content')
    </div>

    <!-- Footer -->
    <footer class="bg-white border-top mt-5 py-4">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <p class="text-muted mb-0">&copy; {{ date('Y') }} {{ setting('shop_name', 'TeaShop') }}. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-end">
                    <small class="text-muted">Version 1.0.0</small>
                </div>
            </div>
        </div>
    </footer>

    <!-- Additional Scripts -->
    <!-- Provide a harmless require() fallback in the browser to avoid ReferenceError from UMD/commonjs snippets when modules aren't available -->
    <script>
        if (typeof window.require === 'undefined') {
            window.require = function() { console.warn('require() called in browser - no-op fallback'); };
        }
    </script>
    @stack('scripts')
</body>
</html>