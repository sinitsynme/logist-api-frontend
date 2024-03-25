import logapiAxios from "../axios/http-common";

class ClientOrganizationDataService {
    get(inn) {
        return logapiAxios.get(`/order/rest/api/v1/clientOrganization/${inn}`);
    }

    getPageByClientId(clientId, page, size) {
        return logapiAxios.get(`/order/rest/api/v1/clientOrganization/clientId/${clientId}?page=${page}&size=${size}`);
    }

    create(organization) {
        return logapiAxios.post(`/order/rest/api/v1/clientOrganization`, organization)
    }

    edit(organization, inn) {
        return logapiAxios.put(`/order/rest/api/v1/clientOrganization/${inn}`, organization)
    }

    changeStatus(inn, status) {
        return logapiAxios.patch(`/order/rest/api/v1/clientOrganization/${inn}/status`, {status: status})
    }

    addAddress(inn, address) {
        return logapiAxios.patch(`/order/rest/api/v1/clientOrganization/${inn}/address`, address)
    }
}

export default new ClientOrganizationDataService()