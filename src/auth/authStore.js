import {defineStore} from "pinia"
import AuthDataService from "@/auth/AuthDataService";
import {jwtDecode} from "jwt-decode";

function parseJwt(token) {
    return jwtDecode(token)
}

function unauthorizedUser() {
    return {
        isAuthenticated: false,
        userEmail: '',
        userId: '',
        jwtPair: null,
        userRoles: ['UNAUTHORIZED']
    }
}

function getUserFromLocalStorage() {
    let userData = localStorage.getItem("user")
    if (userData === null || userData === "{}") {
        return unauthorizedUser()
    }
    else return JSON.parse(userData)
}

function setUserInLocalStorage(jwtPair) {
    const decodedJwt = parseJwt(jwtPair.accessToken)

    const userEmail = decodedJwt.sub
    const userId = decodedJwt.user_id
    const userRoles = decodedJwt.authorities
    const isAuthenticated = true

    let userData = {
        jwtPair,
        userRoles,
        userEmail,
        userId,
        isAuthenticated
    }

    localStorage.setItem("user", JSON.stringify(userData))
}

export const useAuthStore = defineStore('authStore', {
    state: () => (
        {
            user: getUserFromLocalStorage()
        }
    ),
    actions: {
        async login(email, password) {
            const jwtPair = (await AuthDataService.getToken(email, password)).data
            setUserInLocalStorage(jwtPair)
        },

        async refreshToken(jwtPair) {
            let refreshToken = jwtPair.refreshToken
            const refreshedJwtPair =  (await AuthDataService.refreshToken(refreshToken)).data
            setUserInLocalStorage(refreshedJwtPair)
        },

        logout() {
            localStorage.setItem("user", "{}")
        }
    }
})