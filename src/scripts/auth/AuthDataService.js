import logapiAxios from "../../axios/http-common";
import axiosWithoutInterceptor from "@/axios/axiosWithoutInterceptor";

class AuthDataService {
    async getToken(email, password) {
        return axiosWithoutInterceptor.post(`/auth/rest/api/v1/token`, {email, password})
    }

    async refreshToken(refreshToken) {
        return axiosWithoutInterceptor.post(`/auth/rest/api/v1/token/refresh?refreshToken=${refreshToken}`)
    }

    async register(user) {
        return logapiAxios.post('/auth/rest/api/v1/signup/client', user)
    }

    async getUserData(id) {
        return logapiAxios.get(`/auth/rest/api/v1/user/${id}`)
    }

    async getUserDataAdmin(id) {
        return logapiAxios.get(`/auth/rest/api/v1/user/admin-id/${id}`)
    }

    async updateUserData(id, userData) {
        return logapiAxios.patch(`/auth/rest/api/v1/user/${id}/data`, userData)
    }

    async changePassword(id, password) {
        return logapiAxios.patch(`/auth/rest/api/v1/user/${id}/password`, {password: password})
    }
}

export default new AuthDataService()