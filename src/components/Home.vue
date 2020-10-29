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
            v-for="ad in ads"
            :key="ad.id"
            sm6
            md4
            class="mt-10"
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
              <v-btn color="green" dark >Buy</v-btn>
              <v-btn color="blue" dark>Open</v-btn>
            </v-card-actions>
          </v-card>
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
.carousel-link {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 30px;
  background-color: rgba(0,0,0,.5);
  border-radius: 5px;
}
</style>
