<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get category IDs
        $milkTea = Category::where('slug', 'milk-tea')->first();
        $fruitTea = Category::where('slug', 'fruit-tea')->first();
        $traditional = Category::where('slug', 'traditional-tea')->first();
        $coffee = Category::where('slug', 'coffee-espresso')->first();
        $snacks = Category::where('slug', 'snacks-pastries')->first();

        $products = [
            // Milk Tea
            [
                'category_id' => $milkTea->id,
                'name' => 'Classic Milk Tea',
                'slug' => 'classic-milk-tea',
                'description' => 'Traditional black tea with creamy milk and sweetener',
                'short_description' => 'Traditional black tea with creamy milk',
                'price' => 4.50,
                'cost_price' => 1.80,
                'is_available' => true,
                'is_featured' => true,
                'display_order' => 1
            ],
            [
                'category_id' => $milkTea->id,
                'name' => 'Matcha Latte',
                'slug' => 'matcha-latte',
                'description' => 'Premium Japanese matcha powder with steamed milk',
                'short_description' => 'Premium Japanese matcha with milk',
                'price' => 5.25,
                'cost_price' => 2.10,
                'is_available' => true,
                'is_featured' => true,
                'display_order' => 2
            ],
            [
                'category_id' => $milkTea->id,
                'name' => 'Thai Milk Tea',
                'slug' => 'thai-milk-tea',
                'description' => 'Authentic Thai tea with condensed milk and spices',
                'short_description' => 'Authentic spiced Thai tea',
                'price' => 4.75,
                'cost_price' => 1.90,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 3
            ],
            // Fruit Tea
            [
                'category_id' => $fruitTea->id,
                'name' => 'Mango Passion Tea',
                'slug' => 'mango-passion-tea',
                'description' => 'Refreshing tea infused with tropical mango and passion fruit',
                'short_description' => 'Tropical mango and passion fruit tea',
                'price' => 4.95,
                'cost_price' => 1.95,
                'is_available' => true,
                'is_featured' => true,
                'display_order' => 1
            ],
            [
                'category_id' => $fruitTea->id,
                'name' => 'Strawberry Green Tea',
                'slug' => 'strawberry-green-tea',
                'description' => 'Light green tea with fresh strawberry flavor',
                'short_description' => 'Fresh strawberry green tea',
                'price' => 4.50,
                'cost_price' => 1.75,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 2
            ],
            // Traditional Tea
            [
                'category_id' => $traditional->id,
                'name' => 'Earl Grey',
                'slug' => 'earl-grey',
                'description' => 'Classic bergamot-flavored black tea',
                'short_description' => 'Classic bergamot black tea',
                'price' => 3.25,
                'cost_price' => 1.20,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 1
            ],
            [
                'category_id' => $traditional->id,
                'name' => 'Jasmine Green Tea',
                'slug' => 'jasmine-green-tea',
                'description' => 'Delicate green tea scented with jasmine flowers',
                'short_description' => 'Jasmine-scented green tea',
                'price' => 3.50,
                'cost_price' => 1.30,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 2
            ],
            // Coffee  
            [
                'category_id' => $coffee->id,
                'name' => 'Espresso',
                'slug' => 'espresso',
                'description' => 'Rich, concentrated coffee shot',
                'short_description' => 'Rich concentrated coffee',
                'price' => 2.75,
                'cost_price' => 0.95,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 1
            ],
            [
                'category_id' => $coffee->id,
                'name' => 'Cappuccino',
                'slug' => 'cappuccino',
                'description' => 'Espresso with steamed milk and foam',
                'short_description' => 'Espresso with steamed milk',
                'price' => 4.25,
                'cost_price' => 1.45,
                'is_available' => true,
                'is_featured' => true,
                'display_order' => 2
            ],
            // Snacks
            [
                'category_id' => $snacks->id,
                'name' => 'Chocolate Croissant',
                'slug' => 'chocolate-croissant',
                'description' => 'Flaky pastry filled with rich chocolate',
                'short_description' => 'Flaky chocolate-filled pastry',
                'price' => 3.75,
                'cost_price' => 1.25,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 1
            ],
            [
                'category_id' => $snacks->id,
                'name' => 'Blueberry Muffin',
                'slug' => 'blueberry-muffin',
                'description' => 'Freshly baked muffin with juicy blueberries',
                'short_description' => 'Fresh blueberry muffin',
                'price' => 2.95,
                'cost_price' => 0.95,
                'is_available' => true,
                'is_featured' => false,
                'display_order' => 2
            ]
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                $product
            );
        }
    }
}
