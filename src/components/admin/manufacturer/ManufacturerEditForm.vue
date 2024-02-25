<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center mt-3">Редактирование производителя с ID = {{ id }}</h2>
    <form @submit.prevent="onsubmit" class="mt-3">
      <div class="form-group">
        <label for="manufacturerName">Название производителя</label>
        <input v-model="manufacturer.name" type="text" class="form-control" id="manufacturerName"
               placeholder="Производитель">
      </div>
      <div class="form-group">
        <label for="manufacturerContactNumber">Контактный номер</label>
        <input v-model="manufacturer.contactNumber" type="text" class="form-control" id="manufacturerContactNumber"
               placeholder="Контактный номер">
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary" @click="editManufacturer(manufacturer, id)">Редактировать</button>
      </div>
    </form>
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
      if (!this.id) return

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
    editManufacturer(manufacturer, id) {
      let requestBody = {
        name: manufacturer.name,
        contactNumber: manufacturer.contactNumber
      }
      ManufacturerDataService
          .edit(requestBody, id)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/manufacturer/" + id)
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
<script setup>
</script>