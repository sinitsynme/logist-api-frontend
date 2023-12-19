<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Просмотр информации о категории товара</h2>
    <table class="table mt-3">
      <tbody>
      <tr>
        <td>
          <b>Код</b>
        </td>
        <td>
          {{ category.code }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Название</b>
        </td>
        <td>
          {{ category.name }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between p-5">
      <router-link :to="{
        name: 'productCategoryFormEdit',
        params: {
          code: code
        }}"
      >
        <button class="btn btn-outline-primary">
          Редактировать
        </button>
      </router-link>

      <button class="btn btn-outline-danger" @click="deleteCategory">Удалить</button>
    </div>
  </div>


</template>

<script>

import ProductCategoryDataService from "@/services/ProductCategoryDataService";

export default {
  name: "productCategory",
  props: [
    'code'
  ],
  mounted() {
    this.getCategory()
  },
  data() {
    return {
      category: {
        code: '',
        name: '',
      }
    }
  },

  methods: {
    getCategory() {
      ProductCategoryDataService
          .get(this.code)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.category.code = data.categoryCode
            this.category.name = data.categoryName
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteCategory() {
      ProductCategoryDataService
          .delete(this.code)
          .then(response => {
            console.log(response)
            this.$router.push("/productCategory")
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}
</script>


<style scoped>

</style>