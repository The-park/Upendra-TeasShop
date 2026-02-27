<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>429 — Too Many Requests</title>
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
            background: linear-gradient(135deg, #f3e5f5, #e1bee7);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 24px;
            font-size: 42px; color: #6a1b9a;
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
            font-size: 14px; color: #888; line-height: 1.6; margin-bottom: 24px;
        }
        .countdown-box {
            background: var(--tea-pale);
            border-radius: 12px; padding: 14px 20px;
            margin-bottom: 28px;
            font-size: 13px; color: var(--tea-dark); font-weight: 600;
        }
        .countdown-box span { font-size: 22px; font-family: 'Poppins',sans-serif; color: var(--tea-accent); }
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
    </style>
</head>
<body>
    <div class="error-card">
        <div class="error-icon-wrap">
            <i class="bi bi-speedometer"></i>
        </div>
        <div class="error-code">429</div>
        <div class="error-title">Too Many Requests</div>
        <p class="error-desc">
            You've made too many requests in a short period.<br>
            Please wait before trying again.
        </p>
        <div class="countdown-box">
            Retry in <span id="counter">60</span> seconds
        </div>
        <div class="btn-row">
            <button class="btn-primary-tea" id="retryBtn" onclick="location.reload()" disabled style="opacity:.5;cursor:not-allowed;">
                <i class="bi bi-arrow-clockwise"></i> Retry Now
            </button>
        </div>
    </div>
    <script>
        let s = 60;
        const counter = document.getElementById('counter');
        const btn = document.getElementById('retryBtn');
        const t = setInterval(() => {
            s--;
            counter.textContent = s;
            if (s <= 0) {
                clearInterval(t);
                counter.closest('.countdown-box').textContent = 'You can try again now.';
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        }, 1000);
    </script>
</body>
</html>
