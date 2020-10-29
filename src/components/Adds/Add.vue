<template>
    <v-container>
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
                        <v-btn class="warning">Edit</v-btn>
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {}
    },
    computed: {
        ad() {
            const id = this.id
            console.log(this.id);
            return this.$store.getters.adById(id)
        }
    }
}
</script>

<style scoped>

</style>
