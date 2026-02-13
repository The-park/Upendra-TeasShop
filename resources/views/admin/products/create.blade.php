@extends('layouts.admin')

@section('title', 'Add New Product')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Add New Product</h4>
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('admin.products.index') }}">Products</a></li>
                <li class="breadcrumb-item active">Add New</li>
            </ol>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">Product Information</h4>
                
                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form method="POST" action="{{ route('admin.products.store') }}" enctype="multipart/form-data">
                    @csrf
                    
                    <div class="row">
                        <div class="col-md-8">
                            <!-- Basic Information -->
                            <div class="form-group">
                                <label for="name" class="control-label">Product Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="name" name="name" 
                                       value="{{ old('name') }}" required maxlength="255" 
                                       placeholder="Enter product name">
                            </div>

                            <div class="form-group">
                                <label for="description" class="control-label">Description</label>
                                <textarea class="form-control" id="description" name="description" 
                                          rows="4" maxlength="1000" 
                                          placeholder="Enter product description">{{ old('description') }}</textarea>
                                <small class="form-text text-muted">Maximum 1000 characters</small>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="price" class="control-label">Selling Price <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="number" class="form-control" id="price" name="price" 
                                                   value="{{ old('price') }}" required min="0" step="0.01"
                                                   placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="cost_price" class="control-label">Cost Price</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="number" class="form-control" id="cost_price" name="cost_price" 
                                                   value="{{ old('cost_price') }}" min="0" step="0.01"
                                                   placeholder="0.00">
                                        </div>
                                        <small class="form-text text-muted">Used for profit calculation</small>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="category_id" class="control-label">Category <span class="text-danger">*</span></label>
                                <select class="form-control" id="category_id" name="category_id" required>
                                    <option value="">Select Category</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                            {{ $category->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <!-- Image Upload -->
                            <div class="form-group">
                                <label for="image" class="control-label">Product Image</label>
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div id="image-preview-container" style="display: none;">
                                            <img id="image-preview" src="" alt="Preview" 
                                                 class="img-fluid rounded mb-3" style="max-height: 200px;">
                                            <br>
                                            <button type="button" class="btn btn-sm btn-danger" onclick="removeImage()">
                                                Remove Image
                                            </button>
                                        </div>
                                        <div id="image-upload-area">
                                            <i class="fas fa-image fa-2x text-muted mb-3"></i>
                                            <p class="text-muted mb-3">Click to select an image</p>
                                            <input type="file" class="form-control-file" id="image" name="image" 
                                                   accept="image/*" onchange="previewImage(this)">
                                        </div>
                                    </div>
                                </div>
                                <small class="form-text text-muted">
                                    Formats: JPEG, PNG, JPG, GIF. Max size: 2MB
                                </small>
                            </div>

                            <!-- Status Options -->
                            <div class="form-group">
                                <label class="control-label">Status & Options</label>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="is_available" 
                                           name="is_available" value="1" {{ old('is_available', '1') ? 'checked' : '' }}>
                                    <label class="custom-control-label" for="is_available">Active</label>
                                </div>
                                <small class="form-text text-muted">Active products are visible to customers</small>
                                
                                <div class="custom-control custom-switch mt-2">
                                    <input type="checkbox" class="custom-control-input" id="is_featured" 
                                           name="is_featured" value="1" {{ old('is_featured') ? 'checked' : '' }}>
                                    <label class="custom-control-label" for="is_featured">Featured</label>
                                </div>
                                <small class="form-text text-muted">Featured products appear on homepage</small>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="form-group mt-4">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Save Product
                        </button>
                        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary ml-2">
                            <i class="fas fa-arrow-left"></i> Back to Products
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
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

// Calculate profit when prices change
document.getElementById('price').addEventListener('input', calculateProfit);
document.getElementById('cost_price').addEventListener('input', calculateProfit);

function calculateProfit() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const cost = parseFloat(document.getElementById('cost_price').value) || 0;
    
    if (price > 0 && cost > 0) {
        const profit = price - cost;
        const margin = ((profit / price) * 100).toFixed(1);
        
        // You can add a profit display element if needed
        console.log(`Profit: $${profit.toFixed(2)} (${margin}%)`);
    }
}
</script>
@endpush