@extends('layouts.admin')

@section('title', 'Live Orders Display')

@push('styles')
<style>
.order-card {
    border-left: 4px solid #6c757d;
    transition: all 0.3s ease;
}

.order-card.status-pending {
    border-left-color: #dc3545;
}

.order-card.status-confirmed {
    border-left-color: #ffc107;
}

.order-card.status-preparing {
    border-left-color: #17a2b8;
}

.order-card.status-ready {
    border-left-color: #28a745;
}

.order-item {
    padding: 10px;
    border-bottom: 1px solid #f8f9fa;
}

.order-item:last-child {
    border-bottom: none;
}

.order-timer {
    font-family: 'Courier New', monospace;
    font-weight: bold;
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.auto-refresh-indicator {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
}
</style>
@endpush

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Live Orders Display</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Live Orders</li>
            </ol>
        </div>
    </div>
</div>

<!-- Control Panel -->
<div class="row mb-3">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h5 class="mb-0">Kitchen Display</h5>
                        <small class="text-muted">Live order updates every 5 seconds</small>
                    </div>
                    <div class="col-md-6 text-right">
                        <button type="button" class="btn btn-success mr-2" id="refreshBtn">
                            <i class="fas fa-sync"></i> Refresh Now
                        </button>
                        <button type="button" class="btn btn-info" id="toggleAutoRefresh">
                            <i class="fas fa-pause"></i> Pause Auto-Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Orders Display -->
<div class="row" id="ordersContainer">
    <div class="col-12 text-center py-5">
        <i class="fas fa-spinner fa-spin fa-2x text-muted mb-3"></i>
        <p class="text-muted">Loading orders...</p>
    </div>
</div>

<!-- Auto-refresh indicator -->
<div class="auto-refresh-indicator">
    <span class="badge badge-success" id="autoRefreshStatus">
        <i class="fas fa-sync fa-spin"></i> Auto-refresh ON
    </span>
</div>

<!-- Order Update Modal -->
<div class="modal fade" id="updateOrderModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Update Order Status</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="updateOrderForm">
                    @csrf
                    <input type="hidden" id="updateOrderId">
                    <div class="form-group">
                        <label for="newStatus">New Status:</label>
                        <select class="form-control" id="newStatus" required>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmUpdateOrder">Update Status</button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let autoRefreshInterval;
let isAutoRefreshEnabled = true;

$(document).ready(function() {
    // Initial load
    loadOrders();
    
    // Start auto-refresh
    startAutoRefresh();
    
    // Manual refresh
    $('#refreshBtn').click(function() {
        loadOrders();
    });
    
    // Toggle auto-refresh
    $('#toggleAutoRefresh').click(function() {
        if (isAutoRefreshEnabled) {
            stopAutoRefresh();
        } else {
            startAutoRefresh();
        }
    });
    
    // Update order status
    $('#confirmUpdateOrder').click(function() {
        updateOrderStatus();
    });
});

function loadOrders() {
    $.get('{{ route("admin.orders.live-feed") }}')
        .done(function(orders) {
            renderOrders(orders);
        })
        .fail(function() {
            $('#ordersContainer').html(`
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-2x text-warning mb-3"></i>
                    <p class="text-muted">Failed to load orders. <button class="btn btn-link p-0" onclick="loadOrders()">Try again</button></p>
                </div>
            `);
        });
}

function renderOrders(orders) {
    if (orders.length === 0) {
        $('#ordersContainer').html(`
            <div class="col-12 text-center py-5">
                <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                <h5>All caught up!</h5>
                <p class="text-muted">No pending orders at the moment.</p>
            </div>
        `);
        return;
    }
    
    let html = '';
    
    orders.forEach(function(order) {
        const timeSinceOrder = getTimeSinceOrder(order.created_at);
        const statusClass = getStatusClass(order.status);
        const statusColor = getStatusColor(order.status);
        
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card order-card status-${order.status} h-100">
                    <div class="card-header bg-${statusColor} text-white">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="mb-0">${order.order_number}</h6>
                                <small>Table ${order.restaurant_table.table_number}</small>
                            </div>
                            <div class="col-auto">
                                <span class="order-timer ${order.status === 'pending' ? 'pulse' : ''}">
                                    ${timeSinceOrder}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="p-3 border-bottom">
                            <strong>${order.customer_name}</strong>
                            ${order.customer_phone ? '<br><small class="text-muted">' + order.customer_phone + '</small>' : ''}
                            ${order.notes ? '<br><small class="text-info"><i class="fas fa-sticky-note mr-1"></i>' + order.notes + '</small>' : ''}
                        </div>
                        
                        <div class="order-items">`;
                        
        order.items.forEach(function(item) {
            html += `
                <div class="order-item">
                    <div class="row align-items-center">
                        <div class="col">
                            <strong>${item.product.name}</strong>
                        </div>
                        <div class="col-auto">
                            <span class="badge badge-primary">×${item.quantity}</span>
                        </div>
                    </div>
                </div>`;
        });
        
        html += `
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row align-items-center">
                            <div class="col">
                                <strong>$${parseFloat(order.total_amount).toFixed(2)}</strong>
                            </div>
                            <div class="col-auto">
                                <div class="btn-group" role="group">
                                    ${getStatusButtons(order)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    
    $('#ordersContainer').html(html);
}

function getStatusButtons(order) {
    const buttons = {
        'pending': '<button class="btn btn-sm btn-warning" onclick="changeOrderStatus(' + order.id + ', \'confirmed\')">Confirm</button>',
        'confirmed': '<button class="btn btn-sm btn-info" onclick="changeOrderStatus(' + order.id + ', \'preparing\')">Start</button>',
        'preparing': '<button class="btn btn-sm btn-success" onclick="changeOrderStatus(' + order.id + ', \'ready\')">Ready</button>',
        'ready': '<button class="btn btn-sm btn-dark" onclick="changeOrderStatus(' + order.id + ', \'delivered\')">Delivered</button>'
    };
    
    return buttons[order.status] || '';
}

function getStatusClass(status) {
    const classes = {
        'pending': 'border-danger',
        'confirmed': 'border-warning', 
        'preparing': 'border-info',
        'ready': 'border-success'
    };
    return classes[status] || 'border-secondary';
}

function getStatusColor(status) {
    const colors = {
        'pending': 'danger',
        'confirmed': 'warning',
        'preparing': 'info', 
        'ready': 'success'
    };
    return colors[status] || 'secondary';
}

function getTimeSinceOrder(createdAt) {
    const now = new Date();
    const orderTime = new Date(createdAt);
    const diffMs = now - orderTime;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return '< 1m';
    if (diffMins < 60) return diffMins + 'm';
    
    const diffHours = Math.floor(diffMins / 60);
    return diffHours + 'h ' + (diffMins % 60) + 'm';
}

function changeOrderStatus(orderId, newStatus) {
    $.post(`{{ url('admin/orders') }}/${orderId}/update-status`, {
        status: newStatus,
        _token: '{{ csrf_token() }}'
    })
    .done(function(response) {
        if (response.success) {
            loadOrders(); // Refresh the display
            
            // Show success notification
            const notification = $(`
                <div class="alert alert-success alert-dismissible fade show position-fixed" 
                     style="top: 20px; left: 50%; transform: translateX(-50%); z-index: 1060;">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    Order status updated successfully!
                </div>
            `);
            $('body').append(notification);
            setTimeout(() => notification.fadeOut(), 3000);
        }
    })
    .fail(function() {
        alert('Failed to update order status. Please try again.');
    });
}

function startAutoRefresh() {
    isAutoRefreshEnabled = true;
    autoRefreshInterval = setInterval(loadOrders, 5000); // Refresh every 5 seconds
    
    $('#toggleAutoRefresh')
        .removeClass('btn-info')
        .addClass('btn-warning')
        .html('<i class="fas fa-pause"></i> Pause Auto-Refresh');
        
    $('#autoRefreshStatus')
        .removeClass('badge-secondary')
        .addClass('badge-success')
        .html('<i class="fas fa-sync fa-spin"></i> Auto-refresh ON');
}

function stopAutoRefresh() {
    isAutoRefreshEnabled = false;
    clearInterval(autoRefreshInterval);
    
    $('#toggleAutoRefresh')
        .removeClass('btn-warning')
        .addClass('btn-info')
        .html('<i class="fas fa-play"></i> Resume Auto-Refresh');
        
    $('#autoRefreshStatus')
        .removeClass('badge-success')
        .addClass('badge-secondary')
        .html('<i class="fas fa-pause"></i> Auto-refresh OFF');
}

// Cleanup when leaving the page
$(window).on('beforeunload', function() {
    stopAutoRefresh();
});
</script>
@endpush