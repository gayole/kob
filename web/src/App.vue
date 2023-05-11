<template>
<div>
    <NavBar /> 
    <router-view></router-view>
</div>
</template>
<script>

import NavBar from "@/components/NavBar.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import $ from 'jquery'

export default {
  components:{
    NavBar
  },

  setup() {
    //测试LoginService
  //   $.ajax({
  //     url: "http://127.0.0.1:3000/user/account/token/",
  //     type: "post",
  //     data: {
  //       username: 'b',
  //       password: 'pb',
  //     },
  //     success(resp) {
  //       console.log(resp);
  //     },
  //     error(resp) {
  //       console.log(resp); 
  //     }
  //   });
  //   //测试InfoService
  //   $.ajax({
  //     url: "http://127.0.0.1:3000/user/account/info/",
  //     type: "get",
  //     headers: {
  //       Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MmYyMTU3MjE2MTc0NzQwOTU0N2E3OWUxNGZlMGY5ZiIsInN1YiI6IjIiLCJpc3MiOiJzZyIsImlhdCI6MTY4MzczNzQ0MSwiZXhwIjoxNjg0OTQ3MDQxfQ.9HyODmLsE5X-qdERNqz03Ab88hbAVzVBigh4D_9KgwA",
  //     },
  //     success(resp) {
  //       console.log(resp);
  //     },
  //     error(resp) {
  //       console.log("shibai" + resp);
  //     }
  //   });
  //   //测试RegisterService
  //   $.ajax({
  //     url: "http://127.0.0.1:3000/user/account/register/",
  //     type: "post",
  //     data: {
  //       username: "b",
  //       password: "pe",
  //       confirmedPassword: "pe",
  //     },
  //     success(resp) {
  //       console.log(resp);
  //     },
  //     error(resp) {
  //       console.log(resp);
  //     }
  //  })
  }
}

</script>
<style>
body {
    background-image: url("@/assets/images/1_59b8f162fd-background.png");
    background-size: cover;
}
</style>