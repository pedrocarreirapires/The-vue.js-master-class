<template>
  <div v-if="ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories"/>
  </div>

</template>

<script>
import CategoryList from '@/components/CategoryList'
import {mapActions} from 'vuex'
export default {

  components: {
    CategoryList
  },

  data () {
    return {
      ready: false
    }
  },

  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  created () {
    this.fetchAllCategories()
      .then(categories => {
        Promise.all(categories.map(category => this.fetchForums({ids: Object.keys(category.forums)})))
        .then(() => {
          this.ready = true
        })
      })
  },
  beforeMount () {
    // console.log('beforeMount', this.categories)
  },
  mounted () {
    // console.log('mounted', this.categories, this.$el.innerText)
  },
  beforeDestroy () {
    // console.log('beforeDestroy', this.categories)
  },
  destroyed () {
    // console.log('destroyed', this.categories)
  }
}
</script>




