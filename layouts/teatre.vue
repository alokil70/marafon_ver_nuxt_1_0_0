<template>
    <v-app>
        <v-app-bar fixed app color="orange darken-4">
            <v-toolbar-title class="white--text" v-text="title" />
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
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            title: 'MARAFON Театр',
        }
    },
}
</script>
<style></style>
