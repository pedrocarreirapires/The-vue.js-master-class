import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import categories from '../modules/categories'
import forums from '../modules/forums'
import posts from '../modules/posts'
import threads from '../modules/threads'
import users from '../modules/users'
import auth from '../modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  actions,
  mutations,
  modules: {
    categories,
    forums,
    posts,
    threads,
    users,
    auth
  }
})
