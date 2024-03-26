import axiosWithoutInterceptor from "@/axios/axiosWithoutInterceptor";

class AddressDataService {

    async getAddressData(lat, lon) {
        return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`)
    }
    async getAddressDataAxios(lat, lon) {
        return axiosWithoutInterceptor.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`)
    }
}

export default new AddressDataService()