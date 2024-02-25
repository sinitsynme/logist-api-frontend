import {defineStore} from "pinia"
import AuthDataService from "@/auth/AuthDataService";
import {jwtDecode} from "jwt-decode";

function parseJwt(token) {
    return jwtDecode(token)
}

export const useAuthStore = defineStore('authStore', {
    state: () => (
        {
            isAuthenticated: false,
            userEmail: '',
            userId: '',
            jwtPair: null,
            userRoles: ['UNAUTHORIZED']
        }
    ),
    actions: {
        async login(email, password) {
            this.jwtPair = (await AuthDataService.getToken(email, password)).data
            const decodedJwt = parseJwt(this.jwtPair.accessToken)
            this.userEmail = decodedJwt.sub
            this.userId = decodedJwt.user_id
            this.userRoles = decodedJwt.authorities
            this.isAuthenticated = true
        },

        logout() {
            this.jwtPair = null
            this.isAuthenticated = false
            this.userRoles = ['UNAUTHORIZED']
            this.userId = ''
            this.userEmail = ''
        }
    }
})