<template>
  <div class="list_wrap" @click="$emit('cilck',item)">
    <div class="left">
      <img :src="baseUrl+ item.img" alt="">
    </div>
    <div class="right">
      <p class="title">{{item.title}}</p>
      <p class="content" >
        {{item.content|filter}}
      </p>
      <p class="btm">
        <span>{{ item.createTime.split(' ')[0] }}</span>
        <span>{{item.orgcode_dictText  }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl : window._CONFIG.imgUrl
    }
  },
  props: {
    item: {
      default:  ()=>({}) 
    }
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
      return res.slice(0,200) + '...'
      
      // let res = v.match(reg)
      // return res ? res[0].slice(1, -1) : ''
    }
  }
}
</script>

<style lang='less' scoped>
.list_wrap {
  cursor: pointer;
  padding-bottom: 33px;
  padding-top: 33px;
  box-shadow: 0 1px 0 0 #efefef;
  .left {
    width: 290px;
    height: 186px;
    float: left;
    background: #159;
    border-radius: 3px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    padding-left: 290px;
    height: 186px;
    p {
      padding-left: 47px;
    }
    .title {
      font-size: 20px;
      font-family: 'Microsoft YaHei';
      color: rgb(67, 73, 81);
      font-weight: bold;
    }
    .content {
        height: 84px;
        line-height: 1.8;
        padding-right: 20px;
    }
    .btm {
         color: rgb(165, 173, 184);
         span {
             margin-right: 50px;
         }
    }
  }
}
</style>