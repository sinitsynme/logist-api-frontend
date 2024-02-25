<template>
  <div class="container mt-5 w-50">
    <h2 class="text-center">Вход в СкладЛайн</h2>

    <div class="mt-5">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="categoryCode">Адрес электронной почты</label>
          <input v-model="email" type="text" class="form-control" id="email"
                 placeholder="Имя пользователя">
        </div>
        <div class="form-group">
          <label for="categoryName">Пароль</label>
          <input type="password" class="form-control" id="passwordInput"
                 placeholder="Пароль">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="login">Войти в систему</button>
        </div>

        <div class="text-center mt-4" v-if="showInvalidCredsAlert">
          <div class="alert alert-danger" role="alert">
            Неверное имя пользователя или пароль
          </div>
        </div>

        <div class="text-center mt-4">
          Или <a href="">зарегистрироваться (поправить ссылку)</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {useAuthStore} from "@/auth/authStore";

export default {
  name: "loginForm",
  mounted() {
  },
  data() {
    return {
      authStore: useAuthStore(),
      email: '',
      showInvalidCredsAlert: false
    }
  },

  methods: {
    async login() {
      try {
        await this.authStore.login(this.email, document.getElementById("passwordInput").value)
        this.$router.push("/")
      } catch (err) {
        this.showInvalidCredsAlert = true
        console.log(err)
      }
    }
  }
}
</script>


<style scoped>

</style>