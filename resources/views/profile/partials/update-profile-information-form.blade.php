<form id="send-verification" method="post" action="{{ route('verification.send') }}">
    @csrf
</form>

<form method="post" action="{{ route('profile.update') }}">
    @csrf
    @method('patch')

    <div class="mb-3">
        <label for="name" class="form-label fw-semibold">
            <i class="bi bi-person me-1 text-muted"></i>Full Name
        </label>
        <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-type"></i></span>
            <input id="name" name="name" type="text"
                   class="form-control @error('name') is-invalid @enderror"
                   value="{{ old('name', $user->name) }}"
                   required autofocus autocomplete="name"
                   placeholder="Your full name" />
            @error('name')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
    </div>

    <div class="mb-4">
        <label for="email" class="form-label fw-semibold">
            <i class="bi bi-envelope me-1 text-muted"></i>Email Address
        </label>
        <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-at"></i></span>
            <input id="email" name="email" type="email"
                   class="form-control @error('email') is-invalid @enderror"
                   value="{{ old('email', $user->email) }}"
                   required autocomplete="username"
                   placeholder="you@example.com" />
            @error('email')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
            <div class="alert alert-warning mt-2 py-2 px-3 small">
                <i class="bi bi-exclamation-circle me-1"></i>
                {{ __('Your email address is unverified.') }}
                <button form="send-verification" class="btn btn-link btn-sm p-0 align-baseline">
                    {{ __('Re-send verification email') }}
                </button>
            </div>
            @if (session('status') === 'verification-link-sent')
                <div class="alert alert-success mt-2 py-2 px-3 small">
                    <i class="bi bi-check-circle me-1"></i>
                    {{ __('A new verification link has been sent to your email address.') }}
                </div>
            @endif
        @endif
    </div>

    <div class="d-flex align-items-center gap-3">
        <button type="submit" class="btn btn-success px-4">
            <i class="bi bi-check-lg me-2"></i>Save Changes
        </button>
        @if (session('status') === 'profile-updated')
            <span class="saved-flash text-success small fw-semibold">
                <i class="bi bi-check-circle-fill me-1"></i>Saved!
            </span>
        @endif
    </div>
</form>
