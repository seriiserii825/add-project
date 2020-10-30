import firebase from 'firebase'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    },
    async loginUser({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        console.log('error from loginUser ' + error);
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    },
    autoLoginUser({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logOutUser({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }
}
