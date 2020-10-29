export default {
  state: {
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
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd({commit}, payload) {
      payload.id = Math.floor(Math.random() * (150000 - 5)) + 5 + ""
      
      commit('createAd', payload)
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(item => item.promo)
    },
    myAds(state) {
      return state.ads
    },
    adById(state) {
      return addId => {
        return state.ads.find(item => item.id === addId)
      }
    }
  }
}
