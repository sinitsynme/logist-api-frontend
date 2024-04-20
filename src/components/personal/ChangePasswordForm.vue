<template class="d-inline">
  <router-link to="/personalCabinet" class="ml-5">
    Вернуться в личный кабинет
  </router-link>
  <div class="container mt-3 w-50">


    <h2 class="text-center">Смена пароля</h2>
    <div class="mt-3">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="currentPassword">Введите текущий пароль</label>
          <input v-model="currentPassword" type="password" class="form-control" id="currentPassword"
                 placeholder="Текущий пароль">
        </div>
        <div class="form-group">
          <label for="passwordInput">Введите пароль</label>
          <input v-model="password" type="password" class="form-control" id="passwordInput"
                 placeholder="Пароль">
        </div>

        <div class="form-group">
          <label for="passwordConfirm">Повторите пароль</label>
          <input v-model="confirmPassword" type="password" class="form-control" id="passwordConfirm"
                 placeholder="Повторите пароль">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="changePassword" :disabled="!isActiveChangePasswordButton || passwordsDontMatch">
            Сменить пароль
          </button>
        </div>

        <div class="text-center" v-if="passwordsDontMatch">
          <AlertComponent  is-error="true" message="Введенные пароли не совпадают"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import AlertComponent from "@/components/common/AlertComponent.vue";
import AuthDataService from "@/scripts/auth/AuthDataService";
import {useAuthStore} from "@/stores/authStore";

export default {
  name: "ChangePasswordForm",
  components: {AlertComponent},
  props: {},
  data() {
    return {
      authStore: useAuthStore(),
      currentPassword: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    isActiveChangePasswordButton() {
      return this.currentPassword.length > 7 &&
          this.password.length > 7 &&
          this.confirmPassword.length > 7
    },
    passwordsDontMatch() {
      return this.password.length > 0 && this.confirmPassword.length > 0 &&
          this.password !== this.confirmPassword
    }
  },
  methods: {
    async changePassword() {

      let email = this.authStore.user.userEmail
      let id = this.authStore.user.userId
      let currentPassword = this.currentPassword
      let password = this.password

      try {
        await AuthDataService.getToken(email, currentPassword)
        try {
          await AuthDataService.changePassword(id, password)
          await this.authStore.logout()
          await alert("Пароль успешно изменен! Нужно войти в аккаунт снова")
          await this.$router.push("/login")
          await window.location.reload()
        } catch (err) {
          alert("Не удалось сменить пароль")
        }
      } catch (err) {
        alert("Неверный пароль")
      }


    },

    routeToLogin() {
      this.$router.push("/login")
    },

  }

}
;
</script>
