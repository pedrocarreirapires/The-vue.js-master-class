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
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{ isUpdate ? 'Update' : 'Submit Post' }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'

        const valid = keyIsValid && textIsValid

        if (!textIsValid) {
          console.error('The post prop object must include a `text` attributes.')
        }
        if (!keyIsValid) {
          console.error('The post prop object must include a `.key` attributes.')
        }
        return valid
      }
    }
  },

  data () {
    return {
      txtPost: this.post ? this.post.text : ''
    }
  },
  computed: {
    isUpdate () {
      return !!this.post
    }
  },
  methods: {
    save () {
      this.persist()
        .then(post => {
          this.$emit('save', {post})
        })
    },
    create () {
      const post = {
        text: this.txtPost,
        threadId: this.threadId

      }
      this.txtPost = ''
       // pasing to the parent
      return this.$store.dispatch('createPost', post)
    },
    cancel () {
      this.$emit('cancel')
    },
    update () {
      const payload = {
        id: this.post['.key'],
        text: this.txtPost
      }
      return this.$store.dispatch('updatePost', payload)
    },
    persist () {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>

<style scoped>

</style>
