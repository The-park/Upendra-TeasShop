<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Milk Tea',
                'slug' => 'milk-tea',
                'description' => 'Creamy and rich milk tea varieties',
                'display_order' => 1,
                'is_active' => true
            ],
            [
                'name' => 'Fruit Tea',
                'slug' => 'fruit-tea',
                'description' => 'Fresh and fruity tea combinations',
                'display_order' => 2,
                'is_active' => true
            ],
            [
                'name' => 'Traditional Tea',
                'slug' => 'traditional-tea',
                'description' => 'Classic tea selections',
                'display_order' => 3,
                'is_active' => true
            ],
            [
                'name' => 'Coffee & Espresso',
                'slug' => 'coffee-espresso',
                'description' => 'Premium coffee and espresso drinks',
                'display_order' => 4,
                'is_active' => true
            ],
            [
                'name' => 'Snacks & Pastries',
                'slug' => 'snacks-pastries',
                'description' => 'Light bites and sweet treats',
                'display_order' => 5,
                'is_active' => true
            ]
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
