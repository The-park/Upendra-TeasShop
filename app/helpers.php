<?php

use App\Models\Setting;

if (!function_exists('setting')) {
    /**
     * Get a setting value by key
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    function setting($key, $default = null)
    {
        return Setting::get($key, $default);
    }
}

if (!function_exists('set_setting')) {
    /**
     * Set or update a setting
     *
     * @param string $key
     * @param mixed $value
     * @param string $type
     * @param string|null $description
     * @param bool $isPublic
     * @return App\Models\Setting
     */
    function set_setting($key, $value, $type = 'string', $description = null, $isPublic = false)
    {
        return Setting::set($key, $value, $type, $description, $isPublic);
    }
}