<template>
  <div class="footer ">
    <div class="abs_top"></div>
      <div class="child base-container">
        <div class="left">
          
          <img src="@/assets/img/home/c.png" alt="">
        </div>
        <div class="center">
          <p>西安锦业路1号都市之门A座 邮编：710065    E-mail：webmaster@xdz.gov.cn</p>
          <p>主办单位：西安高新技术产业开发区管理委员会 备案序号：陕ICP备10202143号-2号</p>
          <p style="margin:0">网站标识码：6101900002    陕公网安备 61019002000452号</p>
        </div>
        <div class="right">
             <img class="right_1" src="@/assets/img/home/b.png" alt="">
            <img class="right_2" src="@/assets/img/home/a.png" alt="">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    toPage(item) {
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>

<style lang='less' scoped >
@import '../assets/style/main.less';
.footer {
  background: #f1f6fc;
  height: 200px;
  color: #5f6b7d;
  position: relative;
  .abs_top {
    position: absolute;
    height: 184px;
    top: -184px;
    width: 100%;
    z-index: -1;
    background: url('~@/assets/img/home/hs.png') center no-repeat;
    background-size: 100%;
  }
  .child {
    width: 1400px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 81px;
        height: 99px;
      }
    }
    .center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        text-indent: 100px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .right_1 {
        margin-right: 30px;
        width: 56px;
        height: 68px;
      }
      .right_2 {
        width: 110px;
        height: 55px;
      }
    }
    .center {
      flex: 1;
    }
  }
}

</style>