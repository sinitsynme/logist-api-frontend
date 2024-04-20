<template>
  <div class="text-center mt-3">
    <h4>Результаты поиска по запросу "{{ query }}"</h4>
  </div>
  <div class="container-fluid mt-1 d-flex">
    <div class="w-25">
      <h4 class="text-center">Фильтры</h4>
      <div><b>Цена за 1 шт</b>
        <form class="mt-2">
          <div>
            <label>От&nbsp;</label>
            <input type="number" :maxlength=6 :min=1 :max=100000 v-model="fromPrice"> ₽
          </div>
          <div>
            <label>До&nbsp;</label>
            <input type="number" :maxlength=6 :min=1 :max=100000 v-model="toPrice"> ₽
          </div>
        </form>
      </div>
      <div><b>Категории</b>
        <div class="mt-2">
          <div v-for="category in categories" :key="category.name" class="ml-2">
            <input type="checkbox" v-model="categoriesFilter" :value="category"/>
            <label class="ml-2">{{ category.name }}</label>
          </div>
        </div>
        <button class="btn btn-outline-info" @click="clearFilter">Очистить фильтр</button>
        <button class="btn btn-outline-primary ml-2" @click="filterOrders">Фильтровать</button>
      </div>
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

  data() {
    return {
      categories: [
        {
          name: "Газированные напитки"
        },
        {
          name: "Фруктовые соки"
        },
        {
          name: "Картофельные чипсы"
        },
        {
          name: "Шоколад"
        },
      ],
      categoriesFilter: [],
      fromPrice: '',
      toPrice: ''

    }
  },

  computed: {
    query() {
      return this.searchQuery
    }
  },
}
</script>
