<template>
  <div class="header">
    <div v-show="hasToken" class="child">
      <div class="left">
        西安市高新管委会
      </div>
    
      <!--DENGLU-->
    </div>
    <div v-show="!hasToken" class="child">
      <div class="left" >
        西安市高新管委会
      </div>
      <div class="right">
        <span @mouseenter="showWx(1)" @mouseleave="cancelqe" class="wx">
          <img src="@/assets/img/home/wx.png" alt="">
        </span>
        <span @click="share(2)" class="wb">
           <img src="@/assets/img/home/wb.png" alt="">
        </span>
        <div class="qr_show" v-show="showqr">
              <div id="qrcode" ref="qr"></div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      hasToken: false,
      userInfo: {},
      showqr: false,
      result: {
        title: 'not fond'
      }
    }
  },
  created() {
    
  },
  methods: {
    showWx() {
      this.showqr = true
      this.$refs.qr.innerHTML = ''
      let qr = new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: location.href,
      })
      this.qr = qr
    },
    cancelqe() {
      this.showqr = false
    },
    share(n) {
      let url = ''
      if (n == 1) {
        this.showqr = true
        new QRCode('qrcode', {
          width: 200,
          height: 200,
          text: location.href,
        })
        return
      }
      if (n == 2) {
        url = `https://service.weibo.com/share/share.php?
                url=${location.href}&
                title=${this.result.title }&
                desc=${this.result.title}`
      }
      if (n == 3) {
        url = `http://connect.qq.com/widget/shareqq/index.html?
                url=${location.href}&
                title=${this.result.title}&
                desc=${this.result.title}`
      }
      window.open(url)
    },
  }
}
</script>

<style lang='less' scoped>
@import '../assets/style/main.less';


.header {
  color: #fff;
  background: @blueBack;
  height: 44px;
  .child{
    margin: 0 260px;
    height: 100%;
    &::before {
      content: '';
      display: block;
      overflow: hidden;
    }
    .left {
      float: left;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        margin-right: 10px
      }
      .xx {
        width: 18px;
        height: 19px;
      }
      
    }
    .right {
      float: right;
      display: flex;
      height: 100%;
      align-items: center;
      position: relative;
      .qr_show {
        width: 150px;
        height: 150px;
        position: absolute;
        background: #fff;
        box-shadow: 0 0 8px #deefff;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 100%;
        left: 50%;
        transform: translateX(-55%);
      }
      span {
        cursor: pointer;
        width: 28px;
        height: 28px;
        background: rgba(255,255,255,0.3);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 17px;
          height: 14px;
        }
        &:nth-of-type(1) {
          margin-right: 10px;
        }
      }
      
    }
    .right_1 {
      float: right;
      display: flex;
      height: 100%;
      align-items: center;
      color: rgb(156, 201, 250);
      img {
        margin: 0 10px
      }
      .person {
         width: 20px;
        height: 20px;
      }
      .quit {
        width: 19px;
        height: 19px;
      }
      .self {
        cursor: pointer;
        width: 90px;
        display: block;
        text-align: center;
        height: 26px;
        line-height: 26px;
        border-left: 1px solid  #4572a3;
        border-right: 1px solid  #4572a3;
      }
    }
    

  }
}

</style>