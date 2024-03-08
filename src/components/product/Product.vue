<template>
  <div class="container mt-3 ">
    <div class="d-flex justify-content-between">
      <img :src="product.link" alt="У товара нет изображения" class="big-product-image ml-3">
      <div>
        <h3 class="text-center">{{ product.name }}</h3>
        <div v-if="availabilityInfo.available" class="text-center">
          <b class="heading">от {{ availabilityInfo.minimalPrice }} ₽</b>
        </div>
        <table class="table mt-3">
          <tbody>
          <tr>
            <td>
              <b>Описание</b>
            </td>
            <td>
              {{ product.description }}
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
               code: product.category.categoryCode
             }
              }">
                {{ product.category.categoryName }}
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
               id: product.manufacturer.id
             }
              }">
                {{ product.manufacturer.name }}
              </router-link>
            </td>
          </tr>
          <tr>
            <td>
              <b>Вес</b>
            </td>
            <td>
              {{ product.weight }} кг
            </td>
          </tr>
          <tr>
            <td>
              <b>Объем</b>
            </td>
            <td>
              {{ product.volume }} л
            </td>
          </tr>
          </tbody>
        </table>
        <div>
          <div class="text-center">
            <b class="heading">Наличие на складах</b>
          </div>
          <AddItemToCartBar :product-id="this.id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import ProductDataService from "@/services/ProductDataService";
import AddItemToCartBar from "@/components/product/AddItemToCartBar.vue";

export default {
  name: "Product",
  components: {AddItemToCartBar},
  props: [
    'id'
  ],
  async mounted() {
    await this.getProduct()
  },
  data() {
    return {
      product: {
        id: '',
        name: '',
        description: '',
        category: '',
        manufacturer: '',
        weight: '',
        volume: '',
        link: ''
      },
      availabilityInfo: {}
    }
  },

  methods: {
    async getProduct() {
      ProductDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            this.product.id = data.id
            this.product.name = data.name
            this.product.description = data.description
            this.product.category = data.productCategory
            this.product.manufacturer = data.manufacturer
            this.product.weight = data.weight
            this.product.volume = data.volume
            this.product.link = data.link
          })
          .catch(e => {
            console.log(e);
          });
    },

  }
}
</script>


<style scoped>
.big-product-image {
  height: 400px;
}

.heading {
  font-size: 18pt;
}
</style>