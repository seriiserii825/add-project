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
			const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
			try {
				commit('setUser', new User(user.uid))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		async loginUser({commit}, {email, password}) {
			commit('clearError')
			commit('setLoading', true)
			const user = await firebase.auth().signInWithEmailAndPassword(email, password)
			try {
				commit('setUser', new User(user.uid))
				commit('setLoading', false)
			} catch (error) {
				console.log(error);
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		}
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}
