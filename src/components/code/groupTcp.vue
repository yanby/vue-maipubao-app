<template>
    <div class="groupTcp">
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">发展团队协议</h2>
      </div>
      <div class="content">
        <h3>发展团队协议</h3>
        <div class="msg">
          <p>特别提示：(只适用于同城市的团队发展) 在发展团队之前，用户（以下简称“您”）应当认真阅读并遵守《发展团队电子签协议》（以下简称“本协议”），请您务必审慎阅读、充分理解本协议内容，特别是免除或限制责任的条款、争议解决及法律适用条款。</p>
        </div>
        <div class="msg">
          <h4>一、协议范围</h4>
          <p>1.北京优铺网络科技有限公司（以下简称“优铺平台”）及其关联公司提供的互联网相关服务，均受本协议约束。如果您不同意本协议的约定，您应立即停止使用发展团队电子签服务。</p>
          <p>2.本协议内容包括协议正文及优铺将要发布的关于发展团队的各类规则、公告或通知（以下合称“发展团队规则”）。所有规则均为本协议不可分割的组成部分，和协议正文具有同等法律效力。</p>
          <p>3.优铺平台有权根据发展需要制定、修改本协议的各类规则，并以包括但不限于优铺平台公示的方式进行变更告知，无需另行通知您。变更后的协议一经公布后即生效。若您在变更后未对变更内容提出疑义，即表示您已经阅读、理解并接受经修订的协议。</p>
          <h4>二、准入条件和权利义务</h4>
          <p>1.承诺您不是优铺平台合作公司一级人员下的团队人员，不损害第三方利益。</p>
          <p>2.团队发展人数不低于2人（含），以优铺APP更新数据为准。</p>
          <p>3.积极参加优铺业务例会</p>
          <h4>三、发展团队操作流程</h4>
          <p>1.点击同意本协议后，APP内生成您个人的发展二维码，新用户扫描您的发展二维码注册登录，可成功绑定到您的名下，变成您的团队成员。</p>
          <p>2.已注册登录的用户，当用户无其他团队关系时，可通过扫描您的发展二维码绑定到您发展的团队。</p>
          <p>3.已与您建立团队关系的二级人员，无法再加入其他团队，除非你同意其解绑，或主动将其移除您的团队。</p>
          <h4>四、发展团队福利说明</h4>
          <p>成功发展一名用户，被发展人在优铺平台成交，发展人即可获得优铺平台奖励的1000元</p>
          <h5>五、协议终止</h5>
          <p>1.优铺有权自行决定不经事先通知的中止、终止向您提供的服务，且无须为此您或任何第三方承担任何责任。</p>
          <p>2.出现以下情况时，优铺有权直接以注销账号ID的方式终止本协议。</p>
          <p>a)您提供的用户信息内容不真实</p>
          <p>b)本协议内容变更时，您明确通知优铺平台不接受协议内容</p>
          <p>c)其它优铺认为应当终止服务的情况。</p>
          <p>3.您同意，您与优铺的协议关系终止后，优铺仍享有下列权利：</p>
          <p>继续保存您的用户信息及您在使用优铺平台产品期间的所有交易信息。</p>
          <h4>六、争议解决及法律适用条款</h4>
          <p>1.本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>
          <p>因本协议而产生的一切争议，优铺平台将与您通过友好协商解决。协商不成的，您同意将纠纷或争议协议签订选择城市的人民法院管辖。</p>
        </div>
        <ul>
          <li><span class="xieyi" @click="agreeFun($event)"></span><b>我已阅读并同意该协议</b></li>
          <li><i>* </i>请输入您的团队名称: <input type="text" v-model="tuandui" maxlength="30" @keyup="trim()"></li>
          <li><i>* </i>类型：<s :class="{'cur':tab===1}" @click="tab=1"></s><b style="margin-right: .4rem">个人</b> <s :class="{'cur':tab===2}" @click="tab=2"></s><b>公司</b></li>
        </ul>
      </div>
      <div class="btn" v-if="agree==false || tuandui==''">提交</div>
      <div class="btn cur" v-if="agree==true && tuandui!=''" @click="commit()">提交</div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        name: "",
        data() {
            return {
              agree: true,//同意协议
              tab: 1,//个人公司
              tuandui: "",//团队名称
              tuanduiGo: "",
              xieyi: "",//协议内容
            }
        },
      mounted(){
          $(".xieyi").addClass("cur")
      },
        methods: {
          navBack() {
              this.$router.go(-1)
          },
          agreeFun(e){//同意协议
            if($(e.srcElement).hasClass("cur")){
              this.agree = false;
              $(e.srcElement).removeClass("cur")
            }else{
              this.agree = true;
              $(e.srcElement).addClass("cur")
            }
          },
          trim(){//去除空格
            this.tuandui=this.tuandui.replace(/(^\s+)|(\s+$)/g,'')
          },
          commit(){
            var that = this;

            this.$http({
              url: this.changeData() + "/team/auth/createTeam",
              method: 'post',
              params: {
                teamType: this.tab, //1是个人2是公司
                teamName: this.tuandui,//团队名称
              }
            }).then(res => {
              console.log(res)
              console.log(this.tab)
              console.log(res.data.flag)
              if(res.data.code == "101"){
                if(this.tab == 2 && res.data.flag == 0){
                  that.$router.push({path:"/businessLicense",query:{url:"groupTcp"}})
                }else{
                  Toast('提交成功');
                  this.agree = false;
                  setTimeout(function () {
                    that.$router.push({path:"/develop"})
                  },2000)
                }
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
  .groupTcp{
    background: #fff;
    width: 7.5rem;
    margin: .9rem auto 0;
    .content{
      padding: .5rem .3rem 0;
      h3{
        text-align: center;
        font-size: .32rem;
        font-weight: bold;
        margin-bottom: .38rem;
      }
      .msg{
        margin-top: .5rem;
        p{
          font-size: .28rem;
          line-height: .5rem;
        }
        h4{
          font-size: .3rem;
          line-height: .5rem;
        }
      }
      ul{
        margin-top: .6rem;
        li{
          font-size: .28rem;
          margin-bottom: .44rem;
          input{
            font-size: .28rem;
          }
          span{
            display: inline-block;
            vertical-align: -.06rem;
            width: .34rem;
            height: .34rem;
            background: url(../../../static/images/code/yuan.png) no-repeat;
            -webkit-background-size: .34rem .34rem;
            background-size: .34rem .34rem;
            margin-right: .1rem;
            &.cur{
              background: url(../../../static/images/code/tongyi-bg.png) no-repeat;
              -webkit-background-size: .34rem .34rem;
              background-size: .34rem .34rem;
            }
          }
          b{
            display: inline-block;
          }
          i{
            color: #FF5343;
            margin-right: .1rem;
          }
          s{
            display: inline-block;
            vertical-align: -.04rem;
            width: .34rem;
            height: .34rem;
            background: url(../../../static/images/code/yuan.png) no-repeat;
            -webkit-background-size: .34rem .34rem;
            background-size: .34rem .34rem;
            margin-right: .1rem;
            &.cur{
              background: url(../../../static/images/code/tongyi-bg.png) no-repeat;
              -webkit-background-size: .34rem .34rem;
              background-size: .34rem .34rem;
            }
          }
          input{
            width: 1.88rem;
            border-bottom: 0.01rem solid #333;
          }
        }
      }
    }
    .btn{
      width: 7.5rem;
      height: .9rem;
      line-height: .9rem;
      color: #fff;
      text-align: center;
      font-size: .34rem;
      background: #ccc;
      &.cur{
        background: #64ABFF;
      }
    }
  }
</style>
