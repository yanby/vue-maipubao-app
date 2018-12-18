<template>
  <div class="myAward">
    <div class="orderTop">
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">我的奖励</h2>
      </div>
      <div class="orderNav">
        <ul class="clearfix">
          <li class="li1" :class="{'on':tab===0}" @click="tab=0">推荐<span></span></li>
          <li class="li2" :class="{'on':tab===1}" @click="tab=1">发展<span></span></li>
        </ul>
      </div>
      <div class="content">
        <div v-if="tab===0" class="tuijian">
          <div class="tuijian-bg">
            <ul class="clearfix">
              <li>
                <p><span></span><b>累计推荐人数</b></p>
                <div>12人</div>
              </li>
              <li>
                <p><i></i><b>成交奖励金额</b></p>
                <div>200元</div>
              </li>
            </ul>
          </div>
          <div class="tuijian-msg">
            <h3><b></b><i>明细</i><router-link to="/awardExplain">推荐成交奖励说明</router-link></h3>
            <ul>
              <li>
                <p><span></span><s>成员：孙小波</s></p>
                <p><b></b><s>奖励佣金：<i>500.00</i>元</s> </p>
                <div class="date">2017-09-21</div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="tab===1" class="fazhan">
          <div class="tuijian-bg">
            <ul class="clearfix">
              <li>
                <p><span></span><b>累计推荐人数</b></p>
                <div>12人</div>
              </li>
              <li>
                <p><i></i><b>成交奖励金额</b></p>
                <div>200元</div>
              </li>
            </ul>
          </div>
          <div class="tuijian-msg">
            <h3><b></b><i>明细</i><span>推荐成交奖励说明</span></h3>
            <ul>
              <li>
                <p><span></span><s>成员：孙小波</s></p>
                <p><b></b><s>奖励佣金：<i>500.00</i>元</s> </p>
                <div class="date">2017-09-21</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 暂无团队 -->
    <div class="noOrder" v-if="order===0">
      <dl>
        <dt>
          <img src="../../../static/images/common/noOrders.png">
        </dt>
        <p>暂无数据</p>
      </dl>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        tab: 0,
        order: 1,
      }
    },
    computed:{

    },
    methods:{
      navBack(){
        this.$router.push({path:"/mine"})
      },
      go(){
        this.$router.push({path:"/buymember",query:{order: 1}})
      }
    },
    mounted() {

    }


  }
</script>
<style scoped lang="scss"  type="text/scss">
  @import "../../../static/css/nav.css";
  .myAward{
    .nav{
      border: none;
    }
    .content{
      margin-top: .2rem;
      .tuijian{
        padding: 0 .3rem;
        .tuijian-bg{
          width: 7.14rem;
          height: 1.8rem;
          background: url(../../../static/images/award/jiangli-bg.png) no-repeat;
          -webkit-background-size: 7.14rem 1.8rem;
          background-size: 7.14rem 1.8rem;
          li{
            text-align: center;
            width: 50%;
            height: 1.8rem;
            float: left;
            p{
              font-size: .34rem;
              color: #fff;
              margin-top: .5rem;
              margin-bottom: .16rem;
              span,i{
                display: inline-block;
                vertical-align: middle;
                width: .3rem;
                height: .3rem;
                background: url(../../../static/images/award/zhu.png) no-repeat;
                -webkit-background-size: .3rem .3rem;
                background-size: .3rem .3rem;
                margin-right: .1rem;
              }
              i{
                background: url(../../../static/images/award/yuan.png) no-repeat;
                -webkit-background-size: .3rem .3rem;
                background-size: .3rem .3rem;
              }
              b{
                display: inline-block;
                vertical-align: middle;
              }
            }
            div{
              color: #fff;
              font-size: .38rem;
            }
          }
        }
        .tuijian-msg{
          padding: 0 .2rem .4rem;
          background: #fff;
          margin-top: .2rem;
          h3{
            height: .9rem;
            line-height: .9rem;
            b{
              display: inline-block;
              vertical-align: middle;
              width: .4rem;
              height: .4rem;
              background: url(../../../static/images/award/mingxi.png) no-repeat;
              -webkit-background-size: .4rem .4rem;
              background-size: .4rem .4rem;
            }
            i{
              display: inline-block;
              vertical-align: middle;
              font-size: .3rem;
              margin-left: .2rem;
            }
            a{
              margin-left: .1rem;
              display: inline-block;
              vertical-align: middle;
              font-size: .26rem;
              color: #64ABFF;
              float: right;
            }
          }
          ul{
            li{
              position: relative;
              padding-top: .4rem;
              border-top: 0.01rem solid #EAEAEA;
              .date{
                color: #898989;
                position: absolute;
                right: 0;
                top: .7rem;
                color: #898989;
                font-size: .28rem;
              }
              p{
                font-size: .3rem;
                margin-bottom: .4rem;
                span,b{
                  display: inline-block;
                  vertical-align: middle;
                  width: .3rem;
                  height: .3rem;
                  background: url(../../../static/images/award/chengyuan.png) no-repeat;
                  -webkit-background-size: .3rem .3rem;
                  background-size: .3rem .3rem;
                  margin-right: .1rem;
                }
                b{
                  background: url(../../../static/images/award/jiangli.png) no-repeat;
                  -webkit-background-size: .3rem .3rem;
                  background-size: .3rem .3rem;
                }
                s{
                  display: inline-block;
                  vertical-align: middle;
                  i{
                    color: #FA513C;
                  }
                }
              }
            }
          }
        }
      }
      .fazhan{
        padding: 0 .3rem;
        .tuijian-bg{
          width: 7.14rem;
          height: 1.8rem;
          background: url(../../../static/images/award/jiangli-bg.png) no-repeat;
          -webkit-background-size: 7.14rem 1.8rem;
          background-size: 7.14rem 1.8rem;
          li{
            text-align: center;
            width: 50%;
            height: 1.8rem;
            float: left;
            p{
              font-size: .34rem;
              color: #fff;
              margin-top: .5rem;
              margin-bottom: .16rem;
              span,i{
                display: inline-block;
                vertical-align: middle;
                width: .3rem;
                height: .3rem;
                background: url(../../../static/images/award/zhu.png) no-repeat;
                -webkit-background-size: .3rem .3rem;
                background-size: .3rem .3rem;
                margin-right: .1rem;
              }
              i{
                background: url(../../../static/images/award/yuan.png) no-repeat;
                -webkit-background-size: .3rem .3rem;
                background-size: .3rem .3rem;
              }
              b{
                display: inline-block;
                vertical-align: middle;
              }
            }
            div{
              color: #fff;
              font-size: .38rem;
            }
          }
        }
        .tuijian-msg{
          padding: 0 .2rem .4rem;
          background: #fff;
          margin-top: .2rem;
          h3{
            height: .9rem;
            line-height: .9rem;
            b{
              display: inline-block;
              vertical-align: middle;
              width: .4rem;
              height: .4rem;
              background: url(../../../static/images/award/mingxi.png) no-repeat;
              -webkit-background-size: .4rem .4rem;
              background-size: .4rem .4rem;
            }
            i{
              display: inline-block;
              vertical-align: middle;
              font-size: .3rem;
              margin-left: .2rem;
            }
            span{
              margin-left: .1rem;
              display: inline-block;
              vertical-align: middle;
              font-size: .26rem;
              color: #64ABFF;
              float: right;
            }
          }
          ul{
            li{
              position: relative;
              padding-top: .4rem;
              border-top: 0.01rem solid #EAEAEA;
              .date{
                color: #898989;
                position: absolute;
                right: 0;
                top: .7rem;
                color: #898989;
                font-size: .28rem;
              }
              p{
                font-size: .3rem;
                margin-bottom: .4rem;
                span,b{
                  display: inline-block;
                  vertical-align: middle;
                  width: .3rem;
                  height: .3rem;
                  background: url(../../../static/images/award/chengyuan.png) no-repeat;
                  -webkit-background-size: .3rem .3rem;
                  background-size: .3rem .3rem;
                  margin-right: .1rem;
                }
                b{
                  background: url(../../../static/images/award/jiangli.png) no-repeat;
                  -webkit-background-size: .3rem .3rem;
                  background-size: .3rem .3rem;
                }
                s{
                  display: inline-block;
                  vertical-align: middle;
                  i{
                    color: #FA513C;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .myGroup{
    width: 7.5rem;
    background: #f7f8fa;
  }
  .orderTop{
    position: fixed;
    top: 0;
    height: 1.9rem;

    background: #fff;
    border-bottom: 0.01rem solid #eee;
  }



  .orderNav{
    width: 7.5rem;
    height: 1rem;
  }
  .orderNav li{
    height: 1rem;
    float: left;
    color: #555;
    text-align: center;
    position: relative;
    font-size: .28rem;
    span{
      display: none;
      width: .62rem;
      height: .04rem;
      background: #49ACFF;
      position: absolute;
      left: 50%;
      margin-left:-.31rem;
      bottom: 0;
    }
    &.on{
      color: #64abff;
      span{
        display: block;
      }
    }
  }
  .orderNav .li1,.orderNav .li2{
    width: 50%;
    line-height: 1rem;
  }

  .whole{
    margin-top: 2.3rem;
  }
  .orderMain{
    width: 94%;
    margin-top: 0.3rem;
    margin-left: 3%;
    border-radius: 0.1rem;
    background: #fff;
  }
  .orderMain ul{
    height: 0.96rem;
    border-bottom: 0.02rem solid #fafafa;
  }
  .orderMain ul>li{
    float: left;
  }
  .orderMain .li1{
    color: #333;
    font-size: 0.36rem;
    margin-left: 0.2rem;
    line-height: 0.96rem;
  }
  .orderMain .li2{
    float: right;
  }
  .orderMain .li2>div{
    width: 1.4rem;
    height: 0.5rem;
    font-size: 0.28rem;
    border: 1px solid #64aaff;
    color: #64aaff;
    text-align: center;
    line-height: 0.52rem;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    border-radius: 5px;
    a{
      color: #64aaff;
    }
  }
  .orderMain .li2>div.yishixiao{
    border: none!important;
    color: #ccc;
  }
  .orderMain .li2>h4{
    line-height: 0.98rem;
    margin-right: 0.2rem;
    color: #ccc;
  }
  .orderMainDl{
    /*height: 2.2rem;*/
    padding-bottom: .3rem;
  }
  .orderMainDl dt{
    width: 1.2rem;
    /*height: 2.2rem;*/
    margin-top: 0.3rem;
    margin-left: 0.2rem;

    float: left;
  }
  .orderMainDl dt>img{
    width: 0.83rem;
    height: 0.83rem;
    float: left;
  }
  .orderMainDl dd{
    font-size: 0.28rem;
    color: #666;
    float: left;
  }
  .orderMainDl p{
    line-height: 0.5rem;
  }
  .orderMainDl .p1{
    margin-top: 0.1rem;
  }

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



</style>













