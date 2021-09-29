<template>
  <div class="banner-container base-container">
    <div class="banner-top">
      <img src="@/assets/img/favicon.png" alt=""  class="icon_bg" />
      <span >高新区改革系统平台</span>
    </div>
    <div class="banner-list">
      <div class="banner-click">
        <ul class="banner_ul" >
          <li 
            :class="['base_li', $route.path == item.path || $route.path.match(item.path+ '/')? 'active_li' : '']" 
            v-for="item in bannerList" :key="item.name">
            <span v-if="item.path == '/smart'" class="video_tip"></span>
            <span @click="toPage(item)">{{ item.name }}</span>
          </li>
        </ul>
      </div>
     
    </div>
  </div>
</template>

<script>
function debounce(cb, time){
  let timer = null
  return function(arg) {
    let that = this
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      cb.call(that, arg)
    },time)
  }
}
export default {
  created() {
      if(this.$route.path == '/login' || /selfCenter/.test(this.$route.path)) {
        this.show = false
      }
    },
    inject: ['reloadRouterView'],
  data() {
    return {
      allLi: [],
      ulShow: false,
       show: true,
      bannerList: [
        {
          path: '/',
          name: '首页',
        },
        {
          path: '/smart',
          name: '深改综述',
        },
        {
          path: '/policyFocus',
          name: '深改机构',
        },
        {
          path: '/policyReg',
          name: '深改工作',
        },
        {
          path: '/policySearch',
          name: '深改成果',
        },
        {
          path: '/policyImg',
          name: '深改数据',
        },
        {
          path: '/todayApply',
          name: '意见直通车',
        },
      ],
    }
  },
  mounted() {
    let that = this
    this.cancles = function() {
      that.ulShow = false
      that.allLi = []
    }
    window.addEventListener('click',this.cancles)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.cancles)
  },
  methods: {
    handleGo() {
      if(!this.allLi.length) {
        this.$message.error('没有搜索到响应的政策')
      }else {
        this.toSomePosition(this.allLi[0])
      }
    },
    toSomePosition(item ) {
      let path = '/policySearch/detail'
      if(item.resultType != '政策') {
        path = '/policyImg/detail'
      }
      this.$router.push({
        path,
        query: {
          id: item.dataId
        }
      })
    },
    handleInput: debounce(function(e) {
      e.stopPropagation()
      let url = '/web/policy/siteSearch'
      let keyword = e.target.value.trim()
      let params = {
        keyword,
        pageNo: 1,
        pageSize: 10
      }
      if(!keyword) return
      this.axios.get(url, {params}).then(res => {
        this.allLi = res.result.records
      })
    }, 200),
    toPage(item) {
      if (item.path !== this.$route.path) {
        this.$router.push({
          path: item.path,
        })

      }else {
        if(this.$route.query.info) {
          this.$router.replace({
          path: item.path,
          query: {
            ...this.$route.query,
            info: void 0
          }
        })
        }
        this.reloadRouterView()
      }
    },
    hase() {
      return this.$route.path !== '/'
    },
  },
}
</script>

<style lang='less' scoped>

.banner-top {
  height: 156px;
  text-align: center;
  width: 538px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('~@/assets/img/home/top_back.png') center no-repeat;
  background-size: 538px auto;
  justify-content: space-between;
  
  span {
    font-size: 30px;
    font-family: "FZLTCHJW";
    color: rgb(34, 110, 188);    
    font-weight: bold;  
    letter-spacing: 8px;
  }
}

.banner-list {
    display: flex;
    padding-top: 55px;
    padding-bottom: 20px;
    justify-content: center;
    .banner_ul {
      display: flex;
      width: 1024px;
      margin: 0;
      padding: 0;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      .base_li {
        font-weight: bold;
        display: flex;
        font-size: 18px;
        align-items: center;
        width: 100px;
        font-family: "Microsoft YaHei";
        text-align: center;
        justify-content: center;
        padding: 15px 0 ;
        position: relative;
        span {
          cursor: pointer;
        }
        .video_tip {
          position: absolute;
          display: block;
          top: 3px;
          right: -13px;
          width: 20px;
          height: 20px;
          background: url('~@/assets/img/home/pop.png') center no-repeat;
          background-size: 100%;
        }
      }

      .active_li {
        color: rgb(228, 71, 30);
        font-size: 18px;
        cursor: pointer;
        position: relative;
        &::after {
            position: absolute;
            height: 3px;
            content: '';
            display: block;
            width: 100%;
            border-radius: 3px;
            background: url(~@/assets/img/home/top_bar.png) center no-repeat;
            background-size: 100%;
            bottom: 0;
        }
      }
    }
   
  
}
.icon_bg {
  height: 108px;
  width: 108px;
  margin-right: 20px;
  // transform: translateY(30px);
  
}

</style>