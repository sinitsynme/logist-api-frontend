<template class="d-inline">
  <div class="container mt-5 w-50">
    <h2 class="text-center">Регистрация в СкладЛайн</h2>

    <div class="mt-5">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="categoryCode">Введите электронной почты</label>
          <input v-model="email" type="email" class="form-control" id="email"
                 placeholder="Email">
        </div>
        <div class="form-group">
          <label for="categoryName">Введите пароль</label>
          <input v-model="password" type="password" class="form-control" id="passwordInput"
                 placeholder="Пароль">
        </div>

        <div class="form-group">
          <label for="categoryName">Повторите пароль</label>
          <input v-model="confirmPassword" type="password" class="form-control" id="passwordConfirm"
                 placeholder="Повторите пароль">
        </div>

        <div class="form-group">
          <label for="categoryName">Фамилия</label>
          <input v-model="lastName" type="text" class="form-control" id="lastName"
                 placeholder="Фамилия">
        </div>

        <div class="form-group">
          <label for="categoryName">Имя</label>
          <input v-model="firstName" type="text" class="form-control" id="firstName"
                 placeholder="Имя">
        </div>

        <div class="form-group">
          <label for="categoryName">Отчество</label>
          <input v-model="middleName" type="text" class="form-control" id="middleName"
                 placeholder="Отчество">
        </div>

        <div class="form-group">
          <label for="categoryName">Номер телефона</label>
          <input v-model="phoneNumber" type="text" class="form-control" id="phoneNumber"
                 placeholder="Номер телефона">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="register" :disabled="!isActiveRegisterButton">
            Регистрация
          </button>
        </div>

        <AlertComponent :message="alertMessage" v-if="showInvalidSignupAlert"/>

        <div class="text-center mt-4">
          Или <a class="link-primary" @click="routeToLogin">войти</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import AlertComponent from "@/components/common/AlertComponent.vue";
import AuthDataService from "@/auth/AuthDataService";

export default {
  name: "SignupForm",
  components: {AlertComponent},
  props: {},
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      middleName: '',
      phoneNumber: '',
      showInvalidSignupAlert: false,
      alertMessage: ''
    }
  },
  computed: {
    isActiveRegisterButton() {
      return this.email.length > 0 &&
          this.password.length > 0 &&
          this.confirmPassword.length > 0 &&
          this.firstName.length > 0 &&
          this.lastName.length > 0 &&
          this.middleName.length > 0 &&
          this.phoneNumber.length > 0
    }
  },
  methods: {
    async register() {
      this.showInvalidSignupAlert = false

      const email = this.email
      const password = this.password
      const firstName = this.firstName
      const lastName = this.lastName
      const middleName = this.middleName
      const phoneNumber = this.phoneNumber

      if (password !== this.confirmPassword) {
        this.alertMessage = "Введённые пароли не совпадают"
        this.showInvalidSignupAlert = true
        return
      }

      let signupBody = {
        email,
        password,
        firstName,
        lastName,
        middleName,
        phoneNumber
      }

      try {
        await AuthDataService.register(signupBody)
        await this.$router.push("/login")
      } catch (err) {
        this.alertMessage = err.message
        this.showInvalidSignupAlert = true
      }
    },

    routeToLogin() {
      this.$router.push("/login")
    },

  }

}
;
</script>
