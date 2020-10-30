import firebase from "firebase";

class ad {
  constructor(title, description, ownerId, imageSrc, promo = false) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
  }
}

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
    async createAd({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAdd = new ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
        )
        const firebaseValue = await firebase.database().ref('ads').push(newAdd)
        commit('setLoading', false)
        commit('createAd', {...newAdd, id: firebaseValue.key})
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
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
