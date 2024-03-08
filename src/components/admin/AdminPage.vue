<template>
  <div class="container mt-3">
    <div>
      <h4>Управление складами</h4>
    </div>

    <div>
      <router-link to="/organization">Список складских предприятий
      </router-link>
    </div>

    <div>
      <router-link to="/warehouse">Список складов
      </router-link>
    </div>

    <div>
      <h4>Управление товарами</h4>
    </div>
    <div>
      <router-link to="/productCategory">Список категорий товаров
      </router-link>
    </div>

    <div>
      <router-link to="/manufacturer">Список производителей
      </router-link>
    </div>

    <div>
      <router-link to="/product">Список товаров
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "AdminPage",
}
</script>