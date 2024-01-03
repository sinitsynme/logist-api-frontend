import http from "../http-common";

class OrganizationDataService {
    get(id) {
        return http.get(`/warehouse/rest/api/v1/organization/${id}`);
    }

    getPage(page, size) {
        return http.get(`/warehouse/rest/api/v1/organization?page=${page}&size=${size}`);
    }

    create(organization) {
        return http.post(`/warehouse/rest/api/v1/organization`, organization);
    }

    edit(organization, id) {
        return http.put(`/warehouse/rest/api/v1/organization/${id}`, organization)
    }

    delete(id) {
        return http.delete(`/warehouse/rest/api/v1/organization/${id}`)
    }

}

export default new OrganizationDataService()