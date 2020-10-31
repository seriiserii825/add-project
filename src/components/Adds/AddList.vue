<template>
    <v-container>
        <h1 class="text--accent-1 mb-10">My ads</h1>
        <v-layout v-if="!loading && myAds.length !== 0">
            <v-card class="v-elevation-10 pa-10 mb-5" max-width="600" v-for="ad in myAds" :key="ad.id">
                <v-img height="auto">
                    <img :src="ad.imageSrc" alt="" width="300" height="auto">
                </v-img>
                <v-card-title>
                    {{ ad.title }}
                </v-card-title>
                <v-card-text>
                    {{ ad.description }}
                </v-card-text>
                <v-card-actions>
                    <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
        <v-layout v-else>
            <h2>
                <span>You don't have ads yet, add</span>
                <router-link to="/new"> new one</router-link>
            </h2>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        myAds() {
            return this.$store.getters.myAds
        },
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>

</style>
