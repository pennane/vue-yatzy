<template>
  <div id="app">
    <Yatzy />
  </div>
</template>

<script>
import Yatzy from "@/components/yatzy.vue";
export default {
  name: "App",
  components: {
    Yatzy
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  background-image: url("~@/assets/wood.png");
}
</style>
