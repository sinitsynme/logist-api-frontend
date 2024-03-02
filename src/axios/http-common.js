import axios from "axios";
import {useAuthStore} from "@/stores/authStore";
import router from "@/router";

function refreshTokenIfNeeded(jwtPair) {
    let authStore = useAuthStore()
    let now = Date.now()
    let accessTokenExpiresAt = Date.parse(jwtPair.accessTokenExpiresAt)
    if (now > accessTokenExpiresAt) {
        let refreshTokenExpiresAt = Date.parse(jwtPair.refreshTokenExpiresAt)
        if (now > refreshTokenExpiresAt) {
            authStore.logout()
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

export default logapiAxios;