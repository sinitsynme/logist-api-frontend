<template>
  <div class="ml-4 mt-2">
    <router-link to="/cart">Вернуться в корзину</router-link>
  </div>

  <div class="text-center">
    <h2>Оформление заказа со склада
      <router-link :to="{
            name: 'warehouse',
            params: {id: warehouse.id}
          }">
        {{ warehouse.name }}
      </router-link>
    </h2>
  </div>

  <div class="container w-75 mt-4">
    <table class="table">
      <thead class="table-dark">
      <tr>
        <th></th>
        <th class=" cart-td">Наименование товара</th>
        <th class=" cart-td">Количество товара</th>
        <th class=" cart-td">Стоимость</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in order.products" :key="product.id">
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

    <table class="table mt-1">
      <tbody>
      <tr>
        <td class="align-middle">
          <b>Итоговая стоимость заказа</b>
        </td>
        <td class="align-middle">
          <b>{{ toFixed(order.sum, 2) }} ₽</b>
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Организация</b>
        </td>
        <td class="align-middle">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <router-link to="/client/organizations" v-if="noOrganization && isLoaded">
            Зарегистрируйте первую организацию
          </router-link>
          <select @change="clearAddressId" class="form-select p-2" v-model="chosenOrganizationInn" v-else-if="isLoaded">
            <option v-for="org in clientOrganizations" v-bind:value="org.inn" :key="org.inn">
              {{ org.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="align-middle">
          <b>Адрес организации для доставки</b>
        </td>
        <td class="align-middle">
          <div v-if="!isLoaded" class="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div v-if="chosenOrganizationInn === '' && isLoaded">
            <b>Выберите организацию</b>
          </div>
          <div v-else>
            <div v-if="noOrganizationAddress && isLoaded">
              <router-link :to="{
            name: 'ClientOrganization',
            params: {inn: chosenOrganizationInn}
          }">
                Добавьте первый адрес для этой организации
              </router-link>
            </div>
            <select v-else-if="isLoaded" class="form-select p-2" v-model="chosenAddressId">
              <option v-for="address in chosenOrganizationAddresses" v-bind:value="address.id" :key="address.id">
                {{ getStringifiedAddress(address).stringified }}
              </option>
            </select>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center">
      <AlertComponent :message="alertMessage" :is-error="isErrorAlert" v-if="isAlertShown"/>
    </div>

    <div class="text-center mt-1 mb-3">
      <button @click="registerOrder" class="btn-outline-primary btn" v-if="isOrderReady">Оформить</button>
      <b v-else class="text-danger">Заполните необходимые данные для оформления заказа</b>
    </div>
  </div>

</template>

<script>


import {useCartStore} from "@/stores/cartStore";
import {useAuthStore} from "@/stores/authStore";
import AlertComponent from "@/components/common/AlertComponent.vue";
import {useAlertStore} from "@/stores/alertStore";
import WarehouseDataService from "@/services/WarehouseDataService";
import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";
import AddressDataService from "@/services/AddressDataService";
import OrderDataService from "@/services/OrderDataService";
import {toFixed} from "../../scripts/common";

export default {
  name: "OrderConfirmation",
  components: {AlertComponent},

  async mounted() {
    if (!this.authStore.user.isAuthenticated) {
      await this.$router.push("/login")
    }
    else {
      await this.getPreparedOrder()
      await this.fetchClientOrganizations()
      await this.fetchAllAddressData()
    }
  },
  computed: {
    isAlertShown() {
      return this.alertStore.isShown
    },
    isErrorAlert() {
      return this.alertStore.isError
    },
    alertMessage() {
      return this.alertStore.message
    },
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
    isOrderReady() {
      return this.chosenOrganizationInn !== '' && this.chosenAddressId !== ''
    }

  },

  data() {
    return {
      order: {},
      alertStore: useAlertStore(),
      authStore: useAuthStore(),
      cartStore: useCartStore(),
      warehouse: {},
      clientOrganizations: [],
      chosenOrganizationInn: '',
      stringifiedOrganizationAddresses: [],
      chosenAddressId: '',
      isLoaded: false
    }
  },

  methods: {
    toFixed,

    async getPreparedOrder() {
      this.order = await useCartStore().confirmedOrder

      if (typeof this.order.products === "undefined") {
        await this.$router.push("/cart")
      } else {
        this.warehouse = (await WarehouseDataService.get(this.order.warehouseId)).data
      }
    },

    async fetchClientOrganizations() {
      this.isLoaded = false
      let userId = this.authStore.user.userId;
      this.clientOrganizations = (await ClientOrganizationDataService.getPageByClientId(userId, 0, 30)).data.content
      this.chosenOrganizationInn = this.clientOrganizations[0].inn
      this.chosenAddressId = this.clientOrganizations[0].addressResponseDto[0].id
      this.isLoaded = true
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

    async registerOrder() {

      let itemRequestDto = this.order.products.map(function (product) {
        return {
          productId: product.productId,
          quantity: product.quantity
        }
      })

      let requestBody = {
        "clientOrganizationInn": this.chosenOrganizationInn,
        "warehouseId": this.warehouse.id,
        "addressId": this.chosenAddressId,
        "itemRequestDto": itemRequestDto
      }

      console.log(this.order.warehouseId)
      let response = (await OrderDataService.create(requestBody)).data
      if (response.id) {
        await this.cartStore.removeWarehouseFromCart(this.order.warehouseId)
        alert("Заказ успешно оформлен")
        await this.$router.push(`/orders/${response.id}`)
      }
    },

    getStringifiedAddress(address) {
      return this.stringifiedOrganizationAddresses.find(it => it.id === address.id)
    },

    clearAddressId() {
      this.chosenAddressId = '';
      this.chosenAddressId = this.clientOrganizations.find(it => it.inn === this.chosenOrganizationInn).addressResponseDto[0].id
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

.skeleton {
  background: #3a3a3a;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 0.5s shine linear infinite running;
}

</style>