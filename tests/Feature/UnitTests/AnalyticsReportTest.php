<?php

namespace Tests\Feature\UnitTests;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\RestaurantTable;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsReportTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $category;
    protected $product;
    protected $table;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->category = Category::factory()->create();
        $this->product = Product::factory()->create([
            'category_id' => $this->category->id,
            'price' => 10.00,
        ]);
        $this->table = RestaurantTable::factory()->create();
    }

    // ───────────────────────────────────────
    //  Analytics Page
    // ───────────────────────────────────────

    public function test_analytics_page_loads_successfully()
    {
        $response = $this->actingAs($this->admin)->get('/admin/analytics');

        $response->assertStatus(200)
                 ->assertViewIs('admin.analytics.index')
                 ->assertViewHasAll([
                     'currencySymbol',
                     'monthRevenue',
                     'monthOrders',
                     'uniqueCustomers',
                     'avgPrepTime',
                     'hourlyData',
                     'statusCounts',
                 ]);
    }

    public function test_analytics_shows_correct_monthly_revenue()
    {
        // Create orders this month
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 25.50,
            'status' => 'served',
            'created_at' => Carbon::now(),
        ]);
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 14.50,
            'status' => 'pending',
            'created_at' => Carbon::now(),
        ]);
        // Cancelled order — should NOT count
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 100.00,
            'status' => 'cancelled',
            'created_at' => Carbon::now(),
        ]);

        $response = $this->actingAs($this->admin)->get('/admin/analytics');

        $response->assertStatus(200);
        $data = $response->viewData('monthRevenue');
        $this->assertEquals(40.00, round($data, 2));
        $this->assertEquals(2, $response->viewData('monthOrders'));
    }

    public function test_analytics_status_counts_are_correct()
    {
        Order::factory()->count(3)->create(['table_id' => $this->table->id, 'status' => 'pending']);
        Order::factory()->count(2)->create(['table_id' => $this->table->id, 'status' => 'served']);
        Order::factory()->create(['table_id' => $this->table->id, 'status' => 'cancelled']);

        $response = $this->actingAs($this->admin)->get('/admin/analytics');

        $statusCounts = $response->viewData('statusCounts');
        // Order: served, preparing, ready, pending, cancelled
        $this->assertEquals(2, $statusCounts[0]); // served
        $this->assertEquals(0, $statusCounts[1]); // preparing
        $this->assertEquals(0, $statusCounts[2]); // ready
        $this->assertEquals(3, $statusCounts[3]); // pending
        $this->assertEquals(1, $statusCounts[4]); // cancelled
    }

    public function test_analytics_hourly_data_has_24_entries()
    {
        $response = $this->actingAs($this->admin)->get('/admin/analytics');

        $hourlyData = $response->viewData('hourlyData');
        $this->assertCount(24, $hourlyData);
    }

    public function test_analytics_requires_authentication()
    {
        $response = $this->get('/admin/analytics');
        $response->assertRedirect('/login');
    }

    // ───────────────────────────────────────
    //  Sales Report
    // ───────────────────────────────────────

    public function test_sales_report_loads_successfully()
    {
        $response = $this->actingAs($this->admin)->get('/admin/analytics/sales');

        $response->assertStatus(200)
                 ->assertViewIs('admin.reports.sales')
                 ->assertViewHasAll([
                     'currencySymbol',
                     'totalRevenue',
                     'totalOrders',
                     'avgOrder',
                     'cancelledOrders',
                     'dailyData',
                 ]);
    }

    public function test_sales_report_calculates_correct_totals()
    {
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 20.00,
            'status' => 'served',
        ]);
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 30.00,
            'status' => 'pending',
        ]);
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 50.00,
            'status' => 'cancelled',
        ]);

        $response = $this->actingAs($this->admin)->get('/admin/analytics/sales?period=30');

        $response->assertStatus(200);
        $this->assertEquals(50.00, round($response->viewData('totalRevenue'), 2));
        $this->assertEquals(2, $response->viewData('totalOrders'));
        $this->assertEquals(25.00, round($response->viewData('avgOrder'), 2));
        $this->assertEquals(1, $response->viewData('cancelledOrders'));
    }

    public function test_sales_report_respects_period_filter()
    {
        // Order from 10 days ago
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 15.00,
            'status' => 'served',
            'created_at' => Carbon::now()->subDays(10),
        ]);
        // Order from today
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 25.00,
            'status' => 'served',
            'created_at' => Carbon::now(),
        ]);

        // 7-day filter should only include today's order
        $response = $this->actingAs($this->admin)->get('/admin/analytics/sales?period=7');
        $this->assertEquals(25.00, round($response->viewData('totalRevenue'), 2));

        // 30-day filter should include both
        $response = $this->actingAs($this->admin)->get('/admin/analytics/sales?period=30');
        $this->assertEquals(40.00, round($response->viewData('totalRevenue'), 2));
    }

    public function test_sales_report_daily_breakdown()
    {
        Order::factory()->create([
            'table_id' => $this->table->id,
            'total_amount' => 10.00,
            'status' => 'served',
        ]);

        $response = $this->actingAs($this->admin)->get('/admin/analytics/sales');

        $dailyData = $response->viewData('dailyData');
        $this->assertGreaterThanOrEqual(1, $dailyData->count());
        $today = $dailyData->firstWhere('date', Carbon::today()->format('Y-m-d'));
        $this->assertNotNull($today);
        $this->assertEquals(10.00, round($today->revenue, 2));
    }

    public function test_sales_report_requires_authentication()
    {
        $response = $this->get('/admin/analytics/sales');
        $response->assertRedirect('/login');
    }

    // ───────────────────────────────────────
    //  Product Report
    // ───────────────────────────────────────

    public function test_product_report_loads_successfully()
    {
        $response = $this->actingAs($this->admin)->get('/admin/analytics/products');

        $response->assertStatus(200)
                 ->assertViewIs('admin.reports.products')
                 ->assertViewHasAll([
                     'currencySymbol',
                     'categories',
                     'productStats',
                 ]);
    }

    public function test_product_report_shows_product_stats()
    {
        $order = Order::factory()->create([
            'table_id' => $this->table->id,
            'status' => 'served',
        ]);
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'quantity' => 3,
            'unit_price' => $this->product->price,
            'subtotal' => $this->product->price * 3,
        ]);

        $response = $this->actingAs($this->admin)->get('/admin/analytics/products');

        $productStats = $response->viewData('productStats');
        $this->assertCount(1, $productStats);
        $this->assertEquals($this->product->id, $productStats->first()->id);
        $this->assertEquals(3, $productStats->first()->total_sold);
        $this->assertEquals(30.00, round($productStats->first()->total_revenue, 2));
    }

    public function test_product_report_filters_by_category()
    {
        $otherCategory = Category::factory()->create();
        $otherProduct = Product::factory()->create([
            'category_id' => $otherCategory->id,
            'price' => 5.00,
        ]);

        $order = Order::factory()->create([
            'table_id' => $this->table->id,
            'status' => 'served',
        ]);
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'quantity' => 2,
            'unit_price' => $this->product->price,
            'subtotal' => $this->product->price * 2,
        ]);
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $otherProduct->id,
            'product_name' => $otherProduct->name,
            'quantity' => 1,
            'unit_price' => $otherProduct->price,
            'subtotal' => $otherProduct->price,
        ]);

        // Filter by first category — should only see $this->product
        $response = $this->actingAs($this->admin)
            ->get('/admin/analytics/products?category=' . $this->category->id);

        $productStats = $response->viewData('productStats');
        $this->assertCount(1, $productStats);
        $this->assertEquals($this->product->id, $productStats->first()->id);
    }

    public function test_product_report_excludes_cancelled_orders()
    {
        $cancelledOrder = Order::factory()->create([
            'table_id' => $this->table->id,
            'status' => 'cancelled',
        ]);
        OrderItem::create([
            'order_id' => $cancelledOrder->id,
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'quantity' => 5,
            'unit_price' => $this->product->price,
            'subtotal' => $this->product->price * 5,
        ]);

        $response = $this->actingAs($this->admin)->get('/admin/analytics/products');

        $productStats = $response->viewData('productStats');
        $this->assertCount(0, $productStats);
    }

    public function test_product_report_returns_categories_list()
    {
        Category::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get('/admin/analytics/products');

        // Original + 3 new = at least 4 active categories
        $categories = $response->viewData('categories');
        $this->assertGreaterThanOrEqual(4, $categories->count());
    }

    public function test_product_report_requires_authentication()
    {
        $response = $this->get('/admin/analytics/products');
        $response->assertRedirect('/login');
    }

    // ───────────────────────────────────────
    //  Non-admin access denied
    // ───────────────────────────────────────

    public function test_staff_cannot_access_analytics()
    {
        $staff = User::factory()->create(['role' => 'staff']);

        $this->actingAs($staff)->get('/admin/analytics')->assertStatus(403);
        $this->actingAs($staff)->get('/admin/analytics/sales')->assertStatus(403);
        $this->actingAs($staff)->get('/admin/analytics/products')->assertStatus(403);
    }
}
