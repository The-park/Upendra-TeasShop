@extends('layouts.admin')

@section('title', 'Add New Table')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Add New Table</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.tables.index') }}">Tables</a></li>
                <li class="breadcrumb-item active">Add New</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-8 offset-lg-2">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">Table Information</h4>
                
                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form method="POST" action="{{ route('admin.tables.store') }}">
                    @csrf
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="table_number" class="control-label">Table Number <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="table_number" name="table_number" 
                                       value="{{ old('table_number') }}" required maxlength="255" 
                                       placeholder="e.g., T-001, A1, Table 5">
                                <small class="form-text text-muted">Unique identifier for this table</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="capacity" class="control-label">Capacity <span class="text-danger">*</span></label>
                                <select class="form-control" id="capacity" name="capacity" required>
                                    <option value="">Select Capacity</option>
                                    @for($i = 1; $i <= 20; $i++)
                                        <option value="{{ $i }}" {{ old('capacity') == $i ? 'selected' : '' }}>
                                            {{ $i }} {{ Str::plural('person', $i) }}
                                        </option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="location" class="control-label">Location/Description</label>
                        <input type="text" class="form-control" id="location" name="location" 
                               value="{{ old('location') }}" maxlength="255" 
                               placeholder="e.g., Near window, Patio, Private room">
                        <small class="form-text text-muted">Optional description to help staff locate the table</small>
                    </div>

                    <div class="form-group">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="is_active" 
                                   name="is_active" value="1" {{ old('is_active', '1') ? 'checked' : '' }}>
                            <label class="custom-control-label" for="is_active">
                                <strong>Active</strong>
                            </label>
                        </div>
                        <small class="form-text text-muted">Only active tables are available for customer seating</small>
                    </div>

                    <!-- Preview Section -->
                    <div class="card bg-light mt-4">
                        <div class="card-header">
                            <h6 class="mb-0">Table Preview</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="mr-3">
                                    <i class="fas fa-chair fa-2x text-muted"></i>
                                </div>
                                <div>
                                    <h5 class="mb-1" id="preview-number">Table Number</h5>
                                    <p class="text-muted mb-0">
                                        <span id="preview-capacity">0 persons</span>
                                        <span id="preview-location"></span>
                                    </p>
                                </div>
                                <div class="ml-auto">
                                    <span class="badge badge-success" id="preview-status">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="form-group mt-4">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Save Table
                        </button>
                        <a href="{{ route('admin.tables.index') }}" class="btn btn-secondary ml-2">
                            <i class="fas fa-arrow-left"></i> Back to Tables
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Tips Card -->
<div class="row mt-4">
    <div class="col-lg-8 offset-lg-2">
        <div class="card border-info">
            <div class="card-header bg-info text-white">
                <h6 class="mb-0"><i class="fas fa-lightbulb mr-2"></i>Table Management Tips</h6>
            </div>
            <div class="card-body">
                <ul class="mb-0">
                    <li><strong>Unique Numbers:</strong> Use a consistent numbering system (T-001, A1, etc.)</li>
                    <li><strong>Clear Locations:</strong> Add descriptions to help staff find tables quickly</li>
                    <li><strong>Accurate Capacity:</strong> Set realistic capacity for customer comfort</li>
                    <li><strong>QR Codes:</strong> Generate QR codes after creating tables for contactless ordering</li>
                    <li><strong>Status Management:</strong> Deactivate tables during maintenance or special events</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    // Real-time preview updates
    function updatePreview() {
        const tableNumber = $('#table_number').val() || 'Table Number';
        const capacity = $('#capacity').val() || '0';
        const location = $('#location').val();
        const isActive = $('#is_active').is(':checked');

        $('#preview-number').text(tableNumber);
        $('#preview-capacity').text(capacity + ' ' + (capacity == 1 ? 'person' : 'persons'));
        $('#preview-location').text(location ? ' • ' + location : '');
        $('#preview-status')
            .removeClass('badge-success badge-secondary')
            .addClass(isActive ? 'badge-success' : 'badge-secondary')
            .text(isActive ? 'Active' : 'Inactive');
    }

    // Bind events
    $('#table_number, #location, #capacity').on('input change', updatePreview);
    $('#is_active').on('change', updatePreview);

    // Initial preview update
    updatePreview();

    // Form validation
    $('form').on('submit', function(e) {
        const tableNumber = $('#table_number').val().trim();
        const capacity = $('#capacity').val();
        
        if (tableNumber.length < 1) {
            e.preventDefault();
            alert('Table number is required.');
            $('#table_number').focus();
            return false;
        }
        
        if (!capacity) {
            e.preventDefault();
            alert('Please select table capacity.');
            $('#capacity').focus();
            return false;
        }
    });
});
</script>
@endpush