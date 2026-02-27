@extends('layouts.admin')
@section('title', 'Restaurant Tables')
@section('breadcrumb')
<li class="breadcrumb-item active">Tables</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-grid me-2 text-success"></i>Restaurant Tables</h1>
        <p class="page-subtitle">Manage dining tables and their QR codes</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.tables.create') }}" class="btn btn-tea">
            <i class="bi bi-plus-circle me-1"></i>Add Table
        </a>
    </div>
</div>

<!-- Stats Row -->
<div class="row g-3 mb-4">
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-green">
            <div class="stat-icon"><i class="bi bi-grid"></i></div>
            <div class="stat-info">
                <h3>{{ $tables->count() }}</h3>
                <p>Total Tables</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-teal">
            <div class="stat-icon"><i class="bi bi-check-circle"></i></div>
            <div class="stat-info">
                <h3>{{ $tables->where('is_active', true)->count() }}</h3>
                <p>Active Tables</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-brown">
            <div class="stat-icon"><i class="bi bi-qr-code"></i></div>
            <div class="stat-info">
                <h3>{{ $tables->whereNotNull('qr_code')->count() }}</h3>
                <p>With QR Code</p>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="stat-card stat-card-gold">
            <div class="stat-icon"><i class="bi bi-x-circle"></i></div>
            <div class="stat-info">
                <h3>{{ $tables->where('is_active', false)->count() }}</h3>
                <p>Inactive</p>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-body p-0">
        @if($tables->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>Table #</th>
                        <th>Name / Location</th>
                        <th>Capacity</th>
                        <th>QR Code</th>
                        <th>Status</th>
                        <th width="160">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($tables as $table)
                    <tr>
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded bg-tea-pale d-flex align-items-center justify-content-center fw-bold" style="width:36px;height:36px;background:var(--tea-pale);color:var(--tea-dark);">
                                    {{ $table->table_number }}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="fw-semibold" style="font-size:13px;">{{ $table->name ?? 'Table '.$table->table_number }}</div>
                            @if($table->location)
                            <small class="text-muted"><i class="bi bi-geo-alt me-1"></i>{{ $table->location }}</small>
                            @endif
                        </td>
                        <td>
                            @if($table->capacity)
                            <span class="badge badge-pill-info"><i class="bi bi-people me-1"></i>{{ $table->capacity }}</span>
                            @else
                            <span class="text-muted">�</span>
                            @endif
                        </td>
                        <td>
                            @if($table->qr_code)
                            <button class="btn btn-sm btn-outline-primary"
                                    onclick="showQR('{{ $table->table_number }}', '{{ asset('storage/'.$table->qr_code) }}')">
                                <i class="bi bi-qr-code me-1"></i>View QR
                            </button>
                            @else
                            <form action="{{ route('admin.tables.generate-qr', $table) }}" method="POST" class="d-inline">
                                @csrf
                                <button type="submit" class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-qr-code-scan me-1"></i>Generate
                                </button>
                            </form>
                            @endif
                        </td>
                        <td>
                            @if($table->is_active)
                            <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Active</span>
                            @else
                            <span class="badge badge-pill-secondary"><i class="bi bi-x-circle me-1"></i>Inactive</span>
                            @endif
                        </td>
                        <td>
                            <div class="d-flex gap-1">
                                <a href="{{ route('admin.tables.show', $table) }}" class="btn btn-sm btn-outline-secondary" title="View"><i class="bi bi-eye"></i></a>
                                <a href="{{ route('admin.tables.edit', $table) }}" class="btn btn-sm btn-outline-primary" title="Edit"><i class="bi bi-pencil"></i></a>
                                <button class="btn btn-sm btn-outline-danger" title="Delete"
                                        onclick="confirmDelete({{ $table->id }}, '{{ $table->table_number }}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="empty-state">
            <i class="bi bi-grid empty-icon"></i>
            <h5>No Tables Yet</h5>
            <p>Add your first restaurant table to get started.</p>
            <a href="{{ route('admin.tables.create') }}" class="btn btn-tea"><i class="bi bi-plus-circle me-1"></i>Add First Table</a>
        </div>
        @endif
    </div>
</div>

<!-- QR Modal -->
<div class="modal fade" id="qrModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="bi bi-qr-code me-2 text-primary"></i>QR Code � Table <span id="qrTableNum"></span></h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center py-4">
                <img id="qrImage" src="" alt="QR Code" class="img-fluid" style="max-width:220px;">
                <p class="text-muted mt-3 mb-0" style="font-size:13px;">Customers scan this to view the menu</p>
            </div>
            <div class="modal-footer">
                <a id="qrDownload" href="#" download class="btn btn-outline-primary"><i class="bi bi-download me-1"></i>Download</a>
                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Delete Table</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete <strong>Table <span id="deleteTableNum"></span></strong>? This cannot be undone.</p>
            </div>
            <div class="modal-footer border-0">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form id="deleteForm" method="POST" class="d-inline">
                    @csrf @method('DELETE')
                    <button type="submit" class="btn btn-danger"><i class="bi bi-trash me-1"></i>Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
function showQR(num, url) {
    document.getElementById('qrTableNum').textContent = num;
    document.getElementById('qrImage').src = url;
    document.getElementById('qrDownload').href = url;
    new bootstrap.Modal(document.getElementById('qrModal')).show();
}
function confirmDelete(id, num) {
    document.getElementById('deleteTableNum').textContent = num;
    document.getElementById('deleteForm').action = `{{ url('admin/tables') }}/${id}`;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}
</script>
@endpush
