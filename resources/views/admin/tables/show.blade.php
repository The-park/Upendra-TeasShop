@extends('layouts.admin')
@section('title', 'Table ' . $table->table_number)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.tables.index') }}">Tables</a></li>
<li class="breadcrumb-item active">Table {{ $table->table_number }}</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-grid me-2 text-success"></i>Table {{ $table->table_number }}</h1>
        <p class="page-subtitle">{{ $table->name ?? ($table->location ? 'Located at '.$table->location : 'View table details') }}</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.tables.edit', $table) }}" class="btn btn-outline-primary"><i class="bi bi-pencil me-1"></i>Edit</a>
        <a href="{{ route('admin.tables.index') }}" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i>Back</a>
    </div>
</div>

<div class="row g-3">
    <div class="col-md-4">
        <!-- QR Card -->
        <div class="card mb-3">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-qr-code me-2 text-primary"></i><strong>QR Code</strong>
            </div>
            <div class="card-body text-center py-4">
                @if($table->qr_code)
                <img src="{{ asset('storage/'.$table->qr_code) }}" alt="QR Code" class="img-fluid mb-3" style="max-width:200px;">
                <p class="text-muted mb-3" style="font-size:13px;">Customers scan this to view the menu</p>
                <div class="d-grid gap-2">
                    <a href="{{ asset('storage/'.$table->qr_code) }}" download class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-download me-1"></i>Download QR
                    </a>
                    <form action="{{ route('admin.tables.generate-qr', $table) }}" method="POST">
                        @csrf
                        <button type="submit" class="btn btn-outline-secondary btn-sm w-100">
                            <i class="bi bi-arrow-clockwise me-1"></i>Regenerate QR
                        </button>
                    </form>
                </div>
                @else
                <div class="text-muted mb-3">
                    <i class="bi bi-qr-code-scan" style="font-size:3rem;opacity:.3;"></i>
                    <p class="mt-2">No QR code generated yet</p>
                </div>
                <form action="{{ route('admin.tables.generate-qr', $table) }}" method="POST">
                    @csrf
                    <div class="d-grid">
                        <button type="submit" class="btn btn-tea"><i class="bi bi-qr-code me-1"></i>Generate QR Code</button>
                    </div>
                </form>
                @endif
            </div>
        </div>

        <!-- Details Card -->
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-info-circle me-2 text-info"></i><strong>Details</strong>
            </div>
            <div class="card-body">
                <dl style="font-size:13px;">
                    <dt class="text-muted">Table Number</dt>
                    <dd class="fw-semibold">{{ $table->table_number }}</dd>
                    @if($table->name)
                    <dt class="text-muted">Name</dt>
                    <dd class="fw-semibold">{{ $table->name }}</dd>
                    @endif
                    @if($table->location)
                    <dt class="text-muted">Location</dt>
                    <dd class="fw-semibold">{{ $table->location }}</dd>
                    @endif
                    @if($table->capacity)
                    <dt class="text-muted">Capacity</dt>
                    <dd class="fw-semibold">{{ $table->capacity }} seats</dd>
                    @endif
                    <dt class="text-muted">Status</dt>
                    <dd>
                        @if($table->is_active)
                        <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Active</span>
                        @else
                        <span class="badge badge-pill-secondary"><i class="bi bi-x-circle me-1"></i>Inactive</span>
                        @endif
                    </dd>
                    <dt class="text-muted">Added</dt>
                    <dd>{{ $table->created_at->format('M j, Y') }}</dd>
                </dl>
            </div>
        </div>
    </div>

    <div class="col-md-8">
        <!-- Recent Orders -->
        <div class="card">
            <div class="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
                <div><i class="bi bi-receipt me-2 text-primary"></i><strong>Recent Orders</strong></div>
                @if(isset($orders) && $orders->count() > 0)
                <span class="badge badge-pill-secondary">{{ $orders->count() }}</span>
                @endif
            </div>
            <div class="card-body p-0">
                @if(isset($orders) && $orders->count() > 0)
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead><tr><th>Order #</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr></thead>
                        <tbody>
                            @foreach($orders as $order)
                            @php
                            $sp = ['pending'=>'badge-pill-danger','confirmed'=>'badge-pill-warning','preparing'=>'badge-pill-info','ready'=>'badge-pill-success','delivered'=>'badge-pill-primary','cancelled'=>'badge-pill-secondary'];
                            @endphp
                            <tr>
                                <td class="fw-semibold">#{{ $order->order_number }}</td>
                                <td><span style="font-size:13px;">{{ $order->created_at->format('M j, Y') }}</span></td>
                                <td class="text-success fw-semibold">{{ $currencySymbol }}{{ number_format($order->total_amount, 2) }}</td>
                                <td><span class="badge {{ $sp[$order->status] ?? 'badge-pill-secondary' }}">{{ ucfirst($order->status) }}</span></td>
                                <td><a href="{{ route('admin.orders.show', $order) }}" class="btn btn-sm btn-outline-secondary"><i class="bi bi-eye"></i></a></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                @else
                <div class="empty-state">
                    <i class="bi bi-receipt-cutoff empty-icon"></i>
                    <h5>No Orders Yet</h5>
                    <p>This table hasn't received any orders yet.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
