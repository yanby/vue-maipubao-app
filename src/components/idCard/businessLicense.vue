<template>
    <div class="businessLicense">
    	<div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">实名认证</h2>
        </div>
        <div class="businessLicense2">
        	<ul>
        		<li class="li1"><p>法人姓名：</p><span><input type="text" name="" placeholder="" v-model="corporationName" maxlength="10"></span></li>
        		<li><p>营业执照号：</p><span><input type="text" name="" placeholder="" v-model="idCode" maxlength="18" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></span></li>
        	</ul>
        </div>
    	<dl class="businessLicense3">
    		<dt>请上传营业执照照片</dt>
    		<dd>
            <img :src="imgDataUrl" class="chatHead">
            <input type="file" accept="image/*" name="file_head" class="uploadLogoImg" @change="uploadImgLogo($event)"/>
        </dd>
    	</dl>
        <div class="businessLicense4">
        	<router-link to="/businessLicenseExplain">
	        	<span>上传营业执照认证说明？</span>
	        </router-link>
        	<p @click="submitBtn">提交</p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "businessLicense",
    data () {
        return {
        	corporationName: '',
        	idCode: '',
            imgDataUrl: '../../../static/images/mine/charter.png',
            isUpImg: "0",
            fileImgl: ""
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){
          if(this.$route.query.url){
            this.$router.push({path: '/groupTcp'});
          }else{
            this.$router.push({path: '/balance'});
          }
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
                _this.isUpImg = "1";
            }
            // this.imgDataUrl = file;
        },

        // 接口调用
        submitBtn(){
            let _this = this;
            if(this.corporationName == '' || this.idCode == '' || _this.isUpImg == "0"){
                Toast({
                    message: '请输入必填项内容',
                    duration: 3000
                });
            }else{
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
                    console.log(ret);
                    _this.imgUrl = ret.data.fileName;

                    if(_this.imgUrl){
                        _this.upData();
                    }
                    // console.log(_this.imgUrl);
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        upData(){
            let _this = this
            let url = this.changeData() + '/member/auth/updateMemberInfo'
            axios(url,{
                method: 'post',
                // data: obj
                params: {
                    type: 2,  // 实名认证
                    name: this.corporationName, // 姓名 【必传】
                    idCardNo: this.idCode, // 营业执照 【必传】
                    idCardPic: "/"+_this.imgUrl // 身份证照片 (逗号拼接) 【必传】
                }
            }).then(data => {
                console.log(data);
                if(data.data.code == "101"){
                    Toast({
                        message: data.data.message,
                        duration: 3000
                    });
                    if(this.$route.query.url){
                      this.$router.push({path: '/groupTcp'});
                    }else{
                      this.$router.push({path: '/bindCard'});
                    }
                }
            }).catch(err => {
                console.log(err)
            });
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

        // 获取oss
        ossData(){
            let url = this.changeData() + '/oss/policy'
            axios(url,{
                method: 'post',
                url: url
            }).then(ret => {
                console.log(ret);
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

    },
    created() {
        this.ossData();
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
input{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    /*height: 0.5rem;*/
    width: 4rem;
    /*line-height: .88rem;*/
    background: transparent;
    font-size: .3rem;
    /*光标颜色*/
    /*caret-color: #eaeaea;*/
    color: #333;
    /*background: red;*/
    line-height: .3rem;
    position: relative;
    top: -.02rem;
}
.businessLicense{
	width: 7.5rem;
	padding-top: .9rem;
}
.businessLicense2{
	margin: .14rem 0;
	border-top: 1px solid #eaeaea;
	border-bottom: 1px solid #eaeaea;
	ul{
		background: #fff;
		li{
			width: 6.9rem;
			margin-left: .3rem;
			line-height: .88rem;
			border-top: 1px solid #eaeaea;
			p{
				display: inline-block;
				color: #333;
				font-size: .3rem;
			}
		}
		.li1{
			border-top: none;
		}
	}
}
.businessLicense3{
	width: 6.9rem;
	padding: .3rem;
	background: #fff;
	dt{
		color: #333;
		font-size: .3rem;
	}
	dd{
		width: 2.8rem;
            height: 3.96rem;
        background: #eaeaea;
        margin-top: .16rem;
        position: relative;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        img{
            width: 2.8rem;
            height: 3.96rem;
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
                width: 2.8rem;
                height: 3.96rem;
            }
        }
	}
}
.businessLicense4{
	margin-top: 3rem;
	padding: .3rem;
	span{
		display: block;
		color: #538fec;
		font-size: .26rem;
		margin-bottom: .3rem;
	}
	p{
		width: 6.9rem;
		height: .9rem;
		background: #64abff;
		text-align: center;
		line-height: .9rem;
		color: #fff;
		font-size: .3rem;
		border-radius: 6px;
	}
}
</style>
