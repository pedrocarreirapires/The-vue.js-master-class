<template>
  <div :class="$style.centered"
       class="col-full"
  >
    <h1 :class="$style['headingLarge']">Not Found</h1>
    <p :class="$style.textLarge"
       class="textLarge"

    > Ooops, we could not find what you are looking for.... Why don't you
      <router-link :to="{name: 'Home'}">
        go home instead?
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  created () {
    this.$emit('ready')
  }
}
</script>

<style module>
.headingLarge {
  font-size: 72px;
}

.textLarge {
  font-size: 25px;
  font-weight: 80;
}

.centered {
  text-align: center;
}

</style>
