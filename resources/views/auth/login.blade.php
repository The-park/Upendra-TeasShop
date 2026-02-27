<x-guest-layout>

    <h2>Welcome back</h2>
    <p class="auth-subtitle">Sign in to manage your tea shop</p>

    <!-- Session Status -->
    @if(session('status'))
    <div class="auth-alert auth-alert-success">
        <i class="bi bi-check-circle-fill" style="font-size:16px;flex-shrink:0;"></i>
        <span>{{ session('status') }}</span>
    </div>
    @endif

    <!-- Validation Errors -->
    @if($errors->any())
    <div class="auth-alert auth-alert-danger">
        <i class="bi bi-exclamation-circle-fill" style="font-size:16px;flex-shrink:0;"></i>
        <span>{{ $errors->first() }}</span>
    </div>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email -->
        <div class="mb-4">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-icon-wrap">
                <i class="bi bi-envelope input-icon"></i>
                <input id="email" type="email" name="email"
                       class="form-control {{ $errors->has('email') ? 'is-invalid' : '' }}"
                       value="{{ old('email') }}"
                       required autofocus autocomplete="username"
                       placeholder="you@example.com">
            </div>
        </div>

        <!-- Password -->
        <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <div class="input-icon-wrap">
                <i class="bi bi-lock input-icon"></i>
                <input id="password" type="password" name="password"
                       class="form-control {{ $errors->has('password') ? 'is-invalid' : '' }}"
                       required autocomplete="current-password"
                       placeholder="••••••••">
                <button type="button" class="toggle-password" onclick="togglePwd(this)" tabindex="-1">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
        </div>

        <!-- Remember + Forgot -->
        <div class="d-flex align-items-center justify-content-between mb-4" style="font-size:13px;">
            <label class="d-flex align-items-center gap-2 mb-0" style="cursor:pointer;">
                <input type="checkbox" name="remember" id="remember_me"
                       style="width:15px;height:15px;accent-color:var(--tea-accent);">
                <span style="color:#555;">Remember me</span>
            </label>
            @if(Route::has('password.request'))
            <a href="{{ route('password.request') }}"
               style="color:var(--tea-accent);text-decoration:none;font-weight:500;">
                Forgot password?
            </a>
            @endif
        </div>

        <!-- Submit -->
        <button type="submit" class="btn-auth">
            <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
        </button>
    </form>

</x-guest-layout>
