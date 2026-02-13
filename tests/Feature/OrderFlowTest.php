<?php

namespace Tests\Feature;

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
                 ->assertSee($this->product->name)
                 ->assertSee($this->product->price);
    }

    public function test_customer_can_select_table()
    {
        $response = $this->post('/select-table', [
            'table_id' => $this->table->id
        ]);
        
        $response->assertSuccessful();
        $this->assertEquals($this->table->table_number, session('table_number'));
    }

    public function test_customer_can_place_order()
    {
        // Set up session
        session(['table_number' => $this->table->table_number]);
        
        $orderData = [
            'cart' => [
                [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'price' => $this->product->price,
                    'quantity' => 2
                ]
            ],
            'customer' => [
                'name' => 'John Doe',
                'phone' => '555-1234',
                'email' => 'john@example.com',
                'notes' => 'Extra hot please'
            ],
            'payment_method' => 'cash',
            'table_number' => $this->table->table_number
        ];

        $response = $this->post('/place-order', $orderData);
        
        $response->assertSuccessful()
                 ->assertJsonStructure(['success', 'redirect_url']);
        
        // Verify order was created
        $this->assertDatabaseHas('orders', [
            'customer_name' => 'John Doe',
            'customer_phone' => '555-1234',
            'table_id' => $this->table->id,
            'status' => 'pending',
            'notes' => 'Extra hot please'
        ]);
        
        // Verify order items
        $order = Order::where('customer_name', 'John Doe')->first();
        $this->assertDatabaseHas('order_items', [
            'order_id' => $order->id,
            'product_id' => $this->product->id,
            'quantity' => 2,
            'unit_price' => $this->product->price
        ]);
    }

    public function test_order_total_calculation()
    {
        session(['table_number' => $this->table->table_number]);
        
        $orderData = [
            'cart' => [
                [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'price' => 5.99,
                    'quantity' => 2
                ]
            ],
            'customer' => [
                'name' => 'Jane Doe',
                'phone' => '555-5678'
            ],
            'payment_method' => 'cash',
            'table_number' => $this->table->table_number
        ];

        $this->post('/place-order', $orderData);
        
        $order = Order::where('customer_name', 'Jane Doe')->first();
        
        // Calculate expected total: (2 × $5.99) + tax + service fee
        $subtotal = 2 * 5.99; // $11.98
        $tax = $subtotal * 0.085; // ~$1.02
        $serviceFee = 2.50;
        $expectedTotal = $subtotal + $tax + $serviceFee;
        
        $this->assertEquals(round($expectedTotal, 2), round($order->total_amount, 2));
    }

    public function test_order_requires_customer_info()
    {
        session(['table_number' => $this->table->table_number]);
        
        $orderData = [
            'cart' => [
                [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'price' => $this->product->price,
                    'quantity' => 1
                ]
            ],
            'customer' => [
                'name' => '', // Missing name
                'phone' => ''  // Missing phone
            ],
            'payment_method' => 'cash',
            'table_number' => $this->table->table_number
        ];

        $response = $this->post('/place-order', $orderData);
        
        $response->assertStatus(422); // Validation error
    }

    public function test_order_requires_table_selection()
    {
        $orderData = [
            'cart' => [
                [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'price' => $this->product->price,
                    'quantity' => 1
                ]
            ],
            'customer' => [
                'name' => 'John Doe',
                'phone' => '555-1234'
            ],
            'payment_method' => 'cash'
            // No table_number
        ];

        $response = $this->post('/place-order', $orderData);
        
        $response->assertStatus(422);
    }

    public function test_order_status_tracking()
    {
        $order = Order::factory()->create([
            'table_id' => $this->table->id,
            'status' => 'pending'
        ]);
        
        $response = $this->get("/order/{$order->order_number}/status");
        
        $response->assertStatus(200)
                 ->assertSee($order->order_number)
                 ->assertSee('Order Placed');
    }

    public function test_empty_cart_cannot_checkout()
    {
        session(['table_number' => $this->table->table_number]);
        
        $orderData = [
            'cart' => [], // Empty cart
            'customer' => [
                'name' => 'John Doe',
                'phone' => '555-1234'
            ],
            'payment_method' => 'cash',
            'table_number' => $this->table->table_number
        ];

        $response = $this->post('/place-order', $orderData);
        
        $response->assertStatus(422);
    }
}