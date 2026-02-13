@extends('layouts.admin')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')
@section('page-description', 'Welcome to TeaShop Admin Panel')

@section('header', true)

@section('content')
<!-- Stats Cards -->
<div class="row mb-4">
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card stat-card h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase opacity-75 mb-1">Today's Sales</h6>
                        <h3 class="mb-0">${{ number_format($todaysSales, 2) }}</h3>
                        <small class="opacity-75">
                            <i class="bi bi-arrow-up"></i> +12% from yesterday
                        </small>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="bi bi-currency-dollar"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card stat-card h-100" style="background: linear-gradient(135deg, #D2691E, #e67e3a);">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase opacity-75 mb-1">Orders Today</h6>
                        <h3 class="mb-0">{{ $todaysOrders }}</h3>
                        <small class="opacity-75">
                            <i class="bi bi-arrow-up"></i> +3 from yesterday
                        </small>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="bi bi-receipt"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card stat-card h-100" style="background: linear-gradient(135deg, #28a745, #34ce57);">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase opacity-75 mb-1">Average Order</h6>
                        <h3 class="mb-0">${{ number_format($averageOrder, 2) }}</h3>
                        <small class="opacity-75">
                            <i class="bi bi-arrow-down"></i> -2% from yesterday
                        </small>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="bi bi-graph-up"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card stat-card h-100" style="background: linear-gradient(135deg, #17a2b8, #20c9e7);">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-uppercase opacity-75 mb-1">Active Tables</h6>
                        <h3 class="mb-0">{{ $activeTables }} / {{ $totalTables }}</h3>
                        <small class="opacity-75">
                            {{ round(($activeTables / max($totalTables, 1)) * 100) }}% occupied
                        </small>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="bi bi-table"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Charts and Recent Data -->
<div class="row">
    <div class="col-xl-8">
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">
                    <i class="bi bi-graph-up me-2"></i>Sales Overview - Last 7 Days
                </h5>
            </div>
            <div class="card-body">
                <canvas id="salesChart" height="100"></canvas>
            </div>
        </div>
    </div>
    
    <div class="col-xl-4">
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">
                    <i class="bi bi-pie-chart me-2"></i>Top Selling Products
                </h5>
            </div>
            <div class="card-body">
                @if($topProducts->count() > 0)
                    @foreach($topProducts as $product)
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 class="mb-0">{{ $product->name }}</h6>
                            <small class="text-muted">{{ $product->orders_count }} orders</small>
                        </div>
                        <div class="text-end">
                            <div class="fw-bold text-success">${{ number_format($product->total_revenue, 2) }}</div>
                            <small class="text-muted">Revenue</small>
                        </div>
                    </div>
                    @endforeach
                @else
                    <p class="text-muted text-center">No sales data available yet.</p>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Recent Orders -->
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">
                    <i class="bi bi-clock-history me-2"></i>Recent Orders
                </h5>
                <a href="{{ route('admin.orders.history') }}" class="btn btn-primary btn-sm">
                    View All <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
            <div class="card-body">
                @if($recentOrders->count() > 0)
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Order #</th>
                                <th>Table</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($recentOrders as $order)
                            <tr>
                                <td>
                                    <span class="fw-bold">{{ $order->order_number }}</span>
                                </td>
                                <td>
                                    <i class="bi bi-table me-1"></i>{{ $order->table->table_number }}
                                </td>
                                <td>{{ $order->items_count }} items</td>
                                <td class="fw-bold text-success">${{ number_format($order->total_amount, 2) }}</td>
                                <td>
                                    @php
                                        $statusConfig = [
                                            'pending' => ['class' => 'primary', 'icon' => 'clock'],
                                            'confirmed' => ['class' => 'warning', 'icon' => 'check-circle'],
                                            'preparing' => ['class' => 'info', 'icon' => 'arrow-repeat'],
                                            'ready' => ['class' => 'success', 'icon' => 'check2-circle'],
                                            'served' => ['class' => 'secondary', 'icon' => 'check-all'],
                                            'cancelled' => ['class' => 'danger', 'icon' => 'x-circle']
                                        ];
                                        $config = $statusConfig[$order->status] ?? ['class' => 'secondary', 'icon' => 'question'];
                                    @endphp
                                    <span class="badge bg-{{ $config['class'] }}">
                                        <i class="bi bi-{{ $config['icon'] }} me-1"></i>{{ ucfirst($order->status) }}
                                    </span>
                                </td>
                                <td>
                                    <small>{{ $order->created_at->diffForHumans() }}</small>
                                </td>
                                <td>
                                    <a href="{{ route('admin.orders.show', $order) }}" class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                @else
                <div class="text-center py-5">
                    <i class="bi bi-receipt-cutoff text-muted" style="font-size: 3rem;"></i>
                    <h5 class="text-muted mt-3">No orders yet</h5>
                    <p class="text-muted">Orders will appear here once customers start placing them.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sales chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesData = @json($salesChartData);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.labels,
            datasets: [{
                label: 'Daily Sales ($)',
                data: salesData.data,
                borderColor: 'var(--color-matcha)',
                backgroundColor: 'var(--color-matcha)',
                borderWidth: 3,
                fill: false,
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
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});
</script>
@endpush