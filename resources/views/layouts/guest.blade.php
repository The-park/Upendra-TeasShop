<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'TeaShop') }} — @yield('title', 'Login')</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        :root {
            --tea-dark:   #1a3a1a;
            --tea-mid:    #2d5a27;
            --tea-accent: #4a8c3f;
            --tea-light:  #6db560;
            --tea-pale:   #e8f5e2;
            --tea-gold:   #c8860a;
        }
        *, *::before, *::after { box-sizing: border-box; }
        html, body {
            height: 100%;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--tea-dark) 0%, var(--tea-mid) 50%, var(--tea-accent) 100%);
            margin: 0;
        }
        /* Subtle animated background pattern */
        body::before {
            content: '';
            position: fixed; inset: 0;
            background-image:
                radial-gradient(circle at 20% 20%, rgba(255,255,255,.04) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,.03) 0%, transparent 50%);
            pointer-events: none;
        }
        .auth-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 16px;
        }
        .auth-card {
            width: 100%;
            max-width: 440px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 24px 64px rgba(0,0,0,.35);
            overflow: hidden;
        }
        .auth-card-header {
            background: linear-gradient(135deg, var(--tea-dark), var(--tea-mid));
            padding: 36px 40px 28px;
            text-align: center;
            position: relative;
        }
        .auth-card-header .brand-icon {
            width: 64px; height: 64px;
            background: rgba(255,255,255,.15);
            border-radius: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: #fff;
            margin-bottom: 14px;
            box-shadow: 0 4px 16px rgba(0,0,0,.2);
        }
        .auth-card-header .brand-name {
            font-family: 'Poppins', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            margin: 0 0 4px;
            line-height: 1.1;
        }
        .auth-card-header .brand-sub {
            font-size: 12px;
            color: rgba(255,255,255,.55);
            letter-spacing: .8px;
            text-transform: uppercase;
            margin: 0;
        }
        .auth-card-body { padding: 36px 40px 40px; }
        .auth-card-body h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: var(--tea-dark);
            margin: 0 0 6px;
        }
        .auth-card-body .auth-subtitle {
            font-size: 13px;
            color: #888;
            margin-bottom: 28px;
        }
        .form-label {
            font-size: 13px;
            font-weight: 600;
            color: #444;
            margin-bottom: 6px;
        }
        .form-control {
            border-radius: 10px;
            border: 1.5px solid #d0dbd0;
            font-size: 14px;
            padding: 10px 14px;
            transition: border-color .2s, box-shadow .2s;
            font-family: 'Inter', sans-serif;
        }
        .form-control:focus {
            border-color: var(--tea-accent);
            box-shadow: 0 0 0 3px rgba(74,140,63,.15);
            outline: none;
        }
        .input-icon-wrap { position: relative; }
        .input-icon-wrap .input-icon {
            position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
            color: #aaa; font-size: 16px; pointer-events: none;
        }
        .input-icon-wrap .form-control { padding-left: 40px; }
        .input-icon-wrap .toggle-password {
            position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
            background: none; border: none; color: #aaa; cursor: pointer;
            font-size: 16px; padding: 0; line-height: 1;
        }
        .input-icon-wrap .toggle-password:hover { color: var(--tea-accent); }
        .invalid-feedback { font-size: 12px; color: #dc3545; margin-top: 5px; display: block; }
        .form-text { font-size: 12px; color: #999; margin-top: 5px; }
        .btn-auth {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, var(--tea-mid), var(--tea-accent));
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            letter-spacing: .3px;
            cursor: pointer;
            transition: opacity .2s, transform .1s;
            box-shadow: 0 4px 14px rgba(45,90,39,.35);
        }
        .btn-auth:hover { opacity: .92; transform: translateY(-1px); }
        .btn-auth:active { transform: translateY(0); }
        .auth-divider {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 22px 0;
            color: #ccc;
            font-size: 12px;
        }
        .auth-divider::before, .auth-divider::after {
            content: ''; flex: 1; height: 1px; background: #e8e8e8;
        }
        .auth-footer {
            text-align: center;
            padding: 18px 40px 24px;
            border-top: 1px solid #f0f0f0;
            font-size: 12px;
            color: #aaa;
        }
        /* Alert */
        .auth-alert {
            border-radius: 10px;
            font-size: 13px;
            padding: 12px 16px;
            margin-bottom: 20px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        .auth-alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .auth-alert-danger  { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="auth-wrapper">
        <div class="auth-card">
            <div class="auth-card-header">
                <div class="brand-icon"><i class="bi bi-cup-hot-fill"></i></div>
                <p class="brand-name">{{ setting('shop_name', 'TeaShop Delight') }}</p>
                <p class="brand-sub">Admin Panel</p>
            </div>
            <div class="auth-card-body">
                {{ $slot }}
            </div>
            <div class="auth-footer">
                &copy; {{ date('Y') }} {{ setting('shop_name', 'TeaShop Delight') }}. All rights reserved.
            </div>
        </div>
    </div>
    <script>
    // Password toggle helper used by login page
    function togglePwd(btn) {
        const input = btn.closest('.input-icon-wrap').querySelector('input');
        const icon  = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'bi bi-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'bi bi-eye';
        }
    }
    </script>
</body>
</html>
