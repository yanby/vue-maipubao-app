<template>
  <div class="myMember">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back-white.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">我的会员</h2>
      <div class="shenji" @click="shenjiFun()">会员升级</div>
    </div>
    <div class="content">
      <div class="title">
        <div class="tuxiang"><img :src="list.icon_path" alt=""></div>
        <p>{{list.user_name}}</p>
        <p>
          <span v-if="list.goods_id==1">普通会员</span>
          <span v-if="list.goods_id==2">VIP会员</span>
          <span v-if="list.goods_id==3">白金会员</span>
          <b>有效期至 {{list.end_time}}</b>
        </p>
        <p><b>今日剩余查看次数：{{list.view_count}}</b></p>
        <div class="bg"></div>
      </div>
      <div class="quanyi">
        <h3>会员权益</h3>
        <ul>
          <li v-if="list.goods_id==1" class="putong"></li>
          <li v-if="list.goods_id==2" class="vip"></li>
          <li v-if="list.goods_id==3" class="baijing"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          list: "",//会员列表
          goods_id:""
        }
      },
      mounted(){
        this.init();
      },
      methods:{
        navBack(){
          this.$router.go(-1)
        },
        shenjiFun(){
          this.$router.push({path:"/buymember",query:{myMember:this.goods_id}})
        },
        init(){
          this.$http({
            url:this.changeData() + "/member/auth/selectMemberInfo",
            method: 'post',
          }).then(res => {
            console.log(res)
            if(res.data.code == 101){
              this.list = res.data.list;
              this.goods_id = res.data.list.goods_id;
            }
          }).catch(err => {
            console.log(err)
          });
        }
      }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .myMember{
    width: 7.5rem;
    margin: 0 auto;
    background: #fff;
    padding-bottom: 1rem;
    .nav{
      position: relative;
      background: #64abff;
      border: none;
      h2{
        color: #fff;
      }
      .shenji{
        position: absolute;
        right: .2rem;
        top: .3rem;
        font-size: .28rem;
      }
      .shenji{
        color: #fff;
      }
    }
    .content{
      .title{
        background: #64abff;
        overflow: hidden;
        .tuxiang{
          margin: .5rem auto .2rem;
          text-align: center;
          img{
            width: 1.44rem;
            height: 1.44rem;
          }
        }
        p{
          text-align: center;
          font-size: .32rem;
          margin-bottom: .2rem;
          color: #fff;
          span{
            display: inline-block;
            width: 1.1rem;
            height: .34rem;
            line-height: .34rem;
            color: #fff;
            margin-right: .1rem;
            font-size: .24rem;
            background: url(../../../static/images/member/huiyuan.png);
            -webkit-background-size: 1.1rem .34rem;
            background-size: 1.1rem .34rem;
          }
          b{
            font-size: .28rem;
          }
        }
        .bg{
          width: 7.5rem;
          height: 1.61rem;
          background: url(../../../static/images/member/bg.png);
          -webkit-background-size: 7.5rem 1.61rem;
          background-size: 7.5rem 1.61rem;
        }
      }
      .quanyi{
        h3{
          font-size: .34rem;
          font-weight: bold;
          padding:.4rem 0 .2rem .2rem;
        }
        ul{
          li{
            width: 6.9rem;
            height: 2.4rem;
            margin: 0 auto .2rem;
            &.putong{
              background: url(../../../static/images/member/my-putong.png);
              -webkit-background-size: 6.9rem 2.4rem;
              background-size: 6.9rem 2.4rem;
            }
            &.vip{
              background: url(../../../static/images/member/my-vip.png);
              -webkit-background-size: 6.9rem 2.4rem;
              background-size: 6.9rem 2.4rem;
            }
            &.baijing{
              background: url(../../../static/images/member/my-baijing.png);
              -webkit-background-size: 6.9rem 2.4rem;
              background-size: 6.9rem 2.4rem;
            }
          }
        }
      }
    }
  }
</style>
