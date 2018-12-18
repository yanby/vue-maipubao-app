<template>
  <div class="promotionLogin">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back-write.png" alt="">
      <h2 class="navTitle fl">我要推广</h2>
    </div>
    <div class="content">
      <div class="loginMain">
        <h3>卖铺招商找优铺</h3>
        <div class="input1">
          <span></span>
          <input type="tel" placeholder="请输入您的手机号码" v-model="phoneVal" maxlength="11">
        </div>
        <div class="input2">
          <span></span>
          <input type="tel" v-model="securityCode" placeholder="请输入验证码" maxlength="6">
          <button type="button" :disabled="disabled" @click="sendcode()" class="btns" :class="{'codeColor':chengaColor}">{{btntxt}}</button>
        </div>
        <div class="btnWrap">
          <div class="loginBtn" @click="loginBtn($event)">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        phoneVal: '', // 手机号码
        securityCode: '', // 验证码
        disabled: false,
        time: 60,
        btntxt:"获取验证码",
        chengaColor: false,
        referrerId: '',
        teamId: '',
        cityId: "",
      }
    },
    mounted(){
      this.referrerId =  getUrlId("referrerId");
      this.cityId =  getUrlId("cityId");
    },
    watch: {
      phoneVal(){
        if(this.phoneVal.length == 11){
          this.chengaColor = true;
        }else{
          this.chengaColor = false;
        }
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!reg.test(this.phoneVal)){
          this.chengaColor = false;
        }else{
          this.chengaColor = true;
        }
      }
    },
    methods:{
      //获取验证码
      sendcode() {
        if(this.chengaColor == true){
          this.disabled=true;
          // 接口调用
          this.$http({
            url: this.changeData() + '/sendsms',
            method: 'post',
            params: {
              mobile: this.phoneVal,
              type: 1
            }
          }).then(data => {
            console.log(data);
            this.timer();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 倒计时
      timer() {
        if (this.time > 0) {
          this.time--;
          this.btntxt= "重新获取(" + this.time + ")";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.btntxt="获取验证码";
          this.disabled=false;
        }
      },
      // 点击登录按钮
      loginBtn() {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.phoneVal==''){
          Toast('请输入手机号');
        }else if(!reg.test(this.phoneVal)){
          Toast('请输入正确的手机号');
        }else if(this.securityCode == ""){
          Toast('请输入验证码');
        }else{

          this.$http({
            url: this.changeData() + '/login',
            method: 'post',
            params: {
              mobile: this.phoneVal,
              validCode: this.securityCode,
              cityId: this.cityId,
              type: 2,//2推荐
              referrerId: this.referrerId,
              source: "4"
            }
          }).then(res => {
            console.log(res);
            if(res.data.code == 101){
              Toast("登录成功");
              window.localStorage.setItem("iphone",res.data.memberInfo.mobile);
              window.localStorage.setItem("token",res.data["access-token"]);
              window.localStorage.setItem("memberId",res.data.memberInfo.id);
              this.$router.push({path: '/home'});
            }else{
              Toast(res.data.message);
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .promotionLogin {
    .content{
      width: 7.5rem;
      height: 13.34rem;
      background: url("../../../static/images/code/tuiguang.png") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      overflow: hidden;
      .loginMain{
        width: 5.8rem;
        margin: 5rem auto 0;
        padding-top: .3rem;
        h3{
          text-align: center;
          color: #fff;
          font-size: .36rem;
          font-weight: bold;
          margin-bottom: .4rem;
        }
        input{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          height: .3rem;
          width: 5.2rem;
          height: .78rem;
          background: #fff;
          margin-bottom: .4rem;
          font-size: 0.28rem;
          color: #333;
          padding-left: .6rem;
          border-radius: .05rem;
        }
        .input1{
          position: relative;
          span{
            position: absolute;
            left: .2rem;
            top: .2rem;
            width: .28rem;
            height: .38rem;
            background: url("../../../static/images/code/iphone.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
        .input2{
          position: relative;
          span{
            position: absolute;
            left: .2rem;
            top: .2rem;
            width: .32rem;
            height: .38rem;
            background: url("../../../static/images/code/yanzhengma.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
          input{
            width: 2.8rem;
          }
          .btns{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 2.2rem;
            font-size: 0.3rem;
            color: #999;
            height: .78rem;
            line-height: .78rem;
            background: #ccc;
            position: absolute;
            right: 0;
            top: 0;
          }
          .codeColor{
            color: #fff;
            background: #F7B425;
          }
        }
        .btnWrap {
          text-align: center;
          .loginBtn{
            width: 5.8rem;
            display: block;
            margin: 0 auto;
            background: #F7B425;
            border-radius: 4px;
            font-size: 0.34rem;
            line-height: 0.88rem;
            color: #fff;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
        }
      }
    }
  }
</style>
