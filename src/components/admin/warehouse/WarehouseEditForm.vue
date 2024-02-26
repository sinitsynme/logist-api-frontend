<template>
  <div class="container mt-3">
    <h2 class="text-center mt-3">Редактирование склада с ID = {{ id }}</h2>
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
        <input v-model="warehouse.address.latitude" type="number" step="0.000001" class="form-control" id="addressLatitude"
               placeholder="Широта адреса">
      </div>
      <div class="form-group">
        <label for="addressLongitude">Долгота адреса</label>
        <input v-model="warehouse.address.longitude" type="number" step="0.000001" class="form-control" id="addressLongitude"
               placeholder="Долгота адреса">
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary" @click="editWarehouse(warehouse, id)">Редактировать</button>
      </div>
    </form>
  </div>
</template>

<script>


import WarehouseDataService from "@/services/WarehouseDataService";

export default {
  name: "warehouseEdit",
  props: [
    'id'
  ],
  mounted() {
    this.getWarehouse()
  },
  data() {
    return {
      warehouse: {
        id: 0,
        name: '',
        contactNumber: '',
        email: '',
        address: {
          latitude: 0,
          longitude: 0,
        },
        organization: {
          id: 0
        }
      },
    }
  },

  methods: {
    getWarehouse() {
      WarehouseDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            this.warehouse.id = data.id
            this.warehouse.name = data.name
            this.warehouse.contactNumber = data.contactNumber
            this.warehouse.email = data.email
            this.warehouse.address = data.address
            this.warehouse.organization = data.organization
            console.log(this.warehouse)
          })
          .catch(e => {
            console.log(e);
          });
    },
    editWarehouse(product, id) {
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
          .edit(requestBody, id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/warehouse/" + id)
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
<script setup>
</script>