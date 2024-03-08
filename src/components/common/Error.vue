<template>
  <div class="text-center mt-4">
    <div>
      <b style="font-size: 48pt">{{ code }}</b>
    </div>
    <div class="mt-5">
      <router-link to="/">Вернуться на главную страницу</router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: "Error",
  props: [
    'code'
  ],
  data() {
    return {}
  },
  computed: {},
  methods: {}
};
</script>
