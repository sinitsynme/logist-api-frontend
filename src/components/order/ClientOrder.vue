<template>
  <div class="ml-4 mt-2">
    <router-link to="/cart">Вернуться в корзину</router-link>
  </div>

  <div class="text-center">
    <h2>Заказ от {{ new Date(order.createdAt).toLocaleDateString('ru-RU', dateOptions) }} со склада
      <router-link :to="{
            name: 'warehouse',
            params: {id: order.warehouseId}
          }">
        {{ warehouse.name }}
      </router-link>
    </h2>
  </div>

  <div class="container w-75 mt-4">

    <table class="table mt-1">
      <tbody>
      <tr>
        <td class="align-middle">
          <b>ID заказа</b>
        </td>
        <td class="align-middle">
          {{ order.id }}
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Итоговая стоимость заказа</b>
        </td>
        <td class="align-middle">
          <b>{{ order.finalSum }} ₽</b>
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Организация</b>
        </td>
        <td class="align-middle">
          <router-link :to="{
        name: 'ClientOrganization',
        params: {
          inn: clientOrganization.inn
        }}"> {{ clientOrganization.name }}
          </router-link>
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Адрес доставки</b>
        </td>
        <td class="align-middle">
          {{ orderAddress.stringified }}
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Статус</b>
        </td>
        <td class="align-middle" v-if="orderStatus">
          <span :class="['badge', orderStatus.style]">{{ orderStatus.screenName }}</span>
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Статус оплаты</b>
        </td>
        <td class="align-middle" v-if="paymentStatus">
          <span :class="['badge', paymentStatus.style]">{{ paymentStatus.screenName }}</span>
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Документы по заказу</b>
        </td>
        <td class="align-middle">
          <div v-for="document in documents" :key="document.name">
            <a :href="document.path">{{document.name}}</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <table class="table mt-1">
      <thead class="table-dark">
      <tr>
        <th></th>
        <th class=" cart-td">Наименование товара</th>
        <th class=" cart-td">Количество товара</th>
        <th class=" cart-td">Стоимость</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in order.orderItemList" :key="product.productId">
        <td class="align-middle cart-td">
          <router-link :to="{
            name: 'product',
            params: {id: product.productId}
          }">
            <img :src="product.imageLink" alt="У товара нет изображения" class="small-product-image">
          </router-link>
        </td>
        <td class="align-middle cart-td">
          <router-link :to="{
            name: 'product',
            params: {id: product.productId}
          }">
            {{ product.name }}
          </router-link>
        </td>
        <td class="align-middle cart-td">
          {{ product.quantity }}
        </td>
        <td class="align-middle cart-td">
          <b>{{ toFixed(product.quantity * product.price, 2) }} ₽</b>
        </td>
      </tr>
      </tbody>
    </table>



  </div>

</template>

<script>

import OrderDataService from "@/services/OrderDataService";
import WarehouseDataService from "@/services/WarehouseDataService";
import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";
import AddressDataService from "@/services/AddressDataService";
import ProductDataService from "@/services/ProductDataService";
import {toFixed} from "@/scripts/common";
import {mapOrderStatus, mapPaymentStatus} from "@/scripts/order/statuses";

export default {
  name: "ClientOrder",
  props: [
    'id'
  ],
  async mounted() {
    await this.fetchOrderData()
  },
  computed: {
    orderStatus() {
      return this.mapOrderStatus(this.order.status)
    },
    paymentStatus() {
      return this.mapPaymentStatus(this.order.paymentStatus)
    }
  },

  data() {
    return {
      order: {},
      warehouse: {},
      clientOrganization: {},
      orderAddress: {},
      documents: [],
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  },

  methods: {
    mapOrderStatus,
    mapPaymentStatus,
    toFixed,
    async fetchOrderData() {
      this.order = (await OrderDataService.get(this.id)).data
      console.log(this.order.status)

      let i
      for(i in this.order.orderItemList) {
        let product = this.order.orderItemList[i]
        ProductDataService.get(product.productId).then(
            response => {
              let responseData = response.data
              product.imageLink = responseData.link
              product.name = responseData.name
            }
        )
      }

      WarehouseDataService.get(this.order.warehouseId).then(
          response => this.warehouse = response.data
      )

      ClientOrganizationDataService.get(this.order.clientOrganizationInn).then(
          response => this.clientOrganization = response.data
      )

      this.orderAddress = this.order.actualOrderAddress
      AddressDataService.getAddressDataAxios(this.orderAddress.latitude, this.orderAddress.longitude).then(
          response => {
            let data = response.data
            let city = data.address.city
            let state = data.address.state
            let road = data.address.road
            let houseNumber = data.address.house_number;

            this.orderAddress.stringified = `${state}, ${city}, ${road}, ${houseNumber}`
          }
      )
      // this.documentLinks = this.order.documentResponseDtos
      this.documents = [
        {
          type: "RECEIPT", //REFUND_RECEIPT, INVOICE,
          path: "http://localhost:8081",
          name: "Кассовый чек от 2024-03-28"
        },
        {
          type: "INVOICE", //REFUND_RECEIPT, INVOICE,
          path: "http://localhost:8081",
          name: "Счёт-фактура от 2024-03-28"
        }
      ]

    }
  }
}
</script>


<style scoped>

td {
  border-top: none !important;
}

.cart-td {
  text-align: center;
}

.small-product-image {
  height: 110px;
}

.badge {
  padding: 5px 10px 5px 10px;
}

</style>