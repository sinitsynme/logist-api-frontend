import logapiAxios from "../axios/http-common";

class OrganizationDataService {
    get(id) {
        return logapiAxios.get(`/warehouse/rest/api/v1/organization/${id}`);
    }

    getPage(statuses, page, size) {
        let url = `/warehouse/rest/api/v1/organization?page=${page}&size=${size}&sortByFields=id`
        let i
        for (i in statuses) {
            url += `&statuses=${statuses[i]}`
        }
        return logapiAxios.get(url);
    }

    getPageByOwner(statuses, ownerId, page, size) {
        let url = `/warehouse/rest/api/v1/organization/owner-id/${ownerId}?page=${page}&size=${size}&sortByFields=id`
        let i
        for (i in statuses) {
            url += `&statuses=${statuses[i]}`
        }
        return logapiAxios.get(url);
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

    changeStatus(id, status) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/organization/${id}/status`, {status: status})
    }

    changeOwner(id, ownerId) {
        return logapiAxios.patch(`/warehouse/rest/api/v1/organization/${id}/owner`, {userId: ownerId})
    }

}

export default new OrganizationDataService()