<template>
  <div class="container mt-3 w-50">
    <h2 class="text-center">Создание производителя</h2>

    <div class="mt-3">

    <form @submit.prevent="onsubmit">
      <div class="form-group">
        <label for="manufacturerName">Название производителя</label>
        <input v-model="manufacturer.name" type="text" class="form-control" id="manufacturerName" placeholder="Производитель">
      </div>
      <div class="form-group">
        <label for="manufacturerContactNumber">Контактный номер</label>
        <input v-model="manufacturer.contactNumber" type="text" class="form-control" id="manufacturerContactNumber" placeholder="Контактный номер">
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary" @click="saveManufacturer(manufacturer)">Сохранить</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import ManufacturerDataService from "@/services/ManufacturerDataService";

export default {
  name: "manufacturer",
  mounted() {
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
    saveManufacturer(manufacturer) {
      let requestBody = {
        name: manufacturer.name,
        contactNumber: manufacturer.contactNumber
      }
      ManufacturerDataService
          .create(requestBody)
          .then(response => {
            let data = response.data;
            console.log(data)
            this.$router.push("/manufacturer/" + data.id)
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