<template>
    <div class="news">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">资讯频道</h2>
        </div>
        <div class="newsList">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
                <dl class="clearfix" @click="goNewsDetails(item.id)" v-for="(item,index) in newsListArr">
                    <dt>
                        <img :src="item.img_path">
                        <!-- <img src="http://up-img.oss-cn-beijing.aliyuncs.com/article/20180925/ADzwwOzahexPijGtRQ4U6u9AQvAz5iNh.png"> -->
                    </dt>
                    <dd>
                        <h3>{{item.title}}</h3>
                        <ul>
                            <li>
                                <i><img src="../../../static/images/mine/eye.png"></i>
                                <span>{{item.reading_quantity}}</span>
                            </li>
                            <p>{{item.publish_date}}</p>
                        </ul>
                    </dd>
                </dl>
                <div class="noInner" v-if="more">暂无更多内容！</div>
            </mt-loadmore>
        </div>             
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
import { Loadmore } from 'mint-ui';
export default {
name: "news",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "110000", // 全局省Id
            newsListArr: [],
            newsListIndex: 2, 
            pageSize: 10, // 每次请求的数量
            brandIndex: 0, // 页码    
            more: false,  //有没有更多数据
            allLoaded: false,       
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/home'});            
        }, 
        goNewsDetails(id){
            this.$router.push({path: '/newsDetails',query:{id: id,url:"news"}});
        },

        newsListData(){
            let url = this.changeData() + '/information/list'
            axios(url,{
                method: 'post',
                params: {
                    cityId: this.sessionCityId || 110100, //所属城市【必传】
                    pageSize: this.pageSize,   // 每页数据量【必传】
                    pageNum: '1',     // 页码从1开始【必传】
                }
            }).then(data => {
                // console.log(data);
                this.newsListArr = data.data.informationList;
                this.newsListArr.forEach(function (item,index) {
                    var str = item.publish_date.substring(0, 10);
                    item.publish_date = str;
                })
            }).catch(err => {
                console.log(err)
            });
        },

        loadTop(){ //下拉刷新
            var _this = this;
            let url = this.changeData() + '/information/list'

            var data = {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: '1',     // 页码从1开始【必传】              
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    this.newsListArr = data.data.informationList;
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
            let url = this.changeData() + '/information/list' 
            var data = {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.brandIndex,     // 页码从1开始【必传】       
            }                             
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.newsListArr = _this.newsListArr.concat(data.data.informationList);
                    if(data.data.informationList <= 0){
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
    },
    mounted() {
                    
    },
    created(){ 
        this.sessionCityId = sessionStorage.cityId;
        // console.log(this.sessionCityId);
        this.sessionProvinceId = sessionStorage.provinceId;
        // console.log(this.sessionProvinceId);
        this.newsListData();
    }
}
</script>
<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.news{
    width: 7.5rem;
    padding-top: .9rem;
    background: #fff;
    height:100vh;
    margin: 0 auto;
}
.newsList{
    width: 6.9rem;
    padding: 0rem .3rem;
    background: #fff;
    dl{
        width: 6.9rem;
        padding: .3rem 0;
        border-top: 1px solid #eaeaea;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        dt{
            float: left;
            img{
                width: 2.2rem;
                height: 1.66rem;
            }      
        }
        dd{
            width: 4.18rem;
            float: left;
            margin-left: .3rem;
            position: relative;
            height: 1.66rem;
            h3{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: #333;
                font-size: .3rem;
            }
            ul{
                width: 4.18rem;
                position: absolute;
                bottom: 0;
                color: #898989;
                font-size: .26rem;
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
    }
    dl:first-child{
        border-top: none;
    }
}
.noInner{
    text-align: center;
    line-height: 1rem;
}
</style>