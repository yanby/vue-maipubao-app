<template>
    <div class="demandManagement">
       <div>
       	    <div class="nav clearfix">
                <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
                <h2 class="navTitle fl">需求管理</h2>
            </div>
            <div class="demandBox">
            	<dl>
                    <router-link to="/demandDetails">
                		<dt class="fl">
                		    <p>需求标题：<span>我要求租我要求租求租</span></p>
                		    <p>需求类型：<span>求租</span></p>
                		</dt>
                		<dd  class="fr">
                			<span>2017-06-09</span>
                			<img src="../../../static/images/common/more.png">
                		</dd>
                    </router-link>
            	</dl>
            	<dl>
                    <router-link to="/demandDetails">
                		<dt class="fl">
                		    <p>需求标题：<span>我要求购</span></p>
                		    <p>需求类型：<span>求购</span></p>
                		</dt>
                		<dd  class="fr">
                			<span>2017-06-09</span>
                			<img src="../../../static/images/common/more.png">
                		</dd>
                    </router-link>
            	</dl>
            	<dl>
                    <router-link to="/demandDetails">
                		<dt class="fl">
                		    <p>需求标题：<span>我要出租</span></p>
                		    <p>需求类型：<span>出租</span></p>
                		</dt>
                		<dd  class="fr">
                			<span>2017-06-09</span>
                			<img src="../../../static/images/common/more.png">
                		</dd>
                    </router-link>
            	</dl>
            	<dl>
                    <router-link to="/demandDetails">
                		<dt class="fl">
                		    <p>需求标题：<span>我要出售</span></p>
                		    <p>需求类型：<span>出售</span></p>
                		</dt>
                		<dd  class="fr">
                			<span>2017-06-09</span>
                			<img src="../../../static/images/common/more.png">
                		</dd>
                    </router-link>
            	</dl>
            </div>
       </div>
    </div>
</template>

<script>
export default {
name: "demandManagement",
    data () {
        return {
                               
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/mine'});            
        },
     //    moreBtn(){
    	// 	this.$router.push({path: '/demandDetails'}); 	
    	// }

    },
    mounted() {
    	             
    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
.demandManagement{
    width: 7.5rem;
    padding-top: .9rem;
}
.demandBox{
	width: 7.5rem;
	background: #fff;
	border-top: 1px solid #eaeaea;
	border-bottom: 1px solid #eaeaea;
	margin-top: .15rem;
	dl{
		width: 6.9rem;
		height: 1.5rem;
		margin-left: .3rem;
		border-top: 1px solid #eaeaea;
		dt{
			color: #333;
			font-size: .3rem;
			margin-top: .3rem;
			p{
				margin-bottom: .2rem;
			}
		}
		dd{
			span{
				color: .26rem;
			    color: #898989;
			    line-height: 1.5rem;
			}
			img{
				width: .14rem;
				height: .24rem;
				margin-left: .3rem;
				position: relative;
				top: -.02rem;
			}			
		}
	}
	dl:first-child{
		border-top: none;
	}

}
</style>
