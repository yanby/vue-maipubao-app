<template>
    <div class="publishSell">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">发布招商</h2>
        </div> 
        <div class="uploadWrap">
            <div class="uploadImg">
                <h3><i>*</i>上传图片:</h3>
                <div class="uploadBox">
                    <div class="add-img" v-show="imgList.length">
                        <!-- <p class="font14">图片(最多3张，还可上传<span v-text="3-imgList.length"></span>张)</p> -->
                        <ul class="img-list">
                            <li v-for="(url,index) in imgList">
                                <img class="del" src="../../../static/images/publish/blueClose.png" @click.stop="delImg(index)"/> 
                                <img :src="url.file.src" class="upImg">
                            </li>
                        </ul>
                    </div>
 
                    <input @change="fileChange($event)" type="file" accept="image/*" id="upload_file" multiple style="display: none"/>
                    <div class="add" @click="chooseType" v-if="imgList.length < 3">
                        <img src="../../../static/images/brand/uploadPhoto.png">
                    </div>
                </div>
            </div>
            <div class="publishBox">
                <ul>
                    <li>
                        <p><i>*</i><span>类&emsp;&emsp;型:</span></p>
                        <h5><b @click="selectionIndex1()"><img :src="selectionIndexImg1"></b>商业</h5>
                        <h5><b @click="selectionIndex2()"><img :src="selectionIndexImg2"></b>办公产业</h5>
                    </li>
                    <li>
                        <p><i>*</i><span>项目名称:</span></p>
                        <input type="" name="" v-model="projectName" placeholder="请输入项目名称" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="15">
                    </li>
                    <li>
                        <p><i>*</i><span>平均租金:</span></p>
                        <input type="tel" name="" v-model="commercePrice" placeholder="请输入招商平均租金" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="10">
                        <h6>（元/天/㎡）</h6>
                    </li>
                    <li>
                        <p><i>*</i><span>建筑面积:</span></p>
                        <input type="tel" name="" v-model="commerceArea" placeholder="请输入面积" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="10">
                        <h6>㎡&nbsp;&nbsp;</h6>
                    </li>
                    <li>
                        <p><i>*</i><span>详细地址:</span></p>
                        <input type="" name="" v-model="address" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" placeholder="请输入详细地址" maxlength="20">
                    </li>
                </ul>
                <dl>
                    <dt>描述:</dt>
                    <dd>
                        <textarea maxlength="200" v-model="describe" placeholder="请输入项目详细情况"></textarea>
                    </dd>
                </dl>
            </div>
            <div class="uploadBottom">
                <dl>
                    <dt @click="selectBtn = true" v-if="selectBtn==false"><img src="../../../static/images/mine/round.png"></dt>
                    <dt @click="selectBtn = false" v-else><img src="../../../static/images/mine/selected.png"></dt>
                    <dd>我已阅读并同意《<span @click="agreemenBtn()">需求发布协议</span>》</dd>
                </dl>
                
                <p class="submitbtn" @click="submitbtn()">确认发布招商</p>
                
            </div>     
        </div> 
        <!-- 弹窗提示 -->
        <div class="promptWrap" v-if="showPromptWrap">
            <div class="promptBox">
                <p>确定要取消发布吗？</p>
                <ul>
                    <li class="li1" @click="goPublishCancel()">取消</li>
                    <li class="li2" @click="goPublish()">确定</li>
                </ul>
            </div>
        </div> 
        <!-- 协议 -->
        <div class="protocolsWrap" v-if="protocolsWrap">
            <div class="protocolsBoxWrap">
                <img src="../../../static/images/publish/blueClose.png" class="blueCloseImg" @click="agreementClose()">
                <div class="protocolsBox">
                    <!-- <h3>需求发布协议</h3> -->
                    <p v-html="agreementInfo"></p>
                </div>
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
name: "publishSell",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "110000", // 全局省Id

            chatImgUrl: "../../../static/images/brand/uploadPhoto.png",

            imgList: [],
            size: 0,
            limit:3, //限制图片上传的数量

            projectName: "", // 项目名称
            commercePrice: "", // 销售价格
            commerceArea: "", // 面积
            address: "",//地址
            describe: "",  //描述

            selectionIndex: "1", 
            selectionIndexImg1: "../../../static/images/publish/blueCircle.png",
            selectionIndexImg2: "../../../static/images/publish/circle.png",

            host: "",
            policy: "",
            signature: "",
            accessid: "",
            dir: "",
            expire: "",
            // fileList: "",     
            //imgList: "",
            callback: "",

            upImgArr: [],

            imgArr: [],

            // 协议
            protocolsWrap: false,
            selectBtn: true,

            // 弹窗
            showPromptWrap: false, // 提示弹窗 
            typeUrl: "",

            // 协议内容
            agreementInfo: ""

        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){  
            $('body').css({
             "overflow": "hidden",
            })
            $('html').css({
             "overflow": "hidden",
            })    
            this.showPromptWrap = true;     
        },
        goPublish(){
            $('body').css({
                "overflow": ""
            })
            $('html').css({
                "overflow": ""
            })
            if(this.typeUrl == 'merchantsList'){
                this.$router.push({path: "/merchantsList"});  
            }else if(this.typeUrl == 'publish'){
                this.$router.push({path: "/publish"}); 
            }else{
                this.$router.push({path: "/publish"}); ; 
            }
        },
        goPublishCancel(){
            $('body').css({
                "overflow": ""
            })
            $('html').css({
                "overflow": ""
            })
            this.showPromptWrap = false;
        },

        selectionIndex1(){
            this.selectionIndex = 1;
            // console.log(this.selectionIndex);
            this.selectionIndexImg1 = '../../../static/images/publish/blueCircle.png';
            this.selectionIndexImg2 = '../../../static/images/publish/circle.png';
        },
        selectionIndex2(){
            this.selectionIndex = 2;
            // console.log(this.selectionIndex);
            this.selectionIndexImg2 = '../../../static/images/publish/blueCircle.png';
            this.selectionIndexImg1 = '../../../static/images/publish/circle.png';
        },

        submitbtn(){        
            let _this = this;
            // console.log(this.imgArr);
            if(this.selectionIndex == "" || this.projectName == "" || this.commercePrice == "" || this.commerceArea == "" || this.address == "" || this.imgList.length == 0){
                Toast({
                    message: '请输入必填项内容',
                    duration: 3000
                });
            }else if(this.selectBtn == false){
                Toast({
                    message: '请同意需求发布协议',
                    duration: 3000
                });
            }else{
                
                _this.disabled = true;

                Indicator.open({
                    text: '上传中...',
                    spinnerType: 'fading-circle'
                });

                for (var i = 0; i < _this.imgArr.length; i++) {
                    var ossData = new FormData();
                    ossData.append('OSSAccessKeyId', _this.accessid);
                    ossData.append('policy', _this.policy);
                    ossData.append('Signature', _this.signature);
                    ossData.append('key', _this.dir + _this.random_string(32));
                    ossData.append('success_action_status', 200); // 指定返回的状态码
                    ossData.append("callback", _this.callback);
                    ossData.append("file", _this.imgArr[i].file);
                    this.$http.post(this.host, ossData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then(ret => {
                        // console.log(ret);
                        var arr = "/" + ret.data.fileName;
                        _this.upImgArr.push(arr); 
                        // console.log(_this.upImgArr);
                        this.strImg = _this.upImgArr.join(",");
                        // console.log(this.strImg);
                        if(_this.imgList.length == _this.upImgArr.length){
                            let url = this.changeData() + '/project/auth/projectReleased'
                            axios(url,{
                                method: 'post',
                                params: {
                                    provinceId: this.sessionProvinceId, //所在省
                                    cityId: this.sessionCityId, //所在市
                                    projectType: '2',//项目类型1销售、2招商
                                    houseType: this.selectionIndex,//类型1商业、2办公、
                                    projectPic: _this.strImg,//图片：多张图使用“;”隔开
                                    projectName: this.projectName,//项目名称
                                    price: this.commercePrice,//价格
                                    acreage: this.commerceArea,//面积
                                    address: this.address,//地址
                                    description: this.describe,//描述
                                }
                            }).then(data => {
                                // console.log(data);
                                // console.log(data.data.code);
                                if(data.data.code == '101'){
                                    Indicator.close();
                                    Toast({
                                        message: '发布成功',
                                        duration: 3000
                                    }); 
                                    _this.$router.push({path: "/myPublish"});             
                                }else{
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
                    }).catch(err => {
                        console.log(err)
                    }); 
                }                               
            }                  
        },

        random_string(len){
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';   
            var maxPos = chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        
        //上传图片
        chooseType() {
          document.getElementById('upload_file').click();
        },
        fileChange(el) {
            if (!el.target.files[0].size) return;
            this.fileList(el.target);
            el.target.value = ''
        },
        fileList(fileList) {
            let files = fileList.files;
            for (let i = 0; i < files.length; i++) {
                //判断是否为文件夹
                if (files[i].type != '') {
                    this.fileAdd(files[i]);
                    // this.fileImg = files[i];
                } else {
                    //文件夹处理
                    this.folders(fileList.items[i]);
                }
            }
        },

        fileAdd(file) {
            let _this = this;
            // console.log(file);
            if (this.limit !== undefined) this.limit--;
            if (this.limit !== undefined && this.limit < 0) return;

            _this.imgArr.push({file});

            //总大小
            this.size = this.size + file.size;
            //判断是否为图片文件
            if (file.type.indexOf('image') == -1) {
                this.$dialog.toast({mes: '请选择图片文件'});
            } else {
                let reader = new FileReader();
                let image = new Image();
                let _this = this;
                reader.readAsDataURL(file);
                reader.onload = function () {
                    file.src = this.result;
                    image.onload = function(){
                        let width = image.width;
                        let height = image.height;
                        file.width = width;
                        file.height = height;
                        _this.imgList.push({
                              file
                        });
                        // console.log( _this.imgList);
                    };
                    image.src= file.src;
                }
            }
        },

        delImg(index) {
          this.size = this.size - this.imgList[index].file.size;//总大小
          this.imgList.splice(index, 1);
          if (this.limit !== undefined) this.limit = 3-this.imgList.length;
        },
        // 获取OSS
        ossData(){
            let url = this.changeData() + '/oss/policy'
            axios(url,{
                method: 'post',
                url: url
            }).then(ret => {
                // console.log(ret);
                this.host = ret.data.host;
                this.policy = ret.data.policy;
                this.signature = ret.data.signature;
                this.accessid = ret.data.accessid;
                this.dir = ret.data.dir;
                this.expire = ret.data.expire;
                this.callback = ret.data.callback;
                // console.log(this.host);
            }).catch(err => {
                console.log(err)
            }); 
        },
        // 获取协议内容
        agreementData(){
            let _this = this
            let url = this.changeData() + '/member/getAgreement'
            axios(url,{
                method: 'post',
                params: {
                    agreementType: "0"
                }
            }).then(data => {
                // console.log(data);
                this.agreementInfo = data.data.data.content;
                // console.log(this.agreementInfo);
            }).catch(err => {
                console.log(err)
            });
        },
        // 点击需求发布协议按钮
        agreemenBtn(){
            $('body').css({
             "overflow": "hidden",
            })
            $('html').css({
             "overflow": "hidden",
            })   
            this.protocolsWrap = true; 
        },
        agreementClose(){
            $(".alertGift").addClass('hide');
                $('body').css({
                 "overflow": ""
                })
                $('html').css({
                 "overflow": ""
            })
            this.protocolsWrap  = false
        }


    },
    mounted() {
                     
    },
    created() {
        this.sessionCityId = sessionStorage.cityId;
        // console.log(this.sessionCityId);
        this.sessionProvinceId = sessionStorage.provinceId;
        // console.log(this.sessionProvinceId);
        // 获取OSS
        this.ossData();

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
        this.typeUrl = request['url'];
        // 获取协议内容
        this.agreementData();
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
input{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    /*height: 0.5rem;*/
    width: 3rem;
    /*line-height: .88rem;*/
    background: transparent;
    font-size: .3rem;
    /*光标颜色*/
    /*caret-color: #eaeaea;*/ 
    color: #333;
}
input::-webkit-input-placeholder{
    color: #d3d6dd;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #d3d6dd;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #d3d6dd;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #d3d6dd;
}
input{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.publishSell{
    width: 7.5rem;
    margin: 0 auto;
}
.uploadWrap{
    padding-top: .9rem;
}
.uploadImg{
    width: 6.9rem;
    height: 2.24rem;
    padding: .3rem .3rem .4rem .3rem;
    h3{
        color: #111;
        font-size: .3rem;
        margin-bottom: .3rem;
    }
    i{
        color: #e65e47;
    }
    .uploadBox{
        .add-img {
            display: inline;
            p {
                color: #999;
            }
        }
        .add {
            display: inline;
            width: 2.2rem;
            height: 1.68rem;
            img{
        
               width: 2.2rem;
               height: 1.68rem;
            }
        }
        .img-list {
            li {
                float: left;
                text-align: center;
                margin-left: .15rem;
                position: relative;
                width: 2.2rem;
                height: 1.68rem;
                .upImg{
                   width: 2.2rem;
                   height: 1.68rem;
                }
                div{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 2.2rem;
                    height: 1.68rem;
                    overflow: hidden;
                }
            }
            li:first-child{
                margin-left: 0;
            }
        }

        .del {
            position: absolute;
            width: .38rem;
            height: .38rem;
            top: -.2rem;
            right: -.1rem;
            z-index: 999
        }
    }
}
.publishBox{
    width: 6.9rem;
    padding: 0 .3rem;
    background: #fff;
    ul{
        li{
            line-height: .88rem;
            border-bottom: 1px solid #eaeaea;
            color: #111;
            font-size: .3rem;
            height: .88rem;
            input{
                line-height: .4rem;
                font-size: .3rem;
            }
            p{
                float: left;
                margin-right: .2rem;
                i{
                    color: #e65e47;
                    font-size: .3rem;
                    margin-right: .04rem;
                }
            }
            h5{
                margin-right: .5rem;
                b{
                    display: inline-block;
                    margin-right: .1rem;
                    position: relative;
                    top: -.04rem;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    img{
                        width: .3rem;
                        height: .3rem;
                    }
                }
                float: left;
            }
            h6{
                float: right;
            }
        }
    }
    dl{
        padding-bottom: .5rem;
        dt{
            color: #111;
            font-size: .3rem;
            line-height: 1rem;
        }
        dd{
            textarea{
                width: 6.5rem;
                height: 3.32rem;
                background: #f7f8fA;
                border: none;
                outline: none;
                font-size: .3rem;
                padding: .2rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
    }
}
.uploadBottom{
    width: 6.9rem;
    padding: .6rem .3rem .3rem .3rem;
    dl{
        height: 1rem;
        dt{
            float: left;
            img{
                width: .4rem;
                height: .4rem;
                margin-right: .2rem;
                margin-top: -.04rem;
            }
        }
        dd{
            float: left;
            color: #333;
            font-size: .3rem;
            span{
                color: #64abff;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            .brandAgreementBtn{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
    }
    .submitbtn{
        width: 6.9rem;
        line-height: .9rem;
        border-radius: 6px;
        text-align: center;
        color: #fff;
        background: #64abff;
        font-size: .34rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
}
/*协议*/
.protocolsWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999999;
    position: fixed;
    top: 0;
    .protocolsBoxWrap{
        width: 5.72rem;
        padding: .3rem .38rem .3rem;
        height: 8.4rem;
        background: #fff;
        position: fixed;
        top: 1.4rem;
       /* left: .46rem;*/ 
        left: 0px;
        right: 0px;
        margin-left:auto;
        margin-right:auto;
        .blueCloseImg{
            width: .38rem;
            height: .38rem;
            position: absolute;
            right: -.1rem;
            top: -.2rem;
        }
        .protocolsBox{
            width: 5.72rem;
            height: 8.4rem;
            /*overflow-y: auto;*/
            overflow-y: scroll;
            h3{
                color: #333;
                font-size: .34rem;
                text-align: center;
                margin-bottom: .2rem;
            }
            p{
                color: #333;
                font-size: .28rem;

            }
        }
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
        height: 2.6rem;
        background: #fff;
        position: fixed;
        top: 4.6rem;
        /*left: .45rem;*/
        left: 0px;
        right: 0px;
        margin-left:auto;
        margin-right:auto;
        border-radius: 10px;
        padding-top: .6rem;
        p{
            width: 6rem;
            color: #333;
            font-size: .32rem;
            text-align: center;
            margin: .3rem auto 0;
            line-height: .8rem;
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





