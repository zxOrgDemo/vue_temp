<template>
  <div class="bread-wrap">
      <div class="bread-head" style="cursor:pointer" @click="toFirstPage">
          <img src="@/assets/img/smart/bread.png" alt="">首页
      </div>
      <div 
        class="base_bread"
        :class="[index == list.length -1 ? 'active': '']"
        v-for="item,index in list" :key='item.path'>
          {{item.name}}
      </div>
  </div>
</template>

<script>
export default {
    props: ['list'],
    methods: {
        toFirstPage() {
            this.$router.push({
                path: '/'
            })
        }
    }
}
</script>

<style lang='less' scoped>
.bread-wrap {
    display: flex;
    font-size: 16px;
    align-items: center;
    color: rgb(69, 69, 69);
    .bread-head {
        display: flex;
        align-items: center;
        img {
                width: 23px;
                height: 21px;
            margin-right: 5px;
        }
    }
    .base_bread {
        display: flex;
        align-items: center;
        &::before {
            content: '/';
            display: block;
            margin: 0 5px;  
            color: #454545;  
        }
    }
    .active {
        color: #367cce;
    }
}
// .首页___智能匹配 {
//   font-size: 16px;
//   font-family: "Microsoft YaHei";
//   color: rgb(69, 69, 69);
//   line-height: 10.625;
//   position: absolute;
//   left: 194px;
//   top: 382.281px;
//   z-index: 58;
// }

</style>