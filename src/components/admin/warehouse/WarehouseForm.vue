<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Создание склада</h2>

    <div class="mt-3">

      <form @submit.prevent="onsubmit">
          <div class="form-group">
            <label for="warehouseName">Название склада</label>
            <input v-model="warehouse.name" type="text" class="form-control" id="warehouseName"
                   placeholder="Название склада">
          </div>
          <div class="form-group">
            <label for="warehouseContact">Контактный номер телефона</label>
            <input v-model="warehouse.contactNumber" type="text" class="form-control" id="warehouseContact"
                   placeholder="Контактный номер телефона">
          </div>
          <div class="form-group">
            <label for="warehouseEmail">E-mail</label>
            <input v-model="warehouse.email" type="email" class="form-control" id="warehouseEmail"
                   placeholder="E-mail">
          </div>
          <div class="form-group">
            <label for="organizationId">ID предприятия</label>
            <input v-model="warehouse.organization.id" type="number" class="form-control" id="organizationId"
                   placeholder="ID предприятия">
          </div>
          <div class="form-group">
            <label for="addressLatitude">Широта адреса</label>
            <input v-model="warehouse.address.latitude" type="number" step="0.000001" class="form-control"
                   id="addressLatitude"
                   placeholder="Широта адреса">
          </div>
          <div class="form-group">
            <label for="addressLongitude">Долгота адреса</label>
            <input v-model="warehouse.address.longitude" type="number" step="0.000001" class="form-control"
                   id="addressLongitude"
                   placeholder="Долгота адреса">
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary" @click="saveWarehouse(warehouse)">Сохранить</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>

import WarehouseDataService from "@/services/WarehouseDataService";

export default {
  name: "warehouseForm",
  mounted() {
  },
  data() {
    return {
      warehouse: {
        id: 0,
        name: '',
        contactNumber: '',
        email: '',
        address: {
          latitude: 0.000001,
          longitude: 0.000001,
        },
        organization: {
          id: 0
        }
      },
    }
  },

  methods: {
    saveWarehouse(warehouse) {
      console.log(warehouse)
      let requestBody = {
        name: this.warehouse.name,
        contactNumber: this.warehouse.contactNumber,
        email: this.warehouse.email,
        addressRequestDto: {
          latitude: this.warehouse.address.latitude,
          longitude: this.warehouse.address.longitude,
        },
        organizationId: this.warehouse.organization.id
      }
      WarehouseDataService
          .create(requestBody)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/warehouse/" + response.data.id)
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}
</script>


<style scoped>

</style>