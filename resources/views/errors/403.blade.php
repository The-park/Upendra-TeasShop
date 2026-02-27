<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 — Unauthorized Access</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <style>
        :root {
            --tea-dark:   #1a3a1a;
            --tea-mid:    #2d5a27;
            --tea-accent: #4a8c3f;
            --tea-pale:   #e8f5e2;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--tea-dark) 0%, var(--tea-mid) 60%, #3a7a30 100%);
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
        }
        .error-card {
            background: #fff;
            border-radius: 24px;
            padding: 48px 40px 40px;
            max-width: 480px;
            width: 100%;
            text-align: center;
            box-shadow: 0 30px 80px rgba(0,0,0,.4);
            animation: slideUp .4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .error-icon-wrap {
            width: 90px; height: 90px;
            border-radius: 24px;
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 24px;
            font-size: 42px; color: #e65100;
        }
        .error-code {
            font-family: 'Poppins', sans-serif;
            font-size: 72px; font-weight: 800;
            line-height: 1;
            background: linear-gradient(135deg, var(--tea-dark), var(--tea-accent));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }
        .error-title {
            font-family: 'Poppins', sans-serif;
            font-size: 20px; font-weight: 700;
            color: #1a2e1a; margin-bottom: 12px;
        }
        .error-desc {
            font-size: 14px; color: #888; line-height: 1.6; margin-bottom: 32px;
        }
        .btn-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-primary-tea {
            display: inline-flex; align-items: center; gap: 8px;
            background: linear-gradient(135deg, var(--tea-mid), var(--tea-accent));
            color: #fff; text-decoration: none;
            padding: 11px 24px; border-radius: 10px;
            font-size: 14px; font-weight: 600;
            border: none; cursor: pointer;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 4px 14px rgba(45,90,39,.35);
            transition: opacity .2s;
        }
        .btn-primary-tea:hover { opacity: .88; color: #fff; }
        .btn-outline-tea {
            display: inline-flex; align-items: center; gap: 8px;
            background: transparent;
            color: var(--tea-accent); text-decoration: none;
            padding: 11px 24px; border-radius: 10px;
            font-size: 14px; font-weight: 600;
            border: 1.5px solid var(--tea-accent); cursor: pointer;
            font-family: 'Inter', sans-serif;
            transition: all .2s;
        }
        .btn-outline-tea:hover { background: var(--tea-pale); color: var(--tea-accent); }
        .divider { margin: 28px 0; border: none; border-top: 1px solid #f0f0f0; }
        .help-text { font-size: 12px; color: #bbb; }
        .help-text a { color: var(--tea-accent); text-decoration: none; }
        .help-text a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="error-card">
        <div class="error-icon-wrap">
            <i class="bi bi-shield-lock-fill"></i>
        </div>
        <div class="error-code">403</div>
        <div class="error-title">Unauthorized Access</div>
        <p class="error-desc">
            You don't have permission to view this page.<br>
            This incident may be logged. Please contact your administrator if you believe this is a mistake.
        </p>
        <div class="btn-row">
            {{-- Logout form: clicking "Go Back" ends the session and redirects to login --}}
            <form method="POST" action="{{ route('logout') }}" style="display:inline;">
                @csrf
                <button type="submit" class="btn-primary-tea">
                    <i class="bi bi-box-arrow-left"></i> Back to Login
                </button>
            </form>
            @if(auth()->check())
            <a href="{{ url()->previous() !== url()->current() ? url()->previous() : route('login') }}" class="btn-outline-tea">
                <i class="bi bi-arrow-left"></i> Previous Page
            </a>
            @endif
        </div>
        <hr class="divider">
        <p class="help-text">
            If you need access, contact
            <a href="mailto:admin@teashop.com">admin@teashop.com</a>
        </p>
    </div>
</body>
</html>
