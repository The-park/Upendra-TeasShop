@extends('layouts.admin')

@section('title', 'Add New Category')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Add New Category</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.categories.index') }}">Categories</a></li>
                <li class="breadcrumb-item active">Add New</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-8 offset-lg-2">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">Category Information</h4>
                
                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form method="POST" action="{{ route('admin.categories.store') }}">
                    @csrf
                    
                    <div class="form-group">
                        <label for="name" class="control-label">Category Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" name="name" 
                               value="{{ old('name') }}" required maxlength="255" 
                               placeholder="Enter category name">
                        <small class="form-text text-muted">This name will appear on your menu and admin panel.</small>
                    </div>

                    <div class="form-group">
                        <label for="description" class="control-label">Description</label>
                        <textarea class="form-control" id="description" name="description" 
                                  rows="4" maxlength="1000" 
                                  placeholder="Enter category description (optional)">{{ old('description') }}</textarea>
                        <small class="form-text text-muted">A brief description of this category. Maximum 1000 characters.</small>
                    </div>

                    <div class="form-group">
                        <label for="sort_order" class="control-label">Sort Order</label>
                        <input type="number" class="form-control" id="sort_order" name="sort_order" 
                               value="{{ old('sort_order', 0) }}" min="0" 
                               placeholder="0">
                        <small class="form-text text-muted">Lower numbers appear first. You can drag to reorder later.</small>
                    </div>

                    <div class="form-group">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="is_active" 
                                   name="is_active" value="1" {{ old('is_active', '1') ? 'checked' : '' }}>
                            <label class="custom-control-label" for="is_active">
                                <strong>Active</strong>
                            </label>
                        </div>
                        <small class="form-text text-muted">Only active categories are visible to customers.</small>
                    </div>

                    <!-- Preview Section -->
                    <div class="card bg-light mt-4">
                        <div class="card-header">
                            <h6 class="mb-0">Preview</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="mr-3">
                                    <i class="fas fa-tags fa-2x text-muted"></i>
                                </div>
                                <div>
                                    <h5 class="mb-1" id="preview-name">Category Name</h5>
                                    <p class="text-muted mb-0" id="preview-description">Category description will appear here</p>
                                </div>
                                <div class="ml-auto">
                                    <span class="badge badge-success" id="preview-status">Active</span>
                                    <small class="text-muted ml-2">Order: <span id="preview-order">0</span></small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="form-group mt-4">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Save Category
                        </button>
                        <a href="{{ route('admin.categories.index') }}" class="btn btn-secondary ml-2">
                            <i class="fas fa-arrow-left"></i> Back to Categories
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
                <h6 class="mb-0"><i class="fas fa-lightbulb mr-2"></i>Tips for Creating Categories</h6>
            </div>
            <div class="card-body">
                <ul class="mb-0">
                    <li><strong>Keep names short and clear</strong> - Customers should instantly understand what's in this category</li>
                    <li><strong>Use logical groupings</strong> - Group similar products together (e.g., "Hot Drinks", "Cold Drinks")</li>
                    <li><strong>Consider menu flow</strong> - Order categories by popularity or logical progression</li>
                    <li><strong>Add descriptions</strong> - Help customers understand what to expect in each category</li>
                    <li><strong>Start with active</strong> - You can always deactivate categories later if needed</li>
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
        const name = $('#name').val() || 'Category Name';
        const description = $('#description').val() || 'Category description will appear here';
        const isActive = $('#is_active').is(':checked');
        const sortOrder = $('#sort_order').val() || '0';

        $('#preview-name').text(name);
        $('#preview-description').text(description);
        $('#preview-status')
            .removeClass('badge-success badge-secondary')
            .addClass(isActive ? 'badge-success' : 'badge-secondary')
            .text(isActive ? 'Active' : 'Inactive');
        $('#preview-order').text(sortOrder);
    }

    // Bind events for real-time preview
    $('#name, #description, #sort_order').on('input', updatePreview);
    $('#is_active').on('change', updatePreview);

    // Initial preview update
    updatePreview();

    // Form validation
    $('form').on('submit', function(e) {
        const name = $('#name').val().trim();
        if (name.length < 2) {
            e.preventDefault();
            alert('Category name must be at least 2 characters long.');
            $('#name').focus();
            return false;
        }
    });
});
</script>
@endpush