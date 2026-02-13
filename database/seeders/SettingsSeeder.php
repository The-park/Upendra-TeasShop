<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(['key' => 'shop_name'], [
            'value' => 'TeaShop Delight',
            'type' => 'string',
            'description' => 'Business name',
            'is_public' => true
        ]);

        Setting::updateOrCreate(['key' => 'shop_open'], [
            'value' => '1',
            'type' => 'boolean',
            'description' => 'Is shop accepting orders',
            'is_public' => true
        ]);

        Setting::updateOrCreate(['key' => 'tax_rate'], [
            'value' => '0.10',
            'type' => 'string',
            'description' => 'Tax percentage (10%)',
            'is_public' => false
        ]);

        Setting::updateOrCreate(['key' => 'currency_symbol'], [
            'value' => '$',
            'type' => 'string',
            'description' => 'Currency symbol',
            'is_public' => true
        ]);

        Setting::updateOrCreate(['key' => 'order_prefix'], [
            'value' => 'TS',
            'type' => 'string',
            'description' => 'Order number prefix',
            'is_public' => false
        ]);

        Setting::updateOrCreate(['key' => 'min_order_amount'], [
            'value' => '5.00',
            'type' => 'string',
            'description' => 'Minimum order amount',
            'is_public' => true
        ]);

        Setting::updateOrCreate(['key' => 'auto_print_orders'], [
            'value' => '1',
            'type' => 'boolean',
            'description' => 'Auto-print new orders',
            'is_public' => false
        ]);

        Setting::updateOrCreate(['key' => 'contact_email'], [
            'value' => 'admin@teashop.com',
            'type' => 'string',
            'description' => 'Shop contact email',
            'is_public' => true
        ]);
    }
}
