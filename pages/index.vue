<template>
    <v-container>
        <div class="mt-12">
            <v-col cols="12">
                <v-row align="center" justify="center">
                    <v-card
                        v-for="item in navList"
                        :key="item.to"
                        :to="item.to"
                        class="ma-8"
                        outlined
                        min-width="350px"
                    >
                        <v-btn
                            color="primary"
                            class="md-8 headline"
                            x-large
                            block
                            height="100px"
                            :to="item.to"
                            elevation="18"
                        >
                            {{ item.title }}
                        </v-btn>
                    </v-card>
                </v-row>
            </v-col>
        </div>
    </v-container>
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
                    to: '/manager'
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
<style scoped></style>
