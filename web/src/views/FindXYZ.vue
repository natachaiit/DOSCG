<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="p-2 col-xl-6 crad">
      <h2 class="mb-3">Finding X, Y, Z value</h2>
      <ul class="d-flex show-list">
        <li>X</li>
        <li>Y</li>
        <li>5</li>
        <li>9</li>
        <li>15</li>
        <li>23</li>
        <li>Z</li>
      </ul>
      <h4>Answer</h4>
      <ul class="d-flex show-list" v-if="datafingxyz && datafingxyz.length">
        <li v-for="item of datafingxyz" :key="item">{{ item }}</li>
      </ul>
      <p v-if="datafingxyz && datafingxyz.length">
        The added value is the index multiplied by 2.
      </p>
      <div class="alert alert-danger" role="alert" v-if="errors">
        Server Not Respond
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FindXYZ",
  data() {
    return {
      datafingxyz: [],
      errors: "",
    };
  },
  mounted() {
    if (localStorage.getItem("findxyz")) {
      this.datafingxyz = JSON.parse(localStorage.getItem("findxyz"));
    } else {
      axios
        .get(`http://localhost:3000/findxyz`)
        .then((response) => {
          this.datafingxyz = response.data;
          localStorage.setItem("findxyz", JSON.stringify(response.data));
        })
        .catch((e) => {
          this.errors = e;
        });
    }
  },
};
</script>

<style>
ul.show-list {
  padding: 0;
  list-style: none;
}
ul.show-list li {
  color: black;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
  border-radius: 5px;
  width: 50px;
  height: 60px;
  padding: 2px 10px;
  border: 1px solid white;
}
</style>
