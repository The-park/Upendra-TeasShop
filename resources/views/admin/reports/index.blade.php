@extends('layouts.admin')
@section('title', 'Reports')
@section('breadcrumb')
<li class="breadcrumb-item active">Reports</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-bar-chart me-2 text-primary"></i>Reports</h1>
        <p class="page-subtitle">Business insights and performance metrics</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.analytics.sales') }}" class="btn btn-tea"><i class="bi bi-graph-up me-1"></i>Sales Report</a>
        <a href="{{ route('admin.analytics.products') }}" class="btn btn-outline-primary"><i class="bi bi-box-seam me-1"></i>Product Report</a>
    </div>
</div>

<!-- Stats -->
<div class="row g-3 mb-4">
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-green">
            <div class="stat-icon"><i class="bi bi-currency-dollar"></i></div>
            <div class="stat-info">
                <h3>{{ $currencySymbol }}{{ number_format($totalRevenue ?? 0, 0) }}</h3>
                <p>Total Revenue</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-teal">
            <div class="stat-icon"><i class="bi bi-bag-check"></i></div>
            <div class="stat-info">
                <h3>{{ $totalOrders ?? 0 }}</h3>
                <p>Total Orders</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-brown">
            <div class="stat-icon"><i class="bi bi-graph-up-arrow"></i></div>
            <div class="stat-info">
                <h3>{{ $currencySymbol }}{{ number_format($avgOrderValue ?? 0, 2) }}</h3>
                <p>Avg Order Value</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-gold">
            <div class="stat-icon"><i class="bi bi-star"></i></div>
            <div class="stat-info">
                <h3>{{ $topProduct->name ?? 'N/A' }}</h3>
                <p>Best Seller</p>
            </div>
        </div>
    </div>
</div>

<div class="row g-3">
    <!-- Sales Chart -->
    <div class="col-lg-8">
        <div class="card h-100">
            <div class="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
                <div><i class="bi bi-graph-up me-2 text-success"></i><strong>Revenue (Last 30 Days)</strong></div>
                <a href="{{ route('admin.analytics.sales') }}" class="btn btn-sm btn-outline-primary">Full Report</a>
            </div>
            <div class="card-body">
                <canvas id="revenueChart" height="100"></canvas>
            </div>
        </div>
    </div>

    <!-- Top Products -->
    <div class="col-lg-4">
        <div class="card h-100">
            <div class="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
                <div><i class="bi bi-trophy me-2 text-warning"></i><strong>Top Products</strong></div>
                <a href="{{ route('admin.analytics.products') }}" class="btn btn-sm btn-outline-primary">Full Report</a>
            </div>
            <div class="card-body p-0">
                @forelse($topProducts ?? [] as $i => $product)
                <div class="d-flex align-items-center gap-3 px-3 py-2 border-bottom">
                    <span class="fw-bold" style="font-size:18px;">{{ ['??','??','??','4??','5??'][$i] ?? ($i+1) }}</span>
                    <div class="flex-grow-1">
                        <div class="fw-semibold" style="font-size:13px;">{{ $product->name }}</div>
                        <small class="text-muted">{{ $product->total_sold ?? 0 }} sold</small>
                    </div>
                    <div class="text-success fw-semibold">{{ $currencySymbol }}{{ number_format($product->total_revenue ?? 0, 0) }}</div>
                </div>
                @empty
                <div class="empty-state py-4">
                    <i class="bi bi-trophy empty-icon" style="font-size:2rem;"></i>
                    <p class="mb-0">No data yet</p>
                </div>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
const ctx = document.getElementById('revenueChart');
if (ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: {!! json_encode(($chartData ?? collect())->pluck('date')) !!},
            datasets: [{
                label: 'Revenue',
                data: {!! json_encode(($chartData ?? collect())->pluck('total')) !!},
                borderColor: '#4a8c3f',
                backgroundColor: 'rgba(74,140,63,.1)',
                fill: true,
                tension: .4
            }]
        },
        options: { responsive:true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
}
</script>
@endpush
