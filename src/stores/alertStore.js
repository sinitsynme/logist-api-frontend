import {defineStore} from "pinia";

const delay = ms => new Promise(res => setTimeout(res, ms));

export const useAlertStore = defineStore('alertStore', {

    state: () => ({
        message: '',
        isShown: false,
        isError: false,
        isFloating: false,
        temporaryTimer: 5
    }),

    actions: {
        showAlert(message, isError) {
            this.message = message
            this.isError = isError
            this.isShown = true
        },

        stopShowingAlert() {
            this.message = ''
            this.isShown = false
            this.isFloating = false
        },

        async showTemporaryAlert(message, isError, time = 5) {
            this.showAlert(message, isError)
            await delay(time * 1000)
            this.stopShowingAlert()
        }

    }
})

