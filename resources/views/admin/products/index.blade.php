@extends('layouts.admin')

@section('title', 'Products Management')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Products Management</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Products</li>
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
                        <h4 class="header-title">All Products</h4>
                    </div>
                    <div class="col-md-6 text-right">
                        <a href="{{ route('admin.products.create') }}" class="btn btn-success">
                            <i class="fas fa-plus"></i> Add New Product
                        </a>
                    </div>
                </div>

                <!-- Filters -->
                <form method="GET" class="mb-3">
                    <div class="row">
                        <div class="col-md-3">
                            <input type="text" name="search" class="form-control" placeholder="Search products..." value="{{ request('search') }}">
                        </div>
                        <div class="col-md-3">
                            <select name="category_id" class="form-control">
                                <option value="">All Categories</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                                        {{ $category->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select name="status" class="form-control">
                                <option value="">All Status</option>
                                <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Active</option>
                                <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactive</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary btn-block">Filter</button>
                        </div>
                        <div class="col-md-2">
                            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary btn-block">Clear</a>
                        </div>
                    </div>
                </form>

                <!-- Bulk Actions -->
                <div class="mb-3" id="bulk-actions" style="display: none;">
                    <div class="row">
                        <div class="col-md-8">
                            <button type="button" class="btn btn-warning" onclick="bulkToggleStatus(true)">
                                <i class="fas fa-eye"></i> Activate Selected
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="bulkToggleStatus(false)">
                                <i class="fas fa-eye-slash"></i> Deactivate Selected
                            </button>
                            <button type="button" class="btn btn-danger" onclick="bulkDelete()">
                                <i class="fas fa-trash"></i> Delete Selected
                            </button>
                        </div>
                        <div class="col-md-4 text-right">
                            <span id="selected-count">0</span> item(s) selected
                        </div>
                    </div>
                </div>

                <!-- Products Table -->
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="select-all">
                                        <label class="custom-control-label" for="select-all"></label>
                                    </div>
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Profit</th>
                                <th>Status</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($products as $product)
                                <tr>
                                    <td>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input product-checkbox" 
                                                   id="product-{{ $product->id }}" value="{{ $product->id }}">
                                            <label class="custom-control-label" for="product-{{ $product->id }}"></label>
                                        </div>
                                    </td>
                                    <td>
                                        @if($product->image)
                                            <img src="{{ $product->image_url }}" alt="{{ $product->name }}" 
                                                 class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
                                        @else
                                            <div class="bg-light d-flex align-items-center justify-content-center" 
                                                 style="width: 50px; height: 50px; border-radius: 4px;">
                                                <i class="fas fa-image text-muted"></i>
                                            </div>
                                        @endif
                                    </td>
                                    <td>
                                        <strong>{{ $product->name }}</strong>
                                        @if($product->description)
                                            <br><small class="text-muted">{{ Str::limit($product->description, 50) }}</small>
                                        @endif
                                    </td>
                                    <td>{{ $product->category->name }}</td>
                                    <td>{{ $product->formatted_price }}</td>
                                    <td>
                                        @if($product->cost_price)
                                            ${{ number_format($product->cost_price, 2) }}
                                        @else
                                            <em class="text-muted">Not set</em>
                                        @endif
                                    </td>
                                    <td>
                                        @if($product->cost_price)
                                            <span class="text-success">${{ $product->profit_amount }}</span>
                                            <br><small>({{ $product->profit_percentage }}%)</small>
                                        @else
                                            <em class="text-muted">-</em>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge badge-{{ $product->is_available ? 'success' : 'secondary' }}">
                                            {{ $product->is_available ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td>
                                        @if($product->is_featured)
                                            <span class="badge badge-warning">Featured</span>
                                        @else
                                            <span class="text-muted">-</span>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <a href="{{ route('admin.products.show', $product) }}" 
                                               class="btn btn-sm btn-info" title="View">
                                                <i class="fas fa-eye"></i>
                                            </a>
                                            <a href="{{ route('admin.products.edit', $product) }}" 
                                               class="btn btn-sm btn-warning" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <button type="button" class="btn btn-sm btn-danger" 
                                                    onclick="deleteProduct({{ $product->id }})" title="Delete">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="10" class="text-center py-4">
                                        <div class="text-muted">
                                            <i class="fas fa-box-open fa-2x mb-3"></i>
                                            <p>No products found.</p>
                                            <a href="{{ route('admin.products.create') }}" class="btn btn-success">
                                                Create Your First Product
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="row mt-3">
                    <div class="col-md-12">
                        {{ $products->links() }}
                    </div>
                </div>
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
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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

@push('scripts')
<script>
$(document).ready(function() {
    // Select all functionality
    $('#select-all').change(function() {
        $('.product-checkbox').prop('checked', this.checked);
        updateBulkActions();
    });

    $('.product-checkbox').change(function() {
        updateBulkActions();
    });

    function updateBulkActions() {
        const checkedCount = $('.product-checkbox:checked').length;
        $('#selected-count').text(checkedCount);
        
        if (checkedCount > 0) {
            $('#bulk-actions').show();
        } else {
            $('#bulk-actions').hide();
        }

        // Update select all checkbox
        if (checkedCount === $('.product-checkbox').length) {
            $('#select-all').prop('indeterminate', false).prop('checked', true);
        } else if (checkedCount > 0) {
            $('#select-all').prop('indeterminate', true);
        } else {
            $('#select-all').prop('indeterminate', false).prop('checked', false);
        }
    }

    // Delete product
    window.deleteProduct = function(productId) {
        $('#deleteForm').attr('action', `/admin/products/${productId}`);
        $('#deleteModal').modal('show');
    };

    // Bulk actions
    window.bulkToggleStatus = function(status) {
        const selectedIds = $('.product-checkbox:checked').map(function() {
            return this.value;
        }).get();

        if (selectedIds.length === 0) {
            alert('Please select products first.');
            return;
        }

        $.post('{{ route("admin.products.bulk-toggle") }}', {
            product_ids: selectedIds,
            status: status,
            _token: '{{ csrf_token() }}'
        }).done(function(response) {
            if (response.success) {
                location.reload();
            } else {
                alert('Error: ' + response.message);
            }
        });
    };

    window.bulkDelete = function() {
        const selectedIds = $('.product-checkbox:checked').map(function() {
            return this.value;
        }).get();

        if (selectedIds.length === 0) {
            alert('Please select products first.');
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedIds.length} products? This action cannot be undone.`)) {
            $.post('{{ route("admin.products.bulk-delete") }}', {
                product_ids: selectedIds,
                _token: '{{ csrf_token() }}'
            }).done(function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert('Error: ' + response.message);
                }
            });
        }
    };
});
</script>
@endpush