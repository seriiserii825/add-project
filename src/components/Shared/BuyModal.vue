<template>
    <v-dialog width="400px" v-model="modalBuy">
        <v-card>
            <v-container>
                <v-layout>
                    <v-flex>
                        <v-card-title><h3>Do you want to buy it?</h3></v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-text-field
                                v-model="name"
                                label="Your name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="phone"
                                label="Your phone"
                                required
                            >
                            </v-text-field>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn :disabled="localLoading" dark color="red mr-4" @click="onCancel">Cancel</v-btn>
                            <v-btn :disabled="localLoading" :loading="localLoading" color="primary" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['ad'],
    data() {
        return {
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onCancel() {
            this.name = ''
            this.phone = ''
            this.$store.commit('setModalBuy', false)
        },
        onSave() {
            if(this.name !== '' && this.phone !== ''){
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId
                }).finally(() => {
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.$store.commit('setModalBuy', false)
                })
                this.$store.commit('setModalBuy', false)
            }
        }
    },
    computed: {
        modalBuy() {
            return this.$store.getters.modalBuy
        }
    }
}
</script>

<style scoped>

</style>
