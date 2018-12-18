<template>
  <div class="balance">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">账户余额</h2>
      <div class="txt"><router-link to="/balanceDetails">余额明细</router-link></div>
    </div>
    <div class="content">
      <div class="title">
        <div class="price">
          <p>可用余额(元)</p>
          <div>{{account}}</div>
        </div>
      </div>
      <div class="caozuo">
        <ul>
          <li>
            <div class="txt">
              <span class="icon1"></span><a href="javascript:;" @click="tixianFun()">申请提现</a>
            </div>
          </li>
          <li v-if="flag==0 || flag==1">
            <div class="txt">
              <span class="icon2"></span><a href="javascript:;" @click="bingCardFun()">绑定银行卡</a>
            </div>
          </li>
          <li v-if="flag!=0 && flag!=1">
            <div class="txt">
              <span class="icon2"></span><a href="javascript:;" @click="guanliFun()">管理银行卡</a>
            </div>
          </li>
        </ul>
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
            account: "",//账户余额
            flag:0,//0未认证 1未绑卡 2正常  3超过5张
            memberType:"",//1个人2公司
          }
      },
      mounted(){
        this.init();
        this.card();
      },
      methods:{
        navBack(){
          this.$router.push({path:"/mine"})
        },
        init(){
          var that = this;
          this.$http({
            url: this.changeData() + "/member/auth/memberInfo",
            method: 'post'
          }).then(res => {
            console.log(res)
            if(res.data.code == "101"){
              this.account = res.data.memberInfo.account;
            }
          }).catch(err => {
            console.log(err)
          });
        },
        card(){
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
              this.flag = res.data.flag;//0是未认证，1是有卡，2超过5张，3没卡
              this.memberType = res.data.memberType;//1个人2公司
            }
          }).catch(err => {
            console.log(err)
          });
        },
        guanliFun(){//判断有没有超过5张
          if(this.flag == 3){
            Toast("亲，您绑定的银行卡已达到上限，如需更改银行卡，请先解绑银行卡再绑定其他银行卡!")
          }else{
            this.$router.push({path:"/manageCard"})
          }
        },
        bingCardFun(){//绑定银行卡
          if(this.flag == 0){
            if(this.memberType == 1){
              this.$router.push({path:"/idCard"})//身份证
            }else{
              this.$router.push({path:"/businessLicense"})//身份证
            }
          }else{
            this.$router.push({path:"/bindCard"})
          }
        },
        tixianFun(){//申请提现
          if(this.account < 100){
            Toast("最低提现金额100元")
            return;
          }else if(this.flag == 0 || this.flag == 1){
            Toast("请先绑定银行卡")
            return;
          }else{
           this.$router.push({path:"/applyState"})
          }
        }
      }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .balance{
    width: 7.5rem;
    margin: 0 auto;
    background: #fff;
    padding-bottom: 1rem;
    .nav{
      position: relative;

    }
    .content{
      .title{
        width: 7.5rem;
        height: 4rem;
        background: url(../../../static/images/money/balance.png) no-repeat;
        -webkit-background-size: 7.5rem 4rem;
        background-size: 7.5rem 4rem;
        .price{
          padding-top: 1.5rem;
          text-align: center;
          p{
            font-size: .28rem;
            color: #fff;
            margin-bottom: .26rem;
          }
          div{
            font-size: .38rem;
            color: #fff;
          }
        }
      }
      .caozuo{
        width: 6.48rem;
        margin: .5rem auto 0;
        ul{
          li{
            margin-bottom: .3rem;
            width: 6.48rem;
            height: 1.43rem;
            background: #EFF6FA;
            .txt{
              padding-top: .25rem;
              position: absolute;
              .icon1,.icon2{
                float: left;
                margin-left: .3rem;
                margin-right: .5rem;
                width: .9rem;
                height: .9rem;
                background: url(../../../static/images/money/tixian.png) no-repeat;
                -webkit-background-size: .9rem .9rem;
                background-size: .9rem .9rem;
              }
              .icon2{
                background: url(../../../static/images/money/card.png) no-repeat;
                -webkit-background-size: .9rem .9rem;
                background-size: .9rem .9rem;
              }
              a{
                width: 4rem;
                height: 1.43rem;
                line-height: 1.43rem;
                position: absolute;
                left: 1.6rem;
                top: .05rem;
                font-size: .28rem;
              }
            }
          }
        }
      }
    }
  }
</style>
