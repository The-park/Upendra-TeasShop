<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\RestaurantTable;
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
        // Basic summary statistics for analytics page
        $revenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $orders_count = Order::where('status', '!=', 'cancelled')->count();
        $new_customers = User::whereDate('created_at', '>=', now()->subDays(30))->count();

        return view('admin.analytics.index', compact('revenue', 'orders_count', 'new_customers'));
    }

    /**
     * Sales report
     */
    public function salesReport(Request $request)
    {
        // TODO: Implement sales reporting
        return view('admin.analytics.sales');
    }

    /**
     * Product performance report
     */
    public function productReport(Request $request)
    {
        // TODO: Implement product reporting
        return view('admin.analytics.products');
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