<?php

namespace Database\Seeders;

use App\Models\RestaurantTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RestaurantTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            ['table_number' => 'T-01', 'table_name' => 'Window Seat', 'capacity' => 2, 'location' => 'Indoor'],
            ['table_number' => 'T-02', 'table_name' => 'Corner Table', 'capacity' => 4, 'location' => 'Indoor'],
            ['table_number' => 'T-03', 'table_name' => 'Center Table', 'capacity' => 4, 'location' => 'Indoor'],
            ['table_number' => 'T-04', 'table_name' => 'Booth 1', 'capacity' => 6, 'location' => 'Indoor'],
            ['table_number' => 'T-05', 'table_name' => 'Booth 2', 'capacity' => 6, 'location' => 'Indoor'],
            ['table_number' => 'P-01', 'table_name' => 'Patio Table 1', 'capacity' => 4, 'location' => 'Outdoor'],
            ['table_number' => 'P-02', 'table_name' => 'Patio Table 2', 'capacity' => 4, 'location' => 'Outdoor'],
            ['table_number' => 'P-03', 'table_name' => 'Garden Table', 'capacity' => 8, 'location' => 'Outdoor'],
            ['table_number' => 'B-01', 'table_name' => 'Bar Counter 1', 'capacity' => 2, 'location' => 'Indoor'],
            ['table_number' => 'B-02', 'table_name' => 'Bar Counter 2', 'capacity' => 2, 'location' => 'Indoor'],
        ];

        foreach ($tables as $table) {
            RestaurantTable::updateOrCreate(
                ['table_number' => $table['table_number']],
                array_merge($table, [
                    'qr_code_string' => Str::uuid()->toString(),
                    'status' => 'available',
                    'is_active' => true
                ])
            );
        }
    }
}
