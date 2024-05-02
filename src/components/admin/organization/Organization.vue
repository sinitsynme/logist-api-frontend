<template>
  <div class="container mt-3">
    <h2 class="text-center">Просмотр информации о складском предприятии</h2>

    <div class="d-flex justify-content-between mt-4">
      <router-link :to="{
        name: 'adminOrganizationFormEdit',
        params: {
          id: id
        }}"
      >
        <button class="btn btn-outline-primary pl-2 pr-2">
          Редактировать организацию
        </button>
      </router-link>

      <button class="btn btn-outline-info pl-5 pr-5" @click="approveOrganization" v-if="isAdmin">Одобрить</button>
      <button class="btn btn-outline-danger pl-5 pr-5" @click="rejectOrganization" v-if="isAdmin">Отклонить</button>
      <button class="btn btn-outline-danger pl-5 pr-5" @click="closeOrganization">Закрыть</button>

      <router-link :to="{
        name: 'warehousesInOrganization',
        params: {
          organizationId: id
        }}"
      >
        <button class="btn btn-outline-info pl-5 pr-5">
          К складам
        </button>
      </router-link>
    </div>

    <form @submit.prevent="onsubmit" class="mt-3" v-if="isAdmin">
      <div class="d-flex justify-content-around mt-2">
        <label for="newOwnerId">Изменить владельца</label>
        <input v-model="newOwnerId" type="text" id="newOwnerId" style="width: 60%"
               placeholder="ID владельца">
        <button type="submit" class="btn btn-primary" @click="changeOrganizationOwner">Изменить</button>
      </div>
    </form>

    <table class="table mt-4">
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
          <b>Корреспондентскй счет</b>
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
    isAdmin() {
      return this.authStore.user.userRoles.includes("ROLE_ADMIN")
    }
  },
  data() {
    return {
      authStore: useAuthStore(),
      newOwnerId: '',
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
    },
    async changeOrganizationOwner() {
      await OrganizationDataService.changeOwner(this.id, this.newOwnerId)
      await alert("Владелец организации изменен")
      await window.location.reload()
    },
    async approveOrganization() {
      await OrganizationDataService
          .changeStatus(this.id, "APPROVED")
      await alert("Статус организации изменен")
      await window.location.reload()
    },
    async rejectOrganization() {
      await OrganizationDataService
          .changeStatus(this.id, "REJECTED")
      await alert("Статус организации изменен")
      await window.location.reload()
    },
    async closeOrganization() {
      if (confirm("Вы уверены, что хотите закрыть организацию?")) {
        await OrganizationDataService
            .changeStatus(this.id, "CLOSED")
        await alert("Статус организации изменен")
        await window.location.reload()
      }
    }
  }
}
</script>


<style scoped>

</style>