import logapiAxios from "../http-common";

class AuthDataService {
    async getToken(email, password) {
        return logapiAxios.post(`/auth/rest/api/v1/token`, {email, password})
    }

    async refreshToken(refreshToken) {
        return logapiAxios.post('/auth/rest/api/v1/token/refresh', {refreshToken})
    }

    async register(user) {
        return logapiAxios.post('/auth/rest/api/v1/signup/client', user)
    }

    async getUserData(id) {
        return logapiAxios.get(`/auth/rest/api/v1/user/${id}`)
    }

    async updateUserData(id, userData) {
        return logapiAxios.patch(`/auth/rest/api/v1/user/${id}/data`, userData)
    }
}

export default new AuthDataService()