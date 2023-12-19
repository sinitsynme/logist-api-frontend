<template>
  <div v-if="!isAuthenticated">
    <button class="btn btn-outline-info" @click="auth">Войти</button>
  </div>
  <div class="d-block" v-else>
    <b class="text-info mr-2">m.sinitsyn</b>
    <button class="btn btn-outline-danger" @click="auth">Выйти</button>
  </div>
</template>

<script>
export default {
  name: "AuthComponent",
  props: {

  },
  data() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
    auth() {
      //mock auth for now
      this.isAuthenticated = !this.isAuthenticated;
    }
  }
};
</script>
