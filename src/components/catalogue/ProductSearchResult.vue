<template>
  <div class="text-center mt-3">
    <h4>Результаты поиска по запросу "{{ query }}"</h4>
  </div>
  <div class="container-fluid mt-1 d-flex">
    <div class="w-25">
      <b>Фильтрыыыыыыыыыыыыы</b>
    </div>
    <ProductTable :search-query="query"/>
  </div>

</template>

<script>

import ProductTable from "@/components/catalogue/ProductTable.vue";

export default {
  props: ['searchQuery'],
  name: "ProductSearchResult",
  components: {ProductTable},

  computed: {
    query() {
      return this.searchQuery
    }
  },
}
</script>
