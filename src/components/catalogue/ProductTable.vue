<template>
  <div class="container-fluid mt-1 d-flex flex-wrap">
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

    <div v-if="productsNotFound && isLoaded">
      <b>Товары не найдены, или их нет в наличии</b>
    </div>
  </div>
</template>

<script>

const PAGEABLE_PAGE_SIZE = 12

import ProductDataService from "@/services/ProductDataService";
import StoredProductDataService from "@/services/StoredProductDataService";

export default {
  props: ['searchQuery'],
  name: "ProductTable",
  components: {},

  mounted() {
    this.getNextProducts()
  },

  async created() {
    await this.loadProducts()
  },

  data() {
    return {
      currentPage: 0,
      isLastPage: false,
      products: [],
      isLoaded: false
    }
  },

  computed: {
    productsNotFound() {
      return this.products.length === 0
    }
  },

  methods: {
    getNextProducts() {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 1;
        if (bottomOfWindow && !this.isLastPage) {
          await this.loadProducts()
        }
      }
    },

    async loadProducts() {
      let i
      let newProducts = []

      let pageableResult = await this.getProducts()
      this.currentPage++
      this.isLastPage = pageableResult.data.last
      console.log(pageableResult.data.last)
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
      if (this.searchQuery === null || this.searchQuery.length === 0) {
        return await ProductDataService.getPage(this.currentPage, PAGEABLE_PAGE_SIZE)
      }
      return await ProductDataService.getBySearchQuery(this.currentPage, PAGEABLE_PAGE_SIZE, this.searchQuery)
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