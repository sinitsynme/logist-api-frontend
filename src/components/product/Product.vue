<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between">
      <h2 class="text-center">Просмотр информации о товаре</h2>
      <router-link :to="{
        name: 'addStoredProduct',
        query: {productId: product.id},
        params: {
          warehouseId: 0
        }}"
      >
        <button class="btn btn-outline-info">
          Добавить этот товар на склад
        </button>
      </router-link>
    </div>
    <div class="row mt-3 ">
      <img :src="product.imageLink" alt="У товара нет изображения" class="big-product-image mr-auto ml-auto">
      <table class="table w-50">
        <tbody>
        <tr>
          <td>
            <b>ID</b>
          </td>
          <td>
            {{ product.id }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Название</b>
          </td>
          <td>
            {{ product.name }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Описание</b>
          </td>
          <td>
            {{ product.description }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Категория</b>
          </td>
          <td>
            <router-link :to="{
              name: 'productCategory',
              params: {
               code: product.category.categoryCode
             }
              }">
              {{ product.category.categoryName }}
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <b>Производитель</b>
          </td>
          <td>
            <router-link :to="{
              name: 'manufacturer',
              params: {
               id: product.manufacturer.id
             }
              }">
              {{ product.manufacturer.name }}
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <b>Стоимость, ₽</b>
          </td>
          <td>
            {{ product.price }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Вес</b>
          </td>
          <td>
            {{ product.weight }}
          </td>
        </tr>
        <tr>
          <td>
            <b>Объем</b>
          </td>
          <td>
            {{ product.volume }}
          </td>
        </tr>
        <tr v-if="product.isPackaged">
          <td>
            <b>Количество товара в упаковке</b>
          </td>
          <td>
            {{ product.quantityInPackage }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-between p-5">
      <router-link :to="{
        name: 'productFormEdit',
        params: {
          id: id
        }}"
      >
        <button class="btn btn-outline-primary">
          Редактировать
        </button>
      </router-link>

      <button class="btn btn-outline-danger" @click="deleteProduct">Удалить</button>

      <div v-if="isImageLoadSectionOpen">
        <input type="file" accept="image/*" class="form-control-file"
               @change="updatePhoto($event.target.files)">
        <button class="btn btn-outline-info mt-2" @click="saveProductImage">Сохранить</button>
      </div>
      <div v-else>
        <button class="btn btn-outline-info" @click="openLoadImageSection">Добавить/изменить изображение</button>
      </div>
    </div>
  </div>


</template>

<script>


import ProductDataService from "@/services/ProductDataService";

export default {
  name: "product",
  props: [
    'id'
  ],
  mounted() {
    this.getProduct()
  },
  data() {
    return {
      product: {
        imageLink: '',
        id: '',
        name: '',
        description: '',
        category: '',
        manufacturer: '',
        price: '',
        weight: '',
        volume: '',
        isPackaged: false,
        quantityInPackage: 1
      },
      isImageLoadSectionOpen: false,
      productPhoto: {}
    }
  },

  methods: {
    getProduct() {
      ProductDataService
          .get(this.id)
          .then(response => {
            let data = response.data;
            this.product.id = data.id
            this.product.name = data.name
            this.product.description = data.description
            this.product.category = data.productCategory
            this.product.manufacturer = data.manufacturer
            this.product.price = data.price
            this.product.weight = data.weight
            this.product.volume = data.volume
            this.product.isPackaged = data.isPackaged
            this.product.quantityInPackage = data.quantityInPackage
            this.addImageLinkForProduct()
          })
          .catch(e => {
            console.log(e);
          });
    },
    addImageLinkForProduct() {
      return ProductDataService
          .getImageLink(this.id)
          .then(response => {
            let data = response.data;
            this.product.imageLink = data.link
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteProduct() {
      ProductDataService
          .delete(this.id)
          .then(response => {
            console.log(response)
            this.$router.push("/product")
          })
          .catch(e => {
            console.log(e);
          });
    },
    openLoadImageSection() {
      this.isImageLoadSectionOpen = true
    },
    updatePhoto(files) {
      if (!files.length) return;

      this.photo = {
        name: files[0].name,
        data: files[0]
      };
    },
    saveProductImage() {
      let formData = new FormData()
      formData.append('productImageFile', this.photo.data, this.photo.name)

      ProductDataService
          .addImage(this.id, formData)
          .then(response => {
            console.log(response)
            this.$router.push("/product")
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
}
</script>


<style scoped>
.big-product-image{
  height: 400px;
}
</style>