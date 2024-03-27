import logapiAxios from "../axios/http-common";

class OrderDataService {

    get(id) {
        return logapiAxios.get(`/order/rest/api/v1/order/${id}`)
    }
    create(order) {
        return logapiAxios.post(`/order/rest/api/v1/order`, order)
    }

}

export default new OrderDataService()