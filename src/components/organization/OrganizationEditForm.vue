<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center mt-3">Редактирование предприятия с ID = {{ id }}</h2>
    <form @submit.prevent="onsubmit" class="mt-3">
      <div class="form-group">
        <label for="manufacturerName">Название предприятия</label>
        <input v-model="organization.name" type="text" class="form-control" id="manufacturerName"
               placeholder="Производитель">
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary" @click="editOrganization(organization, id)">Редактировать</button>
      </div>
    </form>
  </div>
</template>

<script>
import OrganizationDataService from "@/services/OrganizationDataService";

export default {
  name: "manufacturer",
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
    editOrganization(organization, id) {
      let requestBody = {
        name: organization.name,
      }
      OrganizationDataService
          .edit(requestBody, id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/organization/" + id)
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