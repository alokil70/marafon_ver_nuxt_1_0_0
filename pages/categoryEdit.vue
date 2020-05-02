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
                        <v-btn
                            color="deep-purple"
                            small
                            dark
                            class="mb-2"
                            v-on="on"
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
            <v-icon small class="mr-2" @click="editItem(item)">
                edit
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                delete
            </v-icon>
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

        deleteItem(item) {
            const index = this.categoryFormList.indexOf(item)
            confirm('Are you sure you want to delete this item?') &&
                this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            this.$store.dispatch('products/GET_CATEGORY_FROM_API')
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.categoryFormList[this.editedIndex],
                    this.editedItem
                )
            } else {
                this.categoryFormList.push(this.editedItem)
                this.$store.dispatch('products/categorySave', this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<style scoped></style>
