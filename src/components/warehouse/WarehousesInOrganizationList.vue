<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between text-center">
      <span>Список всех складов организации "{{ organization.name }}"</span>

      <router-link to="/warehouseCreate" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать склад</button>
      </router-link>
    </div>
  </div>

  <div v-if="noWarehouses" class="text-center mt-5">
    <h4 >В организации нет складов</h4>
    <div class="mt-2">
      <router-link to="/warehouseCreate">
        Зарегистрировать новый склад
      </router-link>
    </div>
  </div>


  <div style="width: 90%; margin: auto" v-else>
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
import OrganizationDataService from "@/services/OrganizationDataService";

export default {
  name: "warehouse-list-in-organization",
  props: ['organizationId'],

  mounted() {
    this.getWarehouses()
  },
  computed: {
    noWarehouses() {
      return this.warehouses.length === 0
    }
  },
  data() {
    return {
      organization: {},
      warehouses: []
    }
  },

  methods: {
    async getWarehouses() {

      await OrganizationDataService
          .get(this.organizationId)
          .then(response => {
            this.organization = response.data
          })

      await WarehouseDataService
          .getPageByOrganizationId(this.organizationId, 0, 50)
          .then(response => {
            this.warehouses = response.data.content
            console.log(response.data.content);
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