<template>
    <div class="mapSeekShop">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">地图找房</h2>
        </div>
        <div id="container"></div>
        <!-- <div class="containerTab"> -->
        <ul  class="containerTab">
            <li @click="sellBtn" :class="{'lastLi':tab===0}">销售</li>
            <li @click="merchantsBtn" :class="{'lastLi':tab===1}">招商</li>
        </ul>
        <!-- </div> -->
    </div>  
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "mapSeekShop",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "11000", // 全局省Id
            seekMapArr: [],  
            tab: 1
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/home'});            
        },
        seekMapData(type){
            let url = this.changeData() + '/project/projectOnMap'
            axios(url,{
                method: 'post',
                params: {
                    cityId: this.sessionCityId || 110100, //所属城市【必传】
                    projectType: type, // 项目类型【必传】，1是销售、2是招商
                }
            }).then(data => {
                // console.log(data);
                var lnglats = data.data.projectList;
                var mapLat = data.data.projectList[0].lat;
                var mapLng = data.data.projectList[0].lng;
                // console.log(mapLat,mapLng);
                // console.log(this.seekMapArr);
                // 百度地图API功能
                var mp = new BMap.Map("container");
                mp.centerAndZoom(new BMap.Point(mapLng, mapLat), 11);
                mp.enableScrollWheelZoom();
                var geoc = new BMap.Geocoder();//逆地址解析
                // 复杂的自定义覆盖物
                function ComplexCustomOverlay(point, text){
                    this._point = point;
                    this._text = text;
                }
                // 继承API的BMap.Overlay 
                ComplexCustomOverlay.prototype = new BMap.Overlay();
                // 实现初始化方法 
                ComplexCustomOverlay.prototype.initialize = function(map){
                    this._map = map;
                    var div = this._div = document.createElement("div");
                    div.style.position = "absolute";
                    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                    div.style.backgroundColor = "#84C0F7";
                    div.style.border = "1px solid #84C0F7";
                    div.style.color = "white";
                    div.style.height = ".4rem";
                    div.style.borderRadius = "5px";
                    div.style.padding = ".02rem .05rem";
                    div.style.lineHeight = ".4rem";
                    div.style.whiteSpace = "nowrap";
                    div.style.MozUserSelect = "none";
                    div.style.fontSize = ".24rem"
                    var span = this._span = document.createElement("span");
                    div.appendChild(span);     
                    span.appendChild(document.createTextNode(this._text));
                    var that = this;

                    var arrow = this._arrow = document.createElement("div");
                    arrow.style.background = "url(../../../static/images/home/blueSquare.png) no-repeat";
                    arrow.style.position = "absolute";
                    arrow.style.width = ".8rem";
                    arrow.style.height = ".2rem";
                    arrow.style.top = ".42rem";
                    arrow.style.left = "50%";
                    arrow.style.marginLeft = "-.1rem";
                    arrow.style.overflow = "hidden";
                    div.appendChild(arrow);

                    mp.getPanes().labelPane.appendChild(div);

                    return div;
                }
                // 实现绘制方法
                ComplexCustomOverlay.prototype.draw = function(){
                    var map = this._map;
                    // 根据地理坐标转换为像素坐标，并设置给容器
                    var pixel = map.pointToOverlayPixel(this._point);
                    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
                    this._div.style.top  = pixel.y - 30 + "px";
                }
                //在调用聚合方法时会将会调用标注的getPosition方法
                //获取该覆盖物的位置
                ComplexCustomOverlay.prototype.getPosition = function () {       
                    return this._point;
                };
                // 自定义覆盖物添加事件方法
                ComplexCustomOverlay.prototype.addEventListener = function (event, fun) {
                    this._div['on' + event] = fun;
                }
            
                for (var i = 0; i < lnglats.length; i++) {
                    //测试定位//开始自定义覆盖物
                    var typeName;
                    if(lnglats[i].projectType == 1){
                        typeName = "销售";
                    }else{
                        typeName = "招商";
                    }

                    var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(lnglats[i].lng,lnglats[i].lat), typeName+"-"+lnglats[i].projectName,lnglats[i].projectId);
                    // console.log(myCompOverlay);
                    mp.addOverlay(myCompOverlay);  // 将标注添加到地图中
                    //显示定位图标   
                    myCompOverlay.addEventListener("touchend", createClickEvent(lnglats[i].projectId,lnglats[i].projectType,lnglats[i].houseType)); //覆盖物点击事件
                }
                //不使用覆盖物，使用百度标注
                // var marker = new BMap.Marker(new BMap.Point(104.082042, 30.663608));  // 创建标注
                // mp.addOverlay(marker);
                // marker.addEventListener("touchend", createClickEvent(marker));
                function createClickEvent(id,type,houseType){
                    return function (e) {
                        if(type == 1){
                            window.location.href = "./sellDetail?id="+id+"&url=mapSeekShop&type=1&houseType="+houseType;
                        }else{
                            window.location.href = "./merchantsDetail?id="+id+"&url=mapSeekShop&type=2&houseType="+houseType;
                        }
                    }
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 点击销售按钮
        sellBtn(){
            this.tab = 1;
            this.seekMapData(1);
        },
        // 点击招商按钮
        merchantsBtn(){
            this.tab = 0;
            this.seekMapData(2);
        }
    },
    mounted() {
        this.sessionCityId = sessionStorage.cityId;
        this.sessionProvinceId = sessionStorage.provinceId;

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
                this.tab = 1;
                this.seekMapData(1);
            }else if(typeIndex == "2"){
                this.tab = 0;
                this.seekMapData(2);
            }
        }else{
            this.seekMapData(1);
        }
    },
    created(){ 
        
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css"; 

.mapSeekShop{
   width: 7.5rem;
   margin: 0 auto;
}
#container{
    width: 7.5rem;
    margin: 0 auto;
}
.containerTab{
    width: 2.3rem;
    height: .4rem;
    border: 1px solid #ebebeb;
    position: fixed;
    bottom: .72rem;
    left: .3rem;
    background: #fff;
    padding-top: .1rem;
    padding-bottom: .1rem;
    border-radius: 6px;
    box-shadow: 2px 0px 12px rgba(254,254,254,.6);
    li{
        width: 50%;          
        color: #84C0F7;
        float: left;
        text-align: center;
        font-size: .28rem;

    }
    .lastLi{
        color: #666;
        border-left: 1px solid #ebebeb;
        box-sizing: border-box;
    }
}
</style>
