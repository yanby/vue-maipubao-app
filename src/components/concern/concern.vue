<template>
    <div class="concern">
        <div class="concernNav">
            <div class="nav clearfix">
                <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
                <h2 class="navTitle fl">我的关注</h2>
                <p class="edit" v-if="tab===0" @click="sellEdit()">编辑</p>
                <p class="edit" v-if="tab===1" @click="commercialEdit">编辑</p>
                <ul class="concernUl clearfix">
                    <li :class="{'on':tab===0}" @click="sellProjectBtn">
                        销售项目
                        <i></i>
                    </li>
                    <li :class="{'on':tab===1}" @click="commercialProjectBtn">
                        招商项目
                        <i></i>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 销售项目 -->
        <div class="sellProject" v-if="tab===0">
            <!-- 销售项目为空的状态 -->
            <div class="sellNull" v-if="this.sellArr == 0">
                <img src="../../../static/images/mine/concernNull.png">
                <h6>暂无数据</h6>
            </div>
            <div class="concernWrap" v-else>
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
                    <div class="concernBox" v-for="(item,index) in sellArr" @click="goSellDetail(item.projectId,item.houseType)">
                        <i v-if="sellEditShow">
                            <b class="detail-btn" @click.stop="sellCancel($event,item.projectId)"></b>
                        </i>
                        <dl>
                            <dt>
                                <img :src="item.pictures" alt="" :onerror="defaultImg">
                            </dt>
                            <dd>
                                <h2>{{item.project_name}}</h2>
                                <h5 class="clearfix">
                                    <span class="span1">{{item.address}}</span>
                                    <span class="span2"><img src="../../../static/images/mine/eye.png">{{item.favorite_count}}</span>
                                </h5>
                                <h3>建筑面积：<span>{{item.acreage}}㎡</span></h3>
                                <h4>销售均价：<span>{{item.price}}元/天/㎡</span></h4>
                                <div class="concernLabel">
                                    <p v-for="item1 in item.tag">
                                        <span>{{item1}}</span>
                                    </p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="noInner" v-if="more">暂无更多内容！</div>
                </mt-loadmore>

                <ul class="sellDuelete" v-if="sellEditShow">
                    <li class="li1" @click="sellCancelBtn">取消</li>
                    <li class="li2" @click="sellDeleteBtn()">删除</li>
                </ul>
            </div>
        </div>

        <!-- 招商项目 -->
        <div class="commercialProject" v-if="tab===1">
           <!-- 招商项目为空的状态 -->
            <div class="commercialNull sellNull" v-if="this.commercialArr == 0">
                <img src="../../../static/images/mine/concernNull.png">
                <h6>暂无数据</h6>
            </div>

            <div class="concernWrap" v-else>
                <mt-loadmore :top-method="loadTop2" :bottom-method="loadBottom2" @bottom-status-change="handleBottomChange2"
                     ref="loadmore2" :bottom-all-loaded="allLoaded2" :auto-fill="false">
                    <div class="concernBox" v-for="item in commercialArr"  @click="goMerchantsDetail(item.projectId,item.houseType)">
                        <i v-if="commercialEditShow">
                            <!-- <img src="../../../static/images/mine/square.png"> -->
                            <b class="detail-btn" @click.stop="commercialCancel($event,item.projectId)"></b>
                        </i>
                        <dl>
                            <dt>
                               <!--  <img :src="item.pictures"> -->
                                <img :src="item.pictures" alt="" :onerror="defaultImg">
                            </dt>
                            <dd>
                                <h2>{{item.project_name}}</h2>
                                <h5 class="clearfix">
                                    <span class="span1">{{item.address}}</span>
                                    <span class="span2"><img src="../../../static/images/mine/eye.png">{{item.favorite_count}}</span>
                                </h5>
                                <h3>建筑面积：<span>{{item.acreage}}㎡</span></h3>
                                <h4>招商均价：<span>{{item.price}}元/天/㎡</span></h4>
                                <div class="concernLabel">
                                    <p v-for="item1 in item.tag">
                                        <span>{{item1}}</span>
                                    </p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="noInner" v-if="more2">暂无更多内容！</div>
                </mt-loadmore>
                <ul class="sellDuelete" v-if="commercialEditShow">
                    <li class="li1" @click="commercialCancelBtn()">取消</li>
                    <li class="li2" @click="commerDeleteBtn()">删除</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "concern",
    data () {
        return {
            tab: 0, // 导航切换
            sellEditShow: false, // 销售项目点击编辑
            commercialEditShow: false,  // 招商项目点击编辑
            // 销售
            sellArr: [],
            cancelarr:[],
            strProjectId:"",
            // 招商
            commercialArr:[],
            commerCancelarr:[],
            commerStrProjectId:"",

            defaultImg: 'this.src="' + require('../../../static/images/Merchants/err.png') + '"', //默认图片0

            pageSize: 10, // 每次请求的数量
            brandIndex: 1, // 页码
            more: false,  //有没有更多数据
            allLoaded: false,

            brandIndex2: 1,
            more2: false,  //有没有更多数据
            allLoaded2: false,
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){
            this.$router.push({path: '/mine'});
        },
        // 点击销售项目
        sellProjectBtn(type){
            this.dataList(1);
            this.tab = 0;
        },
        // 点击招商项目
        commercialProjectBtn(type){
            this.dataList(2);
            this.tab = 1;
        },
        // 销售项目编辑按钮
        sellEdit(){
            this.sellEditShow = true;
        },
        // 销售项目取消按钮
        sellCancelBtn(){
            this.cancelarr = [];
            this.strProjectId = "";
            this.sellEditShow = false;
        },

        // 销售删除
        sellDeleteBtn(){
            let _this = this;
            // console.log(this.strProjectId);
            let url = this.changeData() + '/member/auth/cancelFavorites'
            axios(url,{
                method: 'post',
                params:{
                    projectId: this.strProjectId,
                }
            }).then(data => {
                // console.log(data);
                _this.dataList(1);
                _this.sellEditShow = false;
                // console.log(this.sellArr);
            }).catch(err => {
                console.log(err)
            });
        },

        // 点击销售选择
        sellCancel(e,id){
            if (e.target.className.indexOf("detail-selected") == -1) {
                e.target.className = "detail-btn detail-selected"; //切换按钮样式
                this.cancelarr.push(id);
                this.strProjectId = this.cancelarr.join(",");
                // console.log(this.strProjectId);
            } else {
                e.target.className = "detail-btn";//切换按钮样式
                //写逻辑
                var array = this.cancelarr;
                var index = array.indexOf(id);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.cancelarr = array;
                this.strProjectId = this.cancelarr.join(",");
                // console.log(this.strProjectId);
            }
        },

        // 招商项目编辑按钮
        commercialEdit(){
            this.commercialEditShow = true;
        },
        // 招商取消
        commercialCancelBtn(){
            this.commerCancelarr = [];
            this.commerStrProjectId = "";
            this.commercialEditShow = false;
        },
        // 招商确定删除
        commerDeleteBtn(){
            let _this = this;
            // console.log(this.strProjectId);
            let url = this.changeData() + '/member/auth/cancelFavorites'
            axios(url,{
                method: 'post',
                params:{
                    projectId: this.commerStrProjectId,
                }
            }).then(data => {
                // console.log(data);
                _this.dataList(2);
                _this.commercialEditShow = false;
                // console.log(this.commercialArr);
            }).catch(err => {
                console.log(err)
            });
        },
        // 点击招商选择
        commercialCancel(e,id){
            if (e.target.className.indexOf("detail-selected") == -1) {
                e.target.className = "detail-btn detail-selected"; //切换按钮样式
                this.commerCancelarr.push(id);
                this.commerStrProjectId = this.commerCancelarr.join(",");
                // console.log(this.commerStrProjectId);
            } else {
                e.target.className = "detail-btn";//切换按钮样式
                //写逻辑
                var array = this.commerCancelarr;
                var index = array.indexOf(id);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.commerCancelarr = array;
                this.commerStrProjectId = this.commerCancelarr.join(",");
                // console.log(this.commerStrProjectId);
            }
        },

        // 跳转销售详情
        goSellDetail(id,houseType){
            this.$router.push({path: '/sellDetail',query:{projectId: id,url: "concern",type:"1",houseType:houseType}});
        },
        // 跳转招商详情
        goMerchantsDetail(id,houseType){
            this.$router.push({path: '/merchantsDetail',query:{projectId: id,url: "concern",type:"2",houseType:houseType}});
        },

        // 接口调用
        dataList(type){
            // alert(type);
            let url = this.changeData() + '/member/auth/favoriteList'
            axios(url,{
                method: 'post',
                params:{
                    pageSize: this.pageSize,// 每页数据量【必传】
                    pageNum: 1, //页码从1开始【必传】
                    projectType: type //项目类型，1是销售，2是招商【必传】
                }
            }).then(data => {
                // console.log(data);
                this.sellArr = data.data.favoriteList;
                this.commercialArr = data.data.favoriteList;
            }).catch(err => {
                console.log(err)
            });
        },

        // 销售加载及上拉刷新
        loadTop(){ //下拉刷新
            var _this = this;
            let url = this.changeData() + '/member/auth/favoriteList'
            var data = {
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: 1,     // 页码从1开始【必传】
                projectType: 1
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    this.sellArr = data.data.favoriteList;
                    _this.$refs.loadmore.onTopLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },

        loadBottom() { //上拉加载
            let _this = this;
            this.brandIndex++;
            this.allLoaded = false;
            let url = this.changeData() + '/member/auth/favoriteList'
            var data = {
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex,     // 页码从1开始【必传】
                projectType: 1,
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.sellArr = _this.sellArr.concat(data.data.favoriteList);
                    if(data.data.favoriteList <= 0){
                      _this.allLoaded = true;
                    }
                    _this.$refs.loadmore.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },
        handleBottomChange(){
            var _this = this;
            if(this.allLoaded == true){
                _this.more = true;
                setTimeout(function () {
                    _this.more = false;
                },2000)
            }
        },

        // 招商加载及上拉刷新
        loadTop2(){ //下拉刷新
            var _this = this;
            let url = this.changeData() + '/member/auth/favoriteList'
            var data = {
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: 1,     // 页码从1开始【必传】
                projectType: 2
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    this.commercialArr = data.data.favoriteList;
                    _this.$refs.loadmore2.onTopLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },

        loadBottom2() { //上拉加载
        // alert("2");
            let _this = this;
            this.brandIndex2++;
            this.allLoaded = false;
            let url = this.changeData() + '/member/auth/favoriteList'
            var data = {
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex2,     // 页码从1开始【必传】
                projectType: 2,
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.commercialArr = _this.commercialArr.concat(data.data.favoriteList);
                    if(data.data.favoriteList <= 0){
                      _this.allLoaded2 = true;
                    }
                    _this.$refs.loadmore2.onBottomLoaded();
                }).catch(err => {
                    console.log(err)
                });
            },1000)
        },
        handleBottomChange2(){
            var _this = this;
            if(this.allLoaded2 == true){
                _this.more2 = true;
                setTimeout(function () {
                    _this.more2 = false;
                },2000)
            }
        },
    },
    mounted() {

    },
    created() {
        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (urlInfo.indexOf("?") != -1) {
                var str = urlInfo.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //通过url取数
        var request = new Object();
        request = GetRequest();
        var typeIndex = request['type'];
        if(typeIndex){
            if(typeIndex == "1"){
                this.tab = 0;
                this.dataList(1);
            }else if(typeIndex == "2"){
                this.tab = 1;
                this.dataList(2);
            }
        }else{
            this.dataList(1);
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
.concern{
    width: 7.5rem;
    padding-top: 1.74rem;
    background: #fff;
    height: 100vh;
    margin: 0 auto;
}
.concernNav{
    width: 7.5rem;
    height: 1.74rem;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    z-index: 1000000;
    position: fixed;
    top: 0;
    .nav{
        width: 7.5rem;
        height: .9rem;
        background: #fff;
    }
    .navBack{
        width: 0.36rem;
        height: 0.36rem;
        margin-top: .3rem;
        margin-left: .3rem;
    }
    .navTitle{
        width: 6.4rem;
        line-height: .9rem;
        font-size: 0.36rem;
        color: #3c3c3c;
        text-align: center;
    }
    .concernUl{
        height: .84rem;
        li{
            float: left;
            line-height: .84rem;
            width: 50%;
            color: red;
            z-index: 99999999;
            text-align: center;
            color: #111111;
            font-size: .3rem;
            position: relative;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            i{
                width: .58rem;
                height: .04rem;
                background: #64abff;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -.29rem;
                display: none;
            }
            &.on{
                color: #64abff;
                i{
                    display: block;
                }
            }
        }
    }
    .edit{
        font-size: .28rem;
        color: #111111;
        position: absolute;
        right: .3rem;
        top: .28rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
}

.concernWrap{
    width: 7.5rem;
    overflow: hidden;
    background: #fff;
    padding-bottom: .9rem;
    .concernBox{
        width: 8rem;
        margin-left: .2rem;
        i{
            float: left;
            display: inline-block;
            line-height: 2.04rem;
            margin-right: .3rem;
            margin-top: .4rem;
            .detail-btn{
                width: .4rem;
                height: .4rem;
                display: inline-block;
                background: url("../../../static/images/mine/square.png");
                background-repeat: no-repeat;
                background-size: .4rem .4rem;
            }
            .detail-selected{
                background: url("../../../static/images/mine/square2.png");
                background-repeat: no-repeat;
                background-size: .4rem .4rem;
            }
        }
        dl{
            width: 7.1rem;
            padding: .4rem 0;
            border-bottom: 1px solid #eaeaea;
            display: inline-block;
            dt{
                float: left;
                img{
                    width: 2.56rem;
                    height: 2.04rem;
                }
            }
            dd{
                width: 4.04rem;
                float: left;
                margin-left: .3rem;
                h2{
                    color: #333333;
                    font-size: .34rem;
                    overflow: hidden;white-space:
                    nowrap;text-overflow: ellipsis;
                }
                h5{
                    color: #898989;
                    font-size: .28rem;
                    margin-top: .06rem;
                    margin-bottom: .06rem;
                    .span1{
                        width: 2.6rem;
                        overflow: hidden;white-space:
                        nowrap;text-overflow: ellipsis;
                        float: left;
                    }
                    .span2{
                        float: right;
                        img{
                            width: .3rem;
                            height: .2rem;
                            margin-right: .1rem;
                            position: relative;
                            top: -.01rem;
                        }
                    }
                }
                h3{
                    color: #898989;
                    font-size: .28rem;
                }
                h4{
                    color: #333333;
                    font-size: .28rem;
                    margin-top: .04rem;
                    margin-bottom: .08rem;
                    span{
                        color: #fa513c;
                        font-size: .34rem;
                    }
                }
                .concernLabel{
                    width: 4.04rem;
                    height: .38rem;
                    overflow: hidden;
                    p{
                        width: 100%;
                        height: .38rem;
                        display: box;
                        display: -webkit-box;
                        overflow-x: scroll;
                        -webkit-overflow-scrolling: touch;
                        padding-bottom: .2rem;
                        span{
                            line-height: .38rem;
                            font-size: .22rem;
                            text-align: center;
                            padding-left: .12rem;
                            padding-right: .12rem;
                            margin-right: .1rem;
                            background: #e5f1ff;
                            display: block;
                            color: #64ABFF;
                        }
                    }
                }
            }
        }
    }
    .sellDuelete{
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        li{
            width: 50%;
            float: left;
            line-height: 1rem;
            font-size: .34rem;
            color: #898989;
            text-align: center;
        }
        .li1{
            background: #e9e9e9;
        }
        .li2{
            background: #fa513c;
            color: #fff;
        }
    }
}
.sellNull{
    width: 7.5rem;
    text-align: center;
    margin-top: 3rem;
    img{
        width: 1.68rem;
        height: 1.68rem;
    }
    h6{
        color: #333333;
        font-size: .3rem;
        margin-top: .3rem;
    }
}
.noInner{
    text-align: center;
    line-height: 1rem;
}
</style>
