<template>
    <v-app>
        <v-app-bar fixed app>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-container style="padding: 50px">
            <nuxt />
        </v-container>
        <v-footer fixed app>
            <span>&copy; {{ dateNow }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            title: 'MARAFON'
        }
    },
    computed: {
        // eslint-disable-next-line vue/return-in-computed-property
        dateNow() {
            const date = new Date()

            const options = {
                era: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }

            return date.toLocaleString('ru', options)
        }
    }
}
</script>
<style>
.v-content__wrap {
    background: orange;
}
</style>
