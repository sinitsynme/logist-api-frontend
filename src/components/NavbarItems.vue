<template>
  <div class="navbar-nav">
    <router-link to="/">
      <img v-if="shopMode" :src="require('../assets/long-logo.png')" width="250" alt="СкладЛайн">
      <img v-if="managementMode" :src="require('../assets/management-long-logo.png')" width="250"
           alt="СкладЛайн Менеджмент">
    </router-link>

    <li class="nav-item" v-for="item in shopLinksKeys" :key="item">
      <router-link :to="shopNavItems[item]" class="nav-link"> {{ item }}</router-link>
    </li>

    <li class="nav-item" v-for="item in managementLinksKeys" :key="item">
      <router-link :to="managementNavItems[item]" class="nav-link"> {{ item }}</router-link>
    </li>

    <li class="ml-3" @click="changeMode" v-if="shopMode && managementModeEnabled">
      <a class="alert-link">Перейти в СкладЛайн Менеджмент</a>
    </li>

    <li class="ml-3" @click="changeMode" v-if="managementMode">
      <a class="alert-link">Вернуться в СкладЛайн</a>
    </li>

  </div>
</template>

<script>

import {useAuthStore} from "@/auth/authStore";
import {getAllNavItems} from "@/auth/navbar"

export default {
  name: "NavbarItems",
  props: {},
  data() {
    return {
      authStore: useAuthStore(),
      mode: "shop"
    }
  },
  computed: {
    links() {
      return this.getNavItemLinks()
    },
    shopLinksKeys() {
      if (this.managementMode) {
        return []
      } else return Object.keys(this.shopNavItems)
    },
    managementLinksKeys() {
      if (this.shopMode) {
        return []
      } else return Object.keys(this.managementNavItems)
    },
    shopNavItems() {
      return this.links.shop
    },
    managementNavItems() {
      return this.links.management
    },
    shopMode() {
      return this.mode === "shop"
    },
    managementMode() {
      return this.mode === "management"
    },
    managementModeEnabled() {
      return this.managementNavItems != null
    }
  },
  methods: {
    getNavItemLinks() {
      return getAllNavItems(this.authStore.user.userRoles)
    },
    changeMode() {
      if (this.mode === 'shop') {
        this.mode = "management"
      } else {
        this.mode = "shop"
      }
      this.$router.push("/")
    }
  }
};
</script>
