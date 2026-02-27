<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'TeaShop') }} — @yield('title', 'Admin Dashboard')</title>

    <!-- Google Fonts: Inter + Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">

    <!-- jQuery (before Vite bundle so inline scripts using $ work) -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" crossorigin="anonymous"></script>
    <script>window.$ = window.jQuery = jQuery;</script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        /* ───────── CSS Variables ───────── */
        :root {
            --sidebar-w: 260px;
            --sidebar-collapsed-w: 70px;
            --topbar-h: 64px;
            --tea-dark:    #1a3a1a;
            --tea-mid:     #2d5a27;
            --tea-accent:  #4a8c3f;
            --tea-light:   #6db560;
            --tea-pale:    #e8f5e2;
            --tea-gold:    #c8860a;
            --bs-body-bg:  #f0f4f0;
            --card-shadow: 0 2px 12px rgba(0,0,0,.07);
        }

        /* ───────── Base ───────── */
        body { font-family: 'Inter', sans-serif; background: var(--bs-body-bg); overflow-x: hidden; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Poppins', 'Inter', sans-serif; }

        /* ───────── Sidebar ───────── */
        .admin-sidebar {
            position: fixed; left: 0; top: 0; bottom: 0;
            width: var(--sidebar-w);
            background: linear-gradient(180deg, var(--tea-dark) 0%, var(--tea-mid) 60%, var(--tea-accent) 100%);
            z-index: 1040;
            display: flex; flex-direction: column;
            transition: width .3s ease, transform .3s ease;
            box-shadow: 4px 0 20px rgba(0,0,0,.25);
            overflow: hidden;
        }
        .admin-sidebar.collapsed { width: var(--sidebar-collapsed-w); }
        .admin-sidebar .sidebar-brand {
            display: flex; align-items: center; gap: 12px;
            padding: 20px 18px; border-bottom: 1px solid rgba(255,255,255,.1);
            text-decoration: none; overflow: hidden; white-space: nowrap;
        }
        .admin-sidebar .sidebar-brand .brand-icon {
            width: 38px; height: 38px; flex-shrink: 0;
            background: rgba(255,255,255,.15); border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 20px; color: #fff;
        }
        .admin-sidebar .sidebar-brand .brand-text { color: #fff; }
        .admin-sidebar .sidebar-brand .brand-text .shop-name {
            font-family: 'Poppins', sans-serif; font-weight: 700;
            font-size: 18px; line-height: 1.1; display: block;
        }
        .admin-sidebar .sidebar-brand .brand-text .shop-sub {
            font-size: 11px; opacity: .6; letter-spacing: .5px; text-transform: uppercase;
        }
        .sidebar-nav { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 14px 0; }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 4px; }
        .sidebar-section-label {
            font-size: 10px; font-weight: 600; letter-spacing: 1.2px;
            text-transform: uppercase; color: rgba(255,255,255,.4);
            padding: 16px 20px 6px; overflow: hidden; white-space: nowrap;
        }
        .admin-sidebar.collapsed .sidebar-section-label { visibility: hidden; }
        /* Hide text labels and arrows when sidebar is collapsed */
        .admin-sidebar .sidebar-brand .brand-text,
        .admin-sidebar .nav-link > span,
        .admin-sidebar .nav-link .nav-collapse-arrow,
        .admin-sidebar .sidebar-user .user-info,
        .admin-sidebar .sidebar-user > .bi-three-dots-vertical {
            transition: opacity .2s ease, width .3s ease;
            opacity: 1;
        }
        .admin-sidebar.collapsed .sidebar-brand .brand-text,
        .admin-sidebar.collapsed .nav-link > span,
        .admin-sidebar.collapsed .nav-link .nav-collapse-arrow,
        .admin-sidebar.collapsed .sidebar-user .user-info,
        .admin-sidebar.collapsed .sidebar-user > .bi-three-dots-vertical {
            opacity: 0;
            pointer-events: none;
        }
        /* Keep collapsed submenu items hidden */
        .admin-sidebar.collapsed .sidebar-submenu { display: none !important; }
        .sidebar-nav .nav-link {
            display: flex; align-items: center; gap: 12px;
            padding: 10px 18px; color: rgba(255,255,255,.75);
            font-size: 14px; font-weight: 500; border-radius: 0;
            transition: all .2s; white-space: nowrap; overflow: hidden;
            position: relative; border-left: 3px solid transparent;
        }
        .sidebar-nav .nav-link .nav-icon {
            font-size: 18px; flex-shrink: 0; width: 28px; text-align: center;
        }
        .sidebar-nav .nav-link:hover {
            background: rgba(255,255,255,.1); color: #fff;
            border-left-color: rgba(255,255,255,.3);
        }
        .sidebar-nav .nav-link.active {
            background: rgba(255,255,255,.15); color: #fff;
            border-left-color: #b5e7a0; font-weight: 600;
        }
        .sidebar-nav .nav-link.active .nav-icon { color: #b5e7a0; }
        /* Submenu */
        .sidebar-submenu { background: rgba(0,0,0,.15); overflow: hidden; }
        .sidebar-submenu .nav-link {
            padding: 8px 18px 8px 56px; font-size: 13px; border-left: none;
        }
        .sidebar-submenu .nav-link.active { background: rgba(255,255,255,.12); }
        .sidebar-submenu .nav-link::before {
            content: ''; width: 5px; height: 5px; border-radius: 50%;
            background: rgba(255,255,255,.4); flex-shrink: 0; margin-right: 2px;
        }
        .sidebar-submenu .nav-link.active::before { background: #b5e7a0; }
        /* Collapse toggle arrow */
        .nav-collapse-arrow {
            margin-left: auto; font-size: 12px; transition: transform .25s;
        }
        [aria-expanded="true"] .nav-collapse-arrow { transform: rotate(180deg); }
        /* Sidebar footer */
        .sidebar-footer {
            padding: 14px 14px 16px; border-top: 1px solid rgba(255,255,255,.1);
            white-space: nowrap; overflow: hidden;
        }
        .sidebar-user {
            display: flex; align-items: center; gap: 10px;
            padding: 10px 8px; border-radius: 10px;
            background: rgba(255,255,255,.08); text-decoration: none;
            transition: background .2s;
        }
        .sidebar-user:hover { background: rgba(255,255,255,.14); }
        .sidebar-user .user-avatar {
            width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
            background: linear-gradient(135deg, #b5e7a0, #6db560);
            display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: 14px; color: var(--tea-dark);
        }
        .sidebar-user .user-info .user-name {
            font-size: 13px; font-weight: 600; color: #fff; display: block; line-height: 1.2;
        }
        .sidebar-user .user-info .user-role {
            font-size: 11px; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .4px;
        }

        /* ───────── Main wrapper ───────── */
        .admin-main {
            margin-left: var(--sidebar-w);
            transition: margin-left .3s ease;
            min-height: 100vh; display: flex; flex-direction: column;
        }
        .admin-main.expanded { margin-left: var(--sidebar-collapsed-w); }

        /* ───────── Topbar ───────── */
        .admin-topbar {
            position: sticky; top: 0; z-index: 1030;
            height: var(--topbar-h);
            background: #fff;
            display: flex; align-items: center;
            padding: 0 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,.06);
            gap: 16px;
        }
        .topbar-toggle-btn {
            width: 36px; height: 36px; border: none; background: none;
            border-radius: 8px; color: #666; font-size: 20px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: background .2s;
        }
        .topbar-toggle-btn:hover { background: var(--tea-pale); color: var(--tea-accent); }
        .topbar-breadcrumb { flex: 1; }
        .topbar-breadcrumb .breadcrumb {
            margin: 0; font-size: 13px;
        }
        .topbar-breadcrumb .breadcrumb-item a { color: var(--tea-accent); text-decoration: none; }
        .topbar-breadcrumb .breadcrumb-item.active { color: #444; font-weight: 500; }
        .topbar-actions { display: flex; align-items: center; gap: 8px; }
        .topbar-icon-btn {
            width: 36px; height: 36px; border: none;
            background: none; border-radius: 8px; color: #666;
            font-size: 18px; display: flex; align-items: center;
            justify-content: center; cursor: pointer; transition: all .2s;
            position: relative;
        }
        .topbar-icon-btn:hover { background: var(--tea-pale); color: var(--tea-accent); }
        .topbar-badge {
            position: absolute; top: 4px; right: 4px;
            width: 8px; height: 8px; border-radius: 50%;
            background: #e53935; border: 2px solid #fff;
        }
        .topbar-divider { width: 1px; height: 28px; background: #e0e0e0; margin: 0 4px; }
        .topbar-user-btn {
            display: flex; align-items: center; gap: 8px;
            padding: 5px 10px; border: none; background: none;
            border-radius: 8px; cursor: pointer;
            transition: background .2s;
        }
        .topbar-user-btn:hover { background: var(--tea-pale); }
        .topbar-user-avatar {
            width: 34px; height: 34px; border-radius: 50%;
            background: linear-gradient(135deg, var(--tea-accent), var(--tea-light));
            display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: 13px; color: #fff;
        }
        .topbar-user-name { font-size: 14px; font-weight: 600; color: #333; }

        /* ───────── Page Content ───────── */
        .admin-content {
            flex: 1; padding: 28px 28px 20px;
        }
        .page-header-bar {
            display: flex; align-items: flex-start;
            justify-content: space-between; gap: 16px;
            margin-bottom: 24px;
        }
        .page-title-group .page-title {
            font-size: 22px; font-weight: 700; color: #1a2e1a; margin: 0 0 2px;
        }
        .page-title-group .page-subtitle {
            font-size: 13px; color: #666; margin: 0;
        }

        /* ───────── Cards ───────── */
        .card {
            border: none; border-radius: 14px;
            box-shadow: var(--card-shadow);
        }
        .card-header {
            background: #fff; border-bottom: 1px solid #edf2ed;
            border-radius: 14px 14px 0 0 !important;
            padding: 16px 20px;
        }
        .card-body { padding: 20px; }
        .card-footer {
            background: #fafcfa; border-top: 1px solid #edf2ed;
            border-radius: 0 0 14px 14px !important; padding: 14px 20px;
        }

        /* ───────── Stat Cards ───────── */
        .stat-card {
            border-radius: 14px; padding: 20px;
            color: #fff; position: relative; overflow: hidden;
        }
        .stat-card::after {
            content: ''; position: absolute;
            width: 120px; height: 120px; border-radius: 50%;
            background: rgba(255,255,255,.07);
            bottom: -30px; right: -20px;
        }
        .stat-card .stat-icon {
            font-size: 36px; opacity: .25;
        }
        .stat-card .stat-value { font-size: 26px; font-weight: 700; line-height: 1; }
        .stat-card .stat-label { font-size: 12px; opacity: .8; text-transform: uppercase; letter-spacing: .6px; }
        .stat-card .stat-delta { font-size: 12px; margin-top: 8px; opacity: .85; }
        .stat-card-green  { background: linear-gradient(135deg, #2d5a27, #4a8c3f); }
        .stat-card-brown  { background: linear-gradient(135deg, #6d3a14, #ba6b38); }
        .stat-card-teal   { background: linear-gradient(135deg, #0e6251, #1abc9c); }
        .stat-card-gold   { background: linear-gradient(135deg, #7d5e00, #c8860a); }

        /* ───────── Tables ───────── */
        .table { font-size: 14px; }
        .table thead th {
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            letter-spacing: .6px; color: #666; background: #f7faf7;
            border-bottom: 2px solid #e8f0e8; padding: 12px 14px;
        }
        .table td { padding: 12px 14px; vertical-align: middle; }
        .table-hover tbody tr:hover { background: #f7fbf7; }

        /* ───────── Badges ───────── */
        .badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; letter-spacing: .3px; }
        .badge-pill-success { background: #d4edda; color: #155724; }
        .badge-pill-danger  { background: #f8d7da; color: #721c24; }
        .badge-pill-warning { background: #fff3cd; color: #856404; }
        .badge-pill-info    { background: #d1ecf1; color: #0c5460; }
        .badge-pill-secondary { background: #e2e3e5; color: #383d41; }
        .badge-pill-primary { background: #cce5ff; color: #004085; }

        /* ───────── Forms ───────── */
        .form-control, .form-select {
            border-radius: 8px; border-color: #d0dbd0;
            font-size: 14px; padding: 9px 14px;
        }
        .form-control:focus, .form-select:focus {
            border-color: var(--tea-accent);
            box-shadow: 0 0 0 3px rgba(74,140,63,.15);
        }
        .form-label { font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }

        /* ───────── Buttons ───────── */
        .btn { border-radius: 8px; font-size: 13px; font-weight: 500; padding: 8px 18px; }
        .btn-tea    { background: var(--tea-accent); color: #fff; border: none; }
        .btn-tea:hover { background: var(--tea-mid); color: #fff; }
        .btn-sm { padding: 5px 12px; font-size: 12px; }

        /* ───────── Alert flash ───────── */
        .alert { border-radius: 10px; font-size: 14px; border: none; }
        .alert-success { background: #d4edda; color: #155724; }
        .alert-danger   { background: #f8d7da; color: #721c24; }
        .alert-warning  { background: #fff3cd; color: #664d03; }
        .alert-info     { background: #d1ecf1; color: #0c5460; }

        /* ───────── Empty state ───────── */
        .empty-state { padding: 60px 20px; text-align: center; }
        .empty-state .empty-icon {
            font-size: 56px; color: #c8d8c8; margin-bottom: 14px; display: block;
        }
        .empty-state h5 { color: #555; margin-bottom: 6px; }
        .empty-state p  { color: #999; font-size: 14px; }

        /* ───────── Modals ───────── */
        .modal-content { border: none; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,.18); }
        .modal-header  { border-bottom: 1px solid #edf2ed; padding: 18px 22px; border-radius: 16px 16px 0 0; }
        .modal-footer  { border-top: 1px solid #edf2ed; padding: 14px 22px; }

        /* ───────── Footer ───────── */
        .admin-footer {
            background: #fff; border-top: 1px solid #e8eee8;
            padding: 14px 28px; font-size: 13px; color: #888;
            display: flex; justify-content: space-between; align-items: center;
        }

        /* ───────── Progress bars ───────── */
        .progress { border-radius: 10px; height: 8px; background: #e8eee8; }
        .progress-bar { border-radius: 10px; }

        /* ───────── Responsive ───────── */
        @media (max-width: 991.98px) {
            .admin-sidebar { transform: translateX(-100%); width: var(--sidebar-w) !important; }
            .admin-sidebar.mobile-open { transform: translateX(0); }
            .admin-main { margin-left: 0 !important; }
            .sidebar-overlay {
                display: none; position: fixed; inset: 0;
                background: rgba(0,0,0,.5); z-index: 1039;
            }
            .sidebar-overlay.active { display: block; }
        }
    </style>
    @stack('styles')
</head>

<body>
    <!-- Sidebar -->
    <aside class="admin-sidebar" id="adminSidebar">
        <!-- Brand -->
        <a class="sidebar-brand" href="{{ route('admin.dashboard') }}">
            <div class="brand-icon"><i class="bi bi-cup-hot-fill"></i></div>
            <div class="brand-text">
                <span class="shop-name">{{ setting('shop_name', 'TeaShop') }}</span>
                <span class="shop-sub">Admin Panel</span>
            </div>
        </a>

        <!-- Navigation -->
        <nav class="sidebar-nav">
            <!-- Main -->
            <div class="sidebar-section-label">Main</div>
            <a href="{{ route('admin.dashboard') }}"
               class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                <i class="bi bi-speedometer2 nav-icon"></i>
                <span>Dashboard</span>
            </a>

            <!-- Catalogue -->
            <div class="sidebar-section-label">Catalogue</div>
            <a href="#menuCatalogue" data-bs-toggle="collapse"
               class="nav-link {{ request()->routeIs('admin.categories.*','admin.products.*') ? 'active' : '' }}"
               aria-expanded="{{ request()->routeIs('admin.categories.*','admin.products.*') ? 'true' : 'false' }}">
                <i class="bi bi-box-seam nav-icon"></i>
                <span>Products</span>
                <i class="bi bi-chevron-down nav-collapse-arrow"></i>
            </a>
            <div class="collapse sidebar-submenu {{ request()->routeIs('admin.categories.*','admin.products.*') ? 'show' : '' }}"
                 id="menuCatalogue">
                <a href="{{ route('admin.categories.index') }}"
                   class="nav-link {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
                    <span>Categories</span>
                </a>
                <a href="{{ route('admin.products.index') }}"
                   class="nav-link {{ request()->routeIs('admin.products.*') ? 'active' : '' }}">
                    <span>All Products</span>
                </a>
            </div>

            <!-- Operations -->
            <div class="sidebar-section-label">Operations</div>
            <a href="{{ route('admin.tables.index') }}"
               class="nav-link {{ request()->routeIs('admin.tables.*') ? 'active' : '' }}">
                <i class="bi bi-grid nav-icon"></i>
                <span>Tables & QR</span>
            </a>

            <a href="#menuOrders" data-bs-toggle="collapse"
               class="nav-link {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}"
               aria-expanded="{{ request()->routeIs('admin.orders.*') ? 'true' : 'false' }}">
                <i class="bi bi-receipt nav-icon"></i>
                <span>Orders</span>
                <i class="bi bi-chevron-down nav-collapse-arrow"></i>
            </a>
            <div class="collapse sidebar-submenu {{ request()->routeIs('admin.orders.*') ? 'show' : '' }}"
                 id="menuOrders">
                <a href="{{ route('admin.orders.live') }}"
                   class="nav-link {{ request()->routeIs('admin.orders.live') ? 'active' : '' }}">
                    <span>Live Kitchen</span>
                </a>
                <a href="{{ route('admin.orders.history') }}"
                   class="nav-link {{ request()->routeIs('admin.orders.history','admin.orders.show') ? 'active' : '' }}">
                    <span>Order History</span>
                </a>
            </div>

            <!-- Insights -->
            <div class="sidebar-section-label">Insights</div>
            <a href="{{ route('admin.analytics.index') }}"
               class="nav-link {{ request()->routeIs('admin.analytics.*') ? 'active' : '' }}">
                <i class="bi bi-graph-up-arrow nav-icon"></i>
                <span>Analytics</span>
            </a>

            <a href="#menuReports" data-bs-toggle="collapse"
               class="nav-link {{ request()->routeIs('admin.analytics.*') ? 'active' : '' }}"
               aria-expanded="{{ request()->routeIs('admin.analytics.*') ? 'true' : 'false' }}">
                <i class="bi bi-bar-chart-line nav-icon"></i>
                <span>Reports</span>
                <i class="bi bi-chevron-down nav-collapse-arrow"></i>
            </a>
            <div class="collapse sidebar-submenu {{ request()->routeIs('admin.analytics.*') ? 'show' : '' }}"
                 id="menuReports">
                <a href="{{ route('admin.analytics.index') }}"
                   class="nav-link {{ request()->routeIs('admin.analytics.index') ? 'active' : '' }}">
                    <span>Overview</span>
                </a>
                <a href="{{ route('admin.analytics.sales') }}"
                   class="nav-link {{ request()->routeIs('admin.analytics.sales') ? 'active' : '' }}">
                    <span>Sales Report</span>
                </a>
                <a href="{{ route('admin.analytics.products') }}"
                   class="nav-link {{ request()->routeIs('admin.analytics.products') ? 'active' : '' }}">
                    <span>Product Report</span>
                </a>
            </div>

            <!-- System -->
            <div class="sidebar-section-label">System</div>
            <a href="{{ route('admin.settings.index') }}"
               class="nav-link {{ request()->routeIs('admin.settings.*') ? 'active' : '' }}">
                <i class="bi bi-gear nav-icon"></i>
                <span>Settings</span>
            </a>
            <a href="{{ route('profile.edit') }}"
               class="nav-link {{ request()->routeIs('profile.*') ? 'active' : '' }}">
                <i class="bi bi-person-gear nav-icon"></i>
                <span>My Profile</span>
            </a>
            <a href="{{ route('home') }}" target="_blank" class="nav-link">
                <i class="bi bi-box-arrow-up-right nav-icon"></i>
                <span>View Storefront</span>
            </a>
        </nav>

        <!-- Sidebar footer -->
        <div class="sidebar-footer">
            @php $initials = collect(explode(' ', Auth::user()->name))->map(fn($w)=>strtoupper($w[0]))->take(2)->implode(''); @endphp
            <a href="{{ route('profile.edit') }}" class="sidebar-user">
                <div class="user-avatar">{{ $initials }}</div>
                <div class="user-info">
                    <span class="user-name">{{ Auth::user()->name }}</span>
                    <span class="user-role">Administrator</span>
                </div>
                <i class="bi bi-three-dots-vertical ms-auto" style="color:rgba(255,255,255,.4);font-size:14px;"></i>
            </a>
        </div>
    </aside>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Main wrapper -->
    <div class="admin-main" id="adminMain">

        <!-- Top bar -->
        <header class="admin-topbar">
            <!-- Sidebar toggle -->
            <button class="topbar-toggle-btn" id="sidebarToggle" title="Toggle sidebar">
                <i class="bi bi-list"></i>
            </button>

            <!-- Breadcrumb / page title -->
            <div class="topbar-breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard') }}"><i class="bi bi-house-door me-1"></i>Home</a>
                        </li>
                        @yield('breadcrumb')
                    </ol>
                </nav>
            </div>

            <!-- Right actions -->
            <div class="topbar-actions">
                <!-- Live orders badge -->
                <a href="{{ route('admin.orders.live') }}" class="topbar-icon-btn" title="Live Orders">
                    <i class="bi bi-activity"></i>
                    <span class="topbar-badge"></span>
                </a>

                <div class="topbar-divider"></div>

                <!-- User dropdown -->
                <div class="dropdown">
                    <button class="topbar-user-btn" data-bs-toggle="dropdown">
                        <div class="topbar-user-avatar">{{ $initials }}</div>
                        <span class="topbar-user-name d-none d-sm-block">{{ Auth::user()->name }}</span>
                        <i class="bi bi-chevron-down" style="font-size:11px;color:#888;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="border-radius:12px;min-width:200px;">
                        <li class="px-3 py-2 border-bottom">
                            <div class="fw-600" style="font-size:14px;">{{ Auth::user()->name }}</div>
                            <div class="text-muted" style="font-size:12px;">{{ Auth::user()->email }}</div>
                        </li>
                        <li><a class="dropdown-item py-2" href="{{ route('profile.edit') }}"><i class="bi bi-person-circle me-2 text-muted"></i>My Profile</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('admin.settings.index') }}"><i class="bi bi-gear me-2 text-muted"></i>Settings</a></li>
                        <li><hr class="dropdown-divider my-1"></li>
                        <li>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button class="dropdown-item py-2 text-danger" type="submit">
                                    <i class="bi bi-box-arrow-right me-2"></i>Sign Out
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <!-- Page content -->
        <main class="admin-content">
            <!-- Flash messages -->
            @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i>{{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            @endif
            @if(session('error'))
            <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                <i class="bi bi-exclamation-circle-fill me-2"></i>{{ session('error') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            @endif
            @if($errors->any())
            <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                <i class="bi bi-exclamation-circle-fill me-2"></i>
                <ul class="mb-0 mt-1">
                    @foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach
                </ul>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            @endif

            @yield('content')
        </main>

        <!-- Footer -->
        <footer class="admin-footer">
            <span>&copy; {{ date('Y') }} {{ setting('shop_name', 'TeaShop') }}. All rights reserved.</span>
            <span><i class="bi bi-cup-hot me-1 text-success"></i>Crafted with care &nbsp;·&nbsp; v1.0.0</span>
        </footer>
    </div><!-- /.admin-main -->

    <!-- Sidebar toggle JS -->
    <script>
        if (typeof window.require === 'undefined') {
            window.require = function() { console.warn('require() called in browser – no-op'); };
        }

        (function () {
            const sidebar  = document.getElementById('adminSidebar');
            const main     = document.getElementById('adminMain');
            const overlay  = document.getElementById('sidebarOverlay');
            const toggleBtn = document.getElementById('sidebarToggle');

            const isMobile = () => window.innerWidth < 992;

            function closeMobile() {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('active');
            }

            toggleBtn.addEventListener('click', function () {
                if (isMobile()) {
                    sidebar.classList.toggle('mobile-open');
                    overlay.classList.toggle('active');
                } else {
                    sidebar.classList.toggle('collapsed');
                    main.classList.toggle('expanded');
                    // Persist state
                    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
                }
            });

            overlay.addEventListener('click', closeMobile);

            // Restore collapse state on desktop
            if (!isMobile() && localStorage.getItem('sidebarCollapsed') === 'true') {
                sidebar.classList.add('collapsed');
                main.classList.add('expanded');
            }
        })();
    </script>
    @stack('scripts')
</body>
</html>