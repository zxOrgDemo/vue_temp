<template>
  <baseContainer>
    <div class="smart_detail base-container">
      <div class="main_detail">
        <div class="main_top">
          <div class="left_img">
            <img src="@/assets/img/home/sgwx.png" alt="" />
          </div>
          <div class="info_1">深改工作</div>
          <div class="top_search" style="flex: 1">
            <div class="search">
              <div class="input_search">
                <input v-model="enterPrise" @keyup.enter="searchList" type="text" placeholder="请输入关键字搜索" />
                <a-icon @click="searchList" class="icon" type="search" />
              </div>
            </div>
          </div>
          <div class="select">
            <a-select @change="handleChange" v-model="choose.subject" placeholder="请选择" class="select" showArrow>
              <a-select-option value="">请选择</a-select-option>
              <a-select-option v-for="sub in options" :key="sub.value" :value="sub.value">{{ sub.text }}</a-select-option>
            </a-select>
          </div>
          <div class="year">
            <div @click="hadnleYear(item)" :class="[item == cyear ? 'yactive' : '']" class="year_item" v-for="item in year" :key="item">{{ item }}年</div>
          </div>
        </div>

        <div class="time_items">
          <div class="time_line"></div>
          <div class="time_origin">
            <span class="back">
              <img src="@/assets/img/home/tl.png" alt="" />
            </span>
            <span>{{ cyear }}年</span>
          </div>

          <timeItem 
            @cilck="handleClick" 
            :info="item" 
            :month='item.month'
            v-for="item in deepChangeList" :key="item.id"></timeItem>
          <!-- <timeItem></timeItem>
          <timeItem month='4月'></timeItem>
          <timeItem></timeItem>
          <timeItem></timeItem> -->
        </div>
      </div>
    </div>
  </baseContainer>
</template>
<script>
import baseContainer from '@/components/base_container'
import timeItem from './components/timeItems'
export default {
  components: {
    baseContainer,
    timeItem,
  },
  data() {
    return {
      cyear: 2020,
      year: [2020, 2019, 2018],
      enterPrise: '',
      list: [],
      result: {},
      options: [],
      choose: {
        subject: void 0,
      },
      ipage: {},
      deepChangeList: [],
    }
  },
  mounted() {
    this.getResponseDept()
    this.creatYear()
    this.hadnleYear(this.cyear)
  },
  methods: {
    handleClick(info) {
      this.$router.push({
        path: '/policyReg/detail',
        query: {
          id: info.id,
        },
      })
    },
    hadnleYear(item) {
      this.cyear = item
      let res = {
        years: item,
      }
      this.getDeptList(res)
    },
    handleChange() {
      let res = {
        subject: this.choose.subject,
      }
      this.getDeptList(res)
    },
    creatYear() {
      let start = new Date().getFullYear()
      let res = Array.from({ length: 3 }, (n, i) => {
        return start - i
      })
      this.cyear = start
      this.year = res
    },
    searchList() {
      let res = {
        title: this.enterPrise,
      }
      this.getDeptList(res)
    },
    getResponseDept() {
      let url = '/api/reform/common/subjectList'
      this.axios.get(url).then((res) => {
        if (res.success) {
          this.options = res.result
        }
      })
    },
    createParam(res = {}) {
      let param = {
        pageNo: this.ipage.current,
        pageSize: this.ipage.size,
        type: 1,
        ...res,
      }
      return param
    },
    getDeptList(res = {}) {
      this.spins = true
      let url = '/api/reform/Effortlist'
      let param = this.createParam(res)
      param = this.cleanParam(param)
      this.axios
        .get(url, { params: param })
        .then((res) => {
          if (res.success) {
            // this.deepChangeList = res.result.records
            let  list = res.result.records

            let m = -1, result = []
            if(list[0]) {
              m = new Date(list[0]).getMonth() + 1
            }
            list.forEach(v => {
              let mon = new Date(v.timestp).getMonth() + 1
               
              if(mon != m) {
                v.month = m
                m = mon
              }
              result.push(v)
            })

            this.deepChangeList = result

            



            this.ipage.total = res.result.total
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.spins = false
        })
    },
    cleanParam(parm) {
      let result = {}
      for (const key in parm) {
        if (Object.hasOwnProperty.call(parm, key)) {
          const element = parm[key]
          if (element || key == 'type') {
            result[key] = element
          }
        }
      }
      return result
    },
  },
}
</script>
<style lang='less' scoped>
@import url('~@/assets/style/main.less');
@color: #111;
.smart_detail {
  width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 468px);
  position: relative;
  .main_detail {
    box-shadow: 1.204px 1.597px 50px 0px rgb(241, 246, 252);
    border-radius: 3px;
    background: #fff;
    padding: 0 20px;
    width: 1093px;
    margin: 24px 0;
    position: relative;
    .main_top {
      display: flex;
      position: sticky;
      align-items: center;
      background: #fff;
      z-index: 20;
      top: 0;
      //   justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #efefef;
      .info_1 {
        font-size: 20px;
        font-family: 'Microsoft YaHei';
        color: rgb(34, 110, 188);
        font-weight: bold;
        margin-right: 80px;
      }

      .top_search {
        .search {
          // width: 204px;
          width: 390px;
          margin: 0 auto;
          height: 36px;
          display: flex;
          .input_search {
            height: 100%;
            flex: 1;
            box-sizing: border-box;
            border: 1px solid rgb(209, 216, 224);
            line-height: 34px;
            border-radius: 3px;
            transition: 0.3s;
            input {
              outline: none;
              border: none;
              height: 34px;
              text-indent: 10px;
              width: 80%;
            }
            .icon {
              float: right;
              margin-right: 20px;
              height: 34px;
              line-height: 40px;
              font-size: 16px;
              color: @blueBack;
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
          &:hover {
            .input_search {
              border-color: @blueBack;
            }
          }
        }
      }
      .select {
        width: 204px;
        height: 36px;
        margin-right: 16px;
        /deep/ .ant-select {
          height: 36px;
          line-height: 36px;
          .ant-select-selection--single {
            height: 36px;
            line-height: 36px;
          }
        }
      }
      .year {
        display: flex;
        border: 1px solid #e3e9f2;
        height: 36px;
        line-height: 34px;
        border-radius: 3px;
        justify-self: flex-end;
        .year_item {
          width: 80px;
          cursor: pointer;
          height: 100%;
          text-align: center;
          &:nth-of-type(n + 1) {
            border-left: 1px solid #e3e9f2;
          }
        }
        .yactive {
          background: @blueBack;
          color: #fff;
        }
      }
    }
    .time_items {
      position: relative;
      margin-top: 50px;
      // height: 500px;
      padding-bottom: 20px;
      .time_line {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 3px;
        left: 13px;
        background: #e1f0ff;
        // z-index: -1;
      }
      .time_origin {
        transform: translateZ(1px);
        font-size: 20px;
        font-family: 'Arial';
        color: rgb(72, 80, 89);
        display: flex;
        .back {
          display: block;
          height: 28px;
          width: 28px;
          border-radius: 14px;
          background: @blueBack;
          margin-right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .left_img {
    width: 291px;
    height: 411px;
    position: absolute;
    top: 0;
    right: -328px;
    background: url('~@/assets/img/home/sh.png') center 50px no-repeat, url('~@/assets/img/home/log.png') 241px 15px no-repeat,
      url('~@/assets/img/home/ef.png') center no-repeat;
    background-size: 211px auto, 35px auto, 100%;
    img {
      position: absolute;
      top: 170px;
      left: 80px;
      height: 131px;
      width: 131px;
    }
  }
}
/deep/ .ant-select-selection:hover {
  border-color: @blueBack;
}
</style>