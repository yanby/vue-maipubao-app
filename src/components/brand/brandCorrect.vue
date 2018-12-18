<template>
    <div class="brandCorrect">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">品牌纠错</h2>
        </div>
        <div class="brandCorrectTop">
            <h3>纠错奖励流程</h3>
            <dl>
                <dt><img src="../../../static/images/brand/progressBar.png"></dt>
                <dd>
                    <p class="fl">纠错有误信息</p>
                    <p class="fr">等待优铺审核</p>
                </dd>
            </dl>
        </div>
        <div class="brandCorrectBox">
            <dl>
                <dt>
                    <!-- <img src="../../../static/images/brand/brand.png"> -->
                    <img :src="this.brandLogo" :onerror="defaultImg">
                </dt>
                <dd>
                    <ul>
                        <li><span>品牌名称：</span>{{brandDetailsObj.brand_name}}</li>
                        <li><span>品牌业态：</span>{{brandDetailsObj.brand_business}}</li>
                        <li><span>扩展区域：</span>{{brandDetailsObj.expand_area}}</li>
                    </ul>
                    <div class="brandLabel">
                        <p>
                            <!-- <span>{{brandDetailsObj.brand_positioning}}</span> -->
                            <span>全国连锁</span>
                        </p>
                    </div>
                </dd>                            
            </dl>   
        </div>

        <div class="brandCorrectInfo">
            <h3>纠错信息</h3>
            <ul>
                <li>
                    <span>负责人姓名</span>
                    <!-- <input type="text"> -->
                    <input type="text" name="" class="login_code" v-model="userName" maxlength="10">
                </li>
                <li>
                    <span>联系电话</span>
                    <input type="tel" name="" class="login_code" v-model="userTel" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11">
                </li>
                <li>
                    <span>负责区域</span>
                    <p @click="areaResponsible()">
                        <span class="colorTxt" style="font-size: .28rem;">{{areaTxtStr}}</span>
                        <img src="../../../static/images/brand/pulldown.png">
                    </p>
                </li>
                <li>
                    <span>职务</span>
                    <p @click="showPostListWrap = true">
                        <span class="colorTxt" style="font-size: .28rem;">{{postTxt}}</span>
                        <img src="../../../static/images/brand/pulldown.png">
                    </p>
                </li>
            </ul>
        </div>

        <!-- 请选择职位 -->
        <div class="expandAreaWrap postListWrap" @click="showPostListWrap = false" v-if="showPostListWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="showPostListWrap = false">取消</p>请选择职位</h3>
                <ul>
                    <li v-for="(item,index) in postListArr">
                        <span :class="{changeBlue:showChangeBlue == index}" @click="postListBtn(item.d_value,index,item.d_name)">{{item.d_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 拓展区域 -->
        <div class="expandAreaWrap" v-if="showPostExpandAreaWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="areaCancel()">取消</p>请选择品牌拓展区域<h5 class="defineBtn" @click="areaDefine()">确定</h5></h3>
                <ul>
                    <li v-for="item in expandAreasArr">
                        <span class="spanColor" @click.stop="postExpandAreasBtn($event,item.regions_id,item.id,item.area_name)">{{item.area_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="brandBtn">
            <span @click="brandCorrectBtn()">提交</span>
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
name: "brandCorrect",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "110000", // 全局省Id
            userName: "",
            userTel: "",    
            brandContactsId: "", 
            brandId: "",
            brandDetailsObj: {},
            expandAreasArr: [], // 区域
            postListArr: [], // 职位
            showPostListWrap: false, // 职位
            showPostExpandAreaWrap: false, // 区域
            // 负责区域
            areaArr: [],
            strAreaId: "",
            areaTxt: "",
            areaTxtArr: [],
            areaTxtStr: "", // 拓展区域展示 
            areaTxtId: "", // 区域id 传给后台
            // 职位
            showChangeBlue: 0,
            postId: "", 
            postTxt: "",
            // logo
            brandLogo: "",
            defaultImg: 'this.src="' + require('../../../static/images/Merchants/err.png') + '"', //默认图片
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/brandDetails',query:{id:this.brandId}});       
        },
        // 品牌列表
        brandCorrectBtn(){
            let _this = this;
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;

            if(this.userName == '' || this.userTel == '' || this.postId == '' || this.areaTxtId == ''){
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
                let url = this.changeData() + '/brand/auth/createContactError'
                axios(url,{
                    method: 'post',
                    params: {
                        "brandContactsId": this.brandContactsId,  // 品牌联系人ID
                        "provinceId": this.sessionProvinceId, // 省ID
                        "cityId": this.sessionCityId, // 城市ID
                        "mobile": this.userTel,
                        "userName": this.userName,
                        "post": this.postId,
                        "brandContactsArea": this.areaTxtId  //【管理区域】
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

        // 接口调用
        brandDetailsData(){
            let _this = this
            let url = this.changeData() + '/brand/detail'
            axios(url,{
                method: 'post',
                params: {
                    id: _this.brandId,
                }
            }).then(data => {
                // console.log(data);
                this.brandDetailsObj = data.data.detail;  
                this.brandLogo = data.data.brandPic[0];       
            }).catch(err => {
                console.log(err)
            });
        },

        // 初始数据
        postData(){
            let _this = this
            let url = this.changeData() + '/brand/brandReleasedPage'
            axios(url,{
                method: 'post',
            }).then(data => {
                // console.log(data);
                // 拓展区域
                this.expandAreasArr = data.data.expandAreaList;
                // 职位
                this.postListArr = data.data.brandPostList;
                
            }).catch(err => {
                console.log(err)
            });
        },
        postListBtn(id,index,name){
            // console.log(name);
            this.showChangeBlue = index;
            this.showPostListWrap = false;
            this.postId = id;
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
                this.areaTxtStr = "";
            }else{
                this.areaTxtStr = this.areaTxt;
                this.areaTxtId = this.strAreaId;
                // console.log(this.areaTxtStr);
                // console.log(this.areaTxtId);
            }   
            this.showPostExpandAreaWrap = false;   
        },

        // 拓展区域
        postExpandAreasBtn(e,regionsId,id,name){
            // console.log(name);
            // this.areaTxt = name;
            if(e.target.className.indexOf("changeColor") == -1) {
                e.target.className = "spanColor changeColor"; //切换按钮样式
                // id
                var str = regionsId+"-"+id;
                // console.log(this.areaTxtArr);
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
                //id
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

        this.brandContactsId = request['id']; 
        this.brandId = request['brandId']; 

        this.brandDetailsData(); 
        this.postData();   
   	             
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
input,button{-webkit-appearance:none;outline:none}
.brandCorrect{
    width: 7.5rem;
    padding-top: .9rem;
    margin: 0 auto;
}
.brandCorrectTop{
    padding: .4rem .3rem 0 .3rem;
    h3{
        color: #333;
        font-size: .34rem;

    }
    dl{
        dt{
            margin: .4rem 0 .14rem .85rem;
            img{
                width: 5.12rem;
                height: .58rem;
            }
        }
        dd{
            width: 6rem;
            margin-left: .4rem;
            p{
                color: #333;
                font-size: .24rem;
            }
        }
    }
}
.brandCorrectBox{
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
                    font-size: .28rem;
                    margin-bottom: .06rem;
                    width: 4rem;
                    color: #333;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    span{
                        display: inline-block;
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
.brandCorrectInfo{
    width: 6.9rem;
    padding: .4rem .3rem 1.24rem .3rem;
    h3{
        color: #333;
        font-size: .34rem;
        margin-bottom: .4rem;
    }
    ul{
        width: 5.9rem;
        height: 3.8rem;
        background: #fff;
        padding: .4rem .5rem .0rem .5rem;
        border-radius: 6px;
        box-shadow: 2px 0px 12px rgba(228,228,228,3);
        li{
            width: 5.9rem;
            height: .6rem;
            margin-bottom: .3rem;
            span{
                color: #333;
                font-size: .3rem;
                display: inline-block;
                width: 1.55rem;
                text-align: right;
                margin-right: .2rem;
                position: relative;
                top: .04rem;
                float: left;
            } 
            input{
                width: 4rem;
                height: .56rem;
                border-radius: 6px;
                border: 1px solid #e4e4e4;
                font-size: .3rem;
                color: #333;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                outline: none;
                float: left;
            }
            p{
                width: 4rem;
                height: .56rem;
                border-radius: 6px;
                border: 1px solid #e4e4e4;
                font-size: .3rem;
                color: #333;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                float: left;
                position: relative;
                img{
                    width: .32rem;
                    height: .18rem;
                    position: absolute;
                    right: .2rem;
                    top: .2rem;
                }
                .colorTxt{
                    width: 3rem;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    text-align: left;
                    line-height: .5rem;
                    font-size: .18rem;

                }
            }
        }
    }
}
/* 区域下拉 */
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
                font-size: .3rem;
                text-align: center;       
                -webkit-tap-highlight-color: rgba(0,0,0,0);        
                /*span{
                    display: inline-block;
                    line-height: .8rem;
                    font-size: .3rem;
                }*/
                .spanColor{
                    display: inline-block;
                    line-height: .8rem;
                    color: #333;                  
                }
                .changeColor{
                    display: inline-block;
                    line-height: .8rem;
                    color: #64abff;
                }
            }
        }
    }
}
.postListWrap{
    .changeBlue{
        color: #7ab5ff;
    }
}
.brandBtn{
    margin: 0rem .3rem 0 .3rem;
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
    }
}
</style>
