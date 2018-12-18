<template>
    <div class="publish">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">需求发布</h2>
            <p @click="goMyPublish" class="myPublish">我的发布</p>
        </div>
        <div class="publishList">
            <dl class="clearfix">
                <dt><img src="../../../static/images/publish/dl1.png"></dt>
                <dd @click="goPublishSell()" >
                    <h3>发布销售</h3>
                    <p>商业销售、办公产业销售、住宅销售</p>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt><img src="../../../static/images/publish/dl2.png"></dt>
                <dd @click="goPublishCM()">
                    <h3>发布招商</h3>
                    <p>商业招商、办公产业招商</p>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt><img src="../../../static/images/publish/dl3.png"></dt>
                <dd @click="goPublishBrand()">
                    <h3>发布品牌</h3>
                    <p>品牌相关信息发布</p>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
name: "publish",
    data () {
        return {

        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){
            this.$router.push({path: '/home'});
        },
        // 跳转我的发布
        goMyPublish(){
             if(!localStorage.token){
                this.$router.push({path: '/login',query:{url: "publish"}});
            }else{
                this.$router.push({path: '/myPublish',query:{url: "publish"}});
            }
        },
        // 跳转发布销售
        goPublishSell(){
            if(!localStorage.token){
                this.$router.push({path: '/login',query:{url: "publish"}});
            }else{
                this.$router.push({path: '/publishSell',query:{url: "publish"}});
            }
        },
        // 跳转发布招商
        goPublishCM(){
            if(!localStorage.token){
                this.$router.push({path: '/login',query:{url: "publish"}});
            }else{
                this.$router.push({path: '/publishCM',query:{url: "publish"}});
            }
        },
        // 跳转发布品牌
        goPublishBrand(){
            if(!localStorage.token){
                this.$router.push({path: '/login',query:{url: "publish"}});
            }else{
                this.$router.push({path: '/publishBrand',query:{url: "publish"}});
            }
        },
    },
    mounted() {

    },
    created() {

    }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.publish{
    width: 7.5rem;
    background: #fff;
    /*height: 8rem;*/
    height:100vh;
    margin: 0 auto;
}
.myPublish{
    position: absolute;
    right: .3rem;
    top: .28rem;
    color: #111;
    font-size: .28rem;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.publishList{
    padding-top:.9rem;
    dl{
        width: 7.5rem;
        /*background: red;*/
        padding: .2rem 0 0 0;
        dt{
            width: 1rem;
            height: 1rem;
            margin-left: .3rem;
            margin-right: .36rem;
            float: left;
            img{
                width: 1rem;
                height: 1rem;
            }
        }
        dd{
            width: 5.84rem;
            float: left;
            border-bottom: 1px solid #eaeaea;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            h3{
                color: #111;
                font-size: .3rem;
                margin-top: .08rem;
                margin-bottom: .2rem;
            }
            p{
                color: #898989;
                font-size: .26rem;
                margin-bottom: .2rem;
            }

        }
    }
}
</style>





