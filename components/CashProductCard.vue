<template>
    <div class="cash-product-card">
        <v-card
            min-height="120"
            min-width="232"
            color="primary"
            tile
            class="headline white--text"
            @click="addToCart"
            >{{ obj.productName }}
            <v-btn color="pink" fab small dark absolute top right>{{
                co
            }}</v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'CashProductCard',
    props: {
        obj: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            co: null,
        }
    },
    computed: {},
    methods: {
        addToCart() {
            this.$store.dispatch('cart/ADD_TO_CART', {
                product: this.obj,
                quantity: 1,
            })
            this.co += 1
        },
    },
}
</script>

<style scoped></style>
