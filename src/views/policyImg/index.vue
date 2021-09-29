<template>
  <baseContainer>
    <div class="main_detail">
      <div class="top_back">
        <img ref="imgRef" src="@/assets/img/home/dp.png" alt="">
      </div>
      <a-spin :spinning='isGetting'>
        <div class="content_dp">
        <div class="filter"  v-if="!isLogin">
          <div class="lock" v-show="!login">
            <img src="@/assets/img/home/lock.png" alt="">
            <p class="tip">暂无权限，请登录后查看数据</p>
            <p @click="login =  true" class="login">立即登录</p>
          </div>
          <div class="lock" v-show="login">
           <div class="my_form">
             <div class="login_logo"></div>
             <div class="login_user">用户登录</div>
             <a-form
             id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              @submit="handleSubmit"
              >
                 <a-form-item>
                    <a-input
                      v-decorator="[
                        'username',
                        { rules: [{ required: true, message: '请输入账号!' }] },
                      ]"
                      placeholder="请输入账号"
                    >
                      <!-- <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" /> -->
                      <span class="span_slot" slot="prefix">用户名</span>
                    </a-input>
                  </a-form-item>
                    <a-form-item>
                      <a-input
                        v-decorator="[
                          'password',
                          { rules: [{ required: true, message: '请输入密码' }] },
                        ]"
                        type="password"
                        placeholder="请输入密码"
                      >
                        <!-- <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" /> -->
                        <span class="span_slot span_slot1" slot="prefix" v-html='"密&nbsp;&nbsp;&nbsp;码"'></span>
                      </a-input>
                    </a-form-item>

                    <a-button type="primary" 
                      :loading='isLogining'
                      html-type="submit" class="login-form-button">
                      登录
                    </a-button>
             </a-form>
           </div>
          </div>
        </div>
        <!-- <div class="login_authorize">请登录</div> -->
        <div class="header_dp"  :class="[isLogin? '': 'blurs']">
          <div class="head_left">
            <div class="left_ciclr">
              <div class="d" :class="[current == '0' ? 'actives': '']"  @click="handleCurrent('0')">月度</div>
              <div class="a" :class="[current == '1' ? 'actives': '']"  @click="handleCurrent('1')">季度</div>
              <div class="b" :class="[current == '2' ? 'actives': '']"  @click="handleCurrent('2')">半年</div>
              <div class="c" :class="[current == '3' ? 'actives': '']"  @click="handleCurrent('3')">年度</div>
            </div>
            <div class="left_word">共 {{ totals }} 个排名单位</div>
          </div>
          <div class="head_select" >
            <!-- <a-select v-model="params.year" :default-value="params.year"> -->
              <a-select 
                @change="handleChange"
                v-model="params.year">
                <a-select-option 
                  v-for="(item, index) in yearStart" :key="index"
                  :value="item"> {{item}}年 </a-select-option>
            </a-select>
            <!-- <a-select v-model="params.yearItem"  :default-value="params.yearItem"> -->
              <a-select @change="handleChange" v-model="params.yearItem">
              <a-select-option 
                v-for="item in options[current]"
                :key='item.value'
                :value="item.value"> {{item.label}} </a-select-option>
            
            </a-select>
          </div>
        </div>
        <div class="table_dp" :class="[isLogin? '': 'blurs']">
          <ul class="ul_dp">
            <li class="li_header">
              <div class="number">排名</div>
              <div class="name">单位名称</div>
              <div class="time">考核时间</div>
              <div class="score">考核分数</div>
            </li>
            <li :key="index" v-for="(item, index) in mockData" class="li_item">
              <div :style="{ color: index > 2 ? '' : colors[index] }" class="number">{{ index+1 }}</div>
              <div class="name">{{ item.name }}</div>
              <div class="time">{{  item.evaluateDate }}</div>
              <div class="score">{{  item.score }}</div>
            </li>
          </ul>

          <div class="check_more">
            <span v-show="hasMore" @click="getMore">
              <span>查看更多</span>
              <img src="@/assets/img/home/more.png" alt="" />
            </span>
            <!-- <span></span> -->
          </div>
        </div>
      </div>
      </a-spin>
    </div>
    <!-- <img v-for="item in 120" :src="require('@/assets/img/combine/1_00'+('00'+item).slice(-3)+'.png')" style="display:none" :key="item" alt="" srcset=""> -->
    <img v-for="item in jaSrc" :src="item" style="display:none" :key="item" alt="" srcset="">
  </baseContainer>
</template>
<script>
import baseContainer from '@/components/base_container'
let start = 0
export default {
  components: {
    baseContainer,
  },
  data() {
    return {
      totals: 0,   
      isGetting: false,  
      isLogin: false,
      isLogining: false,
      login: false,
      current: '0',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      colors: ['#ed3612', '#f58826', '#f6c340'],
      mockData: Array.from({ length: 20 }, (a, n) => {
        // let chinese = [0x4eff, 0x4fff]
        // let random = () => Math.ceil(Math.random() * (chinese[1] - chinese[0])) + chinese[0]
        // let getRandomChinese = () => String.fromCharCode(random())
        // let len = Math.ceil(Math.random() * 5) + 3
        // let name = Array.from({ length: len }, () => getRandomChinese())

        return {
          name: ' 投资合作委员会',
          time: ' 2020年第三季度',
          score: 100 - Math.ceil(Math.random() * n),
        }
      }),
      jaSrc: Array.from({ length: 120 }, (n, i) => {
        let real = ('00' + (i + 1)).slice(-3)
        return require('@/assets/img/combine/1_00' + real + '.png')
      }),
      options: {
        0: Array.from({length: 12}, (n, i) => {
          let index = i+1
          return {
            label: index+'月',
            value: ("0"+index).slice(-2)
          }
        }),
        1: Array.from({length: 4}, (n, i) => {
          let index = i+1
          let chinaNumber ='一二三四'
          return {
            label: `第${chinaNumber[i]}季度`,
            value: index
          }
        }),
        2: [{
          label: '上半年',
          value: '5'
        },{
          label: '下半年',
          value: '6'
        }],
        3:[]
      },
      yearStart: Array.from({length:3}, (n, i) => new Date().getFullYear() - i),
      params: {
        year: new Date().getFullYear(),
        yearItem: `0${new Date().getMonth() + 1}`.slice(-2),
        pageNo: 1,
        pageSize: 20
      },
      hasMore: true
    }
  },

  mounted() {
    this.isLogin = !!sessionStorage.getItem('token')
    if(this.isLogin) {
      this.getList()
    }
    this.$nextTick(() => {
      this.drawPic()
    })
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.tip)
  },
  methods: {
    handleCurrent(v) {
      this.current = v
      this.params.pageNo = 1
      let c = this.options[v][0]
      if(c) {
        this.params.yearItem = c.value
      } else {
        this.params.yearItem = ''
      }

      this.getList()
    },
    handleChange() {
      this.params.pageNo = 1

      this.getList()
    },
    drawPic() {
      this.tip = window.requestAnimationFrame(this.drawPic)
      if (start % 2 == 1) {
        let index = ((start + 1) / 2) % 119
        this.$refs.imgRef.setAttribute('src', this.jaSrc[index])
      }
      start += 1
    },
     handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLogining = true
          let url = '/api/user/login'
          this.axios.post(url, {
            ...values
          }).then(res => {
            if(res.success) {
              sessionStorage.setItem('token', res.result.token)
              sessionStorage.setItem('userInfo', JSON.stringify(res.result.userInfo))
              this.isLogin = true
              this.mockData = []
              this.getList()
            }else {
              this.$message.error(res.message);
            }
          }).finally(() => {
            this.isLogining = false
          })
        }
      });
    },
    getList() {
      this.isGetting = true
      let url = '/reform/gxqTaskEvaluate/rank'
      this.axios.get(url, {
        params: {
          ...this.params,
          queryType: this.current
        }
      }).then(res => {
        
        this.totals = res.result.total
        let {current, size} = res.result
        if(current < 2) {
          this.mockData = res.result.records
        } else {
          this.mockData = [...this.mockData, ...res.result.records]
        }
        if(!this.totals || this.totals <  current*size) {
          this.hasMore =false
        }
      }).finally(() => {
        this.isGetting = false
      })
    },
    getMore() {
      this.params.pageNo += 1
      this.getList()
    }
  },
}
</script>
<style lang='less' scoped>
@import url('~@/assets/style/main.less');
@color: #111;
.blurs {
  filter: blur(5px);
}

.main_detail {
  width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 468px);
  position: relative;
  .top_back {
    height: 156px;
    // background: url('~@/assets/img/home/dp.png') center no-repeat;
    background-size: auto 100%;
    margin-bottom: 25px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content_dp {
    border-radius: 3px;
    box-shadow: 1.204px 1.597px 50px 0px rgb(241, 246, 252);
    margin-bottom: 40px;
    position: relative;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
      z-index: 100;
      .lock {
        text-align: center;
        margin-top: 100px;
        img {
          width: 116px;
          height: 136px;
        }
        .tip {
          font-size: 16px;
          color: rgba(34, 110, 188);
          margin: 20px;
        }
        .login {
          width: 140px;
          height: 44px;
          border-radius: 3px;
          background: rgba(34, 110, 188);
          text-align: center;
          cursor: pointer;
          color: #fff;
          line-height: 44px;
          margin: 0 auto;
        }
      }
    }
    .login_authorize {
      position: absolute;
    }
    .header_dp {
      height: 118px;
      box-shadow: 1.204px 5px 10px 0px rgb(241, 246, 252);
      display: flex;
      align-items: center;
      padding: 0 20px;
      .head_left {
        flex: 1;
        display: flex;
        .left_ciclr {
          width: 340px;
          border-right: 1px solid #efefef;
          display: flex;
          div {
            cursor: pointer;
            height: 64px;
            width: 64px;
            border-radius: 100%;
            text-align: center;
            line-height: 64px;
            box-sizing: border-box;
            border: 1px solid #efefef;
            &:nth-of-type(n + 2) {
              margin-left: 28px;
            }
          }
          .actives {
            color: #fff;
            background: @blueBack;
          }
        }
        .left_word {
          line-height: 64px;
          margin-left: 28px;
        }
      }
      
    }
    .table_dp {
      padding: 20px;
      background: #fff;
      .ul_dp {
        list-style: none;
        padding: 0;
        li {
          display: flex;
          border-radius: 3px;
          height: 50px;
          line-height: 50px;
          div {
            flex: 1;
          }
          .number {
            font-weight: bold;
            width: 120px;
            flex: none;
            text-align: center;
          }
          .name {
            padding-left: 30px;
          }
          .score {
            width: 120px;
            flex: none;
            text-align: center;
          }
        }
        .li_header {
          background: @blueBack;
          color: #fff;
        }
        .li_item {
          &:nth-of-type(2n + 1) {
            background: #edf6ff;
          }
        }
      }
      .check_more {
        text-align: center;
        span {
          cursor: pointer;
          color: @blueBack;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}
/deep/ .ant-select {
  height: 36px;
  line-height: 36px;
  .ant-select-selection--single {
    width: 190px;
    height: 36px;
    line-height: 36px;
  }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  background: @primary-color;
  height: 50px;
  line-height: 50px;
   margin-top: 20px; 

}
.my_form {
  width: 420px;
  box-shadow: 0px 10px 30px 0px rgba(225, 236, 248, 0.6);
  border-radius: 8px;
  background: #fff;
  padding: 50px;
  position: relative;
  margin: 100px auto;
  .login_user {
    font-size: 24px;
    font-family: "FZLTZHK";
    color: rgb(60, 66, 82);
    text-align: center;
    margin-bottom: 50px;
    font-weight: 500;
  }
  .login_logo {
    position: absolute;
    height: 112px;
    width: 112px;
    border-radius: 100%;
    background: #eee;
    background:#fff url("~@/assets/img/home/login.png") center no-repeat;
    box-shadow: 0px -20px 20px 0px rgba(225, 236, 248, 0.4);
    background-size: auto 100%;
    top: -66px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.span_slot {
  width: 50px;
  height: 16px;
  line-height: 16px !important;
  display: block;
  text-align:justify-all !important;
 white-space:pre;
 border-right:1px solid #d7dfec;
 font-size: 14px;
 color: rgb(106, 119, 131);
}
#components-form-demo-normal-login /deep/ .ant-input{
  height: 40px;
  line-height: 40px;
  padding-left: 70px;
  background: #f3f7fd;
  border: 1px solid #f3f7fd;
}
</style>