@extends('layouts.admin')

@section('title', 'Restaurant Tables Management')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Restaurant Tables</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Tables</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <h4 class="header-title">Table Management</h4>
                        <p class="text-muted">Manage your restaurant tables and QR codes</p>
                    </div>
                    <div class="col-md-6 text-right">
                        <a href="{{ route('admin.tables.create') }}" class="btn btn-success">
                            <i class="fas fa-plus"></i> Add New Table
                        </a>
                    </div>
                </div>

                @if($tables->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Table Number</th>
                                    <th>Capacity</th>
                                    <th>Location</th>
                                    <th>QR Code</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th width="200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($tables as $table)
                                    <tr>
                                        <td>
                                            <strong class="h6">{{ $table->table_number }}</strong>
                                        </td>
                                        <td>
                                            <i class="fas fa-users text-muted mr-1"></i>
                                            {{ $table->capacity }} {{ Str::plural('person', $table->capacity) }}
                                        </td>
                                        <td>
                                            @if($table->location)
                                                <small class="text-muted">{{ $table->location }}</small>
                                            @else
                                                <em class="text-muted">Not specified</em>
                                            @endif
                                        </td>
                                        <td>
                                            @if($table->qr_code_path)
                                                @php
                                                    $ext = strtolower(pathinfo($table->qr_code_path, PATHINFO_EXTENSION));
                                                @endphp
                                                @if(in_array($ext, ['png','jpg','jpeg','svg']))
                                                    <div class="d-flex align-items-center">
                                                        <img src="{{ Storage::disk('public')->url($table->qr_code_path) }}" alt="QR" style="width:64px;height:64px;object-fit:contain;border-radius:6px;margin-right:8px;border:1px solid #e9ecef;" />
                                                        <div>
                                                            <div><small class="text-muted">Generated {{ $table->qr_code_generated_at ? $table->qr_code_generated_at->format('M j') : 'Unknown' }}</small></div>
                                                                    <div class="mt-1">
                                                                        <a href="{{ route('admin.tables.download-qr', $table) }}" class="btn btn-sm btn-outline-secondary">Download Image</a>
                                                                        <a href="{{ route('admin.tables.download-qr-pdf', $table) }}" class="btn btn-sm btn-outline-primary ms-2">Download PDF</a>
                                                                    </div>
                                                        </div>
                                                    </div>
                                                @else
                                                    <div class="d-flex align-items-center">
                                                        <span class="badge badge-success mr-2">
                                                            <i class="fas fa-qrcode"></i> Generated
                                                        </span>
                                                        <small class="text-muted">
                                                            {{ $table->qr_code_generated_at ? $table->qr_code_generated_at->format('M j') : 'Unknown' }}
                                                        </small>
                                                    </div>
                                                @endif
                                            @else
                                                <span class="badge badge-warning">
                                                    <i class="fas fa-exclamation-triangle"></i> Not Generated
                                                </span>
                                            @endif
                                        </td>
                                        <td>
                                            <span class="badge badge-{{ $table->is_active ? 'success' : 'secondary' }}">
                                                {{ $table->is_active ? 'Active' : 'Inactive' }}
                                            </span>
                                        </td>
                                        <td>
                                            <small class="text-muted">
                                                {{ $table->created_at->format('M j, Y') }}
                                            </small>
                                        </td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <a href="{{ route('admin.tables.show', $table) }}" 
                                                   class="btn btn-sm btn-info" title="View">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <a href="{{ route('admin.tables.edit', $table) }}" 
                                                   class="btn btn-sm btn-warning" title="Edit">
                                                    <i class="fas fa-edit"></i>
                                                </a>
                                                <button type="button" class="btn btn-sm btn-primary" 
                                                        onclick="generateQR({{ $table->id }})" title="Generate QR">
                                                    <i class="fas fa-qrcode"></i>
                                                </button>
                                                @if($table->qr_code_path)
                                                    <a href="{{ route('admin.tables.download-qr', $table) }}" 
                                                       class="btn btn-sm btn-secondary" title="Download QR">
                                                        <i class="fas fa-download"></i>
                                                    </a>
                                                @endif
                                                <button type="button" class="btn btn-sm btn-danger" 
                                                        onclick="deleteTable({{ $table->id }})" title="Delete">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <!-- Quick Statistics -->
                    <div class="row mt-4">
                        @php
                            $totalTables = $tables->count();
                            $activeTables = $tables->where('is_active', true)->count();
                            $qrGenerated = $tables->whereNotNull('qr_code_path')->count();
                            $totalCapacity = $tables->sum('capacity');
                        @endphp
                        <div class="col-md-3">
                            <div class="card bg-info text-white">
                                <div class="card-body text-center">
                                    <h4 class="mb-1">{{ $totalTables }}</h4>
                                    <p class="mb-0">Total Tables</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card bg-success text-white">
                                <div class="card-body text-center">
                                    <h4 class="mb-1">{{ $activeTables }}</h4>
                                    <p class="mb-0">Active Tables</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card bg-primary text-white">
                                <div class="card-body text-center">
                                    <h4 class="mb-1">{{ $qrGenerated }}</h4>
                                    <p class="mb-0">QR Generated</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card bg-warning text-white">
                                <div class="card-body text-center">
                                    <h4 class="mb-1">{{ $totalCapacity }}</h4>
                                    <p class="mb-0">Total Capacity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <div class="text-center py-5">
                        <i class="fas fa-chair fa-3x text-muted mb-3"></i>
                        <h5>No tables found</h5>
                        <p class="text-muted">Create your first table to get started with table management.</p>
                        <a href="{{ route('admin.tables.create') }}" class="btn btn-success">
                            <i class="fas fa-plus"></i> Create First Table
                        </a>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- QR Generation Modal -->
<div class="modal fade" id="qrModal" tabindex="-1" role="dialog" aria-labelledby="qrModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="qrModalLabel">Generate QR Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-center">
                <i class="fas fa-qrcode fa-3x text-primary mb-3"></i>
                <p>Generate QR code for table menu access?</p>
                <p class="text-muted">Customers will scan this QR code to access the menu for their table.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmGenerateQR">
                    <i class="fas fa-qrcode"></i> Generate QR Code
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this table?</p>
                <p class="text-danger">This action cannot be undone and will remove the table and its QR code.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <form id="deleteForm" method="POST" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete Table</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let currentTableId = null;

function generateQR(tableId) {
    currentTableId = tableId;
    const modalEl = document.getElementById('qrModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

document.addEventListener('DOMContentLoaded', function () {
    const confirmBtn = document.getElementById('confirmGenerateQR');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            if (!currentTableId) return;
            const button = this;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

            fetch(`/admin/tables/${currentTableId}/generate-qr`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }).then(response => response.json())
            .then(response => {
                if (response && response.success) {
                    const modalEl = document.getElementById('qrModal');
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    if (modalInstance) modalInstance.hide();
                    location.reload();
                } else {
                    alert('Error: ' + (response.message || 'Unknown error'));
                }
            })
            .catch(() => {
                alert('Error generating QR code. Please try again.');
            })
            .finally(() => {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-qrcode"></i> Generate QR Code';
            });
        });
    }
});

function deleteTable(tableId) {
    const form = document.getElementById('deleteForm');
    if (form) {
        form.setAttribute('action', `/admin/tables/${tableId}`);
    }
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}
</script>
@endpush