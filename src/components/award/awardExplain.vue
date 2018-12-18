<template>
  <div class="awardExplain">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">推荐成交奖励说明</h2>
    </div>
    <div class="contentMsg">
      <p>{{msg}}</p>
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
      this.init()
    },
    methods: {
      navBack() {
        this.$router.go(-1)
      },
      init(){
        var that = this;
        this.$http({
          url: this.changeData() + "/member/auth/getAgreement",
          method: 'post',
          params: {
            agreementType: 1,//1推荐成交奖励说明
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == "101"){
            this.msg = res.data.data;
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
  .awardExplain{
    width: 7.5rem;
    margin:0 auto;
    .contentMsg{
      margin-top: .9rem;
    }
  }
</style>
