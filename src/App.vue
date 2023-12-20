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
        <li class="nav-item">
          <router-link to="/maps/53.181759/50.177075" class="nav-link">Карта-DEV</router-link>
        </li>
      </div>

      <form class="navbar-form mr-auto d-flex" role="search" @submit.prevent="onsubmit">
        <input v-model="searchQuery" class="form-control me-2 col-lg-8" type="search" placeholder="Найти товар"
               aria-label="Найти товар">
        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchProducts">Поиск</button>
      </form>

      <div class="navbar ml-auto">
        <AuthComponent/>
      </div>
    </nav>

    <div>
      <router-view/>
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
