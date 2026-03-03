<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $restaurantName }} — Menu</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

    <style>
        :root {
            --tea-dark:    #1a3a1a;
            --tea-mid:     #2d5a27;
            --tea-accent:  #4a8c3f;
            --tea-light:   #6db560;
            --tea-pale:    #e8f5e2;
            --tea-gold:    #c8860a;
            --topbar-h:    64px;
        }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: calc(var(--topbar-h) + 56px); }
        body { font-family: 'Inter', sans-serif; background: #f0f4f0; color: #1a2e1a; margin: 0; padding: 0; overflow-x: hidden; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Poppins', 'Inter', sans-serif; }

        /* Topbar */
        .menu-topbar {
            position: sticky; top: 0; z-index: 900;
            height: var(--topbar-h);
            background: linear-gradient(135deg, var(--tea-dark) 0%, var(--tea-mid) 100%);
            display: flex; align-items: center; gap: 14px;
            padding: 0 20px;
            box-shadow: 0 2px 12px rgba(0,0,0,.25);
        }
        .topbar-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .topbar-brand .brand-icon { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .topbar-brand .brand-name { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 700; color: #fff; white-space: nowrap; }
        .topbar-search { flex: 1; max-width: 380px; }
        .topbar-search .search-inner { position: relative; }
        .topbar-search .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,.5); font-size: 16px; pointer-events: none; }
        .topbar-search input { width: 100%; background: rgba(255,255,255,.12); border: 1.5px solid rgba(255,255,255,.2); border-radius: 24px; padding: 8px 16px 8px 38px; color: #fff; font-size: 14px; font-family: 'Inter', sans-serif; outline: none; transition: background .2s, border-color .2s; }
        .topbar-search input::placeholder { color: rgba(255,255,255,.45); }
        .topbar-search input:focus { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.4); }
        .topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }
        .table-badge { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.25); border-radius: 20px; padding: 5px 12px; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer; transition: background .2s; white-space: nowrap; }
        .table-badge:hover { background: rgba(255,255,255,.22); }
        .table-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: #6db560; }
        .table-badge.no-table .dot { background: #f0ad4e; }
        .cart-btn { position: relative; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.25); color: #fff; font-size: 19px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s; flex-shrink: 0; }
        .cart-btn:hover { background: rgba(255,255,255,.25); }
        .cart-btn .cart-count { position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; border-radius: 50%; background: #e53935; border: 2px solid var(--tea-dark); font-size: 10px; font-weight: 700; color: #fff; display: none; align-items: center; justify-content: center; }

        /* Category bar */
        .category-bar { position: sticky; top: var(--topbar-h); z-index: 800; background: #fff; border-bottom: 1px solid #e0e8e0; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
        .category-scroll { display: flex; gap: 6px; padding: 10px 20px; overflow-x: auto; scrollbar-width: none; }
        .category-scroll::-webkit-scrollbar { display: none; }
        .cat-btn { flex-shrink: 0; padding: 6px 18px; border-radius: 20px; border: 1.5px solid #d0dbd0; background: transparent; font-size: 13px; font-weight: 500; color: #555; cursor: pointer; transition: all .18s; white-space: nowrap; font-family: 'Inter', sans-serif; }
        .cat-btn:hover { border-color: var(--tea-accent); color: var(--tea-accent); background: var(--tea-pale); }
        .cat-btn.active { background: var(--tea-accent); border-color: var(--tea-accent); color: #fff; }

        /* Page content */
        .menu-content { padding: 24px 20px 120px; max-width: 1200px; margin: 0 auto; }
        .category-section { margin-bottom: 32px; }
        .category-section-title { font-size: 16px; font-weight: 700; color: var(--tea-dark); margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid var(--tea-pale); display: flex; align-items: center; gap: 8px; }
        .category-section-title i { color: var(--tea-accent); }

        /* Product cards */
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .product-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.07); transition: transform .2s, box-shadow .2s; display: flex; flex-direction: column; }
        .product-card:hover { transform: translateY(-3px); box-shadow: 0 6px 22px rgba(0,0,0,.12); }
        .product-card.unavailable { opacity: .55; }
        .product-img { width: 100%; height: 170px; object-fit: cover; }
        .product-img-placeholder { width: 100%; height: 170px; background: linear-gradient(135deg, #e8f5e2, #f0f4f0); display: flex; align-items: center; justify-content: center; font-size: 44px; color: #c8d8c8; }
        .product-body { padding: 14px 16px 16px; flex: 1; display: flex; flex-direction: column; }
        .product-name { font-size: 15px; font-weight: 600; color: #1a2e1a; margin: 0 0 4px; line-height: 1.3; }
        .product-desc { font-size: 12px; color: #777; line-height: 1.5; margin-bottom: 12px; flex: 1; }
        .product-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .product-price { font-size: 18px; font-weight: 700; color: var(--tea-accent); font-family: 'Poppins', sans-serif; }
        .btn-add { display: flex; align-items: center; gap: 5px; background: var(--tea-accent); color: #fff; border: none; border-radius: 20px; padding: 7px 16px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .18s, transform .1s; font-family: 'Inter', sans-serif; }
        .btn-add:hover { background: var(--tea-mid); }
        .btn-add:active { transform: scale(.96); }
        .btn-add.in-cart { background: var(--tea-pale); color: var(--tea-accent); border: 1.5px solid var(--tea-accent); }
        .btn-unavailable { background: #f0f0f0; color: #aaa; border: none; border-radius: 20px; padding: 7px 16px; font-size: 13px; font-weight: 500; cursor: not-allowed; font-family: 'Inter', sans-serif; }

        /* Inline qty control on product card */
        .card-qty-ctrl { display: inline-flex; align-items: center; gap: 2px; background: var(--tea-pale); border: 1.5px solid var(--tea-accent); border-radius: 20px; padding: 3px 4px; }
        .card-qty-btn { width: 26px; height: 26px; border-radius: 50%; border: none; background: var(--tea-accent); color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .15s; font-family: 'Inter', sans-serif; line-height: 1; }
        .card-qty-btn:hover { background: var(--tea-mid); }
        .card-qty-num { min-width: 24px; text-align: center; font-size: 14px; font-weight: 700; color: var(--tea-accent); font-family: 'Poppins', sans-serif; }

        /* Empty */
        .empty-state { text-align: center; padding: 60px 20px; color: #999; }
        .empty-state i { font-size: 52px; color: #d0d8d0; display: block; margin-bottom: 14px; }
        .empty-state h5 { color: #666; margin-bottom: 6px; }

        /* Cart Sidebar */
        .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1040; opacity: 0; visibility: hidden; transition: opacity .25s, visibility .25s; }
        .cart-overlay.show { opacity: 1; visibility: visible; }
        .cart-sidebar { position: fixed; top: 0; right: 0; bottom: 0; width: 380px; max-width: 100vw; background: #fff; z-index: 1050; display: flex; flex-direction: column; transform: translateX(100%); transition: transform .28s cubic-bezier(.4,0,.2,1); box-shadow: -6px 0 30px rgba(0,0,0,.18); }
        .cart-sidebar.open { transform: translateX(0); }
        .cart-head { background: linear-gradient(135deg, var(--tea-dark), var(--tea-mid)); padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .cart-head h5 { font-family: 'Poppins', sans-serif; color: #fff; margin: 0; font-size: 16px; }
        .cart-close { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,.15); border: none; color: #fff; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; }
        .cart-close:hover { background: rgba(255,255,255,.25); }
        .cart-body { flex: 1; overflow-y: auto; }
        .cart-empty-msg { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 40px; text-align: center; color: #aaa; }
        .cart-empty-msg i { font-size: 52px; display: block; margin-bottom: 14px; color: #d0d8d0; }
        .cart-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; }
        .cart-item-img { width: 52px; height: 52px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
        .cart-item-img-ph { width: 52px; height: 52px; border-radius: 10px; background: var(--tea-pale); display: flex; align-items: center; justify-content: center; font-size: 22px; color: var(--tea-accent); flex-shrink: 0; }
        .cart-item-info { flex: 1; }
        .cart-item-name { font-size: 13px; font-weight: 600; color: #1a2e1a; margin-bottom: 4px; }
        .cart-item-price { font-size: 12px; color: #888; }
        .qty-ctrl { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
        .qty-btn { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid #d0dbd0; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer; color: #555; transition: all .15s; }
        .qty-btn:hover { background: var(--tea-accent); border-color: var(--tea-accent); color: #fff; }
        .qty-num { font-size: 14px; font-weight: 600; min-width: 20px; text-align: center; }
        .cart-item-sub { font-size: 13px; font-weight: 600; color: var(--tea-accent); white-space: nowrap; }
        .cart-foot { padding: 16px; border-top: 1px solid #eee; flex-shrink: 0; background: #fafcfa; }
        .total-row { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 6px; }
        .total-grand { display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; color: var(--tea-dark); margin: 10px 0 14px; padding-top: 10px; border-top: 1.5px solid #e0e8e0; }
        .btn-checkout { width: 100%; padding: 13px; background: linear-gradient(135deg, var(--tea-mid), var(--tea-accent)); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: 'Poppins', sans-serif; cursor: pointer; transition: opacity .2s; box-shadow: 0 4px 14px rgba(45,90,39,.35); }
        .btn-checkout:hover { opacity: .9; }

        /* Table Picker */
        .table-picker-overlay { position: fixed; inset: 0; background: linear-gradient(135deg, rgba(26,58,26,.96), rgba(45,90,39,.98)); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .table-picker-overlay.hidden { display: none; }
        .table-picker-card { background: #fff; border-radius: 20px; width: 100%; max-width: 520px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,.5); animation: slideUp .35s cubic-bezier(.4,0,.2,1); }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .tp-header { background: linear-gradient(135deg, var(--tea-dark), var(--tea-mid)); padding: 28px 28px 24px; text-align: center; }
        .tp-header .tp-icon { width: 60px; height: 60px; border-radius: 16px; background: rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center; font-size: 28px; color: #fff; margin: 0 auto 16px; }
        .tp-header h2 { color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 6px; }
        .tp-header p { color: rgba(255,255,255,.6); font-size: 13px; margin: 0; }
        .tp-body { padding: 20px 24px 24px; flex: 1; overflow-y: auto; }
        .tp-search { position: relative; margin-bottom: 16px; }
        .tp-search i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #aaa; font-size: 16px; }
        .tp-search input { width: 100%; padding: 10px 14px 10px 38px; border: 1.5px solid #d0dbd0; border-radius: 10px; font-size: 14px; font-family: 'Inter', sans-serif; outline: none; transition: border-color .2s; }
        .tp-search input:focus { border-color: var(--tea-accent); }
        .tp-tables-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 12px; }
        .tp-table-btn { border: 1.5px solid #d0dbd0; border-radius: 12px; background: #fff; padding: 14px 8px; text-align: center; cursor: pointer; transition: all .18s; font-family: 'Inter', sans-serif; }
        .tp-table-btn:hover { border-color: var(--tea-accent); background: var(--tea-pale); transform: translateY(-2px); }
        .tp-table-btn .tbl-num { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 700; color: var(--tea-dark); display: block; margin-bottom: 4px; }
        .tp-table-btn .tbl-label { font-size: 11px; color: #888; display: block; }
        .tp-table-btn .tbl-loc { font-size: 10px; color: #aaa; display: block; margin-top: 2px; }
        .tp-no-tables { text-align: center; padding: 30px; color: #aaa; }
        .tp-no-tables i { font-size: 40px; display: block; margin-bottom: 10px; }

        /* Toast */
        .toast-stack { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 3000; display: flex; flex-direction: column; gap: 8px; pointer-events: none; }
        .toast-msg { background: #1a3a1a; color: #fff; padding: 11px 20px; border-radius: 30px; font-size: 13px; font-weight: 500; box-shadow: 0 4px 16px rgba(0,0,0,.3); display: flex; align-items: center; gap: 8px; animation: toastIn .25s ease; pointer-events: none; max-width: 320px; }
        @keyframes toastIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }

        /* Floating cart */
        .floating-cart-btn { position: fixed; bottom: 24px; right: 20px; background: linear-gradient(135deg, var(--tea-mid), var(--tea-accent)); color: #fff; border: none; border-radius: 30px; padding: 13px 22px; font-size: 14px; font-weight: 600; display: none; align-items: center; gap: 10px; cursor: pointer; z-index: 800; box-shadow: 0 6px 20px rgba(45,90,39,.45); transition: transform .2s; font-family: 'Poppins', sans-serif; }
        .floating-cart-btn.show { display: flex; }
        .floating-cart-btn:hover { transform: translateY(-2px); }
        .floating-cart-btn .fc-badge { background: #fff; color: var(--tea-accent); border-radius: 20px; padding: 2px 9px; font-size: 12px; font-weight: 700; }

        @media (max-width: 640px) {
            .topbar-brand .brand-name { display: none; }
            .menu-content { padding: 16px 12px 100px; }
            .products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
            .product-img, .product-img-placeholder { height: 130px; }
            .cart-sidebar { width: 100vw; }
        }
    </style>
</head>
<body>

{{-- TABLE PICKER OVERLAY --}}
<div class="table-picker-overlay {{ $selectedTableId ? 'hidden' : '' }}" id="tablePicker">
    <div class="table-picker-card">
        <div class="tp-header">
            <div class="tp-icon"><i class="bi bi-grid-3x3-gap"></i></div>
            <h2>Select Your Table</h2>
            <p>Choose your table to browse the menu and place your order</p>
        </div>
        <div class="tp-body">
            <div class="tp-search">
                <i class="bi bi-search"></i>
                <input type="text" id="tpSearch" placeholder="Search table number..." autocomplete="off">
            </div>
            @if($availableTables->count() > 0)
            <div class="tp-tables-grid" id="tpGrid">
                @foreach($availableTables as $t)
                <button class="tp-table-btn"
                        data-id="{{ $t->id }}"
                        data-num="{{ $t->table_number }}"
                        data-name="{{ $t->table_name ?: 'Table '.$t->table_number }}"
                        data-search="{{ strtolower($t->table_number.' '.($t->table_name ?? '').' '.($t->location ?? '')) }}">
                    <span class="tbl-num">{{ $t->table_number }}</span>
                    <span class="tbl-label">{{ $t->table_name ?: 'Table' }}</span>
                    @if($t->capacity)
                    <span class="tbl-loc"><i class="bi bi-people-fill"></i> {{ $t->capacity }}</span>
                    @elseif($t->location)
                    <span class="tbl-loc">{{ $t->location }}</span>
                    @endif
                </button>
                @endforeach
            </div>
            @else
            <div class="tp-no-tables">
                <i class="bi bi-exclamation-circle"></i>
                <p class="mb-0">No tables are currently available.<br><small>Please ask a staff member for assistance.</small></p>
            </div>
            @endif
        </div>
    </div>
</div>

{{-- TOPBAR --}}
<header class="menu-topbar">
    <a class="topbar-brand" href="{{ route('menu') }}">
        <div class="brand-icon"><i class="bi bi-cup-hot-fill"></i></div>
        <span class="brand-name">{{ $restaurantName }}</span>
    </a>
    <div class="topbar-search d-none d-md-block">
        <div class="search-inner">
            <i class="bi bi-search search-icon"></i>
            <input type="text" id="searchInput" placeholder="Search menu...">
        </div>
    </div>
    <div class="topbar-actions">
        <div class="table-badge {{ $selectedTableId ? '' : 'no-table' }}" id="tableBadge"
             onclick="document.getElementById('tablePicker').classList.remove('hidden')" title="Change table">
            <span class="dot"></span>
            <span id="tableBadgeText">
                @if($selectedTableId) Table {{ $selectedTableNumber }} @else Select Table @endif
            </span>
            <i class="bi bi-chevron-down" style="font-size:10px;opacity:.7;"></i>
        </div>
        <div class="cart-btn" id="cartBtn" title="Your cart">
            <i class="bi bi-bag"></i>
            <span class="cart-count" id="cartCountBadge">0</span>
        </div>
    </div>
</header>

{{-- Mobile search --}}
<div class="d-block d-md-none" style="background:#fff;padding:10px 16px;border-bottom:1px solid #e0e8e0;">
    <div style="position:relative;">
        <i class="bi bi-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#aaa;font-size:15px;"></i>
        <input type="text" id="searchInputMobile" placeholder="Search menu..."
               style="width:100%;padding:9px 14px 9px 36px;border:1.5px solid #d0dbd0;border-radius:24px;font-size:14px;font-family:'Inter',sans-serif;outline:none;">
    </div>
</div>

{{-- CATEGORY BAR --}}
<div class="category-bar">
    <div class="category-scroll" id="categoryBar">
        <button class="cat-btn active" data-cat="all">All Items</button>
        @foreach($categories as $cat)
        <button class="cat-btn" data-cat="{{ $cat->id }}">
            {{ $cat->name }}
            <span style="opacity:.5;font-size:11px;"> ({{ $cat->products_count }})</span>
        </button>
        @endforeach
    </div>
</div>

{{-- MENU CONTENT --}}
<div class="menu-content">
    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show mb-4" role="alert" style="border:none;border-radius:12px;font-size:14px;background:#d4edda;color:#155724;">
        <i class="bi bi-check-circle-fill me-2"></i>{{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    @endif
    @if(session('error'))
    <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert" style="border:none;border-radius:12px;font-size:14px;">
        <i class="bi bi-exclamation-circle-fill me-2"></i>{{ session('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    @endif

    <div id="noResults" class="empty-state" style="display:none;">
        <i class="bi bi-search"></i>
        <h5>No items found</h5>
        <p>Try a different keyword or browse all categories.</p>
    </div>

    @foreach($categories as $cat)
    @if($cat->products->count())
    <div class="category-section" id="cat-{{ $cat->id }}" data-category-section="{{ $cat->id }}">
        <div class="category-section-title">
            <i class="bi bi-cup-straw"></i>{{ $cat->name }}
        </div>
        <div class="products-grid">
            @foreach($cat->products as $product)
            <div class="product-card {{ $product->status !== 'active' ? 'unavailable' : '' }} product-item"
                 data-category="{{ $cat->id }}"
                 data-name="{{ strtolower($product->name) }}"
                 data-desc="{{ strtolower($product->description ?? '') }}">
                @if($product->image_url)
                    <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="product-img" loading="lazy">
                @else
                    <div class="product-img-placeholder"><i class="bi bi-cup-straw"></i></div>
                @endif
                <div class="product-body">
                    <div class="product-name">{{ $product->name }}</div>
                    <div class="product-desc">{{ $product->description ? Str::limit($product->description, 90) : '' }}</div>
                    <div class="product-footer">
                        <span class="product-price">{{ $currencySymbol }}{{ number_format($product->price, 2) }}</span>
                        @if($product->status === 'active')
                        <div id="add-wrap-{{ $product->id }}"
                             data-pid="{{ $product->id }}"
                             data-pname="{{ addslashes($product->name) }}"
                             data-pprice="{{ $product->price }}"
                             data-pimg="{{ $product->image_url ?? '' }}">
                            <button class="btn-add" id="add-{{ $product->id }}"
                                    onclick="addToCart({{ $product->id }}, '{{ addslashes($product->name) }}', {{ $product->price }}, '{{ $product->image_url ?? '' }}')">
                                <i class="bi bi-plus-lg"></i> Add
                            </button>
                        </div>
                        @else
                        <span class="btn-unavailable">Unavailable</span>
                        @endif
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
    @endif
    @endforeach

    @if($categories->isEmpty())
    <div class="empty-state">
        <i class="bi bi-cup-straw"></i>
        <h5>Menu coming soon</h5>
        <p>Our menu is being prepared. Please check back shortly.</p>
    </div>
    @endif
</div>

{{-- CART --}}
<div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
<aside class="cart-sidebar" id="cartSidebar">
    <div class="cart-head">
        <h5><i class="bi bi-bag me-2"></i>Your Order</h5>
        <button class="cart-close" onclick="closeCart()"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="cart-body" id="cartBody">
        <div class="cart-empty-msg" id="cartEmpty">
            <i class="bi bi-bag"></i>
            <p class="mb-0" style="font-size:14px;">Your cart is empty</p>
            <p style="font-size:12px;color:#bbb;">Add items from the menu</p>
        </div>
        <div id="cartItems"></div>
    </div>
    <div class="cart-foot" id="cartFoot" style="display:none;">
        <div class="total-row"><span>Subtotal</span><span id="subtotalAmt">{{ $currencySymbol }}0.00</span></div>
        @if($taxRate > 0)
        <div class="total-row"><span>Tax ({{ $taxRate }}%)</span><span id="taxAmt">{{ $currencySymbol }}0.00</span></div>
        @endif
        @if($serviceCharge > 0)
        <div class="total-row"><span>Service ({{ $serviceCharge }}%)</span><span id="serviceAmt">{{ $currencySymbol }}0.00</span></div>
        @endif
        <div class="total-grand"><span>Total</span><span id="totalAmt">{{ $currencySymbol }}0.00</span></div>
        <button class="btn-checkout" onclick="goToCheckout()"><i class="bi bi-bag-check me-2"></i>Place Order</button>
    </div>
</aside>

<button class="floating-cart-btn" id="floatingCart" onclick="openCart()">
    <i class="bi bi-bag"></i>
    <span>View Cart</span>
    <span class="fc-badge" id="floatingCount">0</span>
</button>

<div class="toast-stack" id="toastStack"></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script>
const CURRENCY = '{{ $currencySymbol }}';
const TAX_RATE = {{ $taxRate }};
const SERVICE_CHARGE = {{ $serviceCharge }};
const CSRF = '{{ csrf_token() }}';
let cart = {};
let selectedTableId   = {{ $selectedTableId ?? 'null' }};
let selectedTableNumber = '{{ $selectedTableNumber ?? '' }}';

/* Table Picker */
document.getElementById('tpSearch')?.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.tp-table-btn').forEach(btn => {
        btn.style.display = btn.dataset.search.includes(q) ? '' : 'none';
    });
});

document.querySelectorAll('.tp-table-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const id = this.dataset.id, num = this.dataset.num;
        // Reset all table buttons first
        document.querySelectorAll('.tp-table-btn').forEach(b => {
            b.style.background = '';
            b.style.borderColor = '';
        });
        // Highlight only the selected one
        this.style.background = 'var(--tea-pale)';
        this.style.borderColor = 'var(--tea-accent)';
        fetch('{{ route("public.select-table") }}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json' },
            body: JSON.stringify({ table_id: id })
        })
        .then(r => r.json())
        .then(data => {
            if (data.success || data.table) {
                selectedTableId = id; selectedTableNumber = num;
                const badge = document.getElementById('tableBadge');
                badge.classList.remove('no-table');
                document.getElementById('tableBadgeText').textContent = 'Table ' + num;
                document.getElementById('tablePicker').classList.add('hidden');
                showToast('Table ' + num + ' selected!', 'bi-check-circle-fill');
            }
        })
        .catch(() => {
            selectedTableId = id; selectedTableNumber = num;
            document.getElementById('tableBadgeText').textContent = 'Table ' + num;
            document.getElementById('tablePicker').classList.add('hidden');
        });
    });
});

/* Cart */
function addToCart(id, name, price, image) {
    if (!selectedTableId) {
        document.getElementById('tablePicker').classList.remove('hidden');
        showToast('Please select a table first', 'bi-exclamation-circle');
        return;
    }
    if (cart[id]) { cart[id].qty += 1; } else { cart[id] = { name, price, image, qty: 1 }; }
    const btn = document.getElementById('add-' + id);
    if (btn) btn.classList.add('in-cart');
    renderCart();
    showToast(name + ' added', 'bi-check-circle-fill');
}

function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) {
        delete cart[id];
        const btn = document.getElementById('add-' + id);
        if (btn) btn.classList.remove('in-cart');
    }
    renderCart();
}

function renderCart() {
    const keys = Object.keys(cart);
    const isEmpty = keys.length === 0;
    document.getElementById('cartEmpty').style.display = isEmpty ? 'flex' : 'none';
    document.getElementById('cartFoot').style.display  = isEmpty ? 'none'  : 'block';
    let html = '', sub = 0;
    keys.forEach(id => {
        const item = cart[id], line = item.price * item.qty; sub += line;
        html += `<div class="cart-item">
            ${item.image ? `<img src="${item.image}" class="cart-item-img" alt="">` : `<div class="cart-item-img-ph"><i class="bi bi-cup-straw"></i></div>`}
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${CURRENCY}${item.price.toFixed(2)} each</div>
                <div class="qty-ctrl">
                    <button class="qty-btn" onclick="changeQty(${id},-1)"><i class="bi bi-dash"></i></button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${id},1)"><i class="bi bi-plus"></i></button>
                </div>
            </div>
            <span class="cart-item-sub">${CURRENCY}${line.toFixed(2)}</span>
        </div>`;
    });
    document.getElementById('cartItems').innerHTML = html;
    const tax = sub*(TAX_RATE/100), svc = sub*(SERVICE_CHARGE/100), total = sub+tax+svc;
    document.getElementById('subtotalAmt').textContent = CURRENCY+sub.toFixed(2);
    const taxEl=document.getElementById('taxAmt'); if(taxEl) taxEl.textContent=CURRENCY+tax.toFixed(2);
    const svcEl=document.getElementById('serviceAmt'); if(svcEl) svcEl.textContent=CURRENCY+svc.toFixed(2);
    document.getElementById('totalAmt').textContent = CURRENCY+total.toFixed(2);
    const count = keys.reduce((s,k)=>s+cart[k].qty,0);
    const cb = document.getElementById('cartCountBadge');
    cb.textContent = count; cb.style.display = count>0?'flex':'none';
    document.getElementById('floatingCount').textContent = count;
    document.getElementById('floatingCart').classList.toggle('show', count>0);
    updateProductButtons();
}

function updateProductButtons() {
    // Reset all product card buttons that are no longer in cart
    document.querySelectorAll('[id^="add-wrap-"]').forEach(wrap => {
        const id = wrap.dataset.pid;
        if (!cart[id]) {
            const pname = wrap.dataset.pname;
            const pprice = wrap.dataset.pprice;
            const pimg = wrap.dataset.pimg;
            wrap.innerHTML = `<button class="btn-add" id="add-${id}"
                onclick="addToCart(${id}, '${pname}', ${pprice}, '${pimg}')">
                <i class="bi bi-plus-lg"></i> Add
            </button>`;
        }
    });
    // Update buttons for items in cart to show qty control
    Object.keys(cart).forEach(id => {
        const wrap = document.getElementById('add-wrap-' + id);
        if (!wrap) return;
        const item = cart[id];
        wrap.innerHTML = `<div class="card-qty-ctrl">
            <button class="card-qty-btn" onclick="changeQty(${id},-1)" title="Remove one">−</button>
            <span class="card-qty-num">${item.qty}</span>
            <button class="card-qty-btn" onclick="changeQty(${id},1)" title="Add one">+</button>
        </div>`;
    });
}

function openCart()  { document.getElementById('cartSidebar').classList.add('open'); document.getElementById('cartOverlay').classList.add('show'); }
function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('show'); }
document.getElementById('cartBtn').addEventListener('click', () => { document.getElementById('cartSidebar').classList.toggle('open'); document.getElementById('cartOverlay').classList.toggle('show'); });

function goToCheckout() {
    if (!selectedTableId) { document.getElementById('tablePicker').classList.remove('hidden'); closeCart(); return; }
    if (!Object.keys(cart).length) { showToast('Add items first', 'bi-exclamation-circle'); return; }
    localStorage.setItem('teashop_cart', JSON.stringify(cart));
    localStorage.setItem('teashop_table_id', selectedTableId);
    localStorage.setItem('teashop_table_num', selectedTableNumber);

    // Sync cart and table into the PHP session before navigating so the
    // server-side checkout / place-order controllers can read the cart.
    const csrfToken = '{{ csrf_token() }}';
    const syncCart  = fetch('{{ route("cart.sync") }}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
        body: JSON.stringify({ cart: cart })
    });
    const syncTable = fetch('{{ route("public.select-table") }}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
        body: JSON.stringify({ table_id: selectedTableId })
    });
    Promise.all([syncCart, syncTable])
        .catch(() => {/* navigate regardless */})
        .finally(() => { window.location.href = '{{ route("public.checkout") }}'; });
}

/* Search */
function doSearch(term) {
    const q = term.toLowerCase().trim(); let visible = 0;
    document.querySelectorAll('.product-item').forEach(el => {
        const match = !q || el.dataset.name.includes(q) || el.dataset.desc.includes(q);
        el.style.display = match ? '' : 'none';
        if (match) visible++;
    });
    document.querySelectorAll('[data-category-section]').forEach(sec => {
        sec.style.display = sec.querySelectorAll('.product-item:not([style*="none"])').length ? '' : 'none';
    });
    document.getElementById('noResults').style.display = (visible===0 && q) ? 'block' : 'none';
}
document.getElementById('searchInput')?.addEventListener('input', e => doSearch(e.target.value));
document.getElementById('searchInputMobile')?.addEventListener('input', e => { doSearch(e.target.value); document.getElementById('searchInput').value = e.target.value; });

/* Category filter */
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        const cat = this.dataset.cat;
        if (cat==='all') {
            document.querySelectorAll('.product-item,[data-category-section]').forEach(el=>el.style.display='');
            document.getElementById('noResults').style.display='none';
            return;
        }
        document.getElementById('cat-'+cat)?.scrollIntoView({behavior:'smooth'});
        document.querySelectorAll('.product-item').forEach(el => { el.style.display = el.dataset.category==cat?'':'none'; });
        document.querySelectorAll('[data-category-section]').forEach(sec => { sec.style.display = sec.dataset.categorySection==cat?'':'none'; });
        document.getElementById('noResults').style.display='none';
    });
});

/* Toast */
function showToast(msg, icon='bi-info-circle') {
    const stack=document.getElementById('toastStack'), el=document.createElement('div');
    el.className='toast-msg'; el.innerHTML=`<i class="bi ${icon}" style="font-size:16px;flex-shrink:0;"></i>${msg}`;
    stack.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),320); },2600);
}

renderCart();
</script>
</body>
</html>