@extends('layouts.admin')
@section('title', 'Add Table')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.tables.index') }}">Tables</a></li>
<li class="breadcrumb-item active">Add Table</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-plus-circle me-2 text-success"></i>Add New Table</h1>
        <p class="page-subtitle">Create a new restaurant table</p>
    </div>
    <a href="{{ route('admin.tables.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Back
    </a>
</div>

<div class="row g-3">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-grid me-2 text-primary"></i><strong>Table Details</strong>
            </div>
            <div class="card-body">
                <form action="{{ route('admin.tables.store') }}" method="POST">
                    @csrf
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Table Number <span class="text-danger">*</span></label>
                            <input type="number" name="table_number" class="form-control @error('table_number') is-invalid @enderror"
                                   value="{{ old('table_number') }}" placeholder="e.g. 1" required>
                            @error('table_number')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Capacity</label>
                            <input type="number" name="capacity" class="form-control @error('capacity') is-invalid @enderror"
                                   value="{{ old('capacity') }}" placeholder="Number of seats">
                            @error('capacity')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Table Name</label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                                   value="{{ old('name') }}" placeholder="e.g. Window Table">
                            @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Location</label>
                            <input type="text" name="location" class="form-control @error('location') is-invalid @enderror"
                                   value="{{ old('location') }}" placeholder="e.g. Ground Floor, Terrace">
                            @error('location')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-semibold">Description</label>
                            <textarea name="description" class="form-control" rows="3" placeholder="Optional notes...">{{ old('description') }}</textarea>
                        </div>
                        <div class="col-12">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                                <label class="form-check-label fw-semibold" for="isActive">Active</label>
                                <div class="text-muted" style="font-size:12px;">Inactive tables won't accept orders</div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex gap-2 mt-4">
                        <button type="submit" class="btn btn-tea"><i class="bi bi-check-lg me-1"></i>Create Table</button>
                        <a href="{{ route('admin.tables.index') }}" class="btn btn-outline-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header bg-white border-bottom py-3">
                <i class="bi bi-lightbulb me-2 text-warning"></i><strong>Tips</strong>
            </div>
            <div class="card-body">
                <ul class="list-unstyled mb-0" style="font-size:13px;">
                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>Table number must be unique</li>
                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>QR code is generated after creation</li>
                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>Capacity helps track seating</li>
                    <li><i class="bi bi-check-circle text-success me-2"></i>Use location to group tables by area</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection
