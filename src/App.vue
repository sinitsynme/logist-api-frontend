<template>
  <div id="app">
    <nav class="navbar navbar-expand bg-light">
      <NavbarItems/>

      <form class="d-flex ml-auto" role="search" @submit.prevent="onsubmit">
        <input v-model="searchQuery" class="form-control me-2 col-lg-8" type="search" placeholder="Найти товар"
               aria-label="Найти товар" size="50">
        <router-link to="product-search">
        </router-link>
        <router-link :to="{
        name: 'product-search',
        query: {searchQuery: searchQuery}}" class="my-2 my-sm-0 ml-2">
          <button class="btn btn-outline-success">Поиск</button>
        </router-link>
      </form>

      <AuthComponent class="navbar ml-auto"/>
    </nav>

    <div>
      <router-view :key="this.$route.path"/>
    </div>
  </div>

</template>

<script>

import AuthComponent from "@/components/AuthComponent.vue";
import NavbarItems from "@/components/NavbarItems.vue";

export default {
  name: "app",
  components: {NavbarItems, AuthComponent},
  data() {
    return {
      searchQuery: '',
      todoTitle: '',
    }
  },
  mounted() {
  },
  methods: {
    searchProducts() {
      this.$router.push(`/product/search?searchQuery=${this.searchQuery}`)
      this.searchQuery = ''
    }
  }
};
</script>
