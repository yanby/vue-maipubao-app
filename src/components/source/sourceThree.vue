<template>
    <div class="sourceThree">
        <div class="sourceThreeTop">
            <img src="../../../static/images/common/back-white.png" class="backImg" @click="goSourceAccess()">
            <h2>交易流程</h2>
            <img src="../../../static/images/source/sourceThreeBg1.png" class="sourceThreeBg">
        </div>
        <div class="sourceThreeMain">
            <dl class="clearfix" v-for="(item,index) in projectArr">
                <dt>
                    <p>{{item.monthToDate}}</p>
                    <p>{{item.year}}</p>
                </dt>
                <h3>                   
                    <img src="../../../static/images/source/wrong.png" v-if="item.orderStatus_id == 0">
                    <img src="../../../static/images/source/answer.png" v-else>
                    <i v-if="item.orderStatus_id != 1"></i>
                </h3>
                <dd>
                    <h5>{{item.orderStatus}}</h5>
                    <h6>{{item.description}}</h6>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: "",
    data() {
        return {
            customId: '', 
            projectId: '', 
            projectTyp: '',
            projectArr: []
        }
    },
    methods: {
        goSourceAccess() {
            this.$router.push({path: "/sourceAccess",query:{id:this.customId}});
        },
        // 接口调用
        projectData(){
            let _this = this;
            let url = this.changeData() + '/customer/auth/projectOrderTrackList';
            axios(url,{
                method: 'post',
                params: {
                    orderNo: this.projectId, //交易单号【必传】
                    projectType: this.projectTyp //项目类型【必传】
                }
            }).then(data => {
                // console.log(data);
                this.projectArr = data.data.orderTrackList;
                this.projectArr.forEach(function (item,index) {
                    var str = item.createTime.substring(0, 4);
                    var str2 = item.createTime.substring(5, 10);
                    item.year = str;
                    item.monthToDate = str2;
                })
            }).catch(err => {
                console.log(err)
            });
        },
    },
    mounted() {

    },
    created() {
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
        this.customId = request['id']; 
        this.projectId = request['order']; 
        this.projectTyp = request['type'];
        this.projectData();
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
.sourceThree{
    width: 7.5rem;
    height: 100vh;
    background: #fff;
}
.sourceThreeTop{
    width: 7.5rem;
    height: 3.4rem;
    position: relative;
    h2{
        text-align: center;
        position: absolute;
        top: .34rem;
        left: 50%;
        color: #fff;
        font-size: .34rem;
        margin-left: -.6rem;
    }
    .sourceThreeBg{
        width: 7.5rem;
        height: 3.4rem;
    }
    .backImg{
        position: absolute;
        left: .3rem;
        top: .34rem;
        width: .3rem;
        height: .36rem;
    }
}
.sourceThreeMain{
    width: 7.5rem;
    padding-top: .4rem;
    padding-bottom: .4rem;
    background: #fff;
    border-top: .18rem solid #f7f8fa;
    dl{
        dt{
            float: left;
            padding-left: .4rem;
            padding-right: .4rem;
            color: #898989;
            p{
                font-size: .26rem;
                text-align: center;
            }
        }
        h3{
            width: .4rem;
            height: 1.36rem;
            float: left;
            i{
                display: inline-block;
                height: .96rem;
                width: 1px;
                background: #becfe4;
                margin-left: .2rem;
                position: relative;
                top: -.01rem;
            }
            img{
                width: .4rem;
                height: .4rem;
            }
        }
        dd{
            float: left;
            margin-left: .4rem;
            h5{
                color: #333;
                font-size: .3rem;
                margin-bottom: .1rem;
            }
            h6{
                color: #898989;
                font-size: .3rem;
            }
        }
    }
}
</style>
