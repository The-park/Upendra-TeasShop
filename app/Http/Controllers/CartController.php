<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * Get cart contents
     */
    public function index()
    {
        $cart = Session::get('cart', []);
        $cartItems = [];
        $total = 0;

        foreach ($cart as $productId => $quantity) {
            $product = Product::with('category')->find($productId);
            if ($product) {
                $cartItems[] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'subtotal' => $product->price * $quantity
                ];
                $total += $product->price * $quantity;
            }
        }

        if (request()->wantsJson()) {
            return response()->json([
                'items' => $cartItems,
                'total' => $total,
                'count' => array_sum($cart)
            ]);
        }

        return view('cart.index', compact('cartItems', 'total'));
    }

    /**
     * Add item to cart
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        $cart = Session::get('cart', []);
        $productId = $request->product_id;
        
        if (isset($cart[$productId])) {
            $cart[$productId] += $request->quantity;
        } else {
            $cart[$productId] = $request->quantity;
        }

        Session::put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Item added to cart',
            'cart_count' => array_sum($cart)
        ]);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0|max:10'
        ]);

        $cart = Session::get('cart', []);
        $productId = $request->product_id;

        if ($request->quantity == 0) {
            unset($cart[$productId]);
        } else {
            $cart[$productId] = $request->quantity;
        }

        Session::put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated',
            'cart_count' => array_sum($cart)
        ]);
    }

    /**
     * Remove item from cart
     */
    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $cart = Session::get('cart', []);
        unset($cart[$request->product_id]);
        Session::put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart',
            'cart_count' => array_sum($cart)
        ]);
    }

    /**
     * Clear entire cart
     */
    public function clear()
    {
        Session::forget('cart');

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared',
            'cart_count' => 0
        ]);
    }
}
