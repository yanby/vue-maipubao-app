<template>
    <div class="newsDetails">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl"></h2>
        </div>
        <iframe class="iframe" name="iframe" :src="this.newsUrl" frameborder="0" scrolling="auto"></iframe>
    </div>
</template>
<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "newsDetails",
    data () {
        return {
            typeUlr: "",
            newsUrl: ""
        }
    },
    computed:{

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
    methods:{
        // 点击返回按钮
        navBack(){        
            if(this.typeUlr == "news"){
                this.$router.push({path: '/news'}); 
            }else{
                this.$router.push({path: '/home'}); 
            }   
            // this.$router.push({path: '/home'}         
        }, 
        fenxiangFun(){//详情分享
            // console.log(window.location.href.split('#')[0])
            var that = this;
            this.$http({
                url:this.changeData() + '/member/weChatShare',
                method: "post",
                params: {
                    url: window.location.href.split('#')[0]  
                }
            }).then(function(res){
                // console.log(res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名
                    jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
                });

                //分享给好友
                wx.ready(function(){
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: that.newsObj.title, // 分享标题
                        desc: '优铺资讯', // 分享描述
                        link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: "https://up-static.oss-cn-beijing.aliyuncs.com/Config/11539667606_.pic.jpg", // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        }
                    });

                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: that.newsObj.title, // 分享标题
                        link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              console.log("资讯详情页面错误：",err)
            });
        },        
    },
    mounted() {
        //截取Url里面的参数
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        var request = new Object();
        request = GetRequest();
        this.typeUlr = request['url']; 
        this.newsUrl = decodeURIComponent(this.typeUlr); 
        $(".iframe").height($(window).height());        
    },
    updated(){
        // 分享
        this.fenxiangFun();
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.newsDetails{
    width: 7.5rem;
    background: #fff;
    /*height: 100vh;*/
    margin: 0 auto;
}
.newsDetailsWrap{
    width: 6.9rem;
    padding: .3rem;
    padding: 1.2rem .3rem .3rem .3rem;
    .newsDetailsTop{
        width: 6.9rem;
        background: #fff;
        h2{
            color: #333333;
            font-size: .34rem;
        }        
        ul{
            width: 6.9rem;
            height: .6rem;
            position: relative;
            color: #898989;
            font-size: .26rem;
            margin-top: .2rem;
            li{
                float: left;
                img{
                    width: .28rem;
                    height: .18rem;
                    position: relative;
                    top: -.02rem;
                }
            }
            p{
                float: right;
            }
        }
    }
    .newsDetailsInfo{
        p{
            color: #333;
            font-size: .3rem;
            text-indent: 2em;
            text-align: justify;
            margin-top: .2rem;
        }
        img{
            max-width: 6.9rem;
            margin-top: .2rem;
        }
    }
}
.iframe{
    width: 7.5rem;
}
</style>
<style scoped>
.newsDetails{
   background: #fff;
}
.newsDetailsInfo >>> img{
    max-width: 6.9rem;
}  
.newsDetailsTop >>> strong{
    color: #000;
    font-weight: 800;
    font-size: .38rem;
} 
</style>