<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Editing <i>{{ thread.title }}</i></h1>

    <ThreadEditor
      ref="edit"
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />

  </div>
</template>

<script>
import ThreadEditor from '../components/ThreadEditor.vue'
import {mapActions} from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'
export default {
  components: {
    ThreadEditor
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      saved: false
    }
  },
  computed: {
    thread () {
      return this.$store.state.threads[this.id]
    },
    text () {
      const post = this.$store.state.posts[this.thread.firstPostId]
      return post ? post.text : null
    },
    hasUnsavedChanges () {
      return (this.$refs.edit.title || this.$refs.edit.text) && !this.saved
    }
  },
  methods: {
    ...mapActions(['updateThread', 'fetchThread', 'fetchPost']),
    save ({title, text}) { // pq vem do ThreadEditor por parametro
      this.updateThread({
        id: this.id,
        title,
        text
      }).then(thread => {
        this.saved = true
        this.$router.push({name: 'ThreadShow', params: {id: this.id}})
      })
    },
    cancel () {
      this.$router.push({name: 'ThreadShow', params: {id: this.id}})
    }
  },
  created () {
    this.fetchThread({id: this.id})
      .then(thread => this.fetchPost({id: thread.firstPostId}))
      .then(() => { this.asyncDataStatus_fetched() })
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
      if (confirmed) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style scoped>

</style>
