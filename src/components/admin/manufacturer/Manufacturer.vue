<template>
  <div class="container mt-3">
    <h2 class="text-center">Просмотр информации о производителе</h2>
    <table class="table mt-3">
      <tbody>
      <tr>
        <td>
          <b>ID</b>
        </td>
        <td>
          {{ manufacturer.id }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Название производителя</b>
        </td>
        <td>
          {{ manufacturer.name }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Контактный номер телефона</b>
        </td>
        <td>
          {{ manufacturer.contactNumber }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between p-5">
      <router-link :to="{
        name: 'manufacturerFormEdit',
        params: {
          id: id
        }}"
      >
        <button class="btn btn-outline-primary">
          Редактировать
        </button>
      </router-link>

      <button class="btn btn-outline-danger" @click="deleteManufacturer">Удалить</button>
    </div>
  </div>


</template>

<script>
import ManufacturerDataService from "@/services/ManufacturerDataService";

export default {
  name: "manufacturer",
  props: [
    'id'
  ],
  mounted() {
    this.getManufacturer()
  },
  data() {
    return {
      manufacturer: {
        id: '',
        name: '',
        contactNumber: ''
      }
    }
  },

  methods: {
    getManufacturer() {
      ManufacturerDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.manufacturer.id = data.id;
            this.manufacturer.name = data.name;
            this.manufacturer.contactNumber = data.contactNumber;
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteManufacturer() {
      ManufacturerDataService
          .delete(this.id)
          .then(response => {
            console.log(response)
            this.$router.push("/manufacturer")
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}
</script>


<style scoped>

</style>