<template>
  <div class="container mt-2">
    <h2 class="text-center">Просмотр информации об организации</h2>
    <table class="table mt-2">
      <tbody>
      <tr>
        <td>
          <b>ИНН</b>
        </td>
        <td>
          {{ clientOrganization.inn }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Наименование организации</b>
        </td>
        <td>
          {{ clientOrganization.name }}
        </td>
      </tr>
      <tr>
        <td>
          <b>БИК</b>
        </td>
        <td>
          {{ clientOrganization.bik }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Расчетный счет</b>
        </td>
        <td>
          {{ clientOrganization.clientAccount }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Наименование банка</b>
        </td>
        <td>
          {{ clientOrganization.bankName }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Корреспондентский счет</b>
        </td>
        <td>
          {{ clientOrganization.correspondentAccount }}
        </td>
      </tr>
      </tbody>
    </table>

    <div class="mt-2 text-center">
      <h4>Адреса организации</h4>
    </div>

    <div class="mt-3 text-center" v-if="noAddressFound">
      <b>У организации нет адресов. Добавьте хотя бы один адрес для оформления заказа</b>
    </div>

    <table class="table mt-2" v-else>
      <tbody>
      <tr v-for="address in clientOrganization.addressResponseDto" :key="address.id">
        <td>
          {{ address.stringified }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-around mt-4">
      <router-link :to="{
        name: 'ClientOrganizationEdit',
        params: {
          inn: clientOrganization.inn
        }}"
      >
        <button class="btn btn-outline-primary">
          Редактировать
        </button>
      </router-link>

      <router-link :to="{
        name: 'ClientOrganizationAddAddress',
        params: {
          inn: clientOrganization.inn
        }}"
      >
        <button class="btn btn-outline-info">
          Добавить новый адрес
        </button>
      </router-link>
    </div>
  </div>
</template>


<script>


import ClientOrganizationDataService from "@/services/ClientOrganizationDataService";
import AddressDataService from "@/services/AddressDataService";

export default {
  name: "ClientOrganization",
  props: [
    'inn'
  ],
  async mounted() {
    await this.getClientOrganization()
  },
  computed: {
    noAddressFound() {
      return this.clientOrganization.addressResponseDto.length === 0
    }
  },

  data() {
    return {
      clientOrganization: {
        name: '',
        bik: '',
        clientAccount: '',
        bankName: '',
        correspondentAccount: '',
        addressResponseDto: []
      }
    }
  },

  methods: {
    async getClientOrganization() {
      ClientOrganizationDataService
          .get(this.inn)
          .then(async response => {
            let data = response.data;

            this.clientOrganization.inn = data.inn;
            this.clientOrganization.name = data.name;
            this.clientOrganization.bik = data.bik;
            this.clientOrganization.clientAccount = data.clientAccount;
            this.clientOrganization.bankName = data.bankName;
            this.clientOrganization.correspondentAccount = data.correspondentAccount;
            this.clientOrganization.addressResponseDto = data.addressResponseDto;

            let i
            for (i in this.clientOrganization.addressResponseDto) {
              let address = this.clientOrganization.addressResponseDto[i]
              address.stringified = await this.addStringifiedAddress(address)
            }
          })
          .catch(e => {
            console.log(e.response);
          })
    },

    async addStringifiedAddress(address) {
      let response = await AddressDataService.getAddressData(address.latitude, address.longitude);
      response.json().then(data => {
        console.log(data)

        let city = data.address.city
        let state = data.address.state
        let road = data.address.road
        let houseNumber = data.address.house_number

        address.stringified = `${state}, ${city}, ${road}, ${houseNumber}`
      })
    }
  }
}
</script>


<style scoped>

</style>