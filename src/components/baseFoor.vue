<template>
  <div class="footer">
    <div class="child base-container">
      <div class="left" style="display:block">
        <p>E-mail：webmaster@xdz.gov.cn </p>
        <p>联系电话：81158705</p>
        <!-- <span v-for="item in keys" :key='item.name'>{{item.name}}</span>
           -->
      </div>
      <div class="center">
        <div class="symbol" style="display:flex;justify-content:center">
          <div><img src="@/assets/img/wechart.png" alt="" /></div>
          <div class="wrap_cc" style="">
            <p>西安锦业路1号都市之门A座</p>
            <p style="float:left">邮编：710065</p>
          </div>
        </div>
        <div class="color">主办单位：西安高新技术产业开发区管理委员会</div>
      </div>
      <div class="right">
        <p>备案序号：陕ICP备10202143号-2号</p>
        <p>网站标识码： 6101900002</p>
        <p>陕公网安备 61019002000452号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keys: [
        {
          name: '智能匹配',
          path: '/',
        },
        {
          name: '智能匹配',
          path: '/',
        },
        {
          name: '政策检索',
          path: '/',
        },
        {
          name: '政策订阅',
          path: '/',
        },
        {
          name: '政策图解',
          path: '/',
        },
        {
          name: '政策专题',
          path: '/',
        },
        {
          name: '今日申报',
          path: '/',
        },
        {
          name: '意见反馈',
          path: '/',
        },
        {
          name: '个人中心',
          path: '/',
        },
      ],
    }
  },
}
</script>

<style lang='less' scoped >
@import '../assets/style/main.less';
p {
    margin: 0;
}
.footer {
  background: #174373;
  height: 180px;
  color: #7495b8;
  .child {
    width: 1600px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    .left {
      position: relative;
      width: 400px;
      display: flex;
      flex-wrap: wrap;
      line-height: 30px;
      // align-items: center;
      padding: 60px 0;
      box-sizing: border-box;
      position: relative;
      span {
        display: block;
        margin-right: 15px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      &::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 100px;
        top: 40px;
        display: block;
        right: 0;
        background: #1890ff;
      }
    }
    .center {
      div {
        text-align: center;
      }
      .symbol {
        padding-top: 40px;
        img {
          width:53px;
          height: 66px;
        }
        .wrap_cc {
          margin: 15px 0 10px 10px
        }
      }
      .color {
        margin-top: 10px;
        color: #fff;
        letter-spacing: 2px;
      }
    }
    .right {
      position: relative;
      padding: 50px 0;
      box-sizing: border-box;
      width: 400px;
      p {
        text-align: right;
        margin: 10px 0 0;
        // &:nth-of-type(1) {
        //   margin-top: 20px;
        // }
      }
      &::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 100px;
        top: 40px;
        display: block;
        left: 0;
        background: #1890ff;
      }
    }
    .center {
      flex: 1;
    }
  }
}
@media screen and(max-width: 1600px) {
  .base-container {
    width: 1400px !important;
  }
}
@media screen and(max-width: 1400px) {
  .base-container {
    width: 1100px !important;
  }
}
.swiper /deep/ .swiper-container {
  padding: 0 30px;
}
</style>