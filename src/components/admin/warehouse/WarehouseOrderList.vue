<template>
  <div class="d-flex justify-content-around mt-2">
    <h3 class="text-center">Заказы склада
      <router-link :to="{
            name: 'warehouse',
            params: {id: warehouseId}
          }">
        {{ warehouse.name }}
      </router-link>
    </h3>
  </div>

  <div class="container-fluid mt-1 d-flex">
    <div class="w-25">
      <div>
        <div>
          <b>Фильтровать по статусам</b>
          <div class="mt-2">
            <div v-for="status in statuses" :key="status" class="ml-2">
              <input type="checkbox" v-model="statusesFilter" :value="status"/>
              <label class="ml-2">{{ mapOrderStatus(status).screenName }}</label>
            </div>
          </div>
        </div>
        <button class="btn btn-outline-info" @click="clearFilter">Очистить фильтр</button>
        <button class="btn btn-outline-primary ml-2" @click="filterOrders">Фильтровать</button>
      </div>
    </div>

    <div>
      <div class="table-responsive mt-1">

        <table class="table" v-if="!isLoaded">
          <tbody>
          <tr>
            <td class="align-middle text-center">
              <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>
            <td class="align-middle">
              <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>

            <td class="align-middle">
              <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </td>

            <td class="align-middle text-center">
              <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div v-if="!isLoaded" class="skeleton mt-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="orders.length === 0 && isLoaded" class="text-center mt-5">
        <h5>Заказы не найдены</h5>
      </div>

      <div class="table-responsive mt-1">

        <table class="table">
          <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td class="align-middle text-center">
              <div>
                <router-link :to="{
            name: 'OrderManagement',
            params: {orderId: order.id}
          }">
                  Заказ от {{ new Date(order.createdAt).toLocaleDateString('ru-RU', dateOptions) }}
                </router-link>
              </div>
              <span :class="['badge', order.status.style]">{{ order.status.screenName }}</span>
            </td>

            <td class="align-middle">
              <router-link :to="{
            name: 'OrderManagement',
            params: {orderId: order.id}
          }">
                <div class="row">
                  <div class="img-thumbnail d-flex justify-content-center" style="width: 100px; height: 100px"
                       v-for="imageLink in order.productImageLinks" :key="imageLink">
                    <img class="order-card" alt="У товара нет изображения" :src="imageLink">
                  </div>
                  <div class="img-thumbnail d-flex justify-content-center align-items-center"
                       style="width: 100px; height: 100px"
                       v-if="order.orderItemList.length > 3">
                    +{{ order.orderItemList.length - 3 }}
                  </div>

                </div>
              </router-link>
            </td>

            <td class="align-middle text-center">
              <div>
                <b>{{ order.finalSum }} ₽</b>
              </div>
              <div>
                <span :class="['badge', order.paymentStatus.style]">{{ order.paymentStatus.screenName }}</span>
              </div>
            </td>

          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

</template>

<script>

import OrderDataService from "@/services/OrderDataService";
import {toFixed} from "@/scripts/common";
import {mapOrderStatus, mapPaymentStatus} from "@/scripts/order/statuses";
import {useAuthStore} from "@/stores/authStore";
import ProductDataService from "@/services/ProductDataService";
import {onMounted} from "vue";
import WarehouseDataService from "@/services/WarehouseDataService";

export default {
  name: "ClientOrderList",
  props: ['warehouseId'],

  async mounted() {
    this.isLoaded = false
    if (!this.authStore.user.isAuthenticated) {
      await this.$router.push("/login")
    } else {
      await this.fetchWarehouseData()
      await this.fetchOrderData()
      onMounted(() => {
        this.isLoaded = true
      })
      this.isLoaded = true
    }
  },


  computed: {},

  data() {
    return {
      authStore: useAuthStore(),
      clientOrganizations: [],
      warehouse: {},
      orders: [],
      isLoaded: false,
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      currentPage: 0,
      isLastPage: false,
      statuses: [
        'NEW',
        'IN_PROGRESS',
        'READY_TO_DELIVER',
        'DELIVERY',
        'DONE',
        'REJECTED',
        'RETURNED',
        'PARTIALLY_RETURNED',
        'ABORTED'
      ],
      statusesFilter: [
        'NEW',
        'IN_PROGRESS',
        'READY_TO_DELIVER',
        'DELIVERY',
        'DONE',
        'REJECTED',
        'RETURNED',
        'PARTIALLY_RETURNED',
        'ABORTED'
      ]
    }
  },

  methods: {
    mapOrderStatus,
    mapPaymentStatus,
    toFixed,

    getNextOrders() {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 1;
        if (bottomOfWindow && !this.isLastPage) {
          await this.fetchOrderData(this.chosenAddressId)
        }
      }
    },

    async fetchWarehouseData() {
      this.warehouse = (await WarehouseDataService.get(this.warehouseId)).data
    },

    async fetchOrderData() {

      let ordersResponse = (await OrderDataService.getByWarehouseIdWithStatuses(this.warehouseId, this.statusesFilter, {
        page: this.currentPage,
        size: 30,
        sortByFields: ['createdAt'],
        sortFromMaxToMin: true
      })).data

      this.currentPage++


      let warehouseOrders = ordersResponse.content

      this.isLastPage = ordersResponse.last

      let j
      for (j in warehouseOrders) {
        let i = 0
        let order = warehouseOrders[j]
        order.productImageLinks = []
        order.status = mapOrderStatus(order.status)
        order.paymentStatus = mapPaymentStatus(order.paymentStatus)

        for (let product of order.orderItemList) {
          if (i < 3) {
            let response = (await ProductDataService.get(product.productId)).data
            order.productImageLinks.push(response.link)
            i++
          }
        }
      }

      for (let order of warehouseOrders) {
        this.orders.push(order)
      }

      console.log(this.orders)
    },

    clearFilter() {
      this.statusesFilter = []
    },

    async filterOrders() {
      this.currentPage = 0
      this.orders = []
      this.isLoaded = false
      this.isLastPage = false
      await this.fetchOrderData()
      this.isLoaded = true
    }
  },


}
</script>


<style scoped>


.badge {
  padding: 5px 10px 5px 10px;
}

.order-card {
  max-height: 100%;
  width: auto;
}

.skeleton {
  background: #3a3a3a;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 0.5s shine linear infinite running;
}

.align-middle {

}

</style>