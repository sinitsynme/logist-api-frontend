<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between text-center">
      <span>Результаты поиска по запросу: {{searchQuery}}</span>
    </div>
  </div>
  <div style="width: 90%; margin: auto">
    <div class="d-flex">
      <table class="table mt-4">
        <thead class="thead-dark">
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Изображение
          </th>
          <th class="text-left">
            Название
          </th>
          <th class="text-left">
            Категория
          </th>
          <th class="text-left">
            Производитель
          </th>
          <th class="text-left">
            Сборный?
          </th>
          <th class="text-left">
            Стоимость, ₽
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="product in products"
            :key="product.id"
        >
          <td>{{ product.id }}</td>
          <td class="text-center">
            <img :src="product.imageLink" class="product-img" alt="Товар без изображения">
          </td>
          <td>{{ product.name }}</td>
          <td>
            <router-link :to="{
              name: 'productCategory',
              params: {
               code: product.productCategory.categoryCode
             }
              }">
              {{ product.productCategory.categoryName }}
            </router-link>
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
          <td>
            <div v-if="product.packaged">
              Да
            </div>
            <div v-else>
              Нет
            </div>
          </td>
          <td>
            {{product.price}}
          </td>

          <td>
            <router-link :to="{
              name: 'product',
              params: {
               id: product.id
             }
              }">
              <button class="btn btn-primary">
                Просмотр
              </button>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default {
  name: "product-list",
  mounted() {
    this.searchQuery = this.$route.query.searchQuery
    this.getProductsBySearchQuery(this.searchQuery)
  },
  data() {
    return {
      products: [],
      searchQuery: ''
    }
  },

  methods: {
    getProductsBySearchQuery(query) {
      ProductDataService
          .getBySearchQuery(0, 15, query)
          .then(response => {
            this.products = response.data.content
            console.log(response.data);

            this.products = this.fillProductsWithImages(this.products)
          })
          .catch(e => {
            console.log(e);
          });
    },

    fillProductsWithImages(products) {
      products.forEach(function (part, index) {
        ProductDataService
            .getImageLink(part.id)
            .then(response => {
              this[index].imageLink = response.data.link
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }, products)
      return products
    }
  }
}

</script>


<style>
span {
  font-size: 28pt;
}

.product-img {
  max-height: 200px;
  max-width: 200px;
}
</style>