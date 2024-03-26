import logapiAxios from "../axios/http-common";

class OrderDataService {

    create(order) {
        return logapiAxios.post(`/order/rest/api/v1/order`, order)
    }

}

export default new OrderDataService()