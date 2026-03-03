<?php

namespace Tests\Feature\UnitTests;

use App\Models\Product;
use App\Models\Category;
use App\Models\RestaurantTable;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrderFlowTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $product;
    protected $table;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->category = Category::factory()->create();
        $this->product = Product::factory()->create([
            'category_id' => $this->category->id,
            'status' => 'active',
            'price' => 5.99
        ]);
        $this->table = RestaurantTable::factory()->create();
    }

    public function test_customer_can_view_menu()
    {
        $response = $this->get('/menu');
        
        $response->assertStatus(200)
                 ->assertSee($this->product->name);
    }

    public function test_customer_can_select_table()
    {
        $response = $this->postJson('/select-table', [
            'table_id' => $this->table->id
        ]);
        
        $response->assertSuccessful();
        $this->assertEquals($this->table->table_number, session('selected_table_number'));
    }

    public function test_customer_can_place_order()
    {
        // Pre-load the session cart (controller reads from session)
        session([
            'cart' => [$this->product->id => 2],
            'selected_table_id' => $this->table->id,
            'selected_table_number' => $this->table->table_number,
        ]);

        $orderData = [
            'table_number'   => $this->table->table_number,
            'customer_name'  => 'John Doe',
            'customer_phone' => '555-1234',
            'notes'          => 'Extra hot please',
            'payment_method' => 'cash',
        ];

        $response = $this->postJson('/place-order', $orderData);
        
        $response->assertSuccessful()
                 ->assertJsonStructure(['success', 'redirect_url']);
        
        // Verify order was created
        $this->assertDatabaseHas('orders', [
            'customer_name'  => 'John Doe',
            'customer_notes' => 'Extra hot please',
            'table_id'       => $this->table->id,
            'status'         => 'pending',
        ]);
        
        // Verify order items
        $order = Order::where('customer_name', 'John Doe')->first();
        $this->assertDatabaseHas('order_items', [
            'order_id'   => $order->id,
            'product_id' => $this->product->id,
            'quantity'   => 2,
            'unit_price' => $this->product->price,
        ]);
    }

    public function test_order_total_calculation()
    {
        session([
            'cart' => [$this->product->id => 2],
            'selected_table_id' => $this->table->id,
            'selected_table_number' => $this->table->table_number,
        ]);

        $orderData = [
            'table_number'   => $this->table->table_number,
            'customer_name'  => 'Jane Doe',
            'customer_phone' => '555-5678',
            'payment_method' => 'cash',
        ];

        $this->postJson('/place-order', $orderData);
        
        $order = Order::where('customer_name', 'Jane Doe')->first();
        
        // Controller sets total_amount = subtotal (no separate tax/service calculation in controller)
        $expectedTotal = 2 * 5.99; // $11.98
        
        $this->assertEquals(round($expectedTotal, 2), round($order->total_amount, 2));
    }

    public function test_order_requires_customer_info()
    {
        session([
            'cart' => [$this->product->id => 1],
            'selected_table_id' => $this->table->id,
            'selected_table_number' => $this->table->table_number,
        ]);

        $orderData = [
            'table_number'   => $this->table->table_number,
            'customer_name'  => '', // Missing name
            'payment_method' => 'cash',
        ];

        $response = $this->postJson('/place-order', $orderData);
        
        $response->assertStatus(422); // Validation error
    }

    public function test_order_requires_table_selection()
    {
        session([
            'cart' => [$this->product->id => 1],
        ]);

        $orderData = [
            'customer_name'  => 'John Doe',
            'customer_phone' => '555-1234',
            'payment_method' => 'cash',
            // No table_number
        ];

        $response = $this->postJson('/place-order', $orderData);
        
        $response->assertStatus(422);
    }

    public function test_order_status_tracking()
    {
        $order = Order::factory()->create([
            'table_id' => $this->table->id,
            'status' => 'pending'
        ]);
        
        $response = $this->getJson("/order/{$order->order_number}/status");
        
        $response->assertStatus(200)
                 ->assertJson(['status' => 'pending'])
                 ->assertJson(['order_number' => $order->order_number]);
    }

    public function test_empty_cart_cannot_checkout()
    {
        // No cart in session
        $orderData = [
            'table_number'   => $this->table->table_number,
            'customer_name'  => 'John Doe',
            'customer_phone' => '555-1234',
            'payment_method' => 'cash',
        ];

        $response = $this->postJson('/place-order', $orderData);
        
        $response->assertStatus(422);
    }
}