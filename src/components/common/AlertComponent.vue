<template>
  <div class="text-center mt-4">
    <div :class="{'alert': true, 'alert-danger': isError, 'alert-info': !isError,}" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script>


export default {
  name: "AlertComponent",
  props: [
    'message',
    'isError',
  ],
  data() {
    return {}
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>

</style>