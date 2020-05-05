<template>
    <v-app>
        <v-app-bar fixed app>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-spacer />
            <div v-if="$auth.loggedIn">
                {{ $auth.user.email }}
                <v-btn text @click="$auth.logout()">logout</v-btn>
            </div>
            <div v-else>
                <v-btn text to="/login">login</v-btn>
            </div>
        </v-app-bar>
        <the-snackbar />
        <v-container style="padding: 50px;">
            <nuxt />
        </v-container>
        <v-footer fixed app>
            <span>&copy; {{ dateNow }}</span>
        </v-footer>
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
                second: 'numeric',
            }

            return date.toLocaleString('ru', options)
        },
    },
}
</script>
<style>
.v-content__wrap {
    background: orange;
}
</style>
