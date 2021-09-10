<template>
  <div id="app">
       {{msg}}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
     msg: 'hello',
      showRoterView: true
    }
  },
  provide() {
    return {
      reloadRouterView: this.reLoad
    }
    
  },
  mounted() {

  },
  methods: {
    reLoad() {
      this.showRoterView = false
      setTimeout(() => {
        this.showRoterView = true
      })
    }
  }
}
</script>

<style lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* background: #18295a; */
  /* background: url(~@/assets/img/conbg.png) no-repeat; */
	/* background-size: 100% 100%; */
}
</style>

