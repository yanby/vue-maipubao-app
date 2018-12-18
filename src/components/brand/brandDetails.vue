<template>
    <div class="brandDetails">
        <!-- 小轮播 -->
        <div class="brandDetailsLbt" @click="tab1()">        
            <i @click="navBack()"><img src="../../../static/images/brand/tab2.png"></i>
            <div class="swiper-container swiper-container1 swiper-container-horizontal">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in lbtArr">
                        <img :src="item" alt="">
                    </div>
                    <!-- <div class="swiper-slide">
                        <img :src="item" alt="">
                        <img src="../../../static/images/brand/brand2.png">
                    </div> -->
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- 大轮播 -->
        <div class="bannerBig">
            <div class="swiper-top"><span @click="tab2()"></span>海贝贝</div>
            <div class="swiper-bottom">{{num}}/{{total}}</div>
            <div class="swiper-container swiper-container2 swiper-container-horizontal">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in lbtArr">
                        <img :src="item" alt="">
                    </div>
                    <!-- <div class="swiper-slide">
                        <img src="../../../static/images/brand/brand2.png">
                    </div> -->
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>

        <div class="brandInfo">
            <dl class="clearfix">
                <dt><img src="../../../static/images/brand/brandInfo.png"></dt>
                <dd>品牌信息</dd>
            </dl>
            <ul>
                <li>品牌名称:<span>{{brandDetailsObj.brand_name}}</span></li>
                <li>品牌业态:<span>{{brandDetailsObj.brand_business}}</span></li>
                <li>品牌定位:<span>{{brandDetailsObj.brand_positioning}}</span></li>
            </ul>
            <h3>品牌信息</h3>
            <p>{{brandDetailsObj.description}}</p>
        </div>

        <div class="brandAttn">
            <div class="brandAttnTop clearfix">
                <i><img src="../../../static/images/brand/brandAttn.png"></i>
                <h3>品牌联系人信息</h3>
            </div> 
            <div class="brandAttnBox clearfix" v-for="(item,index) in brandDetailsArr">
                <dl class="clearfix">
                    <dt class="clearfix">
                        <h5>{{item.user_name}}</h5>
                        <h6>{{item.post}}</h6>
                    </dt>
                    <dd>{{item.expand_area}}</dd>
                </dl>
                <ul class="clearfix">
                   <li @click="telephone(item.id)" class="li1" v-if="item.isError == 0">去联系</li>
                   <li class="li1 li11" v-if="item.isError == 1">去联系</li>
                   <li v-if="item.isError == 0" @click="goBrandCorrect(item.id)" class="li2">纠错</li>
                </ul>
            </div>
        </div>

        <div class="brandBtn">
            <span @click="goAddBrandUser">我也要成为该品牌的联系人</span>
        </div>
        <!-- 弹窗提示 -->
        <div class="promptWrap" v-if="showPromptWrap">
            <div class="promptBox">
                <h3>温馨提示</h3>
                <p>今日查看次数已达上限，请开通会员查看更多次数或者是明天再来</p>
                <ul>
                    <li class="li1" @click="showPromptWrap=false">明天再来</li>
                    <li class="li2" @click="goBuyMember()">立即开通</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
name: "brandDetails",
    data () {
        return {
            lbtArr: [],
            total: "",
            num: "1",
            sliderIndex: "",  
            urlId: "",    
            brandDetailsArr: [], 
            brandDetailsObj: {},
            showPromptWrap: false, // 提示弹窗     
        }
    },
    updated(){
        var _this = this;
        var swiper1 = new Swiper('.swiper-container1', {
            pagination: {
                el: '.swiper-pagination',
            },
            on: {
                slideChangeTransitionEnd: function(){
                    _this.sliderIndex = this.activeIndex;
                   $(".swiperOne").text(1+this.activeIndex + "/" + _this.total);
                }
            }
        });
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/brandManagement'});          
        },
        // 接口调用
        brandDetailsData(){
            let _this = this
            let url = this.changeData() + '/brand/detail'
            axios(url,{
                method: 'post',
                // data: obj
                params: {
                    id: _this.urlId,
                }
            }).then(data => {
                // console.log(data);
                this.brandDetailsObj = data.data.detail;
                this.brandDetailsArr = data.data.brandContacts;
                this.lbtArr = data.data.brandPic;
                this.total = data.data.brandPic.length;
            }).catch(err => {
                console.log(err)
            });
        },
        
        // 小轮播图
        tab1(){
            $(".bannerBig").show();
            var that = this;
            var swiper2 = new Swiper('.swiper-container2', {
                initialSlide : that.sliderIndex,
                on: {
                    slideChangeTransitionEnd: function(){
                        that.sliderIndex = this.activeIndex;
                        $(".swiper-bottom").text(1+this.activeIndex + "/" + that.total);
                    }
                }
            });
        },

        // 大轮播图
        tab2(){
            $(".bannerBig").hide();
        },
        // 纠错
        goBrandCorrect(id){
            // console.log(this.urlId);
            // console.log(id);
            if(!localStorage.token){
                this.$router.push({path: '/login'});
            }else{
                this.$router.push({path: '/brandCorrect',query:{id:id, brandId:this.urlId}}); 
            }     
        },
        // 成为该品牌联系人
        goAddBrandUser(){
            if(!localStorage.token){
                this.$router.push({path: '/login'});
            }else{
                this.$router.push({path: '/addBrandUser',query:{id: this.urlId, brandName:this.brandDetailsObj.brand_name}}); 
            }  
        },
        // 去购买会员
        goBuyMember(){
            this.$router.push({path: '/buyMember',query:{id: this.urlId, url:"brandDetails"}}); 
        },

        // 点击拨打电话
        telephone(id) {
            let _this = this;
            // alert(id);
            if(!localStorage.token){
                this.$router.push({path: '/login'});
            }else{
                let url = this.changeData() + '/brand/auth/getBrandContact'
                axios(url,{
                    method: 'post',
                    params: {
                        brandContactId: id//品牌联系人ID
                    }
                }).then(data => {
                    // console.log(data);

                    if(data.data.flag == "1"){
                       window.location.href="tel:" + data.data.mobile;
                    }
                    if(data.data.flag == "0"){
                        _this.showPromptWrap = true;
                    }
                    // if(data.data.code == 102){
                    //     _this.showPromptWrap = true;
                    // }
                }).catch(err => {
                    console.log(err)
                });
            }                
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

        this.urlId = request['id']; 
        // console.log(this.urlId);

        this.brandDetailsData();    
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
.brandDetails{
    width: 7.5rem;
    margin: 0 auto;
}
.brandDetailsLbt{
    width: 7.5rem;
    position: relative;
    i{
        position: absolute;
        left: .3rem;
        top: .3rem;
        z-index: 1000000;
 
        img{
            width: .58rem;
            height: .58rem;
        }


    }
    .swiper-container {
        width: 100%;
        height: 5.62rem;
    }
    .swiper-slide {
        width: 7.5rem!important;
        height: 5.62rem;
        img{
            width: 7.5rem;
            height: 5.62rem;
        }
    }
}
.bannerBig{
    display: none;
    width: 7.5rem;
    height: 100% ;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    background: #010101;
    z-index: 10000000;
    .swiper-top{
        width: 7.5rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        color: #fff;
        font-weight: bold;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        background: #141414;
        span{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            position: absolute;
            left: .2rem;
            top: .3rem;
            width: .36rem;
            height: .36rem;
            background: url("../../../static/images/brand/tab1.png") no-repeat;
            background-size: .36rem .36rem;
        }
    }
    .swiper-bottom{
        width: 7.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .34rem;
        font-weight: bold;
        text-align: center;
        color: #fff;
        z-index: 1000;
    }
    .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
            width: 100%;
            height: 100%;
            position: relative;
            img {
                width: 100%;
                height: 5.56rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -3.75rem;
                margin-top: -2.78rem;
                text-align: center;
            }
        }
    }
}
.brandInfo{
    width: 6.9rem;
    padding: 0 .3rem;
    background: #fff;
    dl{
        width: 6.9rem;
        height: 1rem;
        border-bottom: 1px solid #eaeaea;
        line-height: 1rem;
        dt{
            float: left;
            img{
                width: .4rem;
                height: .4rem;
            }
        }
        dd{
            float: left;
            color: #333;
            font-size: .32rem;
            position: relative;
            top: .04rem;
            left: .1rem;
        }
    }
    ul{
        li{
            color: #898989;
            font-size: .3rem;
            margin-top: .3rem;
            span{
                color: #333;
                font-size: .3rem;
                margin-left: .1rem;
            }
        }
    }
    h3{
        color: #333333;
        font-size: .32rem;
        margin: .3rem 0;
    }
    p{
        color: #333;
        font-size: .28rem;
        text-align: justify;
        line-height: .4rem;
        padding-bottom: .5rem;
    }
}

.brandAttn{
    width: 6.9rem;
    padding: 0 .3rem;
    margin-top: .2rem;
    background: #fff;
    z-index: 99999998;
    .brandAttnTop{
        width: 6.9rem;
        height: 1rem;
        line-height: 1rem;
        i{
            float: left;
            img{
                width: .4rem;
                height: .4rem;                
            }
        }        
        h3{
            float: left;
            color: #333;
            font-size: .32rem;
            position: relative;
            top: .04rem;
            left: .1rem;
        }
    }
    .brandAttnBox{
        width: 6.9rem;
        border-top: 1px solid #eaeaea;
        padding: .3rem 0;
        dl{
            width: 4rem;
            height: .86rem;
            float: left;
            dt{
                width: 4rem;
                h5{
                    width: 1.6rem;
                    display: inline-block;
                    color: #333;
                    font-size: .3rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                h6{
                    width: 2.2rem;
                    display: inline-block;
                    color: #898989;
                    font-size: .3rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            dd{
                color: #333;
                font-size: .3rem;
                margin-top: .1rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        ul{
            width: 2.9rem;
            /*background: red;*/
            float: left;
            padding-top: .01rem;
            li{
                float: left;
                width: 1.2rem;
                line-height: .58rem;
                border: 1px solid #64abff;
                text-align: center;
                font-size: .28rem;
                border-radius: 6px;
                box-sizing: border-box;
                margin-top: .08rem;
                color: #64abff;               
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            .li1{
                margin-right: .5rem;               
            }
            .li11{
                border: 1px solid #ccc;
                color: #ccc;
            }
            .li2{
                color: #ff5140;
                border: 1px solid #ff5140;              
            }
        }
    }
}
.brandBtn{
    margin: .8rem .3rem 0 .3rem;
    padding-bottom: .5rem;
    span{
        display: inline-block;
        width: 6.9rem;
        background: #64abff;
        color: #fff;
        font-size: .34rem;
        border-radius: 6px;
        text-align: center;
        line-height: .34rem;
        line-height: .9rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
}

/* 弹窗处理 */
.promptWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999999999999;
    position: fixed;
    top: 0;
    .promptBox{
        width: 6.6rem;
        height: 3rem;
        background: #fff;
        position: fixed;
        top: 4rem;
        left: .45rem;
        border-radius: 10px;
        padding-top: .6rem;
        h3{
            color: #333;
            font-size: .36rem;
            text-align: center;
        }
        p{
            width: 6rem;
            color: #333;
            font-size: .32rem;
            text-align: center;
            margin: .3rem auto 0;
            line-height: .46rem;
        }
        ul{
            position: absolute;
            bottom: -.02rem;
            li{
                width: 3.3rem;
                font-size: .34rem;
                line-height: .88rem;
                float: left;
                color: #898989;
                text-align: center;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            .li1{
                border-top: 1px solid #eaeaea;
                
            }
            .li2{
                background: #64abff;
                color: #fff;
                border-radius: 0 0 10px 0;
            }
        }
    }
    
}
</style>

