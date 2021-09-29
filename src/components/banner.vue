<template>
  <div class="banner-container base-container">
    <div class="banner-list">
      <div class="banner-click">
        <ul class="banner_ul active" :class="[hase() ? 'active' : '']">
          <li
            :class="['base_li', $route.path == item.path || $route.path.match(item.path + '/') ? 'active_li' : '']"
            v-for="item in bannerList.slice(0, 3)"
            :key="item.name"
          >
            <span v-if="item.path == '/smart'" class="video_tip"></span>
            <span @click="toPage(item)">{{ item.name }}</span>
          </li>
          <div class="banner-top1">
            <img src="@/assets/img/favicon.png" alt="" class="icon_bg" />
            <span>高新区改革系统平台</span>
          </div>
          <li
            :class="['base_li', $route.path == item.path || $route.path.match(item.path + '/') ? 'active_li' : '']"
            v-for="item in bannerList.slice(3)"
            :key="item.name"
          >
            <span @click="toPage(item)">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="banner-search" v-show="$route.path == '/'">
        <div class="left">
          <input 
           @click.stop="ulShow=true"
           @focus.stop="ulShow=true"
            @input="handleInput"
            class="left_input" type="text">
            <ul v-show="ulShow">
              <li 
                @click="toSomePosition(item)"
                v-for="item in allLi" :key="item.id">
                {{item.title}}
              </li>
            </ul>
        </div>
        <div 
          @click="handleGo"
          class="right"><a-icon type="search" /></div>
      </div> -->
    </div>
  </div>
</template>

<script>
function debounce(cb, time) {
  let timer = null
  return function (arg) {
    let that = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      cb.call(that, arg)
    }, time)
  }
}
export default {
  created() {
    if (this.$route.path == '/login' || /selfCenter/.test(this.$route.path)) {
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
          name: '成果纵览',
        },
        {
          path: '/policySearch',
          name: '深改成果',
        },
        {
          path: '/policyReg',
          name: '深改工作',
        },
        {
          path: '/policyImg',
          name: '单位排名',
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
    this.cancles = function () {
      that.ulShow = false
      that.allLi = []
    }
    window.addEventListener('click', this.cancles)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.cancles)
  },
  methods: {
    handleGo() {
      if (!this.allLi.length) {
        this.$message.error('没有搜索到响应的政策')
      } else {
        this.toSomePosition(this.allLi[0])
      }
    },
    toSomePosition(item) {
      let path = '/policySearch/detail'
      if (item.resultType != '政策') {
        path = '/policyImg/detail'
      }
      this.$router.push({
        path,
        query: {
          id: item.dataId,
        },
      })
    },
    handleInput: debounce(function (e) {
      e.stopPropagation()
      let url = '/web/policy/siteSearch'
      let keyword = e.target.value.trim()
      let params = {
        keyword,
        pageNo: 1,
        pageSize: 10,
      }
      if (!keyword) return
      this.axios.get(url, { params }).then((res) => {
        this.allLi = res.result.records
      })
    }, 200),
    toPage(item) {
      if (item.path !== this.$route.path) {
        this.$router.push({
          path: item.path,
        })
      } else {
        if (this.$route.query.info) {
          this.$router.replace({
            path: item.path,
            query: {
              ...this.$route.query,
              info: void 0,
            },
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
.banner-list {
  display: flex;
  padding-bottom: 30px;
  width: 1400px;
  margin: 0 auto;
  .banner-click {
    flex: 1;
    .banner_ul {
      display: flex;
      margin: 0;
      padding: 0;
      height: 100%;
      .base_li {
        flex: 1;
        font-weight: bold;
        display: flex;
        font-size: 18px;
        align-items: center;
        width: 100px;
         padding: 15px 0 ;
        font-family: "Microsoft YaHei";
        justify-content: center;
        align-self: flex-end;
         position: relative;
        span {
          cursor: pointer;
        }
        .video_tip {
          position: absolute;
          display: block;
          top: -5px;
          right: -10px;
          width: 20px;
          height: 20px;
          background: url('~@/assets/img/home/pop.png') center no-repeat;
          background-size: 100%;
        }
      }
      .banner-top1 {
        height: 156px;
        text-align: center;
        width: 538px;

        display: flex;
        flex-direction: column;
        align-items: center;
        background: url('~@/assets/img/home/top_back.png') center no-repeat;
        background-size: 538px auto;
        justify-content: space-between;

        span {
          font-size: 30px;
          font-family: 'FZLTCHJW';
          color: rgb(34, 110, 188);
          font-weight: bold;
          letter-spacing: 8px;
        }
      }
      .active_li {
        color: rgb(228, 71, 30);
        font-size: 18px;
        cursor: pointer;
       
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
    .active {
      justify-content: space-between;
      .base_li {
        flex: none;
      }
    }
  }
  
}
.icon_bg {
   height: 108px;
   width: 108px;
   margin-right: 20px;
  // transform: translateY(30px);;
}
.icon_bg_1 {
  height: 60px;
  width: 838px;
}
</style>