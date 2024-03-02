<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center"> Добавление товара на склад</h2>

    <div class="mt-3">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="productId">ID товара</label>
          <input v-model="productId" type="text" class="form-control" id="productId"
                 placeholder="4b0d3d69-1a1a-4479-91cd-24d461d374a4">
        </div>
        <div class="form-group">
          <label for="warehouseId">ID склада</label>
          <input v-model="warehouseMutableId" type="text" class="form-control" id="warehouseId"
                 placeholder="ID склада">
        </div>
        <div class="form-group">
          <label for="quantum">Квант (кратность) товара</label>
          <input v-model="quantum" type="text" class="form-control" id="quantum"
                 placeholder="Квант (кратность) товара">
        </div>
        <div class="form-group">
          <label for="price">Стоимость</label>
          <input v-model="price" type="text" class="form-control" id="price"
                 placeholder="Стоимость">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="addStoredProduct">Добавить товар на склад</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import StoredProductDataService from "@/services/StoredProductDataService";

export default {
  name: "storedProductForm",
  props: [
    "warehouseId"
  ],
  mounted() {
    this.productId = this.$route.query.productId
  },
  data() {
    return {
      productId: '',
      quantum: 1,
      warehouseMutableId: this.warehouseId,
      price: 0.00
    }
  },

  methods: {
    addStoredProduct() {
      let requestBody = {

        productId: this.productId,
        warehouseId: this.warehouseMutableId,
        quantum: this.quantum,
        price: this.price
      }

      if (this.quantity < 1) {
        let input = document.getElementById("quantity")
        input.classList.add("red")
        return
      }

      StoredProductDataService
          .registerProductInWarehouse(requestBody)
          .then(() => this.$router.push(`/storedProduct/${this.productId}/${this.warehouseMutableId}`))
          .catch(e => console.log(e))
    }
  }
}
</script>


<style scoped>
.red {
  color: red;
}
</style>