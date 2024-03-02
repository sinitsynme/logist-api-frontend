import logapiAxios from "../axios/http-common";

class StoredProductDataService {
    get(productId, warehouseId) {
        return logapiAxios.get(`/warehouse/rest/api/v1/warehouse/product/id?productId=${productId}&warehouseId=${warehouseId}`);
    }

    getPage(page, size, warehouseId) {
        return logapiAxios.get(`/warehouse/rest/api/v1/warehouse/product?page=${page}&size=${size}&warehouseId=${warehouseId}`);
    }

    registerProductInWarehouse(requestBody) {
        return logapiAxios.post(`/warehouse/rest/api/v1/warehouse/product`, requestBody);
    }

    addProductToWarehouse(requestBody) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/warehouse/product/add`, requestBody);
    }

    reserveProduct(requestBody) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/warehouse/product/reserve`, requestBody)
    }

    removeReservedProduct(requestBody) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/warehouse/product/remove`, requestBody)
    }

}

export default new StoredProductDataService()