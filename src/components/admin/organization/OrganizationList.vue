<template>

  <div class="justify-content-around mt-2">
    <div class="d-flex justify-content-around">
      <span>Список всех складских предприятий</span>

      <router-link to="/organizationRequest" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать предприятие</button>
      </router-link>
    </div>

    <div class="container-fluid mt-2 d-flex ml-3 mr-3 justify-content-around">
      <div class="w-25">
        <div>
          <div>
            <b>Фильтровать по статусам</b>
            <div class="mt-2">
              <div v-for="status in statuses" :key="status" class="ml-2">
                <input type="checkbox" v-model="statusesFilter" :value="status"/>
                <label class="ml-2">{{ mapOrganizationStatus(status).screenName }}</label>
              </div>
            </div>
          </div>
          <button class="btn btn-outline-info" @click="clearFilter">Очистить фильтр</button>
          <button class="btn btn-outline-primary ml-2" @click="getOrganizations">Фильтровать</button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table mt-2">
          <thead class="thead-dark">
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Название предприятия
            </th>
            <th class="text-left">
              Статус
            </th>
            <th>Действие</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="organization in organizations"
              :key="organization.id"
          >
            <td>{{ organization.id }}</td>
            <td>{{ organization.name }}</td>
            <td>
            <span v-if="organization.status.style"
                  :class="['badge', organization.status.style]">{{ organization.status.screenName }}</span>
            </td>
            <td>
              <router-link :to="{
              name: 'adminOrganization',
              params: {
               id: organization.id
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
  </div>
</template>

<script>

import OrganizationDataService from "@/services/OrganizationDataService";
import {mapOrganizationStatus} from "@/scripts/warehouseOrganization/statuses";

export default {
  name: "organization-list",
  mounted() {
    this.getOrganizations()
  },
  data() {
    return {
      organizations: [],
      statuses: ["NEW", "APPROVED", "REJECTED", "CLOSED"],
      statusesFilter: ["NEW", "APPROVED", "REJECTED", "CLOSED"],
    }
  },

  methods: {
    mapOrganizationStatus,
    getOrganizations() {
      let statuses = this.statusesFilter
      OrganizationDataService
          .getPage(statuses, 0, 100)
          .then(response => {
            this.organizations = response.data.content

            let i
            for (i in this.organizations) {
              this.organizations[i].status = mapOrganizationStatus(this.organizations[i].status)
            }
            console.log(response.data.content);
          })
          .catch(e => {
            console.log(e);
          });
    },
    clearFilter() {
      this.statusesFilter = []
    }
  }
}

</script>


<style>
span {
  font-size: 28pt;
}
</style>