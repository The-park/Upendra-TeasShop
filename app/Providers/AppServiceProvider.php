<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Setting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share currency symbol with all views so it's always dynamic
        View::composer('*', function ($view) {
            try {
                $currencySymbol = Setting::get('currency_symbol', '$');
            } catch (\Exception $e) {
                $currencySymbol = '$';
            }
            $view->with('currencySymbol', $currencySymbol);
        });
    }
}
