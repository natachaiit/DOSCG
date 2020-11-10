<template>
  <footer class="footer">
    <div class="container d-flex justify-content-between">
      <span>This website was created to test for working at <b>SCG</b>.</span>
      <span>Create By <b>Natachai Sotipan</b></span>
    </div>
  </footer>
</template>

<style>
.footer {
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
@media screen and (max-width: 800px) {
  .footer {
    height: 80px;
  }
  .footer .container{
      flex-direction: column;
  }
  .footer .container span{
      height: 30px;
      align-self: center;
  }
}

</style>