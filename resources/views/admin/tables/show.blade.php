@extends('layouts.admin')

@section('title', 'Table ' . $table->table_number . ' - Details')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Table Details</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.tables.index') }}">Tables</a></li>
                <li class="breadcrumb-item active">{{ $table->table_number }}</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <!-- Table Info -->
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">{{ $table->table_number }}</h5>
            </div>
            <div class="card-body text-center">
                <i class="fas fa-chair fa-4x text-muted mb-3"></i>
                
                <!-- Status -->
                <div class="mb-3">
                    <span class="badge badge-{{ $table->is_active ? 'success' : 'secondary' }} mr-2">
                        {{ $table->is_active ? 'Active' : 'Inactive' }}
                    </span>
                </div>

                <!-- Capacity -->
                <h4 class="text-primary mb-1">
                    <i class="fas fa-users mr-2"></i>{{ $table->capacity }}
                </h4>
                <p class="text-muted mb-3">{{ Str::plural('Person', $table->capacity) }} Capacity</p>

                <!-- Location -->
                @if($table->location)
                    <div class="mb-3">
                        <p class="text-muted mb-0">
                            <i class="fas fa-map-marker-alt mr-2"></i>{{ $table->location }}
                        </p>
                    </div>
                @endif

                <!-- Actions -->
                <div class="mt-4">
                    <a href="{{ route('admin.tables.edit', $table) }}" class="btn btn-warning btn-block mb-2">
                        <i class="fas fa-edit"></i> Edit Table
                    </a>

                    <button type="button" class="btn btn-{{ $table->qr_code_path ? 'success' : 'primary' }} btn-block mb-2" onclick="generateQR()">
                        <i class="fas fa-{{ $table->qr_code_path ? 'sync' : 'qrcode' }}"></i>
                        {{ $table->qr_code_path ? 'Regenerate QR Code' : 'Generate QR Code' }}
                    </button>

                    @if($table->qr_code_path)
                        <a href="{{ route('admin.tables.download-qr', $table) }}" class="btn btn-secondary btn-block mb-2">
                            <i class="fas fa-download"></i> Download QR Code
                        </a>
                    @endif

                    <button type="button" class="btn btn-danger btn-block" onclick="deleteTable()">
                        <i class="fas fa-trash"></i> Delete Table
                    </button>
                </div>
            </div>
        </div>

        <!-- QR Code Section -->
        @if($table->qr_code_path)
            <div class="card">
                <div class="card-header">
                    <h6 class="card-title mb-0">QR Code</h6>
                </div>
                <div class="card-body">
                    <div class="text-center">
                        @php
                            $ext = strtolower(pathinfo($table->qr_code_path, PATHINFO_EXTENSION));
                        @endphp
                        @if(in_array($ext, ['png','jpg','jpeg','svg']))
                            <img src="{{ Storage::disk('public')->url($table->qr_code_path) }}"
                                 alt="QR Code for {{ $table->table_number }}"
                                 style="max-width:220px;width:100%;border:1px solid #dee2e6;border-radius:8px;padding:8px;background:#fff;" />
                        @else
                            <i class="fas fa-qrcode fa-4x text-success mb-3"></i>
                        @endif

                        <p class="text-muted mt-2 mb-3" style="font-size:.82rem;">
                            Generated: {{ $table->qr_code_generated_at?->format('M j, Y g:i A') ?? 'Unknown' }}
                        </p>

                        <div class="row">
                            <div class="col-6">
                                <button type="button" class="btn btn-primary btn-sm btn-block" onclick="generateQR()">
                                    <i class="fas fa-sync"></i> Regenerate
                                </button>
                            </div>
                            <div class="col-6">
                                <a href="{{ route('admin.tables.download-qr', $table) }}" class="btn btn-secondary btn-sm btn-block">
                                    <i class="fas fa-download"></i> Download
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endif

        <!-- Table Meta -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Table Information</h6>
            </div>
            <div class="card-body">
                <table class="table table-borderless table-sm mb-0">
                    <tr>
                        <td><strong>Created:</strong></td>
                        <td>{{ $table->created_at->format('M j, Y g:i A') }}</td>
                    </tr>
                    <tr>
                        <td><strong>Updated:</strong></td>
                        <td>{{ $table->updated_at->format('M j, Y g:i A') }}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Orders:</strong></td>
                        <td>{{ $table->orders->count() }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <!-- Orders History -->
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="card-title mb-0">Order History</h5>
                    </div>
                    <div class="col-auto">
                        <small class="text-muted">{{ $table->orders->count() }} total orders</small>
                    </div>
                </div>
            </div>
            <div class="card-body">
                @if($table->orders->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($table->orders->take(10) as $order)
                                    <tr>
                                        <td>
                                            <a href="{{ route('admin.orders.show', $order) }}" class="font-weight-bold">
                                                {{ $order->order_number }}
                                            </a>
                                        </td>
                                        <td>{{ $order->customer_name }}</td>
                                        <td>${{ number_format($order->total_amount, 2) }}</td>
                                        <td>
                                            <span class="badge badge-{{ $order->status == 'delivered' ? 'success' : ($order->status == 'cancelled' ? 'danger' : 'warning') }}">
                                                {{ ucfirst($order->status) }}
                                            </span>
                                        </td>
                                        <td>{{ $order->created_at->format('M j') }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    
                    @if($table->orders->count() > 10)
                        <div class="text-center mt-3">
                            <a href="{{ route('admin.orders.history', ['table' => $table->id]) }}" class="btn btn-sm btn-outline-primary">
                                View All Orders ({{ $table->orders->count() }})
                            </a>
                        </div>
                    @endif
                @else
                    <div class="text-center py-4">
                        <i class="fas fa-receipt fa-2x text-muted mb-3"></i>
                        <p class="text-muted">No orders yet for this table</p>
                    </div>
                @endif
            </div>
        </div>

        <!-- Table Statistics -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Table Analytics</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="text-center">
                            <h4 class="text-info mb-1">{{ $table->orders->count() }}</h4>
                            <small class="text-muted">Total Orders</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-center">
                            <h4 class="text-success mb-1">${{ number_format($table->orders->sum('total_amount'), 0) }}</h4>
                            <small class="text-muted">Total Revenue</small>
                        </div>
                    </div>
                </div>
                
                <hr>
                
                <div class="row">
                    <div class="col-6">
                        <div class="text-center">
                            <h4 class="text-warning mb-1">{{ $table->orders->where('created_at', '>=', now()->startOfMonth())->count() }}</h4>
                            <small class="text-muted">This Month</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-center">
                            @php
                                $avgOrder = $table->orders->count() > 0 ? $table->orders->avg('total_amount') : 0; 
                            @endphp
                            <h4 class="text-primary mb-1">${{ number_format($avgOrder, 0) }}</h4>
                            <small class="text-muted">Avg. Order</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- QR Generation Modal -->
<div class="modal fade" id="qrModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ $table->qr_code_path ? 'Regenerate' : 'Generate' }} QR Code</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <i class="fas fa-qrcode fa-3x text-primary mb-3"></i>
                <p>{{ $table->qr_code_path ? 'Regenerate' : 'Generate' }} QR code for {{ $table->table_number }}?</p>
                <p class="text-muted">Customers will scan this to access the menu.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmGenerateQR">
                    <i class="fas fa-qrcode"></i> {{ $table->qr_code_path ? 'Regenerate' : 'Generate' }}
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete <strong>{{ $table->table_number }}</strong>?</p>
                @if($table->orders()->whereIn('status', ['pending', 'confirmed', 'preparing'])->count() > 0)
                    <div class="alert alert-warning">
                        <strong>Warning:</strong> This table has active orders. Please complete or cancel them first.
                    </div>
                @else
                    <p class="text-danger">This action cannot be undone.</p>
                @endif
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                @if($table->orders()->whereIn('status', ['pending', 'confirmed', 'preparing'])->count() == 0)
                    <form method="POST" action="{{ route('admin.tables.destroy', $table) }}" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Delete Table</button>
                    </form>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function generateQR() {
    const modalEl = document.getElementById('qrModal');
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function deleteTable() {
    const modalEl = document.getElementById('deleteModal');
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

document.addEventListener('DOMContentLoaded', function () {
    const confirmBtn = document.getElementById('confirmGenerateQR');
    if (!confirmBtn) return;

    confirmBtn.addEventListener('click', function () {
        const button = this;
        const originalHtml = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

        fetch('{{ route("admin.tables.generate-qr", $table) }}', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(function (res) { return res.json(); })
        .then(function (response) {
            if (response && response.success) {
                bootstrap.Modal.getInstance(document.getElementById('qrModal'))?.hide();
                location.reload();
            } else {
                alert('Error: ' + (response.message || 'Unknown error'));
            }
        })
        .catch(function () {
            alert('Error generating QR code. Please try again.');
        })
        .finally(function () {
            button.disabled = false;
            button.innerHTML = originalHtml;
        });
    });
});
</script>
@endpush