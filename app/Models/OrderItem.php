<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'quantity',
        'unit_price',
        'subtotal',
        'special_instructions'
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2'
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($orderItem) {
            // Auto-calculate subtotal
            $orderItem->subtotal = $orderItem->quantity * $orderItem->unit_price;
        });

        static::updating(function ($orderItem) {
            // Recalculate subtotal if quantity or unit_price changed
            if ($orderItem->isDirty(['quantity', 'unit_price'])) {
                $orderItem->subtotal = $orderItem->quantity * $orderItem->unit_price;
            }
        });
    }

    /**
     * Get the order this item belongs to
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product for this item
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get formatted unit price
     */
    public function getFormattedUnitPriceAttribute()
    {
        return '$' . number_format($this->unit_price, 2);
    }

    /**
     * Get formatted subtotal
     */
    public function getFormattedSubtotalAttribute()
    {
        return '$' . number_format($this->subtotal, 2);
    }

    /**
     * Backwards-compatible accessor for legacy templates using `total_price`
     */
    public function getTotalPriceAttribute()
    {
        return $this->subtotal;
    }
}
