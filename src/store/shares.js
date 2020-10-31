export default {
  state: {
    modalEdit: false,
    modalBuy: false,
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setModalEdit(state, payload) {
      state.modalEdit = payload
    },
    setModalBuy(state, payload) {
      state.modalBuy = payload
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setError({commit}, payload) {
      commit('setError', payload)
    },
    clearError({commit}) {
      commit('clearError')
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    },
    modalEdit(state) {
      return state.modalEdit
    },
    modalBuy(state) {
      return state.modalBuy
    }
  }
}
