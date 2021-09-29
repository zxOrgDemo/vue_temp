<template>
<a-config-provider :locale="locale">
  <div id="app">
        <router-view v-if="showRoterView" ></router-view>
  </div>
</a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  data() {
    return {
      locale: zhCN,
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

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* background: #f5f9fb; */
}
</style>

