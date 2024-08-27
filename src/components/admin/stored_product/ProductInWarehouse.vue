<template>
  <div class="container mt-3">
    <h2 class="text-center">Управление остатками товара на складе с ID = {{ warehouseId }}</h2>
    <div class="d-flex justify-content-between mt-5 ">
      <div class="ml-auto mr-auto ">
        <div class="border">
          <div class="pl-3 pr-3">
            <img :src="storedProduct.imageLink" alt="У товара нет изображения" class="big-product-image">
          </div>
        </div>
      </div>
      <table class="table w-75">
        <tbody>
        <tr>
          <td>
            <b>ID</b>
          </td>
          <td>
            <router-link :to="{
              name: 'product',
              params: {
               id: productId
              }
              }">
              {{ productId }}
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <b>Название</b>
          </td>
          <td>
            {{ storedProduct.name }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Описание</b>
          </td>
          <td>
            {{ storedProduct.description }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Категория</b>
          </td>
          <td>
            <router-link :to="{
              name: 'productCategory',
              params: {
               code: storedProduct.categoryCode
             }
              }">
              {{ storedProduct.categoryName }}
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <b>Производитель</b>
          </td>
          <td>
            <router-link :to="{
              name: 'manufacturer',
              params: {
               id: storedProduct.manufacturerId
             }
              }">
              {{ storedProduct.manufacturer }}
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <b>Стоимость, ₽</b>
          </td>
          <td class="d-flex">
            {{ storedProduct.price }}
            <form class="ml-auto" @submit.prevent="onsubmit">
              <b>Новая стоимость, ₽ </b>
              <input id="priceInput" type="number" step="0.01" max="10000" width="50px" v-model="newPrice"
                     class="align-middle mr-1">
              <button class="btn btn-outline-info align-middle fixed-width" @click="updatePrice">Обновить
              </button>
            </form>
          </td>
        </tr>
        <tr>
          <td>
            <b>Квант (кратность в заказе)</b>
          </td>
          <td class="d-flex">
            {{ storedProduct.quantum }}
            <form class="ml-auto" @submit.prevent="onsubmit">
              <b>Новая кратность, ед. </b>
              <input id="quantumInput" type="number" step="1" min="1" max="1000" width="50px" v-model="newQuantum"
                     class="align-middle mr-1">
              <button class="btn btn-outline-info align-middle fixed-width" @click="updateQuantum">Обновить
              </button>
            </form>
          </td>
        </tr>
        <tr>
          <td>
            <b>Доступно для резерва</b>
          </td>
          <td>
            <div class="d-flex">
              {{ storedProduct.availableForReserveQuantity }}

              <form class="ml-auto" @submit.prevent="onsubmit">
                <b>Зарезервировать, ед. </b>
                <input id="reserveProductInput" type="number" max="10000" width="50px" v-model="wantToReserveQuantity"
                       class="align-middle mr-1">
                <button class="btn btn-outline-info align-middle fixed-width" @click="reserveProduct">Зарезервировать
                </button>
              </form>

            </div>
          </td>
        </tr>
        <tr>
          <td>
            <b>Зарезервировано</b>
          </td>
          <td>
            <div class="d-flex">
              {{ storedProduct.reservedQuantity }}

              <form class="ml-auto" @submit.prevent="onsubmit">
                <b>Списать, ед. </b>
                <input id="removeProductInput" type="number" max="10000" width="50px" v-model="wantToRemoveQuantity"
                       class="align-middle mr-1">
                <button class="btn btn-outline-info align-middle fixed-width" @click="removeProduct">Списать резерв
                </button>
              </form>

            </div>
          </td>
        </tr>
        <tr>
          <td>
            <b>Всего на складе</b>
          </td>
          <td>

            <div class="d-flex">
              {{ storedProduct.quantity }}

              <form class="ml-auto" @submit.prevent="onsubmit">
                <b>Принять, ед. </b>
                <input id="addProductInput" type="number" max="10000" width="50px" v-model="wantToAddQuantity"
                       class="align-middle mr-1">
                <button class="btn btn-outline-info align-middle fixed-width" @click="addProduct">Принять товар</button>
              </form>

            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>


import ProductDataService from "@/services/ProductDataService";
import StoredProductDataService from "@/services/StoredProductDataService";

export default {
  name: "product-in-warehouse",
  props: [
    "productId", "warehouseId"
  ],
  mounted() {
    this.getStoredProduct()
  },
  data() {
    return {
      newPrice: 0.00,
      newQuantum: 1,
      wantToReserveQuantity: 0,
      wantToRemoveQuantity: 0,
      wantToAddQuantity: 0,

      warehouse: {
        id: '',
        name: ''
      },
      storedProduct: {
        categoryCode: ' ',
        categoryName: ' ',
        manufacturer: '',
        manufacturerId: 0,
        name: '',
        description: '',
        price: 0,
        quantum: 0,
        quantity: 0,
        reservedQuantity: 0,
        availableForReserveQuantity: 0,
      }
    }
  },

  methods: {
    getStoredProduct() {
      StoredProductDataService
          .get(this.productId, this.warehouseId)
          .then(response => {
            let data = response.data;
            this.storedProduct.quantity = data.quantity
            this.storedProduct.reservedQuantity = data.reservedQuantity
            this.storedProduct.availableForReserveQuantity = data.availableForReserveQuantity
            this.storedProduct.price = data.price
            this.storedProduct.quantum = data.quantum
            this.getProduct()
          })
    },
    getProduct() {
      ProductDataService
          .get(this.productId)
          .then(response => {
            let data = response.data;

            this.storedProduct.id = data.id
            this.storedProduct.name = data.name
            this.storedProduct.description = data.description
            this.storedProduct.categoryName = data.productCategory.categoryName
            console.log(this.storedProduct.categoryName)
            this.storedProduct.categoryCode = data.productCategory.categoryCode
            console.log(this.storedProduct.categoryCode)
            this.storedProduct.manufacturerId = data.manufacturer.id
            this.storedProduct.manufacturer = data.manufacturer.name
            this.addImageLinkForProduct()
          })
          .catch(e => {
            console.log(e);
          });
    },
    addImageLinkForProduct() {
      return ProductDataService
          .getImageLink(this.productId)
          .then(response => {
            let data = response.data;
            this.storedProduct.imageLink = data.link
          })
          .catch(e => {
            console.log(e);
          });
    },
    reserveProduct() {
      if (this.wantToReserveQuantity < 1) {
        let input = document.getElementById("reserveProductInput")
        input.classList.add("red")
        return
      }
      let requestBody = {
        productId: this.productId,
        warehouseId: this.warehouseId,
        quantity: this.wantToReserveQuantity
      }
      StoredProductDataService
          .reserveProduct(requestBody)
          .then(() => {
            this.$router.go(0)
          })
    },

    removeProduct() {
      if (this.wantToRemoveQuantity < 1) {
        let input = document.getElementById("removeProductInput")
        input.classList.add("red")
        return
      }
      let requestBody = {
        productId: this.productId,
        warehouseId: this.warehouseId,
        quantity: this.wantToRemoveQuantity
      }
      StoredProductDataService
          .removeReservedProduct(requestBody)
          .then(() => {
            this.$router.go(0)
          })
    },
    addProduct() {
      if (this.wantToAddQuantity < 1) {
        let input = document.getElementById("addProductInput")
        input.classList.add("red")
        return
      }
      let requestBody = {
        productId: this.productId,
        warehouseId: this.warehouseId,
        quantity: this.wantToAddQuantity
      }
      StoredProductDataService
          .addProductToWarehouse(requestBody)
          .then(() => {
            this.$router.go(0)
          })
    },

    updatePrice() {
      if (this.newPrice < 1) {
        let input = document.getElementById("priceInput")
        input.classList.add("red")
        return
      }

      let requestBody = {
        productId: this.productId,
        warehouseId: this.warehouseId,
        price: this.newPrice,
        quantum: this.storedProduct.quantum
      }
      StoredProductDataService
          .updateQuantumAndPrice(requestBody)
          .then(() => {
            this.$router.go(0)
          })
    },

    updateQuantum() {
      if (this.newQuantum < 1 || this.newQuantum > 1000) {
        let input = document.getElementById("quantumInput")
        input.classList.add("red")
        return
      }

      let requestBody = {
        productId: this.productId,
        warehouseId: this.warehouseId,
        price: this.storedProduct.price,
        quantum: this.newQuantum
      }
      StoredProductDataService
          .updateQuantumAndPrice(requestBody)
          .then(() => {
            this.$router.go(0)
          })
    }
  }
}
</script>


<style scoped>
.big-product-image {
  height: 250px;
}

input[type='number'] {
  width: 80px;
  font-size: 16pt;
}

.red {
  color: red;
}

.fixed-width {
  width: 10em;
}

</style>