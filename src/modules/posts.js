import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    items: {} // state.threads.items[id]
  },
  actions: {
    createPost ({commit, state, rootState}, post) {
      const postId = firebase.database().ref('posts').push().key
      post.userId = rootState.auth.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      const updates = {}
      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`users/${post.userId}/contributors/${post.userId}`] = post.userId
      firebase.database().ref().update(updates)
        .then(() => {
          commit('setItem', {resource: 'posts', item: post, id: postId}, {root: true})
          commit('threads/appendPostToThread', {parentId: post.threadId, childId: postId}, {root: true})
          commit('threads/appendContributorsToThread', {parentId: post.threadId, childId: post.userId}, {root: true})
          commit('users/appendPostToUser', {parentId: post.userId, childId: postId}, {root: true})
          return Promise.resolve(state.items[postId])
        })
    },
    updatePost ({state, commit, rootState}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.items[id]
        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }

        const updates = {text, edited}
        firebase.database().ref('posts').child(id).update(updates)
          .then(() => {
            commit('setPost', { postId: id, post: { ...post, text, edited } })
            resolve(post)
          })
      })
    },
    fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'posts', id, emoji: '!'}, {root: true}),
    fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'posts', emoji: 'chat', ids}, {root: true})
  },
  mutations: {
    setPost (state, {post, postId}) { Vue.set(state.items, postId, post) }
  }
}
