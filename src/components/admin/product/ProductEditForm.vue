<template>
  <div class="container mt-3">
    <h2 class="text-center mt-3">Редактирование товара с id {{ id }}</h2>
    <form @submit.prevent="onsubmit">
      <div class="form-group">
        <label for="productName">Название товара</label>
        <input v-model="product.name" type="text" class="form-control" id="productName"
               placeholder="Название товара">
      </div>
      <div class="form-group">
        <label for="productDescr">Описание</label>
        <input v-model="product.description" type="text" class="form-control" id="productDescr"
               placeholder="Описание">
      </div>
      <div class="form-group">
        <label for="categoryCode">Код категории</label>
        <input v-model="product.categoryCode" type="text" class="form-control" id="categoryCode"
               placeholder="Код категории">
      </div>
      <div class="form-group">
        <label for="manufacturerId">ID производителя</label>
        <input v-model="product.manufacturerId" type="number" class="form-control" id="manufacturerId"
               placeholder="ID производителя">
      </div>
      <div class="form-group">
        <label for="productWeight">Вес</label>
        <input v-model="product.weight" type="number" step="0.001" class="form-control" id="productWeight"
               placeholder="Вес">
      </div>
      <div class="form-group">
        <label for="productVolume">Объем</label>
        <input v-model="product.volume" type="number" step="0.001" class="form-control" id="productVolume"
               placeholder="Объем">
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary" @click="editProduct(product, id)">Редактировать</button>
      </div>
    </form>
  </div>
</template>

<script>

import ProductDataService from "@/services/ProductDataService";

export default {
  name: "productCategoryEdit",
  props: [
    'id'
  ],
  mounted() {
    this.getProduct()
  },
  data() {
    return {
      product: {
        name: '',
        description: '',
        categoryCode: '',
        manufacturerId: '',
        weight: '',
        volume: '',
      },
    }
  },

  methods: {
    getProduct() {
      ProductDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            this.product.id = data.id
            this.product.name = data.name
            this.product.description = data.description
            this.product.categoryCode = data.productCategory.categoryCode
            this.product.manufacturerId = data.manufacturer.id
            this.product.weight = data.weight
            this.product.volume = data.volume
          })
          .catch(e => {
            console.log(e);
          });
    },
    editProduct(product, id) {
      let requestBody = {
        name: product.name,
        description: product.description,
        manufacturerId: product.manufacturerId,
        categoryCode: product.categoryCode,
        weight: product.weight,
        volume: product.volume,
      }
      ProductDataService
          .edit(requestBody, id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/product/" + id)
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