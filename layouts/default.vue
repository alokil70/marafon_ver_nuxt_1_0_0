<template>
    <v-app>
        <v-app-bar fixed app>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <div v-if="$auth.loggedIn">
                {{ $auth.user.name }}
                <v-btn text @click="$auth.logout()">logout</v-btn>
            </div>
            <div v-else>
                <v-btn text to="/login">login</v-btn>
            </div>
        </v-app-bar>
        <v-container style="padding: 50px;">
            <nuxt />
        </v-container>
        <v-footer fixed app>
            <span>&copy; {{ dateNow }}</span>
            <v-spacer />
            <span>License: {{ lic }}</span>
        </v-footer>
        <the-snackbar />
    </v-app>
</template>

<script>
import TheSnackbar from '../components/TheSnackbar'
export default {
    components: { TheSnackbar },
    data() {
        return {
            title: 'MARAFON',
        }
    },
    computed: {
        dateNow() {
            return new Date().toLocaleString('ru')
        },
        lic() {
            return this.$store.state.srvUser
        },
    },
}
</script>
<style>
.v-content__wrap {
    background: orange;
}
</style>
