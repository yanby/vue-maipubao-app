<template>
    <div class="source">
      <div class="luru" @click="luruFun()"></div>
      <div class="title">
        <h3>客源 <a href="javascript:;" @click="searchFun()"></a></h3>
      </div>
      <div class="msg">
        <ul>
          <li>
            <p>{{customer_num}}/{{projectCount}}</p>
            <div>客户数/交易量</div>
          </li>
          <li>
            <p>{{projectAmount}}</p>
            <div>累计佣金(元)</div>
          </li>
        </ul>
      </div>
      <div class="list" v-if="order==1">
        <ul>
          <li v-for="item in customerList" @click="next(item)">
            <h3><span></span>{{item.customer_name}}</h3>
            <p v-if="item.brand_name">{{item.brand_name}}</p>
            <p>交易项目：{{item.projectCount}}<b>总结佣金额：<i>{{item.projectAmount}}</i> 元</b></p>
          </li>
        </ul>
      </div>
      <div class="noOrder" v-if="order==0">
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
  export default {
    data () {
      return {
        order:1,
        message: '',
        customerList:"",//列表
        projectAmount: "",//累计佣金
        projectCount: "",//交易量
        customer_num:"",//客户数
      }
    },
    mounted(){
      this.init();
    },
    methods: {
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
            this.projectAmount = res.data.projectAmount;
            this.projectCount = res.data.projectCount;
            this.customer_num = res.data.customer_num;
            if(this.customerList <= 0 ){
              this.order = 0;
            }
          }
        }).catch(err => {
          console.log(err)
        });
      },
      searchFun(){//搜索跳转
        this.$router.push({path:"/sourceSearch",query:{url:"source"}})
      },
      luruFun(){//跳转到客户录入
        this.$router.push({path: "/clientEntering",query:{url:"source"}})
      },
      next(item){
        this.$router.push({path:"/sourceAccess",query:{id:item.id}})
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .source{
    width: 7.5rem;
    margin: 0 auto;
    padding-bottom: .4rem;
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
    .title{
      position: fixed;
      top: 0;
      width: 7.5rem;
      height: 2.7rem;
      background: url("../../../static/images/source/source.png") no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      h3{
        height: .9rem;
        line-height: .9rem;
        font-size: .34rem;
        text-align: center;
        color: #fff;
        position: relative;
        a{
          position: absolute;
          width: .4rem;
          height: .4rem;
          top: .2rem;
          right: .3rem;
          background: url("../../../static/images/common/search-write.png") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
    }
    .msg{
      width: 6.9rem;
      height: 1.8rem;
      background: #fff;
      border-radius: .1rem;
      position: fixed;
      top: 1.7rem;
      left: 50%;
      margin-left: -3.45rem;
      box-shadow:0px 0px 8px 0px rgba(0,0,0,0.08);
      ul{
        overflow: hidden;
        li{
          width: 50%;
          float: left;
          text-align: center;
          p{
            font-size: .46rem;
            color: #64ABFA;
            margin-top: .4rem;
            margin-bottom: .3rem;
          }
          div{
            font-size: .26rem;
            color: #898989;
          }
        }
      }
    }
    .list{
      width: 6.9rem;
      margin: 4rem auto 0;
     ul{
       li{
         -webkit-tap-highlight-color: rgba(0,0,0,0);
         background: #fff;
         border-radius: .1rem;
         padding: .2rem .3rem;
         margin-bottom: .2rem;
         box-shadow:0px 0px 8px rgba(0,0,0,0.08);
         h3{
           font-size: .34rem;
           margin-bottom: .4rem;
           span{
             width: .4rem;
             height: .4rem;
             margin-right: .1rem;
             vertical-align: -.05rem;
             display: inline-block;
             background: url("../../../static/images/source/touxiang.png") no-repeat;
             -webkit-background-size: 100% 100%;
             background-size: 100% 100%;
           }
         }
         p{
           font-size: .28rem;
           margin-bottom: .2rem;
           b{
             float: right;
             i{
               color:#FF5140;
               font-weight: bold;
             }
           }
         }
       }
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
          margin-top: 5rem;
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
