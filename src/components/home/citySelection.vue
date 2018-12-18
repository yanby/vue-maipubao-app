<template>
    <div class="citySelection">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">选择城市</h2>
        </div>
        <div class="cityList">
            <ul>
                <li v-for='(item,index) in cityArr' @click="change(index,item.province_id,item.city_id,item.city_name)" :class="{active:index===number}">{{item.city_name}}</li>
            </ul>
        </div>
    </div>  
</template>

<script>
import axios from 'axios';
import qs from "qs";
export default {
name: "citySelection",
    data () {
        return {
            number: 0,   
            cityArr: [],
            urlCityName:""
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/home'});            
        },
        change(index,provinceId,cityId,cityName) { 
            this.number= index;
            sessionStorage.setItem("provinceId",provinceId);
            sessionStorage.setItem("cityId",cityId);
            sessionStorage.setItem("cityName",cityName);
            this.$router.push({path: '/home'});
        },
        //获取城市
        cityCode() {
            let _this = this
            // 接口调用                
            let url =  _this.changeData() + '/show/getOpenedCitiesList'
            axios(url,{
                method: 'post',
            }).then(data => {
                // console.log(data);
                this.cityArr = data.data.data;
                for(var i = 0; i < this.cityArr.length; i++){
                    if (this.cityArr[i].city_name.indexOf(this.urlCityName) == -1) {
                       
                    } else {
                        this.number = i;        
                    } 
                }
            }).catch(err => {
                console.log(err)
            });
        },  
    },
    created() {    
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
        this.urlCityName = request['cityNameStr'];  
        // console.log(this.urlCityName);
        this.cityCode();  
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.citySelection{
    width: 7.5rem;    
    height:100vh;
    background: #fff;
    margin: 0 auto;
}
.cityList{
    padding-top: .9rem;
    ul{
        width: 6.9rem;
        margin-left: .3rem;
        margin-top: .8rem;
        li{
            width: 2rem;
            border: 1px solid #ccc;
            border-radius: 6px;
            color: #898989;
            font-size: .3rem;
            line-height: .8rem;
            text-align: center;
            margin-right: .45rem;
            margin-bottom: .2rem;
            float: left;
            box-sizing: border-box;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        li:nth-child(3n+3) {
           margin-right: 0;
        }
    }
}

.active{
    color: #64abff!important;
    border: 1px solid #64abff!important;
    background: #edf5ff;
}
</style>
