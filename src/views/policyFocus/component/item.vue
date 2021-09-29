<template>
  <div class="item_sg" :class="[ind == 'u' ? 'up' : ind == 'd' ? 'down': '' ]">
    <div class="item_left">
      <div class="lead">{{ leadName }}</div>
    </div>
    <div class="item_right">
      <div class="content">
        <div class="animate" v-show="isExpand">
          <div class="content_head" >
            <span>牵头部门：</span>
            <span>{{ headName }}</span>
          </div>
          <div class="content_word" ref="heit">
            <p v-for="item in contentList" :key="item">
              {{ item }}
            </p>
          </div>
        </div>
        <div @click="isExpand = !isExpand" :class="['buttom', isExpand ? 'active' : '']">
          <!-- {{ isExpand ? '-' : '+' }} -->
          <img :src="isExpand ? require('@/assets/img/red.png') : require('@/assets/img/add.png')" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leadName: {
      type: String,
      default: 'leadname',
    },
    headName: {
      type: String,
      default: 'headName',
    },
    contentList: {
      default: () => [],
    },
    ind: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      isExpand: true,
      height: 0,

    }
  },
  mounted() {
      
    //   let height = this.getStyle(this.$refs.heit, 'height')
    //   this.height = parseInt(height) + 50
  },
  methods: {
      getStyle(el, attr) {
          if(getComputedStyle) {
              return getComputedStyle(el, null)[attr]
          }
          return el.currentStyle[attr]
      }
  }
}
</script>

<style lang='less' scoped>
.item_sg {
  display: flex;
  padding: 10px 0;
  align-items: center;
  position: relative;
  &::before {
      content: '';
      display: block;
      position: absolute;
      width: 2px;
      height: 100%;
      background: #5a97d6;
  }
  .item_left {
    height: auto;
    width: 318px;
    padding-right: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    .lead {
      margin-left: 70px;
      text-align: center;
      padding: 10px;
      background: #0068b6;
      border-radius: 3px;
      position: relative;
      &::before {
          content: '';
          position: absolute;
          display: block;
          height: 2px;
          width: 70px;
          left: -70px;
          top: 50%;
          transform: translateY(-50%);
          background: #5a97d6;
          border-radius: 1px;
      }
    }
  }
  .item_right {
    flex: 1;
    position: relative;

    .content {
      margin-left: 75px;
      position: relative;
      width: 310px;
      .animate {
          transition: 0.3s;
          overflow: hidden;
      }
      .content_head {
        height: 50px;
        background: #009d96;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        line-height: 50px;
        span:nth-of-type(1) {
          color: #fff;
        }
        span:nth-of-type(2) {
          color: #feff9a;
        }
      }
      .content_word {
        border: 1px solid #009d96;
        padding: 20px;
        background: #f9ffff;
        font-size: 14px;
        font-family: 'Microsoft YaHei';
        color: rgb(66, 73, 83);
      }
      .buttom {
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        // background: #0068b6;
        top: 50%;
        left: -75px;
        transform: translateY(-9px);
        color: #bbd7ec;
        text-align: center;
        line-height: 15px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .active {
        &::after {
          content: '';
          display: block;
          position: absolute;
          height: 2px;
          background: #5a97d6;
          width: 56px;
          left: 100%;
          top: 8px;
        }
      }
    }
  }
}
.up {
    &::before {
        height: 50%;
        top: 0;
        border-bottom-left-radius: 1px;
    } 
}
.down {
    &::before {
        height: 50%;
        top: 50%;
        border-top-left-radius: 1px;
    } 
}
</style>