<template>
  <div class="payment">
    <div class="payModel" v-if="payModel">
      <div class="wrap">
        <h3>确定要放弃支付</h3>
        <p>你与VIP会员只差一步之遥</p>
        <p>更多独享特权尽在<span>优铺</span>VIP会员</p>
        <div class="btn">
          <span @click="back()">确认离开</span>
          <span @click="goOn()">继续支付</span>
        </div>
      </div>
    </div>
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">选择支付方式</h2>
    </div>
    <div class="paymentMain">
      <div class="content">
        <p>您需要支付<span>{{price}}</span>元</p>
        <div class="txt" v-if="shenjiMsg">升级等级金额 - 会员剩余天数 * （当前会员金额/相对应的时间)= 升级该付款的金额</div>
        <dl>
          <dt>
            <img src="../../../static/images/mine/wechat.png">
          </dt>
          <dd>微信支付</dd>
          <i :class="{'on':tab===0}" @click="tab=0">
            <span></span>
          </i>
        </dl>
        <dl>
          <dt>
            <img src="../../../static/images/mine/alipay.png">
          </dt>
          <dd>支付宝支付</dd>
          <i :class="{'on':tab===1}" @click="tab=1">
            <span></span>
          </i>
        </dl>
      </div>
    </div>
    <div class="pay" @click="go()">立即支付<span>{{price}}</span>元</div>
    <div class="zhifubao"></div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        tab: 0,
        id: "",
        order: "",
        price: "",
        ip:"",
        code: "",
        appId: "",
        timestamp : "",
        nonceStr : "",
        signature: "",
        package: "",
        signType: "",
        paySign: "",
        shenjiMsg: false,//升级文字提示
        payModel: false,//弹窗
      }
    },
    mounted(){
      this.id = this.$route.query.id;
      this.order = this.$route.query.order;
      this.ip = returnCitySN["cip"];
      //会员升级显示对应的文字
      if(this.$route.query.myMember){
        this.shenjiMsg = true;
      }
      this.money();//获取价格
      //如果是微信浏览器，获取code
      if(isWeiXin()){
        this.init()
      }
    },
    methods:{
      money(){
        this.$http({
          url:this.changeData() + "/aliPay/auth/getPayAmount",
          method: 'post',
          params: {
            id: this.id,
            orderNo: this.order,
            orderSource: 4
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 101){
            this.price = res.data.payAmount;
          }
        }).catch(err => {
          console.log(err)
        });
      },
      back(){
        this.$router.push({path:"/buyMember",query:{url:this.$route.query.url}})
      },
      go(){
        var that = this;
        if(this.$route.query.myMember){
          var data = {
            id: this.id,
            orderNo: this.order,
            ip: this.ip,
            orderSource: 4,
            type: 1
          }
        }else{
          var data = {
            id: this.id,
            orderNo: this.order,
            ip: this.ip,
            orderSource: 4
          }
        }

        if(this.tab == 0){
          //判断是不是微信浏览器
          if(isWeiXin()){
            this.payFun();
          }else{
            this.$http({
              url:this.changeData() + "/weChat/auth/h5WeChatPay",
              method: 'post',
              params: data
            }).then(res => {
              console.log(res)
              if(res.data.code == 101){
                window.location.href = res.data.data;
              }
            }).catch(err => {
              console.log(err)
            });
          }
        }else if(this.tab == 1){//支付宝
          this.$http({
            url: this.changeData() + "/aliPay/auth/h5Pay",
            method: 'post',
            params: data
          }).then(res => {
            console.log(res)
            if(res.data.code == 101){
              $(".zhifubao").html(res.data.data)
              document.forms[0].submit()
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      navBack() {
        this.payModel = true;
      },
      goOn(){
        this.payModel = false;
      },
      init(){
        // var appId = 'wx424b6c66d2b53250';
        var appId = 'wx06e4787ad5a187a7';
        var oauth_url = encodeURIComponent(window.location.href.split('#')[0]);
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + oauth_url + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
        this.code = getQueryString("code");
        if (!this.code) {
          window.location = url;
        }
      },
      payFun(){
        var that = this;
        var data = {
          // url : window.location.href.split('#')[0],
          id: this.id,
          orderNo: this.order,
          code: this.code,
          orderSource: 4
        }
        this.$http({
          url:this.changeData() + '/weChat/auth/weChatPay',
          method: 'post',
          params: data
        }).then(function(res){
          console.log(res)
          if(res.data.code == 101){
            function onBridgeReady(){
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId":res.data.data.appid, //公众号名称，由商户传入
                  "timeStamp":res.data.data.timestamp,  //时间戳，自1970年以来的秒数
                  "nonceStr":res.data.data.noncestr, //随机串
                  "package":res.data.data.package, //统一订单号
                  "signType":res.data.data.signType, //微信签名方式：
                  "paySign":res.data.data.sign //微信签名
                },
                function(res1){
                  WeixinJSBridge.log(res1.err_msg)
                  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证 它绝对可靠。
                  if(res1.err_msg == "get_brand_wcpay_request:ok" ) {
                    that.$router.push({path:"/myMember"})
                  } else{
                    alert(res1.err_msg)
                    // history.back();
                  }
                }
              );
            }
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            }else{
              onBridgeReady();
            }
          }else{
            Toast(res.data.message)
          }
        }).catch(function(err){
          console.log("商店详情页面错误：",err)
        });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .payment{
    width: 7.5rem;
    background: #f7f8fa;
    margin: .9rem auto 0;
    .payModel{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      z-index: 999;
      .wrap{
        width: 6.6rem;
        height: 3.68rem;
        background: #fff;
        left: 50%;
        margin-left: -3.3rem;
        top: 50%;
        margin-top: -1.84rem;
        position: absolute;
        border-radius: .1rem;
        text-align: center;
        h3{
          font-size: .38rem;
          padding: .4rem 0 .56rem;
          font-weight: bold;
        }
        p{
          font-size: .32rem;
          margin-bottom: .22rem;
        }
        .btn{
          position: absolute;
          bottom: 0;
          width: 100%;
          font-size: 0;
          span{
            height: 0.88rem;
            line-height: 0.88rem;
            font-size: .34rem;
            width: 50%;
            display: inline-block;
            background: #EAEAEA;
            border-radius: 0 0 0 .1rem;
          }
          span:nth-of-type(2){
            background: #76AAF8;
            color: #fff;
            border-radius: 0 0 .1rem 0;
          }
        }
      }
    }
    .paymentTop{
      height: .9rem;
      text-align: center;
      background: #fff;
      border-bottom: 0.02rem solid #eee;
      position: relative;
      h3{
        width: 75%;
        line-height: .9rem;
        font-size: 0.36rem;
        color: #333;
        float: left;
        text-align: center;
      }
      i{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        display: inline-block;
        width: 13%;
        height: .9rem;
        line-height: .9rem;
        float: left;
        img{
          width: 0.36rem;
          height: 0.36rem;
        }
      }
    }
    .paymentMain{
      width: 7.5rem;
      background: #fff;
      .content{
        margin:0 .3rem;
        p{
          padding: .8rem 0 .2rem;
          color: #333;
          font-size: 0.34rem;
          span{
            color: #F65E35;
            margin: 0 0.1rem;
          }
        }
        .txt{
          font-size: .24rem;
          color: #898989;
          padding-bottom: .7rem;
          border-bottom: 0.01rem solid #eaeaea;
        }
        dl{
          height: 1.2rem;
          border-bottom: 0.01rem solid #eaeaea;
          dt{
            width: 1.32rem;
            height: 1.2rem;
            /*background: red;*/
            text-align: center;
            line-height: 1.2rem;
            float: left;
            img{
              width: .8rem;
              height: .8rem;
            }
          }
          dd{
            color: #333;
            line-height: 1.2rem;
            font-size: .3rem;
            float: left;
          }
          i{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: inline-block;
            float: right;
            margin-right: .2rem;
            margin-top: .35rem;
            span{
              display: inline-block;
              width: .5rem;
              height: .5rem;
              background: url(../../../static/images/mine/round.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
            &.on{
              span{
                display: inline-block;
                width: .5rem;
                height: .5rem;
                background: url(../../../static/images/mine/selected.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
    .pay{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: 80%;
      height: 1rem;
      font-size: 0.34rem;
      color: #fff;
      font-weight: 600;
      line-height: 1rem;
      text-align: center;
      background: #47abff;
      border-radius: 5px;
      margin-left: 10%;
      margin-top: .64rem;
      span{
        margin: 0 0.1rem;
      }
    }
  }



</style>



