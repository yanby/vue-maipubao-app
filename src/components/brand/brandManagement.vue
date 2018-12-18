<template>
    <div class="brandManagement">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">品牌库</h2>
            <img src="../../../static/images/home/search.png" class="searchImg" @click="goBrandSearch()">
            <ul>
                <li :class="{'on':tab===0}" @click="tab = 0"><span>需求面积</span><i></i></li>
                <li :class="{'on':tab===1}" @click="tab = 1"><span>拓展区域</span><i></i></li>
                <li :class="{'on':tab===2}" @click="tab = 2"><span>品牌业态</span><i></i></li>
            </ul>
        </div>
        <div class="brandNull" v-if="brandListData == ''">
            <img src="../../../static/images/mine/brandManagementNull.png">
            <h6>暂无数据</h6>
        </div>

        <div class="brandManagementBox" v-else>
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
                <dl @click="goBrandDetails(item.id)" v-for="(item,index) in brandListData"> 
                    <dt>
                        <!-- <img src="../../../static/images/brand/brand.png"> -->
                        <img :src="item.logo" :onerror="defaultImg">
                    </dt>
                    <dd>
                        <ul>
                            <li><span>品牌名称：</span>{{item.brand_name}}</li>
                            <li><span>品牌业态：</span>{{item.brand_business}}</li>
                            <li><span>扩展区域：</span>{{item.expand_area}}</li>
                        </ul>
                        <div class="brandLabel">
                            <p>
                                <span>{{item.brand_positioning}}</span>
                            </p>
                        </div>
                    </dd> 
                    <img src="../../../static/images/brand/brandTop.png" class="brandTop" v-if="item.top_flag == 1">               
                </dl>
                <div class="noInner" v-if="more">暂无更多内容！</div>
            </mt-loadmore>
        </div>

        <!-- 发布品牌按钮 -->
        <div class="publishBrand" @click="goPublishBrand">发布品牌</div>

        <!-- 需求面积 -->
        <div class="areaWrap" v-if="tab===0" @click="tab = ''">
            <div class="needsArea" @click.stop>
                <ul>
                    <li v-for="(item,index) in needsAreaArr" @click="acreageBtn(item.d_value,index)">
                        <span :class="{changeBlue:changeColor == index}">{{item.d_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 拓展区域 -->
        <div class="expandAreaWrap" v-if="tab===1" @click="tab = ''">
            <div class="brandLeaderArea" @click.stop>
                <ul>
                    <li class="li1" v-for="(item,index) in expandAreas">
                        <span :class="{cityTxtColor:cityChangeColor == index}" @click="cityBtn(item.id,index,item)">{{item.regions_name}}</span>
                        <ol>
                            <li v-for="(item1,index1) in areaArr.areasList" :class="{areaTxtColor2:cityChangeColor2 == index1}" @click="cityChildBtn(item1.id,item1.regions_id,index1)">{{item1.area_name}}</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 品牌业态 -->
        <div class="expandAreaWrap brandType" v-if="tab===2" @click="tab = ''">
            <div class="brandLeaderArea" @click.stop>
                <ul>
                    <li class="li1" v-for="(item,index) in brandTypeArr">
                        <span @click="brandTypeBtn(item.id,index,item)" :class="{cityTxtColor:brandTypeChangeColor == index}">{{item.businessName}}</span>
                        <ol>
                            <li v-for="(item1,index1) in brandTypeChildArr.levelTwoList" :class="{areaTxtColor2:brandTypeChangeColor2 == index1}" @click="brandTypeChildBtn(item1.id,item1.p_id,index1)">{{item1.businessName}}</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
name: "demandManagement",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id

            tab: '', // 导航切换 

            // 需求面积
            needsAreaArr: [],
            // 拓展区域
            areaArr: [],
            expandAreas: [],    
            // 品牌业态
            brandTypeArr: [],
            brandTypeChildArr: [],
            // 列表数据
            brandListData: [],

            areaId: "", // 需求面积id

            regionsId: "", // 拓展区域 一级id
            cityId: "", // 拓展区域 二级id

            brandTypeId: "", // 品牌业态 id
            brandTypeParentId: "", // 品牌业态 父id
            
            // 筛选条件 需求面积
            changeColor: 0,
            // 筛选条件 拓展区域
            cityChangeColor: 0,
            cityChangeColor2: 0,
            // 筛选条件 品牌业态
            brandTypeChangeColor: 0,
            brandTypeChangeColor2: 0,
            
            pageSize: 10, // 每次请求的数量
            brandIndex: 1, // 页码
            searchInfo: "", // 搜索
            more: false,  //有没有更多数据
            allLoaded: false,

            // 品牌业态初始数据
            levelTwoList: {
                levelTwoList: [{
                    businessName: "全部",
                    id: "",
                    p_id: ""
                }],
                businessName: "全部",
                id: ""
            },
            // 拓展区域初始数据
            areasList: {
                areasList: [{
                    area_name: "全部",
                    regions_id: "",
                    id: ""
                }]
            },

            defaultImg: 'this.src="' + require('../../../static/images/Merchants/err.png') + '"', //默认图片
                 
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/home'});            
        },
        // 发布品牌
        goPublishBrand(){
            // this.$router.push({path: "/publishBrand"});  
            if(!localStorage.token){
                this.$router.push({path: '/login'});
            }else{
                this.$router.push({path: '/publishBrand'});
            }
        },
        // 点击搜索按钮
        goBrandSearch(){
            this.$router.push({path: "/brandSearch"});  
        },

        // 需求面积下拉
        acreageBtn(id,index){
            this.changeColor = index;
            this.areaId = id; //需求面积ID
            this.regionsId = ""; //拓展区ID
            this.cityId = ""; //拓展区域省ID
            this.brandTypeId = ""; // 业态ID
            this.brandTypeParentId = "";// 业态父ID
            this.brandList();
            this.tab = "";
        },
    
        // 拓展区域
        cityBtn(id,index,item){
            this.areaArr = item;
            this.cityChangeColor = index; 
            this.cityChangeColor2 = "";                 
        },           
        cityChildBtn(id,regionsId,index){
            this.cityChangeColor2 = index;
            this.areaId = ""; //需求面积ID
            this.regionsId = regionsId; //拓展区ID
            this.cityId = id; //拓展区域省ID
            this.brandTypeId = ""; // 业态ID
            this.brandTypeParentId = "";// 业态父ID
            this.brandList();
            this.tab = "";         
        },

        // 品牌业态
        brandTypeBtn(id,index,item){
            this.brandTypeChildArr = item;
            this.brandTypeChangeColor = index; 
            this.brandTypeChangeColor2 = "";
        },
        brandTypeChildBtn(id,brandTypeParentId,index){
            this.brandTypeChangeColor2 = index; 
            this.areaId = ""; //需求面积ID
            this.regionsId = ""; //拓展区ID
            this.cityId = ""; //拓展区域省ID
            this.brandTypeId = id; // 业态ID
            this.brandTypeParentId = brandTypeParentId;// 业态父ID
            this.brandList();
            this.tab = "";
        },

        loadTop(){ //下拉刷新
            var _this = this;
            let url = this.changeData() + '/brand/list'
            var data = {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: "1",     // 页码从1开始【必传】
                topNum: '10',  //置顶数据取得条数【必传】
                brandName: this.searchInfo,   // 品牌名称
                areasId: this.areaId, //需求面积ID
                regionsId: this.regionsId, //拓展区ID
                provinceId: this.cityId, //拓展区域省ID
                brandBusiness: this.brandTypeId, // 业态ID
                brandBusinessP: this.brandTypeParentId // 业态父ID
            }
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    this.brandListData = data.data.brandList;
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
            var data = {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: _this.brandIndex,     // 页码从1开始【必传】
                topNum: '10',  //置顶数据取得条数【必传】
                brandName: this.searchInfo,   // 品牌名称
                areasId: this.areaId, //需求面积ID
                regionsId: this.regionsId, //拓展区ID
                provinceId: this.cityId, //拓展区域省ID
                brandBusiness: this.brandTypeId, // 业态ID
                brandBusinessP: this.brandTypeParentId // 业态父ID
            }
            let url = this.changeData() + '/brand/list';                      
            setTimeout(function () {
                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    _this.brandListData = _this.brandListData.concat(data.data.brandList);
                    if(data.data.brandList <= 0){
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

        // 品牌列表
        brandList(){
            let url = this.changeData() + '/brand/list'
            axios(url,{
                method: 'post',
                params: {
                    cityId: this.sessionCityId || 110100, //所属城市【必传】
                    pageSize: this.pageSize,   // 每页数据量【必传】
                    pageNum: '1',     // 页码从1开始【必传】
                    topNum: '10',  //置顶数据取得条数【必传】
                    brandName: '',   // 品牌名称
                    areasId: this.areaId, //需求面积ID
                    regionsId: this.regionsId, //拓展区ID
                    provinceId: this.cityId, //拓展区域省ID
                    brandBusiness: this.brandTypeId, // 业态ID
                    brandBusinessP: this.brandTypeParentId // 业态父ID
                }
            }).then(data => {
                // console.log(data);
                this.brandListData = data.data.brandList;
            }).catch(err => {
                console.log(err)
            });
        },

        // 品牌列表
        brandFirstShow(searchInfo){
            let url = this.changeData() + '/brand/list'
            axios(url,{
                method: 'post',
                params: {
                    cityId: this.sessionCityId || 110100, //所属城市【必传】
                    pageSize: this.pageSize,   // 每页数据量【必传】
                    pageNum: "1",     // 页码从1开始【必传】
                    topNum: '10',  //置顶数据取得条数【必传】
                    brandName: this.searchInfo,   // 品牌名称
                    areasId: "", //需求面积ID
                    regionsId: "", //拓展区ID
                    provinceId: "", //拓展区域省ID
                    brandBusiness: "", // 业态ID
                    brandBusinessP: "" // 业态父ID
                }
            }).then(data => {
                // console.log(data);
                // console.log(data.data.message);
                if(data.data.code == "101"){
                    Indicator.close();
                    this.brandListData = data.data.brandList;
                }else{
                    Toast({
                        message: 'data.data.message',
                        duration: 3000
                    });
                }
            }).catch(err => {
                console.log(err)
            });
        },

        // 接口调用
        brandDetailsData(){
            let url = this.changeData() + '/brand/filter'
            axios(url,{
                method: 'post',
            }).then(data => {
                // console.log(data);     
                // 需求面积
                this.needsAreaArr = data.data.acreageList;
                // 拓展区域
                this.expandAreas = data.data.expandAreaList;
                // 品牌业态
                this.brandTypeArr = data.data.brandBusinessList;
                
            }).catch(err => {
                console.log(err)
            });
        },

        // 点击商铺详情
        goBrandDetails(id){
            this.$router.push({path: '/brandDetails',query:{id: id}});           
        },

    },
    mounted() {
        
    },
    created(){ 
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        this.sessionCityId = sessionStorage.cityId;
        // console.log(this.sessionCityId);

        this.brandDetailsData();
        this.brandTypeBtn("","0",this.levelTwoList);
        this.cityBtn("","0",this.areasList);

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

        var searchTxt = request['search']; 
        this.searchInfo = searchTxt;
        // console.log(this.searchInfo);

        if(this.searchInfo){
            this.brandFirstShow(this.searchInfo);           
        }else{
            this.brandFirstShow(''); 
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
.brandManagement{
    width: 7.5rem;   
    padding-bottom: 1rem;
    margin: 0 auto;
}
/*导航*/
.nav{
    width: 7.5rem;
    height: 1.7rem;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    position: fixed;
    top: 0px;
    z-index: 1000000;
    .searchImg{
        width: .4rem;
        height: .4rem;
        position: absolute;
        right: .28rem;
        top: .28rem;
    }
    ul{
        width: 7.5rem;
        height: .8rem;
        position: absolute;
        bottom: 0;
        z-index: 9999999;
        li{
            width: 33.3%;
            float: left;
            text-align: center;
            line-height: .8rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            color: #111;
            span{
                font-size: .3rem;
            }
            i{
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
            &.on{
                color: #64abff;
                i{
                    border-width:0 .08rem .08rem;
                    border-color: transparent transparent #64abff;
                }
            }
        }
    }
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
/*无数据*/
.brandNull{
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
/*列表*/
.brandManagementBox{
    width: 6.9rem;
    padding: 1.7rem .3rem 0;
    dl{
        width: 6.5rem;
        height: 1.64rem;
        padding: .2rem;
        background: #fff;
        border-radius: 6px;
        position: relative;
        margin-top: .2rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        dt{
            width: 2.16rem;
            height: 1.62rem;
            float: left;
            margin-right: .2rem;
            img{
                width: 2.16rem;
                height: 1.62rem;
            }
        }
        dd{
            float: left;
            ul{
                li{
                    width: 4rem;
                    color: #333;
                    font-size: .28rem;
                    margin-bottom: .06rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    span{
                        color: #898989;
                    }
                }
            }
            .brandLabel{
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
                        font-size: .2rem;
                        text-align: center;
                        padding-left: .12rem;
                        padding-right: .12rem;
                        margin-right: .1rem;
                        background: #e5f1ff;
                        display: block;
                        color: #64ABFF;
                        border-radius: 4px;
                    }
                }
            }
        }
        .brandTop{
            width: .7rem;
            height: .8rem;
            position: absolute;
            right: 0px;  
            top: -.04rem;      
        }
    }
}

/*发布品牌按钮*/
.publishBrand{
    height: .9rem;
    width: 7.5rem;
    text-align: center;
    background: #64ABFF;
    line-height: .9rem;
    color: #fff;
    font-size: .34rem;
    position: fixed;
    bottom: 0;
}

/*需求面积下拉*/
.areaWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 999;
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
    .needsArea{
        width: 7.5rem;
        height: 5rem;
        position: absolute;
        top: 1.7rem;
        background: #fff;
        ul{
            width: 7.5rem;
            height: 5.14rem;
            background: #fff;
            overflow-x: auto;
            padding-top: .14rem;
            li{
                line-height: .8rem;
                color: #666;
                font-size: .3rem;
                text-align: center;       
                -webkit-tap-highlight-color: rgba(0,0,0,0);        
                span{
                    display: inline-block;
                    line-height: .8rem;
                }
                .changeBlue{
                    color: #7ab5ff;
                }
            }
        }
    }
}

/* 拓展区域下拉 */
.expandAreaWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 999;
    -webkit-tap-highlight-color: rgba(0,0,0,0);   
    .brandLeaderArea{
        width: 7.5rem;
        height: 5.68rem;
        position: absolute;
        top: 1.7rem;
        background: #fff;
        ul{
            height: 5.68rem;
            width: 7.5rem;
            overflow-x: auto;
            .li1{
                height: .9rem;
                width: 3.75rem;
                box-sizing: border-box;
                text-align: center;
                display: block;
                color: #333333;
                font-size: .3rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                z-index: 111;
                line-height: .9rem;                         
                span{
                    color: #666;
                    font-size: .3rem;
                }
                .cityTxtColor{
                    color: #7ab5ff;
                }
                ol{
                    height: 5.68rem;
                    width: 3.75rem;                           
                    position: absolute;
                    left: 3.75rem;
                    top: 0;  
                    z-index: 100000;   
                    overflow-x: auto; 
                    background: #fafafa;                     
                    li{
                        width: 3.75rem;
                        height: .9rem;
                        font-size: .3rem;
                        line-height: .9rem;                        
                        z-index: 100000; 
                        color: #666; 
                    }
                    .areaTxtColor2{
                        color: #7ab5ff;
                    }
                }                   
            }
        }
    }
}
.noInner{
    text-align: center;
    line-height: 1rem;
}
</style>
