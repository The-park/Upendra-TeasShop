@extends('layouts.admin')

@section('title', $product->name . ' - Product Details')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Product Details</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li>
                <li class="breadcrumb-item active">{{ $product->name }}</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <!-- Product Image and Basic Info -->
    <div class="col-lg-4">
        <div class="card">
            <div class="card-body text-center">
                @if($product->image)
                    <img src="{{ $product->image_url }}" alt="{{ $product->name }}" 
                         class="img-fluid rounded mb-3" style="max-height: 300px;">
                @else
                    <div class="bg-light d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style="width: 200px; height: 200px; border-radius: 8px;">
                        <i class="fas fa-image fa-3x text-muted"></i>
                    </div>
                @endif
                
                <h4 class="mb-2">{{ $product->name }}</h4>
                
                <!-- Status Badges -->
                <div class="mb-3">
                    <span class="badge badge-{{ $product->is_available ? 'success' : 'secondary' }} mr-2">
                        {{ $product->is_available ? 'Active' : 'Inactive' }}
                    </span>
                    @if($product->is_featured)
                        <span class="badge badge-warning">Featured</span>
                    @endif
                </div>

                <!-- Price Information -->
                <div class="row text-center">
                    <div class="col-6">
                        <h5 class="text-primary mb-0">{{ $product->formatted_price }}</h5>
                        <small class="text-muted">Selling Price</small>
                    </div>
                    <div class="col-6">
                        @if($product->cost_price)
                            <h5 class="text-info mb-0">${{ number_format($product->cost_price, 2) }}</h5>
                            <small class="text-muted">Cost Price</small>
                        @else
                            <h5 class="text-muted mb-0">Not Set</h5>
                            <small class="text-muted">Cost Price</small>
                        @endif
                    </div>
                </div>

                @if($product->cost_price)
                    <div class="card bg-success text-white mt-3">
                        <div class="card-body">
                            <h5 class="card-title mb-1">${{ $product->profit_amount }} Profit</h5>
                            <p class="card-text">{{ $product->profit_percentage }}% margin</p>
                        </div>
                    </div>
                @endif

                <!-- Actions -->
                <div class="mt-4">
                    <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-warning btn-block mb-2">
                        <i class="fas fa-edit"></i> Edit Product
                    </a>
                    <button type="button" class="btn btn-danger btn-block" onclick="deleteProduct()">
                        <i class="fas fa-trash"></i> Delete Product
                    </button>
                </div>
            </div>
        </div>

        <!-- Product Meta -->
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Product Information</h5>
            </div>
            <div class="card-body">
                <table class="table table-borderless mb-0">
                    <tr>
                        <td><strong>Category:</strong></td>
                        <td>
                            <a href="{{ route('admin.categories.show', $product->category) }}" 
                               class="text-primary">
                                {{ $product->category->name }}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Slug:</strong></td>
                        <td><code>{{ $product->slug }}</code></td>
                    </tr>
                    <tr>
                        <td><strong>Created:</strong></td>
                        <td>{{ $product->created_at->format('M j, Y g:i A') }}</td>
                    </tr>
                    <tr>
                        <td><strong>Updated:</strong></td>
                        <td>{{ $product->updated_at->format('M j, Y g:i A') }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <!-- Product Details -->
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Product Description</h5>
            </div>
            <div class="card-body">
                @if($product->description)
                    <p class="mb-0">{{ $product->description }}</p>
                @else
                    <p class="text-muted mb-0"><em>No description provided.</em></p>
                @endif
            </div>
        </div>

        <!-- Sales Statistics (Placeholder for future implementation) -->
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Sales Analytics</h5>
            </div>
            <div class="card-body">
                <div class="row text-center">
                    <div class="col-md-3">
                        <div class="card bg-info text-white">
                            <div class="card-body">
                                <h4 class="mb-1">-</h4>
                                <p class="mb-0">Total Orders</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-success text-white">
                            <div class="card-body">
                                <h4 class="mb-1">-</h4>
                                <p class="mb-0">Revenue</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-warning text-white">
                            <div class="card-body">
                                <h4 class="mb-1">-</h4>
                                <p class="mb-0">This Month</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-primary text-white">
                            <div class="card-body">
                                <h4 class="mb-1">-</h4>
                                <p class="mb-0">Avg. Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-muted mt-3">
                    <em>Sales analytics will be available once orders are processed.</em>
                </p>
            </div>
        </div>

        <!-- Related Products (Same Category) -->
        @if($product->category->products->where('id', '!=', $product->id)->count() > 0)
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Related Products ({{ $product->category->name }})</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        @foreach($product->category->products->where('id', '!=', $product->id)->take(4) as $relatedProduct)
                            <div class="col-md-3 mb-3">
                                <div class="card h-100">
                                    @if($relatedProduct->image)
                                        <img src="{{ $relatedProduct->image_url }}" class="card-img-top" 
                                             alt="{{ $relatedProduct->name }}" style="height: 120px; object-fit: cover;">
                                    @else
                                        <div class="bg-light d-flex align-items-center justify-content-center" 
                                             style="height: 120px;">
                                            <i class="fas fa-image text-muted"></i>
                                        </div>
                                    @endif
                                    <div class="card-body p-2">
                                        <h6 class="card-title mb-1">
                                            <a href="{{ route('admin.products.show', $relatedProduct) }}" 
                                               class="text-dark">
                                                {{ Str::limit($relatedProduct->name, 20) }}
                                            </a>
                                        </h6>
                                        <p class="card-text mb-1">
                                            <strong>{{ $relatedProduct->formatted_price }}</strong>
                                        </p>
                                        <span class="badge badge-{{ $relatedProduct->is_available ? 'success' : 'secondary' }} badge-sm">
                                            {{ $relatedProduct->is_available ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        @endif
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
                <p>Are you sure you want to delete <strong>{{ $product->name }}</strong>?</p>
                <p class="text-danger">This action cannot be undone and will remove all associated data.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <form method="POST" action="{{ route('admin.products.destroy', $product) }}" style="display: inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete Product</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function deleteProduct() {
    $('#deleteModal').modal('show');
}
</script>
@endpush