<template>
  <div class="sellDetail">
    <div class="jiantou-title" v-show="title===1"><span @click="back()"></span>{{projectDetail.project_name}}</div>
    <div class="banner" @click="bannerSmall()">
      <div class="jiantou" @click.stop="back()" v-show="title===0"></div>
      <div class="wrap">
        <div class="txt">
          <span class="swiperOne">{{smallIndex}}/{{total}}</span>
        </div>
        <div class="swiper-container swiper-container1 swiper-container-horizontal" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in projectPic"><img :src="item.pic_path" alt="" :onerror="defaultImg"></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="bannerBig">
      <div class="swiper-top"><span @click="bannerBig()"></span></div>
      <div class="swiper-bottom">{{bigIndex}}/{{total}}</div>
      <div class="swiper-container swiper-container2 swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in projectPic"><img :src="item.pic_path" alt="" :onerror="defaultImg"></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="loucengBig">
      <div class="swiper-top"><span @click="loucengHide()"></span></div>
      <div class="swiper-container swiper-container4 swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in projectFloorPic"><img :src="item.pic_path" alt="" :onerror="defaultImg"></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="msg">
      <div class="msg-title">
        <h2>{{projectDetail.project_name}}</h2>
        <div class="tags" v-if="tag.length!=0">
          <div class="youshi">
            <span v-for="item in tag">{{item}}</span>
          </div>
        </div>
        <div class="money" v-if="type!=2">
          <dl>
            <dt>销售均价</dt>
            <dd>{{projectDetail.price}}元/㎡</dd>
          </dl>
          <dl>
            <dt>建筑面积</dt>
            <dd>{{projectDetail.acreage}}㎡</dd>
          </dl>
        </div>
        <div class="address" v-if="type==0">
          <div v-if="projectDetail.business_type" class="cur"><span>项目类型：</span><b>{{projectDetail.business_type}}</b></div>
          <div v-if="projectDetail.project_business" class="cur"><span>项目业态：</span><b>{{projectDetail.project_business}}</b></div>
          <div v-if="projectDetail.surrounding_facilities" class="cur">
            <span>周边信息：</span><b>{{projectDetail.surrounding_facilities}}</b>
          </div>
          <div v-if="projectDetail.project_address" class="cur"><span><i>地</i>址：</span><b>{{projectDetail.project_address}}</b></div>
        </div>
        <div class="address" v-if="type==1">
          <div v-if="projectDetail.surrounding_facilities" class="cur">
            <span>周边信息：</span><b>{{projectDetail.surrounding_facilities}}</b>
          </div>
          <div v-if="projectDetail.project_address" class="cur"><span><i>地</i>址：</span><b>{{projectDetail.project_address}}</b></div>
        </div>
        <div class="address" v-if="type===2">
          <div v-if="projectDetail.price"><span>销售均价：</span><b>{{projectDetail.price}}元/㎡</b></div>
          <div v-if="projectDetail.property_type"><span>物业类别：</span><b>{{projectDetail.property_type}}</b></div>
          <div v-if="projectDetail.building_type"><span>建筑类别：</span><b>{{projectDetail.building_type}}</b></div>
          <div v-if="projectDetail.decoration"><span>装修状况：</span><b>{{projectDetail.decoration}}</b></div>
          <div v-if="projectDetail.property_rights"><span>产权年限：</span><b>{{projectDetail.property_rights}}年</b></div>
          <div v-if="projectDetail.developers"><span><s>开</s><s>发</s>商：</span><b>{{projectDetail.developers}}</b></div>
          <div v-if="projectDetail.project_address"><span>楼盘地址：</span><b>{{projectDetail.project_address}}</b></div>
        </div>
        <div class="map" id="allmap" @click="mapBtn()"></div>
      </div>
      <div class="louceng" v-if="type!=2 && projectFloorPic.length!=0">
        <h3><span></span>楼层平面</h3>
        <div class="swiper-container3" >
          <div class="wrapper">
            <div @click="loucengShow(index)" class="slide" v-for="(item,index) in projectFloorPic"><p>{{item.description}}</p><img :src="item.pic_path" alt="" :onerror="defaultImg"></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="huxing" v-if="type===2">
        <h3><span></span>户型</h3>
        <div class="swiper-container3" >
          <div class="wrapper">
            <div @click="loucengShow(index)" class="slide" v-for="(item,index) in projectFloorPic">
              <div class="img">
                <img :src="item.pic_path" alt="" :onerror="defaultImg">
              </div>
              <p>{{item.description}}</p>
              <!--<p class="red">{{item.price}}万元/套</p>-->
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="xinxi" v-if="type===0">
        <h3>信息概括</h3>
        <ul>
          <li v-if="projectDetail.developers" class="cur"><span><i>开</i><i>发</i>商：</span><b>{{projectDetail.developers}}</b></li>
          <li v-if="projectDetail.opened_date"><span>开业时间：</span><b>{{projectDetail.opened_date}}</b></li>
          <li v-if="projectDetail.populations" class="cur"><span>周边人口：</span><b>{{projectDetail.populations}}</b></li>
          <li v-if="projectDetail.description" class="cur"><span>项目介绍：</span><b>{{projectDetail.description}}</b></li>
          <li v-if="projectDetail.ground_parking" class="cur1"><span>地上停车位：</span><b>{{projectDetail.ground_parking}}</b></li>
          <li v-if="projectDetail.underground_parking" class="cur1"><span>地下停车位：</span><b>{{projectDetail.underground_parking}}</b></li>
        </ul>
      </div>
      <div class="xinxi" v-if="type===1">
        <h3>信息概括</h3>
        <ul>
          <li v-if="projectDetail.developers" class="cur"><span><i>开</i><i>发</i>商：</span><b>{{projectDetail.developers}}</b></li>
          <li v-if="projectDetail.trading_area" class="cur"><span><b>商</b>圈：</span><b>{{projectDetail.trading_area}}</b></li>
          <li v-if="projectDetail.elevator" class="cur"><span><b>电</b>梯：</span><b>{{projectDetail.elevator}}部</b></li>
          <li v-if="projectDetail.property_fee" class="cur"><span><i>物</i><i>业</i>费：</span><b>{{projectDetail.property_fee}}元/㎡/月</b></li>
          <li v-if="projectDetail.floor_height" class="cur"><span><b>层</b>高：</span><b>3.3m/{{projectDetail.floor_height}}层</b></li>
          <li v-if="projectDetail.decoration" class="cur"><span><b>装</b>修：</span><b>{{projectDetail.decoration}}</b></li>
          <li v-if="projectDetail.parking_fee" class="cur"><span><i>停</i><i>车</i>费：</span><b>{{projectDetail.parking_fee}}/月</b></li>
          <li v-if="projectDetail.property_company" class="cur"><span>物业公司：</span><b>{{projectDetail.property_company}}</b></li>
          <li v-if="projectDetail.opened_date" class="cur"><span>开盘时间：</span><b>{{projectDetail.opened_date}}</b></li>
          <li v-if="projectDetail.description" class="cur"><span>项目介绍：</span><b>{{projectDetail.description}}</b></li>
          <li v-if="projectDetail.ground_parking" class="cur1"><span>地上停车位：</span><b>{{projectDetail.ground_parking}}</b></li>
          <li v-if="projectDetail.underground_parking" class="cur1"><span>地下停车位：</span><b>{{projectDetail.underground_parking}}</b></li>
        </ul>
      </div>
      <div class="xinxi" v-if="type===2">
        <h3>销售信息</h3>
        <ul>
          <li v-if="projectDetail.sales_status"><span>销售状态：</span><b>{{projectDetail.sales_status}}</b></li>
          <li v-if="projectDetail.opened_date"><span>开盘时间：</span><b>{{projectDetail.opened_date}}</b></li>
          <li v-if="projectDetail.launch_date"><span>交房时间：</span><b>{{projectDetail.launch_date}}</b></li>
          <li v-if="projectDetail.sales_office_address" class="cur1"><span>售楼处地址：</span><b>{{projectDetail.sales_office_address}}</b></li>
          <li v-if="projectLicense.length!=0"><span>预售许可证：</span></li>
          <div class="zhengshu" v-if="projectLicense.length!=0">
            <table>
              <tr>
                <th>预售许可证</th>
                <th>发证时间</th>
                <th>对应楼栋</th>
              </tr>
              <tr v-for="item in projectLicense">
                <td>
                  <p>{{item.sales_license}}</p>
                </td>
                <td>{{item.sales_license_date}}</td>
                <td>{{item.sales_license_scope}}</td>
              </tr>
            </table>
          </div>
        </ul>
      </div>
      <div class="xinxi" v-if="type===2">
        <h3>周边设施</h3>
        <ul>
          <li>{{projectDetail.surrounding_facilities}}</li>
        </ul>
      </div>
      <div class="xinxi" v-if="type===2">
        <h3>小区规划</h3>
        <ul>
          <li v-if="projectDetail.covers_area" class="cur"><span>占地面积：</span><b>{{projectDetail.covers_area}}㎡</b></li>
          <li v-if="projectDetail.construction_area" class="cur"><span>建筑面积：</span><b>{{projectDetail.construction_area}}㎡</b></li>
          <li v-if="projectDetail.capacity_rate" class="cur"><span><i>容</i><i>积</i>率：</span><b>{{projectDetail.capacity_rate}}</b></li>
          <li v-if="projectDetail.greening_rate" class="cur"><span><i>绿</i><i>化</i>率：</span><b>{{projectDetail.greening_rate}}</b></li>
          <li v-if="projectDetail.parking" class="cur"><span><i>停</i><i>车</i>位：</span><b>{{projectDetail.parking}}</b></li>
          <li v-if="projectDetail.buildings" class="cur"><span>楼栋总数：</span><b>{{projectDetail.buildings}}</b></li>
          <li v-if="projectDetail.households" class="cur"><span><i>总</i><i>户</i>数：</span><b>{{projectDetail.households}}</b></li>
          <li v-if="projectDetail.property_company" class="cur"><span>物业公司：</span><b>{{projectDetail.property_company}}</b></li>
          <li v-if="projectDetail.property_fee" class="cur"><span><i>物</i><i>业</i>费：</span><b>{{projectDetail.property_fee}}</b></li>
          <li v-if="projectDetail.floor_height" class="cur"><span>楼层状况：</span><b>{{projectDetail.floor_height}}</b></li>
        </ul>
      </div>
      <div class="yongjing" v-if="token">
        <h3>佣金规则</h3>
        <p>{{projectDetail.commission}}</p>
      </div>
      <div class="tuijian" v-if="projectRecommended.length!=0">
        <h3>推荐</h3>
        <div class="swiper-container5" >
          <div class="wrapper">
            <div class="slide" v-for="(item,index) in projectRecommended">
              <div class="img"><img :src="item.pictures" alt="" :onerror="defaultImg" @click="tuijianFun(item)"></div>
              <div class="price">销售均价：<span>{{item.price}}元/天/㎡</span></div>
              <p><b></b>{{item.address}}</p>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="cang">
        <dl>
          <dt class="myshou" @click="shoucang($event)"></dt>
          <dd>关注</dd>
        </dl>
      </div>
      <div class="zixun">
        <a :href="project_manager_mobile">
          <dl>
            <dt></dt>
            <dd>咨询</dd>
          </dl>
        </a>
      </div>
      <div class="tel" @click="yuyueFun()">
        <b>预约看房</b>  <!-- <a :href="tel">直拨店主</a> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return{
        type: "",
        bannerIndex: "",//banner索引值
        loucengIndex:"",//楼层索引值
        title: 0,
        total: "",
        smallIndex: 1,
        bigIndex: 1,
        num2: 1,
        tag:"",
        token: "",
        titleMsg: "",
        projectId:"",//项目ID
        projectType:"",//项目类型
        houseType:"",//建筑类型
        projectLicense:"",//预售许可证
        projectPic: "",//项目图片
        projectDetail: "",//项目详情
        projectFloorPic: "",//楼层图片
        projectRecommended: "",//推荐
        project_manager_mobile:"",//项目经理电话
        defaultImg: 'this.src="' + require('../../../static/images/Merchants/err.png') + '"'
      }
    },
    mounted(){
      this.token = localStorage.token;
      this.projectId = this.$route.query.projectId || this.$route.query.id || getUrlId("referrerId");
      this.projectType = this.$route.query.projectType || this.$route.query.type || getUrlId("projectType");
      this.houseType = this.$route.query.houseType || getUrlId("houseType");
      //houseType 1商业、2办公、3住宅
      if(this.houseType == 1){
        this.type = 0;
      }else if(this.houseType == 2){
        this.type = 1;
      }else if(this.houseType == 3){
        this.type = 2;
      }
      this.init();//初始化
      this.scrollFun();//滚动后显示导航栏
    },
    updated(){
      this.mapFun();//百度地图
      this.fenxiangFun();
      var that = this;
      var swiper1 = new Swiper('.swiper-container1', {
        on: {
          slideChangeTransitionEnd: function(){
            that.bannerIndex = this.activeIndex;
            $(".swiperOne").text(1+this.activeIndex + "/" + that.total);
          }
        }
      });
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
      scrollFun(){//滚动事件
        var that = this;
        window.onscroll = function(){
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if(scrollTop >= 100){
            that.title = 1;
            $(".tel-msg").hide()
          }else{
            that.title = 0;
          }
        }
      },
      mapFun(){// 百度地图API功能
        var that = this;
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.projectDetail.lng,this.projectDetail.lat);//经度、维度
        // var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);
        map.enableScrollWheelZoom(true);
        map.disableDragging();     //禁止拖拽
        function showInfo(e){
          window.location.href = "http://api.map.baidu.com/marker?location="+that.projectDetail.lat+","+that.projectDetail.lng+"&title="+that.projectDetail.project_address+"&content="+that.projectDetail.project_address+"&output=html&src=maipubao";
        }
        map.addEventListener("click", showInfo);

      },
      loucengShow(index){//楼层弹窗显示
        var that = this;
        $(".loucengBig").show();
        console.log(index)
        that.loucengIndex = index;
        var swiper4 = new Swiper('.swiper-container4', {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          initialSlide : that.loucengIndex,
        });
      },
      loucengHide(){//楼层弹窗隐藏
        $(".loucengBig").hide();
      },
      init(){
        this.$http({
          url: this.changeData() + '/project/detail',
          method: "post",
          params: {
            cityId: sessionStorage.cityId || getUrlId("cityId"),
            projectId: this.projectId,
            projectType: this.projectType,
            houseType: this.houseType
          }
        }).then(function(res){
          console.log(res)
          this.total = res.data.projectPic.length;
          this.projectLicense = res.data.projectLicense;
          this.projectDetail = res.data.projectDetail;
          this.tag = res.data.projectDetail.tag;
          this.projectPic = res.data.projectPic;
          this.projectFloorPic = res.data.projectFloorPic;
          this.projectRecommended = res.data.projectRecommended;
          this.project_manager_mobile = "tel:" + this.projectDetail.project_manager_mobile;
          //如果关注过变换颜色
          if(this.projectDetail.is_favorite == 1){
            $(".myshou").addClass("cur")
          }

        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      fenxiangFun(){//详情分享
        var that = this;
        this.$http({
          url:this.changeData() + '/member/weChatShare',
          method: "post",
          params: {
            url : window.location.href.split('#')[0]
          }
        }).then(function(res){
          // console.log(res)
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
              title: that.projectDetail.project_name, // 分享标题
              desc: '卖铺宝', // 分享描述
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.projectPic[0].pic_path, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户点击了分享后执行的回调函数
              }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: that.projectDetail.project_name, // 分享标题
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.projectPic[0].pic_path, // 分享图标
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
      bannerSmall(){//轮播图点击缩小
        $(".bannerBig").show()
        var that = this;
        var swiper2 = new Swiper('.swiper-container2', {
          initialSlide : that.smallIndex,
          on: {
            slideChangeTransitionEnd: function(){
              that.bigIndex = this.activeIndex;
              $(".swiper-bottom").text(1+this.activeIndex + "/" + that.total);
            }
          }
        });
      },
      bannerBig(){//轮播图点击放大
        this.num2 = 1;
        $(".bannerBig").hide();
      },
      back(){
        if(this.$route.query.type == 1 && this.$route.query.url){
          this.$router.push({path:this.$route.query.url,query:{type:1}})
        }else if(getUrlId("referrerId")){
          this.$router.push({path:"/sellList"})
        }else{
          this.$router.go(-1)
        }
      },
      shoucang(e){// 点击收藏
        var that = this;
        let USERS = window.localStorage.getItem("iphone");

        if(localStorage.token){
          if($(e.srcElement).hasClass("cur")){//取消收藏
            this.$http({
              url: this.changeData() + '/project/auth/cancelFavorite',
              method: "post",
              params: {
                projectId: this.projectId
              }
            }).then(function(res){
              console.log(res)
              if(res.data.code == "101"){
                Toast('取消关注');
                $(e.srcElement).removeClass("cur")
              }
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          }else{
            this.$http({
              url: this.changeData() + '/project/auth/favorite',
              method: "post",
              params: {
                projectId: this.projectId
              }
            }).then(function(res){
              console.log(res)
              if(res.data.code == "101"){
                $(e.srcElement).addClass("cur")
                Toast('关注成功');
              }
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          }
        }else{
          this.$router.push({path:"/login"})
        }
      },
      yuyueFun(){//预约看房
        if(localStorage.token){
          this.$http({
            url: this.changeData() + "/customer/auth/list",
            method: 'post',
          }).then(res => {
            console.log(res)
            if(res.data.code == "101"){
              if(res.data.customerList.length == 0){
                this.$router.push({path:"/clientEntering",query:{projectType:this.projectType,houseType:this.houseType,projectId:this.projectDetail.projectId}})
              }else{
                this.$router.push({path:"/selectReport",query:{projectType:this.projectType,houseType:this.houseType,projectId:this.projectDetail.projectId}})
              }
            }
          }).catch(err => {
            console.log(err)
          });
        }else{
          this.$router.push({path:"/login"})
        }
      },
      tuijianFun(item){//推荐详情
        window.location.href = "http://"+window.location.host+"/sellDetail?"+"projectId="+item.projectId+"&projectType="+item.projectType+"&houseType="+item.houseType;
        window.scrollTo('0','0');
        //this.$router.push({path:"/sellDetail",query:{projectId: item.projectId,projectType:this.projectType,houseType:item.houseType}})
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

  .sellDetail{
    width: 7.5rem;
    margin: 0 auto;
    .jiantou-title{
      position: fixed;
      padding: 0 2rem;
      left: 0;
      top: 0;
      width: 3.5rem;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .34rem;
      font-weight: bold;
      background: #fff;
      z-index: 1000;
      border-bottom: .01rem solid #eaeaea;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      span{
        position: absolute;
        left: .2rem;
        top: .25rem;
        width: .36rem;
        height: .36rem;
        background: url("../../../static/images/common/back.png") no-repeat;
        background-size: .36rem .36rem;
      }
    }
    .banner{
      width: 100%;
      height: 5.62rem;
      overflow: hidden;
      position: relative;
      .jiantou{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        left: .2rem;
        top: .2rem;
        margin-top: .12rem;
        width: .58rem;
        height: .58rem;
        z-index: 999;
        background: url("../../../static/images/Merchants/back.png") no-repeat;
        background-size: .58rem .58rem;
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

      .txt{
        width: .6rem;
        height: .4rem;
        line-height: .4rem;
        position: absolute;
        text-align: center;
        bottom: .2rem;
        right: .3rem;
        background: rgba(0,0,0,.5);
        z-index: 100;
        border-radius: 1rem;
        span{
          font-size:.24rem;
          color: #fff;
        }
        span:nth-of-type(2){
          float: right;
        }
      }
    }
    .bannerBig{
      display: none;
      /*visibility: hidden;*/
      width: 7.5rem;
      height: 100% ;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      background: #010101;
      z-index: 10000;
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
          background: url("../../../static/images/common/back-white.png") no-repeat;
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
    .loucengBig{
      display: none;
      /*visibility: hidden;*/
      width: 7.5rem;
      height: 100% ;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      background: #010101;
      z-index: 10000;
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
          background: url("../../../static/images/common/back-white.png") no-repeat;
          background-size: .36rem .36rem;
        }
      }
      .swiper-container4 {
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
    .msg{
      background: #f7f8f9;
      padding-bottom: 1.5rem;
      .msg-title{
        background: #fff;
        margin-top: .2rem;
        padding-bottom: .5rem;
        h2{
          font-size:.4rem;
          font-weight: bold;
          color: #111;
          margin-bottom: .2rem;
          padding: .5rem .2rem .2rem;
        }
        .tags{
          height: .7rem;
          line-height: .7rem;
          overflow: hidden;
          margin: 0 .3rem;
          background: #fff;
          padding-bottom: .2rem;
          border-bottom: 1px solid #f5f5f5;
          .youshi{
            width: 100%;
            height: .72rem;
            display: -webkit-box;
            display: box;
            overflow-x: auto;
            span{
              display: block;
              height: .34rem;
              padding: 0 .08rem;
              line-height: .36rem;
              text-align: center;
              font-size:.24rem;
              background: #E5F1FF;
              margin-right: .2rem;
              color: #1988ef;
            }
          }
        }
      }
      .louceng{
        margin-top: .2rem;
        padding-left: .3rem;
        background: #fff;
        padding-bottom: .7rem;
        h3{
          padding: .5rem 0 .4rem;
          font-size: .34rem;
          span{

          }
        }
        .swiper-container3 {
          width: 100%;
          height: 3.3rem;
          overflow: hidden;
        }
        .wrapper{
          height: 3.5rem;
          display: box;
          display: -webkit-box;
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
        }
        .slide {
          width: 2.2rem!important;
          height: 3.25rem;
          margin-right: .4rem!important;
          text-align: center;
          border: 0.01rem solid #eaeaea;
          p{
            padding-left: .2rem;
            padding-top: .2rem;
            text-align: left;
            font-size: .28rem;
            color: #898989;
            margin-bottom: .1rem;
          }
          img{
            width: 1.8rem;
            height: 2.4rem;
          }
        }
      }
      .huxing{
        margin-top: .2rem;
        padding-left: .3rem;
        background: #fff;
        padding-bottom: .3rem;
        h3{
          padding: .5rem 0 .4rem;
          font-size: .34rem;
        }
        .swiper-container3 {
          width: 100%;
          height: 3rem;
          overflow: hidden;
        }
        .wrapper{
          height: 3.2rem;
          display: box;
          display: -webkit-box;
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
        }
        .slide {
          width: 2.4rem!important;
          height: 3rem;
          margin-right: .4rem!important;
          text-align: center;
          .img{
            width: 2.4rem;
            height: 2.4rem;
            border: 0.01rem solid #eaeaea;
            img{
              width: 2rem;
              height: 2rem;
              margin-top: .2rem;
            }
          }
          p{
            font-size: .28rem;
            margin-top: .2rem;
            &.red{
              margin-top: .1rem;
              color: #E65E47;
            }
          }
        }
      }
      .money{
        margin: 0 .3rem;
        display: flex;
        border-bottom:1px solid #f5f5f5;
        dl{
          width: 50%;
          margin: .3rem 0;
          dt{
            font-size: .28rem;
            color: #898989;
            margin-bottom:.25rem;
          }
          dd{
            font-size: .32rem;
            color: #e8584f;
          }
        }
        dl:nth-of-type(2){
          border-left: 0.01rem solid #EAEAEA;
          padding-left: .58rem;
        }
      }
      .address{
        padding: .3rem;
        div{
          margin-bottom: .15rem;
          &.cur{
            overflow: hidden;
            span{
              float: left;
            }
            b{
              margin-top: -.08rem;
              float: left;
              line-height: .5rem;
              width: 5.2rem;
            }
          }
          span,b{
            font-size: .3rem;
            color: #898989;
          }
          span{
            i{
              margin-right: .55rem;
            }
            s{
              margin-right: .14rem;
            }
          }
          b{
            color: #333;
            line-height: .35rem;
          }
        }
        .two{
          width: 2rem;
          margin-top: .6rem;
          div{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: block;
            width: 1.5rem;
            height: .46rem;
            line-height: .5rem;
            color: #fff;
            text-align: center;
            background: #64AAFF;
            border-radius: .1rem;
            font-size: .2rem;
            margin-right: .7rem;
          }
        }
        .map{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          flex: 0 0 auto;
          margin-top: .15rem;
          width: 1.4rem;
          height: .9rem;
          background: url("../../../static/images/shopDetail/map.png") no-repeat;
          background-size:  1.4rem .9rem;
          .iframe{
            width: 7.5rem;
            height: 13.3rem;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 99999;
          }
          a{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .map{
        width: 7.5rem;
        height: 3.6rem;
      }
      .xinxi{
        background: #fff;
        padding: .4rem .3rem;
        margin-top: .2rem;
        div{
          width: 6.9rem;
          border: 1px solid #BB9653;
          table{
            tr{
              th{
                width: 2rem;
                text-align: center;
                color: #fff;
                font-size: .3rem;
                height: .72rem;
                line-height: .72rem;
                background: #D3B172;
                &:nth-of-type(1){
                  width: 2.9rem;
                }
              }
              td{
                text-align: center;
                height: 1.4rem;
                font-size: .3rem;
                background: #F9F6EF;
              }
            }
          }
        }
        h3{
          font-size: .34rem;
          height: .34rem;
          line-height: .34rem;
          color: #111;
          font-weight:bold;
          margin-bottom: .3rem;
        }
        ul{
          li{
            font-size: .3rem;
            margin-bottom: .2rem;
            overflow: hidden;
            &.cur{
              span{
                float: left;
                width: 1.5rem;
              }
              &>b{
                margin-top: -.08rem;
                float: left;
                line-height: .5rem;
                width: 5rem;
              }
            }
            &.cur1{
              span{
                float: left;
                width: 1.9rem;
              }
              b{
                margin-top: -.08rem;
                float: left;
                line-height: .5rem;
                width: 5rem;
              }
            }
            &.cur1>b{

            }
            .more{
              text-align: justify;
              float: left;
              width: 5.3rem;
            }
            .mores{
              text-align: justify;
              float: left;
              width: 3.9rem;
            }
            span{
              float: left;
              color: #898989;
              b{
                color: #898989;
                margin-right: .6rem;
              }
              i{
                color: #898989;
                margin-right: .15rem;
              }
            }
            b{
              color: #333;
            }
          }
        }
      }
      .yongjing{
        background: #fff;
        padding: .4rem .3rem;
        margin-top: .2rem;
        h3{
          font-size: .34rem;
          height: .34rem;
          line-height: .34rem;
          color: #111;
          font-weight:bold;
          margin-bottom: .5rem;
        }
        p{
          font-size: .3rem;
          line-height: .5rem;
          text-indent: 2em;
        }
      }
      .tuijian{
        margin-top: .2rem;
        padding-left: .3rem;
        background: #fff;
        padding-bottom: .7rem;
        h3{
          padding: .5rem 0 .4rem;
          font-size: .34rem;
        }
        .swiper-container5 {
          /*width: 100%;*/
          height: 4rem;
          overflow: hidden;
        }
        .wrapper{
          height: 4.2rem;
          display: box;
          display: -webkit-box;
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
        }
        .slide {
          width: 3.7rem!important;
          height: 3.25rem;
          margin-right: .2rem!important;
          text-align: center;
          p{
            padding-top: .2rem;
            text-align: left;
            font-size: .28rem;
            color: #898989;
            margin-bottom: .1rem;
            b{
              display: inline-block;
              vertical-align: middle;
              margin-right: .1rem;
              width: .28rem;
              height: .28rem;
              background: url("../../../static/images/Merchants/dingwei.png") no-repeat;
              -webkit-background-size: .28rem .28rem;
              background-size: .28rem .28rem;
            }
          }
          .img{
            img{
              width: 3.7rem;
              height: 2.78rem;
            }
          }
          .price{
            font-size: .28rem;
            margin-top: .2rem;
            text-align: left;
            span{
              color: #E65E47;
            }
          }
        }
      }
    }
    .footer{
      width: 7.5rem;
      position: fixed;
      bottom: 0;
      //left: 0;
      height: 1.1rem;
      line-height: 1.1rem;
      display: flex;
      z-index: 9999;
      .cang,.zixun{
        background: #fff;
        width: 1.4rem;
        dl{
          width: 1.4rem;
          margin: .2rem 0;
          box-sizing: border-box;
          border-right: 1px solid #f5f5f5;
          dt{
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            margin-left: 0.5rem;
            width: .42rem;
            height: .40rem;
            margin-bottom: .1rem;
            background: url("../../../static/images/Merchants/shoucang.png") no-repeat;
            background-size: .42rem .40rem;
            &.cur{
              background-image: url("../../../static/images/Merchants/shoucang-bg.png");
            }
          }
          dd{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            height: .2rem;
            line-height: .2rem;
            font-size: .2rem;
            text-align: center;
          }
        }
      }
      .zixun{
        a{
          display: block;
          width: 1.4rem;
          height: 1.1rem;
        }
        dl{
          dt{
            background: url("../../../static/images/Merchants/zixun.png") no-repeat;
            background-size: .42rem .40rem;
          }
        }
      }
      .tel{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        text-align: center;
        background: #64aaff;
        width:4.7rem;
        height: 1.1rem;
        position: relative;
        .tel-msg{
          width: 5rem;
          height: .6rem;
          line-height: .6rem;
          color: #fff;
          font-size: .22rem;
          background: #93C5FF;
          position: absolute;
          right: .55rem;
          top: -.8rem;
          border-radius: .05rem;
          .jiao{
            position: absolute;
            top: .6rem;
            left: 50%;
            margin-left: -.1rem;
            width: 0;
            height: 0;
            border: .15rem solid #93C5FF;
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
          }
        }
        span{
          display: inline-block;
          width: .36rem;
          height: .38rem;
          background: url("../../../static/images/shopDetail/tel.png") no-repeat;
          background-size: .36rem .38rem;
          vertical-align: -.1rem;
          margin-right: .2rem;
        }
        b{
          color: #fff;
          font-size: .34rem;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        a{
          font-size: .32rem;
          color: #fff;
        }
      }
    }
  }
</style>
