export const state = () => ({
    cart: [],
})

export const mutations = {
    ADD_TO_CART(state, { product, quantity }) {
        const productCart = state.cart.find((i) => i.product.id === product.id)
        if (productCart) {
            productCart.quantity++
            return
        }
        state.cart.push({ product, quantity })
    },
}
export const actions = {
    ADD_TO_CART({ commit }, { product, quantity }) {
        commit('ADD_TO_CART', { product, quantity })
    },
}

export const getters = {
    CART: (s) => s.cart,
}
