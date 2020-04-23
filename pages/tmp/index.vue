<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <div v-for="item in navList" :key="item.to">
                <v-btn
                    class="mb-4"
                    tile
                    x-large
                    block
                    :to="item.to"
                    color="primary"
                >
                    {{ item.title }}
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            navList: [
                {
                    title: 'Режим меню',
                    to: '/teatre'
                },
                {
                    title: 'Режим КАССА',
                    to: '/cash'
                },
                {
                    title: 'Режим менеджер',
                    to: '/'
                }
            ]
        }
    },
    mounted() {
        this.$store.dispatch('products/GET_PRODUCTS_FROM_API')
        this.$store.dispatch('products/GET_CATEGORY_FROM_API')
    }
}
</script>
