<?php

namespace Database\Factories;

use App\Models\RestaurantTable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RestaurantTable>
 */
class RestaurantTableFactory extends Factory
{
    protected $model = RestaurantTable::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'table_number' => fake()->unique()->numberBetween(1, 100),
            'table_name' => 'Table ' . fake()->unique()->numberBetween(1, 100),
            'qr_code_string' => Str::uuid()->toString(),
            'qr_code_path' => null,
            'qr_code_generated_at' => null,
            'capacity' => fake()->numberBetween(2, 8),
            'location' => fake()->randomElement(['indoor', 'outdoor', 'patio', 'balcony']),
            'status' => 'available',
            'is_active' => true,
        ];
    }

    /**
     * Indicate the table is occupied.
     */
    public function occupied(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'occupied',
        ]);
    }

    /**
     * Indicate the table is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
