@extends('layouts.admin')

@section('title', $category->name . ' - Category Details')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Category Details</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.categories.index') }}">Categories</a></li>
                <li class="breadcrumb-item active">{{ $category->name }}</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <!-- Category Summary -->
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">{{ $category->name }}</h5>
            </div>
            <div class="card-body">
                <!-- Status -->
                <div class="mb-3">
                    <span class="badge badge-{{ $category->is_active ? 'success' : 'secondary' }} mr-2">
                        {{ $category->is_active ? 'Active' : 'Inactive' }}
                    </span>
                    <small class="text-muted">Sort Order: {{ $category->sort_order }}</small>
                </div>

                <!-- Description -->
                @if($category->description)
                    <p class="text-muted">{{ $category->description }}</p>
                @else
                    <p class="text-muted"><em>No description provided.</em></p>
                @endif

                <!-- Quick Stats -->
                <div class="row text-center mt-4">
                    <div class="col-6">
                        <h4 class="text-primary mb-1">{{ $category->products->count() }}</h4>
                        <small class="text-muted">Total Products</small>
                    </div>
                    <div class="col-6">
                        <h4 class="text-success mb-1">{{ $category->products->where('is_active', true)->count() }}</h4>
                        <small class="text-muted">Active Products</small>
                    </div>
                </div>

                <!-- Actions -->
                <div class="mt-4">
                    <a href="{{ route('admin.categories.edit', $category) }}" class="btn btn-warning btn-block mb-2">
                        <i class="fas fa-edit"></i> Edit Category
                    </a>
                    @if($category->products->count() == 0)
                        <button type="button" class="btn btn-danger btn-block" onclick="deleteCategory()">
                            <i class="fas fa-trash"></i> Delete Category
                        </button>
                    @else
                        <button type="button" class="btn btn-outline-danger btn-block" disabled>
                            <i class="fas fa-trash"></i> Cannot Delete (Has Products)
                        </button>
                    @endif
                </div>
            </div>
        </div>

        <!-- Category Meta -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Category Information</h6>
            </div>
            <div class="card-body">
                <table class="table table-borderless table-sm mb-0">
                    <tr>
                        <td><strong>Slug:</strong></td>
                        <td><code>{{ $category->slug }}</code></td>
                    </tr>
                    <tr>
                        <td><strong>Created:</strong></td>
                        <td>{{ $category->created_at->format('M j, Y g:i A') }}</td>
                    </tr>
                    <tr>
                        <td><strong>Updated:</strong></td>
                        <td>{{ $category->updated_at->format('M j, Y g:i A') }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <!-- Products in Category -->
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="card-title mb-0">Products in {{ $category->name }}</h5>
                    </div>
                    <div class="col-auto">
                        <a href="{{ route('admin.products.create', ['category_id' => $category->id]) }}" 
                           class="btn btn-success btn-sm">
                            <i class="fas fa-plus"></i> Add Product
                        </a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                @if($category->products->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Featured</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($category->products as $product)
                                    <tr>
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
                                        <td>{{ $product->formatted_price }}</td>
                                        <td>
                                            <span class="badge badge-{{ $product->is_active ? 'success' : 'secondary' }}">
                                                {{ $product->is_active ? 'Active' : 'Inactive' }}
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
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <div class="text-center py-5">
                        <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                        <h5>No products in this category</h5>
                        <p class="text-muted">Add your first product to get started.</p>
                        <a href="{{ route('admin.products.create', ['category_id' => $category->id]) }}" 
                           class="btn btn-success">
                            <i class="fas fa-plus"></i> Create First Product
                        </a>
                    </div>
                @endif
            </div>
        </div>

        <!-- Category Statistics -->
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Category Analytics</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-info mb-1">{{ $category->products->count() }}</h4>
                            <small class="text-muted">Total Products</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-success mb-1">{{ $category->products->where('is_active', true)->count() }}</h4>
                            <small class="text-muted">Active Products</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-warning mb-1">{{ $category->products->where('is_featured', true)->count() }}</h4>
                            <small class="text-muted">Featured Products</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            @php
                                $avgPrice = $category->products->where('is_active', true)->avg('price');
                            @endphp
                            <h4 class="text-primary mb-1">{{ $avgPrice ? '$' . number_format($avgPrice, 2) : '-' }}</h4>
                            <small class="text-muted">Avg. Price</small>
                        </div>
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
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete <strong>{{ $category->name }}</strong>?</p>
                <p class="text-danger">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" action="{{ route('admin.categories.destroy', $category) }}" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete Category</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function deleteCategory() {
    $('#deleteModal').modal('show');
}
</script>
@endpush