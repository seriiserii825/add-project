import firebase from "firebase";

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    }
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(o => o.done)
    },
    unDoneOrders(state) {
      return state.orders.filter(o => !o.done)
    },
    orders(state, getters) {
      return getters.unDoneOrders.concat(getters.doneOrders)
    }
  },
  actions: {
    async createOrder({commit}, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchOrders({commit, getters}) {
      commit('setLoading', true)
      commit('clearError')
      
      const resultOrders = []
      
      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        
        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.phone, o.adId, o.done, key)
          )
        })
        
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    },
    async markOrder({commit, getters}, payload) {
      try {
        commit('clearError')
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
        commit('setLoading', false)
      } catch (error) {
        
        console.log(error);
        commit('setError', error)
        throw error
      }
      
    }
  }
}
