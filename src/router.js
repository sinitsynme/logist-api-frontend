import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/main",
    name: "main-page",
    component: () => import("./components/Main")
  },
  {
    path: "/login",
    alias: "/login",
    name: "login-page",
    component: () => import("./components/LoginForm.vue")
  },
  {
    path: "/manufacturer",
    alias: "/manufacturer-list",
    name: "manufacturer-list",
    component: () => import("./components/manufacturer/ManufacturerList.vue")
  },
  {
    path: "/manufacturer/:id",
    name: "manufacturer",
    props: true,
    component: () => import("./components/manufacturer/Manufacturer.vue")
  },
  {
    path: "/manufacturerCreate",
    name: "manufacturerForm",
    component: () => import("./components/manufacturer/ManufacturerForm.vue")
  },
  {
    path: "/manufacturerEdit/:id",
    name: "manufacturerFormEdit",
    props: true,
    component: () => import("./components/manufacturer/ManufacturerEditForm.vue")
  },
  {
    path: "/productCategory",
    name: "productCategoryList",
    component: () => import("./components/product_category/ProductCategoryList.vue")
  },
  {
    path: "/productCategory/:code",
    name: "productCategory",
    props: true,
    component: () => import("./components/product_category/ProductCategory.vue")
  },
  {
    path: "/productCategoryCreate",
    name: "productCategoryForm",
    component: () => import("./components/product_category/ProductCategoryForm.vue")
  },
  {
    path: "/productCategoryEdit/:code",
    name: "productCategoryFormEdit",
    props: true,
    component: () => import("./components/product_category/ProductCategoryEditForm.vue")
  },
  {
    path: "/product",
    alias: "/product-list",
    name: "product-list",
    component: () => import("./components/product/ProductList.vue")
  },
  {
    path: "/product/search",
    alias: "/product-search",
    name: "product-search",
    meta: {
      refresh: true
    },
    component: () => import("./components/product/ProductSearchResult.vue")
  },
  {
    path: "/product/:id",
    name: "product",
    props: true,
    component: () => import("./components/product/Product.vue")
  },
  {
    path: "/productCreate",
    name: "productForm",
    component: () => import("./components/product/ProductForm.vue")
  },
  {
    path: "/productEdit/:id",
    name: "productFormEdit",
    props: true,
    component: () => import("./components/product/ProductEditForm.vue")
  },
  {
    path: "/organization",
    alias: "/organization-list",
    name: "organization-list",
    component: () => import("./components/organization/OrganizationList.vue")
  },
  {
    path: "/organization/:id",
    name: "organization",
    props: true,
    component: () => import("./components/organization/Organization.vue")
  },
  {
    path: "/organizationCreate",
    name: "organizationForm",
    component: () => import("./components/organization/OrganizationForm.vue")
  },
  {
    path: "/organizationEdit/:id",
    name: "organizationFormEdit",
    props: true,
    component: () => import("./components/organization/OrganizationEditForm.vue")
  },
  {
    path: "/warehouse",
    alias: "/warehouse-list",
    name: "warehouse-list",
    component: () => import("./components/warehouse/WarehouseList.vue")
  },
  {
    path: "/warehouse/:id",
    name: "warehouse",
    props: true,
    component: () => import("./components/warehouse/Warehouse.vue")
  },
  {
    path: "/warehouseCreate",
    name: "warehouseForm",
    component: () => import("./components/warehouse/WarehouseForm.vue")
  },
  {
    path: "/warehouseEdit/:id",
    name: "warehouseFormEdit",
    props: true,
    component: () => import("./components/warehouse/WarehouseEditForm.vue")
  },
  {
    path: "/storedProduct/warehouse/:warehouseId",
    name: "storedProductList",
    props: true,
    component: () => import("./components/stored_product/ProductInWarehouseList.vue")
  },
  {
    path: "/storedProduct/:productId/:warehouseId",
    name: "storedProduct",
    props: true,
    component: () => import("./components/stored_product/ProductInWarehouse.vue")
  },
  {
    path: "/addStoredProduct/:warehouseId",
    name: "addStoredProduct",
    props: true,
    component: () => import("./components/stored_product/AddStoredProduct.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;