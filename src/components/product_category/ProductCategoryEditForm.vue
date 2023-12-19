<template>
  <div class="container mt-3">
    <h2 class="text-center mt-3">Редактирование категории товара с кодом {{ code }}</h2>
    <form @submit.prevent="onsubmit">
      <div class="form-group">
        <label for="categoryCode">Код</label>
        <input v-model="category.code" type="text" class="form-control" id="categoryCode"
               placeholder="Код">
      </div>
      <div class="form-group">
        <label for="categoryName">Название</label>
        <input v-model="category.name" type="text" class="form-control" id="categoryName"
               placeholder="Название">
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary" @click="editManufacturer(category, code)">Редактировать</button>
      </div>
    </form>
  </div>
</template>

<script>

import ProductCategoryDataService from "@/services/ProductCategoryDataService";

export default {
  name: "productCategoryEdit",
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
      if (!this.code) return

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
    editManufacturer(category, code) {
      let requestBody = {
        categoryName: category.name,
        categoryCode: category.code
      }
      ProductCategoryDataService
          .edit(requestBody, code)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/productCategory/" + code)
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
<script setup>
</script>