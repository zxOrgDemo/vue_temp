<template>
  <div class="time_wrap"  @click="$emit('cilck',info)">
    <div class="circle"></div>
    <div v-if="month" class="month">{{month}}月</div>
    <div class="container">
      <div class="blok">
        <p class="top">{{ info.timestp|filterDay }}</p>
        <p class="btm">{{ info.timestp|filterMonth }}</p>
      </div>
      <div class="title">{{ info.title }}</div>
      <div class="container1">{{ info.content|filter }}</div>
    </div>
  </div>
</template>

<script>
export default {
 
  props: {
    month: {
      default: '',
    },
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  filters: {
    filter(v) {
      // let reg = />(?![^(\u4e00-\u9fa5|\w\u4e00-\u9fa5|\s\u4e00-\u9fa5)]+)(.*?)</
      // let reg = />(\w*?|\s*?)[\u4e00-\u9fa5]+(.*?)</
      // let res =/>[]</
      // let reg = />[\u4e00-\u9fa5\w\s]/
      // let reg = />(?![^(\u4e00-\u9fa5|\w|\s)]+)< |(>(.*?)<)/
      let neReg = /<\/?\w+(\s+.*?\\?)?>/g
      let nreg1 = /&\w+;/g

      let res = v.replace(neReg, '')
      res = res.replace(nreg1, '')
      return res.slice(0,150) + '...'
      // let res = v.match(reg)
      // return res ? res[0].slice(1, -1) : ''
    },
    filterDay(val) {
      if(!val) {
        return 'Null'
      }
      let day = new Date(val).getDate()
      return ('0' + day).slice(-2)
    },
    filterMonth(val) {
      if(!val) {
        return 'null / null'
      }
      let yaer = new Date(val).getFullYear()
      let month =  new Date(val).getMonth() + 1
      month = ('0' + month).slice(-2)
      let des =  yaer+' / '+month
      return des
    }
  },
  methods: {
    setTimes() {},
  },
}
</script>

<style lang='less' scoped>
@import url('~@/assets/style/main.less');
.time_wrap {
  margin: 20px 0;
  padding-left: 50px;
  position: relative;
  height: 180px;
  .circle {
    position: absolute;
    width: 11px;
    height: 11px;
    // border: 2px solid @blueBack;
    box-sizing: border-box;
    top: 50%;
    left: 8px;
    background: #fff url('~@/assets/img/home/budder.png') center no-repeat;
    background-size: 10px 10px;
    // background: #fff;
    transform: translateY(-50%);
  }
  .month {
    width: 28px;
    height: 16px;
    line-height: 18px;
    border-radius: 8px;
    background: @blueBack;
    color: #fff;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: -20px;
    left: 0;
  }
  .container {
    padding-left: 110px;
    height: 100%;
    background: #fafcff;
    position: relative;
    cursor: pointer;
    .blok {
      position: absolute;
      top: 25px;
      left: 25px;
      background: #fff;
      box-shadow: 0px 1px 10px 0px rgb(219, 229, 245);
      border-radius: 3px;
      height: 64px;
      width: 64px;
      p {
        text-align: center;
        line-height: 1.3;
        margin: 0;
      }
      .top {
        font-size: 32px;
        font-weight: bold;
        color: rgb(72, 80, 89);
        margin-top: 3px;
      }
      .btm {
        font-size: 12px;
        color: rgb(72, 80, 89);
      }
    }
    .title {
      padding-top: 25px;
      font-size: 20px;
      font-family: 'Microsoft YaHei';
      color: rgb(72, 80, 89);
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .container1 {
      font-size: 14px;
      line-height: 1.8;
      font-family: 'Microsoft YaHei';
      color: rgb(72, 80, 89);
      padding-right: 30px;
    }
    &:hover {
      .title {
        text-decoration: underline;
        color: @blueBack;
      }
      .blok {
        .top {
           color: @blueBack;
        }
        .btm {
           color: @blueBack;
        }
      }
    }
  }
}
</style>