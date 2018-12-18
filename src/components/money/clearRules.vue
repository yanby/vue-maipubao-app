<template>
  <div class="clearRules">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">收入结算及提现规则</h2>
    </div>
    <div class="contentMsg">
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
          $(".contentMsg").css({margin:0})
        }
        this.init()
      },
      methods: {
        navBack() {
          this.$router.go(-1)
        },
        init(){
          var that = this;
          this.$http({
            url: this.changeData() + "/member/getAgreement",
            method: 'post',
            params: {
              agreementType: 3,//3收入及提现规则
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
  .clearRules{
    width: 7.5rem;
    margin: 0 auto;
    height: 100vh;
    background: #fff;
    .contentMsg{
      margin-top: .9rem;
    }
  }
</style>
