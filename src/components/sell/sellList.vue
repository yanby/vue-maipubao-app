<template>
  <div class="sellList">
    <div class="backTop" @click.stop="backTopFun()"></div>
    <div class="title">
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">销售</h2>
        <router-link :to="{path:'/shopSearch',query:{url:'sellList'}}"></router-link>
      </div>
      <div class="shaixuan">
        <div class="list">
          <div @click="tab1($event)" :class="{'cur':tab===0}">区域 <span></span></div>
          <div @click="tab2($event)" :class="{'cur':tab===1}">类型 <span></span></div>
          <div @click="tab3($event)" :class="{'cur':tab===2}">价格 <span></span></div>
          <div @click="tab4($event)" :class="{'cur':tab===3}">面积 <span></span></div>
        </div>
        <div class="list-content">
          <div class="modal" @click="modalHide()" ref="modal"></div>
          <ul class="one">
            <li class="oneList" v-show="tab===0">
              <ul class="two twoArea">
                <li class="twoChild" v-for="(item,index) in region" ref="first"><span class="first" @click="regionFun($event,item)">{{item.area_name}}</span></li>
              </ul>
            </li>
            <li class="oneList" v-show="tab===1">
              <ul class="four">
                <ul class="two twoYetai">
                  <li class="twoChild" v-for="(item,index) in type"><span class="first2" @click="typeFun($event,item)">{{item.type_name}}</span></li>
                </ul>
              </ul>
            </li>
            <li class="oneList" v-show="tab===2">
              <ul class="two twoPrice">
                <li class="twoChild" v-for="(item,index) in price"><span class="first1" @click="priceFun($event,item)">{{item.description}}</span></li>
              </ul>
            </li>
            <li class="oneList" v-show="tab===3">
              <ul class="four">
                <li class="twoChild" v-for="(item,index) in area"><span class="first1" @click="areaFun($event,item)">{{item.d_name}}</span></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="shoplist" v-show="noData===1">
      <!--<div class="detail" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">-->
      <div class="detail" ref="wrapper">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
          <ul>
            <li v-for="(item,index) in projectList" @click="go(item,index)">
              <div class="wrap">

                <div class="img">
                  <img :src="item.pictures" alt="" :onerror="defaultImg">
                  <div v-if="item.topStatus===1" class="zhiding"></div>
                </div>
                <div class="msg">
                  <div class="look"><span></span>{{item.favorite_count}}</div>
                  <h4>{{item.project_name}}</h4>
                  <p>{{item.address}}</p>
                  <p>建筑面积：{{item.acreage}}㎡</p>
                  <div class="price">销售均价：<span>{{item.price}}元/㎡</span></div>
                  <div class="tags" v-if="item.tag"><span v-if="index1 < 3" v-for="(item1,index1) in item.tag">{{item1}}</span></div>
                </div>
              </div>
            </li>
          </ul>
          <div class="noInner" v-if="more">暂无更多内容喽！</div>
        </mt-loadmore>
      </div>
    </div>
    <div class="noOrder" v-show="noData===0">
      <dl>
        <dt>
          <img src="../../../static/images/common/noOrders.png">
        </dt>
        <p>暂无信息</p>
      </dl>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        tab : "",//控制区域显示隐藏
        region: "",//区域
        type: "",//类型
        area: "",//面积
        price:"",//价格
        pageSize: 5,//条数
        pageNum: 1,//第几页
        pageNum1: 1,//第几页
        noData: 1,//筛选有无数据
        projectList: "",//项目列表
        projectType:1,//项目类型,1销售，2招商
        more: false,//有没有更多数据
        regionSelect:"",//区域选中
        typeSelect:"",//类型选中
        areaSelect:"",//面积选中
        beginpriceSelect:"",//价格开始选中
        endpriceSelect:"",//价格选中
        search: "",//搜索条件
        allLoaded: false,
        defaultImg: 'this.src="' + require('../../../static/images/Merchants/err.png') + '"'
      };
    },
    beforeRouteLeave(to,from,next){
      let position = $(window).scrollTop();
      localStorage.setItem("scrollTop",position);
      if(to.path == "/sellDetail"){
        if(!from.meta.keepAlive){
          from.meta.keepAlive = true;
        }
        next();
      }else{
        from.meta.keepAlive = false;
        to.meta.keepAlive = false;
        next();
        // window.location.reload()
      }
    },
    mounted() {
      this.search = this.$route.query.search;//搜索参数
      this.init();//区域筛选
      this.list();//初始化列表
    },
    methods: {
      navBack(){//返回上一级
        this.$router.push({path:"/home"})
      },
      init(){
        this.$http({
          url: this.changeData() + '/project/filter',
          method: "post",
          params: {
            cityId: sessionStorage.cityId || 110100,
            provinceId: sessionStorage.provinceId || 110000,
            projectType: this.projectType,
          }
        }).then(function(res){
          console.log(res)
          this.region = res.data.districtList;
          this.type = res.data.houseTypeList;
          this.area = res.data.acreageList;
          this.price = res.data.priceRangeList;
          this.next = res.data.next;

        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },//筛选初始化
      list(){//列表初始化
        var data = {
          cityId: sessionStorage.cityId || 110100, //所属城市【必传】
          pageSize: this.pageSize, //每页数据量【必传】
          pageNum: this.pageNum, //页码从1开始【必传】
          projectType: 1, //项目类型，1是销售，2是招商【必传】
          projectDistrictId: this.regionSelect, //区域筛选
          houseType: this.typeSelect, //建筑类型筛选
          beginPrice: this.beginpriceSelect, //价格段筛选
          endPrice: this.endpriceSelect, //价格段筛选
          acreageRangeValue: this.areaSelect, //面积段筛选
          projectName: this.search //项目名称筛选
        }
        this.$http({
          url: this.changeData() + '/project/list',
          method: "post",
          params: data
        }).then(function(res){
          console.log(res)
          this.projectList = res.data.projectList;
          //隐藏弹窗
          this.tab = "";
          this.$refs.modal.style.display = "none";
          //如果小于十条显示没有更多数据了
          if(this.projectList.length <= 0){
            this.noData = 0;
          }else{
            this.noData = 1;
          }
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      backTopFun(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      loadTop(){//下拉刷新
        $(".shoplist ul li").removeClass("cur");
        var that = this;
        var data = {
          cityId: sessionStorage.cityId || 110100, //所属城市【必传】
          pageSize: this.pageSize, //每页数据量【必传】
          pageNum: this.pageNum, //页码从1开始【必传】
          projectType: 1, //项目类型，1是销售，2是招商【必传】
          projectDistrictId: this.regionSelect, //区域筛选
          houseType: this.typeSelect, //建筑类型筛选
          beginPrice: this.beginpriceSelect, //价格段筛选
          endPrice: this.endpriceSelect, //价格段筛选
          acreageRangeValue: this.areaSelect, //面积段筛选
          projectName: this.search //项目名称筛选
        }
        setTimeout(function () {
          that.$http({
            url: that.changeData() + '/project/list',
            method: "post",
            params: data
          }).then(function(res){
            console.log(res)
            that.projectList = res.data.projectList;
            that.$refs.loadmore.onTopLoaded();
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },1000)
      },
      loadBottom() {//上拉加载
        var that = this;
        this.pageNum1++;
        that.allLoaded = false;
        var data = {
          cityId: sessionStorage.cityId || 110100, //所属城市【必传】
          pageSize: this.pageSize, //每页数据量【必传】
          pageNum: this.pageNum1, //页码从1开始【必传】
          projectType: 1, //项目类型，1是销售，2是招商【必传】
          projectDistrictId: this.regionSelect, //区域筛选
          houseType: this.typeSelect, //建筑类型筛选
          beginPrice: this.beginpriceSelect, //价格段筛选
          endPrice: this.endpriceSelect, //价格段筛选
          acreageRangeValue: this.areaSelect, //面积段筛选
          projectName: this.search //项目名称筛选
        }
        setTimeout(function () {
          that.$http({
            url: that.changeData() + '/project/list',
            method: "post",
            params: data
          }).then(function(res){
            console.log(res)
            that.projectList = that.projectList.concat(res.data.projectList)
            if(res.data.projectList <= 0){
              that.allLoaded = true;
            }
            that.$refs.loadmore.onBottomLoaded();
          }.bind(this)).catch(function(err){
            console.log("商店列表页面错误：",err)
          })
        },1000)
      },
      handleBottomChange(){
        var that = this;
        if(this.allLoaded == true){
          this.more = true;
          setTimeout(function () {
            that.more = false;
          },2000)
        }
      },
      go(item,index){
        $(".shoplist ul li").eq(index).addClass("cur");
        this.$router.push({path:"/sellDetail",query:{projectId: item.projectId,projectType:this.projectType,houseType:item.houseType}})
      },
      tab1(e){//点击区域
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 0;
          this.$refs.modal.style.display = "block";
        }
      },
      tab2(e){//点击类型
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 1;
          this.$refs.modal.style.display = "block";
        }
      },
      tab3(e){//点击面积
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 2;
          this.$refs.modal.style.display = "block";
        }
      },
      tab4(e){//点击价格
        if($(e.srcElement).hasClass("cur")){
          this.tab = "";
          this.$refs.modal.style.display = "none";
        }else{
          this.tab = 3;
          this.$refs.modal.style.display = "block";
        }
      },
      regionFun(e,item){//点击区域选中
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        this.regionSelect = item.id;
        this.search = "";
        this.list();
      },
      typeFun(e,item){//点击类型选中
        this.search = "";
        this.typeSelect = item.type_id;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        this.list()
      },
      areaFun(e,item){//点击面积选中
        this.search = "";
        this.typeSelect = item.d_value;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        this.list()
      },
      priceFun(e,item){//点击面积选中
        this.search = "";
        this.beginpriceSelect = item.beginPrice;
        this.endpriceSelect = item.endPrice;
        $(e.srcElement).parent(".twoChild").addClass("cur").siblings().removeClass("cur");
        this.list()
      },
      modalHide(){//弹窗隐藏
        this.tab = "";
        this.$refs.modal.style.display = "none";
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "../../../static/css/shopList.scss";
  @import "../../../static/css/nav.css";
  .sellList{
    width:7.5rem;
    height:100vh;
    margin: 0 auto;
    padding-bottom: 1rem;
    background: #fff;
    .shopWrite{
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      position: fixed;
      bottom: 0;
      color:#fff;
      text-align: center;
      font-size: .34rem;
      background: #46ACFF;
    }
    .title{
      position: fixed;
      /*left: 0;*/
      top: 0;
      z-index: 2000;
      .nav{
        font-size: .34rem;
        position: relative;
        border: none;
        .navTitle{
          font-size: .34rem;
        }
        a{
          position: absolute;
          width: .4rem;
          height: .4rem;
          right: .3rem;
          top: .25rem;
          background: url("../../../static/images/common/search.png") no-repeat ;
          -webkit-background-size: .4rem .4rem;
          background-size: .4rem .4rem;
        }
      }

      .shaixuan{
        position: relative;
        width: 7.5rem;
        height: .81rem;
        z-index: 11;
        background: #fff;
        .list{
          width: 7.5rem;
          height: .81rem;
          display: flex;
          background: #fff;
          div{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 25%;
            height: .8rem;
            line-height: .8rem;
            font-size: .3rem;
            justify-content: space-around;
            text-align: center;
            background: #fff;
            border-bottom: .01rem solid #eaeaea;
            &.cur{
              color: #7bb5ff;
              span{
                background: url("../../../static/images/Merchants/up-bg.png") no-repeat ;
                background-size: .14rem .1rem;
              }
            }
            span{
              display: inline-block;
              width: .14rem;
              height: .1rem;
              background: url("../../../static/images/Merchants/down.png") no-repeat;
              background-size: .14rem .1rem;
              vertical-align: .06rem;
            }
          }
        }
        .list-content{
          position: relative;
          top: .01rem;
          ul.one{
            position: absolute;
            background: #fff;
            left: 0;
            top: 0rem;
            z-index:2;
            overflow: hidden;
            .oneList{
              width: 7.5rem;
              height: 5rem;
              border-bottom: .01rem solid #eaeaea;
              .btn{
                width: 7.5rem;
                height: .88rem;
                background: #fff;
                position: absolute;
                left: 0;
                bottom: 0;
                border-top: 0.01rem solid #eaeaea;
                display: flex;
                justify-content: space-around;
                align-items: center;
                div:nth-of-type(1){
                  width: 50%;
                  text-align: center;
                  span{
                    display: inline-block;
                    width: 3rem;
                    height: .5rem;
                    line-height: .5rem;
                    text-align: center;
                    font-size: .3rem;
                    background: #aaa;
                    color: #fff;
                    border-radius: .05rem;
                  }
                }
                div:nth-of-type(2){
                  width: 50%;
                  text-align: center;
                  span{
                    display: inline-block;
                    width: 3rem;
                    height: .5rem;
                    line-height: .5rem;
                    text-align: center;
                    font-size: .3rem;
                    background: #7bb5ff;
                    color: #fff;
                    border-radius: .05rem;
                  }
                }
              }
              .two{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                background: #fff;
                width: 7.5rem;
                height: 5rem;
                border-right: .01rem solid #eaeaea;
                overflow: scroll;
                .twoChild{
                  text-align: center;
                  height: .78rem;
                  line-height: .78rem;
                  font-size: .3rem;
                  border-bottom: .01rem solid #fff;
                  &.cur{
                    span{
                      display: inline-block;
                      width: 100%;
                      height: 100%;
                      color: #7bb5ff;
                    }
                  }
                  .three{
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    background: #fff;
                    width: 4rem;
                    height: 5rem;
                    padding-left: .54rem;
                    position: absolute;
                    left: 2.96rem;
                    top: 0;
                    text-align: left;
                    background: #f7f8fa;
                    overflow: scroll;
                    li{
                      height: .78rem;
                      line-height: .78rem;
                      font-size: .3rem;
                      &.cur{
                        color: #7bb5ff;
                      }
                    }
                  }
                }
              }

              .four{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                background: #fff;
                height: 5rem;
                width: 7.5rem;
                overflow: auto;
                &>li{
                  text-align: center;
                  height: .78rem;
                  line-height: .78rem;
                  font-size: .3rem;
                  border-bottom: .01rem solid #fff;
                  &.cur{
                    color: #7bb5ff;
                    /*border-bottom: .01rem solid #7bb5ff;*/
                  }
                }
              }
            }
          }
        }
      }
    }
    .modal{
      width: 7.5rem;
      height: 13.34rem;
      /*margin: 0 auto;*/
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      background: rgba(0,0,0,.3);
    }
    .shoplist{
      padding-top: 1.77rem;
    }
    .noOrder{
      padding-top: 1.5rem;
      width: 7.5rem;
      .noOrderTop{
        height: .9rem;
        text-align: center;
        background: #fff;
        border-bottom: 0.02rem solid #eee;
        position: relative;
        h3{
          width: 75%;
          line-height: 1rem;
          font-size: 0.36rem;
          color: #333;
          float: left;
          text-align: center;
        }
        i{
          display: inline-block;
          width: 13%;
          height: 1rem;
          line-height: 1rem;
          float: left;
          img{
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
      dl{
        width: 7.5rem;
        /*height: 6rem;*/
        /*background: pink;*/
        text-align: center;
        dt{
          /*width: 3rem;
          height: 3rem;*/
          /*background: red;*/
          margin-top: 1.4rem;
          img{
            width: 1.68rem;
            height: 1.68rem;
          }
        }
        p{
          font-size: .28rem;
          color: #898989;
          margin-top: .38rem;
          margin-bottom: .5rem;
        }
        dd{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          span{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: inline-block;
            width: 3rem;
            height: .89rem;
            background: #47abff;
            line-height: .89rem;
            color: #fff;
            font-size: .34rem;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
