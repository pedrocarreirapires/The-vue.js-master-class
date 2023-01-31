<template>
<div class="col-full"
     :class="$style.centered">

<h1
  class="$style.headingLarge">Not Found
</h1>
  <p class="textLarge"
     :class="$style.headingLarge"
  >
    Oooooops, we couldn't find what you are looking for. Why don't you
    <router-link :to="{name: 'Home'}">
      go home instead?
  </router-link>
  </p>


</div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style module>


.headingLarge {
  font-size: 30px;
}

.textLarge {
  font-size: 50px;
  font-weight: 100;
}

.centered {
  text-align: center;
}
</style>
