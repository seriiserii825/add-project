<template>
    <v-container class="pa-16">
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img>
                        <img :src="ad.imageSrc" width="100%" height="auto" alt="">
                    </v-img>
                    <v-card-text>
                        <h1 class="mb-8 font-weight-black black--text">{{ ad.title }}</h1>
                        <p>{{ ad.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="warning" @click="showModal" v-if="isOwnerAd">Edit</v-btn>
                        <v-btn class="success" @click="showModalBuy">Buy</v-btn>
                    </v-card-actions>
                    <v-dialog width="400px" v-model="modalEdit">
                        <v-card>
                            <v-container>
                                <v-layout>
                                    <v-flex>
                                        <v-card-title><h1 class="text--primary">Edit ad</h1></v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-text-field
                                                v-model="editedTitle"
                                                label="Title"
                                                required
                                            ></v-text-field>
                                            <v-textarea
                                                v-model="editedDescription"
                                                label="Description"
                                                row-height="300px"
                                                messages="Type message here..."
                                                required
                                            ></v-textarea>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-btn dark color="red mr-4" @click="onCancel">Cancel</v-btn>
                                            <v-btn color="primary" @click="onSave">Save</v-btn>
                                        </v-card-actions>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-flex>
        </v-layout>

        <buy-modal :ad="ad"></buy-modal>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            editedTitle: '',
            editedDescription: ''
        }
    },
    computed: {
        ad() {
            const id = this.id
            return this.$store.getters.adById(id)
        },
        isOwnerAd() {
            return this.ad.ownerId === this.$store.getters.user.id
        },
        modalEdit() {
            return this.$store.getters.modalEdit
        }
    },
    methods: {
        showModal() {
            this.$store.commit('setModalEdit', true)
        },
        showModalBuy(){
            this.$store.commit('setModalBuy', true)
        },
        onCancel() {
            this.editedTitle = this.ad.title
            this.editedDescription = this.ad.description
            this.$store.commit('setModalEdit', false)
        },
        onSave() {
            if (this.editedTitle !== '' && this.editedDescription !== '') {
                this.$store.commit('setModalEdit', false)
                this.$store.dispatch('updateAd', {
                    id: this.ad.id,
                    title: this.editedTitle,
                    description: this.editedDescription
                })
            }
        }
    },
    created() {
        this.editedTitle = this.ad.title
        this.editedDescription = this.ad.description
    }
}
</script>

<style scoped>

</style>
