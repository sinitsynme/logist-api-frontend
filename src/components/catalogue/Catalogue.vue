<template>
  <div class="text-center mt-3">
    <h4>Каталог товаров</h4>
  </div>
  <div class="container-fluid mt-1 d-flex">
    <div class="w-25">
      <b>Фильтрыыыыыыыыыыыыы</b>
    </div>
    <div class="container-fluid mt-1 d-flex flex-wrap">
      <div v-for="product in this.products" :key="product.id" class="card" style="width: 18rem;">
        <img class="mt-1" :src="product.link" alt="Картинка не загружена" style="height: 250px">
        <div class="card-body text-center">
          <h5 class="card-title">{{ product.name }}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <b>от {{ product.minimalPrice }} ₽</b>
            <button class="btn btn-primary">Предложения</button>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

import ProductDataService from "@/services/ProductDataService";
import StoredProductDataService from "@/services/StoredProductDataService";

export default {
  name: "Catalogue",
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
      products: []
    }
  },

  computed: {},

  methods: {
    getNextProducts() {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight * 0.99;
        if (bottomOfWindow && !this.isLastPage) {
          await this.loadProducts()
        }
      }
    },

    async loadProducts() {
      let i
      let newProducts = []

      let pageableResult = await ProductDataService.getPage(this.currentPage, 16)
      this.currentPage++
      this.isLastPage = pageableResult.data.last
      console.log(pageableResult.data.last)
      let content = pageableResult.data.content

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
    }
  },


}
</script>

<style>

img {
  object-fit: contain;
}

.card {
  margin: 0 2px 10px 0
}

</style>