<template>
  <baseContainer>
    <div class="smart_detail base-container">
      <div class="top_back">
        <span class="back" @click="back"><a-icon type="rollback" />返回</span>
        <span>专项成果</span>
        <span class="arrow">></span>
        <span>{{ result.title }}</span>
      </div>
      <a-spin :spinning='spinning'>
          <div class="wrapper">
        <div class="content-title">{{ result.title }}</div>
        <div class="content-msg">
          <span class="time">{{  result.createTime && result.createTime.replace(/\s+.*$/, '') }}</span>
          <span>{{ result.orgcode_dictText }}</span>
        </div>
        <div class="content-html">
           <div class="msg_content" v-html="result.content">
               
           </div>
        </div>
      </div>
      </a-spin>
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
      title: '测试名字',
      spinning: true,
      enterPrise: '',
      list: [],
      result: {},
      totals: 100,
      current: 1,
    }
  },
  mounted() {
      this.getDetail(this.$route.query.id)
  },
  methods: {
    back() {
        this.$router.go(-1)
    },
    getDetail(id) {
      let url = '/api/reform/Effortlist'
      this.axios.get(url,{params: {id}}).then(res => {
        if(res.success) {
          let res1  = res.result.records
          if(res1.length) {
              this.result = res1[0]
          }
        }
      }).finally(() => {
          this.spinning = false
      })
    }
  },
}
</script>
<style lang='less' scoped>
@import url('~@/assets/style/main.less');
.smart_detail {
  min-height: 50vh;
  padding-bottom: 65px;
  background: #fff;
  border-radius: 5px;
  .top_back {
    width: 1400px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: rgb(66, 73, 83);
    .back {
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 3px;
      background: @blueBack;
      color: #fff;
      margin-right: 15px;
      i {
        margin-right: 5px;
      }
    }
    .arrow {
      margin: 0 15px;
    }
  }
  .wrapper {
    width: 1400px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 1.204px 1.597px 50px 0px rgb(241, 246, 252);
    border-radius: 3px;
    .content-title {
      text-align: center;
      font-size: 24px;
      font-family: 'Microsoft YaHei';
      color: rgb(67, 73, 81);
      font-weight: bold;
      line-height: 1.75;
    }
    .content-msg {
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-family: 'Microsoft YaHei';
      color: rgb(152, 161, 172);
      padding: 25px 0 35px;
      .time {
        margin-right: 50px;
      }
    }
    .content-html {
        padding: 0 105px;
        .msg_content {
            border-top: 1px solid #eef2f6;
            padding: 20px 0; 
            font-size: 16px;   
            color: rgb(69, 76, 84);
        }
    }
  }
}
.footer_pagination {
  margin: 40px 0 0;
  display: flex;
  justify-content: center;
}
</style>