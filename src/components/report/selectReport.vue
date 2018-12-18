<template>
  <div class="selectReport">
    <div class="luru" @click="luruFun()"></div>
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">客户报备</h2>
      <a href="javascript:;" @click="searchFun()"></a>
    </div>
    <div class="buzhou">
      <p><span>选择/填写报备客户</span><b>填写报备信息</b></p>
      <div></div>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in customerList"><span @click="xuanzeFun($event,item)"></span>{{item.customer_name}}<b>{{item.create_time}}</b></li>
      </ul>
    </div>
    <div class="btn"><span @click="cancleFun()">取消预约</span><b @click="commit()">下一步</b></div>
    <div class="noOrder" v-if="order===0">
      <dl>
        <dt>
          <img src="../../../static/images/common/noOrders.png">
        </dt>
        <p>暂无信息</p>
      </dl>
    </div>
  </div>
</template>

<script>
  import { Toast,MessageBox } from 'mint-ui';
    export default {
        name: "",
        data() {
            return {
              customerList:"",//列表
              customerId:"",//客户ID
              order:"",//搜索
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
              url: this.changeData() + "/customer/auth/list",
              method: 'post',
              params: {
                customerName: this.$route.query.search
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == "101"){
                this.customerList = res.data.customerList;
                if(this.customerList <= 0){
                  this.order = 0;
                }
              }
            }).catch(err => {
              console.log(err)
            });
          },
          searchFun(){//搜索跳转
            this.$router.push({path:"/sourceSearch",query:{url:"selectReport"}})
          },
          luruFun(){//跳转到客户录入
            this.$router.push({path: "/clientEntering",query:{projectId:this.$route.query.projectId,projectType:this.$route.query.projectType,houseType:this.$route.query.houseType}})
          },
          cancleFun(){//取消预约
            MessageBox.confirm('', {
              message: '确认要取消预约吗？',
              title: '提示',
            }).then(action => {
              if (action == 'confirm') {     //确认的回调
                if(this.$route.query.projectType == 1){
                  this.$router.push({path: "/sellDetail",query:{projectId:this.$route.query.projectId,projectType:this.$route.query.projectType,houseType:this.$route.query.houseType}})
                }else if(this.$route.query.projectType == 2){
                  this.$router.push({path: "/merchantsDetail",query:{projectId:this.$route.query.projectId,projectType:this.$route.query.projectType,houseType:this.$route.query.houseType}})
                }
              }
            }).catch(err => {
              if (err == 'cancel') {     //取消的回调
                console.log(1);
              }
            });
          },
          xuanzeFun(e,item) {
            if ($(e.srcElement).hasClass("cur")) {
              $(e.srcElement).removeClass("cur")
            } else {
              $(e.srcElement).addClass("cur")
              this.customerId = item.id;
            }
          },
          commit(){
            if(this.customerId == ""){
              Toast('请选择客户');
            }else{
              this.$router.push({path: "/writeReport",query:{customerId:this.customerId,projectId:this.$route.query.projectId,projectType:this.$route.query.projectType,houseType:this.$route.query.houseType}})
            }
          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .selectReport{
    width: 7.5rem;
    height: 100vh;
    position: relative;
    .luru{
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      position: fixed;
      width: 1.6rem;
      height: 1.6rem;
      bottom: 3rem;
      right: 0.3rem;
      background: url("../../../static/images/report/luru.png") no-repeat ;
      -webkit-background-size: 1.6rem 1.6rem;
      background-size: 1.6rem 1.6rem;
    }
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
    .buzhou{
      padding: .4rem .3rem;
      p{
        font-size: .3rem;
        span{
          margin-right: 2.3rem;
        }
      }
      div{
        width: 5.11rem;
        height: 0.58rem;
        margin: .3rem auto 0;
        background: url("../../../static/images/report/xuanze.png") no-repeat;
        -webkit-background-size: 5.11rem 0.58rem;
        background-size: 5.11rem 0.58rem;
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
          span{
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            display: inline-block;
            vertical-align: -.02rem;
            width: .3rem;
            height: .3rem;
            background: url("../../../static/images/common/xuan.png") no-repeat ;
            -webkit-background-size: .3rem .3rem;
            background-size: .3rem .3rem;
            margin-right: .1rem;
            &.cur{
              background: url("../../../static/images/common/xuan-bg.png") no-repeat ;
              -webkit-background-size: .3rem .3rem;
              background-size: .3rem .3rem;
            }
          }
          b{
            float: right;
            font-size: .28rem;
            color: #898989;
          }
        }
      }
    }
    .btn{
      position: absolute;
      bottom:0rem;
      left: 0;
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0;
      text-align: center;
      span,b{
        /*-webkit-tap-highlight-color: rgba(0, 0, 0, 0);*/
        display: inline-block;
        width: 50%;
        height: 1rem;
        color: #898989;
        background: #000;
        font-size: .34rem;
        background: #e9e9e9;
      }
      b{
        color: #fff;
        background: #64ABFF;
      }
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
          margin-top: 1rem;
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
</style>
