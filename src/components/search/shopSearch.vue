<template>
  <div class="shopSearch">
    <div class="title">
        <div class="sou">
            <span></span>
          <form action="" class="">
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
      }
    },
    mounted(){
      var that = this;
      $(".keyword").on('keypress',function(e) {
        var keycode = e.keyCode;
        if(keycode=='13') {
          e.preventDefault();
          //请求搜索接口
          that.bianhua()
        }
      })
    },
    methods:{
      shiqu(){
        this.close = true;
      },
      back(){
        this.$router.go(-1)
        // if(this.$route.query.project == 1){
        //   this.$router.push({path:"/sellList"})
        // }else if(this.$route.query.project == 2){
        //   this.$router.push({path:"/merchantsList"})
        // }
      },
      sou(){
        this.sousuo = "";
        this.close = false;
      },
      bianhua(){
        var reg = /^\s*$/g;
        if(reg.test(this.sousuo) == false){
          this.$router.push({path:"/"+this.$route.query.url,query:{search:this.sousuo}})
        }else{
          Toast('搜索内容不能为空');
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>

  .shopSearch{
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
          span{
            position: absolute;
            left: .4rem;
            top: .34rem;
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
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            width: 5.8rem;
            height: 0.57rem;
            line-height: .57rem;
            border-radius: 0.1rem;
            background: #f0f1f3;
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
