@extends('layouts.admin')
@section('title', 'Sales Report')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.analytics.index') }}">Reports</a></li>
<li class="breadcrumb-item active">Sales</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-graph-up me-2 text-success"></i>Sales Report</h1>
        <p class="page-subtitle">Revenue and order performance breakdown</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.orders.export') }}" class="btn btn-outline-success"><i class="bi bi-download me-1"></i>Export CSV</a>
    </div>
</div>

<!-- Filter -->
<div class="card mb-3">
    <div class="card-body py-3">
        <form method="GET" class="row g-2 align-items-end">
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Period</label>
                <select name="period" class="form-select form-select-sm">
                    <option value="7" {{ request('period')=='7'?'selected':'' }}>Last 7 days</option>
                    <option value="30" {{ (request('period','30')=='30')?'selected':'' }}>Last 30 days</option>
                    <option value="90" {{ request('period')=='90'?'selected':'' }}>Last 3 months</option>
                    <option value="365" {{ request('period')=='365'?'selected':'' }}>Last year</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-funnel me-1"></i>Apply</button>
            </div>
        </form>
    </div>
</div>

<!-- KPIs -->
<div class="row g-3 mb-3">
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-green">
            <div class="stat-icon"><i class="bi bi-currency-dollar"></i></div>
            <div class="stat-info"><h3>{{ $currencySymbol }}{{ number_format($totalRevenue ?? 0, 0) }}</h3><p>Total Revenue</p></div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-teal">
            <div class="stat-icon"><i class="bi bi-bag-check"></i></div>
            <div class="stat-info"><h3>{{ $totalOrders ?? 0 }}</h3><p>Total Orders</p></div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-brown">
            <div class="stat-icon"><i class="bi bi-graph-up-arrow"></i></div>
            <div class="stat-info"><h3>{{ $currencySymbol }}{{ number_format($avgOrder ?? 0, 2) }}</h3><p>Avg Order</p></div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-gold">
            <div class="stat-icon"><i class="bi bi-x-circle"></i></div>
            <div class="stat-info"><h3>{{ $cancelledOrders ?? 0 }}</h3><p>Cancelled</p></div>
        </div>
    </div>
</div>

<!-- Chart -->
<div class="card mb-3">
    <div class="card-header bg-white border-bottom py-3">
        <i class="bi bi-graph-up me-2 text-success"></i><strong>Revenue Over Time</strong>
    </div>
    <div class="card-body">
        <canvas id="salesChart" height="80"></canvas>
    </div>
</div>

<!-- Table -->
<div class="card">
    <div class="card-header bg-white border-bottom py-3">
        <i class="bi bi-table me-2 text-primary"></i><strong>Daily Breakdown</strong>
    </div>
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead><tr><th>Date</th><th>Orders</th><th>Revenue</th><th>Avg Order</th><th>Cancelled</th></tr></thead>
                <tbody>
                    @forelse($dailyData ?? [] as $day)
                    <tr>
                        <td>{{ \Carbon\Carbon::parse($day->date)->format('M j, Y') }}</td>
                        <td><span class="badge badge-pill-info">{{ $day->order_count }}</span></td>
                        <td class="fw-semibold text-success">{{ $currencySymbol }}{{ number_format($day->revenue, 2) }}</td>
                        <td>{{ $currencySymbol }}{{ $day->order_count > 0 ? number_format($day->revenue / $day->order_count, 2) : '0.00' }}</td>
                        <td><span class="badge badge-pill-secondary">{{ $day->cancelled ?? 0 }}</span></td>
                    </tr>
                    @empty
                    <tr><td colspan="5" class="text-center text-muted py-4">No data for selected period</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
const sctx = document.getElementById('salesChart');
if (sctx) {
    new Chart(sctx, {
        type: 'bar',
        data: {
            labels: {!! json_encode(($dailyData ?? collect())->pluck('date')) !!},
            datasets: [{
                label: 'Revenue ($)',
                data: {!! json_encode(($dailyData ?? collect())->pluck('revenue')) !!},
                backgroundColor: 'rgba(74,140,63,.6)',
                borderColor: '#4a8c3f',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: { responsive:true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
}
</script>
@endpush
