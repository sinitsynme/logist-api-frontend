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
