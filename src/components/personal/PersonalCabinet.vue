<template>
  <div class="container mt-3">
    <div>
      <h2 class="text-center">Личный кабинет</h2>
    </div>
    <table class="table mt-3">
      <tbody>
      <tr>
        <td>
          <b>E-mail</b>
        </td>
        <td>
          {{ user.email }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Фамилия</b>
        </td>
        <td>
          {{ user.lastName }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Имя</b>
        </td>
        <td>
          {{ user.firstName }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Отчество</b>
        </td>
        <td>
          {{ user.middleName }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Номер телефона</b>
        </td>
        <td>
          {{ user.phoneNumber }}
        </td>
      </tr>

      </tbody>
    </table>

    <div class="d-flex justify-content-between p-5">
        <button class="btn btn-outline-primary" @click="routeToEditPersonalData">
          Редактировать персональные данные
        </button>
        <button class="btn btn-outline-primary" @click="routeToEditPersonalData">
          Сменить пароль
        </button>
    </div>

  </div>


</template>

<script>

import AuthDataService from "@/scripts/auth/AuthDataService";
import {useAuthStore} from "@/stores/authStore";

export default {
  name: "PersonalCabinet",
  mounted() {
    this.getUserData()
  },
  data() {
    return {
      authStore: useAuthStore(),
      user: {
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
      }
    }
  },

  methods: {
    async getUserData() {
      try {
        if (!this.authStore.user.isAuthenticated) return

        let userId = this.authStore.user.userId
        this.user = (await AuthDataService.getUserData(userId)).data
      } catch (err) {
        console.log(err)
      }
    },

    routeToEditPersonalData() {
      this.$router.push("/personalCabinet/edit")
    }
  }
}
</script>