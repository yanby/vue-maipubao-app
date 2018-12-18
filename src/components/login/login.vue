<template>
    <div class="login">
        <div class="loginTop">
            <h2>登录</h2>
            <img src="../../../static/images/login/loginClose.png" @click="loginClose()">
        </div>
        <div class="loginMain">
            <div class="input1">
                <input type="tel" placeholder="请输入您的手机号码" v-model="phoneVal" maxlength="11">
            </div>
            <div class="input2">
                <input type="tel" v-model="securityCode" placeholder="请输入验证码" maxlength="6">
                <button type="button" :disabled="disabled" @click="sendcode" class="btns" :class="{'codeColor':chengaColor}">{{btntxt}}</button>
            </div>
            <div class="btnWrap">
                <div class="loginBtn" @click="loginBtn($event)">登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from "qs";
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
const countdown = 60;
export default {
    name: 'aboutUP',
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "110000", // 全局省Id
            phoneVal: '', // 手机号码
            securityCode: '', // 验证码
            disabled: false,
            time:0,
            btntxt:"获取验证码",
            chengaColor: false,
            formMess:{
                email:this.email,
                phone:this.phone
            },
            urlId: "",
            urlPrice: "",
            urlType: "",
            referrerId: '',
            teamId: '',
            goUrl: "", // 跳转URL
        }
    },
    computed:{

    },
    methods:{
        //获取验证码
        sendcode() {
            let _this = this
            if(this.chengaColor == true){
                this.time=60;
                this.disabled=true;
                this.timer();
                // 接口调用
                let url =  _this.changeData() + '/sendsms'
                axios(url,{
                    method: 'post',
                    params: {
                        mobile: _this.phoneVal,
                        type: 1
                    }
                }).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        // 倒计时
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt= "重新获取(" + this.time + ")";
                setTimeout(this.timer, 1000);
            } else{
                this.time=0;
                this.btntxt="获取验证码";
                this.disabled=false;
            }
        },

        // 点击登录按钮
        loginBtn() {
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let _this = this;
            if(this.phoneVal==''){
                Toast({
                    message: '请输入手机号',
                    duration: 3000
                });
            }else if(!reg.test(this.phoneVal)){
                Toast({
                    message: '请输入正确的手机号',
                    duration: 3000
                });
            }else if(this.securityCode == ""){
                Toast({
                    message: '请输入验证码',
                    duration: 3000
                });
            }else{
                let url = this.changeData() + '/login'
                let str = _this.phoneVal;
                let num = str.replace(/[^0-9]/ig,"");
                var data = {
                    mobile: _this.phoneVal,
                    validCode: _this.securityCode,
                    provinceId: this.sessionProvinceId || 110000,
                    cityId: this.sessionCityId || 110100,
                    type: 1,
                    source: "4"
                }

                axios(url,{
                    method: 'post',
                    params: data
                }).then(data => {
                    console.log(data);
                    console.log(data.data.code);
                    if(data.data.code == "101"){
                        Toast({
                            message: '登录成功',
                            duration: 3000
                        });
                        let tel = data.data.memberInfo.mobile;
                        let token = data.data["access-token"];
                        window.localStorage.setItem("iphone",tel);
                        window.localStorage.setItem("token",token);
                        window.localStorage.setItem("memberId",data.data.memberInfo.id);

                        if(this.goUrl){
                            this.$router.push({path: '/' + this.goUrl});
                        }else if(this.$route.query.redirect){
                          this.$router.push({path:decodeURIComponent(this.$route.query.redirect)});
                        }else{
                            this.$router.go(-1);
                        }
                    }else if(data.data.code == "102"){
                        Toast({
                            message: data.data.message,
                            duration: 3000
                        });
                    }else{
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
        loginClose(){
            if(this.goUrl){
                // alert(1);
                if(this.goUrl == "source" || this.goUrl == "mine"){
                    // alert(1);
                    this.$router.go(-2);
                }else{
                    // alert(2);
                    this.$router.go(-1);
                }
            }else{
                // alert(3);
                this.$router.go(-1);
            }
        },
        navBack(){
            var typeId = this.$route.query.shopId;
        },
    },
    created() {
        this.sessionCityId = sessionStorage.cityId;
        this.sessionProvinceId = sessionStorage.provinceId;
        console.log(this.sessionCityId);
        console.log(this.sessionProvinceId);
        this.referrerId =  getUrlId("referrerId");
        this.teamId =  getUrlId("teamId");

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
        this.urlId = request['id'];
        this.urlPrice = request['price'];
        this.urlType = request['urlType'];
        this.goUrl = request['url'];
    },
    watch: {
        phoneVal(){
            if(this.phoneVal.length == 11){
                this.chengaColor = true;
            }else{
                this.chengaColor = false;
            }
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;

            if(!reg.test(this.phoneVal)){
                this.chengaColor = false;
            }else{
                this.chengaColor = true;
            }
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>

input::-webkit-input-placeholder{
    color:#999;
}
input::-moz-placeholder{
    color:#999;
}
input:-moz-placeholder{
    color:#999;
}
input:-ms-input-placeholder{
    color:#999;
}

.login{
    width: 7.5rem;
    height: 100vh;
    background: #fff;
    margin: 0 auto;
}
.loginTop{
    width: 7.5rem;
    height: 4.12rem;
    background: url(../../../static/images/login/loginBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    h2{
        color: #fff;
        font-size: .34rem;
        text-align: center;
        line-height: 1.08rem;
    }
    img{
        width: .26rem;
        height: .26rem;
        position: absolute;
        right: .34rem;
        top: .38rem;
    }
}
.loginMain{
    width: 6.2rem;
    margin: 0 auto;
    padding-top: .3rem;
    input{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        height: .3rem;
        width: 6.2rem;
        background: transparent;
        font-size: 0.28rem;
        color: #333;
        padding: .3rem 0 .3rem 0;
    }
    .input1{
        border-bottom: 1px solid #eaeaea;
    }
    .input2{
        border-bottom: 1px solid #eaeaea;
        position: relative;
        .btns{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 1.7rem;
            font-size: 0.28rem;
            color: #999;
            line-height: 1rem;
            background: rgba(0,0,0,0);
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
.codeColor{
    color: #64abff!important;
}
.btnWrap {
    margin-top: .94rem;
    text-align: center;
    .loginBtn{
        width: 6.2rem;
        display: block;
        margin: 0.2rem auto;
        background: #64abff;
        border-radius: 4px;
        font-size: 0.34rem;
        line-height: 0.88rem;
        color: #fff;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
}

</style>








