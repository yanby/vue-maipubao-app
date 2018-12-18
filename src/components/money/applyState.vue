<template>
  <div class="applyState">
    <div class="bottomModel" v-if="bottomModel">
      <div class="wrap">
        <ul>
          <li v-for="item in bankList" @click="bankListFun(item)">{{item.d_name}}</li>
        </ul>
        <div class="cancle" @click="bottomModel=false">取消</div>
      </div>
    </div>
    <div class="ruidianModel" v-if="ruidianModel===true">
      <div class="wrap">
        <h3>预计税点说明</h3>
        <p>亲，如您能提供发票，那平台将不收取税费。如您不能提供发票，那么平台将在您提现的金额里扣除实时的税费。</p>
        <div class="close" @click="ruidianModel=false"></div>
      </div>
    </div>
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">申请提现</h2>
      <div class="txt"><router-link to="/clearRules">提现规则</router-link></div>
    </div>
    <div class="content">
      <div class="card clearfix">
        <h3>到账银行卡</h3>
        <div class="txt">
          <p>{{yinhangName}}({{cardNoShort}})</p>
          <p>提现到{{yinhangName}}</p>
        </div>
        <div class="icon" @click="selectFun()"></div>
      </div>
      <div class="msg">
        <p><span>提现总金额</span><b>发票扣税：<i>¥ {{koushui}}</i></b></p>
        <p class="cur"><span>¥ {{total}}</span><b>实际提现：<i>¥ {{shiji}}</i></b></p>
      </div>
      <div class="tixian" v-if="tixian===1">
        <ul class="list">
          <li v-for="(item,index) in encashmentList">
           <div class="xuanze" @click="xuanzeFun($event,item,index)"></div>
            <div class="yongjing">
              <p>佣金：<span>{{item.amount}}</span><i>{{item.billType}}</i></p>
              <p>{{item.projectName}}</span></p>
              <div class="fapiao"><span class="yuanquan" @click="fapiaoFun($event,item,index)"></span><b>提供发票</b></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="no-tixian" v-if="tixian===0">
        <div class="data"></div>
        <p>暂无数据</p>
      </div>
      <div class="btn" v-if="tixian===1">
        <div v-if="tixianShow==true" class="btn-next" @click="commit()">提现</div>
        <div v-if="tixianShow==false" class="btn-next1">提现</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
              tixianShow:true,
              selected: false,//有没有选中
              tab: false,
              bankId:"",//银行卡id
              selectId:"",//选择id
              selectList: [],//id列表
              tixian: 1,//提现切换
              total:0,//提现总金额
              koushui:0,//扣税金额
              shiji:0,//实际提现
              ruidianModel: false,//弹窗
              price: "",//提现金额
              bottomModel: false,//底部弹窗
              // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
              sheetVisible: false,
              bankList:"",//银行卡列表
              yinhangName: "",//银行名称
              cardNoShort: "",//4位尾号
              encashmentList: "",//提现列表
              arrList: [],//列表数组
              newTotal:[],//保存价格
              newShui:[],//保存税
              newPrice:[],//保存提现
            }
        },
      mounted(){
          this.init()
      },
        methods: {
          init(){
            this.$http({
              url: this.changeData() + "/bank/auth/getEncashmentList",
              method: 'post',
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                this.bankList = res.data.data.bankList;
                if(this.bankList.length != 0){
                  this.bankId = this.bankList[0].d_value;
                  this.yinhangName = this.bankList[0].d_name;
                  this.cardNoShort = this.bankList[0].cardNoShort;
                }
                this.encashmentList = res.data.data.encashmentList;
                if(this.encashmentList.length == 0){
                  this.tixian = 0;
                }else{
                  this.tixian = 1;
                }
              }
            }).catch(err => {
              console.log(err)
            });
          },
          listFun(){ //提现公共方法
            var that = this;

            //创建一个新数组，每次清空，把最新的价格push进去
            this.newTotal = [];
            this.newShui = [];
            this.newPrice = [];
            this.selectList = [];
            this.arrList.forEach(function (item1,index1) {
              that.newTotal.push(item1.amount);
              that.selectList.push(item1.id+"-"+item1.isSelected);
              that.selectId = that.selectList.join(",")
              console.log(that.selectId)
              if(item1.isSelected == true){
                var tixian = 0;
                that.newShui.push(tixian);
              }else{
                var tixian = parseInt(item1.amount*item1.rate);
                that.newShui.push(tixian);
              }
              that.newPrice.push(item1.amount - tixian);
            })
            //循环新数组，每次清空总数，累加
            this.total = 0;//总金额
            for (var i = 0; i < this.newTotal.length; i++) {
              this.total += parseInt(this.newTotal[i]);
            }
            this.koushui = 0;//扣税金额
            for (var i = 0; i < this.newShui.length; i++) {
              this.koushui += parseInt(this.newShui[i]);
            }
            this.shiji = 0;//实际提现
            for (var i = 0; i < this.newPrice.length; i++) {
              this.shiji += parseInt(this.newPrice[i]);
            }
          },
          xuanzeFun(e,item,index){//选择提现
            var that = this;
            //判断数组中有没有这个对象
            if(JSON.stringify(this.arrList).indexOf(JSON.stringify(item))==-1){
              this.arrList.push(item);
              $(e.srcElement).addClass("cur")
              this.selected = true;

            }else{
              if (index > -1) {
                var obj = this.arrList.indexOf(item);
                this.arrList.splice(obj, 1);
                $(e.srcElement).removeClass("cur")
                item.isSelected = false;
                this.selected = false;
                $(e.srcElement).siblings(".yongjing").children().children(".yuanquan").removeClass("on")
              }
            }
            console.log(this.arrList)
            this.listFun();
          },
          selectFun(){//银行卡列表
            this.bottomModel = true;
          },
          bankListFun(item){//点击银行卡
            this.yinhangName = item.d_name;
            this.cardNoShort = item.cardNoShort;
            this.bankId  = item.d_value;
            this.bottomModel = false;
          },
          navBack() {
              this.$router.push({path: "/balance"})
          },
          fapiaoFun(e,item,index){
            if($(e.srcElement).parent().parent().siblings(".xuanze").hasClass("cur")){
              if($(e.srcElement).hasClass("on")){
                $(e.srcElement).removeClass("on")
                item.isSelected = false;
                this.listFun();
              }else{
                $(e.srcElement).addClass("on")
                item.isSelected = true;
                this.listFun();
              }
            }
          },
          trim(){//去除空格
            this.price=this.price.replace(/[^\w]/g,'')
          },
          commit(){
            var that = this;
            if(this.selected == ""){
              Toast('请选择项目');
            }else{
              this.$http({
                url: this.changeData() + "/bank/auth/encashment",
                method: 'post',
                params:{
                  bankId : this.bankId,
                  id: this.selectId
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == "101"){
                  Toast('提现申请已提交，请耐心等待!');
                  this.tixianShow = false;
                  setTimeout(function () {
                    that.$router.push({path: "/balance"})
                  },2000)
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
  .applyState{
    width: 7.5rem;
    margin: .9rem auto 0;
    .nav{
      .txt{
        a{
          font-size: .28rem;
          color: #64ABFF;
        }
      }
    }
    .ruidianModel{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      z-index: 999;
      .wrap{
        position: absolute;
        width: 5.64rem;
        height: 2.94rem;
        left: 50%;
        margin-left: -2.82rem;
        top: 50%;
        margin-top: -1.47rem;
        background: #fff;
        border-radius: .1rem;
        .close{
          position: absolute;
          right: .2rem;
          top: .2rem;
          width: .3rem;
          height: .3rem;
          background: url(../../../static/images/common/close.png) no-repeat;
          -webkit-background-size: .3rem .3rem;
          background-size: .3rem .3rem;
        }
        h3{
          font-size: .38rem;
          text-align: center;
          padding: .3rem 0 .4rem;
        }
        p{
          padding: 0 .3rem;
          font-size: .28rem;
          line-height: .5rem;
        }
      }
    }
    .card{
      background: #fff;
      margin-bottom: .14rem;
      width: 7.5rem;
      height: 1.58rem;
      background: url(../../../static/images/money/tixian-bg.png) no-repeat;
      -webkit-background-size: 7.5rem 1.58rem;
      background-size: 7.5rem 1.58rem;
      overflow: hidden;
      h3{
        width: 1.7rem;
        height: 1.2rem;
        font-size: .34rem;
        float: left;
        color: #fff;
        margin: .38rem .4rem 0 .32rem;
      }
      .txt{
        width: 3.2rem;
        float: left;
        height: 1.2rem;
        margin: .38rem  1rem 0 0;
        p{
          font-size: .3rem;
          color: #fff;
          margin-bottom: .28rem;
        }
      }
      .icon{
        float: left;
        width: .85rem;
        height: 1.58rem;
      }
    }
    .msg{
      padding: .3rem .3rem .1rem;
      background: #fff;
      p{
        padding: 0 0.8rem;
        margin-bottom: .2rem;
        &.cur{
          span{
            color: #68ACFE;
            font-size: .4rem;
          }
          b{
            i{
              color: #FA513C;
            }
          }
        }
        b{
          display: inline-block;
          width: 2.6rem;
          font-size: .28rem;
          i{
            color: #67ACFE;
          }
        }
        span{
          display: inline-block;
          font-size: .3rem;
          width: 2.6rem;
        }
      }
    }
    .no-tixian {
      width: 6.9rem;
      height: 6.92rem;
      margin: 0 auto;
      overflow: hidden;
      background: url(../../../static/images/money/tixian-msg.png) no-repeat #fff;
      -webkit-background-size: 6.9rem 6.92rem;
      background-size: 6.9rem 6.92rem;
      .data{
        width: 1.68rem;
        height: 1.68rem;
        margin: 1.5rem auto .3rem;
        background: url(../../../static/images/common/noOrders.png) no-repeat;
        -webkit-background-size: 1.68rem 1.68rem;
        background-size: 1.68rem 1.68rem;
      }
      p{
        font-size: .3rem;
        text-align: center;
      }
    }
    .tixian{
      width: 6.9rem;
      height: 6.92rem;
      margin: 0 auto;
      overflow: auto;
      background: url(../../../static/images/money/tixian-msg.png) no-repeat #fff;
      -webkit-background-size: 6.9rem 6.92rem;
      background-size: 6.9rem 6.92rem;
      h3{
        height: .9rem;
        line-height: .9rem;
        font-size: 0;
        span{
          text-align: center;
          width: 50%;
          display: inline-block;
          font-size: .3rem;
          position: relative;
          &.cur{
            color: #64ABFF;
            b{
              position: absolute;
              width: 0.57rem;
              height: 0.04rem;
              left: 50%;
              margin-left: -0.28rem;
              bottom: 0;
              background: #64ABFF;
            }
          }
        }
      }
      .list{
        padding-top: .2rem;
        li{
          position: relative;
          padding-top: .3rem;
          border-bottom: 0.01rem solid #eaeaea;
          margin: 0 .3rem;
         .xuanze{
            position: absolute;
            left: .3rem;
            top: .8rem;
            width: .4rem;
            height: .4rem;
            background: url(../../../static/images/money/del.png) no-repeat;
            -webkit-background-size: .4rem .4rem;
            backgroun-size: .4rem .4rem;
            &.cur{
              background: url(../../../static/images/money/del-bg.png) no-repeat;
              -webkit-background-size: .4rem .4rem;
              backgroun-size: .4rem .4rem;
            }
          }
          .yongjing{
            margin-left: 1rem;
            p{
              font-size: .3rem;
              margin-bottom: .2rem;
              span{
                color: #64ABFF;
              }
              i{
                float: right;
                color: #64ABFF;
              }
            }
            .fapiao{
              padding-bottom: .4rem;
              span{
                display: inline-block;
                vertical-align: -.05rem;
                width: .3rem;
                height: .3rem;
                background: url(../../../static/images/money/xuan.png) no-repeat;
                -webkit-background-size: .3rem .3rem;
                background-size: .3rem .3rem;
                margin-right: .2rem;
                &.on{
                  background: url(../../../static/images/money/xuan-bg.png) no-repeat;
                  -webkit-background-size: .3rem .3rem;
                  background-size: .3rem .3rem;
                }
              }
              b{
                font-size: .28rem;
              }
            }
          }

        }
      }
    }
    .btn{
      padding: 0 .3rem;
      padding-top: .6rem;
      .btn-next,.btn-next1{
        width: 6.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        color: #fff;
        text-align: center;
        font-size: .34rem;
        border-radius: 0.1rem;
        background: #64ABFF;
      }
      .btn-next1{
        background: #e9e9e9;
      }
    }
  }
</style>
