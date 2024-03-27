<template>
  <div class="d-flex bg-light justify-content-between">

    <router-link to="/" class="mt-3 ml-4">
      <img v-if="isShopMode" :src="require('../../assets/long-logo.png')" width="200" alt="СкладЛайн">
      <img v-if="isManagementMode" :src="require('../../assets/management-long-logo.png')" width="200"
           alt="СкладЛайн Менеджмент">
    </router-link>

    <div class="d-flex mt-3 ml-4 mr-4">

      <div class="align-self-center">
        <div v-if="isShopMode">
          <SearchBar/>
        </div>
      </div>

      <div class="align-self-center">
        Горячая линия по всей России: <a href="tel:88005553535">8(800)555-35-35</a>
      </div>
    </div>

  </div>

  <nav class="navbar navbar-expand bg-light">
    <div class="navbar-nav align-items-center">
      <li class="nav-item" v-for="item in shopLinksKeys" :key="item">
        <router-link :to="shopNavItems[item]" class="nav-link"> {{ item }}</router-link>
      </li>

      <li class="nav-item" v-for="item in managementLinksKeys" :key="item">
        <router-link :to="managementNavItems[item]" class="nav-link"> {{ item }}</router-link>
      </li>

    </div>

    <div class="ml-auto align-items-center">
      <div class="d-flex justify-content-between align-items-center">
        <div @click="changeMode" v-if="isShopMode && hasAccessToManagement">
          <a class="alert-link">Перейти в СкладЛайн Менеджмент</a>
        </div>

        <div @click="changeMode" v-if="isManagementMode">
          <a class="alert-link">Вернуться в СкладЛайн</a>
        </div>

        <div v-if="isShopMode" class="ml-3">
          <router-link to="/cart">
            <img :src="require('../../assets/icons/shopcart.png')" width="40px" alt="Корзина">
          </router-link>
        </div>

        <AuthComponent class="ml-3"/>
      </div>
    </div>

  </nav>
</template>

<script>

import {useAuthStore} from "@/stores/authStore";
import {getAllNavItems} from "@/scripts/auth/navbar"
import {MODE_MANAGEMENT, MODE_SHOP, useModeStore} from "@/stores/modeStore";
import SearchBar from "@/components/common/SearchBar.vue";
import AuthComponent from "@/components/common/AuthComponent.vue";

export default {
  name: "Navbar",
  components: {AuthComponent, SearchBar},
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
    async changeMode() {
      if (this.isShopMode) {
        this.modeStore.setMode(MODE_MANAGEMENT)
      } else if (this.isManagementMode) {
        this.modeStore.setMode(MODE_SHOP)
      }
      await this.$router.push("/")
      window.location.reload()
    }
  }
};
</script>
