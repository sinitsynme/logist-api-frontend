<template>
  <div v-if="!isAuthenticated">
    <button class="btn btn-outline-info" @click="routeToLogin">Войти</button>
  </div>
  <div v-else class="d-flex align-items-center">
    <div class="align-self-center">
      <b class="text-info mr-2">{{ email }}</b>
      <div class="text-center"><a class="link-primary" @click="routeToPersonalCabinet">Личный кабинет</a></div>
    </div>
    <button class="btn btn-outline-danger flex-wrap" @click="logout">Выйти</button>
  </div>
</template>

<script>

import {useAuthStore} from "@/stores/authStore";
import {MODE_SHOP, useModeStore} from "@/stores/modeStore";

export default {
  name: "AuthComponent",
  props: {},
  data() {
    return {
      modeStore: useModeStore(),
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
      this.modeStore.setMode(MODE_SHOP)
      await this.$router.push("/")
      window.location.reload()
    }
  }
};
</script>

<style scoped>
a:hover {
  cursor:pointer;
}

</style>