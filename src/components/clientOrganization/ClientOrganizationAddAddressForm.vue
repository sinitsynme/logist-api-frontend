<template>
  <div  class="text-center mt-2">
    <h2>Создание адреса для организации с ИНН {{inn}}</h2>
  </div>
  <div class="container mt-4 w-50">

      <form @submit.prevent="onsubmit">

        <div class="form-group">
          <label for="addressLatitude">Широта адреса</label>
          <input v-model="address.latitude" type="number" step="0.000001" class="form-control"
                 id="addressLatitude"
                 placeholder="Широта адреса">
        </div>
        <div class="form-group">
          <label for="addressLongitude">Долгота адреса</label>
          <input v-model="address.longitude" type="number" step="0.000001" class="form-control"
                 id="addressLongitude"
                 placeholder="Долгота адреса">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="saveAddress(address)">Сохранить</button>
        </div>
      </form>
    </div>
</template>

<script>


import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";

export default {
  name: "ClientOrganizationAddAddressForm",
  props: [
    'inn'
  ],
  mounted() {
  },
  data() {
    return {
      address: {
        latitude: '',
        longitude: ''
      }
    }
  },

  methods: {
    async saveAddress(address) {
      await ClientOrganizationDataService.addAddress(this.inn, address)
      await this.$router.push(`/client/organizations/${this.inn}`)
    }
  }
}
</script>


<style scoped>

</style>