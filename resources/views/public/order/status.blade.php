<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status - {{ $restaurant_name ?? 'TeaShop' }}</title>
    
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
        
        .success-header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 3rem 0;
            text-align: center;
        }
        
        .order-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: var(--card-shadow);
        }
        
        .status-timeline {
            position: relative;
            padding-left: 40px;
        }
        
        .timeline-item {
            position: relative;
            padding: 1.5rem 0;
            border-left: 3px solid #e9ecef;
        }
        
        .timeline-item.completed {
            border-left-color: #28a745;
        }
        
        .timeline-item.active {
            border-left-color: var(--primary-color);
        }
        
        .timeline-marker {
            position: absolute;
            left: -12px;
            top: 2rem;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #e9ecef;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .timeline-item.completed .timeline-marker {
            background: #28a745;
        }
        
        .timeline-item.active .timeline-marker {
            background: var(--primary-color);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .timeline-content {
            padding-left: 2rem;
        }
        
        .order-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            background: #f8f9fa;
        }
        
        .item-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
            margin-right: 1rem;
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
        
        .status-badge {
            font-size: 1.1rem;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-weight: 600;
        }
        
        .order-info {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
        }
        
        .info-item {
            margin-bottom: 1rem;
        }
        
        .info-item:last-child {
            margin-bottom: 0;
        }
        
        .refresh-indicator {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.85rem;
            z-index: 1050;
        }
        
        .estimated-time {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
            margin: 2rem 0;
        }
        
        .contact-info {
            background: #e9ecef;
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .success-header {
                padding: 2rem 0;
            }
            
            .order-card {
                padding: 1.5rem;
            }
            
            .timeline-content {
                padding-left: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="success-header">
        <div class="container">
            <i class="fas fa-check-circle fa-4x mb-3"></i>
            <h1>Order {{ isset($order) ? 'Placed Successfully!' : 'Status' }}</h1>
            @if(isset($order))
                <h3 class="mb-0">Order #{{ $order->order_number }}</h3>
                <p class="mb-0 opacity-75">{{ $order->created_at->format('M j, Y \\a\\t g:i A') }}</p>
            @endif
        </div>
    </div>
    
    <div class="container my-5">
        @if(isset($order))
            <div class="row">
                <!-- Order Status & Timeline -->
                <div class="col-lg-8">
                    <div class="order-card">
                        <h4 class="mb-4">Order Status</h4>
                        
                        <!-- Current Status Badge -->
                        <div class="text-center mb-4">
                            @php
                                $statusColors = [
                                    'pending' => 'warning',
                                    'confirmed' => 'info', 
                                    'preparing' => 'primary',
                                    'ready' => 'success',
                                    'delivered' => 'dark',
                                    'cancelled' => 'danger'
                                ];
                                $statusColor = $statusColors[$order->status] ?? 'secondary';
                            @endphp
                            <span class="badge bg-{{ $statusColor }} status-badge">
                                {{ ucfirst($order->status) }}
                            </span>
                        </div>
                        
                        <!-- Timeline -->
                        <div class="status-timeline">
                            <div class="timeline-item {{ $order->status != 'cancelled' ? 'completed' : '' }}">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Order Placed</h6>
                                    <p class="text-muted mb-0">{{ $order->created_at->format('g:i A') }}</p>
                                    <small class="text-success">Your order has been received</small>
                                </div>
                            </div>
                            
                            <div class="timeline-item {{ in_array($order->status, ['confirmed', 'preparing', 'ready', 'delivered']) ? 'completed' : ($order->status == 'confirmed' ? 'active' : '') }}">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Order Confirmed</h6>
                                    <p class="text-muted mb-0">\n                                        @if(in_array($order->status, ['confirmed', 'preparing', 'ready', 'delivered']))\n                                            Confirmed\n                                        @elseif($order->status == 'cancelled')\n                                            Cancelled\n                                        @else\n                                            Waiting for confirmation...\n                                        @endif\n                                    </p>\n                                    <small class="text-muted">Restaurant has confirmed your order</small>\n                                </div>\n                            </div>\n                            \n                            <div class="timeline-item {{ in_array($order->status, ['preparing', 'ready', 'delivered']) ? 'completed' : ($order->status == 'preparing' ? 'active' : '') }}\">\n                                <div class=\"timeline-marker\"></div>\n                                <div class=\"timeline-content\">\n                                    <h6>Preparing</h6>\n                                    <p class=\"text-muted mb-0\">\n                                        @if(in_array($order->status, ['preparing', 'ready', 'delivered']))\n                                            In kitchen\n                                        @else\n                                            Waiting to start...\n                                        @endif\n                                    </p>\n                                    <small class=\"text-muted\">Your order is being prepared</small>\n                                </div>\n                            </div>\n                            \n                            <div class=\"timeline-item {{ in_array($order->status, ['ready', 'delivered']) ? 'completed' : ($order->status == 'ready' ? 'active' : '') }}\">\n                                <div class=\"timeline-marker\"></div>\n                                <div class=\"timeline-content\">\n                                    <h6>Ready for Pickup</h6>\n                                    <p class=\"text-muted mb-0\">\n                                        @if($order->status == 'ready')\n                                            Ready now!\n                                        @elseif($order->status == 'delivered')\n                                            Completed\n                                        @else\n                                            Estimated: 10-15 minutes\n                                        @endif\n                                    </p>\n                                    <small class=\"text-muted\">Order is ready at counter</small>\n                                </div>\n                            </div>\n                            \n                            <div class=\"timeline-item {{ $order->status == 'delivered' ? 'completed' : ($order->status == 'delivered' ? 'active' : '') }}\">\n                                <div class=\"timeline-marker\"></div>\n                                <div class=\"timeline-content\">\n                                    <h6>Order Complete</h6>\n                                    <p class=\"text-muted mb-0\">\n                                        @if($order->status == 'delivered')\n                                            Enjoy your meal!\n                                        @else\n                                            Pending pickup\n                                        @endif\n                                    </p>\n                                    <small class=\"text-muted\">Order delivered to table</small>\n                                </div>\n                            </div>\n                        </div>\n                        \n                        <!-- Estimated Time -->\n                        @if(!in_array($order->status, ['delivered', 'cancelled']))\n                            <div class=\"estimated-time\">\n                                <h6 class=\"text-warning mb-2\">\n                                    <i class=\"fas fa-clock me-2\"></i>Estimated Time\n                                </h6>\n                                @php\n                                    $estimatedMinutes = match($order->status) {\n                                        'pending' => '15-20',\n                                        'confirmed' => '15-20',\n                                        'preparing' => '8-12',\n                                        'ready' => '0',\n                                        default => '10-15'\n                                    };\n                                @endphp\n                                <p class=\"mb-0\">\n                                    @if($order->status == 'ready')\n                                        Your order is ready for pickup!\n                                    @else\n                                        {{ $estimatedMinutes }} minutes remaining\n                                    @endif\n                                </p>\n                            </div>\n                        @endif\n                    </div>\n                    \n                    <!-- Order Items -->\n                    <div class=\"order-card\">\n                        <h5 class=\"mb-3\">Order Details</h5>\n                        \n                        @foreach($order->orderItems as $item)\n                            <div class=\"order-item\">\n                                @if($item->product->image)\n                                    <img src=\"{{ $item->product->image_url }}\" alt=\"{{ $item->product->name }}\" class=\"item-image\">\n                                @else\n                                    <div class=\"item-image bg-light d-flex align-items-center justify-content-center\">\n                                        <i class=\"fas fa-image text-muted\"></i>\n                                    </div>\n                                @endif\n                                \n                                <div class=\"flex-grow-1\">\n                                    <h6 class=\"mb-1\">{{ $item->product->name }}</h6>\n                                    <small class=\"text-muted\">Quantity: {{ $item->quantity }}</small>\n                                </div>\n                                \n                                <div class=\"text-end\">\n                                    <strong>${{ number_format($item->total_price, 2) }}</strong>\n                                    <br><small class=\"text-muted\">${{ number_format($item->unit_price, 2) }} each</small>\n                                </div>\n                            </div>\n                        @endforeach\n                        \n                        @if($order->customer_notes)\n                            <div class=\"alert alert-info mt-3\">\n                                <h6><i class=\"fas fa-sticky-note me-2\"></i>Special Instructions</h6>\n                                <p class=\"mb-0\">{{ $order->customer_notes }}</p>\n                            </div>\n                        @endif\n                    </div>\n                </div>\n                \n                <!-- Order Summary Sidebar -->\n                <div class=\"col-lg-4\">\n                    <!-- Order Info -->\n                    <div class=\"order-info mb-4\">\n                        <h5 class=\"mb-3\">Order Information</h5>\n                        \n                        <div class=\"info-item\">\n                            <div class=\"d-flex justify-content-between align-items-center\">\n                                <span><i class=\"fas fa-hashtag me-2\"></i>Order #</span>\n                                <strong>{{ $order->order_number }}</strong>\n                            </div>\n                        </div>\n                        \n                        <div class=\"info-item\">\n                            <div class=\"d-flex justify-content-between align-items-center\">\n                                <span><i class=\"fas fa-chair me-2\"></i>Table</span>\n                                <strong>{{ $order->table->table_number }}</strong>\n                            </div>\n                        </div>\n                        \n                        <div class=\"info-item\">\n                            <div class=\"d-flex justify-content-between align-items-center\">\n                                <span><i class=\"fas fa-user me-2\"></i>Customer</span>\n                                <strong>{{ $order->customer_name }}</strong>\n                            </div>\n                        </div>\n                        \n                        @if($order->customer_phone)\n                            <div class=\"info-item\">\n                                <div class=\"d-flex justify-content-between align-items-center\">\n                                    <span><i class=\"fas fa-phone me-2\"></i>Phone</span>\n                                    <strong>{{ $order->customer_phone }}</strong>\n                                </div>\n                            </div>\n                        @endif\n                        \n                        <div class=\"info-item\">\n                            <div class=\"d-flex justify-content-between align-items-center\">\n                                <span><i class=\"fas fa-calendar me-2\"></i>Date</span>\n                                <strong>{{ $order->created_at->format('M j, Y') }}</strong>\n                            </div>\n                        </div>\n                        \n                        <div class=\"info-item\">\n                            <div class=\"d-flex justify-content-between align-items-center\">\n                                <span><i class=\"fas fa-clock me-2\"></i>Time</span>\n                                <strong>{{ $order->created_at->format('g:i A') }}</strong>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- Order Total -->\n                    <div class=\"order-card\">\n                        <h5 class=\"mb-3\">Order Total</h5>\n                        \n                        @php\n                            $subtotal = $order->items->sumorderI'total_price');\n                            $tax = $subtotal * 0.085;\n                            $serviceFee = 2.50;\n                            $total = $subtotal + $tax + $serviceFee;\n                        @endphp\n                        \n                        <div class=\"d-flex justify-content-between mb-2\">\n                            <span>Subtotal:</span>\n                            <span>${{ number_format($subtotal, 2) }}</span>\n                        </div>\n                        \n                        <div class=\"d-flex justify-content-between mb-2\">\n                            <span>Tax (8.5%):</span>\n                            <span>${{ number_format($tax, 2) }}</span>\n                        </div>\n                        \n                        <div class=\"d-flex justify-content-between mb-3\">\n                            <span>Service Fee:</span>\n                            <span>${{ number_format($serviceFee, 2) }}</span>\n                        </div>\n                        \n                        <hr>\n                        \n                        <div class=\"d-flex justify-content-between\">\n                            <h5>Total:</h5>\n                            <h5 class=\"text-primary\">${{ number_format($order->total_amount, 2) }}</h5>\n                        </div>\n                        \n                        <div class=\"mt-3\">\n                            @php\n                                $paymentMethods = [\n                                    'cash' => 'Cash Payment',\n                                    'card' => 'Card Payment',\n                                    'digital' => 'Digital Wallet'\n                                ];\n                            @endphp\n                            <small class=\"text-muted\">\n                                Payment: {{ $paymentMethods[$order->payment_method ?? 'cash'] ?? 'Cash Payment' }}\n                            </small>\n                        </div>\n                    </div>\n                    \n                    <!-- Action Buttons -->\n                    <div class=\"d-grid gap-2\">\n                        <button class=\"btn btn-primary\" onclick=\"refreshStatus()\">\n                            <i class=\"fas fa-sync me-2\"></i>Refresh Status\n                        </button>\n                        \n                        @if($order->status == 'ready')\n                            <div class=\"alert alert-success text-center mt-3\">\n                                <h6><i class=\"fas fa-bell me-2\"></i>Order Ready!</h6>\n                                <p class=\"mb-0\">Please collect your order from the counter</p>\n                            </div>\n                        @endif\n                        \n                        <a href=\"{{ route('public.menu') }}\" class=\"btn btn-outline-primary\">\n                            <i class=\"fas fa-utensils me-2\"></i>Order More\n                        </a>\n                    </div>\n                    \n                    <!-- Contact Info -->\n                    <div class=\"contact-info mt-4\">\n                        <h6 class=\"mb-2\">Need Help?</h6>\n                        <p class=\"mb-2\">Contact our staff at the counter or call:</p>\n                        <strong>{{ $restaurant_phone ?? '(555) 123-4567' }}</strong>\n                    </div>\n                </div>\n            </div>\n        @else\n            <!-- Error state -->\n            <div class=\"text-center py-5\">\n                <i class=\"fas fa-exclamation-triangle fa-4x text-warning mb-3\"></i>\n                <h3>Order Not Found</h3>\n                <p class=\"text-muted mb-4\">The order you're looking for doesn't exist or has been removed.</p>\n                <a href=\"{{ route('public.menu') }}\" class=\"btn btn-primary\">\n                    <i class=\"fas fa-utensils me-2\"></i>View Menu\n                </a>\n            </div>\n        @endif\n    </div>\n    \n    <!-- Auto-refresh indicator -->\n    @if(isset($order) && !in_array($order->status, ['delivered', 'cancelled']))\n        <div class=\"refresh-indicator\" id=\"refreshIndicator\">\n            <i class=\"fas fa-sync fa-spin me-1\"></i> Auto-refreshing...\n        </div>\n    @endif\n    \n    <!-- Bootstrap JS -->\n    <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js\"></script>\n    <!-- jQuery -->\n    <script src=\"https://code.jquery.com/jquery-3.7.0.min.js\"></script>\n    \n    <script>\n        $(document).ready(function() {\n            @if(isset($order) && !in_array($order->status, ['delivered', 'cancelled']))\n                // Auto-refresh every 30 seconds for pending orders\n                setInterval(function() {\n                    refreshStatus();\n                }, 30000);\n            @endif\n        });\n        \n        function refreshStatus() {\n            @if(isset($order))\n                $('#refreshIndicator').show();\n                \n                $.get('{{ route(\"public.order.status\", $order->order_number ?? \"\") }}')\n                    .done(function(response) {\n                        if (response.status !== '{{ $order->status ?? \"\" }}') {\n                            location.reload();\n                        }\n                    })\n                    .fail(function() {\n                        console.log('Failed to refresh order status');\n                    })\n                    .always(function() {\n                        setTimeout(() => $('#refreshIndicator').hide(), 1000);\n                    });\n            @endif\n        }\n        \n        // Show notification if order is ready\n        @if(isset($order) && $order->status == 'ready')\n            // Could integrate with browser notifications here\n            if (Notification.permission === \"granted\") {\n                new Notification(\"Order Ready!\", {\n                    body: \"Your order #{{ $order->order_number }} is ready for pickup.\",\n                    icon: \"/favicon.ico\"\n                });\n            }\n        @endif\n    </script>\n</body>\n</html>