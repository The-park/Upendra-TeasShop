<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with(['category']);

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('is_available', $request->status === 'active');
        }

        $products = $query->paginate(20)->appends($request->query());
        $categories = Category::where('is_active', true)->orderBy('name')->get();

        return view('admin.products.index', compact('products', 'categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('is_active', true)->orderBy('name')->get();
        return view('admin.products.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_available' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $data = $request->only(['name', 'description', 'price', 'cost_price', 'category_id', 'is_available', 'is_featured']);
        $data['slug'] = Str::slug($request->name);
        $data['is_available'] = $request->boolean('is_available', true);
        $data['is_featured'] = $request->boolean('is_featured', false);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $data['image'] = $imagePath;
        }

        $product = Product::create($data);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['category']);
        return view('admin.products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::where('is_active', true)->orderBy('name')->get();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_available' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $data = $request->only(['name', 'description', 'price', 'cost_price', 'category_id', 'is_available', 'is_featured']);
        $data['slug'] = Str::slug($request->name);
        $data['is_available'] = $request->boolean('is_available');
        $data['is_featured'] = $request->boolean('is_featured');

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            
            $imagePath = $request->file('image')->store('products', 'public');
            $data['image'] = $imagePath;
        }

        $product->update($data);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete image if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }

    /**
     * Bulk delete products
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
        ]);

        $products = Product::whereIn('id', $request->product_ids)->get();
        
        foreach ($products as $product) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
        }

        Product::whereIn('id', $request->product_ids)->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', count($request->product_ids) . ' products deleted successfully.');
    }

    /**
     * Bulk toggle active status
     */
    public function bulkToggle(Request $request)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
            'status' => 'required|boolean',
        ]);

        Product::whereIn('id', $request->product_ids)->update([
            'is_available' => $request->boolean('status')
        ]);

        $action = $request->boolean('status') ? 'activated' : 'deactivated';

        return redirect()
            ->route('admin.products.index')
            ->with('success', count($request->product_ids) . ' products ' . $action . ' successfully.');
    }
}
