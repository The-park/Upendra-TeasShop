@extends('layouts.admin')

@section('title', 'Analytics')

@section('page-title', 'Analytics')
@section('page-description', 'Overview of sales, orders and customer activity')

@section('content')
<div class="row">
    <div class="col-md-4">
        <div class="card text-white bg-success mb-3">
            <div class="card-body">
                <h5 class="card-title">Total Revenue</h5>
                <p class="card-text display-6">{{ number_format($revenue ?? 0, 2) }}</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card text-white bg-primary mb-3">
            <div class="card-body">
                <h5 class="card-title">Orders</h5>
                <p class="card-text display-6">{{ $orders_count ?? 0 }}</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card text-white bg-info mb-3">
            <div class="card-body">
                <h5 class="card-title">New Customers</h5>
                <p class="card-text display-6">{{ $new_customers ?? 0 }}</p>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Reports</h5>
                <p class="text-muted">Charts and detailed reports will appear here.</p>
            </div>
        </div>
    </div>
</div>
@endsection
