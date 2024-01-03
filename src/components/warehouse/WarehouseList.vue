<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between text-center">
      <span>Список всех складов</span>

      <router-link to="/warehouseCreate" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать склад</button>
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
            Название
          </th>
          <th class="text-left">
            Предприятие
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="warehouse in warehouses"
            :key="warehouse.id"
        >
          <td>{{ warehouse.id }}</td>
          <td>{{ warehouse.name }}</td>
          <td>
            <router-link :to="{
              name: 'organization',
              params: {
               id: warehouse.organization.id
             }
              }">
              {{ warehouse.organization.name }}
            </router-link>
          </td>
          <td>
            <router-link :to="{
              name: 'warehouse',
              params: {
               id: warehouse.id
             }
              }">
              <button class="btn btn-primary">
                Просмотр
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

import WarehouseDataService from "@/services/WarehouseDataService";

export default {
  name: "warehouse-list",

  mounted() {
    this.getWarehouses()
  },
  data() {
    return {
      warehouses: []
    }
  },

  methods: {
    getWarehouses() {
      WarehouseDataService
          .getPage(0, 15)
          .then(response => {
            this.warehouses = response.data
            console.log(response.data);
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

</style>