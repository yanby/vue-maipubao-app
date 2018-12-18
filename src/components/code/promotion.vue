<template>
    <div class="promotion">
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">我要推广</h2>
      </div>
      <div class="content">
        <div class="code">
          <canvas id="canvas1"></canvas>
        </div>
        <div class="msg">
          <h3>推荐福利说明</h3>
          <p>成功推荐一名用户，被推荐人在优铺平台成
            交，推荐人即可获得优铺平台相应的奖励金额被推荐人获得相应成交项目的佣金。</p>
        </div>
        <div class="tel">联系我们：400-8988-808</div>
      </div>
    </div>
</template>

<script>
  import QRCode from 'qrcode'
    export default {
        name: "",
        data() {
            return {
              QueryDetail: "http://"+window.location.host + "/promotionLogin",
              referrerId: "",
              referrerIdH5:"",
              cityId:""
            }
        },
      mounted(){
        this.referrerIdH5 =  getUrlId("referrerId");
        this.cityId =  getUrlId("cityId");
        if(getUrlId("move")){
          $(".nav").hide();
          $(".content").css({margin:0})
        }
        if(this.referrerIdH5){
          this.useqrcodeH5()
        }else{
          this.init();
        }
        this.fenxiangFun();
      },
      beforeRouteEnter (to, from, next) {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // XXX: 修复iOS版微信HTML5 History兼容性问题
        if (isiOS && to.path !== location.pathname) {
          // 此处不可使用location.replace
          location.assign(to.fullPath)
        } else {
          next()
        }
      },
        methods: {
          navBack() {
              this.$router.go(-1)
          },
          init(){
            var that = this;
            this.$http({
              url: this.changeData() + "/member/auth/createQRCode",
              method: 'post',
              params: {
                type: 1 //推广是1
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                this.referrerId = res.data.referrerId;
                console.log( this.referrerId)
                that.useqrcode();
              }
            }).catch(err => {
              console.log(err)
            });
          },
          useqrcode(){//生成的二维码内容，可以添加变量
            this.QueryDetail = this.QueryDetail+"?referrerId="+this.referrerId+"&cityId="+sessionStorage.cityId;
            var canvas = document.getElementById('canvas1')
            QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
              if (error) console.error(error)
              console.log('success!');
            })
          },
          useqrcodeH5(){//生成的二维码内容，可以添加变量
            this.QueryDetail = this.QueryDetail+"?referrerId="+this.referrerIdH5+"&cityId="+this.cityId;
            var canvas = document.getElementById('canvas1')
            QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
              if (error) console.error(error)
              console.log('success!');
            })
          },
          fenxiangFun(){//分享
            var loginUrl = window.location.href.replace('/promotion', "/promotionLogin?referrerId="+this.referrerId+"&teamId="+this.teamId+"&cityId="+sessionStorage.cityId)
            this.$http({
              url:this.changeData() + '/member/weChatShare',
              method: "post",
              params: {
                url : window.location.href.split('#')[0]
              }
            }).then(function(res){
              console.log(res)
              wx.config({
                //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名
                jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
              });

              wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                //分享给朋友
                wx.onMenuShareAppMessage({
                  title: "卖铺宝", // 分享标题
                  desc: '我要推广', // 分享描述
                  link: loginUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "https://up-static.oss-cn-beijing.aliyuncs.com/Config/11539667606_.pic.jpg", // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                    // 用户点击了分享后执行的回调函数
                  }
                });

                //分享到朋友圈
                wx.onMenuShareTimeline({
                  title: "卖铺宝", // 分享标题
                  link: loginUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "https://up-static.oss-cn-beijing.aliyuncs.com/Config/11539667606_.pic.jpg", // 分享图标
                  success: function () {
                    // 用户点击了分享后执行的回调函数
                  }
                });
              });
              wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              });
            }.bind(this)).catch(function(err){
              console.log("商店详情页面错误：",err)
            });
          },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .promotion {
    width: 7.5rem;
    margin: 0 auto;
    .content{
      margin-top: .9rem;
      height: 12.06rem;
      background: url(../../../static/images/code/code-bg.png) no-repeat;
      -webkit-background-size: 7.5rem 12.06rem;
      background-size: 7.5rem 12.06rem;
      .code{
        padding-top: 2.8rem;
        width: 4.1rem;
        height: 4.1rem;
        margin: 0 auto;
        #canvas1{
          width: 4rem!important;
          height: 4rem!important;
          box-shadow: 0 0 0 .01rem #898989;
        }
      }
      .msg{
        margin-top: 1.4rem;
        text-align: center;
        h3{
          font-size: .36rem;
          color: #fff;
          margin-bottom: .3rem;
        }
        p{
          color: #fff;
          font-size: .28rem;
          line-height: .5rem;
          text-align: justify;
          padding: 0 .9rem;
          span{
            display: inline-block;
            vertical-align: middle;
            width: .8rem;
            height: .35rem;
            line-height: .4rem;
            text-align: center;
            border-radius: .05rem;
            border: 0.01rem solid #FFC54A;
            color: #FFC54A;
          }
        }
      }
      .tel{
        margin-top: 1.2rem;
        font-size: .28rem;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
