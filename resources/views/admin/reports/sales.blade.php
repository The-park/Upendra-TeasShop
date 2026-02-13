@extends('layouts.admin')

@section('title', 'Sales Reports')

@push('styles')
<style>
.sales-summary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 30px;
}

.period-selector {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.stats-card {
    border: none;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.trend-up {
    color: #28a745;
}

.trend-down {
    color: #dc3545;
}

.sales-table th {
    background: #f8f9fa;
    border: none;
    font-weight: 600;
}

.export-section {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
}
</style>
@endpush

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Sales Reports</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.reports.index') }}">Reports</a></li>
                <li class="breadcrumb-item active">Sales</li>
            </ol>
        </div>
    </div>
</div>

<!-- Period Selector -->
<div class="period-selector">
    <form method="GET" id="salesFilterForm">
        <div class="row align-items-end">
            <div class="col-md-2">
                <label for="period" class="form-label fw-bold">Report Period:</label>
                <select name="period" class="form-control" onchange="handlePeriodChange()">
                    <option value="today" {{ request('period') == 'today' ? 'selected' : '' }}>Today</option>
                    <option value="yesterday" {{ request('period') == 'yesterday' ? 'selected' : '' }}>Yesterday</option>
                    <option value="week" {{ request('period') == 'week' ? 'selected' : '' }}>This Week</option>
                    <option value="last_week" {{ request('period') == 'last_week' ? 'selected' : '' }}>Last Week</option>
                    <option value="month" {{ request('period') == 'month' ? 'selected' : '' }}>This Month</option>
                    <option value="last_month" {{ request('period') == 'last_month' ? 'selected' : '' }}>Last Month</option>
                    <option value="quarter" {{ request('period') == 'quarter' ? 'selected' : '' }}>This Quarter</option>
                    <option value="year" {{ request('period') == 'year' ? 'selected' : '' }}>This Year</option>
                    <option value="custom" {{ request('period') == 'custom' ? 'selected' : '' }}>Custom Range</option>
                </select>
            </div>
            <div class="col-md-2" id="startDate" style="display: {{ request('period') == 'custom' ? 'block' : 'none' }};">
                <label for="start_date" class="form-label fw-bold">Start Date:</label>
                <input type="date" name="start_date" class="form-control" value="{{ request('start_date') }}">
            </div>
            <div class="col-md-2" id="endDate" style="display: {{ request('period') == 'custom' ? 'block' : 'none' }};">
                <label for="end_date" class="form-label fw-bold">End Date:</label>
                <input type="date" name="end_date" class="form-control" value="{{ request('end_date') }}">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-search"></i> Generate Report
                </button>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-success btn-block" onclick="printReport()">
                    <i class="fas fa-print"></i> Print Report
                </button>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-info btn-block" onclick="exportToCSV()">
                    <i class="fas fa-download"></i> Export CSV
                </button>
            </div>
        </div>
    </form>
</div>

<!-- Sales Summary -->
<div class="sales-summary mb-4">
    <div class="row align-items-center">
        <div class="col-md-8">
            <h3 class="mb-2">Sales Summary</h3>
            @if(isset($period_display))
                <p class="mb-0 opacity-75">{{ $period_display }}</p>
            @endif
        </div>
        <div class="col-md-4 text-right">
            <div class="d-flex justify-content-end align-items-center">
                <div class="text-center">
                    <h2 class="mb-1">${{ number_format($summary['total_revenue'] ?? 0, 2) }}</h2>
                    <small>Total Revenue</small>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Key Metrics -->
<div class="row mb-4">
    <div class="col-xl-3 col-lg-6">
        <div class="card stats-card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style="width: 48px; height: 48px;">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-0">Total Orders</h6>
                        <h4 class="mb-0">{{ number_format($summary['total_orders'] ?? 0) }}</h4>
                        @if(isset($summary['orders_change']))
                            <small class="{{ $summary['orders_change'] >= 0 ? 'trend-up' : 'trend-down' }}">
                                <i class="fas fa-arrow-{{ $summary['orders_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($summary['orders_change']) }}% from last period
                            </small>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-6">
        <div class="card stats-card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style="width: 48px; height: 48px;">
                            <i class="fas fa-calculator"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-0">Average Order Value</h6>
                        <h4 class="mb-0">${{ number_format($summary['avg_order_value'] ?? 0, 2) }}</h4>
                        @if(isset($summary['avg_change']))
                            <small class="{{ $summary['avg_change'] >= 0 ? 'trend-up' : 'trend-down' }}">
                                <i class="fas fa-arrow-{{ $summary['avg_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($summary['avg_change']) }}% from last period
                            </small>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-6">
        <div class="card stats-card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style="width: 48px; height: 48px;">
                            <i class="fas fa-utensils"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-0">Items Sold</h6>
                        <h4 class="mb-0">{{ number_format($summary['items_sold'] ?? 0) }}</h4>
                        @if(isset($summary['items_change']))
                            <small class="{{ $summary['items_change'] >= 0 ? 'trend-up' : 'trend-down' }}">
                                <i class="fas fa-arrow-{{ $summary['items_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($summary['items_change']) }}% from last period
                            </small>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-6">
        <div class="card stats-card">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style="width: 48px; height: 48px;">
                            <i class="fas fa-chart-line"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="text-muted mb-0">Completion Rate</h6>
                        <h4 class="mb-0">{{ number_format($summary['completion_rate'] ?? 0, 1) }}%</h4>
                        @if(isset($summary['completion_change']))
                            <small class="{{ $summary['completion_change'] >= 0 ? 'trend-up' : 'trend-down' }}">
                                <i class="fas fa-arrow-{{ $summary['completion_change'] >= 0 ? 'up' : 'down' }}"></i>
                                {{ abs($summary['completion_change']) }}% from last period
                            </small>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Detailed Sales Table -->
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="card-title mb-0">Detailed Sales Data</h5>
                    </div>
                    <div class="col-auto">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="toggleView('daily')">
                                Daily
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="toggleView('hourly')">
                                Hourly
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="toggleView('products')">
                                By Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Daily View -->
                <div id="dailyView" class="table-responsive">
                    @if(isset($daily_sales) && count($daily_sales) > 0)
                        <table class="table table-striped sales-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Orders</th>
                                    <th>Items Sold</th>
                                    <th>Revenue</th>
                                    <th>Avg Order</th>
                                    <th>Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($daily_sales as $day)
                                    <tr>
                                        <td>
                                            <strong>{{ $day['date'] }}</strong>
                                            <br><small class="text-muted">{{ $day['day_name'] }}</small>
                                        </td>
                                        <td>
                                            <span class="badge badge-primary">{{ $day['orders'] }}</span>
                                        </td>
                                        <td>{{ number_format($day['items']) }}</td>
                                        <td><strong>${{ number_format($day['revenue'], 2) }}</strong></td>
                                        <td>${{ number_format($day['avg_order'], 2) }}</td>
                                        <td>
                                            @if(isset($day['growth']))
                                                <span class="{{ $day['growth'] >= 0 ? 'trend-up' : 'trend-down' }}">
                                                    <i class="fas fa-arrow-{{ $day['growth'] >= 0 ? 'up' : 'down' }}"></i>
                                                    {{ abs($day['growth']) }}%
                                                </span>
                                            @else
                                                <span class="text-muted">-</span>
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @else
                        <div class="text-center py-4">
                            <i class="fas fa-chart-line fa-3x text-muted mb-3"></i>
                            <h5>No sales data available</h5>
                            <p class="text-muted">No sales recorded for the selected period.</p>
                        </div>
                    @endif
                </div>

                <!-- Hourly View (hidden by default) -->
                <div id="hourlyView" class="table-responsive" style="display: none;">
                    @if(isset($hourly_sales) && count($hourly_sales) > 0)
                        <table class="table table-striped sales-table">
                            <thead>
                                <tr>
                                    <th>Hour</th>
                                    <th>Orders</th>
                                    <th>Revenue</th>
                                    <th>Items</th>
                                    <th>Peak Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($hourly_sales as $hour)
                                    <tr class="{{ $hour['is_peak'] ? 'table-warning' : '' }}">
                                        <td>
                                            <strong>{{ $hour['time'] }}</strong>
                                            @if($hour['is_peak'])
                                                <i class="fas fa-star text-warning ml-2" title="Peak hour"></i>
                                            @endif
                                        </td>
                                        <td><span class="badge badge-info">{{ $hour['orders'] }}</span></td>
                                        <td><strong>${{ number_format($hour['revenue'], 2) }}</strong></td>
                                        <td>{{ $hour['items'] }}</td>
                                        <td>
                                            <div class="progress" style="height: 8px;">
                                                <div class="progress-bar bg-success" style="width: {{ $hour['percentage'] }}%"></div>
                                            </div>
                                            <small>{{ number_format($hour['percentage'], 1) }}%</small>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @else
                        <div class="text-center py-4">
                            <i class="fas fa-clock fa-3x text-muted mb-3"></i>
                            <h5>No hourly data available</h5>
                            <p class="text-muted">No hourly breakdown available for the selected period.</p>
                        </div>
                    @endif
                </div>

                <!-- Product View (hidden by default) -->
                <div id="productsView" class="table-responsive" style="display: none;">
                    @if(isset($product_sales) && count($product_sales) > 0)
                        <table class="table table-striped sales-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Units Sold</th>
                                    <th>Revenue</th>
                                    <th>Avg Price</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($product_sales as $product)
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                @if($product['image'])
                                                    <img src="{{ $product['image'] }}" alt="{{ $product['name'] }}" 
                                                         class="img-thumbnail me-2" style="width: 40px; height: 40px; object-fit: cover;">
                                                @endif
                                                <strong>{{ $product['name'] }}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge badge-secondary">{{ $product['category'] }}</span>
                                        </td>
                                        <td>
                                            <span class="badge badge-primary">{{ $product['quantity'] }}</span>
                                        </td>
                                        <td><strong>${{ number_format($product['revenue'], 2) }}</strong></td>
                                        <td>${{ number_format($product['avg_price'], 2) }}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="progress flex-grow-1 me-2" style="height: 8px;">
                                                    <div class="progress-bar bg-info" style="width: {{ $product['percentage'] }}%"></div>
                                                </div>
                                                <small>{{ number_format($product['percentage'], 1) }}%</small>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @else
                        <div class="text-center py-4">
                            <i class="fas fa-box fa-3x text-muted mb-3"></i>
                            <h5>No product data available</h5>
                            <p class="text-muted">No product sales data for the selected period.</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function handlePeriodChange() {
    const period = document.querySelector('select[name="period"]').value;
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    if (period === 'custom') {
        startDate.style.display = 'block';
        endDate.style.display = 'block';
    } else {
        startDate.style.display = 'none';
        endDate.style.display = 'none';
    }
}

function toggleView(viewType) {
    // Hide all views
    document.getElementById('dailyView').style.display = 'none';
    document.getElementById('hourlyView').style.display = 'none';
    document.getElementById('productsView').style.display = 'none';
    
    // Show selected view
    document.getElementById(viewType + 'View').style.display = 'block';
    
    // Update button states
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function printReport() {
    window.print();
}

function exportToCSV() {
    const params = new URLSearchParams(new FormData(document.getElementById('salesFilterForm')));
    window.location.href = '{{ route("admin.reports.export-sales") }}?' + params.toString();
}

// Initialize first view as active
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-group .btn').classList.add('active');
});
</script>
@endpush