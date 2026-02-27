<form method="post" action="{{ route('password.update') }}">
    @csrf
    @method('put')

    <div class="mb-3">
        <label for="update_password_current_password" class="form-label fw-semibold">
            <i class="bi bi-key me-1 text-muted"></i>Current Password
        </label>
        <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-lock"></i></span>
            <input id="update_password_current_password" name="current_password" type="password"
                   class="form-control @if($errors->updatePassword->get('current_password')) is-invalid @endif"
                   autocomplete="current-password"
                   placeholder="Enter current password" />
            <button class="btn btn-outline-secondary" type="button" onclick="togglePw('update_password_current_password',this)">
                <i class="bi bi-eye"></i>
            </button>
            @foreach($errors->updatePassword->get('current_password') as $error)
                <div class="invalid-feedback">{{ $error }}</div>
            @endforeach
        </div>
    </div>

    <div class="mb-3">
        <label for="update_password_password" class="form-label fw-semibold">
            <i class="bi bi-shield-lock me-1 text-muted"></i>New Password
        </label>
        <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-lock-fill"></i></span>
            <input id="update_password_password" name="password" type="password"
                   class="form-control @if($errors->updatePassword->get('password')) is-invalid @endif"
                   autocomplete="new-password"
                   placeholder="Enter new password" />
            <button class="btn btn-outline-secondary" type="button" onclick="togglePw('update_password_password',this)">
                <i class="bi bi-eye"></i>
            </button>
            @foreach($errors->updatePassword->get('password') as $error)
                <div class="invalid-feedback">{{ $error }}</div>
            @endforeach
        </div>
    </div>

    <div class="mb-4">
        <label for="update_password_password_confirmation" class="form-label fw-semibold">
            <i class="bi bi-shield-check me-1 text-muted"></i>Confirm New Password
        </label>
        <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-lock-fill"></i></span>
            <input id="update_password_password_confirmation" name="password_confirmation" type="password"
                   class="form-control @if($errors->updatePassword->get('password_confirmation')) is-invalid @endif"
                   autocomplete="new-password"
                   placeholder="Repeat new password" />
            <button class="btn btn-outline-secondary" type="button" onclick="togglePw('update_password_password_confirmation',this)">
                <i class="bi bi-eye"></i>
            </button>
            @foreach($errors->updatePassword->get('password_confirmation') as $error)
                <div class="invalid-feedback">{{ $error }}</div>
            @endforeach
        </div>
    </div>

    <div class="d-flex align-items-center gap-3">
        <button type="submit" class="btn btn-primary px-4">
            <i class="bi bi-shield-fill-check me-2"></i>Update Password
        </button>
        @if (session('status') === 'password-updated')
            <span class="saved-flash text-success small fw-semibold">
                <i class="bi bi-check-circle-fill me-1"></i>Password updated!
            </span>
        @endif
    </div>
</form>

<script>
function togglePw(id, btn) {
    const input = document.getElementById(id);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.querySelector('i').className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
}
</script>
