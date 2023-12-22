import http from "../http-common";

class StoredProductDataService {
    get(productId, warehouseId) {
        return http.get(`/warehouse/rest/api/v1/warehouse/product/id?productId=${productId}&warehouseId=${warehouseId}`);
    }

    getPage(page, size, warehouseId) {
        return http.get(`/warehouse/rest/api/v1/warehouse/product?page=${page}&size=${size}&warehouseId=${warehouseId}`);
    }

    addProductToWarehouse(requestBody) {
        return http.post(`/warehouse/rest/api/v1/warehouse/product`, requestBody);
    }

    reserveProduct(requestBody) {
        return http.put(`/warehouse/rest/api/v1/warehouse/product/reserve`, requestBody)
    }

    removeReservedProduct(requestBody) {
        return http.put(`/warehouse/rest/api/v1/warehouse/product/remove`, requestBody)
    }

}

export default new StoredProductDataService()