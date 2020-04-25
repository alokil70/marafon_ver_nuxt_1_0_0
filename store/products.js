export const state = () => ({
    products: [],
    category: [],
})

export const mutations = {
    SET_PRODUCTS_TO_STATE(state, payload) {
        state.products = payload
    },
    SET_CATEGORY_TO_STATE(state, payload) {
        state.category = payload
    },
}
export const actions = {
    async GET_PRODUCTS_FROM_API({ commit }) {
        const response = await this.$axios.get('/products')
        commit('SET_PRODUCTS_TO_STATE', response.data)
    },
    async GET_CATEGORY_FROM_API({ commit }) {
        const response = await this.$axios.get('/category')
        commit('SET_CATEGORY_TO_STATE', response.data)
    },
}

export const getters = {
    PRODUCTS: (s) => s.products,
    CATEGORY: (s) => s.category,
}
