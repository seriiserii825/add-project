<template>
    <v-container>
        <h1 class="text--accent-1 mb-10">My ads</h1>
        <v-card class="v-elevation-10 pa-10 mb-5" max-width="600" v-for="ad in myAds" :key="ad.id">
            <v-row xs12>
                <v-col>
                    <v-img height="auto">
                        <img :src="ad.imageSrc" alt="" width="300" height="auto">
                    </v-img>
                </v-col>
                <v-col>
                    <v-card-text>
                        {{ ad.title }}
                    </v-card-text>
                    <v-card-text>
                        {{ ad.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
    computed: {
        myAds() {
            return this.$store.getters.myAds
        }
    }
}
</script>

<style scoped>

</style>
