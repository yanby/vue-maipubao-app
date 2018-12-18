<template>
    <div class="personInfo">
    	<div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">个人信息</h2>
        </div>
        <div class="personInfoWrap">
        	<dl>
        		<dt>头像</dt>
        		<i><img src="../../../static/images/common/more.png"></i>
        		<dd class="uploadLogo">
        			<img :src="imgDataUrl" class="chatHead" :onerror="defaultImg">
                    <input type="file" accept="image/*" name="file_head" class="uploadLogoImg" @change="uploadImgLogo($event)" />
        		</dd>
        	</dl>
        	<dl>
        		<dt>姓名</dt>
        		<i><img src="../../../static/images/common/more.png"></i>
        		<dd><input type="text" name="" class="userName" v-model="userName" maxlength="10"></dd>
        	</dl>
        	<dl>
        		<dt>性别</dt>
        		<i @click="sexSelect()"><img src="../../../static/images/common/more.png"></i>
        		<dd @click="sexSelect()">{{userSex}}</dd>
        	</dl>
        	<ul>
	        	<li>手机号</li>
	        	<li class="tel">{{userTel}}</li>
	        </ul>
        </div>
        <span class="submitBtn" @click="submitBtn()">提交</span>

        <!-- 下拉 -->
        <div class="sexWrap" v-if="sexWrap">
            <div class="sexBox">
                <ul class="sexUl">
                    <li v-for="item in sexData" @click="sexLi(item.sex,item.id)">{{item.sex}}</li>
                </ul>
                <div class="cancelBtn" @click="cancelBtn">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
name: "personInfo",
    data () {
        return {
        	imgDataUrl: "",
            initialPortrait: "",
        	userName: "",
        	userTel: "" ,
        	userSex: "" ,
            userSexId: "",
        	sexWrap: false,
        	// 品牌定位
            sexData: [{
                sex: '男',
                id: '0'
            }, {
                sex: '女',
                id: '1'
            }],
            fileImg: "",

            initialImg:"",
            defaultImg: 'this.src="' + require('../../../static/images/mine/chatHead.png') + '"', //默认图片
        }
    },
    computed:{

    },
    watch: {

    },
    methods:{
        // 点击返回按钮
        navBack(){
            this.$router.push({path: '/mine'});
        },
        //当选择完成图片之后调用
        uploadImgLogo(event){

            let _this = this;

            //1. 拿到fileinput里面的文件, 这个file是一个file对象， file对象不能直接展示的
            var file = event.target.files[0];
            this.fileImg = file;
            // console.log(file);

            //2. 读取文件，成功img标签可以直接使用的格式
            //FileReader类就是专门用来读文件的
            var reader = new FileReader();

            //3. 开始读文件
            //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串， 这个字符串可以直接作用img标签的图片资源使用
            reader.readAsDataURL(file);

            //4. 因为文件读取是一个耗时操作， 所以它在回调函数中，才能够拿到读取的结果
            reader.onload = function() {
                // console.log(reader.result);
                //直接使用读取的结果
                _this.imgDataUrl = reader.result;
            }
            // this.imgDataUrl = file;
        },
        sexSelect(){
            this.sexWrap = true;
        },
        cancelBtn(){
            this.sexWrap = false;
        },
        sexLi(userSex,id){
            this.userSex = userSex;
            this.userSexId = id;
            this.sexWrap = false;
        },

        // 个人信息展示
        userData() {
            let _this = this
            let url = this.changeData() + '/member/auth/memberInfo'
            axios(url,{
                method: 'post'
            }).then(data => {
                // console.log(data);
                var str = data.data.memberInfo.mobile;
                var str2 = str.substr(0,3)+"****"+str.substr(7)
                // 手机号码中间四位*代替
                _this.userTel = str2;
                _this.userName = data.data.memberInfo.userName;
                _this.imgDataUrl = data.data.memberInfo.iconPath;
                _this.initialPortrait = data.data.memberInfo.iconPath;
                _this.userSexId = data.data.memberInfo.sex;
                if(data.data.memberInfo.sex == "0"){
                    _this.userSex = "男";
                }else{
                    _this.userSex = "女";
                }

            }).catch(err => {
                console.log(err)
            });
        },

        submitBtn(){
            let _this = this;

            var strUserName = $(".userName").val();

            if(this.userName == "" || $.trim(strUserName) == ""){
                Toast({
                    message: '姓名不得为空',
                    duration: 3000
                });
            }else{
                if(this.initialPortrait != this.imgDataUrl){
                    var ossData = new FormData();
                    ossData.append('OSSAccessKeyId', _this.accessid);
                    ossData.append('policy', _this.policy);
                    ossData.append('Signature', _this.signature);
                    ossData.append('key', _this.dir + _this.random_string(32));
                    ossData.append('success_action_status', 200); // 指定返回的状态码
                    ossData.append("callback", _this.callback);
                    ossData.append("file", _this.fileImg);
                    this.$http.post(this.host, ossData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then(ret => {
                        // console.log(ret);
                        _this.imgUrl = ret.data.fileName;

                        _this.upData();

                    }).catch(err => {
                        console.log(err)
                    });
                }else{
                    _this.upData();
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
        upData(){
            Indicator.open({
                text: '上传中...',
                spinnerType: 'fading-circle'
            });

            let _this = this
            let url = this.changeData() + '/member/auth/updateMemberInfo'
            if(_this.imgUrl == undefined){
                this.initialImg = _this.initialPortrait.split("http://up-img.oss-cn-beijing.aliyuncs.com").join("");
                // console.log(this.initialImg);
            }else{
                this.initialImg =  "/" + _this.imgUrl;
            }

            axios(url,{
                method: 'post',
                params: {
                    type: 1, //修改用户信息
                    name: this.userName,  // 姓名
                    sex: this.userSexId, //0是女 1是男
                    iconPath: this.initialImg//头像图片地址
                }
            }).then(data => {
                // console.log(data);
                if(data.data.code == "101"){
                    Indicator.close();
                    Toast({
                        message: data.data.message,
                        duration: 3000
                    });
                    this.$router.push({path: "/mine"});
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
        },
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
            }).catch(err => {
                console.log(err)
            });
        }

    },
    mounted() {
    	this.userData();
        this.ossData();
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.personInfo{
	width: 7.5rem;
	padding-top: .9rem;
    margin: 0 auto;
}
.personInfoWrap{
	margin-top: .14rem;
	border-top: 1px solid #eaeaea;
	dl{
		height: .9rem;
		border-bottom: 1px solid #eaeaea;
		line-height: .9rem;
		color: #333;
		font-size: .3rem;
		background: #fff;
		dt{
			margin-left: .3rem;
			float: left;
		}
		dd{
			float: right;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
			.chatHead{
				width: .68rem;
				height: .68rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
			}
			.userName{
				width: 3rem;
				text-align: right;
				overflow: hidden;
				font-size: .3rem;
				-webkit-tap-highlight-color: rgba(0,0,0,0);
                position: relative;
                top: -.02rem;
			}
		}
		i{
			margin-right: .3rem;
			margin-left: .2rem;
			display: block;
			float: right;
			img{
				width: .12rem;
			    height: .22rem;
			    position: relative;
			    top: -.03rem;
			}
		}
	}
	ul{
		width: 7.5rem;
		height: .9rem;
		margin-top: .14rem;
		margin-bottom: .6rem;
		background: #fff;
		border-top: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
		font-size: .3rem;
		line-height: .9rem;
		li{
			float: left;
			margin-left: .3rem;
		}
		.tel{
			float: right;
			margin-right: .3rem;
			font-size: .28rem;
			color: #d3d6dd;
			float: right;
		}
	}
}
.uploadLogo{
    /*width: 2.32rem;
    height: 1.74rem;*/
    position: relative;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    img{
        width: .68rem;
        height: .68rem;
        border-radius: 50%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .uploadLogoImg{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
        img{
            width: .68rem;
            height: .68rem;
        }
    }
}
.submitBtn{
	display: block;
	background: #46acff;
	line-height: .9rem;
	width: 6.9rem;
	border-radius: 6px;
	margin: 0 auto;
	text-align: center;
	font-size: .3rem;
	color: #fff;
}

/* 下拉 */
.sexWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 999999999;
    .sexBox{
    	width: 6.9rem;
        height: 2.85rem;
        position: fixed;
        bottom: .3rem;
        left: 0px;
        right: 0px;
        /*left: .3rem;*/
        /*margin: 0 auto;*/
        margin-left:auto;
        margin-right:auto;
        ul{
        	background: #fff;
        	border-radius: 10px;
        	li{
        		line-height: .9rem;
        		color: #333;
        		font-size: .26rem;
        		text-align: center;
        	}
        	:first-child{
        		border-bottom: 1px solid #eee;
        	}
        }
        .cancelBtn{
        	line-height: .9rem;
        	background: #fff;
        	border-radius: 10px;
        	margin-top: .14rem;
        	color: #898989;
        	font-size: .3rem;
        	text-align: center;
            -webkit-tap-highlight-color: rgba(0,0,0,0);

        }
    }
}
</style>
