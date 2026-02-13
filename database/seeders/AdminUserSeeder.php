<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@teashop.com'],
            [
                'name' => 'System Administrator',
                'email' => 'admin@teashop.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now()
            ]
        );

        // Create staff user
        User::updateOrCreate(
            ['email' => 'staff@teashop.com'],
            [
                'name' => 'Kitchen Staff',
                'email' => 'staff@teashop.com',
                'password' => Hash::make('staff123'),
                'role' => 'staff',
                'is_active' => true,
                'email_verified_at' => now()
            ]
        );
    }
}
