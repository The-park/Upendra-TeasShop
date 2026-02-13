<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
        'is_public'
    ];

    protected $casts = [
        'is_public' => 'boolean'
    ];

    /**
     * Get setting value with proper type casting
     */
    public function getValueAttribute($value)
    {
        return match ($this->type) {
            'integer' => (int) $value,
            'boolean' => (bool) $value,
            'json' => json_decode($value, true),
            default => $value
        };
    }

    /**
     * Set setting value with proper type casting
     */
    public function setValueAttribute($value)
    {
        $this->attributes['value'] = match ($this->type) {
            'json' => json_encode($value),
            'boolean' => $value ? '1' : '0',
            default => (string) $value
        };
    }

    /**
     * Get only public settings
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Get setting by key
     */
    public static function get($key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        
        return $setting ? $setting->value : $default;
    }

    /**
     * Set or update setting
     */
    public static function set($key, $value, $type = 'string', $description = null, $isPublic = false)
    {
        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => $type,
                'description' => $description,
                'is_public' => $isPublic
            ]
        );
    }
}
