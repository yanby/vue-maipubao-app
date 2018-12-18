<template>
    <div class="sourceAccess">
      <div class="title">
        <h3><span @click="navBack()"></span></h3>
        <h4>{{customerDetail.customerName}}<span v-if="customerDetail.sex==1"></span><span class="cur" v-if="customerDetail.sex==0"></span></h4>
        <p>联系方式：{{customerDetail.mobile}}</p>
        <p>录入时间：{{customerDetail.createTime}}</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in customerOrders" @click="next(item)">
            <div class="next">详情 <span></span></div>
            <p><span>项目名称：</span><b>{{item.project_name}}</b></p>
            <p>项目经理：{{item.project_manager}}</p>
            <p>需求类型：{{item.project_type_name}}</p>
            <div class="jindu1" v-if="item.isEnd==0">
              <div class="inner" v-if="item.lastOrderStatus==1" style="width: 0%"></div>
              <div class="inner" v-if="item.lastOrderStatus==2" style="width: 10%"></div>
              <div class="inner" v-if="item.lastOrderStatus==3" style="width: 20%"></div>
              <div class="inner" v-if="item.lastOrderStatus==4" style="width: 40%"></div>
              <div class="inner" v-if="item.lastOrderStatus==5" style="width: 60%"></div>
              <div class="inner" v-if="item.lastOrderStatus==6" style="width: 80%"></div>
              <div class="inner" v-if="item.lastOrderStatus==7" style="width: 100%"></div>
            </div>
            <div class="jindu2" v-if="item.isEnd==1">
              <div class="inner" v-if="item.lastOrderStatus==1" style="width: 0%"></div>
              <div class="inner" v-if="item.lastOrderStatus==2" style="width: 10%"></div>
              <div class="inner" v-if="item.lastOrderStatus==3" style="width: 40%"></div>
              <div class="inner" v-if="item.lastOrderStatus==4" style="width: 60%"></div>
              <div class="inner" v-if="item.lastOrderStatus==5" style="width: 60%"></div>
              <div class="inner" v-if="item.lastOrderStatus==6" style="width: 80%"></div>
              <div class="inner" v-if="item.lastOrderStatus==7" style="width: 100%"></div>
            </div>
            <div class="txt">
              <span v-for="item in jinduTxt">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import $ from '../../../static/js/jquery.min.js';
    export default {
        name: "",
        data() {
            return {
              id:"",
              customerOrders:"",//订单列表
              customerDetail: "",//客户详情
              jinduTxt:[
                {name:"报备"},
                {name:"到访"},
                {name:"认购"},
                {name:"签约"},
                {name:"结佣"},
                {name:"完成"},
              ]
            }
        },
        mounted(){
          this.id = this.$route.query.id;
          this.init();
        },
        updated(){

        },
        methods: {
          navBack() {
              this.$router.push({path: "/source"})
          },
          init(){
            this.$http({
              url: this.changeData() + "/customer/auth/detail",
              method: 'post',
              params: {
                customerId: this.id
              }
            }).then(res => {
              console.log(res)
              var that = this;
              if(res.data.code == "101"){
                this.customerOrders = res.data.customerOrders;
                this.customerDetail = res.data.customerDetail;
              }
            }).catch(err => {
              console.log(err)
            });
          },
          next(item){
            this.$router.push({path:"/sourceThree",query:{id:this.$route.query.id,order:item.order_no,type:item.project_type}})
          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  .sourceAccess{
    width: 7.5rem;
    margin: 0 auto;
    .title{
      width: 7.5rem;
      height: 3.24rem;
      background: url("../../../static/images/source/source-bg.png") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      h3{
        height: .9rem;
        line-height: .9rem;
        span{
          display: inline-block;
          width: .36rem;
          height: .36rem;
          margin-left: .3rem;
          margin-top: .3rem;
          background: url("../../../static/images/common/back-white.png") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
      h4{
        font-size: .34rem;
        color: #fff;
        text-align: center;
        span{
          display: inline-block;
          width: .3rem;
          height: .3rem;
          margin-left: .1rem;
          background: url("../../../static/images/common/man.png") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          &.cur{
            background: url("../../../static/images/common/women.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
      }
      p{
        text-align: center;
        font-size: .3rem;
        color: #fff;
        margin-top: .3rem;
      }
    }
    .list{
      ul{
        li{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          width: 6.1rem;
          background: #fff;
          margin: .2rem auto 0;
          padding: .3rem .4rem;
          border-radius: .1rem;
          position: relative;
          box-shadow:0px 0px 8px 0px rgba(0,0,0,0.08);
          p{
            font-size: .3rem;
            margin-bottom: .3rem;
            overflow: hidden;
            span{
              width: 1.5rem;
              float: left;
            }
            b{
              width: 4.6rem;
              float: left;
              line-height: .5rem;
              margin-top: -.08rem;
            }
          }
          .jindu1,.jindu2{
            width: 6.24rem;
            height: .12rem;
            background: #DCECFF;
            border-radius: .1rem;
            margin-bottom: .2rem;
            position: relative;
            .inner{
              position: absolute;
              left: 0;
              top: 0;
              width: 0;
              height: .12rem;
              border-radius: .1rem;
              background: #64ABFF;
            }
          }
          .jindu2{
            background: #FFE1DD;
            .inner{
              background: #E56A5B;
            }
          }
          .txt{
            span{
              font-size: .26rem;
              margin-right: .59rem;
              &:nth-last-child(1){
                margin: 0;
              }
              &.blue{
                color: #64ABFF;
              }
              &.red{
                color:#FA513C;
              }
              &.gray{
                color: #D3D6DD;
              }
            }
          }
          .next{
            font-size: .28rem;
            color: #64ABFF;
            position: absolute;
            right: .3rem;
            top: 1.4rem;
            span{
              display: inline-block;
              width: .11rem;
              height: .2rem;
              background: url("../../../static/images/source/next.png") no-repeat;
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
</style>
