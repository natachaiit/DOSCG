<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="p-2 col-xl-9 crad">
      <h2 class="mb-3">The Best Way go to Central World</h2>
      <p>Travel route from</p>
      <div class="d-flex justify-content-around">
        <p>SCG Bangsue</p>
        <img
          src="@/assets/right-arrow.png"
          height="30"
        />
        <p>Central World</p>
      </div>
      <div class="alert alert-danger" role="alert" v-if="errors">
        Server Not Respond
      </div>
      <div class="list-route mt-2">
        <div v-for="item of dataresponse" :key="item" class="crad p-2 mb-2">
          <p class="p-0 m-0">Travel by route: {{ item.summary }}</p>
          <p class="p-0 m-0">Travel time: {{ item.duration }}</p>
          <p class="p-0 m-0">Total distance: {{ item.distance }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dataresponse: [],
      errors: "",
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/googleapi`)
      .then((response) => {
        this.dataresponse = response.data;
      })
      .catch((e) => {
        this.errors = e;
      });
  },
};
</script>