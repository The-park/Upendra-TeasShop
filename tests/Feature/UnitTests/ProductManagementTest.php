<?php

namespace Tests\Feature\UnitTests;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $admin;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->category = Category::factory()->create();
        Storage::fake('public');
    }

    public function test_admin_can_view_products_list()
    {
        Product::factory()->count(5)->create(['category_id' => $this->category->id]);

        $response = $this->actingAs($this->admin)->get('/admin/products');
        
        $response->assertStatus(200)
                 ->assertViewIs('admin.products.index')
                 ->assertViewHas('products');
    }

    public function test_admin_can_create_product()
    {
        $productData = [
            'name' => 'Test Tea',
            'description' => 'A delicious test tea',
            'price' => 4.99,
            'category_id' => $this->category->id,
            'status' => 'active'
        ];

        $response = $this->actingAs($this->admin)->post('/admin/products', $productData);
        
        $response->assertRedirect('/admin/products');
        $this->assertDatabaseHas('products', [
            'name' => 'Test Tea',
            'price' => 4.99
        ]);
    }

    public function test_admin_can_upload_product_image()
    {
        $file = UploadedFile::fake()->image('tea.jpg');
        
        $productData = [
            'name' => 'Test Tea with Image',
            'description' => 'A delicious test tea',
            'price' => 4.99,
            'category_id' => $this->category->id,
            'status' => 'active',
            'image' => $file
        ];

        $response = $this->actingAs($this->admin)->post('/admin/products', $productData);
        
        $response->assertRedirect('/admin/products');
        
        $product = Product::where('name', 'Test Tea with Image')->first();
        $this->assertNotNull($product->image);
        Storage::disk('public')->assertExists('products/' . basename($product->image));
    }

    public function test_admin_can_update_product()
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);
        
        $updateData = [
            'name' => 'Updated Tea Name',
            'description' => $product->description,
            'price' => 6.99,
            'category_id' => $this->category->id,
            'status' => 'inactive'
        ];

        $response = $this->actingAs($this->admin)
                        ->put("/admin/products/{$product->id}", $updateData);
        
        $response->assertRedirect('/admin/products');
        
        $product->refresh();
        $this->assertEquals('Updated Tea Name', $product->name);
        $this->assertEquals(6.99, $product->price);
        $this->assertEquals('inactive', $product->status);
    }

    public function test_admin_can_delete_product()
    {
        $product = Product::factory()->create(['category_id' => $this->category->id]);
        
        $response = $this->actingAs($this->admin)
                        ->delete("/admin/products/{$product->id}");
        
        $response->assertRedirect('/admin/products');
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_product_validation_rules()
    {
        $response = $this->actingAs($this->admin)->post('/admin/products', []);
        
        $response->assertSessionHasErrors(['name', 'price', 'category_id']);
    }

    public function test_product_price_must_be_positive()
    {
        $productData = [
            'name' => 'Test Tea',
            'price' => -1.00,
            'category_id' => $this->category->id
        ];

        $response = $this->actingAs($this->admin)->post('/admin/products', $productData);
        
        $response->assertSessionHasErrors(['price']);
    }

    public function test_guest_cannot_access_product_management()
    {
        $response = $this->get('/admin/products');
        $response->assertRedirect('/login');
        
        $response = $this->post('/admin/products', []);
        $response->assertRedirect('/login');
    }
}