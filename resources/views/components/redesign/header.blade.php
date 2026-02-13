<header class="ts-header">
  <div class="container">
    <div class="row">
      <div class="brand">
        <a href="{{ url('/') }}" aria-label="Home">TeaShop</a>
      </div>
      <nav aria-label="Main navigation">
        <a href="{{ url('/') }}">Home</a>
        <a href="{{ url('/menu') }}">Menu</a>
        @guest
          <a href="{{ route('login') }}">Login</a>
        @else
          <a href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display:none">@csrf</form>
        @endguest
      </nav>
    </div>
  </div>
</header>
