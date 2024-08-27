<template>
  <form class="d-flex" role="search" @submit.prevent="onsubmit">
    <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Найти товар"
           aria-label="Найти товар" size="50">

    <router-link :to="{name: 'product-search', params: {searchQuery: this.searchQuery}}" :searchQuery="searchQuery" class="my-2 my-sm-0 ml-2">
      <button class="btn btn-outline-success">Поиск</button>
    </router-link>
  </form>
</template>

<script>

export default {
  name: "SearchBar",
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
