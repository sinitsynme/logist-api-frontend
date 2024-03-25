<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Регистрация новой организации</h2>

    <div class="mt-3">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="orgInn">ИНН</label>
          <input v-model="clientOrganization.inn" type="text" class="form-control" id="orgInn"
                 placeholder="ИНН">
        </div>
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
          <input v-model="clientOrganization.correspondentAccount" type="text" class="form-control" id="orgCorrespondentAccount"
                 placeholder="Корреспондентский счет">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="saveClientOrganization(clientOrganization)">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/authStore";
import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";

export default {
  name: "productForm",
  mounted() {
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
    saveClientOrganization(organization) {

      let requestBody = {
        clientId: this.authStore.user.userId,
        name: organization.name,
        inn: organization.inn,
        bik: organization.bik,
        clientAccount: organization.clientAccount,
        bankName: organization.bankName,
        correspondentAccount: organization.correspondentAccount
      }
      ClientOrganizationDataService
          .create(requestBody)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/client/organizations/" + response.data.inn)
          })
    }
  }
}
</script>


<style scoped>

</style>