<template>
  <div class="root-container">
    <div>
      <heade></heade>
      <template>
        <bannerHome ></bannerHome>
        <!-- <banner v-else></banner> -->
      </template>
    </div>
    <slot></slot>
    <!-- <foor v-if="$route.path == '/'"></foor>
    <baseFoor v-else></baseFoor> -->
    <foor></foor>
  </div>
</template>

<script>
import heade from './header'
import bannerHome from './bannerHome'
import foor from './foor'
export default {
  components: {
    foor,
    heade,
    
    bannerHome,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang='less' scoped>
.root-container {
  min-height: 300px;
  // background: url('~@/assets/img/nbg.png') center no-repeat, #f5f9fb;
  background-size: 100% auto;
  background-position-y: 20px;
}
</style>