<template>
<div class="home" ref="box">
    <!-- APP下载页 -->
    <div class="appDownload">
        <dl>
            <dt><img src="../../../static/images/home/appDownload.png"></dt>
            <dd>
                <h3>卖铺宝</h3>
                <h4>商铺销售、品牌招商O2O平台</h4>
            </dd>
            <p><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youpu">立即下载</a></p>
        </dl>
    </div>
    <!-- 导航 -->
    <div class="grayNab" ref="searchStyle" v-if="searchBar">
        <dl class="grayNab_left">
            <!-- <router-link to="/citySelection"> -->
            <h5 @click="goCitySelection()">{{cityNameData}}<span></span></h5>
            <!-- </router-link> -->
            <dt @click="goSearch()">
                <img src="../../../static/images/home/search.png">
            </dt>
            <dd @click="goSearch()">请输入关键字</dd>
        </dl>
    </div>
    <!-- 轮播图 -->
    <div class="homeTop">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in picArr" style="width: 100%; height: 100%;">
                <div style="width: 100%; height: 100%;">
                    <img :src="item.img_path" @click="goNewInfo(item.id,item.url)">
                </div>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 透明导航 -->
        <div class="whiteNab" ref="searchStyle">
            <dl class="whiteNab_left1">
                <!-- <router-link to="/citySelection"> -->
                    <h5 @click="goCitySelection()">{{cityNameData}}<span></span></h5>
                <!-- </router-link> -->
                <dt @click="goSearch()">
                    <img src="../../../static/images/home/whiteSearch.png">
                </dt>
                <dd @click="goSearch()">请输入关键字</dd>
            </dl>
        </div>
    </div>

    <!-- tab列表 -->
    <div class="tabList clearfix">
        <dl v-for="(item,index) in tabListArr" @click="goUrl(item.info)">
            <dt><img :src="item.img"></dt>
            <dd>{{item.info}}</dd>
        </dl>
    </div>

    <!-- 优铺头条 -->
    <div class="upNews clearfix">
        <img src="../../../static/images/home/upNews.png" class="upNewsImg">
        <div class="scrollWrap clearfix">
            <div class="scrollBorder">
                <div v-for="(item,index) in prizeList">
                   <!--  <span class="span1" @click="goNews()">{{item.title}}</span>
                    <span @click="goNews()">{{item.title}}</span> -->
                    <span v-for="(item1,index1) in item" @click="goNews(item1.id)">{{item1.title}}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 优铺数据 -->
    <div class="upDataWrap">
        <div class="upData">
            <dl>
                <dt>入驻项目量</dt>
                <dd>{{numberListObj.projects}}</dd>
            </dl>
            <dl>
                <dt>入驻品牌量</dt>
                <dd>{{numberListObj.brands}}</dd>
            </dl>
            <dl>
                <dt>入驻经纪人量</dt>
                <dd>{{numberListObj.agents}}</dd>
            </dl>
            <dl>
                <dt>入驻经纪公司量</dt>
                <dd>{{numberListObj.companys}}</dd>
            </dl>
        </div>
        <ul class="clearfix">
            <router-link to="/newProduct">
                <li><img src="../../../static/images/home/li1.png"></li>
            </router-link>
            <router-link to="/makeAbargain">
                <li><img src="../../../static/images/home/li2.png"></li>
            </router-link>
        </ul>
    </div>

    <!-- 热销新盘 -->
    <div class="shopList">
        <div class="shopListTop">
            <h3>热销新盘</h3>
            <h4 @click="goSellList()">查看更多<img src="../../../static/images/common/more.png"></h4>
        </div>
        <div class="shopListBoxWrap">
            <div class="shopListBox">
                <dl v-for="(item,index) in sellListArr" @click="goSellDetail(item.projectId,item.houseType)">
                    <dt>
                        <img :src="item.pictures"  alt="" :onerror="defaultImg">
                        <span>{{item.project_name}}</span>
                    </dt>
                    <dd>
                        <h5><p>销售均价:</p><span>{{item.price}}元/㎡</span></h5>
                        <h6><img src="../../../static/images/home/shopLocation.png"><span>{{item.address}}</span></h6>
                    </dd>
                </dl>
            </div>
        </div>
    </div>

    <!-- 精选招商 -->
    <div class="shopList">
        <div class="shopListTop">
            <h3>精选招商</h3>
            <h4 @click="goMerchantsList()">查看更多<img src="../../../static/images/common/more.png"></h4>
        </div>
        <div class="shopListBoxWrap">
            <div class="shopListBox">
                <dl v-for="(item,index) in shopListArr" @click="goMerchantsDetail(item.projectId,item.houseType)">
                    <dt>
                        <img :src="item.pictures" :onerror="defaultImg">
                        <span>{{item.project_name}}</span>
                    </dt>
                    <dd>
                        <h5><p>平均租金:</p><span>{{item.price}}元/天/㎡</span></h5>
                        <h6><img src="../../../static/images/home/shopLocation.png"><span>{{item.address}}</span></h6>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <div id="allmap" style="width: 0px; height: 0px;"></div>
</div>
</template>
<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'home',
    data () {
        return {
            // 城市名称
            cityNameData: "",
            // 控制搜索栏显示隐藏
            searchBar: false,
            // 新闻数组
            prizeList:[],
            // 新闻滚动
            activeIndex: 0,
            // 轮播图数组
            picArr: [],
            //下载显示隐藏
            downing: true,

            // tab列表数据
            tabListArr: [{
                img: '../../../static/images/home/dl1.png',
                info: "销售"
            }, {
               img: '../../../static/images/home/dl2.png',
               info: "招商"
            }, {
               img: '../../../static/images/home/dl3.png',
               info: "品牌库"
            }, {
               img: '../../../static/images/home/dl4.png',
               info: "地图找房"
            }, {
               img: '../../../static/images/home/dl5.png',
               info: "需求发布"
            }, {
               img: '../../../static/images/home/dl6.png',
               info: "资讯频道",
            }, {
               img: '../../../static/images/home/dl7.png',
               info: "微信推广"
            }, {
               img: '../../../static/images/home/dl8.png',
               info: "发展团队"
            }],

            numberListObj: {}, // // 四个入驻数量
            sellListArr: [], // 销售列表
            shopListArr: [], // 招商列表

            defaultImg: 'this.src="' + require('../../../static/images/Merchants/err.png') + '"', //默认图片

            sessionCityId: "110100",  // 全局城市Id

        }
    },
    methods:{
        // 搜索栏
        handleScroll(){
            let changBG = 0;
            let scrollTop = 0;
        },
        // 导航滑动
        handleScroll() {
            window.addEventListener('scroll', this.handleScroll);
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop >= 80){
                this.searchBar = true;
            }else{
                this.searchBar = false;
            }
        },
        // 搜索页
        goSearch(){
            this.$router.push({path: '/indexSearch'});
        },
        // 首页展示
        listData() {
            let _this = this
            let url = this.changeData() + '/show/showInfo'
            axios(url,{
                method: 'post',
                params: {
                    "cityId": _this.sessionCityId,
                }
            }).then(data => {
                // console.log(data);
                var cityNameStr = data.data.data.cityName;
                this.cityNameData =  cityNameStr.split("市").join("");
                this.picArr = data.data.data.bannerList; //轮播图
                this.sellListArr = data.data.data.selectProject1;  // 销售列表
                this.shopListArr = data.data.data.selectProject2;  // 招商列表
                this.numberListObj = data.data.data.numberList; // 四个入驻数量
                var arr = data.data.data.infoList; //新闻
                var newData = [];
                for(var i = 0; i < arr.length; i++){
                    if(i % 2 != 0){
                        newData.push({
                           0:arr[i-1],
                           1:arr[i]
                        })
                    }
                }
                this.prizeList = newData;
            }).catch(err => {
                console.log(err)
            });
        },
        // 跳转新闻列表
        goNews(id){
            this.$router.push({path: '/newsDetails',query:{id: id}});
        },
        // 轮播图跳转资讯
        goNewInfo(id,url){
            // this.$router.push({path: '/messageInfo',query:{url: url}});
            window.location.href = url;
        },
        goUrl(info){
            if(info == "资讯频道"){
                this.$router.push({path: '/news'});
            }
            if(info == "品牌库"){
                this.$router.push({path: '/brandManagement'});
            }
            if(info == "地图找房"){
                this.$router.push({path: '/mapSeekShop'});
            }
            if(info == "需求发布"){
                this.$router.push({path: '/publish'});
            }
            if(info == "销售"){
                this.$router.push({path: '/sellList'});
            }
            if(info == "招商"){
                this.$router.push({path: '/merchantsList'});
            }
            if(info == "微信推广"){
                if(!localStorage.token){
                    this.$router.push({path: '/login'});
                }else{
                    this.$router.push({path: '/promotion'});
                }
            }
            if(info == "发展团队"){
                if(!localStorage.token){
                    this.$router.push({path: '/login'});
                }else{
                    let url = this.changeData() + '/team/auth/createTeam'
                    axios(url,{
                        method: 'post'
                    }).then(data => {
                        // console.log(data);
                        // groupTcp
                        if(data.data.status == "0"){
                            this.$router.push({path: '/groupTcp'});
                        }else if(data.data.status == "1"){
                            this.$router.push({path: '/develop'});
                        }else{
                            Toast(data.data.message)
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }
            }
        },
        // 跳转销售列表
        goSellList(){
            this.$router.push({path: '/sellList'});
        },
        // 跳转销售详情
        goSellDetail(id,houseType){
            this.$router.push({path: '/sellDetail',query:{projectId: id,url: "home",type:"1",houseType:houseType}});
        },
        // 跳转招商列表
        goMerchantsList(){
            this.$router.push({path: '/merchantsList'});
        },
        // 跳转招商详情
        goMerchantsDetail(id,houseType){
            this.$router.push({path: '/merchantsDetail',query:{projectId: id,url: "home",type:"2",houseType:houseType}});
        },
        // 跳转城市
        goCitySelection(){
            this.$router.push({path: '/citySelection',query:{cityNameStr: this.cityNameData}});
        },
        //城市定位
        cityFun(){
          let _this = this;
          function myFun(result){
            var cityName = result.name;
            // alert(cityName);
            let url = _this.changeData() + '/show/changeCity'
            axios(url,{
              method: 'post',
              params: {
                "cityName": cityName,
              }
            }).then(data => {
              // console.log(data);
              if(data.data.code == "101"){
                if(data.data.status == true){
                  sessionStorage.setItem("provinceId",data.data.provinceId);
                  sessionStorage.setItem("cityId",data.data.cityId);
                  var cityNameSplit =  cityName.split("市").join("");
                  sessionStorage.setItem("cityName",cityNameSplit);
                  _this.sessionCityId = sessionStorage.cityId;
                  if(_this.sessionCityId){
                    _this.listData();
                  }
                }else if(data.data.status == false){
                  sessionStorage.setItem("provinceId","110000");
                  sessionStorage.setItem("cityId","110100");
                  sessionStorage.setItem("cityName","北京");
                  _this.sessionCityId = sessionStorage.cityId;
                  if(_this.sessionCityId){
                    _this.listData();
                  }
                }
              }else{
                sessionStorage.setItem("provinceId","110000");
                sessionStorage.setItem("cityId","110100");
                sessionStorage.setItem("cityName","北京");
                _this.sessionCityId = sessionStorage.cityId;
                if(_this.sessionCityId){
                  _this.listData();
                }
              }
            }).catch(err => {
              console.log(err)
            });
          }
          var myCity = new BMap.LocalCity();
          myCity.get(myFun);
        }

    },
    mounted() {
        // 新闻滚动
        setInterval(_ => {
            if(this.activeIndex < this.prizeList.length) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 2500);

       if(sessionStorage.cityId == undefined){
          this.cityFun();
       }
    },
    created() {
        this.sessionCityId = sessionStorage.cityId;
        this.handleScroll();
        this.listData();
    }
}
</script>

<style scoped lang="scss">
.home{
    width: 7.5rem;
    padding-bottom: 1.6rem;
    background: #fff;
}
input::-webkit-input-placeholder{
    color: #ccc;
}
input::-moz-placeholder{
    color: #ccc;
}
input:-ms-input-placeholder{
    color:  #ccc;
}

/*首页头部*/
.homeTop img{
  width: 7.5rem;
  height: 4rem;
}
/*app下载页*/
.appDownload{
    width: 6.9rem;
    height: 1rem;
    background: #fff;
    padding: .2rem .3rem;
    dl{
        width: 6.9rem;
        height: 1rem;
        padding: .1rem .2rem;
        box-shadow:0px 0px 4px rgba(0,0,0,0.18);
        box-sizing: border-box;
        border-radius: 6px;
        dt{
            width: .8rem;
            height: .8rem;
            float: left;
            img{
                width: .8rem;
                height: .8rem;
            }
        }
        dd{
            float: left;
            margin-top: .05rem;
            margin-left: .14rem;
            h3{
                width: #111;
                font-size: .3rem;
                margin-bottom: .02rem;
            }
            h4{
                width: #111;
                font-size: .26rem;
            }
        }
        p{
            width: 1.58rem;
            height: .66rem;
            line-height: .66rem;
            background: #64ABFF;
            text-align: center;
            font-size: .26rem;
            float: right;
            color: #fff;
            margin-top: .06rem;
            border-radius: 4px;
            a{
                color: #fff;
            }
        }

    }
}



/*轮播图*/
.homeTop{
    height: 4rem;
    overflow: hidden;
    position: relative;
}
/*透明导航导航*/
.whiteNab{
    width: 7.5rem;
    height: .76rem;
    padding-top: .2rem;
    position: absolute;
    top: 0;
    z-index: 99999;
    .whiteNab_left1{
        float: left;
        width: 6.9rem;
        height: .64rem;
        color: #fff;
        background: rgba(225,225,225,0.5);
        margin-left: .3rem;
        border-radius: 6px;
        box-shadow:0px 0px 14px rgba(0,0,0,0.18);
        a{
            color: #fff;
        }
        h5{
            float: left;
            font-size: .28rem;
            margin: .14rem .3rem .2rem .3rem;
            span{
                display: inline-block;
                width:0;
                height:0;
                border-width: .08rem .08rem 0;
                border-style:solid;
                border-color:#fff transparent transparent;
                position:relative;
                left: .1rem;
                top: -.06rem;
            }
        }
        dt{
            float: left;
            img{
                width: .28rem;
                height: .26rem;
                position: relative;
                top: .12rem;
                margin-right: .14rem;
            }
        }
        dd{
            width: 4rem;
            float: left;
            line-height: .64rem;
            font-size: .28rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }
}

/*滑动导航*/
.grayNab{
    width: 7.5rem;
    height: .8rem;
    padding-top: .2rem;
    z-index: 99999;
    background: #fff;
    position: fixed;
    top: 0;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    .grayNab_left{
        float: left;
        width: 6.9rem;
        height: .64rem;
        background: #f0f1f2;
        margin-left: .3rem;
        border-radius: 6px;
        a{
            color: #111;
        }
        h5{
            float: left;
            font-size: .28rem;
            margin: .14rem .3rem .2rem .3rem;
            span{
                display: inline-block;
                width:0;
                height:0;
                border-width: .08rem .08rem 0;
                border-style:solid;
                border-color: #111 transparent transparent;
                position:relative;
                left: .1rem;
                top: -.06rem;
            }
        }
        dt{
            float: left;
            img{
                width: .28rem;
                height: .26rem;
                position: relative;
                top: .12rem;
                margin-right: .14rem;
            }
        }
        dd{
            width: 4rem;
            float: left;
            line-height: .64rem;
            font-size: .28rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            color: #898989;
        }
    }
}

/* tab列表 */
.tabList{
    width: 7.5rem;
    border-bottom: 1px solid #eaeaea;
    padding-top: .4rem;
    padding-bottom: .1rem;
    background: #fff;
    dl{
        float: left;
        width: 25%;
        text-align: center;
        margin-bottom: .3rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        dt{
            margin-bottom: .14rem;
            img{
                width: .88rem;
                height: .88rem;
            }
        }
        dd{
            color: #666;
            font-size: .28rem;
        }
    }
}

/* 优铺头条 */
.upNews{
    width: 6.9rem;
    background: #fff;
    padding: .4rem .3rem .4rem;
    .upNewsImg{
        width: .72rem;
        height: .76rem;
        display: inline-block;
        float: left;
    }
    .scrollWrap{
        text-align: left;
        float: left;
        width: 5.8rem;
        height: .8rem;
        overflow: hidden;
        margin-left: .3rem;
        span{
            width: 5.8rem;
            display: block;
            font-size: 0.26rem;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: .4rem;
        }
    }
}

/* 优铺数据 */
.upDataWrap{
    width: 7.5rem;
    background: #fff;
    padding-bottom: .6rem;
    border-bottom: 1px solid #eaeaea;
    .upData{
        width: 7.1rem;
        height: 3.5rem;
        margin-left: .2rem;
        background: url("../../../static/images/home/upDataBg.png") no-repeat;
        background-size: 7.1rem 3.5rem;
        dl{
            width: 50%;
            float: left;
            text-align: center;
            margin-top: .46rem;
            dt{
                color: #898989;
                font-size: .26rem;
            }
            dd{
                color: #64abff;
                font-size: .5rem;
                margin-bottom: .06rem;
                margin-top: .16rem;
            }
        }
    }
    ul{
        padding: .6rem 0 .1rem .3rem;
        li{
            width: 3.38rem;
            height: 1.45rem;
            margin-right: .16rem;
            float: left;
            img{
                width: 3.38rem;
                height: 1.45rem;
            }
        }
    }
}

/* 商铺列表 */
.shopList{
    width: 7.5rem;
    padding-top: .6rem;
    background: #fff;
    .shopListTop{
        height: .7rem;
        background: #fff;
        h3{
            font-size: 0.38rem;
            float: left;
            color: #333;
            margin-left: .4rem;
        }
        h4{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            font-size: 0.26rem;
            float: right;
            color: #aaa;
            float: right;
            margin-right: .3rem;
            position: relative;
            top: -.02rem;
            img{
                width: 0.12rem;
                height: 0.2rem;
                position: relative;
                top: -.02rem;
                margin-left: .1rem;
            }
        }
    }
    .shopListBoxWrap{
        width: 7.1rem;
        height: 4rem;
        overflow: hidden;
        margin-left: .4rem;
        .shopListBox{
            width: 100%;
            height: 4.2rem;
            display: box;
            display: -webkit-box;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            dl{
                width: 3.7rem;
                height: 4.2rem;
                margin-right: .2rem;
                display: block;
                position: relative;
                dt{
                    width: 3.7rem;
                    height: 2.78rem;
                    position: relative;
                    img{
                        width: 3.7rem;
                        height: 2.78rem;
                    }
                    span{
                        width: 3.5rem;
                        background: rgba(0,0,0,0.5);
                        position: absolute;
                        bottom: 0px;
                        line-height: .66rem;
                        padding-left: .2rem;
                        color: #fff;
                        font-size: .3rem;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                dd{
                    h5{
                        font-size: .3rem;
                        margin-top: .14rem;
                        margin-bottom: .1rem;
                        p{
                            color: #333;
                            float: left;
                        }
                        span{
                            display: inline-block;
                            color: #ef614f;
                            margin-left: .1rem;
                            width: 2.2rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    h6{
                        img{
                            width: .22rem;
                            height: .28rem;
                            position: relative;
                            top: -.04rem;

                        }
                        span{
                            color: #898989;
                            font-size: .28rem;
                            margin-left: .1rem;
                        }

                    }
                }
            }
        }
    }
}
</style>

<style type="text/css">
@keyframes scrollText1 {
    0%{
        -webkit-transform: translateY(-0px);
    }
    25%{
        -webkit-transform: translateY(-.8rem);
    }
    50%{
        -webkit-transform: translateY(-1.6rem);
    }
    75%{
        -webkit-transform: translateY(-2.4rem);
    }
    100%{
        -webkit-transform: translateY(-3.2rem);
    }
}

.scrollBorder{
    -webkit-animation:scrollText1 15s infinite;
    animation:scrollText1 15s infinite;
}

.scrollBorder div{
    height: .8rem;
    font-size: .26rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.mint-swipe-indicator{
    width: 6px;
    height: 6px;
}
</style>

