@extends('layouts.admin')
@section('title', 'Analytics')
@section('breadcrumb')
<li class="breadcrumb-item active">Analytics</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-graph-up-arrow me-2 text-primary"></i>Analytics</h1>
        <p class="page-subtitle">Detailed business performance insights</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.analytics.sales') }}" class="btn btn-tea"><i class="bi bi-bar-chart me-1"></i>Sales Report</a>
    </div>
</div>

<div class="row g-3 mb-4">
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-green">
            <div class="stat-icon"><i class="bi bi-currency-dollar"></i></div>
            <div class="stat-info"><h3>{{ $currencySymbol }}{{ number_format($monthRevenue ?? 0, 0) }}</h3><p>This Month</p></div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-teal">
            <div class="stat-icon"><i class="bi bi-bag-check"></i></div>
            <div class="stat-info"><h3>{{ $monthOrders ?? 0 }}</h3><p>Orders This Month</p></div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-brown">
            <div class="stat-icon"><i class="bi bi-people"></i></div>
            <div class="stat-info"><h3>{{ $uniqueCustomers ?? 0 }}</h3><p>Unique Customers</p></div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-gold">
            <div class="stat-icon"><i class="bi bi-clock-history"></i></div>
            <div class="stat-info"><h3>{{ $avgPrepTime ?? '�' }}m</h3><p>Avg Prep Time</p></div>
        </div>
    </div>
</div>

<div class="row g-3">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-activity me-2 text-success"></i><strong>Orders Per Hour</strong>
            </div>
            <div class="card-body">
                <canvas id="hourlyChart" height="100"></canvas>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-pie-chart me-2 text-primary"></i><strong>Orders by Status</strong>
            </div>
            <div class="card-body">
                <canvas id="statusChart" height="180"></canvas>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
const hctx = document.getElementById('hourlyChart');
if (hctx) {
    const labels = Array.from({length:24}, (_,i) => (i<12?(i||12)+' AM':(i==12?'12 PM':((i-12)+' PM'))));
    const data = {!! json_encode($hourlyData ?? array_fill(0, 24, 0)) !!};
    new Chart(hctx, {
        type:'bar',
        data: { labels, datasets: [{ label:'Orders', data, backgroundColor:'rgba(74,140,63,.6)', borderColor:'#4a8c3f', borderWidth:1, borderRadius:4 }] },
        options: { responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
    });
}
const sctx = document.getElementById('statusChart');
if (sctx) {
    new Chart(sctx, {
        type:'doughnut',
        data: {
            labels: ['Delivered','Preparing','Ready','Pending','Cancelled'],
            datasets: [{ data: {!! json_encode($statusCounts ?? [0,0,0,0,0]) !!}, backgroundColor:['#198754','#0dcaf0','#4a8c3f','#dc3545','#6c757d'] }]
        },
        options: { responsive:true, plugins: { legend: { position:'bottom' } } }
    });
}
</script>
@endpush
