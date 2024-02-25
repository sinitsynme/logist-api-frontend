<template>
  <div class="container mt-3">
    <h2 class="text-center">Просмотр информации о предприятии</h2>
    <table class="table mt-3">
      <tbody>
      <tr>
        <td>
          <b>ID</b>
        </td>
        <td>
          {{ organization.id }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Название предприятия</b>
        </td>
        <td>
          {{ organization.name }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between p-5">
      <router-link :to="{
        name: 'organizationFormEdit',
        params: {
          id: id
        }}"
      >
        <button class="btn btn-outline-primary">
          Редактировать
        </button>
      </router-link>

      <button class="btn btn-outline-danger" @click="deleteOrganization">Удалить</button>
    </div>
  </div>


</template>

<script>

import OrganizationDataService from "@/services/OrganizationDataService";

export default {
  name: "organization",
  props: [
    'id'
  ],
  mounted() {
    this.getOrganization()
  },
  data() {
    return {
      organization: {
        id: '',
        name: '',
      }
    }
  },

  methods: {
    getOrganization() {
      OrganizationDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.organization.id = data.id;
            this.organization.name = data.name;
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteOrganization() {
      OrganizationDataService
          .delete(this.id)
          .then(response => {
            console.log(response)
            this.$router.push("/organization")
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