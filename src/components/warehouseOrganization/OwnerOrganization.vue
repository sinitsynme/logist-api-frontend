<template class="w-75">
  <div class="d-flex justify-content-around mt-3">
    <h2 class="text-center">Просмотр информации о складском предприятии</h2>
    <router-link v-if="isManagementMode" :to="{
        name: 'organizationEditForm',
        params: {
          id: id
        }}"
    >
      <button class="btn btn-outline-primary pl-5 pr-5">
        Редактировать
      </button>
    </router-link>
    <router-link v-if="isManagementMode" :to="{
        name: 'organizationEditForm',
        params: {
          id: id
        }}"
    >
      <button class="btn btn-outline-info pl-5 pr-5">
        К складам
      </button>
    </router-link>
  </div>

  <div class="container mt-3">
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
      <tr>
        <td>
          <b>Владелец организации</b>
        </td>
        <td>
          {{ ownerName }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Статус организации</b>
        </td>
        <td>
          <span v-if="mappedOrderStatus"
                :class="['badge', mappedOrderStatus.style]">{{ mappedOrderStatus.screenName }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>ИНН</b>
        </td>
        <td>
          {{ organization.inn }}
        </td>
      </tr>
      <tr>
        <td>
          <b>БИК</b>
        </td>
        <td>
          {{ organization.bik }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Расчетный счет</b>
        </td>
        <td>
          {{ organization.clientAccount }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Наименование банка</b>
        </td>
        <td>
          {{ organization.bankName }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Корреспондентский счет</b>
        </td>
        <td>
          {{ organization.correspondentAccount }}
        </td>
      </tr>
      </tbody>
    </table>

  </div>


</template>

<script>

import OrganizationDataService from "@/services/OrganizationDataService";
import AuthDataService from "@/scripts/auth/AuthDataService";
import {mapOrganizationStatus} from "@/scripts/warehouseOrganization/statuses";
import {useModeStore} from "@/stores/modeStore";
import {useAuthStore} from "@/stores/authStore";

export default {
  name: "organization",
  props: [
    'id'
  ],
  mounted() {
    this.getOrganization()
  },
  computed: {
    owner() {
      return this.organization.owner
    },
    ownerName() {
      return `${this.owner.lastName} ${this.owner.firstName} ${this.owner.middleName}`
    },
    mappedOrderStatus() {
      return mapOrganizationStatus(this.organization.status)
    },
    isManagementMode() {
      return this.modeStore.isManagementMode()
    }
  },
  data() {
    return {
      authStore: useAuthStore(),
      modeStore: useModeStore(),
      organization: {
        owner: {},
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
    async getOrganization() {
      await OrganizationDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.organization.id = data.id;
            this.organization.name = data.name;
            this.organization.ownerId = data.ownerId;
            this.organization.status = data.status;
            this.organization.inn = data.inn;
            this.organization.bik = data.bik;
            this.organization.clientAccount = data.clientAccount;
            this.organization.bankName = data.bankName;
            this.organization.correspondentAccount = data.correspondentAccount;
          })
          .catch(e => {
            console.log(e);
          });

      await AuthDataService
          .getUserDataAdmin(this.organization.ownerId)
          .then(response => {
            let data = response.data
            this.organization.owner = {
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
            }
          })
    },
  }
}
</script>


<style scoped>

</style>