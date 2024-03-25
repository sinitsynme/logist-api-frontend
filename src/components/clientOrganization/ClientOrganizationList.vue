<template>
  <div class="d-flex justify-content-around mt-3">
    <h3 class="text-center">Ваши организации</h3>
    <router-link to="/client/organizations/create">
      <button class="btn btn-outline-primary">Зарегистрировать новую организацию</button>
    </router-link>
  </div>
  <div class="container mt-3">
    <div v-if="noClientOrganizations" class="text-center mt-5">
      <h4>
        Сейчас у вас нет организаций
      </h4>
      <div class="mt-2">
        <router-link to="/client/organizations/create">
          Зарегистрировать новую организацию
        </router-link>
      </div>

    </div>
    <div v-else>
      <table class="table">
        <thead>
        <tr>
          <th>
            ИНН
          </th>
          <th>
            Наименование
          </th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="org in clientOrganizations" :key="org.inn">
          <td>
            <router-link :to="{
        name: 'ClientOrganization',
        params: {
          inn: org.inn
        }}">
              {{ org.inn }}
            </router-link>
          </td>
          <td>
            <router-link :to="{
        name: 'ClientOrganization',
        params: {
          inn: org.inn
        }}">              {{ org.name }}
            </router-link>
          </td>

        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

import {useAuthStore} from "@/stores/authStore";
import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";


export default {
  name: "ClientOrganizations",

  async mounted() {
    await this.fetchClientOrganizations()
  },

  data() {
    return {
      clientOrganizations: [],
      authStore: useAuthStore()
    }
  },

  computed: {
    noClientOrganizations() {
      return this.clientOrganizations.length === 0
    }
  },

  methods: {

    async fetchClientOrganizations() {
      let clientId = this.authStore.user.userId
      this.clientOrganizations = (await ClientOrganizationDataService.getPageByClientId(clientId, 0, 30)).data.content
      console.log(this.clientOrganizations)
    }

  }
}

</script>


<style>
</style>