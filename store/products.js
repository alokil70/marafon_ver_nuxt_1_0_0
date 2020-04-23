export const state = () => ({
    products: []
})

export const mutations = {
    SET_PRODUCTS_TO_STATE(state, payload) {
        state.products = payload
    }
}
export const actions = {
    async GET_PRODUCTS_FROM_API({ commit }) {
        const response = await this.$axios.get('/products')
        commit('SET_PRODUCTS_TO_STATE', response.data)
    }
}
export const getters = {
    PRODUCTS: (s) => s.products
}
