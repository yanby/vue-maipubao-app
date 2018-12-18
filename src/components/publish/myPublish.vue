<template>
    <div class="myPublish">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">我的发布</h2>
        </div> 
        <div class="publishNull" v-if="this.myPublishList == 0">
            <img src="../../../static/images/mine/brandManagementNull.png">
            <h6>暂无数据</h6>
        </div>
        <div class="myPublishWrap">
            <div class="myPublishBox clearfix" v-for="(item,index) in myPublishList">
                <h3 style="color: #ff5140;" v-if="item.p_status_id == 3">{{item.p_status}}</h3>
                <h3 v-else>{{item.p_status}}</h3>
                <ul>
                    <li><span>类&emsp;&emsp;型：</span>{{item.type}}</li>
                    <li><span>名&emsp;&emsp;称：</span>{{item.p_name}}</li>
                    <li><span>发布时间：</span>{{item.create_time}}</li>
                    <p v-if="item.p_status_id == 3"><span>失败原因：</span>{{item.reasons}}</p>
                </ul>
            </div>            
        </div>     
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "myPublish",
    data () {
        return {
            myPublishList: []
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/publish'});            
        },
        myPublish(){
            let url = this.changeData() + '/project/auth/myPush'
            axios(url,{
                method: 'post',
                // params: {}
            }).then(data => {
                // console.log(data);
                this.myPublishList = data.data.myPush;
                this.myPublishList.forEach(function (item,index) {
                    var str = item.create_time.substring(0, 10);
                    item.create_time = str;
                })
            }).catch(err => {
                console.log(err)
            });          
        },  
    },
    mounted() {
                     
    },
    created() {
        this.myPublish();
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.myPublish{
    width: 7.5rem;
    margin: 0 auto;
}
.myPublishWrap{
    width: 6.9rem;
    margin: 1.2rem .3rem 0 .3rem;
}
.myPublishBox{
    width: 6.3rem;
    background: #fff;
    margin-bottom: .3rem;
    border-radius: 6px;
    padding: .3rem;
    h3{
        color: #64abff;
        font-size: .3rem;
        text-align: right;
    }
    ul{
        li{
            color: #333;
            font-size: .3rem;
            margin-top: .2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            span{

            }
        }
        li:first-child{
            margin-top: 0;

        }
    }
    p{
        color: #ff5140;
        font-size: .3rem;
        margin-top: .2rem;
    }
}
.publishNull{
    width: 7.5rem;
    text-align: center;
    margin-top: 3rem;
    img{
        width: 1.68rem;
        height: 1.68rem;
    }
    h6{
        color: #333333;
        font-size: .3rem;
        margin-top: .3rem;
    }
}
</style>





