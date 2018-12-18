<template>
  <div class="buymember">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">优铺会员</h2>
    </div>
    <div class="content">
      <ul class="price">
        <li class="cur" @click="next(item)" v-if="index==0" v-for="(item,index) in list"><s></s><span>{{item.serviceName}}</span><del>原价300</del><b>￥{{item.payAmount}}/月</b><i>立即购买</i></li>
        <li @click="next(item)" v-if="index>0" v-for="(item,index) in list"><span>{{item.serviceName}}</span><b>￥{{item.payAmount}}/年</b><i>立即购买</i></li>
        <div>白金会员即股东最高会员</div>
      </ul>
    </div>
  </div>

</template>

<script>
    export default {
      data(){
        return{
          list: "",//价格列表
          android: "",
          ios:"",
          iphone: ""
        }
      },
      mounted(){
        this.android = getUrlId("android");
        this.ios = getUrlId("ios");
        this.iphone = getUrlId("iphone");
        this.init();
      },
      methods:{
        next(item){
          if(this.android){
            return AndroidBuy.showToast(item.id);
          }else if(this.ios){
            window.location.href="next://" + item.id;
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
          this.$router.push({path:"/mine"})
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
      height: 31.12rem;
      background: url(../../../static/images/member/buy-bg1.png);
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      position: relative;
      .price{
        width: 6.7rem;
        position: absolute;
        top: 7.2rem;
        left: .35rem;
        div{
          font-size: .12rem;
          text-indent: .2rem;
          color: #ED8675;
        }
        li{
          width: 6.7rem;
          height: 0.78rem;
          line-height: 0.78rem;
          margin-bottom: .2rem;
          border-radius:.1rem;
          font-size: 0;
          background: #fff;
          position: relative;
          box-shadow:0px 0px 10px 0px rgba(237,134,117,0.42);
          &.cur{
            s{
              width: .5rem;
              height: .5rem;
              position: absolute;
              left: 0;
              top: 0;
              background: url(../../../static/images/member/new.png);
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
            del{
              display: inline-block;
              width: 1.1rem;
              font-size: .24rem;
              color: #ED8675;
              text-align: center;
            }
            b{
              margin: 0 .22rem 0 .1rem
            }
          }
          span{
            width: 1.6rem;
            text-indent: .2rem;
            font-size: .3rem;
            display: inline-block;
          }
          b{
            width: 1.6rem;
            font-size: .34rem;
            display: inline-block;
            color: #ED8675;
            margin: 0 .42rem 0 1rem
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
