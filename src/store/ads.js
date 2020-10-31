import firebase from "firebase";

class Ad {
  constructor(title, description, ownerId, imageSrc, promo = false, id) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      state.ads = payload
    },
    updateAd(state, {title, description, id}) {
      const ad = state.ads.find(item => {
        return item.id === id
      })
      
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newAdd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo,
          ''
        )
        const firebaseValue = await firebase.database().ref('ads').push(newAdd)
        const imageExtension = image.name.slice(image.name.lastIndexOf('.'))
        const imageName = `ads/${firebaseValue.key}${imageExtension}`
        const fileData = await firebase.storage().ref(imageName).put(image)
        const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        
        await firebase.database().ref('ads').child(firebaseValue.key).update({
          imageSrc
        })
        
        commit('setLoading', false)
        commit('createAd', {...newAdd, id: firebaseValue.key, imageSrc})
      } catch (error) {
        console.log(error);
        commit('setError', error)
        commit('setLoading', false)
        throw error
      }
    },
    
    async fetchAds({commit}) {
      commit('clearError')
      commit('setLoading', true)
      
      const resultAds = []
      
      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
          )
        })
        
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    
    async updateAd({commit}, {title, description, id}) {
      commit('clearError')
      commit('setError', true)
      
      try {
        await firebase.database().ref('ads').child(id).update({
          title, description
        })
        
        commit('updateAd', {title, description, id})
        
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error)
        commit('setLoading', false)
        console.log(error);
        throw error
      }
    },
    // createOrder({commit}, {title, description, adId, ownerId}) {
    //
    // }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(item => item.promo)
    },
    myAds(state, getters) {
      return state.ads.filter(item => {
        return item.ownerId === getters.user.id
      })
    },
    adById(state) {
      return addId => {
        return state.ads.find(item => item.id === addId)
      }
    }
  }
}
