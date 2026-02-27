@extends('layouts.admin')
@section('title', 'Order History')
@section('breadcrumb')
<li class="breadcrumb-item active">Order History</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-clock-history me-2 text-primary"></i>Order History</h1>
        <p class="page-subtitle">Browse and manage all past orders</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.orders.live') }}" class="btn btn-tea">
            <i class="bi bi-activity me-1"></i>Live Kitchen
        </a>
        <a href="{{ route('admin.orders.export') }}" class="btn btn-outline-success">
            <i class="bi bi-download me-1"></i>Export CSV
        </a>
    </div>
</div>

<!-- Filters -->
<div class="card mb-3">
    <div class="card-body py-3">
        <form method="GET" class="row g-2 align-items-end">
            <div class="col-md-2">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Status</label>
                <select name="status" class="form-select form-select-sm">
                    <option value="">All</option>
                    @foreach(['pending','confirmed','preparing','ready','served','cancelled'] as $s)
                    <option value="{{ $s }}" {{ request('status')==$s?'selected':'' }}>{{ ucfirst($s) }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">From</label>
                <input type="date" name="date_from" class="form-control form-control-sm" value="{{ request('date_from') }}">
            </div>
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">To</label>
                <input type="date" name="date_to" class="form-control form-control-sm" value="{{ request('date_to') }}">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-funnel me-1"></i>Filter</button>
                <a href="{{ route('admin.orders.history') }}" class="btn btn-sm btn-outline-secondary ms-1"><i class="bi bi-x-lg"></i></a>
            </div>
        </form>
    </div>
</div>

<div class="card">
    <div class="card-body p-0">
        @if($orders->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Date &amp; Time</th>
                        <th>Table</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th width="120">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                    @php
                        $sp = [
                            'pending'   => 'badge-pill-danger',
                            'confirmed' => 'badge-pill-warning',
                            'preparing' => 'badge-pill-info',
                            'ready'     => 'badge-pill-success',
                            'served' => 'badge-pill-primary',
                            'cancelled' => 'badge-pill-secondary',
                        ];
                        $icons = [
                            'pending'=>'clock','confirmed'=>'check-circle','preparing'=>'arrow-repeat',
                            'ready'=>'check2-circle','served'=>'bag-check','cancelled'=>'x-circle'
                        ];
                    @endphp
                    <tr>
                        <td>
                            <a href="{{ route('admin.orders.show', $order) }}" class="fw-semibold text-primary text-decoration-none">
                                #{{ $order->order_number }}
                            </a>
                        </td>
                        <td>
                            <div class="fw-semibold" style="font-size:13px;">{{ $order->created_at->format('M j, Y') }}</div>
                            <small class="text-muted">{{ $order->created_at->format('g:i A') }}</small>
                        </td>
                        <td>
                            <span class="badge bg-light text-dark border">
                                <i class="bi bi-grid me-1"></i>{{ optional($order->table)->table_number ?? 'N/A' }}
                            </span>
                        </td>
                        <td>
                            <div class="fw-semibold" style="font-size:13px;">{{ $order->customer_name }}</div>
                            @if($order->customer_phone)
                            <small class="text-muted">{{ $order->customer_phone }}</small>
                            @endif
                        </td>
                        <td>
                            <span class="badge badge-pill-secondary">{{ $order->orderItems->count() }} items</span>
                            @if($order->customer_notes)
                            <i class="bi bi-sticky-fill text-warning ms-1" title="{{ $order->customer_notes }}"></i>
                            @endif
                        </td>
                        <td><span class="fw-semibold text-success">{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</span></td>
                        <td>
                            <span class="badge {{ $sp[$order->status] ?? 'badge-pill-secondary' }}">
                                <i class="bi bi-{{ $icons[$order->status] ?? 'question' }} me-1"></i>{{ ucfirst($order->status) }}
                            </span>
                        </td>
                        <td>
                            @if($order->payment_status === 'paid')
                                <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Paid</span>
                            @else
                                <span class="badge badge-pill-danger"><i class="bi bi-clock me-1"></i>Unpaid</span>
                            @endif
                        </td>
                        <td>
                            <div class="d-flex gap-1">
                                <a href="{{ route('admin.orders.show', $order) }}"
                                   class="btn btn-sm btn-outline-secondary" title="View"><i class="bi bi-eye"></i></a>
                                @if(in_array($order->status, ['pending','confirmed','preparing','ready']))
                                <button class="btn btn-sm btn-outline-primary"
                                        onclick="showStatusModal({{ $order->id }}, '{{ $order->status }}')" title="Update">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @if($orders->hasPages())
        <div class="px-4 py-3 border-top">{{ $orders->appends(request()->query())->links() }}</div>
        @endif
        @else
        <div class="empty-state">
            <i class="bi bi-receipt-cutoff empty-icon"></i>
            <h5>No orders found</h5>
            <p>No orders match your current filters.</p>
            @if(request()->hasAny(['status','date_from','date_to']))
            <a href="{{ route('admin.orders.history') }}" class="btn btn-outline-secondary"><i class="bi bi-x-lg me-1"></i>Clear Filters</a>
            @endif
        </div>
        @endif
    </div>
</div>

<!-- Status Update Modal -->
<div class="modal fade" id="statusModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="bi bi-arrow-repeat me-2 text-primary"></i>Update Status</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="statusOrderId">
                <label class="form-label fw-semibold">New Status</label>
                <select class="form-select" id="newOrderStatus">
                    <option value="pending">? Pending</option>
                    <option value="confirmed">? Confirmed</option>
                    <option value="preparing">?? Preparing</option>
                    <option value="ready">?? Ready</option>
                    <option value="served">Served</option>
                </select>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button class="btn btn-primary" id="confirmStatusUpdate"><i class="bi bi-check-lg me-1"></i>Update</button>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
let currentOrderId = null;
function showStatusModal(id, status) {
    currentOrderId = id;
    document.getElementById('statusOrderId').value = id;
    document.getElementById('newOrderStatus').value = status;
    new bootstrap.Modal(document.getElementById('statusModal')).show();
}
document.getElementById('confirmStatusUpdate').addEventListener('click', function() {
    const id = document.getElementById('statusOrderId').value;
    const status = document.getElementById('newOrderStatus').value;
    $.post(`{{ url('admin/orders') }}/${id}/update-status`, { status, _token: '{{ csrf_token() }}' })
        .done(r => { if (r.success) location.reload(); else alert(r.message); })
        .fail(() => alert('Request failed.'));
});
</script>
@endpush
