// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDN0DEnZG4d7iSeLvTUF4uUoW28R5F00yI',
  authDomain: 'vueschool-9b264.firebaseapp.com',
  databaseURL: 'https://vueschool-9b264-default-rtdb.firebaseio.com',
  projectId: 'vueschool-9b264',
  storageBucket: 'vueschool-9b264.appspot.com',
  messagingSenderId: '278870588587',
  appId: '1:278870588587:web:6147ea750ac4ee12710bee'
}
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
