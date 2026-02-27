<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Show the checkout page
     */
    public function checkout()
    {
        $cart = Session::get('cart', []);
        
        if (empty($cart)) {
            return redirect()->route('menu')->with('error', 'Your cart is empty.');
        }

        // Get cart items with product details
        $cartItems = [];
        $total = 0;
        
        foreach ($cart as $productId => $quantity) {
            $product = Product::find($productId);
            if ($product && $product->is_available) {
                $subtotal = $product->price * $quantity;
                $cartItems[] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'subtotal' => $subtotal
                ];
                $total += $subtotal;
            }
        }

        // Get all active tables
        $tables = RestaurantTable::where('is_active', true)
            ->orderBy('table_number')
            ->get();

        return view('public.checkout.index', compact('cartItems', 'total', 'tables'));
    }

    /**
     * Select a table (AJAX)
     */
    public function selectTable(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:restaurant_tables,id'
        ]);

        $table = RestaurantTable::find($request->table_id);
        
        Session::put('selected_table_id', $table->id);
        Session::put('selected_table_number', $table->table_number);

        return response()->json([
            'success' => true,
            'message' => 'Table selected successfully',
            'table' => $table
        ]);
    }

    /**
     * Place a new order
     */
    public function place(Request $request)
    {
        $request->validate([
            'table_number'    => 'required|exists:restaurant_tables,table_number',
            'customer_name'   => 'required|string|max:255',
            'customer_phone'  => 'nullable|string|max:20',
            'notes'           => 'nullable|string|max:500',
        ]);

        $cart = Session::get('cart', []);

        if (empty($cart)) {
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json(['success' => false, 'message' => 'Your cart is empty.'], 422);
            }
            return redirect()->route('menu')->with('error', 'Your cart is empty.');
        }

        $table = RestaurantTable::where('table_number', $request->table_number)->first();

        $order = null;

        DB::transaction(function () use ($request, $cart, $table, &$order) {
            $total = 0;
            $items = [];

            foreach ($cart as $productId => $quantity) {
                $product = Product::find($productId);
                if ($product) {
                    $subtotal = $product->price * $quantity;
                    $total += $subtotal;
                    $items[] = [
                        'product'  => $product,
                        'quantity' => $quantity,
                        'price'    => $product->price,
                        'subtotal' => $subtotal
                    ];
                }
            }

            $order = Order::create([
                'order_number'    => Order::generateOrderNumber(),
                'table_id'        => $table->id,
                'customer_name'   => $request->customer_name,
                'customer_notes'  => $request->notes,
                'subtotal'        => $total,
                'total_amount'    => $total,
                'status'          => 'pending',
                'payment_status'  => 'unpaid',
                'payment_method'  => $request->payment_method ?? 'cash',
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id'     => $order->id,
                    'product_id'   => $item['product']->id,
                    'product_name' => $item['product']->name,
                    'quantity'     => $item['quantity'],
                    'unit_price'   => $item['price'],
                    'subtotal'     => $item['subtotal'],
                ]);
            }

            if ($table) {
                $table->update(['status' => 'occupied']);
            }
        });

        Session::forget('cart');
        Session::forget('selected_table_id');
        Session::forget('selected_table_number');

        $redirectUrl = route('order.success', $order->order_number);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(['success' => true, 'redirect_url' => $redirectUrl]);
        }

        return redirect($redirectUrl);
    }

    /**
     * Show order success page
     */
    public function success($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->with(['orderItems.product', 'table'])
            ->firstOrFail();

        return view('public.order.status', compact('order'));
    }

    /**
     * Get order status (AJAX)
     */
    public function getStatus($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        return response()->json([
            'status' => $order->status,
            'order_number' => $order->order_number,
            'updated_at' => $order->updated_at->toIso8601String()
        ]);
    }

    /**
     * Admin: Live order display
     */
    public function liveDisplay()
    {
        return view('admin.orders.live');
    }

    /**
     * Admin: Live order feed (AJAX)
     */
    public function liveFeed()
    {
        $orders = Order::with(['orderItems.product', 'table'])
            ->whereIn('status', ['pending', 'confirmed', 'preparing', 'ready'])
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($order) {
                return [
                    'id'             => $order->id,
                    'order_number'   => $order->order_number,
                    'status'         => $order->status,
                    'payment_status' => $order->payment_status,
                    'payment_method' => $order->payment_method,
                    'total_amount'   => $order->total_amount,
                    'customer_name'  => $order->customer_name,
                    'notes'          => $order->customer_notes,
                    'created_at'     => $order->created_at,
                    'table_number'   => optional($order->table)->table_number ?? 'N/A',
                    'items'        => $order->orderItems->map(fn($i) => [
                        'product_name' => $i->product_name ?? optional($i->product)->name ?? 'Item',
                        'quantity'     => $i->quantity,
                    ]),
                ];
            });

        return response()->json(['orders' => $orders]);
    }

    /**
     * Admin: Update order status
     */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,preparing,ready,served,cancelled'
        ]);

        $order->update([
            'status' => $request->status,
            'updated_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully.'
        ]);
    }

    /**
     * Admin: Order history
     */
    public function history(Request $request)
    {
        $query = Order::with(['orderItems.product', 'table']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(20);

        return view('admin.orders.history', compact('orders'));
    }

    /**
     * Admin: Show single order
     */
    public function show(Order $order)
    {
        $order->load(['orderItems.product', 'table']);
        return view('admin.orders.show', compact('order'));
    }

    /**
     * Admin: Cancel order
     */
    public function cancel(Order $order)
    {
        if (in_array($order->status, ['served', 'cancelled'])) {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be cancelled.'
            ], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully.'
        ]);
    }

    /**
     * Admin: Mark order as paid
     */
    public function markPaid(Request $request, Order $order)
    {
        $order->update([
            'payment_status' => 'paid',
            'payment_method' => $request->input('payment_method', $order->payment_method ?? 'cash'),
        ]);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(['success' => true, 'message' => 'Order marked as paid.']);
        }

        return back()->with('success', 'Payment recorded successfully.');
    }

    /**
     * Admin: Export orders
     */
    public function export(Request $request)
    {
        // Basic CSV export - can be enhanced later
        $orders = Order::with(['orderItems.product', 'table'])
            ->orderBy('created_at', 'desc')
            ->get();

        $csvData = "Order Number,Date,Table,Customer,Total,Status\n";
        
        foreach ($orders as $order) {
            $csvData .= sprintf(
                "%s,%s,%s,%s,%s,%s\n",
                $order->order_number,
                $order->created_at->format('Y-m-d H:i'),
                $order->table->table_number,
                $order->customer_name,
                number_format($order->total_amount, 2),
                $order->status
            );
        }

        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="orders-' . now()->format('Y-m-d') . '.csv"');
    }
}
