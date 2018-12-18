<template>
    <div class="groupMember">
      <div class="nav clearfix">
        <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
        <h2 class="navTitle fl">{{erjiName}}（二级成员）团队成员</h2>
      </div>
      <div class="content">
        <div class="tuijian-msg">
          <ul>
            <li class="clearfix" v-for="item in teamRelationList">
              <div class="img">
                <img :src="item.url" alt="">
              </div>
              <div class="chenyuan">
                <h4>{{item.name}}</h4>
                <p><span></span>交易量 <b>{{item.orderCount}}笔</b></p>
                <p><i></i>累计奖励<s>{{item.amount}}元</s></p>
              </div>
              <div class="lianxi"><span @click="lianxiFun(item)"><b></b>去联系</span></div>
              <div class="next" @click="sanjiFun(item)"><span></span></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="noOrder" v-if="order">
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
        name: "",
        data() {
            return {
              teamRelationList:"",//列表
              order: false,
              erjiName:"",
            }
        },
      mounted(){
          this.erjiName = this.$route.query.name;
          this.init();
      },
        methods: {
          navBack() {
              this.$router.push({path: "/myGroup",query:{url:"groupMember"}})
            // this.$router.go(-1)
          },
          init(){
            this.$http({
              url: this.changeData() + "/team/auth/teamRelation",
              method: 'post',
              params: {
                id: this.$route.query.id
              }
            }).then(res => {
              console.log(res)
              //推荐信息
              this.teamRelationList = res.data.teamRelationList;
              if(this.teamRelationList.length == 0){
                this.order = true;
              }
            }).catch(err => {
              console.log(err)
            });
          },
          sanjiFun(item){
            this.$router.push({path: "/groupDetail",query:{url:"groupMember",userId:item.id}})
          },
          lianxiFun(item){
            MessageBox.confirm('', {
              message: '确定拨打电话？',
              title: '提示',
              confirmButtonText:'拨打',
              cancelButtonText:'取消'
            }).then(action => {
              if (action == 'confirm') {     //确认的回调
                window.location.href = "tel:"+item.mobile;
              }
            }).catch(err => {
              if (err == 'cancel') {     //取消的回调

              }
            });
          },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .groupMember{
    width: 7.5rem;
    margin: .9rem auto 0;
    background: #fff;
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
          margin-top: 2rem;
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
        width: .44rem;
        height: .44rem;
        background: url(../../../static/images/group/xueyuan.png) no-repeat;
        -webkit-background-size: .44rem .44rem;
        background-size: .44rem .44rem;
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
        font-size: .32rem;
        color: #64ABFF;
      }
    }
    ul{
      li{
        position: relative;
        height: 2.05rem;
        padding-top: .4rem;
        border-bottom: 0.01rem solid #EAEAEA;
        .img{
          width: .88rem;
          height: 2.05rem;
          float: left;
          img{
            width: .88rem;
            height: .88rem;
          }
        }
        .chenyuan{
          float: left;
          margin-left: .28rem;
          h4{
            font-size: .3rem;
            color: #333;
            margin-bottom: .38rem;
          }
          p{
            font-size: .3rem;
            margin-bottom: .2rem;
            span,i{
              display: inline-block;
              vertical-align: middle;
              width: 0.15rem;
              height: 0.15rem;
              margin-right: .1rem;
              background: url(../../../static/images/group/lvse.png) no-repeat;
              -webkit-background-size: 0.15rem 0.15rem;
              background-size: 0.15rem 0.15rem;
            }
            b{
              color: #64ABFF;
              margin-left: .4rem;
            }
            i{
              background: url(../../../static/images/group/juse.png) no-repeat;
              -webkit-background-size: 0.15rem 0.15rem;
              background-size: 0.15rem 0.15rem;
            }
            s{
              color: #FA513C;
              margin-left: .2rem;
            }
          }
        }
        .lianxi{
          position: absolute;
          right: 0;
          top: .4rem;
          color: #fff;
          text-align: center;

            color: #fff;
            span{
              width: 1.4rem;
              height: 0.48rem;
              line-height: 0.48rem;
              display: inline-block;
              vertical-align: middle;
              background: #64ABFF;
              border-radius: .05rem;
              margin-right: .2rem;
            }
            b{
              display: inline-block;
              vertical-align: middle;
              width: .26rem;
              height: .26rem;
              background: url(../../../static/images/group/tel.png) no-repeat;
              -webkit-background-size: .26rem .26rem;
              background-size: .26rem .26rem;
              margin-right: .1rem;
            }

        }
        .next{
          position: absolute;
          right: .1rem;
          margin-top: 1rem;
          width: .6rem;
          height: .6rem;
          text-align: center;
          span{
            display: inline-block;
            margin-top: .2rem;
            width: 0.15rem;
            height: 0.28rem;
            background: url(../../../static/images/common/more.png) no-repeat;
            -webkit-background-size: 0.15rem 0.28rem;
            background-size: 0.15rem 0.28rem;
          }
        }
      }
    }
  }
</style>
