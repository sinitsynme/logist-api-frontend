<template>
  <div v-if="isShopMode">
    <div class="d-flex justify-content-around mt-2">
      <img :src="require('../assets/long-logo.png')" alt="СкладЛайн" style="max-width: 35%">
      <div class="text-center">
        <h1>СкладЛайн</h1>
        <h2>Лучшая платформа для оптовых B2B-закупок</h2>
      </div>
    </div>
    <h3 class="text-center mt-4">Популярные товары</h3>

    <div class="container-fluid mt-1 ml-3 d-flex flex-wrap justify-content-around">
      <div v-for="product in this.products" :key="product.id" class="card" style="width: 18rem;">
        <img class="mt-1" :src="product.link" alt="Картинка не загружена" style="height: 250px" @click="goToProductPage(product.id)">
        <div class="card-body text-center">
          <b class="card-title">{{ product.name }}</b>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <b>от {{ product.minimalPrice }} ₽ </b>
            <router-link :to="{
            name: 'product',
            params: {id: product.id}
          }">
              <button class="btn btn-primary ml-3">Предложения</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <h3 class="text-center">
        Что такое "СкладЛайн"?
      </h3>
      <div>
        <p>
          <b>СкладЛайн</b> - это B2B-платформа для осуществления оптовых закупок, созданная в 2024 году.
        </p>
        <p>
          <b>Поставщикам</b> предоставлена возможность контроля остатков товара на складах, регистрировать новые склады,
        </p>
        <p>
          <b>Потребителям</b> можно заказывать товары оптом у разных поставщиков на разные организации и адреса, отслеживать свои заказы,
          контролировать состояние заказов на платформе
        </p>

      </div>
    </div>
  </div>

  <div v-if="isManagementMode" class="d-flex justify-content-around">
    <img :src="require('../assets/management-long-logo.png')" alt="СкладЛайн Менеджмент" style="max-width: 35%">
    <div class="text-center">
      <h1>СкладЛайн Менеджмент</h1>
      <h2>Панель управления</h2>
    </div>
  </div>
</template>

<script>

import {useModeStore} from "@/stores/modeStore";
import StoredProductDataService from "@/services/StoredProductDataService";
import ProductDataService from "@/services/ProductDataService";

export default {
  name: "Main",
  props: {},
  data() {
    return {
      products: [],
      modeStore: useModeStore(),
    }
  },
  computed: {
    mode() {
      return this.modeStore.mode
    },
    isShopMode() {
      return this.modeStore.isShopMode()
    },
    isManagementMode() {
      return this.modeStore.isManagementMode()
    }
  },
  async created() {
    await this.loadProducts()
  },
  methods: {

    async loadProducts() {
      let i
      let newProducts = []

      let pageableResult = await this.getProducts()
      let content = pageableResult.data.content

      console.log(content)
      if (content.length === 0) return

      let productMinPrices = (await StoredProductDataService
          .getProductsMinPrices(content.map(it => it.id)))
          .data

      for (i in productMinPrices) {
        let id = productMinPrices[i].productId

        let product = content.find(it => it.id === id)

        product.minimalPrice = productMinPrices[i].minimalPrice
        newProducts.push(product)
      }

      for (i in newProducts) {
        this.products.push(newProducts[i])
      }
      this.isLoaded = true
      console.log(newProducts)
    },

    async getProducts() {
      return await ProductDataService.getPage(2, 5)
    },
    async goToProductPage(productId) {
      await this.$router.push(`/product/${productId}`)
    }
  },

}
</script>

<style>
img {
  object-fit: contain;
}

img:hover {
  cursor:pointer;
}

.card-title {
}

.card {
  margin: 0 2px 10px 0
}
</style>