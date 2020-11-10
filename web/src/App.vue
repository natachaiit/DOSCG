<template>
  <Navbar />
  <div class="container vertical-center setcontent">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
};
</script>

<style>
.setcontent{
  height: calc(100vh - 120px);;
}
</style>
