<template>
  <div class="select_wrap" :class="[toggle ? 'wrap_show' : '']">
    <div class="select_wrapper">
      <div class="select_left">{{ label }}：</div>
      <div ref="test" class="select_wrap_inner">
        <div @click="totalClick" class="item" :class="[current == '-1' ? 'active' : '']">全部</div>
        <div v-for="item in items" :key="item.value" @click="singleClick(item)" :class="[includes(item) ? 'active' : '']" class="item">{{ item.title }}</div>

        <div @click="toggle = !toggle" class="show_more" v-if="showMore">查看更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: -1,
      single: '',
      multiCollect: [],
      showMore: false,
      toggle: false,
    }
  },
  watch: {
    items: {
      handler() {
        this.calc()
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    calc() {
      this.$nextTick(() => {
        let height = this.getStyle(this.$refs.test, 'height')
        this.showMore = parseInt(height) > 44
      })
    },
    getStyle(obj, attr) {
      if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[attr]
      }
      return obj.currentStyle[attr]
    },
    totalClick() {
      this.current = -1
      if (this.multi) {
        this.multiCollect = []
        this.$emit('select', [])
      } else {
        this.single = ''
        this.$emit('select', {})
      }
    },
    singleClick(item) {
      this.current = 0
      if (this.multi) {
        this.multiCollect = this.multiCollect.includes(item) ? this.multiCollect.filter((v) => v !== item) : this.multiCollect.concat(item)
        this.$emit('select',this.multiCollect)
      } else {
        this.single = item
        this.$emit('select',this.single)
      }
      
    },
    includes(item) {
      if (this.multi) {
        return this.multiCollect.includes(item)
      }
      return this.single == item
    },
  },
  props: {
    items: {
      default: () => [],
    },
    multi: {
      type: Boolean,
      default: false,
    },
    labelDirect: {
      default: 'left',
    },
    label: {
      default: 'label',
    },
  },
}
</script>

<style lang='less' scoped>
@import '~@/assets/style/main.less';
.select_wrap {
  height: 43px;
  overflow: hidden;
  color: rgb(66, 73, 83);
  margin-bottom: 10px;
  .select_wrapper {
    display: flex;
    font-size: 14px;

    .select_left {
      width: 80px;
      padding-top: 6px;
    }
    .select_wrap_inner {
        flex: 1;
      padding-right: 100px;
      position: relative;
      .show_more {
        position: absolute;
        right: 20px;
        top: 6px;
        cursor: pointer;
        color: @blueBack;
      }
      .item {
        margin-bottom: 10px;
        cursor: pointer;
        float: left;
        padding: 6px 10px;
        margin-right: 10px;
        border-radius: 3px;
      }
      .active {
        background: @blueBack;
        color: #fff;
      }
      &::after {
        display: block;
        clear: both;
      }
    }
  }
}
.wrap_show {
     height: auto;
  overflow: auto;
}
</style>