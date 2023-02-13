import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

export default {
  namespaced: true,
  state: {
    items: {} // state.threads.items[id]
  },
  actions: {
    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id, emoji: '?'}, {root: true}),
    fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'categories', emoji: 'rain', ids}, {root: true}),
    fetchAllCategories ({state, commit}) {
      console.log('fire', '!!', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId]
            commit('setItem', {resource: 'categories', id: categoryId, item: category}, {root: true})
          })
          resolve(Object.values(state.items))
        })
      })
    }
  }
}
