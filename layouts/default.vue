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
            <span>&copy; {{ new Date() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            title: 'marafon'
        }
    }
}
</script>
<style>
.v-content__wrap {
    background: orange;
}
</style>
