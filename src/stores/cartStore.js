import {defineStore} from "pinia";

const CART = "cart"

function getCartFromLocalStorage() {
    let optCart = localStorage.getItem(CART)
    if (optCart == null) {
        localStorage.setItem('cart', JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(CART))
}

export const useCartStore = defineStore('cartStore', {

    state: () => ({
        cart: getCartFromLocalStorage(),
        confirmedOrder: {}
    }),

    actions: {
        addItemToCart(warehouseId, productId, quantity) {
            let i
            let preparedOrder

            for (i in this.cart) {
                if (this.cart[i].warehouseId === warehouseId) {
                    preparedOrder = this.cart[i]
                }
            }

            if (typeof preparedOrder === 'undefined') {
                this.cart.push(
                    {
                        warehouseId: warehouseId,
                        products: [{
                            productId: productId,
                            quantity: quantity
                        }]
                    }
                )
            } else {
                let products = preparedOrder.products
                let j
                let product
                for (j in products) {
                    if (products[j].productId === productId) {
                        product = products[j]
                    }
                }

                if (typeof product === 'undefined') {
                    preparedOrder.products.push({
                        productId: productId,
                        quantity: quantity
                    })
                } else {
                    product.quantity += quantity
                }
            }
            this.setCart(this.cart)
            this.recalculateOrderPrice()
        },

        removeWarehouseFromCart(warehouseId) {
            this.cart = this.cart.filter(it => it.warehouseId !== warehouseId)
            this.setCart(this.cart)
        },

        removeProductFromCart(warehouseId, productId) {
            let i
            let preparedOrder

            for (i in this.cart) {
                if (this.cart[i].warehouseId === warehouseId) {
                    preparedOrder = this.cart[i]
                }
            }

            preparedOrder.products = preparedOrder.products.filter(it => it.productId !== productId)
            this.cart = this.cart.filter(it => it.products.length !== 0)
            this.recalculateOrderPrice()
        },

        getPreparedOrder(warehouseId) {
            let i
            let preparedOrder

            for (i in this.cart) {
                if (this.cart[i].warehouseId === warehouseId) {
                    preparedOrder = this.cart[i]
                }
            }
            return preparedOrder
        },

        recalculateOrderPrice() {
            let i
            for (i in this.cart) {
                let preparedOrder = this.cart[i]
                let j
                let orderSum = 0;
                for (j in preparedOrder.products) {
                    let product = preparedOrder.products[j]
                    orderSum += product.price * product.quantity
                }
                preparedOrder.sum = orderSum
            }
            this.setCart(this.cart)
        },

        setCart(cart) {
            localStorage.setItem(CART, JSON.stringify(cart))
        },


    }


})