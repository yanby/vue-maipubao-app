<template>
  <div class="buymember">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">优铺会员</h2>
    </div>
    <div class="content">
      <ul class="price">
        <li @click="next(item)" v-for="item in list"><span>{{item.serviceName}}</span><b>{{item.payAmount}}元</b><i>购买会员</i></li>
      </ul>
    </div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
      data(){
        return{
          list: "",//价格列表
        }
      },
      mounted(){
        if(getUrlId("move")){
          $(".nav").hide();
          $(".content").css({margin:0})
        }
        this.init();
      },
      methods:{
        next(item){
          if(this.$route.query.myMember){
            if(item.id <= this.$route.query.myMember){
              Toast("亲，不能升级到比当前界别低的会员")
            }else{
              this.$router.push({path:"/payment",query:{id:item.id,myMember:this.$route.query.myMember}})
            }
          }else if(this.$route.query.url){
            this.$router.push({path:"/payment",query:{id:item.id,url:this.$route.query.url}})
          }
        },
        init(){
          this.$http({
            url: this.changeData() + "/member/selectGoodsList",
            method: 'post',
          }).then(res => {
            console.log(res)
            if(res.data.code == "101"){
              this.list = res.data.list;
            }
          }).catch(err => {
            console.log(err)
          });
        },
        navBack(){
          if(this.$route.query.id){
            this.$router.go(-1)
          }else if(this.$route.query.url){
            this.$router.push({path:this.$route.query.url})
          }else{
            this.$router.push({path:"/mine"});
          }
        }
      }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .buymember{
    width: 7.5rem;
    margin: 0 auto;
    padding-bottom: .4rem;
    .nav{
      position: fixed;
      top: 0;
    }
    .content{
      margin-top: .9rem;
      width: 7.5rem;
      height: 18.77rem;
      background: url(../../../static/images/member/buy-bg.png);
      -webkit-background-size: 7.5rem 18.77rem;
      background-size: 7.5rem 18.77rem;
      position: relative;
      .price{
        width: 6.7rem;
        position: absolute;
        top: 5.2rem;
        left: .35rem;
        li{
          width: 6.7rem;
          height: 0.78rem;
          line-height: 0.78rem;
          margin-bottom: .2rem;
          border-radius:.1rem;
          font-size: 0;
          background: #fff;
          box-shadow:0px 0px 10px 0px rgba(237,134,117,0.42);
          span{
            width: 2.1rem;
            text-align: center;
            font-size: .3rem;
            display: inline-block;
          }
          b{
            width: 1.2rem;
            font-size: .34rem;
            display: inline-block;
            color: #ED8675;
            margin: 0 .34rem 0 1rem
          }
          i{
            display: inline-block;
            vertical-align: .01rem;
            width: 2.06rem;
            height: 0.78rem;
            font-size: .3rem;
            background:#ED8675;
            color: #fff;
            text-align: center;
            border-radius: 0 .1rem .1rem 0;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
        }
      }
    }
  }
</style>
