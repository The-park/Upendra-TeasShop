<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'short_description',
        'price',
        'cost_price',
        'image_path',
        'thumbnail_path',
        'is_available',
        'is_featured',
        'stock_quantity',
        'display_order'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'stock_quantity' => 'integer',
        'display_order' => 'integer'
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('name') && empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    /**
     * Get the category this product belongs to
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get order items for this product
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get only available products
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    /**
     * Get only featured products
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Get products ordered by display order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('name');
    }

    /**
     * Search products by name or description
     */
    public function scopeSearch($query, $term)
    {
        return $query->whereFullText(['name', 'description'], $term)
                    ->orWhere('name', 'like', "%{$term}%")
                    ->orWhere('description', 'like', "%{$term}%");
    }

    /**
     * Get formatted price
     */
    public function getFormattedPriceAttribute()
    {
        try {
            $symbol = \App\Models\Setting::get('currency_symbol', '$');
        } catch (\Exception $e) {
            $symbol = '$';
        }
        return $symbol . number_format($this->price, 2);
    }

    /**
     * Backwards-compatible image attribute (maps to image_path)
     */
    public function getImageAttribute()
    {
        return $this->image_path;
    }

    /**
     * Full URL for image_path stored in the model
     */
    public function getImageUrlAttribute()
    {
        if (empty($this->image_path)) {
            return null;
        }

        // If it's already a full URL, return as-is
        if (str_starts_with($this->image_path, 'http')) {
            return $this->image_path;
        }

        // Normalize Windows backslashes and trim
        $raw = str_replace('\\', '/', $this->image_path);
        $raw = trim($raw);

        // If path contains storage/app/public, extract the relative part after it
        if (preg_match('#storage/app/public/(.+)$#i', $raw, $m)) {
            $relative = $m[1];
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($relative)) {
                return \Illuminate\Support\Facades\Storage::url($relative);
            }
        }

        // If path contains public/storage, extract the part after public/storage
        if (preg_match('#public/storage/(.+)$#i', $raw, $m)) {
            $relative = $m[1];
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($relative)) {
                return \Illuminate\Support\Facades\Storage::url($relative);
            }
            return asset('storage/' . $relative);
        }

        // If it already starts with storage/, assume it's correct for asset()
        if (str_starts_with(ltrim($raw, '/'), 'storage/')) {
            return asset(ltrim($raw, '/'));
        }

        // If it looks like a relative path inside public disk (e.g., products/filename.jpg)
        $candidate = ltrim($raw, '/');
        try {
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($candidate)) {
                return \Illuminate\Support\Facades\Storage::url($candidate);
            }
        } catch (\Throwable $e) {
            // ignore
        }

        // As a last resort, try using basename inside products/ folder
        $basename = basename($candidate);
        if ($basename) {
            $possible = 'products/' . $basename;
            try {
                if (\Illuminate\Support\Facades\Storage::disk('public')->exists($possible)) {
                    return \Illuminate\Support\Facades\Storage::url($possible);
                }
            } catch (\Throwable $e) {
                // ignore
            }
        }

        // Final fallback: assume it's a path under storage/app/public
        return asset('storage/' . ltrim($candidate, '/'));
    }

    /**
     * Backwards-compatible status attribute used by some views
     */
    public function getStatusAttribute()
    {
        return $this->is_available ? 'active' : 'inactive';
    }

    /**
     * Calculate profit margin
     */
    public function getProfitMarginAttribute()
    {
        if (! $this->cost_price || $this->cost_price == 0) {
            return null;
        }

        return round((($this->price - $this->cost_price) / $this->price) * 100, 2);
    }
}
