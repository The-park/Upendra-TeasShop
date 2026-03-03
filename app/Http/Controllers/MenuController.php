<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\RestaurantTable;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class MenuController extends Controller
{
    /**
     * Display the public menu
     */
    public function index(Request $request)
    {
        // Auto-select table from QR code string in query param
        if ($request->filled('table')) {
            $table = RestaurantTable::where('qr_code_string', $request->table)
                ->orWhere('table_number', $request->table)
                ->where('is_active', true)
                ->first();

            if ($table) {
                Session::put('selected_table_id', $table->id);
                Session::put('selected_table_number', $table->table_number);
                Session::put('selected_table_name', $table->table_name ?: 'Table '.$table->table_number);
                // Redirect clean (remove ?table= from URL)
                return redirect()->route('menu');
            }
        }

        // Get active categories with their active products
        $categories = Category::where('is_active', true)
            ->with(['products' => function ($query) {
                $query->where('is_available', true)->orderBy('name');
            }])
            ->withCount(['products' => function ($query) {
                $query->where('is_available', true);
            }])
            ->orderBy('display_order')
            ->orderBy('name')
            ->get()
            ->filter(fn ($category) => $category->products_count > 0)
            ->values();

        // Flat products list
        $products = Product::where('is_available', true)
            ->with('category')
            ->orderBy('category_id')
            ->orderBy('name')
            ->get();

        // Available tables for picker (active + available status)
        $availableTables = RestaurantTable::where('is_active', true)
            ->whereIn('status', ['available', 'active', 'free'])
            ->orderBy('table_number')
            ->get();

        // Settings
        $restaurantName  = Setting::get('restaurant_name', config('app.name', 'TeaShop Delight'));
        $currencySymbol  = Setting::get('currency_symbol', '$');
        $taxRate         = (float) Setting::get('tax_rate', 0);
        $serviceCharge   = (float) Setting::get('service_charge', 0);

        // Current session table
        $selectedTableId     = Session::get('selected_table_id');
        $selectedTableNumber = Session::get('selected_table_number');

        return view('public.menu.index', compact(
            'categories', 'products', 'availableTables',
            'restaurantName', 'currencySymbol', 'taxRate', 'serviceCharge',
            'selectedTableId', 'selectedTableNumber'
        ));
    }

    /**
     * Filter products by category
     */
    public function filter(Request $request)
    {
        $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'search' => 'nullable|string|max:255',
        ]);

        $query = Product::where('is_available', true)->with('category');

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by name or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $products = $query->orderBy('name')->get();

        if ($request->wantsJson()) {
            return response()->json([
                'products' => $products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'description' => $product->description,
                        'price' => $product->price,
                        'formatted_price' => $product->formatted_price,
                        'image_url' => $product->image_url,
                        'category' => $product->category->name,
                    ];
                })
            ]);
        }

        return view('public.menu.products', compact('products'));
    }
}
