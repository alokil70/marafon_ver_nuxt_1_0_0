<template>
    <v-app dark>
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
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            rightDrawer: false,
            title: 'MARAFON Театр'
        }
    }
}
</script>
<style></style>
