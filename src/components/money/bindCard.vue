<template>
  <div class="bindCard">
    <div class="bottomModel" v-if="bottomModel">
      <div class="wrap">
        <ul>
          <li v-for="item in bankList" @click="bankListFun(item)">{{item.d_name}}</li>
        </ul>
        <div class="cancle" @click="bottomModel=false">取消</div>
      </div>
    </div>
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl" v-if="flag==1">绑定银行卡</h2>
      <h2 class="navTitle fl" v-if="flag!=1">添加银行卡</h2>
    </div>
    <div class="content">
      <div class="msg">
        <form action="">
        <ul>
          <li><span>账户名称：</span><input type="text" v-model="zhanghu" placeholder="请输入公司/个人名称" @keyup="zhanghuFun()"></li>
          <li><span>银行账号：</span><input type="text" v-model="yinhang" placeholder="请输入银行账号" @keyup="yinhangFun()"  @blur="yanzhengCard()" maxlength="19"></li>
          <li @click="selectFun()"><span>银行名称：</span><s class="selectCard">请选择银行卡</s><i></i>
          </li>
          <li><span>开户行名称：</span><input type="text" v-model="kaihuhang" placeholder="例：北京银行西二旗支行" @keyup="kaihuhangFun()"></li>
          <li><span>手机号：</span><input type="text" v-model="iphone" placeholder="请填写手机号" @keyup="iphoneFun()" maxlength="11"><b v-show="show" @click="getCode()">获取验证码</b>
            <b v-show="!show">重新获取{{count}}s</b>
          </li>
          <li><span>验证码：</span><input v-model="code" @keyup="codeFun()" type="text" placeholder="请输入验证码" maxlength="6"></li>
        </ul>
        </form>
      </div>
      <div class="btn">
        <div class="tishi">温馨提示：亲，请绑定借记卡并银行卡绑定不能超过5张哦！</div>
        <p><router-link to="/bindCardMsg">绑定银行卡说明？</router-link></p>
        <div class="btn-next" @click="commit()">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        name: "",
        data() {
            return {
              show: true,
              count: '',
              timer: null,
              zhanghu:"",//公司名称
              yinhang: "",
              kaihuhang:"",
              iphone: "",
              code: "",
              flag:0,//判断首次绑卡
              selected: "请选择",//银行卡选中
              bankList:"",//银行卡列表
              bottomModel: false,//底部弹窗
              selectVal: "",//银行卡选中的val
              status:"",//银行卡验证有没有绑定
            }
        },
        mounted(){
          this.init()
          this.card()
        },
        methods: {
          navBack() {
              this.$router.go(-1)
          },
          init(){
            this.$http({
              url: this.changeData() + "/bank/auth/bindBankCard",
              method: 'post',
              params:{
                accountBank: "",//开户行名称【必传】
                cardNo: "",//银行账号 【必传】
                accountName: "",//账户名称【必传】
                bankId: "",//银行名称ID 【必传】
                validCode: "",//验证码 【必传】
                mobile: ""//手机号 【必传】
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                this.flag = res.data.flag;
              }
            }).catch(err => {
              console.log(err)
            });
          },
          card(){//银行卡列表
            this.$http({
              url: this.changeData() + "/bank/auth/getBankList",
              method: 'post'
            }).then(res => {
              // console.log(res)
              if(res.data.code == "101"){
                this.bankList = res.data.bankList;
              }
            }).catch(err => {
              console.log(err)
            });
          },
          selectFun(){//银行卡选中
            this.bottomModel = true;
          },
          yanzhengCard(){//验证卡号有没有绑定过
            this.$http({
              url: this.changeData() + "/bank/auth/validateCardNo",
              method: 'post',
              params:{
                cardNo: this.yinhang
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                 this.status = res.data.status;
                 if(res.data.status == false){
                   Toast("银行卡已绑定")
                 }
              }
            }).catch(err => {
              console.log(err)
            });
          },
          bankListFun(item){//银行卡选中
            this.bottomModel = false;
            $(".selectCard").html(item.d_name)
            this.selectVal = item.d_value;
          },
          getCode(){//获取验证码
           if(this.iphone == ""){
             Toast("请输入手机号")
           }else{
             if(isPoneAvailable(this.iphone)){
               const TIME_COUNT = 60;
               this.$http({
                 url: this.changeData() + "/sendsms",
                 method: 'post',
                 params:{
                   mobile:localStorage.iphone,
                   type: 2,//2 绑卡验证短信
                 }
               }).then(res => {
                 console.log(res)
                 if(res.data.code == "101"){
                   if (!this.timer) {
                     this.count = TIME_COUNT;
                     this.show = false;
                     this.timer = setInterval(() => {
                       if (this.count > 0 && this.count <= TIME_COUNT) {
                         this.count--;
                       } else {
                         this.show = true;
                         clearInterval(this.timer);
                         this.timer = null;
                       }
                     }, 1000)
                   }
                 }
               }).catch(err => {
                 console.log(err)
               });
             }
           }

          },
          commit(){
            var that = this;
            var reg =  /^([1-9]{1})(\d{14}|\d{18})$/;
            if(this.zhanghu == "" || this.yinhang == "" || this.kaihuhang == "" || this.iphone == "" || this.code == "" || $(".selectCard").html() == "请选择银行卡"){
              Toast('请输入必填项');
            }else if(reg.test(this.yinhang) == false){
              Toast('请输入正确的银行卡号');
            }else if(this.status == false){
              Toast("银行卡已绑定")
            }else if(isPoneAvailable(this.iphone) == false){
              Toast('请输入正确的手机号');
            }else{
              this.$http({
                url: this.changeData() + "/bank/auth/bindBankCard",
                method: 'post',
                params:{
                  accountBank: this.kaihuhang,//开户行名称【必传】
                  cardNo: this.yinhang,//银行账号 【必传】
                  accountName: this.zhanghu,//账户名称【必传】
                  bankId: this.selectVal,//银行名称ID 【必传】
                  validCode: this.code,//验证码 【必传】
                  mobile: this.iphone//手机号 【必传】
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == "101"){
                  Toast("绑卡成功")
                  setTimeout(function () {
                    that.$router.push({path: "/balance"})
                  },2000)
                }else{
                  Toast(res.data.message);
                }

              }).catch(err => {
                console.log(err)
              });
            }
          },
          codeFun(){
            this.code = this.code.replace(/[^\w]/g,'');
          },
          zhanghuFun(){
           this.zhanghu = this.zhanghu.replace(/(^\s+)|(\s+$)/g,'');
          },
          yinhangFun(){
            this.yinhang = this.yinhang.replace(/[^\w]/g,'');
          },
          kaihuhangFun(){
            this.kaihuhang = this.kaihuhang.replace(/(^\s+)|(\s+$)/g,'');
          },
          iphoneFun(){
            this.iphone = this.iphone.replace(/[^\w]/g,'');
          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .bindCard{
    width: 7.5rem;
    margin: 0.9rem auto 0;
    .content{
      margin-top: .1rem;
      .msg{
        padding: 0 .3rem;
        background: #fff;
        ul{
          li{
            height: .9rem;
            line-height: .96rem;
            font-size: .3rem;
            border-bottom: 0.01rem solid #eaeaea;
            input{
              font-size: .3rem;
              height: .8rem;
              line-height: .8rem;
              box-sizing: border-box;
              vertical-align: -.02rem;
              -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            span{
              display: inline-block;
              text-align: right;
              width: 1.8rem;
              height: .9rem;
              font-size: .3rem;
            }
            i{
              display: inline-block;
              width: 0.14rem;
              height: .1rem;
              background: url(../../../static/images/Merchants/down.png) no-repeat;
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
              vertical-align: .05rem;
              margin-left: .1rem;
            }
            select{
              width: 2.2rem;
              height: .5rem;
              background: #fff;
              vertical-align: .03rem;
              outline: none;
              opation{
                outline: none;
              }
            }
            input{
              width: 3.5rem;
              font-size: .3rem;
              vertical-align: middle;
            }
            b{
              font-size: .26rem;
              color: #64ABFF;
              cursor: pointer;
            }
          }
        }
      }
      .btn{
        padding: 0 .3rem;
        margin-top: .3rem;
        .tishi {
          font-size: .255rem;
          color: #898989;
        }
        p{
          margin: .6rem auto .3rem;
          a{
            font-size: .26rem;
            color: #64ABFF;
          }
        }
        .btn-next{
          width: 6.9rem;
          height: .9rem;
          line-height: .9rem;
          color: #fff;
          text-align: center;
          font-size: .34rem;
          background: #64ABFF;
        }
      }
    }
  }
</style>
