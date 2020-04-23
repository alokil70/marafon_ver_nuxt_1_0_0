<template>
    <div>
        <v-tabs background-color="white" color="deep-purple accent-4" right>
            <v-tab>Landscape</v-tab>
            <v-tab>City</v-tab>
            <v-tab>Abstract</v-tab>

            <v-tab-item v-for="n in 3" :key="n">
                <v-container fluid>
                    <v-row>
                        <v-col
                            v-for="i in products"
                            :key="i.id"
                            cols="5"
                            md="4"
                            align="center"
                            class="grey lighten-5"
                        >
                            <v-card
                                width="200"
                                min-height="70"
                                aspect-ratio="1"
                                justify="center"
                                class="primary white--text pa-2"
                                tile
                                >{{ i.productName }}</v-card
                            >
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { URL_IMG } from '../static/const'

export default {
    name: 'Cash',
    layout: 'cash',
    components: {},
    async fetch({ store }) {
        if (
            store.getters['products/PRODUCTS'].length === 0 &&
            store.getters['peoducts/CATEGORY'].length === 0
        ) {
            await store.dispatch('products/GET_PRODUCTS_FROM_API')
            await store.dispatch('products/GET_CATEGORY_FROM_API')
        }
    },
    data() {
        return {
            URL: URL_IMG
        }
    },
    computed: {
        ...mapState({
            products: (state) => state.products.products,
            category: (state) => state.products.category
        })
    }
}
</script>

<style scoped></style>
