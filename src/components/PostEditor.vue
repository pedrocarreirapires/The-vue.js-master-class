<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea name=""
                  id=""
                  cols="30"
                  rows="10"
                  class="form-input"
                  v-model="txtPost"
        ></textarea>
    </div>

    <div class="form-actions">
      <button class="btn-blue">Submit Post</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: true
    }
  },
  data () {
    return {
      txtPost: ''
    }
  },
  methods: {
    save () {
      const post = {
        text: this.txtPost,
        threadId: this.threadId

      }
      this.txtPost = ''
      this.$emit('save', {post})
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style scoped>

</style>
