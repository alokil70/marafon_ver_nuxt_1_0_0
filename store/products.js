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
        const response = await this.$axios.get('api/products')
        commit('SET_PRODUCTS_TO_STATE', response.data)
    },
    async GET_CATEGORY_FROM_API({ commit }) {
        const response = await this.$axios.get('api/category')
        commit('SET_CATEGORY_TO_STATE', response.data)
    },
    async POST_CATEGORY_TO_API({ commit }, postData) {
        await this.$axios.post('api/category', postData)
    },
    async POST_PRODUCT_TO_API({ commit }, postData) {
        await this.$axios.post('api/products', postData)
    },
    async DELETE_PRODUCT_FROM_API({ commit }, productId) {
        await this.$axios.post('api/products/delete/' + productId)
    },
    async DELETE_CATEGORY_FROM_API({ commit }, productId) {
        await this.$axios.post('api/category/delete/' + productId)
    },
}

export const getters = {
    PRODUCTS: (s) => s.products,
    CATEGORY: (s) => s.category,
}
