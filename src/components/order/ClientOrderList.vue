<template>
  <div class="d-flex justify-content-around mt-2">
    <h3 class="text-center">Ваши заказы</h3>
  </div>
  <div class="container mt-1">
<!--    move skeletons to another components  -->
    <table class="table mt-1" v-if="!isLoaded">
      <tbody>
      <tr>
        <td class="align-middle">
          <b>Организация</b>
        </td>
        <td class="align-middle">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </td>
        <td class="align-middle">
          <b>Адрес организации</b>
        </td>
        <td class="align-middle">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </td>
      </tr>
      </tbody>
    </table>

    <table class="table mt-1" v-if="!isLoaded">
      <tbody>
      <tr>
        <td class="align-middle text-center">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;</div>
        </td>
        <td class="align-middle">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;</div>
        </td>

        <td class="align-middle">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;</div>
        </td>

        <td class="align-middle text-center">
          <div v-if="!isLoaded" class="skeleton">&nbsp;</div>
          <div v-if="!isLoaded" class="skeleton mt-3">&nbsp;&nbsp;</div>
        </td>

      </tr>
      </tbody>
    </table>


    <table class="table mt-1" v-if="isLoaded">
      <tbody>
      <tr>
        <td class="align-middle">
          <b>Организация</b>
        </td>
        <td class="align-middle">
          <router-link to="/client/organizations" v-if="noOrganization">
            Зарегистрируйте первую организацию
          </router-link>
          <select @change="changeOrganization" class="form-select p-2" v-model="chosenOrganizationInn" v-else>
            <option v-for="org in clientOrganizations" v-bind:value="org.inn" :key="org.inn">
              {{ org.name }}
            </option>
          </select>
        </td>
        <td class="align-middle">
          <b>Адрес организации</b>
        </td>
        <td class="align-middle">
          <div v-if="chosenOrganizationInn === ''">
            <b>Выберите организацию</b>
          </div>
          <div v-else>
            <div v-if="noOrganizationAddress">
              <router-link :to="{
            name: 'ClientOrganization',
            params: {inn: chosenOrganizationInn}
          }">
                Добавьте первый адрес для этой организации
              </router-link>
            </div>
            <select v-else class="form-select p-2" v-model="chosenAddressId">
              <option v-for="address in chosenOrganizationAddresses" v-bind:value="address.id" :key="address.id">
                {{ getStringifiedAddress(address).stringified }}
              </option>
            </select>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="!noAddressChosen && noOrganizationByAddressOrders && isLoaded" class="text-center mt-5">
      <h5>По выбранному адресу доставки заказы не найдены</h5>
    </div>
    <table class="table mt-1" v-else-if="!noAddressChosen && !noOrganizationByAddressOrders && isLoaded">
      <tbody>


      <tr v-for="order in organizationAddressOrders" :key="order.id">
        <td class="align-middle text-center">
          <span :class="['badge', order.status.style]">{{ order.status.screenName }}</span>
        </td>
        <td class="align-middle">
          <div>
            <router-link :to="{
            name: 'ClientOrder',
            params: {id: order.id}
          }">
              Заказ от {{ new Date(order.createdAt).toLocaleDateString('ru-RU', dateOptions) }}
            </router-link>
          </div>
          <div class="mt-3">
            <b>Склад: </b>
            <router-link :to="{
            name: 'warehouse',
            params: {id: order.warehouseId}
          }">
              {{ order.warehouse.name }}
            </router-link>
          </div>
        </td>

        <td class="align-middle">
          <router-link :to="{
            name: 'ClientOrder',
            params: {id: order.id}
          }">
            <div class="row">
              <div class="img-thumbnail d-flex justify-content-center" style="width: 100px; height: 100px"
                   v-for="imageLink in order.productImageLinks" :key="imageLink">
                <img class="order-card" alt="У товара нет изображения" :src="imageLink">
              </div>
              <div class="img-thumbnail d-flex justify-content-center align-items-center" style="width: 100px; height: 100px"
                   v-if="order.orderItemList.length > 3" >
                +{{order.orderItemList.length - 3}}
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

    <div v-if="moreOrdersAreLoading" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>


    <div v-if="noAddressChosen" class="text-center mt-5">
      <h5>Выберите организацию и её адрес для просмотра заказов</h5>
    </div>
  </div>

</template>

<script>

import OrderDataService from "@/services/OrderDataService";
import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";
import AddressDataService from "@/services/AddressDataService";
import {toFixed} from "@/scripts/common";
import {mapOrderStatus, mapPaymentStatus} from "@/scripts/order/statuses";
import {useAuthStore} from "@/stores/authStore";
import ProductDataService from "@/services/ProductDataService";
import WarehouseDataService from "@/services/WarehouseDataService";
import {onMounted} from "vue";

export default {
  name: "ClientOrderList",

  async mounted() {
    this.isLoaded = false
    if (!this.authStore.user.isAuthenticated) {
      await this.$router.push("/login")
    } else {
      await this.fetchClientOrganizations()
      await this.fetchAllAddressData()
      onMounted(() => {
        this.isLoaded = true
      })
    }
    this.getNextOrders()
  },


  computed: {
    chosenOrganizationAddresses() {
      let chosenInn = this.chosenOrganizationInn
      return (this.clientOrganizations.find(function (org) {
        return org.inn === chosenInn
      }) || {addressResponseDto: []}).addressResponseDto
    },
    noOrganization() {
      return this.clientOrganizations.length === 0
    },
    noOrganizationAddress() {
      return this.chosenOrganizationInn !== '' && this.chosenOrganizationAddresses.length === 0
    },
    noAddressChosen() {
      return this.chosenAddressId === ''
    },
    noOrganizationByAddressOrders() {
      return this.organizationAddressOrders.length === 0
    }
  },

  data() {
    return {
      authStore: useAuthStore(),
      clientOrganizations: [],
      chosenOrganizationInn: '',
      stringifiedOrganizationAddresses: [],
      chosenAddressId: '',
      isLoaded: false,
      moreOrdersAreLoading: false,
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      organizationAddressOrders: [],
      currentPage: 0,
      isLastPage: false,
    }
  },

  watch: {
    chosenAddressId: async function (addressId) {
      if (!addressId) return
      this.currentPage = 0
      this.isLastPage = false
      this.isLoaded = false
      this.organizationAddressOrders = []
      await this.fetchOrderData(addressId)
      this.isLoaded = true
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
          this.moreOrdersAreLoading = true
          await this.fetchOrderData(this.chosenAddressId)
          this.moreOrdersAreLoading = false
        }
      }
    },

    async fetchClientOrganizations() {
      let userId = this.authStore.user.userId;
      this.clientOrganizations = (await ClientOrganizationDataService.getPageByClientId(userId, 0, 30)).data.content
      if (this.clientOrganizations.length > 0) {
        this.chosenOrganizationInn = this.clientOrganizations[0].inn
        this.chosenAddressId = this.clientOrganizations[0].addressResponseDto[0].id
      } else {
        this.isLoaded = true
      }
    },

    async fetchAllAddressData() {
      let stringifiedAddresses = []
      let i, j, address
      for (i in this.clientOrganizations) {
        let addressList = this.clientOrganizations[i].addressResponseDto
        for (j in addressList) {
          address = addressList[j]
          let response = (await AddressDataService.getAddressDataAxios(address.latitude, address.longitude)).data

          let city = response.address.city
          let state = response.address.state
          let road = response.address.road
          let houseNumber = response.address.house_number;

          address.stringified = `${state}, ${city}, ${road}, ${houseNumber}`

          stringifiedAddresses.push(address)
        }
      }

      this.stringifiedOrganizationAddresses = stringifiedAddresses
    },

    async fetchOrderData(addressId) {

      let ordersResponse = (await OrderDataService.getByAddressId(addressId, {
        page: this.currentPage,
        size: 30,
        sortByFields: ['createdAt'],
        sortFromMaxToMin: true
      })).data

      this.currentPage++


      let organizationAddressOrders = ordersResponse.content

      this.isLastPage = ordersResponse.last

      let j
      for (j in organizationAddressOrders) {
        let i = 0
        let order = organizationAddressOrders[j]
        order.productImageLinks = []
        order.warehouse = (await WarehouseDataService.get(order.warehouseId)).data
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

      for (let order of organizationAddressOrders) {
        this.organizationAddressOrders.push(order)
      }

      console.log(this.organizationAddressOrders)
    },

    getStringifiedAddress(address) {
      return this.stringifiedOrganizationAddresses.find(it => it.id === address.id)
    },

    changeOrganization() {
      this.chosenAddressId = ''
      if (this.clientOrganizations.length > 0) {
        this.chosenAddressId = this.clientOrganizations.find(it => it.inn === this.chosenOrganizationInn).addressResponseDto[0].id
      }
    }
  }
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

</style>