@extends('layouts.admin')
@section('title', 'Order #' . $order->order_number)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.orders.history') }}">Orders</a></li>
<li class="breadcrumb-item active">#{{ $order->order_number }}</li>
@endsection
@section('content')
@php
$statusColors = ['pending'=>'danger','confirmed'=>'warning','preparing'=>'info','ready'=>'success','delivered'=>'primary','cancelled'=>'secondary'];
$statusIcons  = ['pending'=>'clock','confirmed'=>'check-circle','preparing'=>'arrow-repeat','ready'=>'check2-circle','delivered'=>'bag-check','cancelled'=>'x-circle'];
$sc = $statusColors[$order->status] ?? 'secondary';
$si = $statusIcons[$order->status] ?? 'question';
@endphp

<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-receipt me-2 text-primary"></i>Order #{{ $order->order_number }}</h1>
        <p class="page-subtitle">Placed {{ $order->created_at->diffForHumans() }} &mdash; {{ $order->created_at->format('M j, Y g:i A') }}</p>
    </div>
    <div class="d-flex gap-2">
        <button onclick="window.print()" class="btn btn-outline-secondary"><i class="bi bi-printer me-1"></i>Print</button>
        <a href="{{ route('admin.orders.history') }}" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i>Back</a>
    </div>
</div>

<div class="row g-3">
    <!-- Main Column -->
    <div class="col-lg-8">
        <!-- Status Banner -->
        <div class="card mb-3">
            <div class="card-body d-flex align-items-center gap-3 py-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center bg-{{ $sc }} bg-opacity-15" style="width:52px;height:52px;">
                    <i class="bi bi-{{ $si }} fs-4 text-{{ $sc }}"></i>
                </div>
                <div>
                    <div class="fw-bold fs-5">{{ ucfirst($order->status) }}</div>
                    <div class="text-muted" style="font-size:13px;">Current order status</div>
                </div>
                <span class="badge badge-pill-{{ $sc }} ms-auto fs-6">{{ ucfirst($order->status) }}</span>
            </div>
        </div>

        <!-- Order Items -->
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3 d-flex align-items-center">
                <i class="bi bi-bag me-2 text-primary"></i>
                <strong>Order Items</strong>
                <span class="badge badge-pill-secondary ms-2">{{ $order->items->count() }}</span>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Item</th>
                                <th class="text-center">Qty</th>
                                <th class="text-end">Unit Price</th>
                                <th class="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($order->items as $item)
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center gap-2">
                                        @if($item->product && $item->product->image)
                                        <img src="{{ Storage::url($item->product->image) }}"
                                             width="40" height="40" class="rounded" style="object-fit:cover;"
                                             alt="{{ $item->product_name }}">
                                        @else
                                        <div class="rounded bg-light d-flex align-items-center justify-content-center" style="width:40px;height:40px;">
                                            <i class="bi bi-cup-hot text-muted"></i>
                                        </div>
                                        @endif
                                        <div>
                                            <div class="fw-semibold" style="font-size:14px;">{{ $item->product_name }}</div>
                                            @if($item->special_instructions)
                                            <small class="text-muted"><i class="bi bi-sticky me-1"></i>{{ $item->special_instructions }}</small>
                                            @endif
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <span class="badge badge-pill-secondary">{{ $item->quantity }}</span>
                                </td>
                                <td class="text-end">{{ $currencySymbol }}{{ number_format($item->unit_price, 2) }}</td>
                                <td class="text-end fw-semibold">{{ $currencySymbol }}{{ number_format($item->subtotal, 2) }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot class="table-light">
                            <tr>
                                <td colspan="3" class="text-end fw-bold">Total</td>
                                <td class="text-end fw-bold text-success fs-5">{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

        <!-- Notes -->
        @if($order->notes)
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-sticky me-2 text-warning"></i><strong>Customer Notes</strong>
            </div>
            <div class="card-body">
                <p class="mb-0">{{ $order->notes }}</p>
            </div>
        </div>
        @endif

        <!-- Timeline -->
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-clock-history me-2 text-primary"></i><strong>Status Timeline</strong>
            </div>
            <div class="card-body">
                <div class="timeline">
                    <div class="timeline-item {{ in_array($order->status, ['pending','confirmed','preparing','ready','delivered']) ? 'active' : '' }}">
                        <div class="timeline-marker bg-danger"><i class="bi bi-clock"></i></div>
                        <div class="timeline-content">
                            <div class="fw-semibold">Order Placed</div>
                            <small class="text-muted">{{ $order->created_at->format('M j, g:i A') }}</small>
                        </div>
                    </div>
                    <div class="timeline-item {{ in_array($order->status, ['confirmed','preparing','ready','delivered']) ? 'active' : '' }}">
                        <div class="timeline-marker bg-warning"><i class="bi bi-check-circle"></i></div>
                        <div class="timeline-content"><div class="fw-semibold">Confirmed</div></div>
                    </div>
                    <div class="timeline-item {{ in_array($order->status, ['preparing','ready','delivered']) ? 'active' : '' }}">
                        <div class="timeline-marker bg-info"><i class="bi bi-arrow-repeat"></i></div>
                        <div class="timeline-content"><div class="fw-semibold">Preparing</div></div>
                    </div>
                    <div class="timeline-item {{ in_array($order->status, ['ready','delivered']) ? 'active' : '' }}">
                        <div class="timeline-marker bg-success"><i class="bi bi-check2-circle"></i></div>
                        <div class="timeline-content"><div class="fw-semibold">Ready</div></div>
                    </div>
                    <div class="timeline-item {{ $order->status === 'delivered' ? 'active' : '' }}">
                        <div class="timeline-marker bg-primary"><i class="bi bi-bag-check"></i></div>
                        <div class="timeline-content"><div class="fw-semibold">Delivered</div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
        <!-- Customer Info -->
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-person me-2 text-primary"></i><strong>Customer</strong>
            </div>
            <div class="card-body">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="rounded-circle bg-tea-pale d-flex align-items-center justify-content-center fw-bold text-tea-dark" style="width:44px;height:44px;background:var(--tea-pale);color:var(--tea-dark);">
                        {{ strtoupper(substr($order->customer_name, 0, 1)) }}
                    </div>
                    <div>
                        <div class="fw-semibold">{{ $order->customer_name }}</div>
                        @if($order->customer_phone)<small class="text-muted">{{ $order->customer_phone }}</small>@endif
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2 text-muted" style="font-size:13px;">
                    <i class="bi bi-grid"></i>
                    <span>Table {{ $order->restaurantTable->table_number }}</span>
                    @if($order->restaurantTable->location)
                    <span class="badge badge-pill-secondary">{{ $order->restaurantTable->location }}</span>
                    @endif
                </div>
            </div>
        </div>

        <!-- Summary -->
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-calculator me-2 text-primary"></i><strong>Summary</strong>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2" style="font-size:14px;">
                    <span class="text-muted">Items Total</span>
                    <span>{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2" style="font-size:14px;">
                    <span class="text-muted">Payment Status</span>
                    @if($order->payment_status === 'paid')
                        <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Paid</span>
                    @elseif($order->payment_status === 'refunded')
                        <span class="badge badge-pill-secondary"><i class="bi bi-arrow-counterclockwise me-1"></i>Refunded</span>
                    @else
                        <span class="badge badge-pill-danger"><i class="bi bi-clock me-1"></i>Unpaid</span>
                    @endif
                </div>
                <div class="d-flex justify-content-between mb-2" style="font-size:14px;">
                    <span class="text-muted">Payment Method</span>
                    <span class="text-capitalize">{{ $order->payment_method ?? 'Cash' }}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between fw-bold">
                    <span>Grand Total</span>
                    <span class="text-success fs-5">{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</span>
                </div>
            </div>
        </div>

        <!-- Payment Action -->
        @if($order->payment_status !== 'paid')
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-cash-coin me-2 text-success"></i><strong>Payment</strong>
            </div>
            <div class="card-body d-grid gap-2">
                <div class="alert alert-warning mb-2 py-2" style="font-size:13px;">
                    <i class="bi bi-exclamation-triangle me-1"></i>
                    This order is <strong>unpaid</strong>. Collect
                    <strong>{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</strong>
                    and mark as paid.
                </div>
                <button class="btn btn-success" onclick="markPaid()">
                    <i class="bi bi-check-circle me-1"></i>Mark as Paid
                </button>
            </div>
        </div>
        @else
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-cash-coin me-2 text-success"></i><strong>Payment</strong>
            </div>
            <div class="card-body">
                <div class="alert alert-success mb-0 py-2" style="font-size:13px;">
                    <i class="bi bi-check-circle me-1"></i>
                    Payment of <strong>{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</strong> received.
                </div>
            </div>
        </div>
        @endif

    <!-- Actions -->
        @if($order->status !== 'delivered' && $order->status !== 'cancelled')
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-lightning me-2 text-warning"></i><strong>Quick Actions</strong>
            </div>
            <div class="card-body d-grid gap-2">
                @if($order->status === 'pending')
                <button class="btn btn-success" onclick="updateStatus('confirmed')">
                    <i class="bi bi-check-circle me-1"></i>Confirm Order
                </button>
                @elseif($order->status === 'confirmed')
                <button class="btn btn-info text-white" onclick="updateStatus('preparing')">
                    <i class="bi bi-arrow-repeat me-1"></i>Start Preparing
                </button>
                @elseif($order->status === 'preparing')
                <button class="btn btn-success" onclick="updateStatus('ready')">
                    <i class="bi bi-check2-circle me-1"></i>Mark Ready
                </button>
                @elseif($order->status === 'ready')
                <button class="btn btn-primary" onclick="updateStatus('delivered')">
                    <i class="bi bi-bag-check me-1"></i>Mark Delivered
                </button>
                @endif
                <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#cancelModal">
                    <i class="bi bi-x-circle me-1"></i>Cancel Order
                </button>
            </div>
        </div>
        @endif
    </div>
</div>

<!-- Cancel Modal -->
<div class="modal fade" id="cancelModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Cancel Order</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to cancel order <strong>#{{ $order->order_number }}</strong>? This cannot be undone.</p>
            </div>
            <div class="modal-footer border-0">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Keep Order</button>
                <form action="{{ route('admin.orders.cancel', $order) }}" method="POST" class="d-inline">
                    @csrf
                    <button type="submit" class="btn btn-danger"><i class="bi bi-x-circle me-1"></i>Cancel Order</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
@push('styles')
<style>
.timeline { position: relative; padding-left: 40px; }
.timeline::before { content:''; position:absolute; left:15px; top:0; bottom:0; width:2px; background: #dee2e6; }
.timeline-item { position: relative; margin-bottom: 1.2rem; opacity: .4; }
.timeline-item.active { opacity: 1; }
.timeline-marker { position:absolute; left:-32px; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; }
.timeline-content { padding-left: 8px; }
@media print { .admin-sidebar, .admin-topbar, .card.mb-3:last-child, .col-lg-4 .card:last-child { display:none!important; } }
</style>
@endpush
@push('scripts')
<script>
function updateStatus(status) {
    $.post('{{ route('admin.orders.update-status', $order) }}', { status, _token: '{{ csrf_token() }}' })
      .done(r => { if (r.success) location.reload(); else alert(r.message || 'Failed'); })
      .fail(() => alert('Request failed'));
}
function markPaid() {
    if (!confirm('Confirm payment of {{ $currencySymbol }}{{ number_format($order->total_amount, 2) }} received?')) return;
    $.post('{{ route('admin.orders.mark-paid', $order) }}', { _token: '{{ csrf_token() }}' })
      .done(r => { if (r.success) location.reload(); else alert(r.message || 'Failed'); })
      .fail(() => alert('Request failed'));
}
</script>
@endpush
