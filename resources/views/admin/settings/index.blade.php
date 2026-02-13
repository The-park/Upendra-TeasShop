@extends('layouts.admin')

@section('title', 'Settings')
@section('page-title', 'Settings')

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-body">
                <form method="POST" action="{{ route('admin.settings.update') }}">
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label class="form-label">Restaurant Name</label>
                        <input type="text" name="restaurant_name" value="{{ old('restaurant_name', $settings['restaurant_name'] ?? '') }}" class="form-control @error('restaurant_name') is-invalid @enderror" />
                        @error('restaurant_name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Currency Symbol</label>
                            <input type="text" name="currency_symbol" value="{{ old('currency_symbol', $settings['currency_symbol'] ?? '$') }}" class="form-control @error('currency_symbol') is-invalid @enderror" maxlength="5" />
                            @error('currency_symbol')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label">Tax Rate (%)</label>
                            <input type="number" step="0.01" name="tax_rate" value="{{ old('tax_rate', $settings['tax_rate'] ?? '0') }}" class="form-control @error('tax_rate') is-invalid @enderror" />
                            @error('tax_rate')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label">Service Charge (%)</label>
                            <input type="number" step="0.01" name="service_charge" value="{{ old('service_charge', $settings['service_charge'] ?? '0') }}" class="form-control @error('service_charge') is-invalid @enderror" />
                            @error('service_charge')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Order Prefix</label>
                        <input type="text" name="order_prefix" value="{{ old('order_prefix', $settings['order_prefix'] ?? 'ORD') }}" class="form-control @error('order_prefix') is-invalid @enderror" maxlength="10" />
                        @error('order_prefix')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Phone</label>
                        <input type="text" name="restaurant_phone" value="{{ old('restaurant_phone', $settings['restaurant_phone'] ?? '') }}" class="form-control @error('restaurant_phone') is-invalid @enderror" />
                        @error('restaurant_phone')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" name="restaurant_email" value="{{ old('restaurant_email', $settings['restaurant_email'] ?? '') }}" class="form-control @error('restaurant_email') is-invalid @enderror" />
                        @error('restaurant_email')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Address</label>
                        <textarea name="restaurant_address" class="form-control @error('restaurant_address') is-invalid @enderror" rows="3">{{ old('restaurant_address', $settings['restaurant_address'] ?? '') }}</textarea>
                        @error('restaurant_address')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>

                    <button class="btn btn-primary">Save Settings</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
