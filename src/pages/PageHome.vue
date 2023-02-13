<template>
  <div>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories"/>
  </div>

  </div>

</template>

<script>
import CategoryList from '../components/CategoryList'
import {mapActions} from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'
export default {

  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
  computed: {
    categories () {
      return Object.values(this.$store.state.categories.items)
    }
  },
  methods: {
    ...mapActions('categories', ['fetchAllCategories']),
    ...mapActions('forums', ['fetchForums'])
  },
  created () {
    console.log('Page Home created')
    this.fetchAllCategories()
      .then(categories => {
        Promise.all(categories.map(category => this.fetchForums({ids: Object.keys(category.forums)})))
        .then(() => {
          this.asyncDataStatus_fetched()
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




