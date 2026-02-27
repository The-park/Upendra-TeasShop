@extends('layouts.admin')
@section('title', 'Edit Table ' . $table->table_number)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.tables.index') }}">Tables</a></li>
<li class="breadcrumb-item active">Edit Table {{ $table->table_number }}</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-pencil me-2 text-primary"></i>Edit Table {{ $table->table_number }}</h1>
        <p class="page-subtitle">Update table details</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.tables.show', $table) }}" class="btn btn-outline-secondary"><i class="bi bi-eye me-1"></i>View</a>
        <a href="{{ route('admin.tables.index') }}" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i>Back</a>
    </div>
</div>

<div class="row g-3">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-grid me-2 text-primary"></i><strong>Table Details</strong>
            </div>
            <div class="card-body">
                <form action="{{ route('admin.tables.update', $table) }}" method="POST">
                    @csrf @method('PUT')
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Table Number <span class="text-danger">*</span></label>
                            <input type="number" name="table_number" class="form-control @error('table_number') is-invalid @enderror"
                                   value="{{ old('table_number', $table->table_number) }}" required>
                            @error('table_number')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Capacity</label>
                            <input type="number" name="capacity" class="form-control" value="{{ old('capacity', $table->capacity) }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Table Name</label>
                            <input type="text" name="name" class="form-control" value="{{ old('name', $table->name) }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Location</label>
                            <input type="text" name="location" class="form-control" value="{{ old('location', $table->location) }}">
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-semibold">Description</label>
                            <textarea name="description" class="form-control" rows="3">{{ old('description', $table->description) }}</textarea>
                        </div>
                        <div class="col-12">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1"
                                       {{ old('is_active', $table->is_active) ? 'checked' : '' }}>
                                <label class="form-check-label fw-semibold" for="isActive">Active</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex gap-2 mt-4">
                        <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg me-1"></i>Save Changes</button>
                        <a href="{{ route('admin.tables.index') }}" class="btn btn-outline-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-info-circle me-2 text-info"></i><strong>Table Info</strong>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2" style="font-size:13px;">
                    <span class="text-muted">Created</span>
                    <span>{{ $table->created_at->format('M j, Y') }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2" style="font-size:13px;">
                    <span class="text-muted">Updated</span>
                    <span>{{ $table->updated_at->format('M j, Y') }}</span>
                </div>
                @if($table->qr_code)
                <hr>
                <div class="text-center">
                    <img src="{{ asset('storage/'.$table->qr_code) }}" alt="QR" class="img-fluid" style="max-width:140px;">
                    <p class="text-muted mt-2 mb-0" style="font-size:12px;">Current QR Code</p>
                </div>
                @else
                <hr>
                <form action="{{ route('admin.tables.generate-qr', $table) }}" method="POST">
                    @csrf
                    <div class="d-grid">
                        <button type="submit" class="btn btn-outline-primary btn-sm"><i class="bi bi-qr-code me-1"></i>Generate QR Code</button>
                    </div>
                </form>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
