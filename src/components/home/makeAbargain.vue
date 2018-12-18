<template>
  <div class="makeAbargain">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">成交前10</h2>
    </div>
    <div class="content">
      <!-- <p>租铺卖铺找优铺,不成功不收费.开店转店就上优铺租铺宝,无中介!真铺源!是商铺租赁的首选信息平台.优铺租铺宝数10万真实铺源,铺源均已经过人工核实,租铺卖铺找优铺,不成功不收费.开店转店就上优铺租铺宝,无中介!真铺源!是商铺租赁的首选信息平台.</p> -->
      <p v-html="msg"></p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
              msg: ""
            }
        },
      mounted(){
        if(getUrlId("move")){
          $(".nav").hide();
          $(".content").css({margin:0})
        }
        this.init()
      },
        methods: {
            navBack() {
                this.$router.push({path: "/home"})
            },
          init(){
            var that = this;
            this.$http({
              url: this.changeData() + "/show/getH5Page",
              method: 'post',
              params: {
                cityId: sessionStorage.cityId || getUrlId("cityId"),
                type: 2,//2是成交前十
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                this.msg = res.data.data.content;
              }
            }).catch(err => {
              console.log(err)
            });
          },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .makeAbargain{
    height: 100vh;
    .content{
      margin-top: .9rem;
      padding: .5rem .3rem;
      h3{
        font-size: .3rem;
        text-align: center;
        font-weight: bold;
        margin-bottom: .4rem;
      }
      p{
        font-size: .28rem;
        color: #898989;
        line-height: .5rem;
        text-align: justify;
      }
    }
  }
</style>
<style>
  .makeAbargain >>> img{
    max-width: 6.9rem;
  }
</style>
