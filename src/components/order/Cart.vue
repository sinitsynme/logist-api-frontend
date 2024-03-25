<template>
  <div class="ml-4 mt-2">
    <router-link to="/catalogue">Вернуться в каталог</router-link>
  </div>
  <div class="text-center">
    <h2>Корзина</h2>
  </div>
  <div class="container mt-1">

    <div v-if="isEmpty" class="text-center">
      <h2>В корзине нет товаров</h2>
      <p>Найдите товары при помощи поиска</p>
      <router-link to="/catalogue" class="ml-4 mt-3">
        <button class="btn btn-outline-primary">Вернуться в каталог</button>
      </router-link>
    </div>
    <div v-else>
      <div v-for="preparedOrder in this.cart" :key="preparedOrder.warehouseId">
        <table class="table">
          <tbody>
          <tr>
            <td class="align-middle">
              <h3>Заказ со склада:
                <router-link :to="{
          name: 'warehouse',
          params: {
            id: preparedOrder.warehouseId
          }
        }">{{ preparedOrder.warehouseName }}
                </router-link>
              </h3>
            </td>
            <td class="align-middle">
              Стоимость заказа: <b>{{ toFixed(preparedOrder.sum, 2) }} ₽</b>
            </td>
            <td class="align-middle">
              <button class="btn btn-outline-primary">Оформить</button>
            </td>
          </tr>
          </tbody>
        </table>

        <table class="table">
          <tbody>
          <tr v-for="product in preparedOrder.products" :key="product.id">
            <td class="align-middle">
              <router-link :to="{
            name: 'product',
            params: {id: product.productId}
          }">
                <img :src="product.imageLink" alt="У товара нет изображения" class="small-product-image">
              </router-link>
            </td>
            <td class="align-middle">
              <router-link :to="{
            name: 'product',
            params: {id: product.productId}
          }">
                {{ product.name }}
              </router-link>
            </td>
            <td class="align-middle">
              <input @change="changeProductQuantity(
                         preparedOrder.warehouseId,
                         product.productId,
                         product.quantity
               )"
                     v-model="product.quantity" type="number" :min="product.quantum" :step="product.quantum"
                     :max="product.availableForReserveQuantity" onkeydown="return false">
            </td>
            <td class="align-middle">
              <b>{{ toFixed(product.quantity * product.price, 2) }} ₽</b>
            </td>
            <td class="align-middle">
              <img @click="removeProductFromCart(preparedOrder.warehouseId, product.productId)"
                   :src="require('../../assets/icons/rubbish-bin.svg')" alt="СкладЛайн" class="icon">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import {useCartStore} from "@/stores/cartStore";
import ProductDataService from "@/services/ProductDataService";
import StoredProductDataService from "@/services/StoredProductDataService";
import WarehouseDataService from "@/services/WarehouseDataService";

export default {
  props: [],
  name: "Cart",
  components: {},

  async mounted() {
    await this.requestProductData()
    this.cartStore.recalculateOrderPrice()
  },

  async created() {
  },

  data() {
    return {
      cartStore: useCartStore()
    }
  },

  computed: {
    cart() {
      return this.cartStore.cart
    },
    isEmpty() {
      return this.cart.length === 0;
    }
  },

  methods: {
    async requestProductData() {
      let i
      for (i in this.cart) {
        let preparedOrder = this.cart[i]
        preparedOrder.warehouseName = (await WarehouseDataService.get(preparedOrder.warehouseId)).data.name
        let j
        for (j in preparedOrder.products) {
          let product = preparedOrder.products[j]
          let storedProduct = (await StoredProductDataService.get(product.productId, preparedOrder.warehouseId)).data
          product.availableForReserveQuantity = storedProduct.availableForReserveQuantity
          product.quantum = storedProduct.quantum
          product.price = storedProduct.price

          let productFromBack = (await ProductDataService.get(product.productId)).data
          product.name = productFromBack.name
          product.imageLink = productFromBack.link

          if (product.quantity % product.quantum !== 0 || product.quantity > product.availableForReserveQuantity) {
            console.log("Изменены данные о наличии товара на складе")
            product.quantity = product.quantum
          }
        }
      }
      console.log(this.cart)
    },

    async changeProductQuantity(warehouseId, productId, quantity) {
      let i
      let preparedOrder

      for (i in this.cart) {
        console.log(this.cart[i])
        if (this.cart[i].warehouseId === warehouseId) {
          preparedOrder = this.cart[i]
        }
      }

      let j
      let product
      for (j in preparedOrder.products) {
        if (preparedOrder.products[j].productId === productId) {
          product = preparedOrder.products[j]
        }
      }

      product.quantity = quantity
      this.cartStore.recalculateOrderPrice()
    },

    async removeProductFromCart(warehouseId, productId) {
      this.cartStore.removeProductFromCart(warehouseId, productId)
    },

    toFixed(value, precision) {
      var power = Math.pow(10, precision || 0);
      return String(Math.round(value * power) / power);
    },
  },


}
</script>

<style>
.small-product-image {
  height: 110px;
}

.icon {
  height: 30px;
}
.icon:hover {
  cursor: pointer;
}

table {
  border-collapse: collapse;
}

tr {
  border-bottom: 1pt solid black;
}
</style>