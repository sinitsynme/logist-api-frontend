import logapiAxios from "../http-common";

class OrganizationDataService {
    get(id) {
        return logapiAxios.get(`/warehouse/rest/api/v1/organization/${id}`);
    }

    getPage(page, size) {
        return logapiAxios.get(`/warehouse/rest/api/v1/organization?page=${page}&size=${size}`);
    }

    create(organization) {
        return logapiAxios.post(`/warehouse/rest/api/v1/organization`, organization);
    }

    edit(organization, id) {
        return logapiAxios.put(`/warehouse/rest/api/v1/organization/${id}`, organization)
    }

    delete(id) {
        return logapiAxios.delete(`/warehouse/rest/api/v1/organization/${id}`)
    }

}

export default new OrganizationDataService()