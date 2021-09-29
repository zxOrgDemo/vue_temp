<template>
  <baseContainer>
    <div class="smart_detail base-container">
      <div class="top_search">
        <div class="search">
          <div class="input_search">
            <input v-model="enterPrise"
               @keyup.enter="searchList" 
               type="text" placeholder="请输入关键字" />
            <a-icon @click="searchList" class="icon" type="search" />
          </div>
        </div>
      </div>

      <div class="wrapper">
        <selectItem 
          @select="handleDept"
          :items='responseList'
          label="责任单位"></selectItem>
        <selectItem 
           @select="handleYear"
          :items='yaerList'
          label="年份"></selectItem>
      </div>
      <div class="word_total">
        共计<span class="number">{{ ipage.total }}</span
        >条专项成果
      </div>

      <div class="wrapper" style="padding-top: 0">
        <a-spin :spinning='spins'>
          <listItem @cilck="handleClick" 
            v-for="item in deptList"
            :item='item' 
            :key="item.id"></listItem>
        </a-spin>

        <div class="footer_pagination">
          <a-pagination 
            @change="TableChange" 
            @showSizeChange="sizeChange" 
            :page-size="ipage.size"
             v-model="ipage.current" 
            :default-current="ipage.current" 
            :total="ipage.total" />
        </div>
      </div>
    </div>
  </baseContainer>
</template>
<script>
import baseContainer from '@/components/base_container'
import selectItem from './components/selectItem'
import listItem from './components/listItem'

export default {
  components: {
    baseContainer,
    selectItem,
    listItem,
  },
  data() {
    return {
      spins: true,
      enterPrise: '',
      list: [],
      result: {},
      totals: 100,
      ipage: {
        current: 1,
        total: 0,
        size: 10
      },
      select: {
        orgcode: '',
        createTime: '',
      },
      deptList: [],
      yaerList: [],
      responseList: []
    }
  },
  mounted() {
    this.getDeptList()
    this.janerateYear()
    this.getResponseDept()
  },
  methods: {
    handleDept(val) {
      this.select.orgcode = val.value
      this.getDeptList(this.select)
    },
    handleYear(val) {
      this.select.years = val.value
      this.getDeptList(this.select)
    },
    janerateYear() {
      let year = new Date().getFullYear()
      let yaerList = Array.from({length: 4}, (n, i) => {
        return {
          title: year - i + '年',
          text: year - i + '年',
          value: year - i
        }
      })
      this.yaerList = yaerList
    },
    searchList() {
      let res = {
        title: this.enterPrise
      }
      this.getDeptList(res)
    },
    getResponseDept() {
      let url = '/api/reform/common/departList'
      this.axios.get(url).then(res => {
        if(res.success) {
          this.responseList = res.result
        }
      })
    },
    createParam(res ={}) {
      let param = {
        pageNo: this.ipage.current,
        pageSize: this.ipage.size,
        type: 0,
        ...res
      }
      return param
    },
    getDeptList(res ={}) {
      this.spins = true
      let url = '/api/reform/Effortlist'
      let param = this.createParam(res)
      param = this.cleanParam(param)
      this.axios.get(url,{params: param}).then(res => {
        if(res.success) {
          this.deptList = res.result.records
          this.ipage.total = res.result.total
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.spins = false
      })
    },
    cleanParam(parm) {
      let result = {}
      for (const key in parm) {
        if (Object.hasOwnProperty.call(parm, key)) {
          const element = parm[key];
          if(element || key=='type') {
            result[key] = element
          }
          
        }
      }
      return result
    },
    handleClick(item) {
      this.$router.push({
        path: '/policySearch/detail',
        query: {
          id: item.id
        }
      })
    },
    smartSearch() {},
    TableChange(page) {
      this.ipage.current = page
      this.spinning = true
    },
    sizeChange(current, size) {
      console.log(current, size)
    },
    handleChange() {},
  },
}
</script>
<style lang='less' scoped>
.smart_detail {
  min-height: 50vh;
  padding-bottom: 65px;
  // background: #fff;
  border-radius: 5px;
  //   .圆角矩形_7 {
  //   border-style: solid;
  //   border-width: 2px;
  //   border-color: rgb(50, 128, 208);
  //   border-radius: 3px;
  //   background-color: rgb(255, 255, 255);
  //   position: absolute;
  //   left: 662px;
  //   top: 247px;
  //   width: 592px;
  //   height: 50px;
  //   z-index: 56;
  // }

  .top_search {
    width: 1400px;
    margin: 0 auto;
    margin-top: 35px;
    margin-bottom: 40px;
    .search {
      width: 585px;
      margin: 0 auto;
      height: 50px;
      display: flex;
      .input_search {
        height: 100%;
        flex: 1;
        box-sizing: border-box;
        border: 2px solid rgb(50, 128, 208);
        line-height: 46px;
        border-radius: 3px;
        input {
          outline: none;
          border: none;
          height: 46px;
          text-indent: 10px;
          width: 80%;
        }
        .icon {
          float: right;
          margin-right: 20px;
          height: 46px;
          line-height: 50px;
          font-size: 20px;
          color: rgb(50, 128, 208);
          cursor: pointer;
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
  .word_total {
    width: 1400px;
    margin: 18px auto;
    color: rgb(66, 73, 83);
    .number {
      margin: 0 5px;
      color: #226ebc;
    }
  }
  .wrapper {
    width: 1400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    box-shadow: 1.204px 1.597px 50px 0px rgb(241, 246, 252);
    border-radius: 3px;
  }
}
.footer_pagination {
  padding: 40px 0 0;
  display: flex;
  justify-content: center;
}
</style>