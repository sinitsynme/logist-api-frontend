<template>
  <div class="text-center mt-3">
    <h2>Каталог товаров</h2>
  </div>
  <div class="container-fluid mt-1 d-flex">
    <div class="w-25">
      <b>Фильтрыыыыыыыыыыыыы</b>
    </div>
    <ProductTable :search-query="''"/>
  </div>

</template>

<script>

import ProductTable from "@/components/catalogue/ProductTable.vue";

export default {
  name: "Catalogue",
  components: {ProductTable},
  data() {
    return {
      query: ''
    }
  }
}
</script>
