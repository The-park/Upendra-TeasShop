@extends('layouts.admin')

@section('title', 'My Profile')

@section('content')

{{-- ── Hero Banner ────────────────────────────────────────────────────── --}}
<div class="rounded-4 mb-4 overflow-hidden position-relative"
     style="background: linear-gradient(135deg, #2d6a4f 0%, #40916c 50%, #52b788 100%); min-height:180px;">
    <div style="position:absolute;top:-60px;right:-60px;width:250px;height:250px;border-radius:50%;
                background:rgba(255,255,255,.07);pointer-events:none;"></div>
    <div style="position:absolute;bottom:-80px;left:-40px;width:300px;height:300px;border-radius:50%;
                background:rgba(255,255,255,.05);pointer-events:none;"></div>

    <div class="d-flex align-items-center gap-4 p-4 p-md-5 position-relative">
        <div class="flex-shrink-0">
            <div class="rounded-circle d-flex align-items-center justify-content-center shadow-lg fw-bold text-uppercase"
                 style="width:96px;height:96px;font-size:2.2rem;
                        background:rgba(255,255,255,.2);
                        border:4px solid rgba(255,255,255,.45);
                        color:#fff;letter-spacing:1px;">
                {{ mb_substr(Auth::user()->name, 0, 1) }}{{ mb_substr(explode(' ', trim(Auth::user()->name))[1] ?? '', 0, 1) }}
            </div>
        </div>

        <div class="text-white">
            <h2 class="fw-bold mb-1" style="font-size:1.6rem;">{{ Auth::user()->name }}</h2>
            <p class="mb-2 opacity-75" style="font-size:.95rem;">
                <i class="bi bi-envelope-fill me-1"></i>{{ Auth::user()->email }}
            </p>
            <span class="badge rounded-pill px-3 py-1"
                  style="background:rgba(255,255,255,.25);font-size:.78rem;letter-spacing:.5px;">
                <i class="bi bi-shield-fill-check me-1"></i>
                {{ ucfirst(Auth::user()->role ?? 'Administrator') }}
            </span>
            <span class="badge rounded-pill px-3 py-1 ms-2"
                  style="background:rgba(255,255,255,.18);font-size:.78rem;">
                <i class="bi bi-calendar3 me-1"></i>
                Member since {{ Auth::user()->created_at->format('M Y') }}
            </span>
        </div>
    </div>
</div>

{{-- ── Tab Navigation ──────────────────────────────────────────────────── --}}
<ul class="nav nav-pills mb-4 gap-2" id="profileTabs" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active px-4" id="info-tab" data-bs-toggle="tab" data-bs-target="#info-pane"
                type="button" role="tab">
            <i class="bi bi-person-fill me-2"></i>Profile Info
        </button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link px-4" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-pane"
                type="button" role="tab">
            <i class="bi bi-lock-fill me-2"></i>Change Password
        </button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link px-4 text-danger" id="danger-tab" data-bs-toggle="tab" data-bs-target="#danger-pane"
                type="button" role="tab">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>Danger Zone
        </button>
    </li>
</ul>

{{-- ── Tab Content ─────────────────────────────────────────────────────── --}}
<div class="tab-content" id="profileTabsContent">

    {{-- Tab 1: Profile Information --}}
    <div class="tab-pane fade show active" id="info-pane" role="tabpanel">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-header bg-transparent border-0 pt-4 pb-0 px-4">
                        <div class="d-flex align-items-center gap-3 mb-1">
                            <div class="rounded-3 d-flex align-items-center justify-content-center"
                                 style="width:42px;height:42px;background:linear-gradient(135deg,#2d6a4f,#52b788);">
                                <i class="bi bi-person-fill text-white fs-5"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-0">Profile Information</h5>
                                <small class="text-muted">Update your name and email address</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-4 pb-4 pt-3">
                        @include('profile.partials.update-profile-information-form')
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- Tab 2: Change Password --}}
    <div class="tab-pane fade" id="password-pane" role="tabpanel">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-header bg-transparent border-0 pt-4 pb-0 px-4">
                        <div class="d-flex align-items-center gap-3 mb-1">
                            <div class="rounded-3 d-flex align-items-center justify-content-center"
                                 style="width:42px;height:42px;background:linear-gradient(135deg,#1a6fc4,#48a8f8);">
                                <i class="bi bi-lock-fill text-white fs-5"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-0">Change Password</h5>
                                <small class="text-muted">Use a long, random password to stay secure</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-4 pb-4 pt-3">
                        @include('profile.partials.update-password-form')
                    </div>
                </div>

                <div class="card border-0 shadow-sm rounded-4 mt-3"
                     style="background:linear-gradient(135deg,#fff8f0,#fff3e0);">
                    <div class="card-body px-4 py-3">
                        <p class="fw-semibold mb-2" style="color:#e67e22;">
                            <i class="bi bi-shield-lock-fill me-2"></i>Password Tips
                        </p>
                        <ul class="list-unstyled mb-0 small text-muted">
                            <li class="mb-1"><i class="bi bi-check2 text-success me-2"></i>At least 8 characters long</li>
                            <li class="mb-1"><i class="bi bi-check2 text-success me-2"></i>Mix of uppercase &amp; lowercase letters</li>
                            <li class="mb-1"><i class="bi bi-check2 text-success me-2"></i>Include numbers and special characters</li>
                            <li><i class="bi bi-check2 text-success me-2"></i>Never reuse old passwords</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- Tab 3: Danger Zone --}}
    <div class="tab-pane fade" id="danger-pane" role="tabpanel">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-4" style="border-top:4px solid #dc3545!important;">
                    <div class="card-header bg-transparent border-0 pt-4 pb-0 px-4">
                        <div class="d-flex align-items-center gap-3 mb-1">
                            <div class="rounded-3 d-flex align-items-center justify-content-center"
                                 style="width:42px;height:42px;background:linear-gradient(135deg,#c0392b,#e74c3c);">
                                <i class="bi bi-exclamation-triangle-fill text-white fs-5"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-0 text-danger">Danger Zone</h5>
                                <small class="text-muted">Permanent, irreversible account actions</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-4 pb-4 pt-3">
                        @include('profile.partials.delete-user-form')
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    @if ($errors->updatePassword->isNotEmpty())
        bootstrap.Tab.getOrCreateInstance(document.getElementById('password-tab')).show();
    @elseif ($errors->userDeletion->isNotEmpty())
        bootstrap.Tab.getOrCreateInstance(document.getElementById('danger-tab')).show();
    @endif

    document.querySelectorAll('.saved-flash').forEach(function(el) {
        setTimeout(function() {
            el.style.transition = 'opacity .5s';
            el.style.opacity = '0';
            setTimeout(function() { el.remove(); }, 500);
        }, 2500);
    });
});
</script>
@endpush
