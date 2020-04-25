<template>
    <v-card
        max-width="250"
        class="my-1 mx-1"
        outlined
        tile
        flat
        elevation="24"
        dark
        color="amber darken-4"
    >
        <v-img
            height="350"
            :src="`${URL}${product.imageName}`"
            alt="img"
            class="white--text align-end"
        >
            <v-col class="white--text text-center lightbox" cols="12">
                <h2 class="display-1 font-weight-light font-weight-medium">
                    {{ product.productName }}
                </h2>
            </v-col>
        </v-img>

        <v-card-subtitle class="display-1 font-weight-light pb-0 text-right">
            {{ product.price }} Руб
        </v-card-subtitle>

        <v-card-text class="white--text font-italic font-weight-light">
            <div>Бефстроганов из курицы - очень нежный и вкусный.</div>

            <div>Мясо в картофельной шубке - отказаться невозможно!</div>
        </v-card-text>

        <v-card-actions />
    </v-card>
</template>

<script>
import { URL_IMG } from '../static/const'

export default {
    name: 'ProductsList',
    props: {
        product: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            URL: URL_IMG,
        }
    },
}
</script>

<style scoped>
.lightbox {
    box-shadow: 0 -40px 0 -1px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.4) 0%,
        transparent 82px
    );
}
</style>
