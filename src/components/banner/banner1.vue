<template>
<div class="banner1Wrap">
	<!-- <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">优铺资讯</h2>
    </div> -->
    <div class="banner1"></div>
    <div class="top1">
        <img src="../../../static/images/banner/banner1/top1.png" class="top1Img">
    </div>
    <div class="top2">
        <img src="../../../static/images/banner/banner1/top2.png" class="top2Img">
    </div>
    <div class="top3">
        <img src="../../../static/images/banner/banner1/top3.png" class="top3Img">
    </div>
    <div class="top4">
        <img src="../../../static/images/banner/banner1/mpbCode.png" class="mpbCode">
        <p>扫描二维码下载APP</p>
    </div>
    
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "idCard",
    data () {
        return {
        	
        }
    },
    computed:{

    },
    methods:{

    },
    mounted() {

    },
    created() {
       
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.banner1Wrap{
    width: 7.5rem;
    margin: 0 auto;
    background: #4b35f5;
}
.banner1{
    width: 7.5rem;
    height: 5.9rem;
    background: url("../../../static/images/banner/banner1/banner1Top.png") no-repeat;
    background-size: 7.5rem 5.9rem;
}
.top1{
    width: 7.5rem;
    height: 5.5rem;
    position: relative;
    .top1Img{
        width: 7.1rem;
        height: 7.1rem;
        position: absolute;
        top: -1.8rem;
        left: .2rem;
    }
}
.top2{
    width: 7.5rem;
    height: 8.56rem;
    .top2Img{
        width: 7.1rem;
        height: 8.36rem;
        margin-left: .2rem;
    }
}
.top3{
    width: 7.5rem;
    height: 22.66rem;
    .top3Img{
        width: 7.1rem;
        height: 22.66rem;
        margin-left: .2rem;
    }
}
.top4{
    width: 7.5rem;
    height: 3.6rem;
    text-align: center;
    .mpbCode{
        width: 1.55rem;
        height: 1.55rem;
        margin: .52rem auto .2rem;
    }
    p{
        color: #d4d0f4;
        font-size: .3rem;
    }
}
</style>
