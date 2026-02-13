@extends('layouts.admin')

@section('title', 'Order History')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Order History</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Order History</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <h4 class="header-title">All Orders</h4>
                    </div>
                    <div class="col-md-6 text-right">
                        <a href="{{ route('admin.orders.live') }}" class="btn btn-info mr-2">
                            <i class="fas fa-broadcast-tower"></i> Live Orders
                        </a>
                        <a href="{{ route('admin.orders.export') }}" class="btn btn-success">
                            <i class="fas fa-download"></i> Export CSV
                        </a>
                    </div>
                </div>

                <!-- Filters -->
                <form method="GET" class="mb-4">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="status">Status</label>
                            <select name="status" class="form-control">
                                <option value="">All Status</option>
                                <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pending</option>
                                <option value="confirmed" {{ request('status') == 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                                <option value="preparing" {{ request('status') == 'preparing' ? 'selected' : '' }}>Preparing</option>
                                <option value="ready" {{ request('status') == 'ready' ? 'selected' : '' }}>Ready</option>
                                <option value="delivered" {{ request('status') == 'delivered' ? 'selected' : '' }}>Delivered</option>
                                <option value="cancelled" {{ request('status') == 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="date_from">From Date</label>
                            <input type="date" name="date_from" class="form-control" value="{{ request('date_from') }}">
                        </div>
                        <div class="col-md-3">
                            <label for="date_to">To Date</label>
                            <input type="date" name="date_to" class="form-control" value="{{ request('date_to') }}">
                        </div>
                        <div class="col-md-3">
                            <label>&nbsp;</label>
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary mr-2">Filter</button>
                                <a href="{{ route('admin.orders.history') }}" class="btn btn-secondary">Clear</a>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Orders Table -->
                @if($orders->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order #</th>
                                    <th>Date & Time</th>
                                    <th>Table</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($orders as $order)
                                    <tr>
                                        <td>
                                            <a href="{{ route('admin.orders.show', $order) }}" class="font-weight-bold text-primary">
                                                {{ $order->order_number }}
                                            </a>
                                        </td>
                                        <td>
                                            <strong>{{ $order->created_at->format('M j, Y') }}</strong><br>
                                            <small class="text-muted">{{ $order->created_at->format('g:i A') }}</small>
                                        </td>
                                        <td>
                                            <span class="badge badge-info">{{ $order->restaurantTable->table_number }}</span>
                                        </td>
                                        <td>
                                            <strong>{{ $order->customer_name }}</strong>
                                            @if($order->customer_phone)
                                                <br><small class="text-muted">{{ $order->customer_phone }}</small>
                                            @endif
                                        </td>
                                        <td>
                                            <span class="badge badge-light">{{ $order->items->count() }} items</span>
                                            @if($order->notes)
                                                <br><small class="text-warning"><i class="fas fa-sticky-note mr-1"></i>Note</small>
                                            @endif
                                        </td>
                                        <td>
                                            <strong>${{ number_format($order->total_amount, 2) }}</strong>
                                        </td>
                                        <td>
                                            @php
                                                $statusColors = [
                                                    'pending' => 'danger',
                                                    'confirmed' => 'warning', 
                                                    'preparing' => 'info',
                                                    'ready' => 'success',
                                                    'delivered' => 'primary',
                                                    'cancelled' => 'dark'
                                                ];
                                            @endphp
                                            <span class="badge badge-{{ $statusColors[$order->status] ?? 'secondary' }}">
                                                {{ ucfirst($order->status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <a href="{{ route('admin.orders.show', $order) }}" 
                                                   class="btn btn-sm btn-info" title="View Details">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                @if(in_array($order->status, ['pending', 'confirmed', 'preparing', 'ready']))
                                                    <button type="button" class="btn btn-sm btn-warning" 
                                                            onclick="showStatusModal({{ $order->id }}, '{{ $order->status }}')" 
                                                            title="Update Status">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                @endif
                                                @if(in_array($order->status, ['pending', 'confirmed']) && $order->created_at->diffInHours() < 24)
                                                    <button type="button" class="btn btn-sm btn-danger" 
                                                            onclick="cancelOrder({{ $order->id }})" title="Cancel">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="row mt-3">
                        <div class="col-md-12">
                            {{ $orders->appends(request()->query())->links() }}
                        </div>
                    </div>
                @else
                    <div class="text-center py-5">
                        <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
                        <h5>No orders found</h5>
                        <p class="text-muted">No orders match your current filters.</p>
                        @if(request()->hasAny(['status', 'date_from', 'date_to']))
                            <a href="{{ route('admin.orders.history') }}" class="btn btn-primary">
                                Clear Filters
                            </a>
                        @endif
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Status Update Modal -->
<div class="modal fade" id="statusModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Update Order Status</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="statusForm">
                    @csrf
                    <input type="hidden" id="statusOrderId">
                    <div class="form-group">
                        <label for="newOrderStatus">New Status:</label>
                        <select class="form-control" id="newOrderStatus" required>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmStatusUpdate">Update Status</button>
            </div>
        </div>
    </div>
</div>

<!-- Cancel Order Modal -->
<div class="modal fade" id="cancelModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Cancel Order</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to cancel this order?</p>
                <p class="text-danger">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No, Keep Order</button>
                <button type="button" class="btn btn-danger" id="confirmCancelOrder">Yes, Cancel Order</button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let currentOrderId = null;

function showStatusModal(orderId, currentStatus) {
    currentOrderId = orderId;
    $('#statusOrderId').val(orderId);
    $('#newOrderStatus').val(currentStatus);
    $('#statusModal').modal('show');
}

function cancelOrder(orderId) {
    currentOrderId = orderId;
    $('#cancelModal').modal('show');
}

$('#confirmStatusUpdate').click(function() {
    const orderId = $('#statusOrderId').val();
    const newStatus = $('#newOrderStatus').val();
    
    updateOrderStatus(orderId, newStatus);
});

$('#confirmCancelOrder').click(function() {
    if (!currentOrderId) return;
    
    $.post(`{{ url('admin/orders') }}/${currentOrderId}/cancel`, {
        _token: '{{ csrf_token() }}'
    })
    .done(function(response) {
        if (response.success) {
            $('#cancelModal').modal('hide');
            location.reload();
        } else {
            alert('Error: ' + response.message);
        }
    })
    .fail(function() {
        alert('Failed to cancel order. Please try again.');
    });
});

function updateOrderStatus(orderId, newStatus) {
    $.post(`{{ url('admin/orders') }}/${orderId}/update-status`, {
        status: newStatus,
        _token: '{{ csrf_token() }}'
    })
    .done(function(response) {
        if (response.success) {
            $('#statusModal').modal('hide');
            location.reload();
        } else {
            alert('Error: ' + response.message);
        }
    })
    .fail(function() {
        alert('Failed to update status. Please try again.');
    });
}
</script>
@endpush