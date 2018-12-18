<template>
    <div class="demandDetails">
   	    <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">需求详情</h2>
        </div>
        <div class="demandDetailsBox">
            <ul class="ulTop">
                <li><p>需求标题：</p><span>求购</span></li>
                <li><p>需求类型：</p><span>求购</span></li>
                <li><p>联系人：</p><span>张三</span></li>
                <li><p>联系方式：</p><span>18212438909</span></li>
                <li><p>区位：</p><span>海淀区</span></li>
            </ul>
            <ul class="ulBottom">
                <li><p>商铺面积：</p><span>100㎡</span></li>
                <li><p>租金要求：</p><span>每月200元</span></li>
                <li><p>物业要求：</p><span>有排污通道</span></li>
                <li><p>开店计划：</p><span>计划用来开餐饮</span></li>
                <div><p>需求备注：</p><span class="fontStyle">我想寻找这样的铺子，请尽快联系我</span></div>
            </ul>
        </div>     
    </div>
</template>

<script>
export default {
name: "demandDetails",
    data () {
        return {
                               
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/demandManagement'});            
        }

    },
    mounted() {
    	             
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.demandDetails{
    width: 7.5rem;
    padding-top: .9rem;
}
.demandDetailsBox{
    width: 7.5rem;
    background: #fff;
    margin-top: .15rem;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    ul{
        width: 6.9rem;
        margin-left: .3rem;
        color: #333;
        font-size: .3rem;
        li{
            height: .9rem;
            p{
                width: 1.5rem;
                line-height: .9rem;
                text-align: right;
                display: inline-block;
            }
        }
    }
    .ulTop{
        border-bottom: 1px solid #eaeaea;
    }
    .ulBottom{
        width: 6.9rem;
        div{
            margin-top: .2rem;
            padding-bottom: .3rem;
            p{
                display: inline;            
            }
            .fontStyle{
                /*display: inline;*/
                width: 6.9rem;
                line-height: .5rem;
            }
        }
    }
}
</style>
