<template>
    <v-container>
        <div>
            <v-col cols="12">
                <v-row
                    align="center"
                    justify="center"
                    class="grey lighten-5"
                    style="height: 300px;"
                >
                    <v-card
                        v-for="item in navList"
                        :key="item.to"
                        :to="item.to"
                        class="ma-3 pa-4"
                        outlined
                        tile
                        width="400"
                    >
                        <v-btn
                            class="md-4"
                            tile
                            x-large
                            block
                            :to="item.to"
                            color="primary"
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
