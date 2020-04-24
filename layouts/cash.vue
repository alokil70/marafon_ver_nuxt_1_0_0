<template>
    <v-app>
        <v-app-bar fixed app>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
        <v-footer fixed app>
            <span>&copy; {{ new Date() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            title: 'Vuetify.js'
        }
    }
}
</script>
