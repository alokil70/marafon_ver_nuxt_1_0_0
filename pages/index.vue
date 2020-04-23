<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <div class="text-center my-4">
                <v-btn x-large to="/teatre" color="primary">Режим МЕНЮ</v-btn>
                <v-btn x-large to="/products" color="primary"
                    >Режим КАССА</v-btn
                >
                <v-btn x-large color="primary">Режим менеджера</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    components: {},
    fetch({ store }) {
        store.dispatch('products/GET_PRODUCTS_FROM_API')
        store.dispatch('products/GET_CATEGORY_FROM_API')
    }
}
</script>
