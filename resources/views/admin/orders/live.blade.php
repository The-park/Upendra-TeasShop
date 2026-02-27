@extends('layouts.admin')
@section('title', 'Live Kitchen Display')
@section('breadcrumb')
<li class="breadcrumb-item active">Live Kitchen</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-activity me-2 text-danger"></i>Live Kitchen Display</h1>
        <p class="page-subtitle">Real-time active orders � auto-refreshes every <span id="refresh-countdown">5</span>s</p>
    </div>
    <div class="d-flex gap-2 align-items-center">
        <span id="auto-refresh-badge" class="badge badge-pill-success"><i class="bi bi-broadcast me-1"></i>Live</span>
        <button id="toggle-refresh" class="btn btn-sm btn-outline-secondary" title="Pause/Resume">
            <i class="bi bi-pause-fill" id="toggle-icon"></i>
        </button>
        <button onclick="loadOrders()" class="btn btn-sm btn-outline-primary"><i class="bi bi-arrow-clockwise me-1"></i>Refresh Now</button>
        <a href="{{ route('admin.orders.history') }}" class="btn btn-sm btn-outline-secondary"><i class="bi bi-clock-history me-1"></i>History</a>
    </div>
</div>

<!-- Stats bar -->
<div class="row g-2 mb-3" id="stats-bar">
    <div class="col-6 col-sm-3">
        <div class="card text-center py-2">
            <div class="fw-bold fs-4 text-danger" id="stat-pending">0</div>
            <div class="text-muted" style="font-size:12px;"><i class="bi bi-clock me-1"></i>Pending</div>
        </div>
    </div>
    <div class="col-6 col-sm-3">
        <div class="card text-center py-2">
            <div class="fw-bold fs-4 text-warning" id="stat-confirmed">0</div>
            <div class="text-muted" style="font-size:12px;"><i class="bi bi-check-circle me-1"></i>Confirmed</div>
        </div>
    </div>
    <div class="col-6 col-sm-3">
        <div class="card text-center py-2">
            <div class="fw-bold fs-4 text-info" id="stat-preparing">0</div>
            <div class="text-muted" style="font-size:12px;"><i class="bi bi-arrow-repeat me-1"></i>Preparing</div>
        </div>
    </div>
    <div class="col-6 col-sm-3">
        <div class="card text-center py-2">
            <div class="fw-bold fs-4 text-success" id="stat-ready">0</div>
            <div class="text-muted" style="font-size:12px;"><i class="bi bi-check2-circle me-1"></i>Ready</div>
        </div>
    </div>
</div>

<!-- Orders Grid -->
<div id="orders-container" class="row g-3">
    <div class="col-12 text-center py-5 text-muted">
        <div class="spinner-border text-tea mb-3" role="status" style="color:var(--tea-accent);"></div>
        <p>Loading orders...</p>
    </div>
</div>

<!-- Status Update Modal -->
<div class="modal fade" id="statusUpdateModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="bi bi-arrow-repeat me-2 text-primary"></i>Update Order Status</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="modal-order-id">
                <p class="text-muted mb-3">Change status for <strong id="modal-order-number"></strong></p>
                <div class="d-grid gap-2" id="status-buttons"></div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('styles')
<style>
.order-card { border-left: 5px solid #dee2e6; transition: transform .15s; }
.order-card:hover { transform: translateY(-2px); }
.order-card.status-pending   { border-left-color: #dc3545; }
.order-card.status-confirmed { border-left-color: #ffc107; }
.order-card.status-preparing { border-left-color: #0dcaf0; }
.order-card.status-ready     { border-left-color: #198754; }
.order-item-row { padding:8px 0; border-bottom:1px solid #f0f0f0; }
.order-item-row:last-child { border-bottom:none; }
.elapsed-badge { font-size:11px; padding:4px 8px; }
</style>
@endpush
@push('scripts')
<script>
window._currency = '{{ $currencySymbol ?? "$" }}';
const REFRESH_INTERVAL = 5000;
let refreshTimer = null;
let countdownTimer = null;
let isRunning = true;
let countdown = 5;

const statusMeta = {
    pending:   { color:'danger',  icon:'clock',         label:'Pending'   },
    confirmed: { color:'warning', icon:'check-circle',  label:'Confirmed' },
    preparing: { color:'info',    icon:'arrow-repeat',  label:'Preparing' },
    ready:     { color:'success', icon:'check2-circle', label:'Ready'     }
};

const nextStatus = { pending:'confirmed', confirmed:'preparing', preparing:'ready', ready:'served' };
const nextLabel  = { pending:'Confirm', confirmed:'Start Prep', preparing:'Mark Ready', ready:'Mark Served' };

function elapsed(created_at) {
    const diff = Math.floor((Date.now() - new Date(created_at)) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return diff + 'm ago';
    return Math.floor(diff/60) + 'h ' + (diff%60) + 'm';
}

function renderOrders(orders) {
    const counts = { pending:0, confirmed:0, preparing:0, ready:0 };
    orders.forEach(o => { if (counts[o.status] !== undefined) counts[o.status]++; });
    ['pending','confirmed','preparing','ready'].forEach(s => {
        document.getElementById('stat-'+s).textContent = counts[s];
    });

    const container = document.getElementById('orders-container');
    if (orders.length === 0) {
        container.innerHTML = `
        <div class="col-12">
            <div class="empty-state">
                <i class="bi bi-cup-hot empty-icon"></i>
                <h5>No Active Orders</h5>
                <p>All caught up! No pending orders right now.</p>
            </div>
        </div>`;
        return;
    }

    container.innerHTML = orders.map(order => {
        const meta = statusMeta[order.status] || { color:'secondary', icon:'question', label:order.status };
        const itemsHtml = (order.items || []).map(item => `
            <div class="order-item-row d-flex justify-content-between align-items-center">
                <span style="font-size:13px;">${item.product_name}</span>
                <span class="badge badge-pill-secondary">x${item.quantity}</span>
            </div>`).join('');
        const next = nextStatus[order.status];
        const nextBtn = next ? `<button class="btn btn-sm btn-${meta.color} me-1"
            onclick="quickUpdate(${order.id}, '${next}')">
            ${nextLabel[order.status]}
        </button>` : '';
        return `
        <div class="col-md-6 col-xl-4">
            <div class="card order-card status-${order.status} h-100">
                <div class="card-header bg-white d-flex justify-content-between align-items-center py-2">
                    <div class="fw-bold">#${order.order_number}
                        <span class="ms-2 badge badge-pill-${meta.color}">
                            <i class="bi bi-${meta.icon} me-1"></i>${meta.label}
                        </span>
                    </div>
                    <span class="elapsed-badge badge bg-light text-muted border">
                        <i class="bi bi-clock me-1"></i>${elapsed(order.created_at)}
                    </span>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2" style="font-size:13px;">
                        <span><i class="bi bi-grid me-1 text-muted"></i>Table ${order.table_number}</span>
                        <span class="fw-semibold text-success">${window._currency}${parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>
                    ${order.customer_name ? `<div class="text-muted mb-2" style="font-size:12px;"><i class="bi bi-person me-1"></i>${order.customer_name}</div>` : ''}
                    <div class="border rounded p-2 mb-2" style="background:#fafafa;">
                        ${itemsHtml}
                    </div>
                    ${order.notes ? `<div class="alert alert-warning py-1 px-2 mb-2" style="font-size:12px;"><i class="bi bi-sticky me-1"></i>${order.notes}</div>` : ''}
                    <div class="d-flex align-items-center gap-2 mb-0" style="font-size:12px;">
                        <span class="badge ${order.payment_status === 'paid' ? 'badge-pill-success' : 'badge-pill-danger'}">
                            <i class="bi bi-${order.payment_status === 'paid' ? 'check-circle' : 'clock'} me-1"></i>${order.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                        </span>
                        <span class="text-muted text-capitalize">${order.payment_method || 'cash'}</span>
                    </div>
                </div>
                <div class="card-footer bg-white border-top d-flex gap-1">
                    ${nextBtn}
                    ${order.payment_status !== 'paid' ? `<button class="btn btn-sm btn-outline-success" onclick="markPaid(${order.id})" title="Mark Paid">
                        <i class="bi bi-cash-coin"></i>
                    </button>` : ''}
                    <button class="btn btn-sm btn-outline-secondary" onclick="openStatusModal(${order.id}, '${order.order_number}', '${order.status}')">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <a href="{{ url('admin/orders') }}/${order.id}" class="btn btn-sm btn-outline-secondary ms-auto">
                        <i class="bi bi-eye"></i>
                    </a>
                </div>
            </div>
        </div>`;
    }).join('');
}

function loadOrders() {
    $.get('{{ route('admin.orders.live-feed') }}')
        .done(r => renderOrders(r.orders || []))
        .fail(() => console.warn('Failed to fetch orders'));
}

function quickUpdate(id, status) {
    $.post(`{{ url('admin/orders') }}/${id}/update-status`, { status, _token: '{{ csrf_token() }}' })
        .done(r => { if (r.success) loadOrders(); })
        .fail(() => alert('Update failed'));
}

function markPaid(id) {
    $.post(`{{ url('admin/orders') }}/${id}/mark-paid`, { _token: '{{ csrf_token() }}' })
        .done(r => { if (r.success) loadOrders(); else alert(r.message || 'Failed'); })
        .fail(() => alert('Mark paid failed'));
}

function openStatusModal(id, number, currentStatus) {
    document.getElementById('modal-order-id').value = id;
    document.getElementById('modal-order-number').textContent = '#' + number;
    const btns = document.getElementById('status-buttons');
    const statuses = ['confirmed','preparing','ready','served','cancelled'];
    btns.innerHTML = statuses.filter(s => s !== currentStatus).map(s => {
        const m = statusMeta[s] || { color:'secondary', icon:'circle', label:s };
        return `<button class="btn btn-outline-${m.color}" onclick="quickUpdate(${id},'${s}'); bootstrap.Modal.getInstance(document.getElementById('statusUpdateModal')).hide();">
            <i class="bi bi-${m.icon} me-1"></i>${s.charAt(0).toUpperCase()+s.slice(1)}
        </button>`;
    }).join('');
    new bootstrap.Modal(document.getElementById('statusUpdateModal')).show();
}

function startCountdown() {
    countdown = 5;
    document.getElementById('refresh-countdown').textContent = countdown;
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
        if (!isRunning) return;
        countdown--;
        document.getElementById('refresh-countdown').textContent = countdown;
        if (countdown <= 0) {
            loadOrders();
            countdown = 5;
        }
    }, 1000);
}

document.getElementById('toggle-refresh').addEventListener('click', function() {
    isRunning = !isRunning;
    const icon = document.getElementById('toggle-icon');
    const badge = document.getElementById('auto-refresh-badge');
    if (isRunning) {
        icon.className = 'bi bi-pause-fill';
        badge.className = 'badge badge-pill-success';
        badge.innerHTML = '<i class="bi bi-broadcast me-1"></i>Live';
    } else {
        icon.className = 'bi bi-play-fill';
        badge.className = 'badge badge-pill-secondary';
        badge.innerHTML = '<i class="bi bi-pause me-1"></i>Paused';
    }
});

loadOrders();
startCountdown();
</script>
@endpush
