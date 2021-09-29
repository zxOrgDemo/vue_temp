<template>
  <baseContainer>
    <div class="smart_detail base-container">
      
   

      <div class="wrapper" style="padding-top: 0"  ref="setSticky">
        <div class="left" :style="{top: top+'px'}"></div>
        <div class="right" ref="test">
          <baseItem 
          :key="item.id"
          :ind='index == 0 ? "d": index == infoList.length - 1 ? "u" : ""'
          :leadName='item.name'
          :headName='item.leadDepart_dictText'
          :contentList='item.memberUnit_dictText.split(",")'
          v-for="item,index in infoList"></baseItem>
        </div>
      </div>
    </div>
  </baseContainer>
</template>
<script>
import baseContainer from '@/components/base_container'
import baseItem from './component/item'

export default {
  components: {
    baseContainer,
    baseItem
  },
  data() {
    return {
      infoList: [],
      top: 0,
      origin: 0,
    }
  },
  mounted() {
    this.getList()
    this.setTop()
    window.addEventListener('scroll', this.setTop1)
    
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.setTop1)
  },
  methods: {
    setTop() {
       let top = this.$refs.setSticky.offsetTop
       this.top = top 
       this.origin = top
    },
    setTop1() {
      let scrolt = document.documentElement.scrollTop
      let res = this.origin - scrolt
      if(res < 20) {
        this.top = 20
      } else {
        this.top = res
      }
    },
    getList() {
      let url = '/api/reform/common/group'
      this.axios.get(url, {
        params: {
          pageNo: 1,
        pageSize: 100
        }
      }).then(res => {
        this.infoList = res.result.records

      })
    }
  }
}
</script>
<style lang='less' scoped>
.smart_detail {
  min-height: 50vh;
  padding-bottom: 65px;
  border-radius: 5px;
 
  
  
  .wrapper {
    width: 1400px;
    margin: 0 auto;
    margin-top: 50px;
    // padding: 20px;
    background: #fff;
    // box-shadow: 1.204px 1.597px 50px 0px rgb(241, 246, 252);
    border-radius: 3px;
    min-height: 646px;
    background-size: 100% 100%;
    position: relative;
    .left {
      float: left;
      width: 100%;
      position: fixed;
      top: 380px;
      background: url('~@/assets/img/home/pic_sg.png') left top no-repeat;
      background-size: auto 100%;
      height: 505px;
      z-index: 0;
    }
    .right {
      margin-left: 640px;
      // height: 1000px;
      // background: #acf;
    }
  }
}

</style>