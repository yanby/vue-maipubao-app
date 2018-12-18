<template>
    <div class="manageCard">
      <div class="payModel" v-if="payModel">
        <div class="wrap">
          <h3>验证码</h3>
          <p>
            <input type="text" placeholder="请输入验证码" v-model="code" @keyup="codeFun()">
            <b v-show="show" @click="getCode()">获取验证码</b>
            <b v-show="!show">重新获取{{count}}s</b>
          </p>
          <div class="btn">
            <span @click="payModel=false">取消</span>
            <span @click="confirmCard()">确认</span>
          </div>
        </div>
      </div>
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">银行卡管理</h2>
        <div class="txt" @click="delCard=1" v-if="delCard===0">解绑</div>
        <div class="txt" @click="delCard=0" v-if="delCard===1">取消</div>
      </div>
      <div class="content">
        <div class="card">
          <ul>
            <li v-for="item in bankList">
              <div class="wrap">
                <div class="select" v-if="delCard===1">
                  <div class="check" @click.stop="delHintFun($event,item)"></div>
                </div>
                <div class="img"><p>{{item.cardNoShort}}</p><img :src="item.imgUrl" alt=""></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="addCard" v-if="delCard===0"><router-link to="/bindCard">添加银行卡</router-link></div>
        <div class="addCard" v-if="delCard===1" @click="confirmCard()">确定解绑</div>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        name: "",
        data() {
            return {
              code: "",//验证码
              show: true,
              count: '',
              delCard: 0,//控制删除
              bankList:"",//银行卡列表
              arr:[],//列表数组
              ids:"",//所选ID集合
              payModel:false,//解绑弹窗
              itemId: "",//银行卡ID
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
            this.$http({
              url: this.changeData() + "/bank/auth/bindBankCardList",
              method: 'post'
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                this.bankList = res.data.bankList;
              }
            }).catch(err => {
              console.log(err)
            });
          },
          delHintFun(e,item){//删除选中
            if($(e.srcElement).hasClass("cur")){
              $(e.srcElement).removeClass("cur")
              var obj = this.arr.indexOf(this.itemId);
              this.arr.splice(obj, 1);
            }else{
              $(e.srcElement).addClass("cur")
              this.itemId = item.d_value;
              this.arr.push(item.d_value);
            }
            this.ids = this.arr.join(",")
          },
          confirmCard(){//弹窗解绑
            var that = this;
            if(this.ids == ""){
              Toast("请选择银行卡")
            }else{
              this.$http({
                url: this.changeData() + "/bank/auth/unbindBankCard",
                method: 'post',
                params:{
                  id: this.ids,
                  mobile:localStorage.iphone
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == "101"){
                  this.payModel = false;
                  this.delCard = 0;
                  this.arr = [];
                  this.$http({
                    url: this.changeData() + "/bank/auth/bindBankCardList",
                    method: 'post'
                  }).then(res => {
                    console.log(res)
                    if(res.data.code == "101"){
                      Toast("解绑成功")
                      that.bankList = res.data.bankList;
                    }
                  }).catch(err => {
                    console.log(err)
                  });
                }else{
                  Toast(res.data.message)
                }
              }).catch(err => {
                console.log(err)
              });
            }
          },
          cancalFun(){ //点击确定解绑
            if(this.itemId != ""){
              this.payModel = true;
            }
          },
          getCode(){//获取验证码
            const TIME_COUNT = 60;
            this.$http({
              url: this.changeData() + "/sendsms",
              method: 'post',
              params:{
                mobile:localStorage.iphone,
                type: 2,//2 绑卡验证短信
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.show = false;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                    } else {
                      this.show = true;
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000)
                }
              }
            }).catch(err => {
              console.log(err)
            });
          },
          codeFun(){
            this.code = this.code.replace(/[^\w]/g,'');
          },
        },
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .manageCard{
    width: 7.5rem;
    margin: .9rem auto 0;
    .payModel{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      z-index:100;
      .wrap{
        width: 6.6rem;
        height: 3.2rem;
        background: #fff;
        left: 50%;
        margin-left: -3.3rem;
        top: 50%;
        margin-top: -1.84rem;
        position: absolute;
        border-radius: .1rem;
        text-align: center;
        h3{
          font-size: .38rem;
          padding: .4rem 0 .56rem;
          font-weight: bold;
        }
        p{
          font-size: .32rem;
          margin-bottom: .22rem;
          input{
            width: 2rem;
            height: .5rem;
            padding-left: .2rem;
            font-size: .26rem;
            border: 0.01rem solid #ccc;
          }
          b{
            color: #64ABFF;
            font-size: .24rem;
            margin-left: .2rem;
          }
        }
        .btn{
          position: absolute;
          bottom: 0;
          width: 100%;
          font-size: 0;
          span{
            height: 0.88rem;
            line-height: 0.88rem;
            font-size: .34rem;
            width: 50%;
            display: inline-block;
            background: #EAEAEA;
            border-radius: 0 0 0 .1rem;
          }
          span:nth-of-type(2){
            background: #76AAF8;
            color: #fff;
            border-radius: 0 0 .1rem 0;
          }
        }
      }
    }
    .content{
      .card{
        padding-top:.2rem;
        ul{
          li{
            margin-bottom: .2rem;
            .wrap{
              display: flex;
              .select{
                width: 1rem;
                position: relative;
                .check{
                  width: .4rem;
                  height: .4rem;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  margin-left: -.2rem;
                  margin-top: -.2rem;
                  background: url(../../../static/images/money/del.png) no-repeat;
                  -webkit-background-size: .4rem .4rem;
                  background-size: .4rem .4rem;
                  &.cur{
                    background: url(../../../static/images/money/del-bg.png) no-repeat;
                    -webkit-background-size: .4rem .4rem;
                    background-size: .4rem .4rem;
                  }
                }
              }
              .img{
                width: 6.2rem;
                height: 2.4rem;
                margin: 0 auto;
                position: relative;
                p{
                  position: absolute;
                  right: .9rem;
                  bottom: .5rem;
                  font-size: .36rem;
                  color: #fff;
                }
                img{
                  width: 6.2rem;
                  height: 2.4rem;
                }
              }
            }
          }
        }
      }
      .addCard{
        width: 6.9rem;
        height: .9rem;
        margin: .6rem auto 0;
        line-height: .9rem;
        text-align: center;
        color: #fff;
        font-size: .34rem;
        background: #64ABFF;
        border-radius: .1rem;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #fff;
        }
      }
    }
  }
</style>
