<template>
    <div class="message">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">我的消息</h2>
            <p class="edit" @click="messageEdit">编辑</p>
        </div>
        <div class="messageNull" v-if="messageArr == ''">
                <img src="../../../static/images/mine/brandManagementNull.png">
                <h6>暂无数据</h6>
            </div>
        <div class="messageWrap clearfix" v-else>
            <div class="messageBox clearfix" v-for="(item,index) in messageArr">
                <i v-if="messageEditShow">
                    <!-- <img src="../../../static/images/mine/square.png"> -->
                    <b class="detail-btn" @click.stop="squareCancel($event,item.id)"></b>
                </i>
                <dl class="messageDl clearfix" @click="goMessageInfo(item.id)">
                    <dt class="clearfix">
                        <h2 v-if="item.send == 0">{{item.title}}</h2>    
                        <h2 class="titleColor" v-else>{{item.title}}</h2>                   
                    </dt>
                    <ul class="clearfix">
                        <li class="li1">{{item.send_name}}</li>
                        <li class="li2">{{item.publicTime}}</li>
                    </ul>
                    <dd>{{item.content}}</dd>
                    <span class="redDotImgSpan" v-if="item.send == 0">
                        <img src="../../../static/images/mine/redDot.png" class="redDotImg">
                    </span>
                </dl>
            </div>  
        </div>
        <div class="messageBottom" v-if="messageEditShow">
            <span class="span1" @click="cancelBtn()">取消</span>
            <span class="span2" @click="deleteBtn()">删除</span>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "message",
    data () {
        return {
            messageEditShow: false,
            messageArr: [],
            cancelarr: [],
            strMessageId: ""
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/mine'});            
        },
        // 点击编辑
        messageEdit(){
            this.messageEditShow = true;
            $(".messageDl").css({"width": "6rem"});
        },
        // 点击取消按钮
        // cancel(){
        //     this.messageEditShow = false;
        //     $(".messageDl").css({"width": "6.9rem"});
        // },
        // 是否阅读
        goMessageInfo(id){
            // this.$router.push({path: '/messageInfo'});
            let _this = this
            let url = this.changeData() + '/member/auth/updatePushStatus'
            axios(url,{
                method: 'post',
                params:{
                    id: id,
                }
            }).then(data => {
                // console.log(data);
                if(data.data.code == "101"){
                    this.messageData();
                }      
            }).catch(err => {
                console.log(err)
            });
        },
        // 消息展示
        messageData(){
            let _this = this
            let url = this.changeData() + '/member/auth/selectPushList'
            axios(url,{
                method: 'post'
            }).then(data => {
                // console.log(data);
                this.messageArr = data.data.selectPushList;
                // console.log(this.messageArr);                
            }).catch(err => {
                console.log(err)
            });
        },

        // 点击销售选择
        squareCancel(e,id){
            if (e.target.className.indexOf("detail-selected") == -1) {
                e.target.className = "detail-btn detail-selected"; //切换按钮样式
                this.cancelarr.push(id);
                this.strMessageId = this.cancelarr.join(",");
                // console.log(this.strMessageId);
            } else {
                e.target.className = "detail-btn";//切换按钮样式
                //写逻辑
                var array = this.cancelarr;
                var index = array.indexOf(id);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.cancelarr = array;
                this.strMessageId = this.cancelarr.join(",");
                // console.log(this.strMessageId);
            }
        },

        // 确定删除
        deleteBtn(){
            let _this = this;
            // console.log(this.strMessageId);
            let url = this.changeData() + '/member/auth/delPush'
            axios(url,{
                method: 'post',
                params:{
                    id: this.strMessageId,
                }
            }).then(data => {
                // console.log(data);
                if(data.data.code == "101"){
                    Toast({
                        message: data.data.message,
                        duration: 3000
                    });
                    this.messageEditShow = false;
                    $(".messageDl").css({"width": "6.9rem"});
                    this.cancelarr = [];
                    this.strMessageId = "";
                    this.messageEditShow = false;
                    _this.messageData();
                }else{
                    Toast({
                        message: data.data.message,
                        duration: 3000
                    });
                }       
            }).catch(err => {
                console.log(err)
            });
        },

        // 取消
        cancelBtn(){
            this.messageEditShow = false;
            $(".messageDl").css({"width": "6.9rem"});
            this.cancelarr = [];
            this.strMessageId = "";
            this.messageEditShow = false;
        },



    },
    mounted() {
    	             
    },
    created() {
        this.messageData();

    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.message{
    width: 7.5rem;
    padding-top: .9rem;
    padding-bottom: 1rem;
    margin: 0 auto;
}
.edit{
    font-size: .28rem;
    color: #111111;
    position: absolute;
    right: .3rem;
    top: .28rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.messageWrap{
    width: 7.5rem;
    margin-top: .14rem;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    .messageBox{
        width: 6.9rem;
        background: #fff;
        height: auto;
        margin-left: .3rem;
        padding-top: .3rem;
        border-top: 1px solid #eaeaea; 
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        i{
            display: block;
            float: left;
            width: .9rem;           
            line-height: 1.7rem;
            img{
                width: .4rem;
                height: .4rem;
            }  
            .detail-btn{
                width: .4rem;
                height: .4rem;
                display: inline-block;
                background: url("../../../static/images/mine/square.png");
                background-repeat: no-repeat;
                background-size: .4rem .4rem;
            }
            .detail-selected{
                background: url("../../../static/images/mine/square2.png");
                background-repeat: no-repeat;
                background-size: .4rem .4rem;
            }
        }
        dl{
            width: 6.9rem;
            float: left;
            background: #fff;
            position: relative;
            dt{
                height: .5rem;
                position: relative;
                h2{
                    color: #333;
                    font-size: .32rem;
                    position: absolute;
                    left: 0;
                }
                .titleColor{
                    color: #898989;
                }
                span{
                    position: absolute;
                    right: 0;
                }
            }
            ul{
                height: .5rem;
                color: #898989;
                font-size: .26rem;
                .li1{
                    float: left;
                }
                .li2{
                    float: right;
                }
            }
            dd{
                text-align: justify;
                color: #898989;
                font-size: .28rem;
                overflow: hidden;
                padding-bottom: .3rem;
            }
            .redDotImgSpan{
                position: absolute;
                right: 0;
                top: -.1rem;
                .redDotImg{
                    width: .16rem;
                    height: .16rem;
                }
            }
        }
    }
    .messageBox:first-child{
        border-top: none;
    }
}
.messageBottom{
    width: 7.5rem;
    position: fixed;
    bottom: 0;
    span{
        display: block;
        width: 50%;
        float: left;
        line-height: 1rem;
        color: #898989;
        font-size: .34rem;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .span1{
        background: #e9e9e9;
    }
    .span2{
        background: #fa513c;
        color: #fff;
    }
}
/*无数据*/
.messageNull{
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
