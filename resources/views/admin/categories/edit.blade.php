@extends('layouts.admin')
@section('title', 'Edit ' . $category->name)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.categories.index') }}">Categories</a></li>
<li class="breadcrumb-item"><a href="{{ route('admin.categories.show', $category) }}">{{ $category->name }}</a></li>
<li class="breadcrumb-item active">Edit</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-pencil-square me-2 text-primary"></i>Edit Category</h1>
        <p class="page-subtitle">Updating: <strong>{{ $category->name }}</strong></p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.categories.show', $category) }}" class="btn btn-outline-secondary">
            <i class="bi bi-eye me-1"></i>View
        </a>
        <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </a>
    </div>
</div>

<div class="row g-4">
    <div class="col-lg-7">
        <div class="card">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-pencil me-2 text-muted"></i>Edit Details</h6></div>
            <div class="card-body">
                <form method="POST" action="{{ route('admin.categories.update', $category) }}">
                    @csrf @method('PUT')
                    <div class="mb-3">
                        <label for="name" class="form-label">Category Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror"
                               id="name" name="name" value="{{ old('name', $category->name) }}"
                               required maxlength="255">
                        @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" name="description"
                                  rows="3" maxlength="1000">{{ old('description', $category->description) }}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="sort_order" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" id="sort_order" name="sort_order"
                               value="{{ old('sort_order', $category->sort_order) }}" min="0" style="max-width:140px;">
                    </div>
                    <div class="mb-4">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="is_active"
                                   name="is_active" value="1" {{ old('is_active', $category->is_active) ? 'checked' : '' }}>
                            <label class="form-check-label fw-semibold" for="is_active">Active</label>
                        </div>
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
                                <div class="fw-semibold" id="preview-name" style="font-size:15px;">{{ $category->name }}</div>
                                <div class="text-muted" id="preview-description" style="font-size:13px;">{{ $category->description ?: 'No description' }}</div>
                            </div>
                            <div class="text-end">
                                <span id="preview-status" class="badge {{ $category->is_active ? 'badge-pill-success' : 'badge-pill-secondary' }}">
                                    {{ $category->is_active ? 'Active' : 'Inactive' }}
                                </span>
                                <div class="text-muted mt-1" style="font-size:11px;">Order: <span id="preview-order">{{ $category->sort_order }}</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-lg me-1"></i>Update Category
                        </button>
                        <a href="{{ route('admin.categories.show', $category) }}" class="btn btn-outline-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-lg-5">
        <div class="card">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-clock-history me-2 text-muted"></i>Meta Info</h6></div>
            <div class="card-body">
                <dl class="row mb-0" style="font-size:13px;">
                    <dt class="col-sm-4 text-muted">Slug</dt>
                    <dd class="col-sm-8"><code>{{ $category->slug }}</code></dd>
                    <dt class="col-sm-4 text-muted">Products</dt>
                    <dd class="col-sm-8">{{ $category->products_count ?? $category->products->count() }}</dd>
                    <dt class="col-sm-4 text-muted">Created</dt>
                    <dd class="col-sm-8">{{ $category->created_at->format('M j, Y g:i A') }}</dd>
                    <dt class="col-sm-4 text-muted">Updated</dt>
                    <dd class="col-sm-8">{{ $category->updated_at->format('M j, Y g:i A') }}</dd>
                </dl>
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
        document.getElementById('preview-description').textContent = desc.value || 'No description';
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
