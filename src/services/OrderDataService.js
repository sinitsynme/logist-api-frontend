import logapiAxios from "../axios/http-common";

class OrderDataService {

    get(id) {
        return logapiAxios.get(`/order/rest/api/v1/order/${id}`)
    }

    getByAddressId(addressId, pageRequest) {
        return this.getByAddressIdWithStatuses(addressId, [
            'NEW',
            'IN_PROGRESS',
            'READY_TO_DELIVER',
            'DELIVERY',
            'DONE',
            'REJECTED',
            'RETURNED',
            'PARTIALLY_RETURNED',
            'ABORTED']
        , pageRequest)
    }
    getByAddressIdWithStatuses(addressId, statuses, pageRequest) {
        let url = `/order/rest/api/v1/order/address/${addressId}?page=${pageRequest.page}&size=${pageRequest.size}&sortFromMaxToMin=${true}`
        let i,j
        for(i in statuses) {
            url += `&statuses=${statuses[i]}`
        }
        for (j in pageRequest.sortByFields) {
            url += `&sortByFields=${pageRequest.sortByFields[j]}`
        }

        return logapiAxios.get(url)
    }

    getByWarehouseId(warehouseId, pageRequest) {
        return this.getByWarehouseIdWithStatuses(warehouseId, [
                'NEW',
                'IN_PROGRESS',
                'READY_TO_DELIVER',
                'DELIVERY',
                'DONE',
                'REJECTED',
                'RETURNED',
                'PARTIALLY_RETURNED',
                'ABORTED']
            , pageRequest)
    }
    getByWarehouseIdWithStatuses(warehouseId, statuses, pageRequest) {
        let url = `/order/rest/api/v1/order/warehouseId/${warehouseId}?page=${pageRequest.page}&size=${pageRequest.size}&sortFromMaxToMin=${true}`
        let i,j
        for(i in statuses) {
            url += `&statuses=${statuses[i]}`
        }
        for (j in pageRequest.sortByFields) {
            url += `&sortByFields=${pageRequest.sortByFields[j]}`
        }

        return logapiAxios.get(url)
    }
    create(order) {
        return logapiAxios.post(`/order/rest/api/v1/order`, order)
    }

    changeOrderPaymentType(id, paymentType) {
        return logapiAxios.patch(`/order/rest/api/v1/order/${id}/payment/type`, paymentType)
    }

    changeOrderPaymentStatus(id, status) {
        return logapiAxios.patch(`/order/rest/api/v1/order/${id}/payment/status`, status)
    }

    changeOrderStatus(id, status) {
        return logapiAxios.patch(`/order/rest/api/v1/order/${id}/status`, status)
    }

    getEventsByOrderId(id) {
        return logapiAxios.get(`/order/rest/api/v1/order/event/${id}`)
    }

}

export default new OrderDataService()