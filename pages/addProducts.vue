<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="products"
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
                                        <v-col cols="12" sm="6" md="10">
                                            <v-text-field
                                                v-model="editedItem.productName"
                                                label="Название"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="2">
                                            <v-text-field
                                                v-model.number="
                                                    editedItem.price
                                                "
                                                label="Цена"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field
                                                v-model="editedItem.description"
                                                label="Описание"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.text"
                                                label="text"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.text1"
                                                label="text1"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.text2"
                                                label="text2"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select
                                                v-model="temp"
                                                :items="category"
                                                item-text="categoryName"
                                                label="Категория"
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-file-input
                                                ref="file"
                                                v-model="files"
                                                show-size
                                                label="Фото"
                                                >Фото
                                            </v-file-input>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close"
                                    >Отмена
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save"
                                    >Добавить
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
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'AddProducts',
    layout: 'manager',
    async fetch({ store }) {
        if (
            store.getters['products/PRODUCTS'].length === 0 &&
            store.getters['products/CATEGORY'].length === 0
        ) {
            await store.dispatch('products/GET_PRODUCTS_FROM_API')
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
                value: 'productName',
            },
            { text: 'Text', value: 'text' },
            { text: 'Text1', value: 'text1' },
            { text: 'Category', value: 'CategoryId' },
            { text: 'Цена', value: 'price' },
            { text: 'Изменить', value: 'action', sortable: false },
        ],
        productsFormList: [],
        editedIndex: -1,
        files: null,
        temp: '',
        editedItem: {
            productName: '',
            description: '',
            price: null,
            imageName: '',
            text: '',
            text1: '',
            text2: '',
            categoryId: '',
        },
        defaultItem: {
            productName: '',
            description: '',
            price: null,
            imageName: '',
            text: '',
            text1: '',
            text2: '',
            categoryId: '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Новое' : 'Edit Item'
        },
        ...mapState({
            products: (state) => state.products.products,
            category: (state) => state.products.category,
        }),
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.productsFormList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.productsFormList.indexOf(item)
            confirm('Удалить?') && this.productsFormList.splice(index, 1)
            this.$store.dispatch('products/productDelete', item.id)
            this.$store.dispatch('products/fetch')
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            this.$store.dispatch('products/fetch')
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.productsFormList[this.editedIndex],
                    this.editedItem
                )
            } else {
                this.productsFormList.push(this.editedItem)

                const obj = this.category.find(
                    (v) => v.categoryName === this.temp
                )
                this.editedItem.categoryId = obj.id

                const formData = new FormData()
                for (const item in this.editedItem) {
                    formData.append(item, this.editedItem[item])
                }
                formData.append('image', this.files)

                this.$store.dispatch('products/objSave', formData)
            }
            this.files = null
            this.temp = ''
            this.close()
        },
    },
}
</script>

<style scoped></style>
