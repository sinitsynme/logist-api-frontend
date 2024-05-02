<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Подача заявки на создание складского предприятия</h2>

    <div class="mt-3">

      <form @submit.prevent="onsubmit">
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

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="addOrganizationForApproval(organization)">Подать заявку</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/authStore";
import OrganizationDataService from "@/services/OrganizationDataService";

export default {
  name: "productForm",
  mounted() {
  },
  data() {
    return {
      organization: {
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
    addOrganizationForApproval(organization) {

      let isOwner = this.authStore.user.userRoles.includes('ROLE_OWNER')

      let requestBody = {
        name: organization.name,
        inn: organization.inn,
        bik: organization.bik,
        clientAccount: organization.clientAccount,
        bankName: organization.bankName,
        correspondentAccount: organization.correspondentAccount
      }


      OrganizationDataService
          .create(requestBody)
          .then(response => {
            let data = response.data;
            console.log(data)

            if (isOwner) this.$router.push("/organization/" + response.data.id)
            else this.$router.push("/")
      })

      alert("Заявка на создание организации подана. Ожидайте утверждения")
    }
  }
}
</script>


<style scoped>

</style>