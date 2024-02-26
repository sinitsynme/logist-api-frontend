<template class="d-inline">
  <div v-if="!isAuthenticated">
    <button class="btn btn-outline-info" @click="routeToLogin">Войти</button>
  </div>
  <div v-else>
    <div>
      <b class="text-info mr-2">{{ email }}</b>
      <p><a class="link-primary" @click="routeToPersonalCabinet">Личный кабинет</a></p>
    </div>
    <button class="btn btn-outline-danger" @click="logout">Выйти</button>
  </div>
</template>

<script>

import {useAuthStore} from "@/stores/authStore";

export default {
  name: "AuthComponent",
  props: {},
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.user.isAuthenticated
    },

    email() {
      return this.authStore.user.userEmail
    }
  },
  methods: {
    routeToLogin() {
      this.$router.push("/login")
    },
    routeToPersonalCabinet() {
      this.$router.push("/personalCabinet")
    },
    async logout() {
      this.authStore.logout()
      await this.$router.push("/")
      window.location.reload()
    }
  }
};
</script>
