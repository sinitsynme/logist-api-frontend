import logapiAxios from "../http-common";

class AuthDataService {
    async getToken(email, password) {
        // edit token url in API (auth/rest/api/v1/token...)
        return logapiAxios.post(`/auth/rest/api/v1/token`, {email, password})
    }

    refreshToken(refreshToken) {
        return logapiAxios.post('/auth/rest/api/v1/token/refresh', {refreshToken})
    }
}

export default new AuthDataService()