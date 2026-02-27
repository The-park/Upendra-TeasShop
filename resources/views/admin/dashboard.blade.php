@extends('layouts.admin')

@section('title', 'Dashboard')

@section('breadcrumb')
<li class="breadcrumb-item active">Dashboard</li>
@endsection

@section('content')

<!-- Page header -->
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-speedometer2 me-2 text-success"></i>Dashboard</h1>
        <p class="page-subtitle">Welcome back, {{ Auth::user()->name }}! Here's what's happening today.</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.orders.live') }}" class="btn btn-tea">
            <i class="bi bi-activity me-1"></i>Live Kitchen
        </a>
        <a href="{{ route('admin.analytics.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-bar-chart-line me-1"></i>Reports
        </a>
    </div>
</div>

<!-- Stat Cards -->
<div class="row g-3 mb-4">
    <div class="col-xl-3 col-md-6">
        <div class="stat-card stat-card-green h-100">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <div class="stat-label">Today's Revenue</div>
                    <div class="stat-value mt-1">{{ $currencySymbol }}{{ number_format($todaysSales, 2) }}</div>
                    <div class="stat-delta"><i class="bi bi-arrow-up-short"></i>+12% vs yesterday</div>
                </div>
                <div class="stat-icon"><i class="bi bi-currency-dollar"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="stat-card stat-card-brown h-100">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <div class="stat-label">Orders Today</div>
                    <div class="stat-value mt-1">{{ $todaysOrders }}</div>
                    <div class="stat-delta"><i class="bi bi-arrow-up-short"></i>+3 from yesterday</div>
                </div>
                <div class="stat-icon"><i class="bi bi-receipt"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="stat-card stat-card-teal h-100">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <div class="stat-label">Average Order</div>
                    <div class="stat-value mt-1">{{ $currencySymbol }}{{ number_format($averageOrder, 2) }}</div>
                    <div class="stat-delta"><i class="bi bi-arrow-down-short"></i>-2% vs yesterday</div>
                </div>
                <div class="stat-icon"><i class="bi bi-graph-up"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="stat-card stat-card-gold h-100">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <div class="stat-label">Tables Occupied</div>
                    <div class="stat-value mt-1">{{ $activeTables }}<span style="font-size:16px;opacity:.7"> / {{ $totalTables }}</span></div>
                    <div class="stat-delta"><i class="bi bi-people"></i> {{ round(($activeTables / max($totalTables,1)) * 100) }}% occupancy</div>
                </div>
                <div class="stat-icon"><i class="bi bi-grid"></i></div>
            </div>
        </div>
    </div>
</div>

<!-- Charts Row -->
<div class="row g-3 mb-4">
    <div class="col-xl-8">
        <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0 fw-bold"><i class="bi bi-graph-up-arrow me-2 text-success"></i>Sales � Last 7 Days</h6>
                    <small class="text-muted">Daily revenue overview</small>
                </div>
                <a href="{{ route('admin.analytics.sales') }}" class="btn btn-sm btn-outline-secondary">
                    Full Report <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
            <div class="card-body">
                <canvas id="salesChart" height="95"></canvas>
            </div>
        </div>
    </div>

    <div class="col-xl-4">
        <div class="card h-100">
            <div class="card-header">
                <h6 class="mb-0 fw-bold"><i class="bi bi-trophy me-2 text-warning"></i>Top Products</h6>
                <small class="text-muted">By revenue this week</small>
            </div>
            <div class="card-body p-0">
                @if($topProducts->count() > 0)
                <ul class="list-group list-group-flush">
                    @foreach($topProducts as $i => $product)
                    <li class="list-group-item px-4 py-3 d-flex align-items-center gap-3">
                        <div class="fw-bold text-muted" style="width:22px;font-size:13px;">
                            @if($i===0) ?? @elseif($i===1) ?? @elseif($i===2) ?? @else #{{ $i+1 }} @endif
                        </div>
                        <div class="flex-grow-1 overflow-hidden">
                            <div class="fw-semibold text-truncate" style="font-size:13px;">{{ $product->name }}</div>
                            <div class="text-muted" style="font-size:12px;">{{ $product->orders_count }} orders</div>
                        </div>
                        <div class="fw-bold text-success" style="font-size:13px;white-space:nowrap;">
                            {{ $currencySymbol }}{{ number_format($product->total_revenue, 2) }}
                        </div>
                    </li>
                    @endforeach
                </ul>
                @else
                <div class="empty-state py-4">
                    <i class="bi bi-cup-straw empty-icon" style="font-size:36px;"></i>
                    <p class="mb-0">No products sold yet.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Recent Orders -->
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <div>
            <h6 class="mb-0 fw-bold"><i class="bi bi-clock-history me-2 text-primary"></i>Recent Orders</h6>
            <small class="text-muted">Latest activity across all tables</small>
        </div>
        <a href="{{ route('admin.orders.history') }}" class="btn btn-sm btn-tea">
            View All <i class="bi bi-arrow-right ms-1"></i>
        </a>
    </div>
    <div class="card-body p-0">
        @if($recentOrders->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Table</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($recentOrders as $order)
                    @php
                        $sc = [
                            'pending'   => ['pill'=>'badge-pill-danger',    'icon'=>'clock'],
                            'confirmed' => ['pill'=>'badge-pill-warning',   'icon'=>'check-circle'],
                            'preparing' => ['pill'=>'badge-pill-info',      'icon'=>'arrow-repeat'],
                            'ready'     => ['pill'=>'badge-pill-success',   'icon'=>'check2-circle'],
                            'served'    => ['pill'=>'badge-pill-secondary', 'icon'=>'check-all'],
                            'cancelled' => ['pill'=>'badge-pill-danger',    'icon'=>'x-circle'],
                            'delivered' => ['pill'=>'badge-pill-primary',   'icon'=>'bag-check'],
                        ];
                        $cfg = $sc[$order->status] ?? ['pill'=>'badge-pill-secondary','icon'=>'question'];
                    @endphp
                    <tr>
                        <td><span class="fw-semibold">#{{ $order->order_number }}</span></td>
                        <td><span class="badge bg-light text-dark border"><i class="bi bi-grid me-1"></i>{{ $order->table->table_number }}</span></td>
                        <td>{{ $order->customer_name }}</td>
                        <td><small class="text-muted">{{ $order->items_count }} items</small></td>
                        <td><span class="fw-semibold text-success">{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</span></td>
                        <td>
                            <span class="badge {{ $cfg['pill'] }}">
                                <i class="bi bi-{{ $cfg['icon'] }} me-1"></i>{{ ucfirst($order->status) }}
                            </span>
                        </td>
                        <td><small class="text-muted">{{ $order->created_at->diffForHumans() }}</small></td>
                        <td>
                            <a href="{{ route('admin.orders.show', $order) }}" class="btn btn-sm btn-outline-secondary">
                                <i class="bi bi-eye"></i>
                            </a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="empty-state">
            <i class="bi bi-receipt-cutoff empty-icon"></i>
            <h5>No orders yet</h5>
            <p>Orders will appear here once customers start placing them.</p>
        </div>
        @endif
    </div>
</div>

@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesData = @json($salesChartData);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.labels,
            datasets: [{
                label: 'Revenue ($)',
                data: salesData.data,
                borderColor: '#4a8c3f',
                backgroundColor: 'rgba(74,140,63,.1)',
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4a8c3f',
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,.04)' },
                    ticks: { callback: v => '$' + v.toLocaleString(), font: { size: 11 } }
                },
                x: { grid: { display: false }, ticks: { font: { size: 11 } } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ' $' + ctx.raw.toFixed(2) } }
            }
        }
    });
});
</script>
@endpush
