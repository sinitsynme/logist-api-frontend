<template>

  <div class="container mt-2">
    <div class="d-flex justify-content-between">
      <span>Список всех производителей</span>

      <router-link to="/manufacturerCreate" class="justify-content-center">
        <button class="btn btn-outline-primary mt-3">Создать производителя</button>
      </router-link>
    </div>

    <div class="d-flex">
      <table class="table mt-4">
        <thead class="thead-dark">
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Название производителя
          </th>
          <th class="text-left">
            Контактный номер
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="manufacturer in manufacturers"
            :key="manufacturer.id"
        >
          <td>{{ manufacturer.id }}</td>
          <td>{{ manufacturer.name }}</td>
          <td>{{ manufacturer.contactNumber }}</td>
          <td>
            <router-link :to="{
              name: 'manufacturer',
              params: {
               id: manufacturer.id
             }
              }">
              <button class="btn btn-primary">
                Просмотр
              </button>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ManufacturerDataService from "@/services/ManufacturerDataService";

export default {
  name: "manufacturer-list",
  mounted() {
    this.getManufacturers()
  },
  data() {
    return {
      manufacturers: []
    }
  },

  methods: {
    getManufacturers() {
      ManufacturerDataService
          .getPage(0, 15)
          .then(response => {
            this.manufacturers = response.data.content
            console.log(response.data.content);
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}

</script>


<style>
span {
  font-size: 28pt;
}
</style>