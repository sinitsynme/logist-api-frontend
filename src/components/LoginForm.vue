<template>
  <div class="container mt-5 w-50">
    <h2 class="text-center">Вход в систему</h2>

    <div class="mt-5">

      <form @submit.prevent="onsubmit">
        <div class="form-group">
          <label for="categoryCode">Имя пользователя</label>
          <input v-model="username" type="text" class="form-control" id="categoryCode"
                 placeholder="Имя пользователя">
        </div>
        <div class="form-group">
          <label for="categoryName">Пароль</label>
          <input v-model="password" type="password" class="form-control" id="categoryName"
                 placeholder="Пароль">
        </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Войти в систему</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "loginForm",
  mounted() {
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
  }
}
</script>


<style scoped>

</style>