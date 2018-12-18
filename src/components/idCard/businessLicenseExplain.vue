<template>
    <div class="businessLicenseExplain">
    	<div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">{{agreementTitle}}</h2>
        </div>
        <div class="businessLicenseExplainBox">
        	<p v-html="agreementInfo"></p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "businessLicenseExplain",
    data () {
        return {
            agreementTitle: "",
            agreementInfo: "",
            move: ""
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){
            this.$router.push({path: '/businessLicense'});
        },
        postData(){
            let _this = this
            let url = this.changeData() + '/member/getAgreement'
            axios(url,{
                method: 'post',
                params: {
                    agreementType: "2"
                }
            }).then(data => {
                console.log(data);
                this.agreementTitle = data.data.data.agreement_name;
                this.agreementInfo = data.data.data.content;
            }).catch(err => {
                console.log(err)
            });
        },
    },
    mounted() {
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

        this.move = request['move'];
        if(this.move == "ios" || this.move == "android"){
            $(".nav").hide();
            $(".businessLicenseExplainBox").css({"padding":".3rem"})
        }
    },
    created() {
        this.postData();
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.businessLicenseExplain{
	width: 7.5rem;
	background: #fff;
    height: 100vh;
}
.businessLicenseExplainBox{
    padding: 1.2rem .3rem .3rem .3rem;
	color: #333;
	font-size: .28rem;
	text-indent: 2em;
	text-align: justify;
	line-height: .4rem;
}

</style>
