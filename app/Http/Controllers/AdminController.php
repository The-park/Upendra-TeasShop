<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\RestaurantTable;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Admin dashboard with statistics and charts
     */
    public function dashboard()
    {
        // Calculate today's sales
        $todaysSales = Order::whereDate('created_at', Carbon::today())
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        // Count today's orders
        $todaysOrders = Order::whereDate('created_at', Carbon::today())
            ->where('status', '!=', 'cancelled')
            ->count();

        // Calculate average order value
        $averageOrder = $todaysOrders > 0 ? $todaysSales / $todaysOrders : 0;

        // Table statistics
        $totalTables = RestaurantTable::where('is_active', true)->count();
        $activeTables = RestaurantTable::where('is_active', true)
            ->where('status', '!=', 'available')
            ->count();

        // Get top selling products
        $topProducts = Product::select(
                'products.id',
                'products.name',
                'products.price',
                'products.image_path',
                'products.category_id'
            )
            ->selectRaw('COUNT(order_items.id) as orders_count')
            ->selectRaw('SUM(order_items.subtotal) as total_revenue')
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', '!=', 'cancelled')
            ->whereDate('orders.created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('products.id', 'products.name', 'products.price', 'products.image_path', 'products.category_id')
            ->orderBy('total_revenue', 'desc')
            ->limit(5)
            ->get();

        // Get recent orders
        $recentOrders = Order::with(['table', 'orderItems'])
            ->withCount('orderItems')
            ->latest()
            ->limit(10)
            ->get();

        // Prepare sales chart data for last 7 days
        $salesChartData = $this->getSalesChartData();

        return view('admin.dashboard', compact(
            'todaysSales',
            'todaysOrders', 
            'averageOrder',
            'totalTables',
            'activeTables',
            'topProducts',
            'recentOrders',
            'salesChartData'
        ));
    }

    /**
     * Analytics page
     */
    public function analytics()
    {
        $currencySymbol = Setting::get('currency_symbol', '$');

        // This month's stats
        $monthStart = Carbon::now()->startOfMonth();
        $monthRevenue = Order::where('status', '!=', 'cancelled')
            ->whereDate('created_at', '>=', $monthStart)
            ->sum('total_amount');
        $monthOrders = Order::where('status', '!=', 'cancelled')
            ->whereDate('created_at', '>=', $monthStart)
            ->count();

        // Unique customers (distinct customer names in non-cancelled orders)
        $uniqueCustomers = Order::where('status', '!=', 'cancelled')
            ->whereDate('created_at', '>=', $monthStart)
            ->distinct('customer_name')
            ->count('customer_name');

        // Average prep time in minutes (pending → confirmed/preparing → served)
        $avgPrepTime = Order::where('status', 'served')
            ->whereNotNull('served_at')
            ->whereDate('created_at', '>=', $monthStart)
            ->selectRaw('AVG(CAST((julianday(served_at) - julianday(created_at)) * 1440 AS INTEGER)) as avg_mins')
            ->value('avg_mins');
        $avgPrepTime = $avgPrepTime ? round($avgPrepTime) : null;

        // Hourly order distribution (today)
        $hourlyData = array_fill(0, 24, 0);
        $hourlyRows = Order::whereDate('created_at', Carbon::today())
            ->where('status', '!=', 'cancelled')
            ->selectRaw("CAST(strftime('%H', created_at) AS INTEGER) as hour, COUNT(*) as cnt")
            ->groupBy('hour')
            ->pluck('cnt', 'hour');
        foreach ($hourlyRows as $hour => $cnt) {
            $hourlyData[(int) $hour] = $cnt;
        }

        // Orders by status
        $statusMap = ['served' => 0, 'preparing' => 0, 'ready' => 0, 'pending' => 0, 'cancelled' => 0];
        $statusRows = Order::selectRaw('status, COUNT(*) as cnt')->groupBy('status')->pluck('cnt', 'status');
        foreach ($statusRows as $status => $cnt) {
            if (array_key_exists($status, $statusMap)) {
                $statusMap[$status] = $cnt;
            }
        }
        $statusCounts = array_values($statusMap);

        return view('admin.analytics.index', compact(
            'currencySymbol', 'monthRevenue', 'monthOrders',
            'uniqueCustomers', 'avgPrepTime', 'hourlyData', 'statusCounts'
        ));
    }

    /**
     * Sales report
     */
    public function salesReport(Request $request)
    {
        $currencySymbol = Setting::get('currency_symbol', '$');
        $period = (int) $request->input('period', 30);

        $startDate = Carbon::today()->subDays($period);

        $totalRevenue = Order::where('status', '!=', 'cancelled')
            ->whereDate('created_at', '>=', $startDate)
            ->sum('total_amount');

        $totalOrders = Order::where('status', '!=', 'cancelled')
            ->whereDate('created_at', '>=', $startDate)
            ->count();

        $avgOrder = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

        $cancelledOrders = Order::where('status', 'cancelled')
            ->whereDate('created_at', '>=', $startDate)
            ->count();

        // Daily breakdown
        $dailyData = Order::whereDate('created_at', '>=', $startDate)
            ->selectRaw("DATE(created_at) as date")
            ->selectRaw("SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END) as revenue")
            ->selectRaw("SUM(CASE WHEN status != 'cancelled' THEN 1 ELSE 0 END) as order_count")
            ->selectRaw("SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled")
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        return view('admin.reports.sales', compact(
            'currencySymbol', 'totalRevenue', 'totalOrders',
            'avgOrder', 'cancelledOrders', 'dailyData'
        ));
    }

    /**
     * Product performance report
     */
    public function productReport(Request $request)
    {
        $currencySymbol = Setting::get('currency_symbol', '$');
        $period = $request->input('period', '30');
        $categoryId = $request->input('category');

        $categories = Category::where('is_active', true)->orderBy('name')->get();

        // Build product stats query
        $query = Product::select(
                'products.id',
                'products.name',
                'products.price as selling_price',
                'products.category_id'
            )
            ->selectRaw('SUM(order_items.quantity) as total_sold')
            ->selectRaw('SUM(order_items.subtotal) as total_revenue')
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', '!=', 'cancelled');

        if ($period !== 'all') {
            $startDate = Carbon::today()->subDays((int) $period);
            $query->whereDate('orders.created_at', '>=', $startDate);
        }

        if ($categoryId) {
            $query->where('products.category_id', $categoryId);
        }

        $productStats = $query
            ->groupBy('products.id', 'products.name', 'products.price', 'products.category_id')
            ->orderBy('total_revenue', 'desc')
            ->with('category')
            ->get();

        return view('admin.reports.products', compact(
            'currencySymbol', 'categories', 'productStats'
        ));
    }

    /**
     * Prepare sales chart data
     */
    private function getSalesChartData()
    {
        $days = collect(range(6, 0))->map(function ($daysAgo) {
            $date = Carbon::today()->subDays($daysAgo);
            $sales = Order::whereDate('created_at', $date)
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount');
            
            return [
                'date' => $date->format('M j'),
                'sales' => (float) $sales
            ];
        });

        return [
            'labels' => $days->pluck('date')->toArray(),
            'data' => $days->pluck('sales')->toArray()
        ];
    }
}