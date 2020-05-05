<template>
    <v-container>
        <h1>register</h1>
        <user-auth-form
            button-text="Register"
            :submit-form="registerUser"
            has-name="true"
        />
    </v-container>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm'
export default {
    name: 'Register',
    components: { UserAuthForm },
    methods: {
        async registerUser(registerInfo) {
            await this.$axios
                .post('/api/auth/register', registerInfo)
                .then((response) => {
                    alert(response.data.message)
                    this.$router.replace('/login')
                    this.$store.dispatch('snackbar/setSnackbar', {
                        text: 'Register',
                    })
                })
                .catch((error) => console.log(error))
        },
    },
}
</script>

<style scoped></style>
