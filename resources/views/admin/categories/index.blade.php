@extends('layouts.admin')

@section('title', 'Categories')

@section('breadcrumb')
<li class="breadcrumb-item active">Categories</li>
@endsection

@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-tags me-2 text-success"></i>Categories</h1>
        <p class="page-subtitle">Manage your tea menu categories</p>
    </div>
    <a href="{{ route('admin.categories.create') }}" class="btn btn-tea">
        <i class="bi bi-plus-lg me-1"></i>New Category
    </a>
</div>

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <span class="fw-bold"><i class="bi bi-list-ul me-2 text-muted"></i>All Categories
            <span class="badge bg-secondary ms-2">{{ $categories->count() }}</span>
        </span>
        <small class="text-muted">Drag &amp; drop to reorder</small>
    </div>
    <div class="card-body p-0">
        @if($categories->count() > 0)
        <div class="table-responsive">
            <table class="table table-hover mb-0" id="categories-table">
                <thead>
                    <tr>
                        <th width="50"><i class="bi bi-grip-vertical text-muted"></i></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th width="160">Actions</th>
                    </tr>
                </thead>
                <tbody id="sortable-categories">
                    @foreach($categories as $category)
                    <tr data-id="{{ $category->id }}" data-sort="{{ $category->sort_order }}">
                        <td class="text-center text-muted" style="cursor:move;">
                            <i class="bi bi-grip-vertical"></i>
                        </td>
                        <td>
                            <div class="fw-semibold">{{ $category->name }}</div>
                            <small class="text-muted font-monospace">{{ $category->slug }}</small>
                        </td>
                        <td>
                            @if($category->description)
                                <span class="text-muted" style="font-size:13px;">{{ Str::limit($category->description, 80) }}</span>
                            @else
                                <em class="text-muted" style="font-size:13px;">No description</em>
                            @endif
                        </td>
                        <td>
                            <a href="{{ route('admin.products.index', ['category_id' => $category->id]) }}"
                               class="badge badge-pill-primary text-decoration-none">
                                <i class="bi bi-box2 me-1"></i>{{ $category->products_count }}
                            </a>
                        </td>
                        <td>
                            @if($category->is_active)
                                <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Active</span>
                            @else
                                <span class="badge badge-pill-secondary"><i class="bi bi-pause-circle me-1"></i>Inactive</span>
                            @endif
                        </td>
                        <td><small class="text-muted">{{ $category->created_at->format('M j, Y') }}</small></td>
                        <td>
                            <div class="d-flex gap-1">
                                <a href="{{ route('admin.categories.show', $category) }}"
                                   class="btn btn-sm btn-outline-secondary" title="View"><i class="bi bi-eye"></i></a>
                                <a href="{{ route('admin.categories.edit', $category) }}"
                                   class="btn btn-sm btn-outline-primary" title="Edit"><i class="bi bi-pencil"></i></a>
                                @if($category->products_count == 0)
                                    <button class="btn btn-sm btn-outline-danger"
                                            onclick="deleteCategory({{ $category->id }})" title="Delete">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                @else
                                    <button class="btn btn-sm btn-outline-danger" disabled title="Has products">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="empty-state">
            <i class="bi bi-tags empty-icon"></i>
            <h5>No categories yet</h5>
            <p>Create your first category to start building your menu.</p>
            <a href="{{ route('admin.categories.create') }}" class="btn btn-tea">
                <i class="bi bi-plus-lg me-1"></i>Create Category
            </a>
        </div>
        @endif
    </div>
</div>

<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="bi bi-exclamation-triangle text-danger me-2"></i>Delete Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this category? This action <strong>cannot be undone</strong>.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form id="deleteForm" method="POST" style="display:inline;">
                    @csrf @method('DELETE')
                    <button type="submit" class="btn btn-danger"><i class="bi bi-trash3 me-1"></i>Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function deleteCategory(id) {
    document.getElementById('deleteForm').action = `/admin/categories/${id}`;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}
</script>
@endpush
