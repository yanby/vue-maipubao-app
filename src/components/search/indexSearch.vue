<template>
  <div class="indexSearch">
    <div class="title">
        <div class="sou">
          <span></span>
          <form action="" class="">
            <select name="select" id="" v-model="select" @change="selectFun()">
              <option v-for="item in selectList" :value="item.name">{{item.name}}</option>
            </select>
            <!--<input class="keyword" placeholder="区域、面积、租金、商铺编号" @focus="shiqu()" v-model="sousuo" @keydown.13="bianhua()">-->
            <input class="keyword" placeholder="请输入项目名称" @focus="shiqu()" v-model="sousuo">
            <b @click="sou()" v-show="close"></b>
          </form>
        </div>
        <div class="cancle">
          <span @click="back()">取消</span>
        </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
export default {
    name: 'search',
    data () {
      return {
        result: "",
        sousuo: "",
        close: false,
        arr: [],
        list: [],
        shopMsg: "",
        select:"销售",
        selectList: [{name:"销售",val:0},{name:"招商",val:1}]
      }
    },
    mounted(){
      var that = this;
      $(".keyword").on('keypress',function(e) {
        var keycode = e.keyCode;
        if(keycode=='13') {
          console.log(this.select)
          e.preventDefault();
          //请求搜索接口
          that.bianhua()
        }
      })
    },
    computed:{

    },
    methods:{
      selectFun(){
        console.log(this.select)
      },
      shiqu(){
        this.close = true;
      },
      back(){
        this.$router.go(-1)
      },
      sou(){
        this.sousuo = "";
        this.close = false;
      },
      bianhua(){
        var reg = /^\s*$/g;
        if(reg.test(this.sousuo) == false){
          if(this.select == "销售"){
            this.$router.push({path:"/sellList",query:{search:this.sousuo}})
          }else{
            this.$router.push({path:"/merchantsList",query:{search:this.sousuo}})
          }
        }else{
          Toast('搜索内容不能为空');
        }

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>

  .indexSearch{
      width: 7.5rem;
    height: 13.34rem;
    overflow: scroll;
      margin: 0 auto;
    background: #fff;
      position: relative;
    .title{
        height: .9rem;
        line-height: .9rem;
        padding: 0 .2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #eaeaea;
        .sou{
          width: 6.5rem;
          font-size: 0;
          select{
            width: 1.3rem;
            height: 0.57rem;
            border: none;
            font-size: .28rem;
            vertical-align: middle;
            padding-left: .2rem;
            appearance:none;
            background: url("../../../static/images/Merchants/down.png") no-repeat scroll .9rem center transparent;
            -webkit-background-size: 0.14rem .1rem;
            background-size: 0.14rem .1rem;
          }
          span{
            position: absolute;
            left: 1.8rem;
            top: .32rem;
            width: .26rem;
            height: .24rem;
            background: url("../../../static/images/common/search.png") no-repeat;
            background-size: .26rem .24rem;

          }
          input[type=search]::-webkit-input-placeholder{
            line-height: .34rem;
          }
          input[type=search]::-webkit-search-cancel-button{
            -webkit-appearance: none;
          }
          b{
            position: absolute;
            top: .34rem;
            right: 1.05rem;
            width: .26rem;
            height: .26rem;
            line-height: .26rem;
            margin-right: .1rem;
            background: url("../../../static/images/common/close.png") no-repeat;
            background-size: .26rem .26rem;
          }
          input{
            vertical-align: middle;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 4.5rem;
            height: 0.57rem;
            line-height: .57rem;
            background: #f0f1f3;
            border-radius: .05rem;
            padding-left: .6rem;
          }
        }
        .cancle{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          span{
            font-size: .26rem;
            color: #111;
          }
        }
      }
  }
</style>
