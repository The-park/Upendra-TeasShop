@extends('layouts.admin')

@section('title', 'Categories Management')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Categories Management</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Categories</li>
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
                        <h4 class="header-title">All Categories</h4>
                        <p class="text-muted">Drag and drop to reorder categories</p>
                    </div>
                    <div class="col-md-6 text-right">
                        <a href="{{ route('admin.categories.create') }}" class="btn btn-success">
                            <i class="fas fa-plus"></i> Add New Category
                        </a>
                    </div>
                </div>

                @if($categories->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-striped" id="categories-table">
                            <thead>
                                <tr>
                                    <th width="50">Order</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Products</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th width="150">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="sortable-categories">
                                @foreach($categories as $category)
                                    <tr data-id="{{ $category->id }}" data-sort="{{ $category->sort_order }}">
                                        <td class="text-center">
                                            <i class="fas fa-grip-vertical drag-handle" style="cursor: move;" title="Drag to reorder"></i>
                                            <span class="ml-2">{{ $category->sort_order }}</span>
                                        </td>
                                        <td>
                                            <strong>{{ $category->name }}</strong>
                                            <br><small class="text-muted">{{ $category->slug }}</small>
                                        </td>
                                        <td>
                                            @if($category->description)
                                                {{ Str::limit($category->description, 80) }}
                                            @else
                                                <em class="text-muted">No description</em>
                                            @endif
                                        </td>
                                        <td>
                                            <a href="{{ route('admin.products.index', ['category_id' => $category->id]) }}" 
                                               class="btn btn-sm btn-outline-primary">
                                                {{ $category->products_count }} products
                                            </a>
                                        </td>
                                        <td>
                                            <span class="badge badge-{{ $category->is_active ? 'success' : 'secondary' }}">
                                                {{ $category->is_active ? 'Active' : 'Inactive' }}
                                            </span>
                                        </td>
                                        <td>
                                            <small class="text-muted">
                                                {{ $category->created_at->format('M j, Y') }}
                                            </small>
                                        </td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <a href="{{ route('admin.categories.show', $category) }}" 
                                                   class="btn btn-sm btn-info" title="View">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <a href="{{ route('admin.categories.edit', $category) }}" 
                                                   class="btn btn-sm btn-warning" title="Edit">
                                                    <i class="fas fa-edit"></i>
                                                </a>
                                                @if($category->products_count == 0)
                                                    <button type="button" class="btn btn-sm btn-danger" 
                                                            onclick="deleteCategory({{ $category->id }})" title="Delete">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                @else
                                                    <button type="button" class="btn btn-sm btn-danger" disabled 
                                                            title="Cannot delete - has products">
                                                        <i class="fas fa-trash"></i>
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
                    <div class="text-center py-5">
                        <i class="fas fa-tags fa-3x text-muted mb-3"></i>
                        <h5>No categories found</h5>
                        <p class="text-muted">Create your first category to get started.</p>
                        <a href="{{ route('admin.categories.create') }}" class="btn btn-success">
                            <i class="fas fa-plus"></i> Create First Category
                        </a>
                    </div>
                @endif
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
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this category?</p>
                <p class="text-danger">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form id="deleteForm" method="POST" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
#sortable-categories .drag-handle {
    color: #6c757d;
}

#sortable-categories tr.ui-sortable-helper {
    background-color: #f8f9fa;
    border: 1px dashed #dee2e6;
}

#sortable-categories tr.ui-sortable-placeholder {
    background-color: #e9ecef;
    height: 50px;
}
</style>
@endpush

@push('scripts')
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script>
$(document).ready(function() {
    // Make table sortable
    $("#sortable-categories").sortable({
        handle: '.drag-handle',
        update: function(event, ui) {
            let categoryOrder = [];
            $('#sortable-categories tr').each(function(index) {
                categoryOrder.push({
                    id: $(this).data('id'),
                    sort_order: index + 1
                });
            });
            
            // Update sort order numbers in UI
            $('#sortable-categories tr').each(function(index) {
                $(this).find('td:first span.ml-2').text(index + 1);
            });
            
            // Send AJAX request to update order
            $.post('{{ route("admin.categories.reorder") }}', {
                categories: categoryOrder,
                _token: '{{ csrf_token() }}'
            }).done(function(response) {
                if (response.success) {
                    // Show success message
                    const alert = `
                        <div class="alert alert-success alert-dismissible fade show">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            ${response.message}
                        </div>
                    `;
                    $('.card-body').prepend(alert);
                    
                    // Auto-hide alert after 3 seconds
                    setTimeout(() => {
                        $('.alert-success').fadeOut();
                    }, 3000);
                } else {
                    alert('Error updating order: ' + response.message);
                    location.reload(); // Revert changes
                }
            }).fail(function() {
                alert('Error updating category order. Please try again.');
                location.reload(); // Revert changes
            });
        },
        placeholder: "ui-sortable-placeholder",
        helper: function(e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function(index) {
                $(this).width($originals.eq(index).width());
            });
            return $helper;
        }
    });

    // Delete category
    window.deleteCategory = function(categoryId) {
        $('#deleteForm').attr('action', `/admin/categories/${categoryId}`);
        $('#deleteModal').modal('show');
    };
});
</script>
@endpush