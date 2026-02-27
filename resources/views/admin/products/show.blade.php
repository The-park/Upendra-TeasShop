@extends('layouts.admin')
@section('title', $product->name)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li>
<li class="breadcrumb-item active">{{ $product->name }}</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-box2 me-2 text-success"></i>{{ $product->name }}</h1>
        <p class="page-subtitle">Product details &amp; analytics</p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-primary"><i class="bi bi-pencil me-1"></i>Edit</a>
        <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i>Back</a>
    </div>
</div>

<div class="row g-4">
    <!-- Left column -->
    <div class="col-lg-4">
        <div class="card mb-3">
            <div class="card-body text-center py-4">
                @if($product->image_path)
                    <img src="{{ $product->image_url }}" alt="{{ $product->name }}"
                         class="rounded-3 img-fluid mb-3" style="max-height:220px;object-fit:cover;">
                @else
                    <div class="mx-auto mb-3 rounded-3 d-flex align-items-center justify-content-center bg-light"
                         style="width:120px;height:120px;">
                        <i class="bi bi-image" style="font-size:40px;color:#aaa;"></i>
                    </div>
                @endif
                <h5 class="fw-bold mb-2">{{ $product->name }}</h5>
                <div class="d-flex justify-content-center gap-2 mb-3">
                    @if($product->is_available)
                        <span class="badge badge-pill-success"><i class="bi bi-check-circle me-1"></i>Active</span>
                    @else
                        <span class="badge badge-pill-secondary">Inactive</span>
                    @endif
                    @if($product->is_featured)
                        <span class="badge badge-pill-warning"><i class="bi bi-star-fill me-1"></i>Featured</span>
                    @endif
                </div>
                <div class="row text-center g-0 border-top pt-3">
                    <div class="col-6 border-end">
                        <div class="fw-bold fs-5 text-success">{{ $product->formatted_price }}</div>
                        <div class="text-muted" style="font-size:11px;">Sell Price</div>
                    </div>
                    <div class="col-6">
                        @if($product->cost_price)
                            <div class="fw-bold fs-5 text-info">{{ $currencySymbol }}{{ number_format($product->cost_price, 2) }}</div>
                            <div class="text-muted" style="font-size:11px;">Cost Price</div>
                        @else
                            <div class="fw-bold fs-5 text-muted">�</div>
                            <div class="text-muted" style="font-size:11px;">Cost Price</div>
                        @endif
                    </div>
                </div>
                @if($product->cost_price)
                <div class="mt-3 rounded-2 p-3" style="background:linear-gradient(135deg,#e8f5e2,#d4edda);">
                    <div class="fw-bold text-success fs-5">{{ $currencySymbol }}{{ $product->profit_amount }}</div>
                    <div class="text-success" style="font-size:12px;">{{ $product->profit_percentage }}% profit margin</div>
                </div>
                @endif
            </div>
            <div class="card-footer d-grid gap-2">
                <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-primary"><i class="bi bi-pencil me-1"></i>Edit Product</a>
                <button class="btn btn-outline-danger" onclick="deleteProduct()"><i class="bi bi-trash3 me-1"></i>Delete</button>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-info-circle me-2 text-muted"></i>Meta</h6></div>
            <div class="card-body p-0">
                <table class="table table-sm mb-0" style="font-size:13px;">
                    <tr><td class="text-muted ps-3">Category</td>
                        <td><a href="{{ route('admin.categories.show', $product->category) }}" class="text-primary">{{ $product->category->name }}</a></td></tr>
                    <tr><td class="text-muted ps-3">Slug</td><td><code>{{ $product->slug }}</code></td></tr>
                    <tr><td class="text-muted ps-3">Created</td><td>{{ $product->created_at->format('M j, Y') }}</td></tr>
                    <tr><td class="text-muted ps-3">Updated</td><td>{{ $product->updated_at->format('M j, Y') }}</td></tr>
                </table>
            </div>
        </div>
    </div>

    <!-- Right column -->
    <div class="col-lg-8">
        <!-- Description -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-file-text me-2 text-muted"></i>Description</h6></div>
            <div class="card-body">
                @if($product->description)
                    <p class="mb-0" style="line-height:1.7;">{{ $product->description }}</p>
                @else
                    <p class="text-muted mb-0"><em>No description provided.</em></p>
                @endif
            </div>
        </div>

        <!-- Analytics placeholder -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-graph-up me-2 text-muted"></i>Sales Analytics</h6></div>
            <div class="card-body">
                <div class="row g-3 text-center">
                    <div class="col-md-3"><div class="card p-3"><div class="fs-4 fw-bold text-info">�</div><div class="text-muted" style="font-size:11px;">Total Orders</div></div></div>
                    <div class="col-md-3"><div class="card p-3"><div class="fs-4 fw-bold text-success">�</div><div class="text-muted" style="font-size:11px;">Revenue</div></div></div>
                    <div class="col-md-3"><div class="card p-3"><div class="fs-4 fw-bold text-warning">�</div><div class="text-muted" style="font-size:11px;">This Month</div></div></div>
                    <div class="col-md-3"><div class="card p-3"><div class="fs-4 fw-bold text-primary">�</div><div class="text-muted" style="font-size:11px;">Avg. Qty</div></div></div>
                </div>
                <p class="text-muted mt-3 mb-0" style="font-size:13px;"><em>Analytics available once orders are processed.</em></p>
            </div>
        </div>

        <!-- Related Products -->
        @if($product->category->products->where('id', '!=', $product->id)->count() > 0)
        <div class="card">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-grid me-2 text-muted"></i>Related in {{ $product->category->name }}</h6></div>
            <div class="card-body">
                <div class="row g-3">
                    @foreach($product->category->products->where('id', '!=', $product->id)->take(4) as $rel)
                    <div class="col-sm-6 col-md-3">
                        <a href="{{ route('admin.products.show', $rel) }}" class="text-decoration-none">
                            <div class="card h-100 border">
                                @if($rel->image_path)
                                    <img src="{{ $rel->image_url }}" class="card-img-top rounded-top-2"
                                         style="height:100px;object-fit:cover;" alt="{{ $rel->name }}">
                                @else
                                    <div class="bg-light d-flex align-items-center justify-content-center rounded-top-2"
                                         style="height:100px;"><i class="bi bi-image text-muted fs-3"></i></div>
                                @endif
                                <div class="card-body p-2">
                                    <div class="fw-semibold text-dark" style="font-size:12px;">{{ Str::limit($rel->name,22) }}</div>
                                    <div class="text-success fw-bold" style="font-size:12px;">{{ $rel->formatted_price }}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        @endif
    </div>
</div>

<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><i class="bi bi-exclamation-triangle text-danger me-2"></i>Delete Product</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">Delete <strong>{{ $product->name }}</strong>? This cannot be undone.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" action="{{ route('admin.products.destroy', $product) }}" style="display:inline;">
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
function deleteProduct() { new bootstrap.Modal(document.getElementById('deleteModal')).show(); }
</script>
@endpush
