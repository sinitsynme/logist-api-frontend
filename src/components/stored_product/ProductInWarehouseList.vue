<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between text-center">
      <span>Список всех товаров на складе {{warehouseId}}</span>

      <router-link :to="{
              name: 'addStoredProduct',
              params: {
               code: warehouseId
             }
              }">
        <button class="btn btn-outline-primary mt-3">Принять товар</button>
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
          <th class="text-left">
            Доступно для резерва
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in products"
            :key="item.product.id"
        >
          <td>{{ item.product.id }}</td>
          <td class="text-center">
            <img :src="item.product.imageLink" class="product-img" alt="Товар без изображения">
          </td>
          <td>{{ item.product.name }}</td>

          <td>
            <router-link :to="{
              name: 'productCategory',
              params: {
               code: item.product.category.categoryCode
             }
              }">
              {{ item.product.category.categoryName }}
            </router-link>
          </td>
          <td>
            <router-link :to="{
              name: 'manufacturer',
              params: {
               id: item.product.manufacturer.id
             }
              }">
              {{ item.product.manufacturer.name }}
            </router-link>
          </td>
          <td>
            {{item.storedProduct.availableForReserveQuantity}}
          </td>


          <td>
            <router-link :to="{
              name: 'storedProduct',
              params: {
               productId: item.product.id,
               warehouseId: warehouseId
             }
              }">
              <button class="btn btn-primary">
                Подробнее
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
import WarehouseDataService from "@/services/WarehouseDataService";
import StoredProductDataService from "@/services/StoredProductDataService";

export default {
  name: "stored-product-list",
  props: [
    "warehouseId"
  ],
  mounted() {
    this.getWarehouseName()
    this.getStoredProducts()
    console.log(this.products)
  },
  data() {
    return {
      products: [],
      warehouseName: ''
    }
  },

  methods: {
    getWarehouseName() {
      WarehouseDataService
          .get(this.warehouseId)
          .then(response => {
            this.warehouseName = response.data.name;
          })
          .catch(e => {
            console.log(e);
          });
    },
    getStoredProducts() {
      StoredProductDataService
          .getPage(0, 15, this.warehouseId)
          .then(response => {
            console.log(response)
                let storedProducts = response.data
                storedProducts.forEach((it) => {
                     this.getProduct(it)
                })
              }
          )
    },

    getProduct(storedProduct) {
      ProductDataService
          .get(storedProduct.productId)
          .then( response => {
            let data = response.data;
            console.log(data)
            let product = {}
            product.id = data.id
            product.name = data.name
            product.category = data.productCategory
            product.manufacturer = data.manufacturer
            this.addImageLinkForProduct(storedProduct, product)
          })
          .catch(e => {
            console.log(e);
          });
    },
     addImageLinkForProduct(storedProduct, product) {
      return ProductDataService
          .getImageLink(product.id)
          .then(response => {
            let data = response.data;
            product.imageLink = data.link
            this.products.push({storedProduct, product})
          })
          .catch(e => {
            console.log(e);
          });
    },

    fillProductsWithImages() {
      this.products.forEach(function (part, index) {
        ProductDataService
            .getImageLink(part.product.id)
            .then(response => {
              this[index].product.imageLink = response.data.link
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }, this.products)
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