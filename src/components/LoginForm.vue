<template>
  <div class="container mt-5 w-50">
    <h2 class="text-center">Вход в СкладЛайн</h2>

    <div class="mt-5">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="categoryCode">Адрес электронной почты</label>
          <input v-model="email" type="email" class="form-control" id="email"
                 placeholder="E-mail">
        </div>
        <div class="form-group">
          <label for="categoryName">Пароль</label>
          <input v-model="password" type="password" class="form-control" id="passwordInput"
                 placeholder="Пароль">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary"
                  @click="login" :disabled="!isActiveLoginButton">Войти в систему</button>
        </div>

        <AlertComponent :message="alertMessage" :is-error="true" v-if="showInvalidCredsAlert"/>

        <div class="text-center mt-4">
          Или <a class="link-primary" @click="routeToSignup">зарегистрироваться в СкладЛайн</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {useAuthStore} from "@/stores/authStore";
import AlertComponent from "@/components/common/AlertComponent.vue";

export default {
  name: "loginForm",
  components: {AlertComponent},
  mounted() {
  },

  data() {
    return {
      authStore: useAuthStore(),
      email: '',
      password: '',
      showInvalidCredsAlert: false,
      alertMessage: ''
    }
  },

  computed: {
    isActiveLoginButton() {
      return this.email.length > 0 &&
          this.password.length > 0
    }
  },

  methods: {
    async login() {
      try {
        this.showInvalidCredsAlert = false

        await this.authStore.login(this.email, this.password)
        await this.$router.push("/")
        window.location.reload()
      } catch (err) {
        this.showInvalidCredsAlert = true
        this.alertMessage = "Неверный e-mail или пароль"
        console.log(err)
      }
    },

    routeToSignup() {
      this.$router.push("/signup")
    }
  }
}
</script>


<style scoped>

</style>