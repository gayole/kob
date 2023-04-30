<template>
  <div>
    <div>Bot昵称：{{ bot_name }}</div>
    <div>Bot战力：{{ bot_rating }}</div>
  </div>
  <router-view></router-view>
</template>

<script>
import $ from 'jquery';
import { ref } from 'vue';

export default{
  name:"APP",
  setup: () => {
    let bot_name = ref("");
    let bot_rating = ref("");
    console.log("1");

    $.ajax({
      url:"http://127.0.0.1:3000/pk/getbotinfo/",
      type:"get",
      success: resp => {
          console.log("1");
          bot_name.value = resp.name;
          bot_rating.value = resp.rating;
      }
    });
    console.log("2");

    return {
      bot_name,
      bot_rating
    }
  }
}

</script>

<style>
body {
  background-size: cover;
  background-image: url("@/assets/1_59b8f162fd-background.png");
}
</style>
