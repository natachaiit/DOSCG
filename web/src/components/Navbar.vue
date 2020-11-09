<template>
  <div class="navbar-light bg-light">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Web Test</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"
              >FindXYZ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/findbc" class="nav-link" active-class="active"
              >FindBC
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/gotoeental" class="nav-link" active-class="active"
              >The Best Way go to Central World
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
