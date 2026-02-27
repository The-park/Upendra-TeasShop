<div class="alert alert-danger border-0 d-flex align-items-start gap-3 mb-4"
     style="background:#fff5f5;border-left:4px solid #dc3545!important;">
    <i class="bi bi-exclamation-octagon-fill text-danger fs-4 flex-shrink-0 mt-1"></i>
    <div>
        <p class="fw-semibold mb-1 text-danger">This action cannot be undone</p>
        <p class="mb-0 small text-muted">
            Once your account is deleted, all of its resources and data will be permanently removed.
            Please make sure you have backed up any data you wish to retain.
        </p>
    </div>
</div>

<button type="button" class="btn btn-danger px-4"
        data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
    <i class="bi bi-trash3-fill me-2"></i>Delete My Account
</button>

{{-- Delete Confirmation Modal --}}
<div class="modal fade" id="confirmDeleteModal" tabindex="-1"
     @if($errors->userDeletion->isNotEmpty()) data-show="true" @endif>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header border-0" style="background:linear-gradient(135deg,#c0392b,#e74c3c);">
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-trash3-fill text-white fs-5"></i>
                    <h5 class="modal-title text-white fw-bold mb-0">Delete Account</h5>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body p-4">
                <p class="text-muted mb-4">
                    This will permanently delete your account and all associated data.
                    Please enter your password to confirm.
                </p>

                <form method="post" action="{{ route('profile.destroy') }}" id="deleteAccountForm">
                    @csrf
                    @method('delete')

                    <div class="mb-3">
                        <label for="delete_password" class="form-label fw-semibold">
                            <i class="bi bi-lock me-1"></i>Your Password
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light"><i class="bi bi-key"></i></span>
                            <input id="delete_password" name="password" type="password"
                                   class="form-control @if($errors->userDeletion->get('password')) is-invalid @endif"
                                   placeholder="Enter your password to confirm" autofocus />
                            @foreach($errors->userDeletion->get('password') as $error)
                                <div class="invalid-feedback">{{ $error }}</div>
                            @endforeach
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" class="btn btn-outline-secondary px-4"
                                data-bs-dismiss="modal">
                            <i class="bi bi-x-lg me-1"></i>Cancel
                        </button>
                        <button type="submit" class="btn btn-danger px-4">
                            <i class="bi bi-trash3-fill me-2"></i>Yes, Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const deleteModal = document.getElementById('confirmDeleteModal');
    if (deleteModal && deleteModal.dataset.show === 'true') {
        bootstrap.Modal.getOrCreateInstance(deleteModal).show();
    }
});
</script>
@endpush
