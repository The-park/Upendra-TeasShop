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
                {{-- Cash payment notice --}}
                @if($order->payment_status !== 'paid')
                <div class="col-12 mb-3">
                    <div style="background:#fff8e1;border:1.5px solid #ffe082;border-radius:14px;padding:18px 22px;display:flex;align-items:center;gap:14px;">
                        <i class="fas fa-coins fa-2x" style="color:#f59e0b;flex-shrink:0;"></i>
                        <div>
                            <strong style="font-size:16px;color:#92400e;">Cash Payment Required</strong>
                            <p class="mb-0 mt-1" style="color:#78350f;font-size:14px;">
                                Please pay <strong>${{ number_format($order->total_amount, 2) }}</strong>
                                at the counter when your order is ready. Our staff will collect payment at your table.
                            </p>
                        </div>
                    </div>
                </div>
                @else
                <div class="col-12 mb-3">
                    <div style="background:#f0faf4;border:1.5px solid #6ee7b7;border-radius:14px;padding:14px 22px;display:flex;align-items:center;gap:14px;">
                        <i class="fas fa-check-circle fa-2x" style="color:#059669;flex-shrink:0;"></i>
                        <div>
                            <strong style="font-size:16px;color:#065f46;">Payment Received</strong>
                            <p class="mb-0 mt-1" style="color:#047857;font-size:14px;">
                                Thank you! Your payment of <strong>${{ number_format($order->total_amount, 2) }}</strong> has been recorded.
                            </p>
                        </div>
                    </div>
                </div>
                @endif

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
                                    <p class="text-muted mb-0">
                                        @if(in_array($order->status, ['confirmed', 'preparing', 'ready', 'delivered']))
                                            Confirmed
                                        @elseif($order->status == 'cancelled')
                                            Cancelled
                                        @else
                                            Waiting for confirmation...
                                        @endif
                                    </p>
                                    <small class="text-muted">Restaurant has confirmed your order</small>
                                </div>
                            </div>

                            <div class="timeline-item {{ in_array($order->status, ['preparing', 'ready', 'delivered']) ? 'completed' : ($order->status == 'preparing' ? 'active' : '') }}">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Preparing</h6>
                                    <p class="text-muted mb-0">
                                        @if(in_array($order->status, ['preparing', 'ready', 'delivered']))
                                            In kitchen
                                        @else
                                            Waiting to start...
                                        @endif
                                    </p>
                                    <small class="text-muted">Your order is being prepared</small>
                                </div>
                            </div>

                            <div class="timeline-item {{ in_array($order->status, ['ready', 'delivered']) ? 'completed' : ($order->status == 'ready' ? 'active' : '') }}">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Ready for Pickup</h6>
                                    <p class="text-muted mb-0">
                                        @if($order->status == 'ready')
                                            Ready now!
                                        @elseif($order->status == 'delivered')
                                            Completed
                                        @else
                                            Estimated: 10-15 minutes
                                        @endif
                                    </p>
                                    <small class="text-muted">Order is ready at counter</small>
                                </div>
                            </div>

                            <div class="timeline-item {{ $order->status == 'delivered' ? 'completed' : '' }}">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Order Complete</h6>
                                    <p class="text-muted mb-0">
                                        @if($order->status == 'delivered')
                                            Enjoy your meal!
                                        @else
                                            Pending delivery
                                        @endif
                                    </p>
                                    <small class="text-muted">Order delivered to table</small>
                                </div>
                            </div>
                        </div>

                        <!-- Estimated Time -->
                        @if(!in_array($order->status, ['delivered', 'cancelled']))
                            <div class="estimated-time">
                                <h6 class="text-warning mb-2">
                                    <i class="fas fa-clock me-2"></i>Estimated Time
                                </h6>
                                @php
                                    $estimatedMinutes = match($order->status) {
                                        'pending'   => '15-20',
                                        'confirmed' => '15-20',
                                        'preparing' => '8-12',
                                        'ready'     => '0',
                                        default     => '10-15'
                                    };
                                @endphp
                                <p class="mb-0">
                                    @if($order->status == 'ready')
                                        Your order is ready for pickup!
                                    @else
                                        {{ $estimatedMinutes }} minutes remaining
                                    @endif
                                </p>
                            </div>
                        @endif
                    </div>

                    <!-- Order Items -->
                    <div class="order-card">
                        <h5 class="mb-3">Order Details</h5>
                        @foreach($order->orderItems as $item)
                            <div class="order-item">
                                @if($item->product && $item->product->image)
                                    <img src="{{ $item->product->image_url }}" alt="{{ $item->product->name }}" class="item-image">
                                @else
                                    <div class="item-image bg-light d-flex align-items-center justify-content-center">
                                        <i class="fas fa-image text-muted"></i>
                                    </div>
                                @endif
                                <div class="flex-grow-1">
                                    <h6 class="mb-1">{{ $item->product_name ?? ($item->product->name ?? 'Item') }}</h6>
                                    <small class="text-muted">Qty: {{ $item->quantity }}</small>
                                </div>
                                <div class="text-end">
                                    <strong>{{ $currencySymbol }}{{ number_format($item->subtotal, 2) }}</strong>
                                    <br><small class="text-muted">{{ $currencySymbol }}{{ number_format($item->unit_price, 2) }} each</small>
                                </div>
                            </div>
                        @endforeach
                        @if($order->customer_notes)
                            <div class="alert alert-info mt-3">
                                <h6><i class="fas fa-sticky-note me-2"></i>Special Instructions</h6>
                                <p class="mb-0">{{ $order->customer_notes }}</p>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="col-lg-4">
                    <!-- Order Info -->
                    <div class="order-info mb-4">
                        <h5 class="mb-3">Order Information</h5>
                        <div class="info-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <span><i class="fas fa-hashtag me-2"></i>Order #</span>
                                <strong>{{ $order->order_number }}</strong>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <span><i class="fas fa-chair me-2"></i>Table</span>
                                <strong>{{ optional($order->restaurantTable)->table_number ?? optional($order->table)->table_number ?? '-' }}</strong>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <span><i class="fas fa-user me-2"></i>Customer</span>
                                <strong>{{ $order->customer_name }}</strong>
                            </div>
                        </div>
                        @if($order->customer_phone)
                            <div class="info-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span><i class="fas fa-phone me-2"></i>Phone</span>
                                    <strong>{{ $order->customer_phone }}</strong>
                                </div>
                            </div>
                        @endif
                        <div class="info-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <span><i class="fas fa-calendar me-2"></i>Date</span>
                                <strong>{{ $order->created_at->format('M j, Y') }}</strong>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <span><i class="fas fa-clock me-2"></i>Time</span>
                                <strong>{{ $order->created_at->format('g:i A') }}</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Order Total -->
                    <div class="order-card">
                        <h5 class="mb-3">Order Total</h5>
                        <div class="d-flex justify-content-between fw-bold fs-5 mt-2">
                            <span>Total:</span>
                            <span class="text-success">{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</span>
                        </div>
                        <div class="mt-3">
                            <small class="text-muted">
                                Payment: <span class="text-capitalize">{{ $order->payment_method ?? 'Cash' }}</span> &mdash;
                                @if($order->payment_status === 'paid')
                                    <span class="text-success fw-semibold">Paid</span>
                                @else
                                    <span class="text-danger fw-semibold">Unpaid</span>
                                @endif
                            </small>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="d-grid gap-2 mt-3">
                        <button class="btn btn-primary" onclick="location.reload()">
                            <i class="fas fa-sync me-2"></i>Refresh Status
                        </button>
                        @if($order->status == 'ready')
                            <div class="alert alert-success text-center mt-2">
                                <h6><i class="fas fa-bell me-2"></i>Order Ready!</h6>
                                <p class="mb-0">Please collect your order from the counter</p>
                            </div>
                        @endif
                        <a href="{{ route('public.menu') }}" class="btn btn-outline-primary">
                            <i class="fas fa-utensils me-2"></i>Order More
                        </a>
                    </div>

                    <!-- Contact Info -->
                    <div class="contact-info mt-4">
                        <h6 class="mb-2">Need Help?</h6>
                        <p class="mb-2">Contact our staff at the counter.</p>
                        <strong>{{ $restaurant_name ?? 'TeaShop' }}</strong>
                    </div>
                </div>
            </div>
        @else
            <!-- Error state -->
            <div class="text-center py-5">
                <i class="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h3>Order Not Found</h3>
                <p class="text-muted mb-4">The order you're looking for doesn't exist or has been removed.</p>
                <a href="{{ route('public.menu') }}" class="btn btn-primary">
                    <i class="fas fa-utensils me-2"></i>View Menu
                </a>
            </div>
        @endif
    </div>

    <!-- Auto-refresh for active orders -->
    @if(isset($order) && !in_array($order->status, ['delivered', 'cancelled']))
        <div class="refresh-indicator" id="refreshIndicator" style="display:none;">
            <i class="fas fa-sync fa-spin me-1"></i> Refreshing...
        </div>
        <script>
            setTimeout(function() { location.reload(); }, 30000);
        </script>
    @endif

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>