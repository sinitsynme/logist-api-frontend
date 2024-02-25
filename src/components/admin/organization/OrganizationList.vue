<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between">
      <span>Список всех предприятий</span>

      <router-link to="/organizationCreate" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать предприятие</button>
      </router-link>
    </div>

    <div class="d-flex ml-auto mr-auto">
      <table class="table mt-4">
        <thead class="thead-dark">
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Название предприятия
          </th>
          <th></th>
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
            <router-link :to="{
              name: 'organization',
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
</template>

<script>

import OrganizationDataService from "@/services/OrganizationDataService";

export default {
  name: "organization-list",
  mounted() {
    this.getOrganizations()
  },
  data() {
    return {
      organizations: []
    }
  },

  methods: {
    getOrganizations() {
      OrganizationDataService
          .getPage(0, 15)
          .then(response => {
            this.organizations = response.data
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}

</script>


<style>
span {
  font-size: 28pt;
}
</style>