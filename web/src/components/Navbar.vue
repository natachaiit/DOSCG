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
          <li class="nav-item">
            <router-link to="/line" class="nav-link" active-class="active"
              >Line
            </router-link>
          </li>
        </ul>
      </div>
      <div class="position-relative showalarm" v-on:click="isActive = !isActive">
        <img src="@/assets/notification.png" height="24" />
        <span
          v-if="datacount"
          class="notification-count d-flex justify-content-center align-items-center"
          >{{ datacount }}</span
        >
      </div>
      <div class="col-4 p-3 position-absolute crad notishow" v-if="datacount && isActive">
        <ul class="m-0 p-0">
          <li
            v-for="user_answer of datadetail"
            :key="user_answer"
            class="d-flex"
          >
            <div class="show_userimage">
              <img :src="user_answer.pictureUrl" />
            </div>
            <div class="ml-2">
              <p class="m-0">{{ user_answer.username }}</p>
              <p>ข้อความที่ส่ง: {{ user_answer.message }}</p>
            </div>
          </li>
        </ul>
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
      socket: io("https://deveverynight.com/"),
      datacount: 0,
      isActive: false,
      datadetail: [],
    };
  },
  mounted() {
    if (localStorage.getItem("line_answer_not_found")) {
      this.datadetail = JSON.parse(
        localStorage.getItem("line_answer_not_found")
      );
      this.datacount = this.datadetail.length;
    }
    this.socket.on("line_answer_not_found", (data) => {
      this.datadetail.push(data);
      this.datadetail.sort((a, b) => b.timestamp - a.timestamp);
      if (localStorage.getItem("line_answer_not_found")) {
        this.datacount = this.datadetail.length;
        localStorage.setItem(
          "line_answer_not_found",
          JSON.stringify(this.datadetail)
        );
      } else {
        localStorage.setItem(
          "line_answer_not_found",
          JSON.stringify(this.datadetail)
        );
        this.datacount++;
      }
    });
  },
};
</script>

<style>
.show_userimage img {
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 50px;
}
.notishow {
  right: 10px;
  top: 60px;
  z-index: 999;
  max-height: 450px;
  overflow-Y: auto;
}
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