<template>
    <v-container>
        <h1>login</h1>
        <user-auth-form button-text="Login" :submit-form="loginUser" />
        <nuxt-link to="/register">Reg</nuxt-link>
    </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm'
export default {
    name: 'Login',
    components: { UserAuthForm },
    methods: {
        async loginUser(loginInfo) {
            try {
                await this.$auth.loginWith('local', {
                    data: loginInfo,
                })
                this.$store.dispatch('snackbar/setSnackbar', {
                    text: `Thanks for signing in, ${this.$auth.user.name}`,
                })
                this.$router.replace('/')
            } catch {
                this.$store.dispatch('snackbar/setSnackbar', {
                    color: 'red',
                    text: 'There was an issue signing in.  Please try again.',
                })
            }
        },
    },
}
</script>

<style scoped></style>
