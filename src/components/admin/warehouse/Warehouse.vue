<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between">
    <h2 class="text-center">Просмотр информации о складе</h2>
      <router-link v-if="isManagementMode" :to="{
        name: 'WarehouseOrderList',
        params: {
          warehouseId: id
        }}"
      >
        <button class="btn btn-outline-secondary">
          Просмотр заказов склада
        </button>
      </router-link>
      <router-link v-if="isManagementMode" :to="{
        name: 'storedProductList',
        params: {
          warehouseId: id
        }}"
    >
      <button class="btn btn-outline-info">
        Просмотр товаров на складе
      </button>
    </router-link>
    </div>

    <div class="d-flex mt-3 ">
      <div class="border border-dark mr-2">
        <MapComponent :lat="lat" :lng="lng"/>
      </div>
      <table class="table w-50">
        <tbody>
        <tr>
          <td>
            <b>ID</b>
          </td>
          <td>
            {{ warehouse.id }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Название</b>
          </td>
          <td>
            {{ warehouse.name }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Контактный номер</b>
          </td>
          <td>
            {{ warehouse.contactNumber }}
          </td>
        </tr>
        <tr>
          <td>
            <b>E-mail</b>
          </td>
          <td>
            {{ warehouse.email }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Адрес склада</b>
            <p>
              <small>Работает неточно</small>
            </p>

          </td>
          <td>
            {{ addressDisplayName }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Предприятие</b>
          </td>
          <td>
            <router-link :to="{
              name: 'organization',
              params: {
               id: warehouse.organization.id
             }
              }">
              {{ warehouse.organization.name }}
            </router-link>
            <button class="btn btn-outline-info ml-3">Скачать прайс-лист</button>
          </td>

        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isManagementMode"  class="d-flex justify-content-between p-5">
      <router-link  :to="{
        name: 'warehouseFormEdit',
        params: {
          id: id
        }}"
      >
        <button class="btn btn-outline-primary">
          Редактировать
        </button>
      </router-link>

      <button class="btn btn-outline-danger" @click="deleteWarehouse">Удалить</button>
    </div>
  </div>


</template>

<script>

import MapComponent from "@/components/admin/warehouse/map/MapComponent.vue";
import WarehouseDataService from "@/services/WarehouseDataService";
import {useModeStore} from "@/stores/modeStore";

export default {
  name: "warehouse",
  components: {MapComponent},
  props: [
    'id'
  ],
  computed: {
    mode() {
      return this.modeStore.mode
    },
    isShopMode() {
      return this.modeStore.isShopMode()
    },
    isManagementMode() {
      return this.modeStore.isManagementMode()
    }
  },
  created() {
    this.getWarehouse()
  },
  data() {
    return {
      addressDisplayName: '',
      lat: 0,
      lng: 0,
      warehouse: {
        id: 0,
        name: '',
        contactNumber: '',
        email: '',
        address: {},
        organization: {}
      },
      modeStore: useModeStore()
    }
  },

  methods: {
    getWarehouse() {
      WarehouseDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            this.lat = response.data.address.latitude
            this.lng = response.data.address.longitude
            this.warehouse.id = data.id
            this.warehouse.name = data.name
            this.warehouse.contactNumber = data.contactNumber
            this.warehouse.email = data.email
            this.warehouse.address = data.address
            this.warehouse.organization = data.organization
            console.log(this.warehouse)
            this.initAddressDisplayName(this.lat, this.lng)
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteWarehouse() {
      WarehouseDataService
          .delete(this.id)
          .then(response => {
            console.log(response)
            this.$router.push("/warehouse")
          })
          .catch(e => {
            console.log(e);
          });
    },

    async initAddressDisplayName(lat, lng) {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`);
      await response.json().then(
          (data) => {
            this.addressDisplayName = data.display_name
          })
    }
  }
}
</script>


<style scoped>
</style>