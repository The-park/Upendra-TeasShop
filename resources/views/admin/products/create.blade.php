@extends('layouts.admin')
@section('title', 'New Product')
@section('breadcrumb')
<li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li>
<li class="breadcrumb-item active">New</li>
@endsection
@section('content')
<div class="page-header-bar">
    <div class="page-title-group">
        <h1 class="page-title"><i class="bi bi-box2 me-2 text-success"></i>New Product</h1>
        <p class="page-subtitle">Add a new item to your tea menu</p>
    </div>
    <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Back
    </a>
</div>

<form method="POST" action="{{ route('admin.products.store') }}" enctype="multipart/form-data">
@csrf
<div class="row g-4">
    <!-- Main form -->
    <div class="col-lg-8">
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-info-circle me-2 text-muted"></i>Basic Information</h6></div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="name" class="form-label">Product Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('name') is-invalid @enderror"
                           id="name" name="name" value="{{ old('name') }}" required maxlength="255"
                           placeholder="e.g. Matcha Latte, Earl Grey�">
                    @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description"
                              rows="4" maxlength="1000"
                              placeholder="Describe the product for customers�">{{ old('description') }}</textarea>
                    <div class="form-text">Max 1000 characters.</div>
                </div>
                <div class="mb-3">
                    <label for="category_id" class="form-label">Category <span class="text-danger">*</span></label>
                    <select class="form-select @error('category_id') is-invalid @enderror" id="category_id" name="category_id" required>
                        <option value="">� Select Category �</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', request('category_id')) == $category->id ? 'selected' : '' }}>
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
                            <input type="number" class="form-control @error('price') is-invalid @enderror"
                                   id="price" name="price" value="{{ old('price') }}"
                                   required min="0" step="0.01" placeholder="0.00">
                            @error('price')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="cost_price" class="form-label">Cost Price <small class="text-muted">(optional)</small></label>
                        <div class="input-group">
                            <span class="input-group-text">{{ $currencySymbol }}</span>
                            <input type="number" class="form-control" id="cost_price" name="cost_price"
                                   value="{{ old('cost_price') }}" min="0" step="0.01" placeholder="0.00">
                        </div>
                        <div class="form-text">Used for profit margin calculation.</div>
                    </div>
                </div>
                <!-- Profit indicator -->
                <div class="rounded-2 p-3 mt-3 border" id="profit-box" style="display:none;background:#f7fbf7;">
                    <div class="fw-semibold" style="font-size:13px;">Profit Estimate</div>
                    <div class="d-flex gap-4 mt-1">
                        <div>
                            <span class="text-muted" style="font-size:12px;">Amount</span>
                            <div class="fw-bold text-success" id="profit-amount">�</div>
                        </div>
                        <div>
                            <span class="text-muted" style="font-size:12px;">Margin</span>
                            <div class="fw-bold text-success" id="profit-pct">�</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
        <!-- Image Upload -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-image me-2 text-muted"></i>Product Image</h6></div>
            <div class="card-body text-center">
                <div id="image-preview-container" style="display:none;">
                    <img id="image-preview" src="" alt="Preview"
                         class="rounded-3 img-fluid mb-3" style="max-height:180px;object-fit:cover;">
                    <br>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImage()">
                        <i class="bi bi-x-circle me-1"></i>Remove
                    </button>
                </div>
                <div id="image-upload-area">
                    <label for="image" class="d-block rounded-3 border-2 border-dashed p-4" 
                           style="cursor:pointer;border:2px dashed #ccc;background:#fafafa;">
                        <i class="bi bi-cloud-arrow-up fs-2 text-muted d-block mb-2"></i>
                        <span class="text-muted" style="font-size:13px;">Click to upload image</span>
                    </label>
                    <input type="file" class="d-none" id="image" name="image"
                           accept="image/*" onchange="previewImage(this)">
                </div>
                <div class="form-text mt-2">JPEG / PNG / GIF � max 2 MB</div>
            </div>
        </div>

        <!-- Status -->
        <div class="card mb-3">
            <div class="card-header"><h6 class="mb-0 fw-bold"><i class="bi bi-toggles me-2 text-muted"></i>Settings</h6></div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                        <div class="fw-semibold" style="font-size:14px;">Active</div>
                        <div class="text-muted" style="font-size:12px;">Visible to customers</div>
                    </div>
                    <div class="form-check form-switch mb-0">
                        <input class="form-check-input" type="checkbox" id="is_available"
                               name="is_available" value="1" {{ old('is_available','1') ? 'checked' : '' }}>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center py-2">
                    <div>
                        <div class="fw-semibold" style="font-size:14px;"><i class="bi bi-star-fill text-warning me-1"></i>Featured</div>
                        <div class="text-muted" style="font-size:12px;">Highlight on homepage</div>
                    </div>
                    <div class="form-check form-switch mb-0">
                        <input class="form-check-input" type="checkbox" id="is_featured"
                               name="is_featured" value="1" {{ old('is_featured') ? 'checked' : '' }}>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-tea">
                <i class="bi bi-check-lg me-1"></i>Save Product
            </button>
            <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary">Cancel</a>
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
        box.style.background = profit >= 0 ? '#f7fbf7' : '#fff5f5';
        document.getElementById('profit-amount').className = 'fw-bold ' + (profit >= 0 ? 'text-success' : 'text-danger');
    } else { box.style.display = 'none'; }
}
document.getElementById('price').addEventListener('input', calcProfit);
document.getElementById('cost_price').addEventListener('input', calcProfit);
</script>
@endpush
