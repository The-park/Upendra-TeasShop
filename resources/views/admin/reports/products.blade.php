@extends('layouts.admin')
@section('title', 'Product Report')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.analytics.index') }}">Reports</a></li>
<li class="breadcrumb-item active">Products</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-box-seam me-2 text-primary"></i>Product Performance</h1>
        <p class="page-subtitle">Sales breakdown by product</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.analytics.sales') }}" class="btn btn-outline-success"><i class="bi bi-graph-up me-1"></i>Sales Report</a>
    </div>
</div>

<!-- Period filter -->
<div class="card mb-3">
    <div class="card-body py-3">
        <form method="GET" class="row g-2 align-items-end">
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Period</label>
                <select name="period" class="form-select form-select-sm">
                    <option value="30" {{ (request('period','30')=='30')?'selected':'' }}>Last 30 days</option>
                    <option value="90" {{ request('period')=='90'?'selected':'' }}>Last 3 months</option>
                    <option value="365" {{ request('period')=='365'?'selected':'' }}>Last year</option>
                    <option value="all" {{ request('period')=='all'?'selected':'' }}>All time</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Category</label>
                <select name="category" class="form-select form-select-sm">
                    <option value="">All Categories</option>
                    @foreach($categories ?? [] as $cat)
                    <option value="{{ $cat->id }}" {{ request('category')==$cat->id?'selected':'' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-funnel me-1"></i>Apply</button>
            </div>
        </form>
    </div>
</div>

<!-- Chart + Table -->
<div class="row g-3">
    <div class="col-lg-5">
        <div class="card h-100">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-pie-chart me-2 text-primary"></i><strong>Revenue by Product</strong>
            </div>
            <div class="card-body d-flex align-items-center justify-content-center">
                <canvas id="productChart" height="200"></canvas>
            </div>
        </div>
    </div>
    <div class="col-lg-7">
        <div class="card h-100">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-trophy me-2 text-warning"></i><strong>Product Rankings</strong>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead><tr><th>#</th><th>Product</th><th>Category</th><th>Qty Sold</th><th>Revenue</th></tr></thead>
                        <tbody>
                            @forelse($productStats ?? [] as $i => $p)
                            <tr>
                                <td><span class="fw-bold">{{ ['??','??','??'][$i] ?? ($i+1) }}</span></td>
                                <td>
                                    <div class="fw-semibold" style="font-size:13px;">{{ $p->name }}</div>
                                    @if($p->selling_price)<small class="text-muted">{{ $currencySymbol }}{{ $p->selling_price }}</small>@endif
                                </td>
                                <td><span class="badge badge-pill-info">{{ $p->category->name ?? 'N/A' }}</span></td>
                                <td><span class="badge badge-pill-secondary">{{ $p->total_sold }}</span></td>
                                <td class="fw-semibold text-success">{{ $currencySymbol }}{{ number_format($p->total_revenue, 2) }}</td>
                            </tr>
                            @empty
                            <tr><td colspan="5" class="text-center text-muted py-4">No sales data available</td></tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
const pctx = document.getElementById('productChart');
if (pctx) {
    const labels = {!! json_encode(collect($productStats ?? [])->take(8)->pluck('name')) !!};
    const data   = {!! json_encode(collect($productStats ?? [])->take(8)->pluck('total_revenue')) !!};
    const colors = ['#4a8c3f','#6db560','#2d5a27','#c8860a','#5bc0de','#d9534f','#f0ad4e','#777'];
    new Chart(pctx, {
        type:'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: colors, hoverOffset: 6 }] },
        options: { responsive:true, plugins: { legend: { position:'bottom' } } }
    });
}
</script>
@endpush
