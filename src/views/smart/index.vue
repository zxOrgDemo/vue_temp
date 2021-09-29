<template>
  <baseContainer>
    <div class="smart_detail base-container">
      <div class="video">
        <video ref="video" controls></video>
        <!-- <div class="map" @mouseenter="hover = true" @mouseleave="hover = false">
          <div class="progress"></div>
          <div :style="{width: rate*100*0.9857 + '%'}" :class="[hover? 'ciclre': '']" class="process "></div>
          <div @click="handlePlay" class="btbn" v-show="hover || puased">
            <img src="@/assets/img/home/right.png" alt="" srcset="" />
          </div>
        </div> -->
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
    return {
      list: [],
      result: {},
      resrc: '',
      rate: 0,
      duration: 0,
      hover: false,
      puased: true,
    }
  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
      let utl = '/api/reform/video'
      this.axios.get(utl).then((res) => {
        if (res.success) {
          this.result = res.result
          let base = window._CONFIG.domianImgURL + '/'
          this.resrc = base + this.result.videopath
          this.$refs.video.src = this.resrc
          this.$refs.video.oncanplay = (e) => {
            this.$refs.video.play()
            this.duration = e.target.duration
            this.$refs.video.oncanplay = null
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handlePlay() {
      if (this.puased) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
      this.puased = !this.puased

      this.$refs.video.addEventListener('timeupdate', () => {
        let { currentTime } = this.$refs.video
        this.rate = currentTime / this.duration
      })
      this.$refs.video.addEventListener('complete', () => {
        this.puased = true
      })
    },
  },
}
</script>
<style lang='less' scoped>
.smart_detail {
  min-height: 50vh;
  padding-bottom: 65px;
  // background: #fff;
  border-radius: 5px;
  video {
    width: 1400px;
    height: 790px;
    margin: 0 auto;
    display: block;
    outline: none;
    margin-bottom: 30px;
    margin-top: 20px;
    border-radius: 3px;
    overflow: hidden;
  }
  .video {
    position: relative;
    width: 1400px;
    height: 790px;
    margin: 0 auto;
    .map {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      .progress {
        position: absolute;
        width: 1380px;
        left: 10px;
        bottom: 50px;
        background: #948b9a;
        height: 1px;
      }
      .process {
        position: absolute;
        left: 10px;
        bottom: 50px;
        background: #6fc5fe;
        height: 1px;
        transition: 0.2s;
      }
      .ciclre {
        &::after {
          cursor: pointer;
          position: absolute;
          height: 14px;
          width: 14px;
          border: 1px solid #6fc5fe;
          content: '';
          display: block;
          left: 100%;
          top: -7px;
          border-radius: 100%;
        }
      }
      .btbn {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 86px;
        width: 86px;
        border-radius: 100%;
        background: rgba(0, 0, 0, 0.6);
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 26px;
          margin-left: 33px;
          height: 34px;
        }
      }
    }
  }
}
</style>