<template>
  <baseContainer>
    <div class="smart_detail base-container">
      
   

      <div class="wrapper" style="padding-top: 0">
        <img class="qz" src="@/assets/img/home/qzwx.png" alt="" srcset="">
        <img class="qy" src="@/assets/img/home/qywx.png" alt="" srcset="">
      </div>
    </div>
  </baseContainer>
</template>
<script>
import baseContainer from '@/components/base_container'

export default {
  components: {
    baseContainer,
  },
  data() {
    return {}
  },
  mounted() {},
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
    padding: 20px;
    background: #fff;
    box-shadow: 1.204px 1.597px 50px 0px rgb(241, 246, 252);
    border-radius: 3px;
    height: 646px;
    background: url('~@/assets/img/home/tbxx.png') center no-repeat;
    background-size: 100% 100%;
    position: relative;
    .qz {
      position: absolute;
      top: 250px;
      left: 268px;
    }
    .qy {
      position: absolute;
      top: 250px;
      right: 272px;
    }
  }
}

</style>