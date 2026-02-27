@extends('layouts.admin')
@section('title', 'New Category')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.categories.index') }}">Categories</a></li>
<li class="breadcrumb-item active">New</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-tags me-2 text-success"></i>New Category</h1>
        <p class="page-subtitle">Add a new menu category</p>
    </div>
    <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Back
    </a>
</div>

<div class="row g-4">
    <div class="col-lg-7">
        <div class="card">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-info-circle me-2 text-muted"></i>Category Details</h6></div>
            <div class="card-body">
                <form method="POST" action="{{ route('admin.categories.store') }}">
                    @csrf
                    <div class="mb-3">
                        <label for="name" class="form-label">Category Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror"
                               id="name" name="name" value="{{ old('name') }}" required maxlength="255"
                               placeholder="e.g. Hot Teas, Cold Brews…">
                        @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        <div class="form-text">Shown on your menu and admin panel.</div>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" name="description"
                                  rows="3" maxlength="1000"
                                  placeholder="Brief description for customers (optional)">{{ old('description') }}</textarea>
                        <div class="form-text">Max 1000 characters.</div>
                    </div>

                    <div class="mb-3">
                        <label for="sort_order" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" id="sort_order" name="sort_order"
                               value="{{ old('sort_order', 0) }}" min="0" style="max-width:140px;">
                        <div class="form-text">Lower numbers appear first in menu. Drag-to-reorder available later.</div>
                    </div>

                    <div class="mb-4">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="is_active"
                                   name="is_active" value="1" {{ old('is_active', '1') ? 'checked' : '' }}>
                            <label class="form-check-label fw-semibold" for="is_active">Active</label>
                        </div>
                        <div class="form-text">Only active categories are visible to customers.</div>
                    </div>

                    <!-- Live Preview -->
                    <div class="rounded-3 border p-3 mb-4" style="background:#f7fbf7;">
                        <div class="fw-semibold text-muted mb-2" style="font-size:11px;text-transform:uppercase;letter-spacing:.8px;">Live Preview</div>
                        <div class="d-flex align-items-center gap-3">
                            <div class="rounded-2 d-flex align-items-center justify-content-center"
                                 style="width:44px;height:44px;background:#e8f5e2;">
                                <i class="bi bi-tags fs-4 text-success"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="fw-semibold" id="preview-name" style="font-size:15px;">Category Name</div>
                                <div class="text-muted" id="preview-description" style="font-size:13px;">Description here</div>
                            </div>
                            <div class="text-end">
                                <span id="preview-status" class="badge badge-pill-success">Active</span>
                                <div class="text-muted mt-1" style="font-size:11px;">Order: <span id="preview-order">0</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-tea">
                            <i class="bi bi-check-lg me-1"></i>Save Category
                        </button>
                        <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-lg-5">
        <div class="card border-0" style="background:linear-gradient(135deg,#e8f5e2,#d4edda);">
            <div class="card-body">
                <h6 class="fw-bold mb-3"><i class="bi bi-lightbulb-fill text-warning me-2"></i>Tips</h6>
                <ul class="mb-0" style="font-size:13px;line-height:1.8;">
                    <li><strong>Keep names short</strong> — customers should instantly understand</li>
                    <li><strong>Use logical groupings</strong> — "Hot Drinks", "Cold Beverages"</li>
                    <li><strong>Consider menu flow</strong> — order by popularity</li>
                    <li><strong>Add a description</strong> — helps customers choose</li>
                    <li><strong>Start active</strong> — deactivate later if needed</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
(function () {
    const name = document.getElementById('name');
    const desc = document.getElementById('description');
    const sort = document.getElementById('sort_order');
    const active = document.getElementById('is_active');
    function update() {
        document.getElementById('preview-name').textContent = name.value || 'Category Name';
        document.getElementById('preview-description').textContent = desc.value || 'Description here';
        document.getElementById('preview-order').textContent = sort.value || '0';
        const el = document.getElementById('preview-status');
        if (active.checked) { el.className='badge badge-pill-success'; el.textContent='Active'; }
        else { el.className='badge badge-pill-secondary'; el.textContent='Inactive'; }
    }
    [name,desc,sort].forEach(el => el.addEventListener('input', update));
    active.addEventListener('change', update);
})();
</script>
@endpush
