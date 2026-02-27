@extends('layouts.admin')
@section('title', 'Settings')
@section('breadcrumb')
<li class="breadcrumb-item active">Settings</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-gear me-2 text-secondary"></i>Settings</h1>
        <p class="page-subtitle">Configure your tea shop preferences</p>
    </div>
</div>

<div class="row g-3">
    <div class="col-lg-8">
        <form action="{{ route('admin.settings.update') }}" method="POST" enctype="multipart/form-data">
            @csrf @method('PUT')

            <!-- General -->
            <div class="card mb-3">
                <div class="card-header bg-white border-bottom py-3">
                    <i class="bi bi-shop me-2 text-primary"></i><strong>General</strong>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Shop Name <span class="text-danger">*</span></label>
                            <input type="text" name="restaurant_name" class="form-control @error('restaurant_name') is-invalid @enderror" value="{{ old('restaurant_name', $settings['restaurant_name'] ?? '') }}" required>
                            @error('restaurant_name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Tagline</label>
                            <input type="text" name="tagline" class="form-control" value="{{ old('tagline', $settings['tagline'] ?? '') }}" placeholder="Your Tea Destination">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Phone</label>
                            <input type="text" name="restaurant_phone" class="form-control" value="{{ old('restaurant_phone', $settings['restaurant_phone'] ?? '') }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Email</label>
                            <input type="email" name="restaurant_email" class="form-control" value="{{ old('restaurant_email', $settings['restaurant_email'] ?? '') }}">
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-semibold">Address</label>
                            <textarea name="restaurant_address" class="form-control" rows="2">{{ old('restaurant_address', $settings['restaurant_address'] ?? '') }}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Branding -->
            <div class="card mb-3">
                <div class="card-header bg-white border-bottom py-3">
                    <i class="bi bi-palette me-2 text-warning"></i><strong>Branding</strong>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Logo</label>
                            @if(!empty($settings['logo']))
                            <div class="mb-2">
                                <img src="{{ asset('storage/'.$settings['logo']) }}" height="50" class="rounded border p-1">
                            </div>
                            @endif
                            <input type="file" name="logo" class="form-control" accept="image/*">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Favicon</label>
                            <input type="file" name="favicon" class="form-control" accept="image/*">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Settings -->
            <div class="card mb-3">
                <div class="card-header bg-white border-bottom py-3">
                    <i class="bi bi-bag-check me-2 text-success"></i><strong>Order Settings</strong>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label fw-semibold">Currency Symbol <span class="text-danger">*</span></label>
                            <input type="text" name="currency_symbol" class="form-control @error('currency_symbol') is-invalid @enderror" value="{{ old('currency_symbol', $settings['currency_symbol'] ?? '$') }}" maxlength="5" required>
                            @error('currency_symbol')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-semibold">Tax Rate (%)</label>
                            <input type="number" name="tax_rate" class="form-control" value="{{ old('tax_rate', $settings['tax_rate'] ?? 0) }}" step="0.01" min="0" max="100">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-semibold">Service Charge (%)</label>
                            <input type="number" name="service_charge" class="form-control @error('service_charge') is-invalid @enderror" value="{{ old('service_charge', $settings['service_charge'] ?? 0) }}" step="0.01" min="0" max="100">
                            @error('service_charge')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Order Number Prefix <span class="text-danger">*</span></label>
                            <input type="text" name="order_prefix" class="form-control @error('order_prefix') is-invalid @enderror" value="{{ old('order_prefix', $settings['order_prefix'] ?? 'ORD') }}" maxlength="10" placeholder="e.g. ORD" required>
                            <div class="form-text">Prefix for order numbers, e.g. <strong>ORD</strong>-0001</div>
                            @error('order_prefix')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6 d-flex align-items-end">
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input" type="checkbox" name="orders_enabled" id="ordersEnabled" value="1"
                                       {{ !empty($settings['orders_enabled']) ? 'checked' : '' }}>
                                <label class="form-check-label fw-semibold" for="ordersEnabled">Accept Orders</label>
                                <div class="text-muted" style="font-size:12px;">Disable to pause all incoming orders</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-tea"><i class="bi bi-check-lg me-1"></i>Save Settings</button>
            </div>
        </form>
    </div>

    <!-- Info sidebar -->
    <div class="col-lg-4">
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-info-circle me-2 text-info"></i><strong>System Info</strong>
            </div>
            <div class="card-body">
                <dl style="font-size:13px;">
                    <dt class="text-muted">Laravel</dt><dd>{{ app()->version() }}</dd>
                    <dt class="text-muted">PHP</dt><dd>{{ PHP_VERSION }}</dd>
                    <dt class="text-muted">Environment</dt>
                    <dd><span class="badge badge-pill-{{ app()->isProduction() ? 'success' : 'warning' }}">{{ app()->environment() }}</span></dd>
                    <dt class="text-muted">Storage</dt>
                    <dd>
                        @php $used = round(array_sum(array_map('filesize', glob(storage_path('app/public/*.*')))) / 1024 / 1024, 1); @endphp
                        {{ $used }} MB used
                    </dd>
                </dl>
            </div>
        </div>
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-tools me-2 text-secondary"></i><strong>Maintenance</strong>
            </div>
            <div class="card-body d-grid gap-2">
                <button type="button" class="btn btn-outline-secondary btn-sm" disabled title="Run: php artisan cache:clear">
                    <i class="bi bi-trash me-1"></i>Clear Cache
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" disabled title="Run: php artisan optimize">
                    <i class="bi bi-lightning me-1"></i>Optimize
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
