@extends('layouts.admin')

@section('title', 'Product Analytics')

@push('styles')
<style>
.product-card {
    border: none;
    border-radius: 15px;
    transition: all 0.3s ease;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.product-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
}

.performance-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
}

.indicator-high { background: #28a745; }
.indicator-medium { background: #ffc107; }
.indicator-low { background: #dc3545; }

.category-filter {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
}

.metric-row {
    border-bottom: 1px solid #f1f3f4;
    padding: 15px 0;
}

.metric-row:last-child {
    border-bottom: none;
}

.performance-chart {
    height: 300px;
}

.top-performer {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
}

.needs-attention {
    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
    color: white;
}
</style>
@endpush

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Product Analytics</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.reports.index') }}">Reports</a></li>
                <li class="breadcrumb-item active">Products</li>
            </ol>
        </div>
    </div>
</div>

<!-- Filters -->
<div class="category-filter mb-4">
    <form method="GET" id="productFilterForm">
        <div class="row align-items-end">
            <div class="col-md-3">
                <label for="period" class="form-label fw-bold">Analysis Period:</label>
                <select name="period" class="form-control">
                    <option value="week" {{ request('period') == 'week' ? 'selected' : '' }}>Last 7 Days</option>
                    <option value="month" {{ request('period') == 'month' ? 'selected' : '' }}>Last 30 Days</option>
                    <option value="quarter" {{ request('period') == 'quarter' ? 'selected' : '' }}>Last 3 Months</option>
                    <option value="year" {{ request('period') == 'year' ? 'selected' : '' }}>Last Year</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="category" class="form-label fw-bold">Category:</label>
                <select name="category" class="form-control">
                    <option value="">All Categories</option>
                    @if(isset($categories))
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    @endif
                </select>
            </div>
            <div class="col-md-2">
                <label for="sort_by" class="form-label fw-bold">Sort By:</label>
                <select name="sort_by" class="form-control">
                    <option value="revenue" {{ request('sort_by') == 'revenue' ? 'selected' : '' }}>Revenue</option>
                    <option value="quantity" {{ request('sort_by') == 'quantity' ? 'selected' : '' }}>Quantity Sold</option>
                    <option value="orders" {{ request('sort_by') == 'orders' ? 'selected' : '' }}>Order Frequency</option>
                    <option value="profit_margin" {{ request('sort_by') == 'profit_margin' ? 'selected' : '' }}>Profit Margin</option>
                </select>
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-search"></i> Analyze
                </button>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-success btn-block" onclick="exportProductData()">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>
    </form>
</div>

<!-- Quick Stats -->
<div class="row mb-4">
    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card product-card top-performer">
            <div class="card-body text-center">
                <h5 class="card-title">Top Performer</h5>
                @if(isset($analytics['top_product']))
                    <h3>{{ $analytics['top_product']['name'] ?? 'N/A' }}</h3>
                    <p class="mb-0">${{ number_format($analytics['top_product']['revenue'] ?? 0, 2) }} revenue</p>
                @else
                    <p>No data available</p>
                @endif
            </div>
        </div>
    </div>
    
    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card product-card">
            <div class="card-body text-center">
                <h5 class="card-title text-muted">Total Products</h5>
                <h3 class="text-primary">{{ $analytics['total_products'] ?? 0 }}</h3>
                <p class="mb-0 text-muted">{{ $analytics['active_products'] ?? 0 }} active</p>
            </div>
        </div>
    </div>
    
    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card product-card">
            <div class="card-body text-center">
                <h5 class="card-title text-muted">Avg Performance</h5>
                <h3 class="text-info">${{ number_format($analytics['avg_revenue'] ?? 0, 2) }}</h3>
                <p class="mb-0 text-muted">per product</p>
            </div>
        </div>
    </div>
    
    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card product-card needs-attention">
            <div class="card-body text-center">
                <h5 class="card-title">Needs Attention</h5>
                <h3>{{ $analytics['low_performers'] ?? 0 }}</h3>
                <p class="mb-0">low-selling products</p>
            </div>
        </div>
    </div>
</div>

<!-- Product Performance Table -->
<div class="row">
    <div class="col-12">
        <div class="card product-card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="card-title mb-0">Product Performance Analysis</h5>
                    </div>
                    <div class="col-auto">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-sm btn-outline-primary active" onclick="switchView('table')">
                                <i class="fas fa-table"></i> Table
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="switchView('chart')">
                                <i class="fas fa-chart-bar"></i> Chart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Table View -->
                <div id="tableView">
                    @if(isset($products) && count($products) > 0)
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Units Sold</th>
                                        <th>Revenue</th>
                                        <th>Avg Price</th>
                                        <th>Orders</th>
                                        <th>Performance</th>
                                        <th>Trend</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($products as $product)
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    @if($product['image'])
                                                        <img src="{{ $product['image'] }}" alt="{{ $product['name'] }}" class="product-image me-3">
                                                    @else
                                                        <div class="bg-light d-flex align-items-center justify-content-center me-3 product-image">
                                                            <i class="fas fa-image text-muted"></i>
                                                        </div>
                                                    @endif
                                                    <div>
                                                        <strong>{{ $product['name'] }}</strong>
                                                        @if($product['status'] === 'inactive')
                                                            <br><span class="badge badge-secondary">Inactive</span>
                                                        @endif
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge badge-info">{{ $product['category'] }}</span>
                                            </td>
                                            <td>
                                                <strong>{{ number_format($product['quantity_sold']) }}</strong>
                                            </td>
                                            <td>
                                                <strong>${{ number_format($product['revenue'], 2) }}</strong>
                                            </td>
                                            <td>
                                                ${{ number_format($product['avg_price'], 2) }}
                                            </td>
                                            <td>
                                                <span class="badge badge-primary">{{ $product['order_count'] }}</span>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <span class="performance-indicator indicator-{{ $product['performance_level'] }}"></span>
                                                    {{ ucfirst($product['performance_level']) }}
                                                    <div class="ml-2">
                                                        <div class="progress" style="width: 60px; height: 8px;">
                                                            <div class="progress-bar bg-{{ $product['performance_level'] == 'high' ? 'success' : ($product['performance_level'] == 'medium' ? 'warning' : 'danger') }}" 
                                                                 style="width: {{ $product['performance_percentage'] }}%"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                @if(isset($product['trend']))
                                                    <span class="text-{{ $product['trend'] >= 0 ? 'success' : 'danger' }}">
                                                        <i class="fas fa-arrow-{{ $product['trend'] >= 0 ? 'up' : 'down' }}"></i>
                                                        {{ abs($product['trend']) }}%
                                                    </span>
                                                @else
                                                    <span class="text-muted">No data</span>
                                                @endif
                                            </td>
                                            <td>
                                                <div class="btn-group" role="group">
                                                    <a href="{{ route('admin.products.show', $product['id']) }}" 
                                                       class="btn btn-sm btn-outline-info" title="View Details">
                                                        <i class="fas fa-eye"></i>
                                                    </a>
                                                    <a href="{{ route('admin.products.edit', $product['id']) }}" 
                                                       class="btn btn-sm btn-outline-primary" title="Edit Product">
                                                        <i class="fas fa-edit"></i>
                                                    </a>
                                                    <button type="button" class="btn btn-sm btn-outline-success" 
                                                            onclick="viewDetailedAnalytics({{ $product['id'] }})" title="Detailed Analytics">
                                                        <i class="fas fa-chart-line"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Pagination -->
                        @if(isset($products_paginated) && $products_paginated->hasPages())
                            <div class="mt-3">
                                {{ $products_paginated->appends(request()->query())->links() }}
                            </div>
                        @endif
                    @else
                        <div class="text-center py-5">
                            <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                            <h5>No product data available</h5>
                            <p class="text-muted">No products found for the selected criteria.</p>
                        </div>
                    @endif
                </div>

                <!-- Chart View (hidden by default) -->
                <div id="chartView" style="display: none;">
                    <div class="row">
                        <div class="col-lg-6">
                            <h6>Revenue by Product (Top 10)</h6>
                            <div class="performance-chart">
                                <canvas id="revenueChart"></canvas>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h6>Quantity Sold by Category</h6>
                            <div class="performance-chart">
                                <canvas id="categoryChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Product Detail Analytics Modal -->
<div class="modal fade" id="productAnalyticsModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Product Analytics Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalContent">
                    <div class="text-center py-4">
                        <i class="fas fa-spinner fa-spin fa-2x"></i>
                        <p class="mt-2">Loading analytics...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
<script>
function switchView(viewType) {
    if (viewType === 'table') {
        document.getElementById('tableView').style.display = 'block';
        document.getElementById('chartView').style.display = 'none';
    } else {
        document.getElementById('tableView').style.display = 'none';
        document.getElementById('chartView').style.display = 'block';
        initializeCharts();
    }
    
    // Update button states
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: {!! json_encode($chart_data['revenue_labels'] ?? []) !!},
            datasets: [{
                label: 'Revenue',
                data: {!! json_encode($chart_data['revenue_data'] ?? []) !!},
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
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
            }
        }
    });
    
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: {!! json_encode($chart_data['category_labels'] ?? []) !!},
            datasets: [{
                data: {!! json_encode($chart_data['category_data'] ?? []) !!},
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB', 
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
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
}

function viewDetailedAnalytics(productId) {
    $('#productAnalyticsModal').modal('show');
    
    $.get(`{{ url('admin/reports/product-details') }}/${productId}`)
        .done(function(data) {
            $('#modalContent').html(data);
        })
        .fail(function() {
            $('#modalContent').html(`
                <div class="alert alert-danger text-center">
                    <i class="fas fa-exclamation-triangle"></i>
                    Failed to load product analytics. Please try again.
                </div>
            `);
        });
}

function exportProductData() {
    const params = new URLSearchParams(new FormData(document.getElementById('productFilterForm')));
    window.location.href = '{{ route("admin.reports.export-products") }}?' + params.toString();
}

// Initialize table view as active on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-group .btn').classList.add('active');
});
</script>
@endpush