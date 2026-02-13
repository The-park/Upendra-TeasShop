<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display the public menu
     */
    public function index(Request $request)
    {
        // Get table if provided
        $table = null;
        if ($request->filled('table')) {
            $table = RestaurantTable::where('table_number', $request->table)
                ->where('is_active', true)
                ->first();
        }

        // Get active categories with their active products
        $categories = Category::where('is_active', true)
            ->with(['products' => function ($query) {
                $query->where('is_available', true)
                    ->orderBy('name');
            }])
            ->withCount(['products' => function ($query) {
                $query->where('is_available', true);
            }])
            ->having('products_count', '>', 0)
            ->orderBy('display_order')
            ->orderBy('name')
            ->get();

        // Get featured products
        $featuredProducts = Product::where('is_available', true)
            ->where('is_featured', true)
            ->with('category')
            ->orderBy('name')
            ->take(6)
            ->get();

        // Also provide a flat products list for the menu grid/search
        $products = Product::where('is_available', true)
            ->with('category')
            ->orderBy('name')
            ->get();

        return view('public.menu.index', compact('categories', 'featuredProducts', 'products', 'table'));
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
