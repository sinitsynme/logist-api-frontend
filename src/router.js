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
    name: "login",
    component: () => import("./components/LoginForm.vue")
  },
  {
    path: "/signup",
    alias: "/signup",
    name: "signup",
    component: () => import("./components/personal/SignupForm.vue")
  },
  {
    path: "/catalogue",
    alias: "/catalogue",
    name: "catalogue",
    component: () => import("./components/catalogue/Catalogue.vue")
  },
  {
    path: "/cart",
    alias: "/cart",
    name: "cart",
    component: () => import("./components/order/Cart.vue")
  },

  {
    path: "/order/confirmation",
    alias: "/order/confirmation",
    name: "OrderConfirmation",
    component: () => import("./components/order/OrderConfirmation.vue")
  },

  {
    path: "/orders/:id",
    alias: "/orders/:id",
    name: "ClientOrder",
    props: true,
    component: () => import("./components/order/ClientOrder.vue")
  },

  {
    path: "/orders",
    alias: "/orders",
    name: "ClientOrderList",
    props: true,
    component: () => import("./components/order/ClientOrderList.vue")
  },

  {
    path: "/product/:id",
    alias: "/product/:id",
    name: "product",
    props: true,
    component: () => import("./components/product/Product.vue")
  },
  {
    path: "/personalCabinet",
    alias: "/personalCabinet",
    name: "personalCabinet",
    component: () => import("./components/personal/PersonalCabinet.vue")
  },
  {
    path: "/personalCabinet/edit",
    alias: "/personalCabinet/edit",
    name: "personalCabinetEdit",
    component: () => import("./components/personal/PersonalDataEditForm.vue")
  },
  {
    path: "/manufacturer",
    alias: "/manufacturer-list",
    name: "manufacturer-list",
    component: () => import("./components/admin/manufacturer/ManufacturerList.vue")
  },
  {
    path: "/manufacturer/:id",
    name: "manufacturer",
    props: true,
    component: () => import("./components/admin/manufacturer/Manufacturer.vue")
  },
  {
    path: "/manufacturerCreate",
    name: "manufacturerForm",
    component: () => import("./components/admin/manufacturer/ManufacturerForm.vue")
  },
  {
    path: "/manufacturerEdit/:id",
    name: "manufacturerFormEdit",
    props: true,
    component: () => import("./components/admin/manufacturer/ManufacturerEditForm.vue")
  },
  {
    path: "/productCategory",
    name: "productCategoryList",
    component: () => import("./components/admin/product_category/ProductCategoryList.vue")
  },
  {
    path: "/productCategory/:code",
    name: "productCategory",
    props: true,
    component: () => import("./components/admin/product_category/ProductCategory.vue")
  },
  {
    path: "/productCategoryCreate",
    name: "productCategoryForm",
    component: () => import("./components/admin/product_category/ProductCategoryForm.vue")
  },
  {
    path: "/productCategoryEdit/:code",
    name: "productCategoryFormEdit",
    props: true,
    component: () => import("./components/admin/product_category/ProductCategoryEditForm.vue")
  },
  {
    path: "/productManagementList",
    alias: "/product-list",
    name: "product-list",
    component: () => import("./components/admin/product/ProductList.vue")
  },
  {
    path: "/product/search",
    alias: "/product-search",
    name: "product-search",
    props: true,
    component: () => import("./components/catalogue/ProductSearchResult.vue")
  },
  {
    path: "/productManagement/:id",
    name: "productManagementPage",
    props: true,
    component: () => import("./components/admin/product/ProductManagementPage.vue")
  },
  {
    path: "/productCreate",
    name: "productForm",
    component: () => import("./components/admin/product/ProductForm.vue")
  },
  {
    path: "/productEdit/:id",
    name: "productFormEdit",
    props: true,
    component: () => import("./components/admin/product/ProductEditForm.vue")
  },
  {
    path: "/organization",
    alias: "/organization-list",
    name: "organization-list",
    component: () => import("./components/admin/organization/OrganizationList.vue")
  },
  {
    path: "/organization/:id",
    name: "organization",
    props: true,
    component: () => import("./components/admin/organization/Organization.vue")
  },
  {
    path: "/organizationCreate",
    name: "organizationForm",
    component: () => import("./components/admin/organization/OrganizationForm.vue")
  },
  {
    path: "/organizationEdit/:id",
    name: "organizationFormEdit",
    props: true,
    component: () => import("./components/admin/organization/OrganizationEditForm.vue")
  },
  {
    path: "/warehouse",
    alias: "/warehouse-list",
    name: "warehouse-list",
    component: () => import("./components/admin/warehouse/WarehouseList.vue")
  },
  {
    path: "/warehouse/:id",
    name: "warehouse",
    props: true,
    component: () => import("./components/admin/warehouse/Warehouse.vue")
  },
  {
    path: "/warehouse/:warehouseId/orders",
    name: "WarehouseOrderList",
    props: true,
    component: () => import("./components/admin/warehouse/WarehouseOrderList.vue")
  },
  {
    path: "/order/:orderId/management",
    name: "OrderManagement",
    props: true,
    component: () => import("./components/admin/warehouse/WarehouseOrder.vue")
  },
  {
    path: "/warehouseCreate",
    name: "warehouseForm",
    component: () => import("./components/admin/warehouse/WarehouseForm.vue")
  },
  {
    path: "/warehouseEdit/:id",
    name: "warehouseFormEdit",
    props: true,
    component: () => import("./components/admin/warehouse/WarehouseEditForm.vue")
  },
  {
    path: "/storedProduct/warehouse/:warehouseId",
    name: "storedProductList",
    props: true,
    component: () => import("./components/admin/stored_product/ProductInWarehouseList.vue")
  },
  {
    path: "/storedProduct/:productId/:warehouseId",
    name: "storedProduct",
    props: true,
    component: () => import("./components/admin/stored_product/ProductInWarehouse.vue")
  },
  {
    path: "/addStoredProduct/:warehouseId",
    name: "addStoredProduct",
    props: true,
    component: () => import("./components/admin/stored_product/AddStoredProduct.vue")
  },
  {
    path: "/admin",
    name: "adminPage",
    props: true,
    component: () => import("./components/admin/AdminPage.vue")
  },

  {
    path: "/error/:code",
    name: "error",
    props: true,
    component: () => import("./components/common/Error.vue")
  },

  {
    path: "/client/organizations",
    name: "ClientOrganizations",
    props: true,
    component: () => import("./components/clientOrganization/ClientOrganizationList.vue")
  },

  {
    path: "/client/organizations/create",
    name: "ClientOrganizationForm",
    props: true,
    component: () => import("./components/clientOrganization/ClientOrganizationForm.vue")
  },


  {
    path: "/client/organizations/:inn",
    name: "ClientOrganization",
    props: true,
    component: () => import("./components/clientOrganization/ClientOrganization.vue")
  },

  {
    path: "/client/organizations/:inn/address",
    name: "ClientOrganizationAddAddress",
    props: true,
    component: () => import("./components/clientOrganization/ClientOrganizationAddAddressForm.vue")
  },

  {
    path: "/client/organizations/:inn/edit",
    name: "ClientOrganizationEdit",
    props: true,
    component: () => import("./components/clientOrganization/ClientOrganizationEditForm.vue")
  },




];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;