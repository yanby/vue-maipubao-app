<template>
    <div class="addBrandUser">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">增加品牌联系人</h2>
        </div>
        <div class="addBrandUserTop">
            <p>若您是该品牌的联系人，可直接进行增加品牌联系人。增加后您可以进行品牌信息修改</p>
        </div>

        <div class="addUser">
            <ul class="clearfix">
                <li class="clearfix">
                    <p><i></i>品牌名称：</p>
                    <h5>{{brandName}}</h5>
                    <h6>品牌名称不可更改</h6>
                </li>
                <li class="clearfix">
                    <p><i>*</i>联系电话：</p>
                    <input type="tel" name="" class="login_code" v-model="userTel" placeholder="请输入联系人电话" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11">
                </li>
                <li>
                    <p><i>*</i>联系人姓名：</p>
                    <input type="text" name="" class="login_code" v-model="userName" placeholder="请输入联系人姓名" maxlength="10">
                </li>
                <li>
                    <p><i>*</i>负责区域：</p>
                    <span class="areaTxtWidth" @click="areaResponsible()">{{areaTxtStr}}</span><b class="areaTxtDot"></b>
                </li>
                <li class="lastLi">
                    <p><i>*</i>职&emsp;&emsp;位：</p>
                    <span @click="showPostListWrap = true">{{postTxt}}</span><b></b>
                </li>   
            </ul>
        </div>

        <div class="brandBtn">
            <span @click="brandBtn()">提交</span>
        </div>

        <!-- 请选择职位 -->
        <div class="expandAreaWrap postListWrap"v-if="showPostListWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="showPostListWrap = false">取消</p>请选择职位</h3>
                <ul>
                    <li v-for="(item,index) in postListArr">
                        <span :class="{changeBlue:showPostChangeBlue == index}" @click="postListBtn(item.d_value,index,item.d_name)">{{item.d_name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 负责人拓展区域 -->
        <div class="expandAreaWrap" v-if="showPostExpandAreaWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="areaCancel()">取消</p>请选择品牌拓展区域<h5 @click="areaDefine()">确定</h5></h3>
                <ul>
                    <li v-for="(item,index) in expandAreasArr">
                        <span @click.stop="postExpandAreasBtn($event,item.regions_id,item.id,item.area_name)">{{item.area_name}}</span>
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
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
name: "addBrandUser",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "110000", // 全局省Id
            userTel: '',
            userName: '',
            brandId: '',
            brandName: '',
            // 职位
            showPostListWrap: false,     
            showPostChangeBlue: 0, 
            postListArr: [],
            postTxt: "请选择职位",
            postListId:"",
            // 区域
            showPostExpandAreaWrap: false, 
            expandAreasArr:[], 
            areaArr: [], 
            strAreaId: "",
            areaTxtArr: [],
            areaTxt: "",
            areaTxtStr: "请选择拓展区域", // 拓展区域展示 
            areaTxtId: "", // 区域id 传给后台
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/brandDetails',query:{id: this.brandId}});       
        },

        // 增加品牌联系人
        brandBtn(){
            let _this = this;
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;

            if(this.userName == '' || this.userTel == '' || this.postListId == '' || this.areaTxtId == ''){
                Toast({
                    message: '请输入必填项内容',
                    duration: 3000
                });
            }else if(!reg.test(this.userTel)){
                Toast({
                    message: '请输入正确的手机号',
                    duration: 3000
                });
            }else{
                Indicator.open({
                    text: '上传中...',
                    spinnerType: 'fading-circle'
                });
                let url = this.changeData() + '/brand/auth/createContact'
                axios(url,{
                    method: 'post',
                    params: {
                        "provinceId": this.sessionProvinceId,
                        "cityId": this.sessionCityId,
                        "brandDatabaseId": this.brandId,  // 品牌ID
                        "mobile": this.userTel,
                        "userName": this.userName,
                        "post": this.postListId,//【岗位】
                        "brandContactsArea": this.areaTxtId,//【管理区域】
                    }
                }).then(data => {
                    // console.log(data);
                    if(data.data.code == "101"){
                        Indicator.close();
                        Toast({
                            message: data.data.message,
                            duration: 3000
                        });
                        this.$router.push({path: '/brandDetails',query:{id: _this.brandId}});
                    }else if(data.data.code == "102"){
                        Indicator.close();
                        Toast({
                            message: data.data.message,
                            duration: 3000
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }            
        },

        // 职位
        postListBtn(id,index,name){
            // console.log(id);
            this.postListId = id;
            // console.log(this.postListId);
            this.showPostChangeBlue = index;
            this.showPostListWrap = false;
            this.postTxtShow = false;
            this.postTxt = name;
        },

        // 点击负责区域
        areaResponsible(){
            this.areaArr = [],
            this.strAreaId = "",
            this.areaTxt = "",
            this.areaTxtArr = [],
            this.showPostExpandAreaWrap = true;   
        },
        // 取消
        areaCancel(){
            this.showPostExpandAreaWrap = false;  
        },
        // 确定
        areaDefine(){
            if(this.areaTxt == ""){
                this.areaTxtStr = "请选择拓展区域";
            }else{
                this.areaTxtStr = this.areaTxt;
                this.areaTxtId = this.strAreaId;
                // console.log(this.areaTxtStr);
                // console.log(this.areaTxtId);
            }   
            this.showPostExpandAreaWrap = false;   
        },

        // 添加联系人区域
        postExpandAreasBtn(e,regionsId,id,name){
            if(e.target.className.indexOf("changeColor") == -1) {
                e.target.className = "spanColor changeColor"; //切换按钮样式
                var str = regionsId+"-"+id;
                this.areaArr.push(str);
                this.strAreaId = this.areaArr.join(";");
                // console.log(this.strAreaId);
                // cityName
                var areaName = name;
                this.areaTxtArr.push(areaName);
                this.areaTxt = this.areaTxtArr.join("、");
                // console.log(this.areaTxt);
            }else{
                e.target.className = "spanColor";//切换按钮样式
                //写逻辑
                var str = regionsId+"-"+id;
                var array = this.areaArr;
                var index = array.indexOf(str);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.areaArr = array;
                this.strAreaId = this.areaArr.join(";");
                // console.log(this.strAreaId);

                // cityName 
                var areaName = name;
                var areaNameArray = this.areaTxtArr;
                // console.log(areaNameArray);
                var areaNameIndex = areaNameArray.indexOf(areaName);
                // console.log(areaNameIndex);
                if (areaNameIndex > -1) {
                    areaNameArray.splice(areaNameIndex, 1);
                }
                this.areaTxtArr = areaNameArray;
                // console.log(this.areaTxtArr);
                this.areaTxt = this.areaTxtArr.join("、");
                // console.log(this.areaTxt);
            }
        },

        // 下拉数据接口调用
        brandListData(){
            let _this = this
            let url = this.changeData() + '/brand/brandReleasedPage'
            axios(url,{
                method: 'post',
            }).then(data => {
                // console.log(data);               
                // 职位
                this.postListArr = data.data.brandPostList;
                // 负责区域
                this.expandAreasArr = data.data.expandAreaList;

            }).catch(err => {
                console.log(err)
            });
        },

    },
    mounted() {
        this.sessionCityId = sessionStorage.cityId;
        // console.log(this.sessionCityId);
        this.sessionProvinceId = sessionStorage.provinceId;
        // console.log(this.sessionProvinceId);
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

        this.brandId = request['id']; 
        this.brandName = request['brandName'];
        // console.log(this.brandId);
        // console.log(this.brandName); 
        this.brandListData();                  
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";

.addBrandUser{
    width: 7.5rem;
    margin: 0 auto;
}
.addBrandUserTop{
    padding-top: .9rem;
    p{
        color: #898989;
        font-size: .28rem;
        text-align: justify;
        margin: .4rem .3rem;
        line-height: .5rem;
    }
}
.addUser{
    width: 7.5rem;
    margin: .14rem 0;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    ul{
        width: 6.9rem;
        margin-left: .3rem;
        li{
            line-height: .88rem;
            font-size: .3rem;
            border-bottom: 1px solid #eaeaea;
            color: #333;
            height: .88rem;
            p{
                float: left;
                i{
                    color: #FF5245;
                }
            }
            input{
                /*position: relative;
                top: -.04rem;*/
                font-size: .28rem;
                line-height: .4rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            b{
                display: inline-block;
                width:0;
                height:0;
                border-width: .1rem .08rem 0;
                border-style:solid;
                border-color: #111 transparent transparent;
                position:relative;
                left: .1rem;
                top: -.06rem;
            }
            h5{
                float: left;
            }
            h6{
                float: right;
                color: #d3d6dd;
                color: .28rem;
            }
            .areaTxtWidth{
                height: .6rem;
                max-width: 3rem;
                display: inline-block;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
        .lastLi{
            border-bottom: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }
}
.brandBtn{
    margin: 3.8rem .3rem 0 .3rem;
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
/* 下拉 */
.expandAreaWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 999999999;
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
    .expandArea{
        width: 7.5rem;
        height: 5.64rem;
        position: absolute;
        bottom: 0;
        background: #fff;
        h3{
            height: .9rem;
            line-height: .3rem;
            color: #333;
            font-size: .3rem;
            text-align: center;
            position: relative;
            line-height: .9rem;
            border-bottom: 1px solid #eaeaea;
            p{
               position: absolute;
               left: .6rem;
               color: #898989;
            }
            h5{
                position: absolute;
                right: .6rem;
                color: #64abff;
                top: 0;
            }
        }
        ul{
            width: 7.5rem;
            height: 4.74rem;
            background: #fff;
            overflow-x: auto;
            padding-top: .14rem;
            li{
                line-height: .8rem;
                color: #333;
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
                .spanColor{
                    display: inline-block;
                    color: #333;
                }
                .changeColor{
                    display: inline-block;
                    color: #64abff;
                }
            }
        }
    }
}
</style>
