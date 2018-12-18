<template>
    <div class="businessLicense">
    	<div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">实名认证</h2>
        </div>
        <div class="businessLicense2">
        	<ul>
        		<li class="li1"><p>法人姓名：</p><span><input type="text" name="" placeholder="" v-model="corporationName" maxlength="10"></span></li>
        		<li><p>营业执照号：</p><span><input type="text" name="" placeholder="" v-model="idCode" maxlength="19" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></span></li>
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
            imgUrl: "",

            host: "",
            policy: "",
            signature: "",
            accessid: "",
            dir: "",
            expire: "",
            callback: "",                 
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/balance'});            
        },
        submitBtn(){
        	if(this.corporationName == '' || this.idCode == ''){
                Toast({
                    message: '请输入必填项内容',
                    duration: 3000
                });
            }else{
                Toast('提示信息');
            }

        	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
		    if(reg.test(this.idCode) === false)  
		    {  
		       Toast({
                    message: '请输入正确营业执照',
                    duration: 3000
                });
		    }  
        },
        //当选择完成图片之后调用
        uploadImgLogo(el){
            let files = el.target.files;
            let _this = this;
            var ossData = new FormData();
            ossData.append('OSSAccessKeyId', _this.accessid);
            ossData.append('policy', _this.policy);
            ossData.append('Signature', _this.signature);
            ossData.append('key', _this.dir + _this.random_string(32));
            ossData.append('success_action_status', 200); // 指定返回的状态码
            ossData.append("callback", _this.callback);
            ossData.append("file", el.target.files[0]);
            this.$http.post(this.host, ossData, { headers: { "Content-Type": "multipart/form-data" } })
            .then(ret => {
                console.log(ret);
                console.log(this.host+"/"+ret.data.fileName);
                _this.imgDataUrl = this.host+"/"+ret.data.fileName;
                _this.imgUrl = ret.data.fileName;               
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

        // 接口调用
        submitBtn(){
            let _this = this;
            if(this.userName == '' || this.IDcode == ''){
                Toast({
                    message: '请输入必填项内容',
                    duration: 3000
                });
            }else{
                let url = this.changeData() + '/member/auth/updateMemberInfo'
                // let url = "http://njngta.natappfree.cc/brand/detail"
                axios(url,{
                    method: 'post',
                    // data: obj
                    params: {
                        type: 2,  // 实名认证 
                        name: this.corporationName, // 姓名 【必传】
                        idCardNo: this.idCode, // 营业执照 【必传】
                        idCardPic: this.imgUrl // 身份证照片 (逗号拼接) 【必传】
                    }
                }).then(data => {
                    console.log(data);
                    if(data.data.code == "101"){
                        this.$router.push({path: "/bindCard"});
                    }
                }).catch(err => {
                    console.log(err)
                });
            }           
        },
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
