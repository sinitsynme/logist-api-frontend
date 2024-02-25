<template>
  <div class="text-center mt-4" >
    <div class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script>


export default {
  name: "AlertComponent",
  props: [
    'message'
  ],
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
};
</script>
