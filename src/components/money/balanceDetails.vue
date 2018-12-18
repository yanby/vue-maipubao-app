<template>
    <div class="balanceDetails">
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">余额明细</h2>
      </div>
      <div class="content">
        <div class="wrap" v-if="order==1">
          <h3><span>总收入：¥ {{detail.income}}</span><b>总支出：¥ {{detail.expenditure}}</b></h3>
          <div class="msg">
            <ul>
              <li class="clearfix" v-for="item in detail">
                <div class="list" v-if="item.bill_type==1">
                  <div class="img"><img src="../../../static/images/money/shouru.png" alt=""></div>
                  <div class="txt">
                    <div>{{item.d_name}}</div>
                    <p>{{item.title}}</p>
                    <p>{{item.create_time}}</p>
                    <span class="add">{{item.amount}}</span>
                  </div>
                </div>
                <div class="list" v-if="item.bill_type==2">
                  <div class="img"><img src="../../../static/images/money/chengjiao.png" alt=""></div>
                  <div class="txt">
                    <div>{{item.d_name}}</div>
                    <p>{{item.title}}</p>
                    <p>{{item.create_time}}</p>
                    <span class="add">{{item.amount}}</span>
                  </div>
                </div>
                <div class="list" v-if="item.bill_type==3">
                  <div class="img"><img src="../../../static/images/money/chengjiao.png" alt=""></div>
                  <div class="txt">
                    <div>{{item.d_name}}</div>
                    <p>{{item.title}}</p>
                    <p>{{item.create_time}}</p>
                    <span class="add">{{item.amount}}</span>
                  </div>
                </div>
                <div class="list" v-if="item.bill_type==4">
                  <div class="img"><img src="../../../static/images/money/tixianl.png" alt=""></div>
                  <div class="txt">
                    <div>{{item.d_name}}</div>
                    <p>{{item.title}}</p>
                    <p>{{item.create_time}}</p>
                    <span>{{item.amount}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 暂无订单 -->
        <div class="noOrder" v-if="order==0">
          <dl>
            <dt>
              <img src="../../../static/images/common/noOrders.png">
            </dt>
            <p>暂无信息</p>
          </dl>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "",
      data() {
          return {
            detail:"",
            order: 1
          }
      },
      mounted(){
        this.init()
      },
      methods:{
        navBack(){
          this.$router.push({path:"/balance"})
        },
        init(){
          this.$http({
            url:this.changeData() + "/bank/auth/selectBillDetail",
            method: 'post',
          }).then(res => {
            console.log(res)
            if(res.data.code == 101){
              this.detail = res.data.detail;
              if(this.detail.length == 0){
                this.order = 0;
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
  .balanceDetails{
    width: 7.5rem;
    margin: 0 auto;
    .content{
      margin-top: .9rem;
      .noOrder{
        width: 7.5rem;
        .noOrderTop{
          height: 1rem;
          text-align: center;
          background: #fff;
          border-bottom: 0.02rem solid #eee;
          position: relative;
          h3{
            width: 75%;
            line-height: 1rem;
            font-size: 0.36rem;
            color: #333;
            float: left;
            text-align: center;
          }
          i{
            display: inline-block;
            width: 13%;
            height: 1rem;
            line-height: 1rem;
            float: left;
            img{
              width: 0.4rem;
              height: 0.4rem;
            }
          }
        }
        dl{
          width: 7.5rem;
          /*height: 6rem;*/
          /*background: pink;*/
          text-align: center;
          dt{
            /*width: 3rem;
            height: 3rem;*/
            /*background: red;*/
            margin-top: 4rem;
            img{
              width: 1.68rem;
              height: 1.68rem;
            }
          }
          p{
            font-size: .28rem;
            color: #898989;
            margin-top: .38rem;
            margin-bottom: .5rem;
          }
          dd{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            span{
              -webkit-tap-highlight-color: rgba(0,0,0,0);
              display: inline-block;
              width: 3rem;
              height: .89rem;
              background: #47abff;
              line-height: .89rem;
              color: #fff;
              font-size: .34rem;
              border-radius: 5px;
            }
          }
        }
      }
      h3{
        height: .94rem;
        line-height: .94rem;
        padding-left: .3rem;
        span,b{
          font-size: .26rem;
          color: #898989;
        }
        span{
          margin-right: 1rem;
        }
      }
      .msg{
        padding: 0 .3rem;
        background: #fff;
        ul{
          li{
            position: relative;
            .img{
              width: 0.78rem;
              height: 0.78rem;
              margin-top: .3rem;
              float: left;
             img{
               width: 100%;
               height: 100%;
             }
            }
            .txt{
              float: right;
              width: 5.86rem;
              border-bottom: 0.01rem solid #eaeaea;
              div{
                padding: .3rem 0 .3rem;
                font-size: .32rem;
              }
              p{
                font-size: .28rem;
                padding-bottom: .26rem;
                color: #898989;
              }
              span{
                position: absolute;
                right: .2rem;
                top: .5rem;
                font-size: .36rem;
                font-weight: bold;
                &.add{
                  color: #64ABFF;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
