<template>
  <div class="flex-grid">

    <UserProfileCard
      v-if="!edit"
      :user="user" />

    <UserProfileCardEditor
      v-else
      :user="user" />

    <div class="col-7 push-top">

      <div class="profile-header">
                  <span class="text-lead">
                      {{ user.username }} recent activity
                  </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

    <PostList :posts="userPosts" />

    </div>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import UserProfileCard from '../components/UserProfileCard.vue'
import UserProfileCardEditor from '../components/UserProfileCardeditor.vue'
import {mapGetters} from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  mixins: [asyncDataStatus],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/authUser'
    }),

    userPosts () {
      return this.$store.getters['users/userPosts'](this.user['.key'])
    }
  },
  created () {
    console.log('Page Profile created')
    this.$store.dispatch('posts/fetchPosts', {ids: this.user.posts})
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>

<style scoped>

</style>
