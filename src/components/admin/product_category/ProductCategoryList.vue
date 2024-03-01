<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between">
      <span>Список всех категорий товаров</span>

      <router-link to="/productCategoryCreate" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать категорию товара</button>
      </router-link>
    </div>

    <div class="d-flex">
      <table class="table mt-4">
        <thead class="thead-dark">
        <tr>
          <th class="text-left">
            Название категории
          </th>
          <th class="text-left">
            Код категории
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="category in productCategories"
            :key="category.categoryCode"
        >
          <td>{{ category.categoryName }}</td>
          <td>{{ category.categoryCode }}</td>
          <td>
            <router-link :to="{
              name: 'productCategory',
              params: {
               code: category.categoryCode
             }
              }">
              <button class="btn btn-primary">
                Просмотр
              </button>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProductCategoryDataService from "@/services/ProductCategoryDataService";

export default {
  name: "product-category-list",
  mounted() {
    this.getProductCategories()
  },
  data() {
    return {
      productCategories: []
    }
  },

  methods: {
    getProductCategories() {
      ProductCategoryDataService
          .getPage(0, 15)
          .then(response => {
            this.productCategories = response.data.content
            console.log(response.data.content);
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}

</script>


<style>
span {
  font-size: 28pt;
}
</style>