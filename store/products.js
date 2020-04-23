import axios from '../.nuxt/axios'
export const URL = 'http://192.168.0.3:9090'

export const state = () => ({
    products: []
})

export const mutations = {
    SET_PRODUCTS_TO_STATE: (state, payload) => (state.products = payload)
}
export const actions = {
    GET_PRODUCTS_FROM_API({ commit }) {
        return axios(URL + '/api/products', {
            method: 'GET'
        })
            .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products.data)
                return products.data
            })
            .catch((error) => console.log(error))
    }
}
