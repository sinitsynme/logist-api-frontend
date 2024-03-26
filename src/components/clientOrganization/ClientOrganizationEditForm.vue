<template>
  <h2 class="text-center">Редактирование организации с ИНН {{clientOrganization.inn}}</h2>

  <div class="container mt-4 w-50">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="orgName">Наименование организации</label>
          <input v-model="clientOrganization.name" type="text" class="form-control" id="orgName"
                 placeholder="Наименование организации">
        </div>
        <div class="form-group">
          <label for="orgBik">БИК</label>
          <input v-model="clientOrganization.bik" type="text" class="form-control" id="orgBik"
                 placeholder="БИК">
        </div>
        <div class="form-group">
          <label for="orgClientAccount">Расчетный счет</label>
          <input v-model="clientOrganization.clientAccount" type="text" class="form-control" id="orgClientAccount"
                 placeholder="Расчетный счет">
        </div>
        <div class="form-group">
          <label for="orgBankName">Наименование банка</label>
          <input v-model="clientOrganization.bankName" type="text" class="form-control" id="orgBankName"
                 placeholder="Наименование банка">
        </div>
        <div class="form-group">
          <label for="orgCorrespondentAccount">Корреспондентский счет</label>
          <input v-model="clientOrganization.correspondentAccount" type="text" class="form-control"
                 id="orgCorrespondentAccount"
                 placeholder="Корреспондентский счет">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="updateClientOrganization(this.inn, clientOrganization)">Сохранить
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import {useAuthStore} from "@/stores/authStore";
import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";

export default {
  name: "ClientOrganizationEdit",
  props: [
    'inn'
  ],
  mounted() {
    this.fetchClientOrganization(this.inn)
  },
  data() {
    return {
      clientOrganization: {
        name: '',
        inn: '',
        bik: '',
        clientAccount: '',
        bankName: '',
        correspondentAccount: ''
      },
      authStore: useAuthStore()
    }
  },

  methods: {
    fetchClientOrganization(inn) {
      ClientOrganizationDataService
          .get(inn)
          .then(response => {
            let data = response.data;

            this.clientOrganization.inn = data.inn;
            this.clientOrganization.name = data.name;
            this.clientOrganization.bik = data.bik;
            this.clientOrganization.clientAccount = data.clientAccount;
            this.clientOrganization.bankName = data.bankName;
            this.clientOrganization.correspondentAccount = data.correspondentAccount;
          })
    },

    updateClientOrganization(inn, organization) {

      let requestBody = {
        clientId: this.authStore.user.userId,
        name: organization.name,
        bik: organization.bik,
        clientAccount: organization.clientAccount,
        bankName: organization.bankName,
        correspondentAccount: organization.correspondentAccount
      }
      ClientOrganizationDataService
          .edit(requestBody, inn)
          .then(response => {
            this.$router.push("/client/organizations/" + response.data.inn)
          })
    }
  }
}
</script>


<style scoped>

</style>