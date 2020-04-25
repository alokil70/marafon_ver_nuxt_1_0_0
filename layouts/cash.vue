<template>
    <v-app>
        <v-app-bar fixed app>
            <v-toolbar-title v-text="title" />
            <v-spacer />

            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="350"
                transition="slide-x-transition"
            >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>Повар</v-list-item-title>
                                <v-list-item-subtitle
                                    >режим
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    :class="fav ? 'red--text' : ''"
                                    icon
                                    @click="fav = !fav"
                                >
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <div class="pa-2">
                        <p>Добавленные товары</p>
                        <div v-for="item in cart" :key="item.product.id">
                            <div class="d-flex justify-space-between">
                                <div>
                                    <i>{{ item.product.productName }}</i>
                                    <strong> x </strong>
                                    <strong>{{ item.quantity }}</strong>
                                </div>
                                <strong
                                    >{{
                                        item.product.price * item.quantity
                                    }}р</strong
                                >
                            </div>
                        </div>
                    </div>

                    <v-divider />

                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="message"
                                    color="primary"
                                ></v-switch>
                            </v-list-item-action>
                            <v-list-item-title
                                >Включить ообщения
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="hints"
                                    color="primary"
                                ></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Режим повара</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text @click="menu = false">Отмена</v-btn>
                        <v-btn color="primary" text @click="menu = false"
                            >Запомнить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
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
import { mapState } from 'vuex'
export default {
    data() {
        return {
            title: 'Станция MARAFON',
            menu: false
        }
    },
    computed: {
        ...mapState({
            cart: (state) => state.cart.cart
        }),
        total() {
            return this.cart.product.price
        }
    }
}
</script>
