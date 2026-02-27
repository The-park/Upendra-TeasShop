@extends('layouts.admin')
@section('title', 'Edit ' . $product->name)
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li>
<li class="breadcrumb-item"><a href="{{ route('admin.products.show', $product) }}">{{ $product->name }}</a></li>
<li class="breadcrumb-item active">Edit</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-pencil-square me-2 text-primary"></i>Edit Product</h1>
        <p class="page-subtitle">Updating: <strong>{{ $product->name }}</strong></p>
    </div>
    <div class="d-flex gap-2">
        <a href="{{ route('admin.products.show', $product) }}" class="btn btn-outline-secondary"><i class="bi bi-eye me-1"></i>View</a>
        <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i>Back</a>
    </div>
</div>

<form method="POST" action="{{ route('admin.products.update', $product) }}" enctype="multipart/form-data">
@csrf @method('PUT')
<div class="row g-4">
    <div class="col-lg-8">
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-info-circle me-2 text-muted"></i>Basic Information</h6></div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="name" class="form-label">Product Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('name') is-invalid @enderror"
                           id="name" name="name" value="{{ old('name', $product->name) }}" required maxlength="255">
                    @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="4" maxlength="1000">{{ old('description', $product->description) }}</textarea>
                </div>
                <div class="mb-3">
                    <label for="category_id" class="form-label">Category <span class="text-danger">*</span></label>
                    <select class="form-select @error('category_id') is-invalid @enderror" id="category_id" name="category_id" required>
                        <option value="">� Select �</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                        @endforeach
                    </select>
                    @error('category_id')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-currency-dollar me-2 text-muted"></i>Pricing</h6></div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="price" class="form-label">Selling Price <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <span class="input-group-text">{{ $currencySymbol }}</span>
                            <input type="number" class="form-control" id="price" name="price"
                                   value="{{ old('price', $product->price) }}" required min="0" step="0.01">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="cost_price" class="form-label">Cost Price</label>
                        <div class="input-group">
                            <span class="input-group-text">{{ $currencySymbol }}</span>
                            <input type="number" class="form-control" id="cost_price" name="cost_price"
                                   value="{{ old('cost_price', $product->cost_price) }}" min="0" step="0.01">
                        </div>
                    </div>
                </div>
                <div class="rounded-2 p-3 mt-3 border" id="profit-box" style="{{ $product->cost_price ? '' : 'display:none;' }}background:#f7fbf7;">
                    <div class="fw-semibold" style="font-size:13px;">Profit Estimate</div>
                    <div class="d-flex gap-4 mt-1">
                        <div><span class="text-muted" style="font-size:12px;">Amount</span>
                             <div class="fw-bold text-success" id="profit-amount">{{ $product->cost_price ? $currencySymbol.$product->profit_amount : '�' }}</div></div>
                        <div><span class="text-muted" style="font-size:12px;">Margin</span>
                             <div class="fw-bold text-success" id="profit-pct">{{ $product->cost_price ? $product->profit_percentage.'%' : '�' }}</div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <!-- Image -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-image me-2 text-muted"></i>Product Image</h6></div>
            <div class="card-body text-center">
                @if($product->image_path)
                <div id="image-preview-container">
                    <img id="image-preview" src="{{ $product->image_url }}" alt="{{ $product->name }}"
                         class="rounded-3 img-fluid mb-3" style="max-height:180px;object-fit:cover;">
                    <br>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImage()">
                        <i class="bi bi-x-circle me-1"></i>Remove
                    </button>
                </div>
                <div id="image-upload-area" style="display:none;">
                @else
                <div id="image-preview-container" style="display:none;">
                    <img id="image-preview" src="" alt="Preview" class="rounded-3 img-fluid mb-3" style="max-height:180px;object-fit:cover;">
                    <br><button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImage()"><i class="bi bi-x-circle me-1"></i>Remove</button>
                </div>
                <div id="image-upload-area">
                @endif
                    <label for="image" class="d-block rounded-3 border-2 border-dashed p-4" 
                           style="cursor:pointer;border:2px dashed #ccc;background:#fafafa;">
                        <i class="bi bi-cloud-arrow-up fs-2 text-muted d-block mb-2"></i>
                        <span class="text-muted" style="font-size:13px;">{{ $product->image_path ? 'Replace image' : 'Click to upload' }}</span>
                    </label>
                    <input type="file" class="d-none" id="image" name="image" accept="image/*" onchange="previewImage(this)">
                </div>
                <div class="form-text mt-2">JPEG / PNG / GIF � max 2 MB</div>
            </div>
        </div>

        <!-- Settings -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-toggles me-2 text-muted"></i>Settings</h6></div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div><div class="fw-semibold" style="font-size:14px;">Active</div>
                         <div class="text-muted" style="font-size:12px;">Visible to customers</div></div>
                    <div class="form-check form-switch mb-0">
                        <input class="form-check-input" type="checkbox" id="is_available"
                               name="is_available" value="1" {{ old('is_available', $product->is_available) ? 'checked' : '' }}>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center py-2">
                    <div><div class="fw-semibold" style="font-size:14px;"><i class="bi bi-star-fill text-warning me-1"></i>Featured</div>
                         <div class="text-muted" style="font-size:12px;">Highlight on homepage</div></div>
                    <div class="form-check form-switch mb-0">
                        <input class="form-check-input" type="checkbox" id="is_featured"
                               name="is_featured" value="1" {{ old('is_featured', $product->is_featured) ? 'checked' : '' }}>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg me-1"></i>Update Product</button>
            <a href="{{ route('admin.products.show', $product) }}" class="btn btn-outline-secondary">Cancel</a>
        </div>
    </div>
</div>
</form>
@endsection
@push('scripts')
<script>
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById('image-preview').src = e.target.result;
            document.getElementById('image-preview-container').style.display = 'block';
            document.getElementById('image-upload-area').style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function removeImage() {
    document.getElementById('image').value = '';
    document.getElementById('image-preview-container').style.display = 'none';
    document.getElementById('image-upload-area').style.display = 'block';
}
function calcProfit() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const cost  = parseFloat(document.getElementById('cost_price').value) || 0;
    const box   = document.getElementById('profit-box');
    if (price > 0 && cost > 0) {
        const profit = price - cost;
        const pct = (profit / price * 100).toFixed(1);
        document.getElementById('profit-amount').textContent = (profit >= 0 ? '+$' : '-$') + Math.abs(profit).toFixed(2);
        document.getElementById('profit-pct').textContent = pct + '%';
        box.style.display = 'block';
    } else { box.style.display = 'none'; }
}
document.getElementById('price').addEventListener('input', calcProfit);
document.getElementById('cost_price').addEventListener('input', calcProfit);
</script>
@endpush
