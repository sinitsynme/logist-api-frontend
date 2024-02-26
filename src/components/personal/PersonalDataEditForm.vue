<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center mt-3">Редактирование персональных данных</h2>
    <form @submit.prevent="onsubmit" class="mt-3">
      <div class="form-group">
        <label for="userEmail">E-mail</label>
        <input v-model="user.email" type="email" class="form-control" id="userEmail"
               placeholder="E-mail">
      </div>
      <div class="form-group">
        <label for="lastName">Фамилия</label>
        <input v-model="user.lastName" type="text" class="form-control" id="lastName"
               placeholder="Фамилия">
      </div>
      <div class="form-group">
        <label for="firstName">Имя</label>
        <input v-model="user.firstName" type="text" class="form-control" id="firstName"
               placeholder="Имя">
      </div>

      <div class="form-group">
        <label for="middleName">Отчество</label>
        <input v-model="user.middleName" type="text" class="form-control" id="middleName"
               placeholder="Отчество">
      </div>

      <div class="form-group">
        <label for="phoneNumber">Номер телефона</label>
        <input v-model="user.phoneNumber" type="text" class="form-control" id="phoneNumber"
               placeholder="Номер телефона">
      </div>

      <AlertComponent :message="alertMessage" v-if="showInvalidDataAlert"/>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary" @click="editUserData()">Редактировать</button>
      </div>
    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/authStore";
import AuthDataService from "@/auth/AuthDataService";
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "PersonalDataEditForm",
  components: {AlertComponent},
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
      },
      alertMessage: '',
      showInvalidDataAlert: false
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

    async editUserData() {
      try {
        await AuthDataService.updateUserData(this.authStore.user.userId, this.user)
        await this.$router.push("/personalCabinet")
      } catch (err) {
        console.log(err)
        this.showInvalidDataAlert = true
        this.alertMessage = "Введены неверные данные"
      }
    }
  }
}
</script>