<template>
    <div class="myGroup">
      <div class="orderTop">
        <div class="nav clearfix">
          <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
          <h2 class="navTitle fl">我的团队</h2>
        </div>
        <div class="orderNav">
            <ul class="clearfix">
                <li class="li1" :class="{'on':tab==0}" @click="tuijianFun()">推荐<span></span></li>
                <li class="li2" :class="{'on':tab==1}" @click="tuantuiFun()">团队<span></span></li>
            </ul>
        </div>
      </div>
      <div class="content">
        <div v-if="teamLevel==0" class="tuijian">
          <div class="tuijian-bg">
            <ul class="clearfix">
              <li>
                <p>{{referreInfo.toReCount}}人</p>
                <p>今日推荐</p>
              </li>
              <li>
                <p>{{referreInfo.referrer_count }}人</p>
                <p>累计推荐</p>
              </li>
              <li>
                <p>{{referreInfo.referrer_account}}元</p>
                <p>今日奖励金额</p>
              </li>
              <li>
                <p>{{referreInfo.total}}元</p>
                <p>累计奖励金额</p>
              </li>
            </ul>
          </div>
          <div class="tuijian-msg">
            <h3><b></b><i>我的推荐</i><span>{{totalCount}}人</span></h3>
            <ul>
              <li class="clearfix" v-for="item in referrerRelationList">
                <div class="img">
                  <img src="../../../static/images/group/touxiang.png" alt="">
                </div>
                <div class="chenyuan">
                  <h4>{{item.name || item.mobile}}</h4>
                  <p><span></span>交易量 <b>{{item.orderCount}}笔</b></p>
                  <p><i></i>累计奖励<s>{{item.amount}}元</s></p>
                </div>
                <div class="lianxi"><a :href="'tel:'+item.mobile"><span><b></b>去联系</span></a></div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="teamLevel==1" class="tuandui-my">
          <div class="tuandui-bg">
            <p>团队名称：{{teamInfo.teamName}} <span @click="jiesanFun()">解散</span></p>
            <div>创建时间：{{teamInfo.createTime}}</div>
          </div>
          <div class="tuandui-msg">
            <ul class="clearfix">
              <li>
                <p>{{teamInfo.orderCount}}单</p>
                <p>交易量</p>
              </li>
              <li>
                <p>{{teamInfo.team_account}}元</p>
                <p>累计奖励</p>
              </li>
            </ul>
          </div>
          <div class="tuijian-msg">
            <h3><b></b><i>我的团队</i><span>{{totalCount}}人</span></h3>
            <ul>
              <li class="clearfix" v-for="item in teamRelationList">
                <div class="img">
                  <img :src="item.url" alt="">
                </div>
                <div class="chenyuan">
                  <h4>{{item.name}}</h4>
                  <p><span></span>交易量 <b>{{item.orderCount}}笔</b></p>
                  <p><i></i>累计奖励<s>{{item.amount}}元</s></p>
                </div>
                <div class="lianxi"><span @click="jiesanFun(item)">解绑</span><span @click="lianxiFun(item)"><b></b>去联系</span></div>
                <div class="next" @click="erjiFun(item)"><span></span></div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="teamLevel==2" class="tuandui-erji">
          <div class="tuandui-bg">
            <p>团队名称：{{teamInfo.teamName}} <span @click="jiesanFun()">解散</span></p>
            <p>创 始 人 ：{{teamInfo.upperName}} <a :href="mobile"></a></p>
            <p>团队人数：{{teamInfo.count}}人 <b>创建时间：{{teamInfo.createTime}}</b></p>
          </div>
          <div class="tuijian-msg">
            <h3><b></b><i>我的团队</i><span>{{totalCount}}人</span></h3>
            <ul>
              <li class="clearfix" v-for="item in teamRelationList">
                <div class="img">
                  <img src="../../../static/images/group/touxiang.png" alt="">
                </div>
                <div class="chenyuan">
                  <h4>{{item.name}}</h4>
                  <p><span></span>交易量 <b>{{item.orderCount}}笔</b></p>
                  <p><i></i>累计奖励<s>{{item.amount}}元</s></p>
                </div>
                <div class="lianxi"><span @click="jiesanFun(item)">解绑</span><span @click="lianxiFun(item)"><b></b>去联系</span></div>
                <div class="next" @click="sanjiFun(item)"><span></span></div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="teamLevel==3" class="tuandui-other">
          <div class="tuandui-bg">
            <p>团队名称：{{teamInfo.teamName}} <span @click="jiesanFun()">解散</span></p>
            <div>创建时间：{{teamInfo.createTime}}</div>
          </div>
          <div class="tuandui-msg">
            <p><span></span><em>团队人数：{{teamInfo.count}}</em></p>
            <p><b></b><em>上级姓名：{{teamInfo.upperName}}</em></p>
            <p><i></i><em>联系方式：{{teamInfo.mobile}} </em></p>
            <div class="caozuo">
              <span><a :href="'tel:'+item.mobile"><b></b>去联系</a></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 暂无团队 -->
      <div class="noOrder" v-if="order">
        <dl>
          <dt>
            <img src="../../../static/images/common/noOrders.png">
          </dt>
          <p>暂无数据</p>
        </dl>
      </div>
    </div>
</template>


<script>
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
          mobile:"",//创始人电话
          tab: 0,//推荐团队
          order: "",//有无数据
          totalCount:"",//推荐总人数
          referreInfo:"",// 登录人的推荐
          referrerRelationList:"",//推荐人下级推荐列表及信息
          teamInfo:"",//团队信息
          teamRelationList:"",//团队列表
          teamLevel:"",//团队几级
        }
    },
    mounted(){
      if(this.$route.query.url){
        this.tab = 1
      }
      this.init();
    },
    methods:{
      navBack(){
        this.$router.push({path:"/mine"})
      },
      init(){
         if(this.tab == 0){
           this.teamLevel=0;
           this.order = false;
           var data = {
             type : 1
           }
         }else{
           var data = {
             type : 2
           }
         }
        this.$http({
          url: this.changeData() + "/team/auth/teamRelation",
          method: 'post',
          params: data
        }).then(res => {
          console.log(res)
          //推荐信息
          if(data.type == 2){
            //团队信息
            this.teamLevel = res.data.teamLevel;
            this.teamInfo = res.data.teamInfo;
            this.mobile = "tel:"+this.teamInfo.mobile;
            this.totalCount = res.data.totalCount;
            this.teamRelationList = res.data.teamRelationList;
            if(this.teamLevel == ""){
              this.teamLevel = 5;
              this.order = true;
            }
          }else{
            this.referreInfo = res.data.referreInfo;
            this.totalCount = res.data.totalCount;
            this.referrerRelationList = res.data.referrerRelationList;
          }
        }).catch(err => {
          console.log(err)
        });
      },
      tuijianFun(){
        this.tab = 0;
        this.teamLevel=0;
        this.init();
      },
      tuantuiFun(){
        this.tab = 1;
        this.teamLevel=1;
        this.init();
      },
      go(){
        this.$router.push({path:"/buymember",query:{order: 1}})
      },
      erjiFun(item){
        this.$router.push({path:"/groupMember",query:{id:item.id,name:item.name}})
      },
      sanjiFun(item){
        this.$router.push({path:"/groupDetail",query:{id:item.id}})
      },
      lianxiFun(item){
        MessageBox.confirm('', {
          message: '确定拨打电话？',
          title: '提示',
          confirmButtonText:'拨打',
          cancelButtonText:'取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            window.location.href = "tel:"+item.mobile;
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调

          }
        });
      },
      jiesanFun(item){
        var that = this;
        if(item){
          var data = {
            id : item.id
          }
        }else{
          var data = {
            id : this.teamInfo.id
          }
        }
        MessageBox.confirm('', {
          message: '确认要解散团队吗？',
          title: '提示',
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            that.$http({
              url: that.changeData() + "/team/auth/disband",
              method: 'post',
              params: data
            }).then(res => {
              console.log(res)
              if(res.data.code == 101){
                Toast("解散成功！")
                this.init();
              }else{
                Toast(res.data.message)
              }
            }).catch(err => {
              console.log(err)
            });
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        });
      }
    },
}
</script>
<style scoped lang="scss"  type="text/scss">
  @import "../../../static/css/nav.css";
  .myGroup{
    width: 7.5rem;
    margin: 0 auto;
    .nav{
      border: none;
    }
    .orderNav{
      margin-top: .9rem;
    }
    .content{
      margin-top: 2.3rem;
      .tuijian{
        padding: 0 .3rem;
        .tuijian-bg{
          width: 6.9rem;
          height: 2.91rem;
          background: url(../../../static/images/group/tuijian-bg.png) no-repeat;
          -webkit-background-size: 6.9rem 2.91rem;
          background-size: 6.9rem 2.91rem;
          li{
            text-align: center;
            width: 50%;
            height: 1.1rem;
            float: left;
            padding-top: .38rem;
            p{
              font-size: .34rem;
              color: #fff;
              margin-bottom: .16rem;
            }
          }
        }
        .tuijian-msg{
          padding: 0 .2rem .4rem;
          background: #fff;
          margin-top: .2rem;
          h3{
            height: .9rem;
            line-height: .9rem;
            b{
              display: inline-block;
              vertical-align: -.1rem;
              width: .44rem;
              height: .44rem;
              background: url(../../../static/images/group/xueyuan.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            i{
              display: inline-block;
              font-size: .3rem;
              margin-left: .2rem;
            }
            span{
              margin-left: .1rem;
              display: inline-block;
              vertical-align: middle;
              font-size: .32rem;
              color: #64ABFF;
            }
          }
          ul{
            li{
              position: relative;
              height: 2.05rem;
              padding-top: .4rem;
              border-bottom: 0.01rem solid #EAEAEA;
              .img{
                width: .88rem;
                height: 2.05rem;
                float: left;
                img{
                  width: .88rem;
                  height: .88rem;
                }
              }
              .chenyuan{
                float: left;
                margin-left: .28rem;
                h4{
                  font-size: .3rem;
                  color: #333;
                  margin-bottom: .38rem;
                }
                p{
                  font-size: .3rem;
                  margin-bottom: .2rem;
                  span,i{
                    display: inline-block;
                    vertical-align: middle;
                    width: 0.15rem;
                    height: 0.15rem;
                    margin-right: .1rem;
                    background: url(../../../static/images/group/lvse.png) no-repeat;
                    -webkit-background-size: 0.15rem 0.15rem;
                    background-size: 0.15rem 0.15rem;
                  }
                  b{
                    color: #64ABFF;
                    margin-left: .4rem;
                  }
                  i{
                    background: url(../../../static/images/group/juse.png) no-repeat;
                    -webkit-background-size: 0.15rem 0.15rem;
                    background-size: 0.15rem 0.15rem;
                  }
                  s{
                    color: #FA513C;
                    margin-left: .2rem;
                  }
                }
              }
              .lianxi{
                position: absolute;
                right: 0;
                top: .4rem;
                color: #fff;
                text-align: center;
                a{
                  color: #fff;
                  span{
                    width: 1.4rem;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    display: inline-block;
                    vertical-align: middle;
                    background: #64ABFF;
                    border-radius: .05rem;
                    margin-right: .2rem;
                  }
                  b{
                    display: inline-block;
                    vertical-align: middle;
                    width: .26rem;
                    height: .26rem;
                    background: url(../../../static/images/group/tel.png) no-repeat;
                    -webkit-background-size: .26rem .26rem;
                    background-size: .26rem .26rem;
                    margin-right: .1rem;
                  }
                }
              }
              .next{
                position: absolute;
                right: .1rem;
                margin-top: 1rem;
                width: .6rem;
                height: .6rem;
                text-align: center;
                span{
                  display: inline-block;
                  margin-top: .2rem;
                  width: 0.15rem;
                  height: 0.28rem;
                  background: url(../../../static/images/common/more.png) no-repeat;
                  -webkit-background-size: 0.15rem 0.28rem;
                  background-size: 0.15rem 0.28rem;
                }
              }
            }
          }
        }
      }
      .tuandui-my{
        .tuandui-bg{
          width: 6.9rem;
          margin: 0 auto;
          height: 1.64rem;
          background: url(../../../static/images/group/tuantui-bg.png) no-repeat;
          -webkit-background-size: 6.9rem 1.64rem;
          background-size: 6.9rem 1.64rem;
          p{
            padding: .3rem .3rem 0;
            font-size: .3rem;
            span{
              float: right;
              color: #64ABFF;
            }
          }
          div{
            padding: .3rem .3rem 0;
            font-size: .3rem;
            text-align: right;
            color: #898989;
          }
        }
        .tuandui-msg{
          width: 6.9rem;
          height: 1.42rem;
          margin: .2rem auto;
          background: url(../../../static/images/group/tuandui-msg.png) no-repeat;
          -webkit-background-size: 6.9rem 1.42rem;
          background-size: 6.9rem 1.42rem;
          ul{
            li{
              width: 50%;
              float: left;
              color: #fff;
              padding-top: .3rem;
              text-align: center;
              p{
                font-size: .28rem;
                margin-bottom: .2rem;
              }
            }
          }
        }
        .tuijian-msg{
          padding: 0 .2rem .4rem;
          background: #fff;
          margin-top: .2rem;
          h3{
            height: .9rem;
            line-height: .9rem;
            b{
              display: inline-block;
              vertical-align: middle;
              width: .44rem;
              height: .44rem;
              background: url(../../../static/images/group/xueyuan.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            i{
              display: inline-block;
              vertical-align: middle;
              font-size: .3rem;
              margin-left: .2rem;
            }
            span{
              margin-left: .1rem;
              display: inline-block;
              vertical-align: middle;
              font-size: .32rem;
              color: #64ABFF;
            }
          }
          ul{
            li{
              position: relative;
              height: 2.05rem;
              padding-top: .4rem;
              border-bottom: 0.01rem solid #EAEAEA;
              .img{
                width: .88rem;
                height: 2.05rem;
                float: left;
                img{
                  width: .88rem;
                  height: .88rem;
                }
              }
              .chenyuan{
                float: left;
                margin-left: .28rem;
                h4{
                  font-size: .3rem;
                  color: #333;
                  margin-bottom: .38rem;
                }
                p{
                  font-size: .3rem;
                  margin-bottom: .2rem;
                  span,i{
                    display: inline-block;
                    vertical-align: middle;
                    width: 0.15rem;
                    height: 0.15rem;
                    margin-right: .1rem;
                    background: url(../../../static/images/group/lvse.png) no-repeat;
                    -webkit-background-size: 0.15rem 0.15rem;
                    background-size: 0.15rem 0.15rem;
                  }
                  b{
                    color: #64ABFF;
                    margin-left: .4rem;
                  }
                  i{
                    background: url(../../../static/images/group/juse.png) no-repeat;
                    -webkit-background-size: 0.15rem 0.15rem;
                    background-size: 0.15rem 0.15rem;
                  }
                  s{
                    color: #FA513C;
                    margin-left: .2rem;
                  }
                }
              }
              .lianxi{
                position: absolute;
                right: 0;
                top: .4rem;
                color: #fff;
                text-align: center;
                span{
                  width: 1.4rem;
                  height: 0.48rem;
                  line-height: 0.48rem;
                  display: inline-block;
                  vertical-align: middle;
                  background: #64ABFF;
                  border-radius: .05rem;
                  margin-right: .2rem;
                }
                a{
                  color: #fff;
                  span{
                    width: 1.4rem;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    display: inline-block;
                    vertical-align: middle;
                    background: #64ABFF;
                    border-radius: .05rem;
                    margin-right: .2rem;
                  }
                  b{
                    display: inline-block;
                    vertical-align: middle;
                    width: .26rem;
                    height: .26rem;
                    background: url(../../../static/images/group/tel.png) no-repeat;
                    -webkit-background-size: .26rem .26rem;
                    background-size: .26rem .26rem;
                    margin-right: .1rem;
                  }
                }
              }
              .next{
                position: absolute;
                right: .1rem;
                margin-top: 1rem;
                width: .6rem;
                height: .6rem;
                text-align: center;
                span{
                  display: inline-block;
                  margin-top: .2rem;
                  width: 0.15rem;
                  height: 0.28rem;
                  background: url(../../../static/images/common/more.png) no-repeat;
                  -webkit-background-size: 0.15rem 0.28rem;
                  background-size: 0.15rem 0.28rem;
                }
              }
            }
          }
        }
      }
      .tuandui-other{
        .tuandui-bg{
          width: 6.9rem;
          margin: 0 auto;
          height: 1.64rem;
          background: url(../../../static/images/group/tuantui-bg.png) no-repeat;
          -webkit-background-size: 6.9rem 1.64rem;
          background-size: 6.9rem 1.64rem;
          p{
            padding: .3rem .3rem 0;
            font-size: .3rem;
            span{
              float: right;
              color: #64ABFF;
            }
          }
          div{
            padding: .3rem .3rem 0;
            font-size: .3rem;
            text-align: right;
            color: #898989;
          }
        }
        .tuandui-msg{
          background: #fff;
          width: 6.9rem;
          height: 2.2rem;
          margin: .2rem auto;
          padding-top: .2rem;
          border-radius: .1rem;
          position: relative;
          p{
            padding: 0 .2rem;
            font-size: .3rem;
            margin-bottom: .3rem;
            span,b,i{
              display: inline-block;
              vertical-align: middle;
              width: .44rem;
              height: .44rem;
              margin-right: .2rem;
              background: url(../../../static/images/group/renshu.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            b{
              background: url(../../../static/images/group/xingming.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            i{
              background: url(../../../static/images/group/iphone.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            em{
              display: inline-block;
              vertical-align: middle;
            }
          }
          .caozuo{
            position: absolute;
            top: .2rem;
            right: 0;
            font-size: 0;
            a{
              display: inline-block;
              vertical-align: middle;
              color: #fff;
              font-size: .28rem;
            }
            span{
              width: 1.4rem;
              height: 0.48rem;
              line-height: 0.48rem;
              display: inline-block;
              vertical-align: middle;
              background: #64ABFF;
              border-radius: .05rem;
              margin-right: .2rem;
              b{
                display: inline-block;
                vertical-align: middle;
                margin-right: .1rem;
                margin-left: .1rem;
                width: .26rem;
                height: .26rem;
                background: url(../../../static/images/group/tel.png) no-repeat;
                -webkit-background-size: .26rem .26rem;
                background-size: .26rem .26rem;
              }

            }
          }
        }
        .tuijian-msg{
          margin: 0 .3rem .4rem;
          background: #fff;
          margin-top: .2rem;
          padding: 0 .2rem;
          h3{
            height: .9rem;
            line-height: .9rem;
            b{
              display: inline-block;
              vertical-align: middle;
              width: .44rem;
              height: .44rem;
              background: url(../../../static/images/group/xueyuan.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            i{
              display: inline-block;
              vertical-align: middle;
              font-size: .3rem;
              margin-left: .2rem;
            }
            span{
              margin-left: .1rem;
              display: inline-block;
              vertical-align: middle;
              font-size: .32rem;
              color: #64ABFF;
            }
          }
          ul{
            li{
              position: relative;
              padding-top: .4rem;
              border-bottom: 0.01rem solid #EAEAEA;
              .img{
                width: .88rem;
                height: 2.8rem;
                float: left;
                img{
                  width: .88rem;
                  height: .88rem;
                }
              }
              .chenyuan{
                float: left;
                margin-left: .28rem;
                h4{
                  font-size: .3rem;
                  color: #333;
                  margin-bottom: .38rem;
                }
                p{
                  font-size: .3rem;
                  margin-bottom: .2rem;
                  &.teshu{
                    color: #898989;
                  }
                  span{
                    color: #64ABFF;
                  }
                  b{
                    color: #FA513C;
                  }
                }
              }
              .lianxi{
                position: absolute;
                right: 0;
                top: .4rem;
                color: #fff;
                text-align: center;
                span{
                  display: inline-block;
                  width: 1.44rem;
                  height: 0.54rem;
                  line-height: 0.54rem;
                  display: inline-block;
                  vertical-align: middle;
                  background: #64ABFF;
                  border-radius: .05rem;
                  font-size: .28rem;
                }
                span:nth-of-type(1){
                  margin-right: .2rem;
                }
                b{
                  display: inline-block;
                  vertical-align: middle;
                  width: .26rem;
                  height: .26rem;
                  background: url(../../../static/images/group/tel.png) no-repeat;
                  -webkit-background-size: .26rem .26rem;
                  background-size: .26rem .26rem;
                  margin-right: .1rem;
                }
              }
              .next{
                position: absolute;
                right: .1rem;
                margin-top: 1.1rem;
                width: .6rem;
                height: .6rem;
                text-align: center;
                span{
                  display: inline-block;
                  margin-top: .2rem;
                  width: 0.15rem;
                  height: 0.28rem;
                  background: url(../../../static/images/common/more.png) no-repeat;
                  -webkit-background-size: 0.15rem 0.28rem;
                  background-size: 0.15rem 0.28rem;
                }
              }
            }
          }
        }
      }
      .tuandui-erji{
        .tuandui-bg{
          width: 6.9rem;
          margin: 0 auto;
          height: 2.1rem;
          background: url(../../../static/images/group/tuandui.png) no-repeat;
          -webkit-background-size: 6.9rem 2.1rem;
          background-size: 6.9rem 2.1rem;
          p{
            padding: .25rem .3rem 0;
            font-size: .3rem;
            span{
              float: right;
              color: #64ABFF;
            }
            a{
              display: inline-block;
              vertical-align: middle;
              width: 0.48rem;
              height: 0.48rem;
              margin-left: .3rem;
              background: url(../../../static/images/group/lianxi.png) no-repeat;
              -webkit-background-size: 0.48rem 0.48rem;
              background-size: 0.48rem 0.48rem;
            }
            b{
              float: right;
              color: #898989;
            }
          }
          div{
            padding: .3rem .3rem 0;
            font-size: .3rem;
            text-align: right;
            color: #898989;
          }
        }
        .tuandui-msg{
          width: 6.9rem;
          height: 1.42rem;
          margin: .2rem auto;
          background: url(../../../static/images/group/tuandui-msg.png) no-repeat;
          -webkit-background-size: 6.9rem 1.42rem;
          background-size: 6.9rem 1.42rem;
          ul{
            li{
              width: 50%;
              float: left;
              color: #fff;
              padding-top: .3rem;
              text-align: center;
              p{
                font-size: .28rem;
                margin-bottom: .2rem;
              }
            }
          }
        }
        .tuijian-msg{
          padding: 0 .2rem .4rem;
          background: #fff;
          margin-top: .2rem;
          h3{
            height: .9rem;
            line-height: .9rem;
            b{
              display: inline-block;
              vertical-align: middle;
              width: .44rem;
              height: .44rem;
              background: url(../../../static/images/group/xueyuan.png) no-repeat;
              -webkit-background-size: .44rem .44rem;
              background-size: .44rem .44rem;
            }
            i{
              display: inline-block;
              vertical-align: middle;
              font-size: .3rem;
              margin-left: .2rem;
            }
            span{
              margin-left: .1rem;
              display: inline-block;
              vertical-align: middle;
              font-size: .32rem;
              color: #64ABFF;
            }
          }
          ul{
            li{
              position: relative;
              height: 2.05rem;
              padding-top: .4rem;
              border-bottom: 0.01rem solid #EAEAEA;
              .img{
                width: .88rem;
                height: 2.05rem;
                float: left;
                img{
                  width: .88rem;
                  height: .88rem;
                }
              }
              .chenyuan{
                float: left;
                margin-left: .28rem;
                h4{
                  font-size: .3rem;
                  color: #333;
                  margin-bottom: .38rem;
                }
                p{
                  font-size: .3rem;
                  margin-bottom: .2rem;
                  span,i{
                    display: inline-block;
                    vertical-align: middle;
                    width: 0.15rem;
                    height: 0.15rem;
                    margin-right: .1rem;
                    background: url(../../../static/images/group/lvse.png) no-repeat;
                    -webkit-background-size: 0.15rem 0.15rem;
                    background-size: 0.15rem 0.15rem;
                  }
                  b{
                    color: #64ABFF;
                    margin-left: .4rem;
                  }
                  i{
                    background: url(../../../static/images/group/juse.png) no-repeat;
                    -webkit-background-size: 0.15rem 0.15rem;
                    background-size: 0.15rem 0.15rem;
                  }
                  s{
                    color: #FA513C;
                    margin-left: .2rem;
                  }
                }
              }
              .lianxi{
                position: absolute;
                right: 0;
                top: .4rem;
                color: #fff;
                text-align: center;
                span{
                  width: 1.4rem;
                  height: 0.48rem;
                  line-height: 0.48rem;
                  display: inline-block;
                  vertical-align: middle;
                  background: #64ABFF;
                  border-radius: .05rem;
                  margin-right: .2rem;
                }
                a{
                  color: #fff;
                  span{
                    width: 1.4rem;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    display: inline-block;
                    vertical-align: middle;
                    background: #64ABFF;
                    border-radius: .05rem;
                    margin-right: .2rem;
                  }
                  b{
                    display: inline-block;
                    vertical-align: middle;
                    width: .26rem;
                    height: .26rem;
                    background: url(../../../static/images/group/tel.png) no-repeat;
                    -webkit-background-size: .26rem .26rem;
                    background-size: .26rem .26rem;
                    margin-right: .1rem;
                  }
                }
              }
              .next{
                position: absolute;
                right: .1rem;
                margin-top: 1rem;
                width: .6rem;
                height: .6rem;
                text-align: center;
                span{
                  display: inline-block;
                  margin-top: .2rem;
                  width: 0.15rem;
                  height: 0.28rem;
                  background: url(../../../static/images/common/more.png) no-repeat;
                  -webkit-background-size: 0.15rem 0.28rem;
                  background-size: 0.15rem 0.28rem;
                }
              }
            }
          }
        }
      }
    }
  }
.myGroup{
    width: 7.5rem;
    background: #f7f8fa;
}
.orderTop{
  position: fixed;
  top: 0;
  height: 1.9rem;
  z-index: 99;
  background: #fff;
  border-bottom: 0.01rem solid #eee;
}



.orderNav{
  width: 7.5rem;
    height: 1rem;
}
.orderNav li{
    height: 1rem;
    float: left;
    color: #555;
    text-align: center;
    position: relative;
    font-size: .28rem;
    span{
        display: none;
        width: .62rem;
        height: .04rem;
        background: #49ACFF;
        position: absolute;
        left: 50%;
        margin-left:-.31rem;
        bottom: 0;
    }
    &.on{
        color: #64abff;
        span{
            display: block;
        }
    }
}
.orderNav .li1,.orderNav .li2{
    width: 50%;
    line-height: 1rem;
}

.whole{
  margin-top: 2.3rem;
}
.orderMain{
    width: 94%;
    margin-top: 0.3rem;
    margin-left: 3%;
    border-radius: 0.1rem;
    background: #fff;
}
.orderMain ul{
    height: 0.96rem;
    border-bottom: 0.02rem solid #fafafa;
}
.orderMain ul>li{
    float: left;
}
.orderMain .li1{
    color: #333;
    font-size: 0.36rem;
    margin-left: 0.2rem;
    line-height: 0.96rem;
}
.orderMain .li2{
    float: right;
}
.orderMain .li2>div{
    width: 1.4rem;
    height: 0.5rem;
    font-size: 0.28rem;
    border: 1px solid #64aaff;
    color: #64aaff;
    text-align: center;
    line-height: 0.52rem;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    border-radius: 5px;
    a{
        color: #64aaff;
    }
}
.orderMain .li2>div.yishixiao{
  border: none!important;
  color: #ccc;
}
.orderMain .li2>h4{
    line-height: 0.98rem;
    margin-right: 0.2rem;
    color: #ccc;
}
.orderMainDl{
    /*height: 2.2rem;*/
  padding-bottom: .3rem;
}
.orderMainDl dt{
    width: 1.2rem;
    /*height: 2.2rem;*/
    margin-top: 0.3rem;
    margin-left: 0.2rem;

    float: left;
}
.orderMainDl dt>img{
    width: 0.83rem;
    height: 0.83rem;
    float: left;
}
.orderMainDl dd{
    font-size: 0.28rem;
    color: #666;
    float: left;
}
.orderMainDl p{
    line-height: 0.5rem;
}
.orderMainDl .p1{
    margin-top: 0.1rem;
}

.noOrder{
    width: 7.5rem;
    .noOrderTop{
        height: 1rem;
        text-align: center;
        background: #fff;
        border-bottom: 0.02rem solid #eee;
        position: relative;
        h3{
            width: 75%;
            line-height: 1rem;
            font-size: 0.36rem;
            color: #333;
            float: left;
            text-align: center;
        }
        i{
            display: inline-block;
            width: 13%;
            height: 1rem;
            line-height: 1rem;
            float: left;
            img{
                width: 0.4rem;
                height: 0.4rem;
            }
        }
    }
    dl{
        width: 7.5rem;
        /*height: 6rem;*/
        /*background: pink;*/
        text-align: center;
        dt{
            /*width: 3rem;
            height: 3rem;*/
            /*background: red;*/
            margin-top: 4rem;
            img{
                width: 1.68rem;
                height: 1.68rem;
            }
        }
        p{
            font-size: .28rem;
            color: #898989;
            margin-top: .38rem;
            margin-bottom: .5rem;
        }
        dd{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
            span{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
                display: inline-block;
                width: 3rem;
                height: .89rem;
                background: #47abff;
                line-height: .89rem;
                color: #fff;
                font-size: .34rem;
                border-radius: 5px;
            }
        }
    }
}



</style>













