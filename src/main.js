import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BuyModal from "@/components/Shared/BuyModal";
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.css'
import firebase from "firebase"

Vue.config.productionTip = false

Vue.component('buy-modal', BuyModal)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    let firebaseConfig = {
      apiKey: "AIzaSyBtAAqZJpfy8jQeotq3rJ3tunZyzSAUOdM",
      authDomain: "ad-project-a4f65.firebaseapp.com",
      databaseURL: "https://ad-project-a4f65.firebaseio.com",
      projectId: "ad-project-a4f65",
      storageBucket: "ad-project-a4f65.appspot.com",
      messagingSenderId: "562617073413",
      appId: "1:562617073413:web:a6651d9e793d965dff416c"
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
