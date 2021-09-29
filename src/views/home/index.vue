<template>
  <baseContainer>
    <div class="home base-container">
      <div class="active-top">
        <a-carousel autoplay>
        <div 
          v-for="item in imgs"
          :key="item.id"
          class="active-top">
          <img :src="baseUrl+ item.imgUrl" alt="">  
        </div>
       
      </a-carousel>
      </div>
      <div class="about_us">
        <div class="about_top">
          <p>ABOUT US</p>
          <div class="about_btm">
            <span class="line"></span>
            <span class="word_black"> 高新区简介</span>
            <span class="line"></span>
          </div>
        </div>
        <div class="about_discribe">
          <p>西安高新区是1991年3月国务院首批批准成立的国家级高新区之一，</p>
          <p>2006年被科技部确定为要建成世界一流科技园区的六个试点园区，2015年8月，国务院正式批复同意西安高新区建设国家自主创新示范区。</p>
          <p>2017年4月，陕西自贸区正式挂牌，高新功能区作为陕西自贸区面积最大、以特殊监管区区外保税等通关模式创新为特色的核心片区正式启动建设。</p>
        </div>
        <video ref="video" controls>
          <p>浏览器不支持查看video</p>
        </video>

        <div class="about_discribe">
          <p>
            29年间，西安高新区实现了从无到有、从小到大、从弱到强的一系列重大跨越，主要经济指标长时间保持高速增长。在全国高新区综合排名中，西安高新区名列前茅。
          </p>
          <p style="margin-bottom: 2.6rem">2019年，实现地区生产总值（GDP）2102.73亿元，增速12%，分别占全省和全市总量的8.2%和22.6%。</p>

          <p>2018年，西安高新区成功托管了来自雁塔区、长安区、鄠邑区、周至县的12个街镇，面积达到1079平方公里。</p>
          <p style="margin-bottom: 2.6rem">
            高新区确立了“北提、南闲、东联、西拓、中优、外协、内融”的空间发展策略，并开启了“破茧化蝶”式机构改革，为高新经济发展蓄足力量。
          </p>

          <p>
            目前的西安高新区，累计注册企业达16万家，形成了以电子信息、汽车产业、高端装备制造、生物医药等为核心的四大先进制造业，以人工智能、大数据/云计算、增材制造、机器人、新材料等为核心的
          </p>
          <p>
            五大战略新兴产业，以现代金融、现代物流、研发设计、检验检测、商务服务、会议会展等为核心的六大生产性服务业，以及以文化创意、旅游服务为核心的文化旅游产业四大产业集群。
          </p>
        </div>

        <div class="discrib_pic">
          <div ref="pos" class="center_btm"></div>
          <template v-if="arrivePos">
           <div 
            :class="['bom_' + index, '']" 
            v-for="(item, index) in bomList" 
            :key="item">
            <div class="back_1"></div>
            <div 
              :class="['middle_' + index, '']" 
              class="middle"></div>
             <div 
              :class="['max_' + index, '']" 
              class="max"></div>
             <div class="text_word">{{item}}</div>
          </div>
          </template>
        </div>
        <div class="about_discribe botom">
          <p>在“三次创业”的新征程中，高新区吹响了“大干123，建好首善区”的号角，将通过实施“一年攻坚、两年突破、三年超越”计划，到2020年全面实现追赶超越目标。</p>
          <p>建成“创新之城、富强之城、美丽之城、时尚之城、幸福之城”，建好大西安都市圈的首善区。</p>
        </div>
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
  directives: {
    lazy: {
      //自定义懒加载指令
      bind(el, binding) {
        let src = binding.value.src
        let hasBind = false
        let bind2 = () => {
          if (hasBind) {
            window.removeEventListener('scroll', bind2)
          } else if (window.scrollY > 100) {
            el.src = src
            hasBind = true
          }
        }

        window.addEventListener('scroll', bind2)
      },
    },
  },
  data() {
    return {
      imgs: [],
      baseUrl:  window._CONFIG.domianImgURL + '/',
      bomList: [
        '检验检测',
        '大数据/云计算',
        '电子信息',
        '生物制药',
        '汽车产业',
        '文化创意',
        '现代金融',
        '商务服务',
        '人工智能',

        '会议会展',
        '旅游服务',
        '高端装备制造',
        '新材料',
        '增材制造',
        '机器人',
        '现代物流',
        '研发设计',
        
      ],
      arrivePos: false
    }
  },
  mounted() {
    this.test()
    this.getImg()
    window.addEventListener('scroll', this.compare)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.compare)
  },
  methods: {
    getImg() {
        let url = '/api/reform/indexPic'
        this.axios.get(url).then(res => {

            this.imgs = res.result
        })
    },
    compare() {
      // console.log()
      if(!this.arrivePos) {
       this.arrivePos = this.$refs.pos.getBoundingClientRect().top + 100 < document.documentElement.clientHeight 
      }
    },
    test() {
      let utl = '/api/reform/indexVideo'
      this.axios.get(utl).then((res) => {
        let base = window._CONFIG.domianImgURL + '/'
        this.resrc = base + res.result.videopath
        this.$refs.video.src = this.resrc
      })
    },
  },
}
</script>

<style lang='less' scoped>
/deep/ .swiper-container {
  padding: 0 30px;
}
/deep/ .swiper-slide {
  padding: 0 30px;
  box-sizing: border-box;
}
.swiper {
  width: 100%;
  height: 100%;
}

.home {
  margin: 0 auto;
  .active-top {
    width: 100%;
    // background: url('~@/assets/img/home/fb.jpg') center no-repeat;
    height: 602px;
    // background-size: 100% auto, 100% auto;
    // filter: contrast(150%);
    padding-top: 50px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
    .word-1 {
      width: 100%;
      height: 60px;
      height: 43px;
      line-height: 43px;
      font-size: 40px;
      text-align: center;
      color: #fff;
      font-weight: bold;
    }
    .middle-word {
      width: 350px;
      margin: 30px auto;
      height: 43px;
      text-align: center;
      line-height: 43px;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
      color: #fff;
      font-size: 19px;
    }

    .search {
      width: 920px;
      margin: 0 auto;
      height: 66px;
      line-height: 66px;
      display: flex;
      .input_search {
        height: 100%;
        flex: 1;
        box-sizing: border-box;
        border: 1px solid #93abfe;
        line-height: 64px;
        input {
          outline: none;
          background: #2c46a4;
          border: none;
          height: 64px;
          width: 100%;
          text-indent: 10px;
          color: #fff;
        }
      }
      .btm {
        width: 120px;
        height: 100%;
        margin-left: 5px;
        background: #d58418;
        color: #fff;
        font-weight: bold;
        text-align: center;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .about_us {
    width: 1400px;
    margin: 0 auto;
    padding-top: 80px;
    .about_top {
      text-align: center;
      p {
        font-size: 30px;
        // font-family: 'FZLTHJW';
        letter-spacing: 5px;
        color: rgb(202, 207, 213);
        margin-bottom: 10px;
      }
      .about_btm {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
        .line {
          background-color: rgb(225, 229, 234);
          width: 30px;
          height: 2px;
          display: block;
        }
        .word_black {
          display: block;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          color: rgb(66, 73, 83);
          margin: 0 20px;
          font-weight: bold;
        }
      }
    }
    .about_discribe {
      p {
        text-align: center;
        font-family: 'Microsoft YaHei';
        color: rgb(66, 73, 83);
        font-size: 14px;
      }
    }
    video {
      width: 1106px;
      height: 607px;
      margin: 0 auto;
      display: block;
      outline: none;
      margin-top: 40px;
      margin-bottom: 50px;
    }
    .discrib_pic {
      height: 700px;
      background: url('~@/assets/img/home/btm_pic.png') center no-repeat;
      background-size: auto 100%;
      margin: 10px 0;
      position: relative;
      .center_btm {
        position: absolute;
        width: 218px;
        height: 135px;
        top: 50%;
        left: 49%;
        transform: translate(-50%, -50%);
        background: url('~@/assets/img/home/btm_center.png') center no-repeat;
        background-size: auto 100%;
        animation: none !important;
        opacity: 1 !important;
      }
      & > div {
        cursor: pointer;
        opacity: 0;
        position: absolute;
        animation: bounceIn 0.5s forwards;
        .back_1 {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url('~@/assets/img/home/big_data.png');
          background-size: 100% 100%;
          border-radius: 100%;
          z-index: 2;
        }
        .middle, .max {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: 0.2s;
          background: #307cc2;
          opacity: 0;
          border-radius: 100%;
        }
        .middle { z-index: 1}
        .middle_2, .max_2 {
          background: #2eaec1;
        }
        
        .middle_6, .max_6 {
          background: #2eaec1;
        }
        
        .middle_8, .max_8 {
          background: #2eaec1;
        }

        
        
        .middle_11, .max_11 {
          background: #d0e3fb;
        }
        .middle_12, .max_12 {
          background: #93bae2;
        }
        .middle_13, .max_13 {
          background: #93bae2;
        }
        .middle_14, .max_14 {
          background: #a5dfe8;
        }
        .middle_15, .max_15 {
          background: #a5dfe8;
        }
        .middle_16, .max_16 {
          background: #e1f0ff;
        }
        .middle_0, .max_0 {
          background: #a5dfe8;
        }
        &:hover {
          .middle {
            animation: big 2s linear infinite
            // background: #159;
            // transform: scale(1.1);
          }
          .max {
            animation: big 2s linear infinite;
            animation-delay: 1s;
          }
        }
        .text_word {
          width: 90px;
          text-align: center;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .bom_1 {
        animation-delay: 0.1s;
        height: 97px;
        width: 97px;
        border-radius: 100%;
        left: 310px;
        top: 320px
      }
      .bom_2 {
        animation-delay: 0.2s;
        height: 80px;
        width: 80px;
        border-radius: 100%;
        left: 473px;
        top: 158px;
        .back_1 {
          background: url('~@/assets/img/home/el.png') center no-repeat;
        }
      }
      .bom_3 {
        animation-delay: 0.3s;
        height: 80px;
        width: 80px;
        border-radius: 100%;
        right: 470px;
        top: 178px;
        .back_1 {
          background: url('~@/assets/img/home/medican.png') center no-repeat;
        }
      }
      .bom_4 {
        animation-delay: 0.4s;
        height: 90px;
        width: 90px;
        border-radius: 100%;
        left: 460px;
        bottom: 150px;
        .back_1 {
          background: url('~@/assets/img/home/car.png') center no-repeat;
        }
      }
      .bom_5 {
        animation-delay: 0.5s;
        height: 90px;
        width: 90px;
        border-radius: 100%;
        right: 480px;
        bottom: 150px;
        .back_1 {
          background: url('~@/assets/img/home/culture.png') center no-repeat;
        }
      }
      .bom_6 {
         animation-delay: 0.6s;
        height: 80px;
        width: 80px;
        border-radius: 100%;
        right: 330px;
        bottom: 235px;
        .back_1 {
          background: url('~@/assets/img/home/jinrong.png') center no-repeat;
        }
      }
      .bom_7 {
          animation-delay: 0.6s;
        height: 60px;
        width: 60px;
        border-radius: 100%;
        left: 70px;
        top: 220px;
        .back_1 {
          background: url('~@/assets/img/home/sw.png') center no-repeat;
        }
      }
      .bom_8 {
          animation-delay: 0.8s;
        height: 46px;
        width: 46px;
        border-radius: 100%;
        left: 239px;
        bottom: 173px;
        .back_1 {
          background: url('~@/assets/img/home/rgzn.png') center no-repeat;
        }
      }
      .bom_9 {
        animation-delay: 0.8s;
        height: 46px;
        width: 46px;
        border-radius: 100%;
        right: 80px;
        top: 280px;
        .back_1 {
          background: url('~@/assets/img/home/meeting.png') center no-repeat;
        }
      }
      .bom_10 {
        animation-delay: 0.8s;
        height: 46px;
        width: 46px;
        border-radius: 100%;
        right: 240px;
        bottom: 188px;
        .back_1 {
          background: url('~@/assets/img/home/traveling.png') center no-repeat;
        }
      }
      .bom_11 {
        animation-delay: 1s;
        height: 46px;
        width: 46px;
        border-radius: 100%;
        left: 70px;
        bottom: 230px;
        .back_1 {
          background: url('~@/assets/img/home/make.png') center no-repeat;
        }
      }
      .bom_12 {
        animation-delay: 1s;
        height: 50px;
        width: 50px;
        border-radius: 100%;
        right: 360px;
        top: 238px;
        .back_1 {
          background: url('~@/assets/img/home/n_mult.png') center no-repeat;
        }
      }
      .bom_13 {
        animation-delay: 1.2s;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        left: 243px;
        top: 200px;
        .back_1 {
          background: url('~@/assets/img/home/add_make.png') center no-repeat;
        }
      }
      .bom_14 {
        animation-delay: 1.3s;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        left: 215px;
        top: 360px;
        .back_1 {
          background: url('~@/assets/img/home/fake_person.png') center no-repeat;
        }
      }
      .bom_15 {
        animation-delay: 1.5s;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        right: 260px;
        top: 200px;
        .back_1 {
          background: url('~@/assets/img/home/wl.png') center no-repeat;
        }
      }
      .bom_16 {
        animation-delay: 1.6s;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        right: 230px;
        top: 350px;
        .back_1 {
          background: url('~@/assets/img/home/yf.png') center no-repeat;
        }
      }
      .bom_0 {
        animation-delay: 1.7s;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        right: 90px;
        bottom: 250px;
        .back_1 {
          background: url('~@/assets/img/home/check.png') center no-repeat;
        }
      }
    }
    .botom {
      margin-bottom: 50px;
    }
  }
}

@color: #000;
.i_word {
  position: absolute;
  left: 50%;
  transform: translateX(-50px);
  font-weight: bold;
  cursor: pointer;
  top: 50%;
  font-size: 30px;
  color: #fff;
  text-align: center;
  text-shadow: 6px 6px @color, 5px 5px @color, 5.5px 5.5px @color, 5.25px 5.25px @color, 5.75px 5.75px @color, 4px 4px @color, 4.5px 4.5px @color,
    4.25px 4.25px @color, 4.75px 4.75px @color, 3px 3px @color, 3.5px 3.5px @color, 3.25px 3.25px @color, 3.75px 3.75px @color, 2px 2px @color,
    2.5px 2.5px @color, 2.25px 2.25px @color, 2.75px 2.75px @color, 1px 1px @color, 1.5px 1.5px @color, 1.25px 1.25px @color, 1.75px 1.75px @color,
    0.5px 0.5px @color, 0.25px 0.25px @color, 0.75px 0.75px @color;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(0.4);
  }
  80% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes big {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}
@height: 10px;

/deep/ .ant-carousel .slick-dots {
    height: 30px;
    width: 200px;
    padding-top: 10px;
    margin: 0 auto;
    bottom: 30px;
    left: 50%;
    transform: translateX(-70px);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    li {
      &:nth-of-type(n + 2) {
        margin-left: 10px;
      }
      button {
        width: @height;
        height: @height;
        border-radius: 100%;
      }
  }
}
/deep/.ant-carousel .slick-dots li.slick-active {
  button {
    width: @height;
    background:#f5b901;
  }
}
</style>