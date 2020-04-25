<template>
    <div class="cash-product-card">
        <v-btn
            min-height="120"
            min-width="232"
            color="primary"
            tile
            @click="addToCart"
            >{{ obj.productName }}{{ cart }}</v-btn
        >
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
            }
        }
    },
    computed: {
        cart() {
            console.log('11111111111111111')
            return this.$store.getters['cart/cart']
        }
    },
    watch: {
        count() {
            return 1
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch('cart/ADD_TO_CART', {
                product: this.obj,
                quantity: 1
            })
        }
    }
}
</script>

<style scoped></style>
