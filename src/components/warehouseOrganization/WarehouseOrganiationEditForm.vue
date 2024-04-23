<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center mt-3">Редактирование предприятия</h2>
    <form @submit.prevent="onsubmit" class="mt-3">
      <div class="form-group">
        <label for="orgInn">ИНН</label>
        <input v-model="organization.inn" type="text" class="form-control" id="orgInn"
               placeholder="ИНН">
      </div>
      <div class="form-group">
        <label for="orgName">Наименование организации</label>
        <input v-model="organization.name" type="text" class="form-control" id="orgName"
               placeholder="Наименование организации">
      </div>
      <div class="form-group">
        <label for="orgBik">БИК</label>
        <input v-model="organization.bik" type="text" class="form-control" id="orgBik"
               placeholder="БИК">
      </div>
      <div class="form-group">
        <label for="orgClientAccount">Расчетный счет</label>
        <input v-model="organization.clientAccount" type="text" class="form-control" id="orgClientAccount"
               placeholder="Расчетный счет">
      </div>
      <div class="form-group">
        <label for="orgBankName">Наименование банка</label>
        <input v-model="organization.bankName" type="text" class="form-control" id="orgBankName"
               placeholder="Наименование банка">
      </div>
      <div class="form-group">
        <label for="orgCorrespondentAccount">Корреспондентский счет</label>
        <input v-model="organization.correspondentAccount" type="text" class="form-control"
               id="orgCorrespondentAccount"
               placeholder="Корреспондентский счет">
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
        inn: '',
        bik: '',
        clientAccount: '',
        bankName: '',
        correspondentAccount: ''
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
            this.organization.inn = data.inn;
            this.organization.bik = data.bik;
            this.organization.clientAccount = data.clientAccount;
            this.organization.bankName = data.bankName;
            this.organization.correspondentAccount = data.correspondentAccount;
          })
          .catch(e => {
            console.log(e);
          });
    },
    editOrganization(organization, id) {
      let requestBody = {
        name: organization.name,
        inn: organization.inn,
        bik: organization.bik,
        clientAccount: organization.clientAccount,
        bankName: organization.bankName,
        correspondentAccount: organization.correspondentAccount,
      }
      OrganizationDataService
          .edit(requestBody, id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/management/organization/" + id)
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