import {defineStore} from "pinia";

const MODE = "mode"
export const MODE_SHOP = "shop"
export const MODE_MANAGEMENT = "management"

function getModeFromLocalStorage() {
    let optMode = localStorage.getItem(MODE)
    if (optMode == null) {
        localStorage.setItem('mode', JSON.stringify({modeValue: MODE_SHOP}))
    }
    return JSON.parse(localStorage.getItem(MODE)).modeValue
}

export const useModeStore = defineStore('modeStore', {
    state: () => (
        {
            mode: getModeFromLocalStorage()
        }
    ),
    actions: {
        isShopMode() {
            return this.mode === MODE_SHOP
        },
        isManagementMode() {
            return this.mode === MODE_MANAGEMENT
        },
        setMode(modeValue) {
            localStorage.setItem(MODE, JSON.stringify({modeValue: modeValue}))
        }
    }
})