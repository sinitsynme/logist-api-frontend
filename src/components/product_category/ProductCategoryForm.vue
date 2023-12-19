<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Создание категории товара</h2>

    <div class="mt-3">

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

      <div class="text-center">
        <button type="submit" class="btn btn-primary" @click="saveCategory(category)">Сохранить</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import ProductCategoryDataService from "@/services/ProductCategoryDataService";

export default {
  name: "productCategoryForm",
  mounted() {
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
    saveCategory(category) {
      let requestBody = {
        categoryName: category.name,
        categoryCode: category.code
      }
      ProductCategoryDataService
          .create(requestBody)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/productCategory/" + category.code)
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