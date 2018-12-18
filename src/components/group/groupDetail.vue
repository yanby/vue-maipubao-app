<template>
    <div class="groupDetail">
      <div class="title">
        <div class="msg">
          <div class="img"><img :src="thirdLevelInfo.url" alt="" :onerror="defaultImg"></div>
          <h3><span>{{thirdLevelInfo.userName}}</span><b></b></h3>
          <p>手机号码：{{thirdLevelInfo.mobile}}</p>
          <p>注册时间：{{thirdLevelInfo.createTime}}</p>
          <div class="back" @click="navBack()"></div>
        </div>
      </div>
      <div class="content">
        <h3>交易信息</h3>
        <ul>
          <li class="one">
           <div class="list"><b></b>{{thirdLevelInfo.callCount}} 组</div> <div class="list"><i></i>{{thirdLevelInfo.visitCount}} 组</div>
          </li>
          <li class="two">
            <div class="list1">累计报备</div>
            <div class="list2">累计到访</div>
          </li>
          <li class="three">
            <div class="list"><span></span><b>{{thirdLevelInfo.payCount}}单</b></div>
          </li>
          <li class="four">
            <span>累计结佣单数</span><b>销售单{{thirdLevelInfo.sale}} 单</b><i>招商单{{thirdLevelInfo.business}}单</i>
          </li>
          <li class="five"><span></span><b>累计结佣金额</b> <i>{{thirdLevelInfo.amount}}元</i></li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
              thirdLevelInfo:"",//信息
              defaultImg: 'this.src="' + require('../../../static/images/common/user.png') + '"'
            }
        },
      mounted(){
          this.init()
    },
        methods: {
          navBack() {
            // if(this.$route.query.url){
            //   this.$router.push({path: "/" + this.$route.query.url,query:{id:this.$route.query.id}})
            // }else{
            //   this.$router.push({path:"/myGroup"})
            // }
            this.$router.go(-1)
          },
          init(){
            this.$http({
              url: this.changeData() + "/team/auth/teamRelation",
              method: 'post',
              params: {
                id: this.$route.query.userId
              }
            }).then(res => {
              console.log(res)
              //推荐信息
              this.thirdLevelInfo = res.data.thirdLevelInfo;
            }).catch(err => {
              console.log(err)
            });
          },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  .groupDetail{
    width: 7.5rem;
    background: #fff;
    margin: 0 auto;
    .title{
      width: 7.5rem;
      height: 5.37rem;
      margin: 0 auto;
      background: url(../../../static/images/group/detail.png) no-repeat;
      -webkit-background-size: 7.5rem 5.37rem;
      background-size: 7.5rem 5.37rem;
      .msg{
        padding-top: 1.5rem;
        padding-left: .84rem;
        position: relative;
        .back{
          position: absolute;
          left: .3rem;
          top: .3rem;
          width: .36rem;
          height: .36rem;
          background: url(../../../static/images/common/back.png) no-repeat;
          -webkit-background-size: .36rem .36rem;
          background-size: .36rem .36rem;
        }
        .img{
          width: 1.44rem;
          height: 1.44rem;
          margin:0 auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
        h3{
          margin: .2rem 0 .4rem;
          text-align: center;
          span{
            font-size: .34rem;
            margin-right: .2rem;
          }
          b{
            display: inline-block;
            width: .3rem;
            height: .3rem;
            background: url(../../../static/images/group/mingzi.png) no-repeat;
            -webkit-background-size: .3rem .3rem;
            background-size: .3rem .3rem;
          }
        }
        p{
          font-size: .3rem;
          margin-bottom: .2rem;
        }
      }
    }
    .content{
      padding: .5rem .3rem;
      h3{
        font-size: .34rem;
        margin-bottom: .4rem;
      }
      ul{
        li{
          margin-bottom: .2rem;
          overflow: hidden;
          &.one{
            .list{
              font-size: .3rem;
              color: #64ABFF;
              margin-right: 1.7rem;
              float: left;
              b,i{
                display: inline-block;
                vertical-align: middle;
                margin-right: .2rem;
                width: .28rem;
                height: .28rem;
                background: url(../../../static/images/group/baobei.png) no-repeat;
                -webkit-background-size: .28rem .28rem;
                background-size: .28rem .28rem;
              }
              i{
                background: url(../../../static/images/group/men.png) no-repeat;
                -webkit-background-size: .28rem .28rem;
                background-size: .28rem .28rem;
              }
            }
          }
          &.two{
            font-size: .3rem;
            margin-bottom: .34rem;
            .list1{
              float: left;
              margin-left: .5rem;
              margin-right: 1.6rem;
            }
          }
          &.three{
            .list{
              font-size: .3rem;
              color: #64ABFF;
              span{
                display: inline-block;
                vertical-align: middle;
                margin-right: .2rem;
                width: .28rem;
                height: .28rem;
                background: url(../../../static/images/group/qianyue.png) no-repeat;
                -webkit-background-size: .28rem .28rem;
                background-size: .28rem .28rem;
              }
            }
          }
          &.four{
            font-size: .3rem;
            margin-bottom: .34rem;
            span{
              margin-left: .5rem;
            }
            b{
              margin-left: .5rem;
              color: #898989;
            }
            i{
              margin-left: .2rem;
              color: #898989;
            }
          }
          &.five{
            font-size: .3rem;
            span{
              display: inline-block;
              vertical-align: middle;
              margin-right: .2rem;
              width: .28rem;
              height: .28rem;
              background: url(../../../static/images/group/yongjin.png) no-repeat;
              -webkit-background-size: .28rem .28rem;
              background-size: .28rem .28rem;
            }
            i{
              color:#FA513C;
            }
          }
        }
      }
    }
  }
</style>
