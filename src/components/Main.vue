<template>
  <div class="d-flex mt-5 justify-content-around">

    <div v-if="isShopMode" class="d-flex justify-content-around">
        <img :src="require('../assets/long-logo.png')" alt="СкладЛайн" style="max-width: 35%">
      <div class="text-center">
        <h1>СкладЛайн</h1>
        <h2>Лучшая платформа для оптовых B2B-закупок</h2>
      </div>
    </div>

    <div v-if="isManagementMode" class="d-flex justify-content-around">
        <img :src="require('../assets/management-long-logo.png')" alt="СкладЛайн Менеджмент" style="max-width: 35%">
      <div class="text-center">
        <h1>СкладЛайн Менеджмент</h1>
        <h2>Панель управления</h2>
      </div>
    </div>
  </div>
</template>

<script>

import {useModeStore} from "@/stores/modeStore";

export default {
  name: "Main",
  props: {},
  data() {
    return {
      modeStore: useModeStore(),
    }
  },
  computed: {
    mode() {
      return this.modeStore.mode
    },
    isShopMode() {
      return this.modeStore.isShopMode()
    },
    isManagementMode() {
      return this.modeStore.isManagementMode()
    }
  },
  methods: {}

}
</script>