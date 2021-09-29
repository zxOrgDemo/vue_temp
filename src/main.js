import Vue from 'vue'
import App from './App'

        
// let CESIUM_BASE_URL =  ''

Vue.config.productionTip = false
 function setRem () {
   const scale = document.documentElement.clientWidth / 100
   document.documentElement.style.fontSize = scale + 'px'
 }
 setRem()
 window.onresize = function () {
   setRem()
 }


var $store = {
  state: {
    configurable: true
  }
} 

$store.state.get = function() {
  return this._vm._data.$$state
}

function Stores(state ={
  token: '',
  userInfo: {}
}) {
  this._vm  = new Vue({
    data: {
      $$state: state
    }
  })
}
Stores.prototype.reset = function() {
  this._vm._data.$$state = {token: '',
  userInfo: {}}
},
Stores.prototype.install = function(Vue) {
  Vue.mixin({
    beforeCreate: function() {
      let options = this.$options
      if(options.store) {
        this.$store = this.$options.store
      }  else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
      }
    }
  })
}
Object.defineProperties(Stores.prototype, $store)

let  token = window.sessionStorage.getItem('token') 
let  userInfo = window.sessionStorage.getItem('userInfo')
userInfo = userInfo ? JSON.parse(userInfo) : {}

 let stores = new Stores({
  token,
  userInfo
})

Vue.use(stores)

 Vue.prototype.$formatDate =  function(value, fmt) {
  var regPos = /^\d+(\.\d+)?$/;
  if(regPos.test(value)){
    //如果是数字
    let getDate = new Date(value);
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt;
  }else{
    //TODO
    value = value.trim();
    return value.substr(0,fmt.length);
  }
}

new Vue({

  render: h => h(App),
}).$mount('#app')
