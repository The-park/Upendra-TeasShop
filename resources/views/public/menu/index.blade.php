<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $restaurant_name ?? 'TeaShop' }} - Menu</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: #2c5530;
            --secondary-color: #6b8e23;
            --accent-color: #8fbc8f;
            --text-dark: #2d3436;
            --text-light: #636e72;
            --bg-light: #f8f9fa;
            --card-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            padding: 2rem 0;
            text-align: center;
            box-shadow: var(--card-shadow);
        }
        
        .menu-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: var(--card-shadow);
            transition: all 0.3s ease;
            height: 100%;
        }
        
        .menu-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .menu-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .card-body {
            padding: 1.5rem;
        }
        
        .price {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .btn-primary {
            background: var(--primary-color);
            border: none;
            border-radius: 50px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
        }
        
        .btn-outline-primary {
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
            border-radius: 50px;
            padding: 0.5rem 1.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-outline-primary:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
        }
        
        .category-filter {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: var(--card-shadow);
        }
        
        .category-btn {
            background: transparent;
            border: 2px solid var(--accent-color);
            color: var(--text-dark);
            border-radius: 25px;
            padding: 0.5rem 1.5rem;
            margin: 0.25rem;
            transition: all 0.3s ease;
        }
        
        .category-btn.active,
        .category-btn:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: white;
        }
        
        .cart-sidebar {
            position: fixed;
            top: 0;
            right: -400px;
            width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            z-index: 1050;
            overflow-y: auto;
        }
        
        .cart-sidebar.open {
            right: 0;
        }
        
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .cart-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        
        .cart-header {
            background: var(--primary-color);
            color: white;
            padding: 1.5rem;
        }
        
        .cart-item {
            padding: 1rem;
            border-bottom: 1px solid #eee;
        }
        
        .quantity-control {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .quantity-btn {
            width: 30px;
            height: 30px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quantity-btn:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .floating-cart {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--primary-color);
            color: white;
            border-radius: 50px;
            padding: 1rem 2rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1030;
        }
        
        .floating-cart:hover {
            transform: scale(1.05);
            background: var(--secondary-color);
        }
        
        .badge-pill {
            background: #dc3545;
            color: white;
            border-radius: 50px;
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
            position: absolute;
            top: -8px;
            right: -8px;
        }
        
        .search-box {
            max-width: 500px;
            margin: 0 auto;
        }
        
        .search-box .form-control {
            border-radius: 25px;
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--accent-color);
        }
        
        .search-box .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(44, 85, 48, 0.25);
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-light);
        }
        
        .table-selector {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: var(--card-shadow);
        }
        
        .table-number {
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 1rem;
        }
        
        @media (max-width: 768px) {
            .cart-sidebar {
                width: 100vw;
                right: -100vw;
            }
            
            .floating-cart {
                bottom: 1rem;
                right: 1rem;
                padding: 0.75rem 1.5rem;
            }
            
            .header {
                padding: 1rem 0;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="container">
            <h1 class="mb-3">{{ $restaurant_name ?? 'TeaShop Menu' }}</h1>
            <p class="lead mb-4">Discover our delicious selection of teas, snacks, and treats</p>
            
            <!-- Table Selection -->
            @if(!session('table_number'))
                <div class="table-selector">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h5 class="text-dark mb-3">Select Your Table</h5>
                            <div class="d-flex flex-wrap gap-2" id="tableSelector">
                                @if(isset($tables))
                                    @foreach($tables as $table)
                                        <button class="btn btn-outline-primary table-btn" 
                                                data-table="{{ $table->id }}" 
                                                data-number="{{ $table->table_number }}">
                                            Table {{ $table->table_number }}
                                        </button>
                                    @endforeach
                                @endif
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center">
                                <i class="fas fa-qrcode fa-3x text-muted mb-2"></i>
                                <p class="text-dark">Or scan QR code on your table</p>
                            </div>
                        </div>
                    </div>
                </div>
            @else
                <div class="table-selector">
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="table-number">{{ session('table_number') }}</div>
                        <div>
                            <h6 class="text-dark mb-0">Table {{ session('table_number') }}</h6>
                            <small class="text-muted">Selected table</small>
                        </div>
                    </div>
                </div>
            @endif
            
            <!-- Search Box -->
            <div class="search-box">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search menu items..." id="searchInput">
                    <button class="btn btn-outline-light" type="button" id="searchBtn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container my-5">
        <!-- Category Filter -->
        <div class="category-filter">
            <h5 class="mb-3">Browse Categories</h5>
            <div class="row">
                <div class="col-12">
                    <button class="btn category-btn active" data-category="all">All Items</button>
                    @if(isset($categories))
                        @foreach($categories as $category)
                            <button class="btn category-btn" data-category="{{ $category->id }}">
                                {{ $category->name }}
                            </button>
                        @endforeach
                    @endif
                </div>
            </div>
        </div>
        
        <!-- Menu Items Grid -->
        <div id="menuContainer">
            @if(isset($products) && count($products) > 0)
                <div class="row" id="productsGrid">
                    @foreach($products as $product)
                        <div class="col-lg-4 col-md-6 mb-4 product-item" 
                             data-category="{{ $product->category_id ?? 'uncategorized' }}"
                             data-name="{{ strtolower($product->name) }}"
                             data-description="{{ strtolower($product->description ?? '') }}">
                            <div class="menu-card">
                                @if($product->image)
                                    <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="card-img-top">
                                    @if(config('app.debug'))
                                        <small class="text-muted d-block mt-1">Image URL: {{ $product->image_url }}</small>
                                    @endif
                                @else
                                    <div class="d-flex align-items-center justify-content-center bg-light" style="height: 200px;">
                                        <i class="fas fa-image fa-3x text-muted"></i>
                                    </div>
                                @endif
                                
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">{{ $product->name }}</h5>
                                    @if($product->description)
                                        <p class="card-text text-muted mb-3">{{ Str::limit($product->description, 100) }}</p>
                                    @endif
                                    
                                    <div class="mt-auto">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <span class="price">${{ number_format($product->price, 2) }}</span>
                                            @if($product->status === 'active')
                                                <span class="badge bg-success">Available</span>
                                            @else
                                                <span class="badge bg-danger">Out of Stock</span>
                                            @endif
                                        </div>
                                        
                                        @if($product->status === 'active')
                                            <button class="btn btn-primary w-100 add-to-cart" 
                                                    data-product-id="{{ $product->id }}"
                                                    data-product-name="{{ $product->name }}"
                                                    data-product-price="{{ $product->price }}"
                                                    data-product-image="{{ $product->image_url ?? '' }}">
                                                <i class="fas fa-plus-circle me-2"></i>Add to Cart
                                            </button>
                                        @else
                                            <button class="btn btn-secondary w-100" disabled>
                                                <i class="fas fa-times-circle me-2"></i>Unavailable
                                            </button>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="empty-state">
                    <i class="fas fa-utensils fa-4x mb-3"></i>
                    <h4>No menu items available</h4>
                    <p>Our menu is being updated. Please check back soon!</p>
                </div>
            @endif
        </div>
        
        <!-- No Results Message -->
        <div id="noResults" class="empty-state" style="display: none;">
            <i class="fas fa-search fa-4x mb-3"></i>
            <h4>No items found</h4>
            <p>Try searching for something else or browse our categories.</p>
        </div>
    </div>
    
    <!-- Floating Cart Button -->
    <div class="floating-cart" id="floatingCart" style="display: none;">
        <span class="badge-pill" id="cartCount">0</span>
        <i class="fas fa-shopping-cart me-2"></i>
        <span>View Cart ($<span id="cartTotal">0.00</span>)</span>
    </div>
    
    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Your Order</h4>
                <button class="btn btn-link text-white p-0" id="closeCart">
                    <i class="fas fa-times fa-lg"></i>
                </button>
            </div>
        </div>
        
        <div class="cart-content">
            <div id="cartItems">
                <!-- Cart items will be added here dynamically -->
            </div>
            
            <div class="cart-footer p-3">
                <div class="mb-3">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <strong id="subtotalAmount">$0.00</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Tax (8.5%):</span>
                        <span id="taxAmount">$0.00</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-3">
                        <h5>Total:</h5>
                        <h5 id="finalTotal">$0.00</h5>
                    </div>
                </div>
                
                <button class="btn btn-primary w-100 mb-2" id="proceedToCheckout" style="display: none;">
                    <i class="fas fa-credit-card me-2"></i>Proceed to Checkout
                </button>
                
                <div id="emptyCart" class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                    <button class="btn btn-outline-primary" id="continueShopping">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Cart Overlay -->
    <div class="cart-overlay" id="cartOverlay"></div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    
    <script>
        // Cart functionality
        let cart = JSON.parse(localStorage.getItem('teashop_cart') || '[]');
        let selectedTable = localStorage.getItem('teashop_table') || null;
        
        $(document).ready(function() {
            updateCartDisplay();
            updateFloatingCart();
            
            // Table selection
            $('.table-btn').click(function() {
                const tableId = $(this).data('table');
                const tableNumber = $(this).data('number');
                selectTable(tableId, tableNumber);
            });
            
            // Category filtering
            $('.category-btn').click(function() {
                $('.category-btn').removeClass('active');
                $(this).addClass('active');
                
                const category = $(this).data('category');
                filterByCategory(category);
            });
            
            // Search functionality
            $('#searchInput').on('input', function() {
                const searchTerm = $(this).val().toLowerCase();
                filterBySearch(searchTerm);
            });
            
            // Add to cart
            $('.add-to-cart').click(function() {
                if (!selectedTable && !@json(session('table_number'))) {
                    alert('Please select a table first!');
                    return;
                }
                
                const product = {
                    id: $(this).data('product-id'),
                    name: $(this).data('product-name'),
                    price: parseFloat($(this).data('product-price')),
                    image: $(this).data('product-image'),
                    quantity: 1
                };
                
                addToCart(product);
            });
            
            // Cart controls
            $('#floatingCart, #cartOverlay').click(function() {
                toggleCart();
            });
            
            $('#closeCart, #continueShopping').click(function() {
                toggleCart();
            });
            
            $('#proceedToCheckout').click(function() {
                if (cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                // Proceed to checkout
                window.location.href = '{{ route("public.checkout") }}';
            });
        });
        
        function selectTable(tableId, tableNumber) {
            selectedTable = tableId;
            localStorage.setItem('teashop_table', tableId);
            localStorage.setItem('teashop_table_number', tableNumber);
            
            // Send to server
            $.post('{{ route("public.select-table") }}', {
                table_id: tableId,
                _token: '{{ csrf_token() }}'
            });
            
            // Update UI
            $('.table-selector').html(`
                <div class="d-flex align-items-center justify-content-center">
                    <div class="table-number">${tableNumber}</div>
                    <div>
                        <h6 class="text-dark mb-0">Table ${tableNumber}</h6>
                        <small class="text-muted">Selected table</small>
                    </div>
                </div>
            `);
        }
        
        function addToCart(product) {
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }
            
            localStorage.setItem('teashop_cart', JSON.stringify(cart));
            updateCartDisplay();
            updateFloatingCart();
            
            // Show success feedback
            showNotification(`${product.name} added to cart!`, 'success');
        }
        
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('teashop_cart', JSON.stringify(cart));
            updateCartDisplay();
            updateFloatingCart();
        }
        
        function updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
                return;
            }
            
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                localStorage.setItem('teashop_cart', JSON.stringify(cart));
                updateCartDisplay();
                updateFloatingCart();
            }
        }
        
        function updateCartDisplay() {
            const cartItems = $('#cartItems');
            const emptyCart = $('#emptyCart');
            const proceedBtn = $('#proceedToCheckout');
            
            if (cart.length === 0) {
                cartItems.empty();
                emptyCart.show();
                proceedBtn.hide();
            } else {
                emptyCart.hide();
                proceedBtn.show();
                
                let html = '';
                cart.forEach(item => {
                    html += `
                        <div class="cart-item">
                            <div class="row align-items-center">
                                <div class="col-3">
                                    ${item.image ? 
                                        `<img src="${item.image}" class="img-fluid rounded" style="max-height: 60px;">` : 
                                        `<div class="bg-light rounded d-flex align-items-center justify-content-center" style="height: 60px;"><i class="fas fa-image text-muted"></i></div>`
                                    }
                                </div>
                                <div class="col-6">
                                    <h6 class="mb-1">${item.name}</h6>
                                    <small class="text-muted">$${item.price.toFixed(2)} each</small>
                                </div>
                                <div class="col-3">
                                    <div class="quantity-control mb-2">
                                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <span class="mx-2">${item.quantity}</span>
                                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                cartItems.html(html);
            }
            
            updateCartTotals();
        }
        
        function updateCartTotals() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.085; // 8.5% tax
            const total = subtotal + tax;
            
            $('#subtotalAmount').text('$' + subtotal.toFixed(2));
            $('#taxAmount').text('$' + tax.toFixed(2));
            $('#finalTotal').text('$' + total.toFixed(2));
        }
        
        function updateFloatingCart() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (totalItems > 0) {
                $('#cartCount').text(totalItems);
                $('#cartTotal').text(totalAmount.toFixed(2));
                $('#floatingCart').show();
            } else {
                $('#floatingCart').hide();
            }
        }
        
        function toggleCart() {
            const sidebar = $('#cartSidebar');
            const overlay = $('#cartOverlay');
            
            if (sidebar.hasClass('open')) {
                sidebar.removeClass('open');
                overlay.removeClass('show');
            } else {
                sidebar.addClass('open');
                overlay.addClass('show');
            }
        }
        
        function filterByCategory(category) {
            $('.product-item').each(function() {
                const itemCategory = $(this).data('category').toString();
                
                if (category === 'all' || itemCategory === category.toString()) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            
            checkEmptyResults();
        }
        
        function filterBySearch(searchTerm) {
            $('.product-item').each(function() {
                const name = $(this).data('name');
                const description = $(this).data('description');
                
                if (name.includes(searchTerm) || description.includes(searchTerm)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            
            checkEmptyResults();
        }
        
        function checkEmptyResults() {
            const visibleItems = $('.product-item:visible').length;
            
            if (visibleItems === 0) {
                $('#noResults').show();
                $('#productsGrid').hide();
            } else {
                $('#noResults').hide();
                $('#productsGrid').show();
            }
        }
        
        function showNotification(message, type = 'success') {
            const notification = $(`
                <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed" 
                     style="top: 20px; left: 50%; transform: translateX(-50%); z-index: 1060; min-width: 300px;">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    ${message}
                </div>
            `);
            
            $('body').append(notification);
            setTimeout(() => notification.fadeOut(), 3000);
        }
    </script>
</body>
</html>