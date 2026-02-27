<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Page Not Found</title>
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
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 24px;
            font-size: 42px; color: #1565c0;
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
        .suggestion-box {
            background: var(--tea-pale);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 24px;
            text-align: left;
        }
        .suggestion-box p { font-size: 12px; font-weight: 600; color: var(--tea-dark); margin-bottom: 8px; }
        .suggestion-box a {
            display: flex; align-items: center; gap: 8px;
            font-size: 13px; color: var(--tea-accent); text-decoration: none;
            padding: 4px 0;
        }
        .suggestion-box a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="error-card">
        <div class="error-icon-wrap">
            <i class="bi bi-map"></i>
        </div>
        <div class="error-code">404</div>
        <div class="error-title">Page Not Found</div>
        <p class="error-desc">
            The page you're looking for doesn't exist or has been moved.<br>
            Check the URL or use one of the links below.
        </p>
        <div class="suggestion-box">
            <p><i class="bi bi-compass"></i> &nbsp;Quick Links</p>
            @auth
                @if(auth()->user()->role === 'admin' || auth()->user()->role === 'manager')
                <a href="{{ route('admin.dashboard') }}"><i class="bi bi-speedometer2"></i> Dashboard</a>
                <a href="{{ route('admin.orders.index') }}"><i class="bi bi-bag-check"></i> Orders</a>
                <a href="{{ route('admin.products.index') }}"><i class="bi bi-box-seam"></i> Products</a>
                @endif
            @else
                <a href="{{ route('menu') }}"><i class="bi bi-cup-hot-fill"></i> Browse Menu</a>
                <a href="{{ route('login') }}"><i class="bi bi-person-circle"></i> Admin Login</a>
            @endauth
        </div>
        <div class="btn-row">
            @auth
            <a href="{{ route('admin.dashboard') }}" class="btn-primary-tea">
                <i class="bi bi-house-fill"></i> Go to Dashboard
            </a>
            @else
            <a href="{{ route('menu') }}" class="btn-primary-tea">
                <i class="bi bi-cup-hot-fill"></i> View Menu
            </a>
            @endauth
            <a href="javascript:history.back()" class="btn-outline-tea">
                <i class="bi bi-arrow-left"></i> Go Back
            </a>
        </div>
    </div>
</body>
</html>
