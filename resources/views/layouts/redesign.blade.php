<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'TeaShop') }}</title>
    <link rel="stylesheet" href="{{ asset('css/redesign.css') }}">
</head>
<body>
    @include('components.redesign.header')

    <main class="container" role="main" style="padding:24px 0">
        @yield('content')
    </main>

    @include('components.redesign.footer')

    {{-- Keep existing scripts; app.js/vite build can be included when ready --}}
    @stack('scripts')
</body>
</html>
