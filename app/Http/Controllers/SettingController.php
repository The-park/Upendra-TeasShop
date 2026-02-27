<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display settings page
     */
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        return view('admin.settings.index', compact('settings'));
    }

    /**
     * Update settings
     */
    public function update(Request $request)
    {
        $request->validate([
            'restaurant_name' => 'required|string|max:255',
            'restaurant_phone' => 'nullable|string|max:20',
            'restaurant_address' => 'nullable|string|max:500',
            'restaurant_email' => 'nullable|email|max:255',
            'currency_symbol' => 'required|string|max:5',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'service_charge' => 'nullable|numeric|min:0|max:100',
            'order_prefix' => 'required|string|max:10',
        ]);

        foreach ($request->only([
            'restaurant_name', 'restaurant_phone', 'restaurant_address', 'restaurant_email',
            'currency_symbol', 'tax_rate', 'service_charge', 'order_prefix', 'tagline', 'orders_enabled'
        ]) as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()
            ->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}