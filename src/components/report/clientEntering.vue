<template>
  <div class="clientEntering">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">客户录入</h2>
    </div>
    <div class="list">
      <ul>
        <li><span>*</span>客户姓名：<input v-model="kehu" type="text" placeholder="请填写客户姓名"></li>
        <li><span>*</span>联系方式：<input type="number" v-model="iphone" placeholder="请填写客户的联系方式" maxlength="11" @keyup="iphoneFun()"></li>
        <li><span>*</span>客户性别：<b :class="{'cur':tab===1}" @click="tab=1"></b>男 <i :class="{'cur':tab===2}" @click="tab=2"></i>女</li>
      </ul>
    </div>
    <div class="btn" @click="commit()">保存并下一步</div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        name: "",
        data() {
            return {
              tab: 1,
              kehu: "",
              iphone: "",
              sex: "",//性别
            }
        },
      mounted(){

      },
        methods: {
          navBack() {
              this.$router.go(-1)
          },
          iphoneFun(){
            this.iphone = this.iphone.replace(/[^\w]/g,'');
          },
          commit(){
            if(this.tab===1){
              this.sex = 1;
            }else if(this.tab===2){
              this.sex = 0;
            }
           //判断不能为空
            if(this.kehu == "" || this.iphone == "" || this.tab == ""){
              Toast('请输入必填项');
            }else if(isPoneAvailable(this.iphone) == false){
              Toast('请输入正确的手机号');
            }else{
              this.$http({
                url: this.changeData() + "/customer/auth/add",
                method: 'post',
                params: {
                  customerName: this.kehu,
                  mobile: this.iphone,
                  sex: this.sex
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == "101"){
                  if(this.$route.query.url){
                    this.$router.push({path:"/source"})
                  }else{
                    this.$router.push({path: "/selectReport",query:{projectId:this.$route.query.projectId,projectType:this.$route.query.projectType,houseType:this.$route.query.houseType}})
                  }
                }
              }).catch(err => {
                console.log(err)
              });
            }
          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .clientEntering{
    width: 7.5rem;
    background: #f7f8fa;
    .nav{
      font-size: .34rem;
      position: relative;
      border: none;
      .navTitle{
        font-size: .34rem;
      }
      a{
        position: absolute;
        width: .4rem;
        height: .4rem;
        right: .3rem;
        top: .25rem;
        background: url("../../../static/images/common/search.png") no-repeat ;
        -webkit-background-size: .4rem .4rem;
        background-size: .4rem .4rem;
      }
    }
    .list{
      background: #fff;
      ul{
        li{
          padding: 0 .6rem 0 .3rem;
          height: 1rem;
          line-height: 1rem;
          font-size: .3rem;
          border-bottom: 0.01rem solid #EAEAEA;
          input{
            vertical-align: .02rem;
            font-size: .3rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
          span{
            color: #E65E47;
            margin-right: .05rem;
            width: .3rem;
            height: .3rem;
          }
          b,i{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: inline-block;
            vertical-align: -.01rem;
            width: .3rem;
            height: .3rem;
            background: url("../../../static/images/common/xuan.png") no-repeat ;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            margin-right: .1rem;
            &.cur{
              background: url("../../../static/images/common/xuan-bg.png") no-repeat ;
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
          i{
            margin-left: .78rem;
          }
        }
      }
    }
    .btn{
      position: fixed;
      bottom: .4rem;
      left: .3rem;
      width: 6.9rem;
      height: 1rem;
      line-height: 1rem;
      font-size: .34rem;
      background: #64ABFF;
      color: #fff;
      text-align: center;
    }
  }
</style>
