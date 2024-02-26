<template>
  <div class="navbar-nav">
    <router-link to="/">
      <img v-if="isShopMode" :src="require('../assets/long-logo.png')" width="250" alt="СкладЛайн">
      <img v-if="isManagementMode" :src="require('../assets/management-long-logo.png')" width="250"
           alt="СкладЛайн Менеджмент">
    </router-link>

    <li class="nav-item" v-for="item in shopLinksKeys" :key="item">
      <router-link :to="shopNavItems[item]" class="nav-link"> {{ item }}</router-link>
    </li>

    <li class="nav-item" v-for="item in managementLinksKeys" :key="item">
      <router-link :to="managementNavItems[item]" class="nav-link"> {{ item }}</router-link>
    </li>

    <li class="ml-3" @click="changeMode" v-if="isShopMode && hasAccessToManagement">
      <a class="alert-link">Перейти в СкладЛайн Менеджмент</a>
    </li>

    <li class="ml-3" @click="changeMode" v-if="isManagementMode">
      <a class="alert-link">Вернуться в СкладЛайн</a>
    </li>

  </div>
</template>

<script>

import {useAuthStore} from "@/stores/authStore";
import {getAllNavItems} from "@/auth/navbar"
import {MODE_MANAGEMENT, MODE_SHOP, useModeStore} from "@/stores/modeStore";

export default {
  name: "NavbarItems",
  props: {},
  data() {
    return {
      modeStore: useModeStore(),
      authStore: useAuthStore()
    }
  },
  computed: {
    mode() {
      return this.modeStore.mode
    },
    links() {
      return this.getNavItemLinks()
    },
    shopLinksKeys() {
      if (this.isManagementMode) {
        return []
      } else return Object.keys(this.shopNavItems)
    },
    managementLinksKeys() {
      if (this.isShopMode) {
        return []
      } else return Object.keys(this.managementNavItems)
    },
    shopNavItems() {
      return this.links.shop
    },
    managementNavItems() {
      return this.links.management
    },
    isShopMode() {
      return this.modeStore.isShopMode()
    },
    isManagementMode() {
      return this.modeStore.isManagementMode()
    },
    hasAccessToManagement() {
      return this.managementNavItems != null
    }
  },
  methods: {
    getNavItemLinks() {
      return getAllNavItems(this.authStore.user.userRoles)
    },
    changeMode() {
      if (this.isShopMode) {
        this.modeStore.setMode(MODE_MANAGEMENT)
      } else if (this.isManagementMode) {
        this.modeStore.setMode(MODE_SHOP)
      }
      this.$router.push("/")
      window.location.reload()
    }
  }
};
</script>
