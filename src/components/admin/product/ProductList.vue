<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between text-center">
      <span>Список всех товаров</span>

      <router-link to="/productCreate" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать товар</button>
      </router-link>
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
            <router-link :to="{
              name: 'productManagementPage',
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
    this.getProducts()
  },
  data() {
    return {
      products: []
    }
  },

  methods: {
    getProducts() {
      ProductDataService
          .getPage(0, 50)
          .then(response => {
            this.products = response.data.content
            console.log(response.data.content);

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