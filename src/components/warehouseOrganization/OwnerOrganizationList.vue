<template>

  <div class="justify-content-around mt-2">
    <div class="d-flex justify-content-around">
      <span>Список ваших складских предприятий</span>

      <router-link to="/organizationRequest" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Подать заявку на новое предприятие</button>
      </router-link>
    </div>

    <div style="width: 75%; margin: auto" class="mt-3">
      <div class="table-responsive d-flex justify-content-around">
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
import {useAuthStore} from "@/stores/authStore";

export default {
  name: "organization-list",
  mounted() {
    this.getOrganizations()
  },
  data() {
    return {
      authStore: useAuthStore(),
      organizations: [],
    }
  },

  methods: {
    mapOrganizationStatus,
    getOrganizations() {
      let statuses = ["NEW", "APPROVED", "REJECTED", "CLOSED"]
      let ownerId = this.authStore.user.userId
      OrganizationDataService
          .getPageByOwner(statuses, ownerId,0, 100)
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