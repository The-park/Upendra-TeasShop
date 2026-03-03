<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class RestaurantTable extends Model
{
    use HasFactory;

    protected $fillable = [
        'table_number',
        'table_name',
        'qr_code_string',
        'qr_code_path',
        'qr_code_generated_at',
        'capacity',
        'location',
        'status',
        'is_active'
    ];

    protected $casts = [
        'capacity' => 'integer',
        'is_active' => 'boolean',
        'qr_code_generated_at' => 'datetime',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($table) {
            if (empty($table->qr_code_string)) {
                $table->qr_code_string = Str::uuid()->toString();
            }
        });
    }

    /**
     * Get orders for this table
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'table_id');
    }

    /**
     * Get only active tables
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get tables by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Get available tables
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available')->where('is_active', true);
    }

    /**
     * Generate QR code URL
     */
    public function getQrUrlAttribute()
    {
        return route('menu', ['table' => $this->qr_code_string]);
    }
}
