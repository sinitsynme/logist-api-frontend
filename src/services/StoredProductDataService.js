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

    cancelReserveOfProduct(requestBody) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/warehouse/product/reserve/cancel`, requestBody)
    }

    removeReservedProduct(requestBody) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/warehouse/product/remove`, requestBody)
    }

    updateQuantumAndPrice(requestBody) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/warehouse/product`, requestBody)
    }

    async getProductsMinPrices(idArray) {
        let baseUrl = "/warehouse/rest/api/v1/warehouse/product/minimalPrice?"
        let i
        for (i in idArray) {
            baseUrl += `productIds=${idArray[i]}&`
        }
        let queryUrl = baseUrl.substring(0, baseUrl.length - 1)
        return logapiAxios.get(queryUrl)
    }

    async getProductAvailabilityInfo(id) {
        return logapiAxios.get(`/warehouse/rest/api/v1/warehouse/product/${id}/info`)
    }

}

export default new StoredProductDataService()