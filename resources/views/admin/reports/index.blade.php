@extends('layouts.admin')

@section('title', 'Reports & Analytics')

@push('styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.css">
<style>
.metric-card {
    border-radius: 10px;
    transition: transform 0.2s;
}

.metric-card:hover {
    transform: translateY(-5px);
}

.metric-value {
    font-size: 2rem;
    font-weight: bold;
}

.metric-change {
    font-size: 0.875rem;
}

.chart-container {
    position: relative;
    height: 400px;
}

.date-filter {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
}

.table-hover tbody tr:hover {
    background-color: rgba(0,123,255,.075);
}
</style>
@endpush

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Reports & Analytics</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Reports</li>
            </ol>
        </div>
    </div>
</div>

<!-- Date Filter -->
<div class="row mb-4">
    <div class="col-12">
        <div class="date-filter">
            <form method="GET" id="dateFilterForm">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <label for="period" class="form-label">Period:</label>
                        <select name="period" class="form-control" onchange="toggleCustomDates()">
                            <option value="today" {{ request('period') == 'today' ? 'selected' : '' }}>Today</option>
                            <option value="week" {{ request('period') == 'week' ? 'selected' : '' }}>This Week</option>
                            <option value="month" {{ request('period') == 'month' ? 'selected' : '' }}>This Month</option>
                            <option value="quarter" {{ request('period') == 'quarter' ? 'selected' : '' }}>This Quarter</option>
                            <option value="year" {{ request('period') == 'year' ? 'selected' : '' }}>This Year</option>
                            <option value="custom" {{ request('period') == 'custom' ? 'selected' : '' }}>Custom Range</option>
                        </select>
                    </div>
                    <div class="col-md-3" id="dateFrom" style="display: {{ request('period') == 'custom' ? 'block' : 'none' }};">
                        <label for="date_from" class="form-label">From:</label>
                        <input type="date" name="date_from" class="form-control" value="{{ request('date_from') }}">
                    </div>
                    <div class="col-md-3" id="dateTo" style="display: {{ request('period') == 'custom' ? 'block' : 'none' }};">
                        <label for="date_to" class="form-label">To:</label>
                        <input type="date" name="date_to" class="form-control" value="{{ request('date_to') }}">
                    </div>
                    <div class="col-md-2">
                        <label>&nbsp;</label>
                        <button type="submit" class="btn btn-primary btn-block">Apply Filter</button>
                    </div>
                    <div class="col-md-2">
                        <label>&nbsp;</label>
                        <button type="button" class="btn btn-success btn-block" onclick="exportReport()">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Key Metrics -->
<div class="row mb-4">
    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card metric-card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="rounded-3 bg-primary text-white p-3">
                            <i class="fas fa-dollar-sign fa-2x"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-1">Total Revenue</h6>
                        <div class="metric-value text-primary">${{ number_format($analytics['total_revenue'] ?? 0, 2) }}</div>
                        @if(isset($analytics['revenue_change']))
                            <div class="metric-change {{ $analytics['revenue_change'] >= 0 ? 'text-success' : 'text-danger' }}">
                                <i class="fas fa-arrow-{{ $analytics['revenue_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($analytics['revenue_change']) }}% vs last period
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card metric-card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="rounded-3 bg-success text-white p-3">
                            <i class="fas fa-shopping-cart fa-2x"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-1">Total Orders</h6>
                        <div class="metric-value text-success">{{ number_format($analytics['total_orders'] ?? 0) }}</div>
                        @if(isset($analytics['orders_change']))
                            <div class="metric-change {{ $analytics['orders_change'] >= 0 ? 'text-success' : 'text-danger' }}">
                                <i class="fas fa-arrow-{{ $analytics['orders_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($analytics['orders_change']) }}% vs last period
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card metric-card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="rounded-3 bg-info text-white p-3">
                            <i class="fas fa-calculator fa-2x"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-1">Average Order</h6>
                        <div class="metric-value text-info">${{ number_format($analytics['average_order'] ?? 0, 2) }}</div>
                        @if(isset($analytics['avg_change']))
                            <div class="metric-change {{ $analytics['avg_change'] >= 0 ? 'text-success' : 'text-danger' }}">
                                <i class="fas fa-arrow-{{ $analytics['avg_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($analytics['avg_change']) }}% vs last period
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card metric-card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="rounded-3 bg-warning text-white p-3">
                            <i class="fas fa-utensils fa-2x"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-1">Items Sold</h6>
                        <div class="metric-value text-warning">{{ number_format($analytics['items_sold'] ?? 0) }}</div>
                        @if(isset($analytics['items_change']))
                            <div class="metric-change {{ $analytics['items_change'] >= 0 ? 'text-success' : 'text-danger' }}">
                                <i class="fas fa-arrow-{{ $analytics['items_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($analytics['items_change']) }}% vs last period
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Charts Row -->
<div class="row mb-4">
    <!-- Revenue Chart -->
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Revenue Trend</h5>
            </div>
            <div class="card-body">
                <div class="chart-container">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Status Distribution -->
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Order Status Distribution</h5>
            </div>
            <div class="card-body">
                <div class="chart-container">
                    <canvas id="statusChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <!-- Top Products -->
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Top Selling Products</h5>
            </div>
            <div class="card-body">
                @if(isset($analytics['top_products']) && count($analytics['top_products']) > 0)
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Sold</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($analytics['top_products'] as $product)
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                @if($product['image'])
                                                    <img src="{{ $product['image'] }}" alt="{{ $product['name'] }}" 
                                                         class="img-thumbnail me-3" style="width: 40px; height: 40px; object-fit: cover;">
                                                @else
                                                    <div class="bg-light d-flex align-items-center justify-content-center me-3" 
                                                         style="width: 40px; height: 40px; border-radius: 4px;">
                                                        <i class="fas fa-image text-muted"></i>
                                                    </div>
                                                @endif
                                                <strong>{{ $product['name'] }}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge badge-primary">{{ $product['quantity_sold'] }}</span>
                                        </td>
                                        <td>
                                            <strong>${{ number_format($product['revenue'], 2) }}</strong>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-4">
                        <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                        <p class="text-muted">No product data available for selected period.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Sales by Category -->
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Sales by Category</h5>
            </div>
            <div class="card-body">
                @if(isset($analytics['categories']) && count($analytics['categories']) > 0)
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Orders</th>
                                    <th>Revenue</th>
                                    <th>Share</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($analytics['categories'] as $category)
                                    <tr>
                                        <td><strong>{{ $category['name'] }}</strong></td>
                                        <td><span class="badge badge-info">{{ $category['orders'] }}</span></td>
                                        <td><strong>${{ number_format($category['revenue'], 2) }}</strong></td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="progress flex-grow-1 me-2" style="height: 8px;">
                                                    <div class="progress-bar bg-success" style="width: {{ $category['percentage'] }}%"></div>
                                                </div>
                                                <small>{{ number_format($category['percentage'], 1) }}%</small>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-4">
                        <i class="fas fa-tags fa-3x text-muted mb-3"></i>
                        <p class="text-muted">No category data available for selected period.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
<script>
function toggleCustomDates() {
    const period = document.querySelector('select[name="period"]').value;
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    
    if (period === 'custom') {
        dateFrom.style.display = 'block';
        dateTo.style.display = 'block';
    } else {
        dateFrom.style.display = 'none';
        dateTo.style.display = 'none';
    }
}

function exportReport() {
    const params = new URLSearchParams(new FormData(document.getElementById('dateFilterForm')));
    window.location.href = '{{ route("admin.reports.export") }}?' + params.toString();
}

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: {!! json_encode($analytics['chart_labels'] ?? []) !!},
        datasets: [{
            label: 'Revenue',
            data: {!! json_encode($analytics['chart_revenue'] ?? []) !!},
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toFixed(2);
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Revenue: $' + context.parsed.y.toFixed(2);
                    }
                }
            }
        }
    }
});

// Order Status Chart
const statusCtx = document.getElementById('statusChart').getContext('2d');
const statusChart = new Chart(statusCtx, {
    type: 'doughnut',
    data: {
        labels: {!! json_encode($analytics['status_labels'] ?? []) !!},
        datasets: [{
            data: {!! json_encode($analytics['status_data'] ?? []) !!},
            backgroundColor: [
                '#dc3545', // pending - danger
                '#ffc107', // confirmed - warning  
                '#17a2b8', // preparing - info
                '#28a745', // ready - success
                '#007bff', // delivered - primary
                '#6c757d'  // cancelled - secondary
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Auto-refresh every 5 minutes
setInterval(function() {
    location.reload();
}, 300000);
</script>
@endpush