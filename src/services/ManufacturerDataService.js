import logapiAxios from "../http-common";

class ManufacturerDataService {
    get(id) {
        return logapiAxios.get(`/product/rest/api/v1/manufacturer/${id}`);
    }

    getPage(page, size) {
        return logapiAxios.get(`/product/rest/api/v1/manufacturer?page=${page}&size=${size}`);
    }

    create(manufacturer) {
        return logapiAxios.post(`/product/rest/api/v1/manufacturer`, manufacturer);
    }

    edit(manufacturer, id) {
        return logapiAxios.put(`/product/rest/api/v1/manufacturer/${id}`, manufacturer)
    }

    delete(id) {
        return logapiAxios.delete(`/product/rest/api/v1/manufacturer/${id}`)
    }

}

export default new ManufacturerDataService()