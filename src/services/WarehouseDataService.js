import http from "../http-common";

class WarehouseDataService {
    get(id) {
        return http.get(`/warehouse/rest/api/v1/warehouse/${id}`);
    }

    getPage(page, size) {
        return http.get(`/warehouse/rest/api/v1/warehouse?page=${page}&size=${size}`);
    }

    create(warehouse) {
        return http.post(`/warehouse/rest/api/v1/warehouse`, warehouse);
    }

    edit(warehouse, id) {
        return http.put(`/warehouse/rest/api/v1/warehouse/${id}`, warehouse)
    }

    delete(id) {
        return http.delete(`/warehouse/rest/api/v1/warehouse/${id}`)
    }

}

export default new WarehouseDataService()