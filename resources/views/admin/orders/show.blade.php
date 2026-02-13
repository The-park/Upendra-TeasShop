@extends('layouts.admin')

@section('title', 'Order #' . $order->order_number)

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Order Details</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.orders.history') }}">Orders</a></li>
                <li class="breadcrumb-item active">{{ $order->order_number }}</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <!-- Order Summary -->
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0">Order {{ $order->order_number }}</h5>
                        <small class="text-muted">{{ $order->created_at->format('M j, Y \a\t g:i A') }}</small>
                    </div>
                    <div class="col-auto">
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
                        <span class="badge badge-{{ $statusColors[$order->status] ?? 'secondary' }} badge-lg">
                            {{ ucfirst($order->status) }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Customer Information -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6 class="text-muted">CUSTOMER INFORMATION</h6>
                        <p class="mb-1"><strong>{{ $order->customer_name }}</strong></p>
                        @if($order->customer_phone)
                            <p class="mb-1"><i class="fas fa-phone mr-2"></i>{{ $order->customer_phone }}</p>
                        @endif
                        <p class="mb-0"><i class="fas fa-chair mr-2"></i>Table {{ $order->restaurantTable->table_number }}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-muted">ORDER INFORMATION</h6>
                        <p class="mb-1"><strong>Total:</strong> ${{ number_format($order->total_amount, 2) }}</p>
                        <p class="mb-1"><strong>Items:</strong> {{ $order->items->sum('quantity') }}</p>
                        <p class="mb-0"><strong>Duration:</strong> {{ $order->created_at->diffForHumans() }}</p>
                    </div>
                </div>

                @if($order->notes)
                    <div class="alert alert-info">
                        <h6><i class="fas fa-sticky-note mr-2"></i>Special Instructions</h6>
                        <p class="mb-0">{{ $order->notes }}</p>
                    </div>
                @endif

                <!-- Order Items -->
                <h6 class="text-muted">ORDER ITEMS</h6>
                <div class="table-responsive">
                    <table class="table table-borderless">
                        <thead>
                            <tr class="border-bottom">
                                <th>Item</th>
                                <th class="text-center">Qty</th>
                                <th class="text-right">Unit Price</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($order->items as $item)
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            @if($item->product->image)
                                                <img src="{{ $item->product->image_url }}" alt="{{ $item->product->name }}" 
                                                     class="img-thumbnail mr-3" style="width: 50px; height: 50px; object-fit: cover;">
                                            @else
                                                <div class="bg-light d-flex align-items-center justify-content-center mr-3" 
                                                     style="width: 50px; height: 50px; border-radius: 4px;">
                                                    <i class="fas fa-image text-muted"></i>
                                                </div>
                                            @endif
                                            <div>
                                                <strong>{{ $item->product->name }}</strong>
                                                @if($item->product->description)
                                                    <br><small class="text-muted">{{ Str::limit($item->product->description, 60) }}</small>
                                                @endif
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <span class="badge badge-primary">{{ $item->quantity }}</span>
                                    </td>
                                    <td class="text-right">
                                        ${{ number_format($item->unit_price, 2) }}
                                    </td>
                                    <td class="text-right">
                                        <strong>${{ number_format($item->total_price, 2) }}</strong>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr class="border-top">
                                <th colspan="3" class="text-right">Total:</th>
                                <th class="text-right">
                                    <h5 class="mb-0">${{ number_format($order->total_amount, 2) }}</h5>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Actions & Timeline -->
    <div class="col-lg-4">
        <!-- Actions -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Quick Actions</h6>
            </div>
            <div class="card-body">
                @if(in_array($order->status, ['pending', 'confirmed', 'preparing', 'ready']))
                    <button type="button" class="btn btn-primary btn-block mb-2" onclick="showStatusModal()">
                        <i class="fas fa-edit"></i> Update Status
                    </button>
                @endif
                
                @if(in_array($order->status, ['pending', 'confirmed']))
                    <button type="button" class="btn btn-warning btn-block mb-2" onclick="cancelOrder()">
                        <i class="fas fa-times"></i> Cancel Order
                    </button>
                @endif
                
                <button type="button" class="btn btn-info btn-block mb-2" onclick="printOrder()">
                    <i class="fas fa-print"></i> Print Order
                </button>
                
                <a href="{{ route('admin.orders.history') }}" class="btn btn-secondary btn-block">
                    <i class="fas fa-arrow-left"></i> Back to Orders
                </a>
            </div>
        </div>

        <!-- Order Timeline -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Order Status Timeline</h6>
            </div>
            <div class="card-body">
                <div class="timeline">
                    <div class="timeline-item {{ $order->status == 'pending' ? 'active' : ($order->created_at ? 'completed' : '') }}">
                        <div class="timeline-marker {{ $order->created_at ? 'bg-success' : 'bg-muted' }}"></div>
                        <div class="timeline-content">
                            <h6>Order Placed</h6>
                            <small class="text-muted">{{ $order->created_at->format('M j, Y g:i A') }}</small>
                        </div>
                    </div>
                    
                    <div class="timeline-item {{ in_array($order->status, ['confirmed', 'preparing', 'ready', 'delivered']) ? 'completed' : ($order->status == 'confirmed' ? 'active' : '') }}">
                        <div class="timeline-marker {{ in_array($order->status, ['confirmed', 'preparing', 'ready', 'delivered']) ? 'bg-success' : 'bg-muted' }}"></div>
                        <div class="timeline-content">
                            <h6>Order Confirmed</h6>
                            <small class="text-muted">{{ in_array($order->status, ['confirmed', 'preparing', 'ready', 'delivered']) ? 'In progress' : 'Pending' }}</small>
                        </div>
                    </div>
                    
                    <div class="timeline-item {{ in_array($order->status, ['preparing', 'ready', 'delivered']) ? 'completed' : ($order->status == 'preparing' ? 'active' : '') }}">
                        <div class="timeline-marker {{ in_array($order->status, ['preparing', 'ready', 'delivered']) ? 'bg-success' : 'bg-muted' }}"></div>
                        <div class="timeline-content">
                            <h6>Preparing</h6>
                            <small class="text-muted">{{ in_array($order->status, ['preparing', 'ready', 'delivered']) ? 'In progress' : 'Pending' }}</small>
                        </div>
                    </div>
                    
                    <div class="timeline-item {{ in_array($order->status, ['ready', 'delivered']) ? 'completed' : ($order->status == 'ready' ? 'active' : '') }}">
                        <div class="timeline-marker {{ in_array($order->status, ['ready', 'delivered']) ? 'bg-success' : 'bg-muted' }}"></div>
                        <div class="timeline-content">
                            <h6>Ready for Pickup</h6>
                            <small class="text-muted">{{ in_array($order->status, ['ready', 'delivered']) ? 'Ready' : 'Pending' }}</small>
                        </div>
                    </div>
                    
                    <div class="timeline-item {{ $order->status == 'delivered' ? 'completed' : ($order->status == 'delivered' ? 'active' : '') }}">
                        <div class="timeline-marker {{ $order->status == 'delivered' ? 'bg-success' : 'bg-muted' }}"></div>
                        <div class="timeline-content">
                            <h6>Delivered</h6>
                            <small class="text-muted">{{ $order->status == 'delivered' ? 'Completed' : 'Pending' }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Order Stats -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Order Statistics</h6>
            </div>
            <div class="card-body">
                <div class="row text-center">
                    <div class="col-6">
                        <h4 class="text-primary mb-1">{{ $order->items->sum('quantity') }}</h4>
                        <small class="text-muted">Total Items</small>
                    </div>
                    <div class="col-6">
                        <h4 class="text-success mb-1">${{ number_format($order->total_amount, 2) }}</h4>
                        <small class="text-muted">Total Value</small>
                    </div>
                </div>
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
                <div class="form-group">
                    <label for="newStatus">New Status:</label>
                    <select class="form-control" id="newStatus">
                        <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="confirmed" {{ $order->status == 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                        <option value="preparing" {{ $order->status == 'preparing' ? 'selected' : '' }}>Preparing</option>
                        <option value="ready" {{ $order->status == 'ready' ? 'selected' : '' }}>Ready</option>
                        <option value="delivered" {{ $order->status == 'delivered' ? 'selected' : '' }}>Delivered</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="updateStatus()">Update Status</button>
            </div>
        </div>
    </div>
</div>

<!-- Cancel Confirmation Modal -->
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
                <p>Are you sure you want to cancel order <strong>{{ $order->order_number }}</strong>?</p>
                <p class="text-danger">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No, Keep Order</button>
                <button type="button" class="btn btn-danger" onclick="confirmCancel()">Yes, Cancel Order</button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline-item {
    position: relative;
    padding-bottom: 20px;
}

.timeline-item:not(:last-child):before {
    content: '';
    position: absolute;
    left: -23px;
    top: 25px;
    height: calc(100% - 10px);
    width: 2px;
    background-color: #e9ecef;
}

.timeline-item.completed:not(:last-child):before {
    background-color: #28a745;
}

.timeline-marker {
    position: absolute;
    left: -30px;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
}

.timeline-content h6 {
    margin-bottom: 5px;
    font-size: 14px;
}

.timeline-item.completed .timeline-content h6 {
    color: #28a745;
}

.timeline-item.active .timeline-content h6 {
    color: #007bff;
    font-weight: bold;
}

.badge-lg {
    font-size: 14px;
    padding: 8px 12px;
}
</style>
@endpush

@push('scripts')
<script>
function showStatusModal() {
    $('#statusModal').modal('show');
}

function updateStatus() {
    const newStatus = $('#newStatus').val();
    
    $.post('{{ route("admin.orders.update-status", $order) }}', {
        status: newStatus,
        _token: '{{ csrf_token() }}'
    })
    .done(function(response) {
        if (response.success) {
            location.reload();
        } else {
            alert('Error: ' + response.message);
        }
    })
    .fail(function() {
        alert('Failed to update status. Please try again.');
    })
    .always(function() {
        $('#statusModal').modal('hide');
    });
}

function cancelOrder() {
    $('#cancelModal').modal('show');
}

function confirmCancel() {
    $.post('{{ route("admin.orders.cancel", $order) }}', {
        _token: '{{ csrf_token() }}'
    })
    .done(function(response) {
        if (response.success) {
            location.reload();
        } else {
            alert('Error: ' + response.message);
        }
    })
    .fail(function() {
        alert('Failed to cancel order. Please try again.');
    })
    .always(function() {
        $('#cancelModal').modal('hide');
    });
}

function printOrder() {
    window.print();
}
</script>
@endpush