<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6 class="d-flex flex-wrap">
            <products-list
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
            <div class="text-center my-4">
                teatre
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ProductsList from '../components/ProductsList'

export default {
    name: 'Teatre',
    layout: 'teatre',
    components: { ProductsList },
    async fetch({ store }) {
        await store.dispatch('products/GET_PRODUCTS_FROM_API')
        await store.dispatch('products/GET_CATEGORY_FROM_API')
    },
    /* async fetch({ store }) {
        await store.dispatch('products/GET_PRODUCTS_FROM_API')
    }, */
    computed: {
        ...mapState({
            products: (state) => state.products.products
        })
    }
}
</script>

<style scoped></style>
