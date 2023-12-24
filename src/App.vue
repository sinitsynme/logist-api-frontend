<template>
  <div id="app">
    <nav class="navbar navbar-expand bg-light">
      <router-link to="/">
        <img :src="require('./assets/long-logo.png')" width="250" alt="СкладЛайн">
      </router-link>
      <div class="navbar-nav mr-lg-5">
        <li class="nav-item">
          <router-link to="/organization" class="nav-link">Предприятия</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/warehouse" class="nav-link">Склады</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/manufacturer" class="nav-link">Производители</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productCategory" class="nav-link">Категории товаров</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/product" class="nav-link">Товары</router-link>
        </li>
      </div>

      <form class="navbar-form mr-auto d-flex" role="search" @submit.prevent="onsubmit">
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

      <div class="navbar ml-auto">
        <AuthComponent/>
      </div>
    </nav>

    <div>
      <router-view :key="this.$route.path"/>
    </div>
  </div>

</template>

<script>

import AuthComponent from "@/components/AuthComponent.vue";

export default {
  name: "app",
  components: {AuthComponent},
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    searchProducts() {
      this.$router.push(`/product/search?searchQuery=${this.searchQuery}`)
      this.searchQuery = ''
    }
  }
};
</script>
