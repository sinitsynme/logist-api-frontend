import logapiAxios from "../http-common";

class WarehouseDataService {
    get(id) {
        return logapiAxios.get(`/warehouse/rest/api/v1/warehouse/${id}`);
    }

    getPage(page, size) {
        return logapiAxios.get(`/warehouse/rest/api/v1/warehouse?page=${page}&size=${size}`);
    }

    create(warehouse) {
        return logapiAxios.post(`/warehouse/rest/api/v1/warehouse`, warehouse);
    }

    edit(warehouse, id) {
        return logapiAxios.put(`/warehouse/rest/api/v1/warehouse/${id}`, warehouse)
    }

    delete(id) {
        return logapiAxios.delete(`/warehouse/rest/api/v1/warehouse/${id}`)
    }

}

export default new WarehouseDataService()