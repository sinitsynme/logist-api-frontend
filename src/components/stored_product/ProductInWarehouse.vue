<template>
  <div class="container mt-3">
    <h2 class="text-center">Просмотр информации о товаре на складе {{ warehouseId }}</h2>
    <div class="row mt-5 ">
      <img :src="storedProduct.imageLink" alt="У товара нет изображения" class="big-product-image mr-auto ml-auto">
      <table class="table w-50">
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
          <td>
            {{ storedProduct.price }}
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
                  <input id="reserveProductInput" type="number" max="10000" width="50px" v-model="wantToReserveQuantity"
                         class="align-middle mr-1">
                  <button class="btn btn-outline-info align-middle fixed-width" @click="reserveProduct">Зарезервировать</button>
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
                <input id="removeProductInput" type="number" max="10000" width="50px" v-model="wantToRemoveQuantity"
                       class="align-middle mr-1">
                <button class="btn btn-outline-info align-middle fixed-width" @click="removeProduct">Списать резерв</button>
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
      wantToReserveQuantity: 0,
      wantToRemoveQuantity: 0,
      wantToAddQuantity: 0,

      storedProduct: {
        categoryCode: ' ',
        categoryName: ' ',
        manufacturer: '',
        manufacturerId: 0,
        name: '',
        description: '',
        price: 0,
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
            this.storedProduct.price = data.price
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
      if(this.wantToReserveQuantity < 1) {
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
      if(this.wantToRemoveQuantity < 1) {
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
      if(this.wantToAddQuantity < 1) {
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
    }
  }
}
</script>


<style scoped>
.big-product-image {
  height: 400px;
}

input[type='number']{
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