import http from "../http-common";

class ManufacturerDataService {
    get(id) {
        return http.get(`/product/rest/api/v1/manufacturer/${id}`);
    }

    getPage(page, size) {
        return http.get(`/product/rest/api/v1/manufacturer?page=${page}&size=${size}`);
    }

    create(manufacturer) {
        return http.post(`/product/rest/api/v1/manufacturer`, manufacturer);
    }

    edit(manufacturer, id) {
        return http.put(`/product/rest/api/v1/manufacturer/${id}`, manufacturer)
    }

    delete(id) {
        return http.delete(`/product/rest/api/v1/manufacturer/${id}`)
    }

}

export default new ManufacturerDataService()