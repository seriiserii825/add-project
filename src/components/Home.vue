<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
                v-for="(item,i) in filteredAds"
                :key="i"
                :src="item.imageSrc"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <h1>Home</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [
        {
          title: 'First add',
          description: 'Desc for First add',
          promo: true,
          imageSrc: require('@/assets/img/slider-1.jpg'),
          id: '123'
        },
        {
          title: 'Second add',
          description: 'Desc for Second add',
          promo: true,
          imageSrc: require('@/assets/img/slider-2.jpg'),
          id: '223'
        },
        {
          title: 'Third add',
          description: 'Desc for Third add',
          promo: false,
          imageSrc: require('@/assets/img/slider-3.jpg'),
          id: '323'
        }
      ]
    }
  },
  computed: {
    filteredAds() {
      return this.ads.filter(item => item.promo)
    }
  }
}
</script>

<style scoped>
</style>
