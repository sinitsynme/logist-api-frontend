<template>
  <table class="table mt-4">
    <thead class="thead-dark">
    <tr>
      <th class="text-left">
        Склад
      </th>
      <th class="text-left">
        Город
      </th>
      <th class="text-left">
        Стоимость 1 шт
      </th>
      <th class="text-left">
        Кратность
      </th>

      <th class="text-left">
        Количество
      </th>
      <th class="text-left">

      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="supplyItem in supplyList"
        :key="supplyItem.warehouseId"
    >
      <td>
        <router-link :to="{
          name: 'warehouse',
          params: {
            id: supplyItem.warehouseId
          }
        }">
          {{ supplyItem.name }}
        </router-link>
      </td>
      <td>{{ supplyItem.address }}</td>
      <td>{{ supplyItem.price }}</td>
      <td>{{ supplyItem.quantum }}</td>
      <td>
        <input type="number" :min="supplyItem.quantum" :value="supplyItem.quantum" :step="supplyItem.quantum" :max="supplyItem.availableForReserveQuantity">
      </td>
      <td>
        <button class="btn btn-primary">В корзину</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>


import WarehouseDataService from "@/services/WarehouseDataService";
import AddressDataService from "@/services/AddressDataService";
import StoredProductDataService from "@/services/StoredProductDataService";

export default {
  name: "AddItemToCartBar",
  props: [
      'productId'
  ],
  async mounted() {
    await this.loadSupplyInfo()
    await this.loadAdresses()

  },
  data() {
    return {
      supplyList: []
    }
  },

  methods: {
    async loadSupplyInfo() {
      this.supplyList = (await StoredProductDataService.getProductAvailabilityInfo(this.productId)).data.supplyList
    },

    async loadAdresses() {
      let i

      for (i in this.supplyList) {
        let supplyInfo = this.supplyList[i]
        let warehouse = (await WarehouseDataService.get(supplyInfo.warehouseId)).data

        supplyInfo.name = warehouse.name
        let warehouseAddress = warehouse.address

        let response = await AddressDataService.getAddressData(warehouseAddress.latitude, warehouseAddress.longitude);
        await response.json().then(data => {
              console.log(data)

              let city = data.address.city
              let state = data.address.state
              supplyInfo.address = `${city}, ${state}`
            })
      }
    }

  }
}
</script>


<style scoped>
</style>