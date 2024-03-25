import axios from "axios";
import {useAuthStore} from "@/stores/authStore";
import router from "@/router";

const ERROR_STATUSES = [403, 404]

function refreshTokenIfNeeded(jwtPair) {
    let authStore = useAuthStore()
    let now = Date.now()
    let accessTokenExpiresAt = Date.parse(jwtPair.accessTokenExpiresAt)
    if (now > accessTokenExpiresAt) {
        let refreshTokenExpiresAt = Date.parse(jwtPair.refreshTokenExpiresAt)
        if (now > refreshTokenExpiresAt) {
            authStore.logout()
            router.push("/login")
        }
        authStore.refreshToken(jwtPair).catch(e => {
            console.log(e)
            authStore.logout()
            router.push("/login")
        })
    }
}


let logapiAxios = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-type": "application/json",
    }
});



logapiAxios.interceptors.request.use((request) => {
    let jwtPair = JSON.parse(localStorage.getItem("user")).jwtPair
    if (jwtPair != null) {
        refreshTokenIfNeeded(jwtPair)
        request.headers.Authorization = `Bearer ${jwtPair.accessToken}`
    }

    return request
})

logapiAxios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (ERROR_STATUSES.includes(error.response.status)) {
        router.push(`/error/${error.response.status}`)
    }
})

export default logapiAxios;