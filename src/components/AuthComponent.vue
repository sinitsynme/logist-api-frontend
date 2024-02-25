<template>
  <div v-if="!isAuthenticated">
    <button class="btn btn-outline-info" @click="routeToLogin">Войти</button>
  </div>
  <div class="d-block" v-else>
    <b class="text-info mr-2">{{ email }}</b>
    <button class="btn btn-outline-danger" @click="logout">Выйти</button>
  </div>
</template>

<script>

import {useAuthStore} from "@/auth/authStore";

export default {
  name: "AuthComponent",
  props: {

  },
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
    logout() {
      this.authStore.logout()
      this.$router.push("/")
      window.location.reload()
    }
  }
};
</script>
