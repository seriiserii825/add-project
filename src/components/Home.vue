<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                            v-for="(item,i) in promoAds"
                            :key="i"
                            :src="item.imageSrc"
                        >
                            <div class="carousel-link">
                                <v-btn class="error" :to="'/ad/' + item.id">{{ item.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                    v-for="(ad, index) in ads"
                    :key="ad.id"
                    sm6
                    md4
                    class="mt-10"
                    :index="index"
                >
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-img
                            :src="ad.imageSrc"
                            height="200px"
                        ></v-img>

                        <v-card-title>
                            {{ ad.title }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ ad.description }}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-btn color="green" dark @click="showModal(ad)">Buy</v-btn>
                            <v-btn color="blue" dark :to="'/ad/' + ad.id">Open</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <buy-modal :ad="clickedAd"></buy-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            clickedAd: null
        }
    },
    methods: {
        showModal(item) {
            this.clickedAd = item
            this.$store.commit('setModalBuy', true)
        }
    },
    computed: {
        promoAds() {
            return this.$store.getters.promoAds
        },
        ads() {
            return this.$store.getters.ads
        }
    }
}
</script>

<style scoped>
.carousel-link {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px 30px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 5px;
}
</style>
