<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - {{ $restaurant_name ?? 'TeaShop' }}</title>
    
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
        
        .checkout-header {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            padding: 2rem 0;
        }
        
        .step-indicator {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: var(--card-shadow);
        }
        
        .step {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .step:last-child {
            margin-bottom: 0;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 1rem;
            border: 2px solid #ddd;
            background: white;
            color: var(--text-light);
        }
        
        .step.active .step-number {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .step.completed .step-number {
            background: #28a745;
            color: white;
            border-color: #28a745;
        }
        
        .checkout-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: var(--card-shadow);
        }
        
        .order-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #f1f3f4;
        }
        
        .order-item:last-child {
            border-bottom: none;
        }
        
        .item-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            margin-right: 1rem;
        }
        
        .item-details {
            flex-grow: 1;
        }
        
        .item-price {
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .form-floating {
            margin-bottom: 1rem;
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
            padding: 0.75rem 2rem;
            font-weight: 600;
        }
        
        .btn-outline-primary:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
        }
        
        .order-summary {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
        }
        
        .total-amount {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .table-info {
            background: var(--accent-color);
            color: white;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .payment-option {
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .payment-option:hover,
        .payment-option.selected {
            border-color: var(--primary-color);
            background: rgba(44, 85, 48, 0.05);
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .loading-spinner {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="checkout-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col">
                    <h2>Checkout</h2>
                    <p class="mb-0">Complete your order</p>
                </div>
                <div class="col-auto">
                    <a href="{{ route('public.menu') }}" class="btn btn-outline-light">
                        <i class="fas fa-arrow-left me-2"></i>Back to Menu
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container my-5">
        <!-- Progress Steps -->
        <div class="step-indicator">
            <div class="step active" id="step1">
                <div class="step-number">1</div>
                <div>
                    <h6 class="mb-0">Review Order</h6>
                    <small class="text-muted">Check your items and table</small>
                </div>
            </div>
            <div class="step" id="step2">
                <div class="step-number">2</div>
                <div>
                    <h6 class="mb-0">Customer Info</h6>
                    <small class="text-muted">Enter your details</small>
                </div>
            </div>
            <div class="step" id="step3">
                <div class="step-number">3</div>
                <div>
                    <h6 class="mb-0">Payment</h6>
                    <small class="text-muted">Choose payment method</small>
                </div>
            </div>
        </div>
        
        <div class="row">
            <!-- Main Content -->
            <div class="col-lg-8">
                <!-- Step 1: Order Review -->
                <div class="checkout-card" id="orderReview">
                    <h4 class="mb-4">Order Review</h4>
                    
                    <!-- Table Information -->
                    <div class="table-info">
                        @php $tableNum = session('selected_table_number') ?? session('table_number'); @endphp
                        @if($tableNum)
                            <h5 class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>Table {{ $tableNum }}</h5>
                            <small>Your selected table</small>
                        @else
                            <h5 class="mb-0"><i class="fas fa-exclamation-circle me-2"></i>No table selected</h5>
                            <small><a href="{{ route('menu') }}" class="text-white">Go back and select a table</a></small>
                        @endif
                    </div>
                    
                    <!-- Order Items -->
                    <div id="orderItems">
                        <div class="text-center py-4">
                            <i class="fas fa-spinner fa-spin fa-2x"></i>
                            <p class="mt-2">Loading your order...</p>
                        </div>
                    </div>

                    <!-- Location Prompt -->
                    <div class="mt-4 p-3 border rounded" id="locationSection">
                        <h6 class="mb-2"><i class="fas fa-map-marker-alt me-2"></i>Your Location</h6>
                        <p class="text-muted mb-2" id="locationStatus">We don't have your location yet. Share it for accurate order delivery or table pinpoint.</p>
                        <div id="locationControls">
                            <button id="requestLocationBtn" class="btn btn-outline-primary btn-sm" onclick="requestLocation()">
                                <i class="fas fa-location-arrow me-2"></i>Share my location
                            </button>
                            <button id="openMapsBtn" class="btn btn-outline-secondary btn-sm" style="display:none;margin-left:8px;" onclick="openInMaps()">
                                <i class="fas fa-map me-2"></i>Open in Maps
                            </button>
                        </div>
                        <div id="locationDisplay" style="margin-top:12px;display:none;">
                            <div id="mapWrap" style="height:200px;border-radius:8px;overflow:hidden;border:1px solid #e9ecef"></div>
                            <div class="mt-2 text-muted small" id="locationCoords"></div>
                        </div>
                    </div>
                    
                    <div class="text-end mt-4">
                        <button class="btn btn-primary" onclick="nextStep(2)">
                            Continue <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Step 2: Customer Information -->
                <div class="checkout-card" id="customerInfo" style="display: none;">
                    <h4 class="mb-4">Customer Information</h4>
                    
                    <form id="customerForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="customerName" placeholder="Full Name" required>
                                    <label for="customerName">Full Name *</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="tel" class="form-control" id="customerPhone" placeholder="Phone Number" required>
                                    <label for="customerPhone">Phone Number *</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-floating">
                            <input type="email" class="form-control" id="customerEmail" placeholder="Email Address">
                            <label for="customerEmail">Email Address (optional)</label>
                        </div>
                        
                        <div class="form-floating">
                            <textarea class="form-control" id="orderNotes" placeholder="Special instructions" style="height: 100px;"></textarea>
                            <label for="orderNotes">Special Instructions (optional)</label>
                        </div>
                    </form>
                    
                    <div class="d-flex justify-content-between mt-4">
                        <button class="btn btn-outline-primary" onclick="previousStep(1)">
                            <i class="fas fa-arrow-left me-2"></i>Back
                        </button>
                        <button class="btn btn-primary" onclick="validateAndNext(3)">
                            Continue <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Step 3: Payment -->
                <div class="checkout-card" id="paymentMethod" style="display: none;">
                    <h4 class="mb-4">Payment Method</h4>
                    
                    <div class="payment-option" data-method="cash" onclick="selectPayment('cash')">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-money-bills fa-2x text-success me-3"></i>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Cash Payment</h5>
                                <p class="mb-0 text-muted">Pay with cash when your order is ready</p>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentMethod" id="cashPayment" value="cash">
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-option" data-method="card" onclick="selectPayment('card')">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-credit-card fa-2x text-primary me-3"></i>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Card Payment</h5>
                                <p class="mb-0 text-muted">Pay now with credit/debit card</p>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentMethod" id="cardPayment" value="card">
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-option" data-method="digital" onclick="selectPayment('digital')">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-mobile-alt fa-2x text-info me-3"></i>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">Digital Wallet</h5>
                                <p class="mb-0 text-muted">Pay with Apple Pay, Google Pay, or similar</p>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentMethod" id="digitalPayment" value="digital">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Card Details (shown when card is selected) -->
                    <div id="cardDetails" class="mt-4" style="display: none;">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Card payment processing will be handled securely. This is a demo implementation.
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between mt-4">
                        <button class="btn btn-outline-primary" onclick="previousStep(2)">
                            <i class="fas fa-arrow-left me-2"></i>Back
                        </button>
                        <button class="btn btn-success btn-lg" onclick="placeOrder()">
                            <i class="fas fa-check me-2"></i>Place Order
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Order Summary Sidebar -->
            <div class="col-lg-4">
                <div class="checkout-card sticky-top">
                    <h5 class="mb-3">Order Summary</h5>
                    
                    <div id="summaryItems">
                        <!-- Items will be loaded here -->
                    </div>
                    
                    <div class="order-summary mt-4">
                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span id="summarySubtotal">$0.00</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Tax (8.5%):</span>
                            <span id="summaryTax">$0.00</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Service Fee:</span>
                            <span id="summaryService">$2.50</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-0">
                            <strong>Total:</strong>
                            <span class="total-amount" id="summaryTotal">$0.00</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 text-center">
                        <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>
                            Estimated prep time: 10-15 minutes
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay" style="display: none;">
        <div class="loading-spinner">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <h5>Processing your order...</h5>
            <p class="text-muted mb-0">Please don't close this page</p>
        </div>
    </div>

    <!-- Custom Alert Modal -->
    <div id="customAlertBackdrop" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;backdrop-filter:blur(3px);transition:opacity .2s;"></div>
    <div id="customAlertModal" style="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-52%);z-index:9999;width:90%;max-width:420px;animation:alertPop .25s cubic-bezier(.4,0,.2,1);">
        <div style="background:#fff;border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.3);overflow:hidden;font-family:'Segoe UI',sans-serif;">
            <div id="alertModalHeader" style="padding:22px 24px 0;display:flex;align-items:flex-start;gap:14px;">
                <div id="alertModalIcon" style="width:46px;height:46px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:22px;"></div>
                <div style="flex:1;">
                    <div id="alertModalTitle" style="font-size:16px;font-weight:700;color:#1a2e1a;margin-bottom:4px;"></div>
                    <div id="alertModalMessage" style="font-size:14px;color:#666;line-height:1.5;"></div>
                </div>
            </div>
            <div style="padding:20px 24px 22px;display:flex;justify-content:flex-end;">
                <button onclick="closeCustomAlert()" id="alertModalBtn"
                    style="padding:10px 28px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity .18s;">
                    OK
                </button>
            </div>
        </div>
    </div>
    <style>
        @keyframes alertPop { from { transform:translate(-50%,-48%); opacity:0; } to { transform:translate(-50%,-52%); opacity:1; } }
    </style>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    
    <script>
        let cart = JSON.parse(localStorage.getItem('teashop_cart') || '[]');
        // Normalise: if cart is an object (old menu format) convert to array
        if (!Array.isArray(cart)) {
            cart = Object.keys(cart).map(id => ({
                id: parseInt(id),
                name: cart[id].name,
                price: cart[id].price,
                quantity: cart[id].qty || cart[id].quantity || 1,
                image: cart[id].image || ''
            }));
        }
        let selectedPayment = null;
        // Location state
        let customerLat = localStorage.getItem('teashop_customer_lat') || null;
        let customerLng = localStorage.getItem('teashop_customer_lng') || null;
        let customerAddress = localStorage.getItem('teashop_customer_address') || null;
        
        $(document).ready(function() {
            loadOrderItems();
            updateOrderSummary();
            
            // Check if cart is empty
            if (cart.length === 0) {
                window.location.href = '{{ route("public.menu") }}';
                return;
            }

            // Initialize location UI
            initLocationUI();
        });

        function initLocationUI() {
            if (customerLat && customerLng) {
                $('#locationStatus').text('Location captured.');
                showLocationDisplay(customerLat, customerLng, customerAddress);
            } else {
                $('#locationStatus').text("We don't have your location yet. Share it for accurate order delivery or table pinpoint.");
                $('#locationDisplay').hide();
            }
        }

        async function requestLocation() {
            $('#requestLocationBtn').prop('disabled', true).text('Requesting...');

            // Try Capacitor Geolocation plugin first (when running inside the app)
            try {
                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Geolocation) {
                    const { Geolocation } = window.Capacitor.Plugins;
                    // request permissions if plugin supports it
                    if (Geolocation.requestPermissions) {
                        await Geolocation.requestPermissions();
                    }
                    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
                    handleLocationSuccess(pos.coords.latitude, pos.coords.longitude);
                    return;
                }
            } catch (err) {
                console.warn('Capacitor Geolocation failed, falling back to browser API', err);
            }

            // Browser fallback
            if (!navigator.geolocation) {
                showAlert('Geolocation is not supported by your browser.', 'error', 'Location Unavailable');
                $('#requestLocationBtn').prop('disabled', false).text('Share my location');
                return;
            }

            navigator.geolocation.getCurrentPosition(function(position) {
                handleLocationSuccess(position.coords.latitude, position.coords.longitude);
            }, function(error) {
                console.error('Geolocation error', error);
                showAlert('Unable to get your location. Please enable location services and try again.', 'error', 'Location Error');
                $('#requestLocationBtn').prop('disabled', false).text('Share my location');
            }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
        }

        async function handleLocationSuccess(lat, lng) {
            customerLat = lat;
            customerLng = lng;
            localStorage.setItem('teashop_customer_lat', lat);
            localStorage.setItem('teashop_customer_lng', lng);
            $('#locationStatus').text('Location acquired.');
            $('#requestLocationBtn').prop('disabled', false).text('Share my location');

            // Try reverse geocoding with Nominatim (OpenStreetMap) to obtain a friendly address
            customerAddress = null;
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`);
                if (res.ok) {
                    const data = await res.json();
                    customerAddress = data.display_name || null;
                    if (customerAddress) {
                        localStorage.setItem('teashop_customer_address', customerAddress);
                    }
                }
            } catch (err) {
                console.warn('Reverse geocode failed', err);
            }

            showLocationDisplay(lat, lng, customerAddress);

            // Notify native app to show a persistent notification while location is active
            try {
                const title = 'TeaShop: Location Sharing Active';
                const text = customerAddress ? customerAddress : `Sharing your location (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
                // Prefer Capacitor plugin if available
                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocationNotifier && window.Capacitor.Plugins.LocationNotifier.show) {
                    window.Capacitor.Plugins.LocationNotifier.show({ title, text });
                } else if (window.AndroidLocationNotifier && window.AndroidLocationNotifier.show) {
                    // Fallback to JS interface added in MainActivity
                    window.AndroidLocationNotifier.show(title, text);
                }
            } catch (err) {
                console.warn('LocationNotifier call failed', err);
            }
        }

        function showLocationDisplay(lat, lng, address) {
            $('#locationDisplay').show();
            const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
            $('#mapWrap').html(`<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`);
            $('#locationCoords').text(address ? address + ` — (${lat.toFixed(6)}, ${lng.toFixed(6)})` : `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            $('#openMapsBtn').show().data('lat', lat).data('lng', lng);
        }

        function openInMaps() {
            const lat = $('#openMapsBtn').data('lat');
            const lng = $('#openMapsBtn').data('lng');
            if (!lat || !lng) return;
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            window.open(url, '_blank');
        }
        
        function loadOrderItems() {
            let html = '';
            
            if (cart.length === 0) {
                html = `
                    <div class="text-center py-4">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5>Your cart is empty</h5>
                        <a href="{{ route('public.menu') }}" class="btn btn-primary">Go to Menu</a>
                    </div>
                `;
            } else {
                cart.forEach(item => {
                    html += `
                        <div class="order-item">
                            ${item.image ? 
                                `<img src="${item.image}" alt="${item.name}" class="item-image">` :
                                `<div class="item-image bg-light d-flex align-items-center justify-content-center"><i class="fas fa-image text-muted"></i></div>`
                            }
                            <div class="item-details">
                                <h6 class="mb-1">${item.name}</h6>
                                <small class="text-muted">Quantity: ${item.quantity}</small>
                            </div>
                            <div class="item-price">
                                $${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    `;
                });
            }
            
            $('#orderItems').html(html);
        }
        
        function updateOrderSummary() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.085;
            const serviceFee = 2.50;
            const total = subtotal + tax + serviceFee;
            
            $('#summarySubtotal').text('$' + subtotal.toFixed(2));
            $('#summaryTax').text('$' + tax.toFixed(2));
            $('#summaryService').text('$' + serviceFee.toFixed(2));
            $('#summaryTotal').text('$' + total.toFixed(2));
            
            // Update summary items
            let summaryHtml = '';
            cart.forEach(item => {
                summaryHtml += `
                    <div class="d-flex justify-content-between mb-2">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
            });
            $('#summaryItems').html(summaryHtml);
        }
        
        function nextStep(step) {
            // Hide all steps
            $('.checkout-card').hide();
            $('.step').removeClass('active').removeClass('completed');
            
            // Show target step
            if (step === 2) {
                $('#step1').addClass('completed');
                $('#step2').addClass('active');
                $('#customerInfo').show();
            } else if (step === 3) {
                $('#step1, #step2').addClass('completed');
                $('#step3').addClass('active');
                $('#paymentMethod').show();
            }
        }
        
        function previousStep(step) {
            // Hide all steps
            $('.checkout-card').hide();
            $('.step').removeClass('active').removeClass('completed');
            
            // Show target step
            if (step === 1) {
                $('#step1').addClass('active');
                $('#orderReview').show();
            } else if (step === 2) {
                $('#step1').addClass('completed');
                $('#step2').addClass('active');
                $('#customerInfo').show();
            }
        }
        
        /* ── Custom Alert ─────────────────────────────────────────── */
        function showAlert(message, type = 'warning', title = null) {
            const configs = {
                warning: { icon: '⚠️', bg: '#fff8e1', iconBg: '#fff3cd', btnBg: '#f0ad4e', btnColor: '#fff', defaultTitle: 'Please Note' },
                error:   { icon: '✕',  bg: '#fff5f5', iconBg: '#ffd5d5', btnBg: '#e53935', btnColor: '#fff', defaultTitle: 'Error' },
                success: { icon: '✓',  bg: '#f0fff4', iconBg: '#d4edda', btnBg: '#4a8c3f', btnColor: '#fff', defaultTitle: 'Success' },
                info:    { icon: 'ℹ',  bg: '#f0f8ff', iconBg: '#cce5ff', btnBg: '#2d5a27', btnColor: '#fff', defaultTitle: 'Info' },
            };
            const c = configs[type] || configs.warning;
            document.getElementById('customAlertModal').style.background = c.bg;
            document.getElementById('alertModalIcon').style.background = c.iconBg;
            document.getElementById('alertModalIcon').textContent = c.icon;
            document.getElementById('alertModalTitle').textContent = title || c.defaultTitle;
            document.getElementById('alertModalMessage').textContent = message;
            const btn = document.getElementById('alertModalBtn');
            btn.style.background = c.btnBg; btn.style.color = c.btnColor;
            document.getElementById('customAlertBackdrop').style.display = 'block';
            document.getElementById('customAlertModal').style.display  = 'block';
        }
        function closeCustomAlert() {
            document.getElementById('customAlertBackdrop').style.display = 'none';
            document.getElementById('customAlertModal').style.display  = 'none';
        }
        /* ────────────────────────────────────────────────────────────── */

        function validateAndNext(step) {
            const name = $('#customerName').val().trim();
            const phone = $('#customerPhone').val().trim();
            
            if (!name || !phone) {
                showAlert('Please fill in your full name and phone number to continue.', 'warning', 'Required Fields');
                return;
            }
            
            // Validate phone number (basic)
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(phone)) {
                showAlert('Please enter a valid phone number (digits, spaces, + and - only).', 'warning', 'Invalid Phone Number');
                return;
            }
            
            nextStep(step);
        }
        
        function selectPayment(method) {
            selectedPayment = method;
            
            // Update UI
            $('.payment-option').removeClass('selected');
            $(`.payment-option[data-method="${method}"]`).addClass('selected');
            $(`input[value="${method}"]`).prop('checked', true);
            
            // Show/hide card details
            if (method === 'card') {
                $('#cardDetails').show();
            } else {
                $('#cardDetails').hide();
            }
        }
        
        function placeOrder() {
            // Validate all required fields
            const name = $('#customerName').val().trim();
            const phone = $('#customerPhone').val().trim();
            
            if (!name || !phone) {
                showAlert('Please go back and complete your name and phone number.', 'warning', 'Missing Information');
                previousStep(2);
                return;
            }
            
            if (!selectedPayment) {
                showAlert('Please choose a payment method before placing your order.', 'warning', 'Payment Required');
                return;
            }
            
            if (!cart || cart.length === 0) {
                showAlert('Your cart is empty. Please add items from the menu first.', 'error', 'Empty Cart');
                return;
            }
            
            // Show loading
            $('#loadingOverlay').show();
            
            // Prepare order data — send flat fields that OrderController::place() validates
            const orderData = {
                customer_name:   name,
                customer_phone:  phone,
                customer_email:  $('#customerEmail').val().trim(),
                notes:           $('#orderNotes').val().trim(),
                payment_method:  selectedPayment,
                table_number:    '{{ session('selected_table_number', '') }}',
                customer_lat:    customerLat || '',
                customer_lng:    customerLng || '',
                customer_address: customerAddress || '',
                items:           cart,   // fallback: server reads session cart first, then these
                _token:          '{{ csrf_token() }}'
            };
            
            // Submit order
            $.post('{{ route("public.place-order") }}', orderData)
                .done(function(response) {
                    if (response.success) {
                        // Clear cart
                        localStorage.removeItem('teashop_cart');
                        localStorage.removeItem('teashop_table');
                        localStorage.removeItem('teashop_table_number');

                        // Show mobile OS notification if running inside app
                        try {
                            const notifyTitle = 'TeaShop Order Placed';
                            const notifyText  = 'Your order has been placed successfully.';
                            if (window.AndroidLocationNotifier && typeof window.AndroidLocationNotifier.showSimple === 'function') {
                                window.AndroidLocationNotifier.showSimple(notifyTitle, notifyText);
                            }
                        } catch (e) {
                            console.warn('Order notification failed', e);
                        }
                        
                        // Redirect to success page
                        window.location.href = response.redirect_url;
                    } else {
                        showAlert(response.message || 'Failed to place order. Please try again.', 'error', 'Order Failed');
                    }
                })
                .fail(function(xhr) {
                    console.error('Order submission failed:', xhr);
                    const msg = xhr.responseJSON?.message || xhr.responseJSON?.errors?.table_number?.[0] || 'Something went wrong. Please try again.';
                    showAlert(msg, 'error', 'Order Failed');
                })
                .always(function() {
                    $('#loadingOverlay').hide();
                    // Clear native persistent notification (if present) after order attempt
                    try {
                        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocationNotifier && window.Capacitor.Plugins.LocationNotifier.clear) {
                            window.Capacitor.Plugins.LocationNotifier.clear();
                        } else if (window.AndroidLocationNotifier && window.AndroidLocationNotifier.clear) {
                            window.AndroidLocationNotifier.clear();
                        }
                    } catch (err) {
                        console.warn('Clearing LocationNotifier failed', err);
                    }
                });
        }
    </script>
</body>
</html>