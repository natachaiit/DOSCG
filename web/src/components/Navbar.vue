<template>
  <div class="navbar-light bg-light">
    <nav class="navbar container navbar-expand-lg navbar-light bg-light">
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
      <div class="position-relative showalarm">
        <img src="@/assets/notification.png" height="24" />
        <span
          v-if="datacount"
          class="notification-count d-flex justify-content-center align-items-center"
          >6</span
        >
      </div>
    </nav>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Navbar",
  data() {
    return {
      socket: io('http://localhost:3000/'),
      datacount: 0,
    };
  },
  methods() {
    this.socket.on("usersUpdate", (data) => {
      console.log(data);
    });
  },
};
</script>

<style>
.notification-count {
  position: absolute;
  z-index: 1;
  top: -6px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4927;
  color: #fff;
}
@media screen and (max-width: 800px) {
  .showalarm {
    display: none;
  }
}
</style>