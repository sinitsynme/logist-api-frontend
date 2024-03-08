<template>
  <div id="app">
    <Navbar/>

    <div>
      <router-view :key="this.$route.path"/>
    </div>
  </div>

</template>

<script>

import Navbar from "@/components/common/Navbar.vue";

export default {
  name: "app",
  components: {Navbar},
  data() {
    return {
      searchQuery: '',
    }
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Arimo&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Arimo', sans-serif
}
</style>