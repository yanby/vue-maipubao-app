<template>
<div class="banner2">
	<!-- <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">资讯详情</h2>
    </div> -->
    <div class="top1">
        <div class="top1Box">
            <h2>全新品牌发布平台，精彩等你发现</h2>
            <div class="top1BoxLeft">
                <i class="i1"><img src="../../../static/images/banner/banner2/dot.png"></i>
                <b><img src="../../../static/images/banner/banner2/verticalBar.png" class="dot1"></b>
                <i class="i2"><img src="../../../static/images/banner/banner2/dot.png"></i>
                <b><img src="../../../static/images/banner/banner2/verticalBar.png" class="dot2"></b>
                <i class="i3"><img src="../../../static/images/banner/banner2/dot.png"></i>
            </div>
            <div class="top1BoxRight">
                <dl class="dl1">
                    <dt>海量业内资源</dt>
                    <dd>优铺平台注册万名招商人在此静候，直接匹配项目资源，高效选址拓展</dd>
                </dl>
                <dl class="dl2">
                    <dt>免费自主发布品牌信息</dt>
                    <dd>商业地产专业互联网平台7*24护航，快速提高品牌业内知名度</dd>
                </dl>
                <dl class="dl3">
                    <dt>成倍提高品牌曝光率</dt>
                    <dd>与40000+全国连锁知名品牌集中展示，加速精准曝光度</dd>
                </dl>
            </div>
            <h3>(连锁品牌、加盟品牌、新兴品牌、独创品牌可在线发布品牌名称、介绍、联系人、联系电话及拓展需求)</h3>
            <img src="../../../static/images/banner/banner2/publish.png" class="publish">
            <img src="../../../static/images/banner/banner2/horizontalLine.png" class="horizontalLine">
            <img src="../../../static/images/banner/banner2/publishBrand.png" class="publishBrand">
        </div>

        <div class="top2Box">
            <h2>全国万家品牌查询、认领、纠错</h2>
            <h3>随时随地自主管理自己的品牌，联系信息更准确，不错失开店良机，拓展更有效率</h3>
            <h4>(在线可认领自己的品牌，修改及增加自己的职务、联系电话)</h4>
            <img src="../../../static/images/banner/banner2/brandInfo.png" class="brandInfo">
            <img src="../../../static/images/banner/banner2/horizontalLine.png" class="horizontalLine">
            <h4>（在线对自己的品牌信息进行管理及更新，修改品牌联系人的职务、联系电话）</h4>
            <img src="../../../static/images/banner/banner2/beandCorrect.png" class="beandCorrect"> 
        </div>

        <div class="top3Box">
            <h2>推广品牌—优铺及全网多渠道推广，只为给你最精准的资源</h2>
            <div class="top3BoxLeft">
                <i class="i1"><img src="../../../static/images/banner/banner2/dot.png"></i>
                <b><img src="../../../static/images/banner/banner2/verticalBar.png" class="dot1"></b>
                <i class="i2"><img src="../../../static/images/banner/banner2/dot.png"></i>
                <b><img src="../../../static/images/banner/banner2/verticalBar.png" class="dot2"></b>
                <i class="i3"><img src="../../../static/images/banner/banner2/dot.png"></i>
            </div>
            <div class="top3BoxRight">
                <ul>
                    <li>置顶-品牌“名列前茅”，“置顶”标识更醒目，更多用户关注</li>
                    <li>首页轮播图、资讯频道推送，浏览量10倍提升，更多曝光机会</li>
                    <li>消息推送：定时推送品牌信息，提供高效的精准推广</li>
                </ul>
            </div>
            <img src="../../../static/images/banner/banner2/brandPopularize.png" class="brandPopularize">
        </div>
    </div>
    <div class="top4">
        <img src="../../../static/images/banner/banner1/mpbCode.png" class="mpbCode">
        <p>扫描二维码下载APP</p>
    </div>
</div>

</template>

<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "banner2",
    data () {
        return {

        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){
            this.$router.push({path: '/home'});
        },
    },
    mounted() {

    },
    created() {
        
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.banner2{
    width: 7.5rem;
    background: #6412fe;
    margin: 0 auto;
}
.top1{
    width: 7.5rem;
    background: url("../../../static/images/banner/banner2/top1.png") no-repeat;
    background-size: 7.5rem 15rem;
    padding-top: .01rem;
}
.top1Box{
    width: 6.9rem;
    height: 19rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 10px 0px rgba(73,99,245,1);
    border-radius:10px;
    margin-top: 5.08rem;
    margin-left: .3rem;
    padding-top: .6rem;
    h2{
        color: #333;
        font-size: .34rem;
        text-align: center;
        margin-bottom: .3rem;
    }
    h3{
        color: #aaa;
        font-size: .28rem;
        width: 6.2rem;
        margin-left: .3rem;
        line-height: .38rem;
        text-align: justify;
    }
    .top1BoxLeft{
        width: .6rem;
        height: 3.5rem;
        float: left;
        margin: 0 auto;
        position: relative;
        b{
            width: .01rem;
            background:rgba(73,99,245,1);
            border-radius:50%;
            position: absolute;
            top: 0rem;
            img{
                width: .01rem;
                height: 1.4rem;
            }
        }
        i{
            width: .14rem;
            height: .14rem;
            img{
                width: .14rem;
                height: .14rem;
            }
        }
        .dot1{
            height: 1.5rem;
            position: absolute;
            top: .14rem;
            left: .26rem;
        }
        .dot2{
            width: .01rem;
            height: 1.6rem;
            position: absolute;
            top: 1.6rem;
            left: .26rem;
        }
        .i1{
            position: absolute;
            left: .2rem;
            top: 0;
        }
        .i2{
            position: absolute;
            left: .2rem;
            top: 1.5rem;
        }
        .i3{
            position: absolute;
            left: .2rem;
            top: 3rem;
        }
    }
    .top1BoxRight{
        width: 6.3rem;
        float: left;
        dl{
            height: 1.5rem;
            width: 6rem;
            dt{
                color: #4963F5;
                font-size: .28rem;
                margin-bottom: .1rem;
            }
            dd{
                color: #666666;
                font-size: .28rem;
                line-height: .4rem;
            }
        }
    }
    .publish{
        width: 6.5rem;
        margin-left: .2rem;
    }
    .horizontalLine{
        width: 6.2rem;
        height: .016rem;
        margin-left: .3rem;
    }
    .publishBrand{
        width: 6.5rem;
        margin-left: .2rem;
    }
}
.top2Box{
    width: 6.9rem;
    height: 11.2rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 10px 0px rgba(73,99,245,1);
    border-radius:10px;
    margin-top: .3rem;
    margin-left: .3rem;
    padding-top: .6rem;
    h2{
        color: #333;
        font-size: .34rem;
        text-align: center;
        margin-bottom: .4rem;
    }
    h3{
        width: 6.4rem;
        font-size: .28rem;
        line-height: .38rem;
        color: #666;
        margin-left: .3rem;
        text-align: center;
    }
    h4{
        width: 6.4rem;
        font-size: .28rem;
        line-height: .38rem;
        color: #aaa;
        margin-left: .3rem;
        margin-top: .3rem;
    }
    .brandInfo{
        width: 6.5rem;
        height: 3.4rem;
        margin-left: .2rem;
        margin-top: .1rem;
    }
    .horizontalLine{
        width: 6.2rem;
        height: .016rem;
        margin-left: .3rem;
    }
    .beandCorrect{
        width: 6.5rem;
        height: 3.4rem;
        margin-left: .2rem;
    }
}
.top3Box{
    width: 6.9rem;
    height: 14rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 10px 0px rgba(73,99,245,1);
    border-radius:10px;
    margin-top: .3rem;
    margin-left: .3rem;
    padding-top: .6rem;
    h2{
        width: 4.86rem;
        color: #333;
        font-size: .34rem;
        text-align: center;
        margin-bottom: .32rem;
        margin-left: 1rem;
        line-height: .42rem;
    }
    h3{
        width: 6.4rem;
        font-size: .28rem;
        line-height: .38rem;
        color: #aaa;
        margin-left: .3rem;
        margin-top: .5rem;
        text-align: justify;
    }
    .top3BoxLeft{
        width: .6rem;
        height: 3rem;
        float: left;
        margin: 0 auto;
        position: relative;
        b{
            width: .01rem;
            background:rgba(73,99,245,1);
            border-radius:50%;
            position: absolute;
            top: 0rem;
            img{
                width: .01rem;
                height: 1rem;
            }
        }
        i{
            width: .14rem;
            height: .14rem;
            img{
                width: .14rem;
                height: .14rem;
            }
        }
        .dot1{
            height: 1.2rem;
            position: absolute;
            top: .14rem;
            left: .26rem;
        }
        .dot2{
            width: .01rem;
            height: 1.2rem;
            position: absolute;
            top: 1.2rem;
            left: .26rem;
        }
        .i1{
            position: absolute;
            left: .2rem;
            top: 0;
        }
        .i2{
            position: absolute;
            left: .2rem;
            top: 1.1rem;
        }
        .i3{
            position: absolute;
            left: .2rem;
            top: 2.2rem;
        }
    }
    .top3BoxRight{
        width: 6.3rem;
        float: left;
        ul{
            li{
                height: 1.1rem;
                width: 6rem;
                font-size: .28rem;
                line-height: .4rem;
                color: #666666;
            }
        }
    }
    .brandPopularize{
        width: 6.5rem;
        height: 9rem;
        margin-left: .2rem;
    }
}
.top4{
    width: 7.5rem;
    height: 3.6rem;
    text-align: center;
    .mpbCode{
        width: 1.55rem;
        height: 1.55rem;
        margin: .52rem auto .2rem;
    }
    p{
        color: #d4d0f4;
        font-size: .3rem;
    }
}
</style>
