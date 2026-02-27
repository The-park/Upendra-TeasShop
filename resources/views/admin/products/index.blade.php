@extends('layouts.admin')
@section('title', 'Products')
@section('breadcrumb')
<li class="breadcrumb-item active">Products</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-box2 me-2 text-success"></i>Products</h1>
        <p class="page-subtitle">Manage your tea shop menu items</p>
    </div>
    <a href="{{ route('admin.products.create') }}" class="btn btn-tea">
        <i class="bi bi-plus-lg me-1"></i>New Product
    </a>
</div>

<!-- Filters Card -->
<div class="card mb-3">
    <div class="card-body py-3">
        <form method="GET" class="row g-2 align-items-end">
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Search</label>
                <div class="input-group input-group-sm">
                    <span class="input-group-text"><i class="bi bi-search"></i></span>
                    <input type="text" name="search" class="form-control" placeholder="Product name�" value="{{ request('search') }}">
                </div>
            </div>
            <div class="col-md-3">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Category</label>
                <select name="category_id" class="form-select form-select-sm">
                    <option value="">All Categories</option>
                    @foreach($categories as $cat)
                    <option value="{{ $cat->id }}" {{ request('category_id')==$cat->id?'selected':'' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-2">
                <label class="form-label mb-1" style="font-size:12px;font-weight:600;">Status</label>
                <select name="status" class="form-select form-select-sm">
                    <option value="">All</option>
                    <option value="active" {{ request('status')=='active'?'selected':'' }}>Active</option>
                    <option value="inactive" {{ request('status')=='inactive'?'selected':'' }}>Inactive</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-funnel me-1"></i>Filter</button>
                <a href="{{ route('admin.products.index') }}" class="btn btn-sm btn-outline-secondary ms-1"><i class="bi bi-x-lg"></i></a>
            </div>
        </form>
    </div>
</div>

<!-- Bulk Actions (hidden) -->
<div class="card mb-3 d-none" id="bulk-actions">
    <div class="card-body py-2 d-flex align-items-center gap-2">
        <span class="fw-semibold text-muted me-2"><span id="selected-count">0</span> selected</span>
        <button class="btn btn-sm btn-outline-success" onclick="bulkToggleStatus(true)">
            <i class="bi bi-eye me-1"></i>Activate
        </button>
        <button class="btn btn-sm btn-outline-secondary" onclick="bulkToggleStatus(false)">
            <i class="bi bi-eye-slash me-1"></i>Deactivate
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="bulkDelete()">
            <i class="bi bi-trash3 me-1"></i>Delete
        </button>
    </div>
</div>

<div class="card">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead>
                    <tr>
                        <th width="40">
                            <input type="checkbox" class="form-check-input" id="select-all">
                        </th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Profit</th>
                        <th>Status</th>
                        <th>Featured</th>
                        <th width="130">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($products as $product)
                    <tr>
                        <td><input type="checkbox" class="form-check-input product-checkbox" value="{{ $product->id }}"></td>
                        <td>
                            <div class="d-flex align-items-center gap-3">
                                @if($product->image_path)
                                    <img src="{{ $product->image_url }}" alt="{{ $product->name }}"
                                         class="rounded-2" style="width:44px;height:44px;object-fit:cover;flex-shrink:0;">
                                @else
                                    <div class="rounded-2 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                                         style="width:44px;height:44px;">
                                        <i class="bi bi-image text-muted"></i>
                                    </div>
                                @endif
                                <div>
                                    <div class="fw-semibold" style="font-size:14px;">{{ $product->name }}</div>
                                    @if($product->description)
                                    <small class="text-muted">{{ Str::limit($product->description, 50) }}</small>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td><span class="badge badge-pill-secondary">{{ $product->category->name }}</span></td>
                        <td><span class="fw-semibold text-success">{{ $product->formatted_price }}</span></td>
                        <td>
                            @if($product->cost_price)
                            <span class="text-success fw-semibold">{{ $currencySymbol }}{{ $product->profit_amount }}</span>
                            <small class="text-muted ms-1">({{ $product->profit_percentage }}%)</small>
                            @else
                            <span class="text-muted">�</span>
                            @endif
                        </td>
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
                                <a href="{{ route('admin.products.show', $product) }}" class="btn btn-sm btn-outline-secondary" title="View"><i class="bi bi-eye"></i></a>
                                <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-sm btn-outline-primary" title="Edit"><i class="bi bi-pencil"></i></a>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct({{ $product->id }})" title="Delete"><i class="bi bi-trash3"></i></button>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8">
                            <div class="empty-state">
                                <i class="bi bi-box-seam empty-icon"></i>
                                <h5>No products found</h5>
                                <p>Create your first product to start building the menu.</p>
                                <a href="{{ route('admin.products.create') }}" class="btn btn-tea"><i class="bi bi-plus-lg me-1"></i>Add Product</a>
                            </div>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        @if($products->hasPages())
        <div class="px-4 py-3 border-top">{{ $products->links() }}</div>
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
            <div class="modal-body">Are you sure? This action <strong>cannot be undone</strong>.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
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
$(document).ready(function() {
    $('#select-all').change(function() { $('.product-checkbox').prop('checked', this.checked); updateBulk(); });
    $(document).on('change', '.product-checkbox', updateBulk);
    function updateBulk() {
        const n = $('.product-checkbox:checked').length;
        $('#selected-count').text(n);
        n > 0 ? $('#bulk-actions').removeClass('d-none') : $('#bulk-actions').addClass('d-none');
    }
    window.deleteProduct = function(id) {
        $('#deleteForm').attr('action', `/admin/products/${id}`);
        new bootstrap.Modal(document.getElementById('deleteModal')).show();
    };
    window.bulkToggleStatus = function(status) {
        const ids = $('.product-checkbox:checked').map(function(){ return this.value; }).get();
        if (!ids.length) return;
        $.post('{{ route("admin.products.bulk-toggle") }}', { product_ids: ids, status: status, _token: '{{ csrf_token() }}' })
            .done(r => r.success ? location.reload() : alert(r.message));
    };
    window.bulkDelete = function() {
        const ids = $('.product-checkbox:checked').map(function(){ return this.value; }).get();
        if (!ids.length || !confirm('Delete selected products? Cannot be undone.')) return;
        $.post('{{ route("admin.products.bulk-delete") }}', { product_ids: ids, _token: '{{ csrf_token() }}' })
            .done(r => r.success ? location.reload() : alert(r.message));
    };
});
</script>
@endpush
