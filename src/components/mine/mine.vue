<template>
    <div class="mine">
    	<div class="mineTop">
    		<ul>
	    		<li>
	    			<router-link to="/message">
		    			<img src="../../../static/images/mine/message.png" class="messageImg">
		    			<img src="../../../static/images/mine/redDot.png" class="redDotImg" v-if="this.pushStatusIndex == 1">
		    		</router-link>
	    		</li>
	    	</ul>
			<dl>
			   <dt class="fl">
				   	<router-link to="/personInfo">
				   	    <!-- <img src="../../../static/images/mine/chatHead.png" class="chatHeadImg"> -->
				   	    <img :src="imgDataUrl" class="chatHeadImg" :onerror="defaultImg">
				   	</router-link>
			   	</dt>
			   <dd class="fl">
			   	    <div class="mineTel">
			   	    	<h3 class="fl" v-if="userName == ''">{{userTel}}</h3>
			   	    	<h3 class="fl" v-else>{{userName}}</h3>
			   	    </div>
			   	    <p @click="goMember()">
			   	    	<!-- 0 无会员 1 普通会员 2 vip会员 3 白金会员 4 会员过期 -->
			   	    	<img src="../../../static/images/mine/kthy.png" v-if="this.isMember == 0">
			   	    	<img src="../../../static/images/mine/hy3.png" v-if="this.isMember == 1">
			   	    	<img src="../../../static/images/mine/hy2.png" v-if="this.isMember == 2">
			   	    	<img src="../../../static/images/mine/hy1.png" v-if="this.isMember == 3">
			   	    	<img src="../../../static/images/mine/hyxf.png" v-if="this.isMember == 4">
			   	    </p>
			   </dd>
		    </dl>
    	</div>
    	<div class="expand">
    		<dl class="dl1 fl">
    			<dt class="fl"><img src="../../../static/images/mine/tg.png"></dt>
    			<dd class="fl"><router-link to="/promotion">我要推广</router-link></dd>
    		</dl>
    		<dl class="dl2 fl">
    			<dt class="fl"><img src="../../../static/images/mine/td.png"></dt>
    			<dd class="fl" @click="goTeam()">
    				<!-- <router-link to="/groupTcp" "> -->
    				我要发展团队
    			    <!-- </router-link> -->
    			</dd>
    		</dl>
    	</div>
    	<div class="mineList mineList1">
    		<dl>
    			<dt><img src="../../../static/images/mine/dl1.png"></dt>
		        <router-link to="/balance">
		            <dd>
		                <span>账户余额</span>
		                <img src="../../../static/images/common/more.png">
		            </dd>
		        </router-link>
    		</dl>
    		<dl>
    			<dt><img src="../../../static/images/mine/dl2.png"></dt>
		        <router-link to="/myGroup">
		            <dd>
		                <span>我的团队</span>
		                <img src="../../../static/images/common/more.png">
		            </dd>
		        </router-link>
    		</dl>
    		<dl>
    			<dt><img src="../../../static/images/mine/dl3.png"></dt>
                <router-link to="/order">
		            <dd>
		              <span>我的订单</span>
		              <img src="../../../static/images/common/more.png">
		            </dd>
	            </router-link>
    		</dl>
    		<dl>
    			<dt><img src="../../../static/images/mine/dl5.png"></dt>
    			<router-link to="/concern">
	    			<dd>
	    				<span>我的关注</span>
	    				<img src="../../../static/images/common/more.png">
	    			</dd>
	    		</router-link>
    		</dl>
    		<dl>
    			<dt><img src="../../../static/images/mine/dl8.png"></dt>
    			<router-link to="/aboutUs">
	    			<dd>
					    <span>关于我们</span>
					    <img src="../../../static/images/common/more.png">
	    			</dd>
    			</router-link>
    		</dl>
    	</div>
    	<!-- <h5 class="mineH5">联系电话：022-5895-2606</h5> -->
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
name: "mine",
    data () {
        return {
        	userTel:"",
        	isMember: "",
        	imgDataUrl: '../../../static/images/mine/chatHead.png',
        	pushStatusIndex: "",
        	userName: "",
        	defaultImg: 'this.src="' + require('../../../static/images/mine/chatHead.png') + '"', //默认图片
        }
    },
    computed:{

    },
    methods:{
        // 个人信息展示
        userData() {
            let _this = this
            let url = this.changeData() + '/member/auth/memberInfo'
            axios(url,{
                method: 'post'
            }).then(data => {
                console.log(data);
                // console.log(data.data.memberInfo.mobile);
                var str = data.data.memberInfo.mobile;
			    var str2 = str.substr(0,3)+"****"+str.substr(7)
			    // 手机号码中间四位*代替
			    this.userTel = str2;
			    this.isMember = data.data.memberInfo.memberLevel;
			    this.imgDataUrl = data.data.memberInfo.iconPath;
			    this.pushStatusIndex = data.data.memberInfo.pushStatus;
			    this.userName =  data.data.memberInfo.userName;
			    // console.log(this.userName);
            }).catch(err => {
                console.log(err)
            });
        },

        goTeam(){
            let _this = this
            let url = this.changeData() + '/team/auth/createTeam'
            axios(url,{
                method: 'post'
            }).then(data => {
                // console.log(data);
                // groupTcp
                if(data.data.status == "0"){
                	this.$router.push({path: '/groupTcp'});
                }else if(data.data.status == "1"){
                	this.$router.push({path: '/develop'});
                }else{
                  Toast(data.data.message)
                }
            }).catch(err => {
                console.log(err)
            });
        },

        goMember(){
        	if(this.isMember == 0){
        		// this.$router.push({path: '/buymember'});
        		this.$router.push({path: '/buymember',query:{url: "mine"}});
        	}else{
        		this.$router.push({path: '/myMember'});
        	}
        }

    },
    mounted() {
    	// this.userData();
    	this.userData();
    },

}
</script>

<style lang="scss" type="text/scss" scoped>
.mine{
	width: 7.5rem;
}
/*头部*/
.mineTop{
	height: 2.66rem;
	ul{
		padding-top: .38rem;
		padding-bottom: .25rem;
		position: relative;
		li{
			height: .4rem;
			.messageImg{
				position: absolute;
			    right: .3rem;
				width: .4rem;
				height: .4rem;
			}
			.redDotImg{
				position: absolute;
			    right: .3rem;
				width: .12rem;
				height: .12rem;
			}
		}
	}
	dl{
		dt{
			margin-left: .7rem;
			margin-right: .46rem;
			img{
				width: 1.28rem;
				height: 1.28rem;
			}
		}
		dd{
			.mineTel{
				padding-top: .16rem;
				h3{
					color: #333;
					font-size: .34rem;
					margin-right: .38rem;
				}
			}
			p{
				margin-top: .68rem;
				/*margin-bottom: 1rem;*/
				img{
					width: 1.52rem;
				    height: .5rem;
				}
			}
		}
	}
}
/*我要推广 我要发展团队*/
.expand{
	width: 7.5rem;
	height: .4rem;
	padding: .3rem 0px;
	background: #fff;
	border-bottom: 1px solid #eaeaea;
	dl{
		width: 50%;
		height: .4rem;
		float: left;
		dt{
			margin-right: .3rem;
			img{
				width: .4rem;
				height: .4rem;
			}
		}
		dd{
			color: #333;
			font-size: .3rem;
			position: relative;
			top: .04rem;
		}
	}
	.dl1{
		border-right: 2px solid #eaeaea;
		box-sizing: border-box;
		dt{
			margin-left: .96rem;
		}
	}
	.dl2{
		dt{
			margin-left: .56rem;
		}
	}
}
/*列表*/
.mineList{
	background: #fff;
	dl{
		width: 6.9rem;
		height: .38rem;
		padding: .26rem 0;
		margin-left: .3rem;
		dt{
			margin-right: .28rem;
			float: left;
			img{
				width: .4rem;
				height: .38rem;
			}
		}
		dd{
			width: 6.2rem;
			color: #333;
			font-size: .28rem;
			float: left;
			position: relative;
			top: .02rem;
			span{
				color: #333;
				font-size: .28rem;
			}
			img{
				position: absolute;
				right: 0;
				top: .06rem;
				width: .12rem;
				height: .22rem;
			}
		}
	}
}
.mineList1{
	margin-top: .15rem;
	border-top: 1px solid #eaeaea;
	border-bottom: 1px solid #eaeaea;
}
.aboutUs{
	padding: .2rem 0;
}
/*退出登录*/
.logout{
	width: 5.28rem;
	line-height: 0.78rem;
	color: #898989;
	text-align: center;
	font-size: .34rem;
	background: #e1e1e1;
	margin: .6rem auto 1.5rem;
}
.mineH5{
	color: #898989;
	font-size: .16rem;
	text-align: center;
	line-height: 1rem;
}
</style>
