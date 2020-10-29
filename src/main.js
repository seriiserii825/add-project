import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.css'
import firebase from "firebase"

Vue.config.productionTip = false
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
  }
}).$mount('#app')
