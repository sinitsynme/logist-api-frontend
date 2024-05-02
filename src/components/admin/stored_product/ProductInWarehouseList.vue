<template>

  <div class=" mt-2">
    <div class="d-flex justify-content-between ml-5 mr-5">
      <span>Список всех товаров на складе {{ warehouseName }}</span>

      <router-link :to="{
              name: 'addStoredProduct',
              params: {
               code: warehouseId
             }
              }">
        <button class="btn btn-outline-primary mt-3">Зарегистрировать товар на складе</button>
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
            Номер на складе
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
          <td>
            <router-link :to="{
              name: 'product',
              params: {
               id: item.product.id
              }
              }">
              {{ item.product.id }}
            </router-link>
          </td>
          <td>{{ item.storedProduct.warehouseCode }}</td>
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
            {{ item.storedProduct.availableForReserveQuantity }}
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
          .getPage(0, 50, this.warehouseId)
          .then(response => {
                console.log(response)
                let storedProducts = response.data.content
                storedProducts.forEach((it) => {
                  if (it.quantity === 0) return
                  this.getProduct(it)
                })
              }
          )
    },

    getProduct(storedProduct) {
      ProductDataService
          .get(storedProduct.productId)
          .then(response => {
            let data = response.data;
            console.log(data)
            let product = {}
            product.id = data.id
            product.name = data.name
            product.category = data.productCategory
            product.manufacturer = data.manufacturer
            this.products.push({storedProduct, product})
          })
          .catch(e => {
            console.log(e);
          });
    },
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