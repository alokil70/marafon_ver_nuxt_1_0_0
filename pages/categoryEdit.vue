<template>
    <v-data-table
        :headers="headers"
        :items="category"
        dense
        sort-by="calories"
        class="elevation-12"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Справочник</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" small dark class="mb-2" v-on="on"
                            >Добавить
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.categoryName"
                                            label="название"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.description"
                                            label="Calories"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.imageName"
                                            label="Fat (g)"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close"
                                >Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save"
                                >Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <!--<v-icon small class="mr-2" @click="editItem(item)">
                edit
            </v-icon>-->
            <v-btn color="red" dark x-small @click="deleteItem(item)">
                Удалить
            </v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CategoryEdit',
    layout: 'manager',
    async fetch({ store }) {
        if (store.getters['products/CATEGORY'].length === 0) {
            await store.dispatch('products/GET_CATEGORY_FROM_API')
        }
    },
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Название',
                align: 'left',
                sortable: false,
                value: 'categoryName',
            },
            { text: 'Описание', value: 'description' },
            { text: 'не знаю', value: 'fat' },
            { text: 'Изменить', value: 'action', sortable: false },
        ],
        categoryFormList: [],
        editedIndex: -1,
        editedItem: {
            categoryName: '',
            description: '',
            imageName: '',
        },
        defaultItem: {
            categoryName: '',
            description: '',
            imageName: '',
        },
    }),

    computed: {
        ...mapState({
            category: (state) => state.products.category,
        }),
        formTitle() {
            return this.editedIndex === -1 ? 'Добавить категорию' : 'Edit Item'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.categoryFormList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        async deleteItem(item) {
            const index = this.categoryFormList.indexOf(item)
            confirm('Удвлить ?') && this.categoryFormList.splice(index, 1)
            await this.$store.dispatch(
                'products/DELETE_CATEGORY_FROM_API',
                item.id
            )
            await this.$store.dispatch('products/GET_CATEGORY_FROM_API')
        },

        async close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            await this.$store.dispatch('products/GET_CATEGORY_FROM_API')
        },

        async save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.categoryFormList[this.editedIndex],
                    this.editedItem
                )
            } else {
                this.categoryFormList.push(this.editedItem)
                await this.$store.dispatch(
                    'products/POST_CATEGORY_TO_API',
                    this.editedItem
                )
            }
            this.close()
        },
    },
}
</script>

<style scoped></style>
