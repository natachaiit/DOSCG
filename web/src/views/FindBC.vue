<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="p-2 col-xl-6 crad">
      <h2 class="mb-3">
        If A = 21  A + B = 23 A + C = -21
      </h2>
      <h4>Answer</h4>
      <div v-if="datafindbc">
        <h3>B = {{ datafindbc.datafirstsum }}</h3>
        <h3>C = {{ datafindbc.datasecondsum }}</h3>
        <p>**Use the algebra.js library to find values.</p>
      </div>
      <div class="alert alert-danger" role="alert" v-if="errors">
        Server Not Respond
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      datafindbc: {},
      errors: "",
    };
  },
  mounted() {
    if (localStorage.getItem("findbc")) {
      this.datafindbc = JSON.parse(localStorage.getItem("findbc"));
    } else {
      axios
        .get(`http://localhost:3000/findbc`)
        .then((response) => {
          this.datafindbc = response.data;
          localStorage.setItem("findbc", JSON.stringify(response.data));
        })
        .catch((e) => {
          this.errors = e;
        });
    }
  },
};
</script>

<style>
h3{
  color: red;
  font-weight: bold;
}
</style>