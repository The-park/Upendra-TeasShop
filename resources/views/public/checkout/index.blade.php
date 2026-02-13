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
                        <h5 class="mb-0">Table {{ session('table_number', '?') }}</h5>
                        <small>Your selected table</small>
                    </div>
                    
                    <!-- Order Items -->
                    <div id="orderItems">
                        <div class="text-center py-4">
                            <i class="fas fa-spinner fa-spin fa-2x"></i>
                            <p class="mt-2">Loading your order...</p>
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
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    
    <script>
        let cart = JSON.parse(localStorage.getItem('teashop_cart') || '[]');
        let selectedPayment = null;
        
        $(document).ready(function() {
            loadOrderItems();
            updateOrderSummary();
            
            // Check if cart is empty
            if (cart.length === 0) {
                window.location.href = '{{ route("public.menu") }}';
                return;
            }
        });
        
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
        
        function validateAndNext(step) {
            const name = $('#customerName').val().trim();
            const phone = $('#customerPhone').val().trim();
            
            if (!name || !phone) {
                alert('Please fill in all required fields (Name and Phone)');
                return;
            }
            
            // Validate phone number (basic)
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
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
                alert('Please complete all required customer information');
                previousStep(2);
                return;
            }
            
            if (!selectedPayment) {
                alert('Please select a payment method');
                return;
            }
            
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            // Show loading
            $('#loadingOverlay').show();
            
            // Prepare order data
            const orderData = {
                cart: cart,
                customer: {
                    name: name,
                    phone: phone,
                    email: $('#customerEmail').val().trim(),
                    notes: $('#orderNotes').val().trim()
                },
                payment_method: selectedPayment,
                table_number: {{ session('table_number', 'null') }},
                _token: '{{ csrf_token() }}'
            };
            
            // Submit order
            $.post('{{ route("public.place-order") }}', orderData)
                .done(function(response) {
                    if (response.success) {
                        // Clear cart
                        localStorage.removeItem('teashop_cart');
                        localStorage.removeItem('teashop_table');
                        localStorage.removeItem('teashop_table_number');
                        
                        // Redirect to success page
                        window.location.href = response.redirect_url;
                    } else {
                        alert('Error: ' + (response.message || 'Failed to place order'));
                    }
                })
                .fail(function(xhr) {
                    console.error('Order submission failed:', xhr);
                    alert('Failed to place order. Please try again.');
                })
                .always(function() {
                    $('#loadingOverlay').hide();
                });
        }
    </script>
</body>
</html>