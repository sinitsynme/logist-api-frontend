<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Создание складского предприятия</h2>

    <div class="mt-3">

    <form @submit.prevent="onsubmit">
      <div class="form-group">
        <label for="manufacturerName">Название предприятия</label>
        <input v-model="organization.name" type="text" class="form-control" id="manufacturerName" placeholder="Производитель">
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary" @click="saveOrganization(organization)">Сохранить</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import OrganizationDataService from "@/services/OrganizationDataService";

export default {
  name: "organization",
  mounted() {
  },
  data() {
    return {
      organization: {
        ownerId: '',
        status: '',
        id: '',
        name: '',
        inn: '',
        bik: '',
        clientAccount: '',
        bankName: '',
        correspondentAccount: ''
      }
    }
  },

  methods: {
    saveOrganization(organization) {
      let requestBody = {
        name: organization.name,
      }
      OrganizationDataService
          .create(requestBody)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/organization/" + data.id)
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