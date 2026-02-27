@extends('layouts.admin')
@section('title', $category->name)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.categories.index') }}">Categories</a></li>
<li class="breadcrumb-item active">{{ $category->name }}</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-tag me-2 text-success"></i>{{ $category->name }}</h1>
        <p class="page-subtitle">Category details &amp; products</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.categories.edit', $category) }}" class="btn btn-primary">
            <i class="bi bi-pencil me-1"></i>Edit
        </a>
        <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </a>
    </div>
</div>

<div class="row g-4">
    <!-- Sidebar info -->
    <div class="col-lg-4">
        <!-- Category Card -->
        <div class="card mb-3">
            <div class="card-body text-center py-4">
                <div class="mx-auto mb-3 rounded-3 d-inline-flex align-items-center justify-content-center"
                     style="width:72px;height:72px;background:#e8f5e2;">
                    <i class="bi bi-tags" style="font-size:32px;color:var(--tea-accent);"></i>
                </div>
                <h5 class="fw-bold mb-1">{{ $category->name }}</h5>
                @if($category->is_active)
                    <span class="badge badge-pill-success mb-2"><i class="bi bi-check-circle me-1"></i>Active</span>
                @else
                    <span class="badge badge-pill-secondary mb-2"><i class="bi bi-pause-circle me-1"></i>Inactive</span>
                @endif
                @if($category->description)
                    <p class="text-muted mt-2 mb-0" style="font-size:13px;">{{ $category->description }}</p>
                @else
                    <p class="text-muted mt-2 mb-0" style="font-size:13px;"><em>No description</em></p>
                @endif
            </div>
            <div class="card-footer">
                <div class="row text-center g-0">
                    <div class="col-6 border-end">
                        <div class="fw-bold fs-4 text-primary">{{ $category->products->count() }}</div>
                        <div class="text-muted" style="font-size:11px;text-transform:uppercase;">Total</div>
                    </div>
                    <div class="col-6">
                        <div class="fw-bold fs-4 text-success">{{ $category->products->where('is_available', true)->count() }}</div>
                        <div class="text-muted" style="font-size:11px;text-transform:uppercase;">Active</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Meta -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-info-circle me-2 text-muted"></i>Information</h6></div>
            <div class="card-body p-0">
                <table class="table table-sm mb-0" style="font-size:13px;">
                    <tr><td class="text-muted ps-3">Slug</td><td><code>{{ $category->slug }}</code></td></tr>
                    <tr><td class="text-muted ps-3">Sort</td><td>#{{ $category->sort_order }}</td></tr>
                    <tr><td class="text-muted ps-3">Created</td><td>{{ $category->created_at->format('M j, Y') }}</td></tr>
                    <tr><td class="text-muted ps-3">Updated</td><td>{{ $category->updated_at->format('M j, Y') }}</td></tr>
                </table>
            </div>
        </div>

        <!-- Actions -->
        <div class="card">
            <div class="card-body d-grid gap-2">
                <a href="{{ route('admin.categories.edit', $category) }}" class="btn btn-primary">
                    <i class="bi bi-pencil me-1"></i>Edit Category
                </a>
                <a href="{{ route('admin.products.create', ['category_id' => $category->id]) }}" class="btn btn-tea">
                    <i class="bi bi-plus-lg me-1"></i>Add Product
                </a>
                @if($category->products->count() == 0)
                <button class="btn btn-outline-danger" onclick="deleteCategory()">
                    <i class="bi bi-trash3 me-1"></i>Delete Category
                </button>
                @else
                <button class="btn btn-outline-danger" disabled>
                    <i class="bi bi-trash3 me-1"></i>Cannot Delete (Has Products)
                </button>
                @endif
            </div>
        </div>
    </div>

    <!-- Products list -->
    <div class="col-lg-8">
        <!-- Analytics row -->
        <div class="row g-3 mb-3">
            @php $avgPrice = $category->products->where('is_available', true)->avg('price'); @endphp
            <div class="col-6 col-md-3">
                <div class="card text-center p-3">
                    <div class="fw-bold fs-4 text-info">{{ $category->products->count() }}</div>
                    <div class="text-muted" style="font-size:11px;">Total Products</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card text-center p-3">
                    <div class="fw-bold fs-4 text-success">{{ $category->products->where('is_available', true)->count() }}</div>
                    <div class="text-muted" style="font-size:11px;">Active</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card text-center p-3">
                    <div class="fw-bold fs-4 text-warning">{{ $category->products->where('is_featured', true)->count() }}</div>
                    <div class="text-muted" style="font-size:11px;">Featured</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card text-center p-3">
                    <div class="fw-bold fs-4 text-primary">{{ $avgPrice ? $currencySymbol.number_format($avgPrice, 2) : '�' }}</div>
                    <div class="text-muted" style="font-size:11px;">Avg Price</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0 fw-bold"><i class="bi bi-box2 me-2 text-muted"></i>Products in {{ $category->name }}</h6>
                <a href="{{ route('admin.products.create', ['category_id' => $category->id]) }}"
                   class="btn btn-sm btn-tea"><i class="bi bi-plus-lg me-1"></i>Add</a>
            </div>
            <div class="card-body p-0">
                @if($category->products->count() > 0)
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead><tr>
                            <th>Image</th><th>Name</th><th>Price</th><th>Status</th><th>Featured</th><th>Actions</th>
                        </tr></thead>
                        <tbody>
                            @foreach($category->products as $product)
                            <tr>
                                <td>
                                    @if($product->image)
                                        <img src="{{ $product->image_url }}" alt="{{ $product->name }}"
                                             class="rounded-2" style="width:44px;height:44px;object-fit:cover;">
                                    @else
                                        <div class="rounded-2 bg-light d-flex align-items-center justify-content-center"
                                             style="width:44px;height:44px;">
                                            <i class="bi bi-image text-muted"></i>
                                        </div>
                                    @endif
                                </td>
                                <td>
                                    <div class="fw-semibold" style="font-size:13px;">{{ $product->name }}</div>
                                    @if($product->description)
                                    <small class="text-muted">{{ Str::limit($product->description, 50) }}</small>
                                    @endif
                                </td>
                                <td><span class="fw-semibold text-success">{{ $product->formatted_price }}</span></td>
                                <td>
                                    @if($product->is_available)
                                        <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Active</span>
                                    @else
                                        <span class="badge badge-pill-secondary">Inactive</span>
                                    @endif
                                </td>
                                <td>
                                    @if($product->is_featured)
                                        <span class="badge badge-pill-warning"><i class="bi bi-star-fill me-1"></i>Featured</span>
                                    @else
                                        <span class="text-muted">�</span>
                                    @endif
                                </td>
                                <td>
                                    <div class="d-flex gap-1">
                                        <a href="{{ route('admin.products.show', $product) }}" class="btn btn-sm btn-outline-secondary"><i class="bi bi-eye"></i></a>
                                        <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                @else
                <div class="empty-state">
                    <i class="bi bi-box-seam empty-icon"></i>
                    <h5>No products yet</h5>
                    <p>Add the first product to this category.</p>
                    <a href="{{ route('admin.products.create', ['category_id' => $category->id]) }}"
                       class="btn btn-tea"><i class="bi bi-plus-lg me-1"></i>Add Product</a>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="bi bi-exclamation-triangle text-danger me-2"></i>Delete Category</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                Delete <strong>{{ $category->name }}</strong>? This cannot be undone.
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" action="{{ route('admin.categories.destroy', $category) }}" style="display:inline;">
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
function deleteCategory() {
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}
</script>
@endpush
