<template>
  <div class="writeReport">
    <div class="nav clearfix">
      <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
      <h2 class="navTitle fl">客户报备</h2>
    </div>
    <div class="buzhou">
      <p><span>选择/填写报备客户</span><b>填写报备信息</b></p>
      <div></div>
    </div>
    <div class="list">
      <ul>
        <li>品牌名称：<input type="text" v-model="mingcheng" @keyup="mingchengFun()"></li>
        <li>预计到访时间：<span @click="openPicker">{{birthday}}<b></b></span>
          <mt-datetime-picker
            type="date"
            ref="picker"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm"
            :startDate="startDate"
          >
          </mt-datetime-picker>
        </li>
        <li class="other">备注：<textarea v-model="beizhu" placeholder="请填写"></textarea></li>
      </ul>
    </div>
    <div class="btn"><span @click="cancleFun()">取消预约</span><b v-if="tijiao==true" @click="commit()">提交</b><b class="cur" v-if="tijiao==false">提交</b></div>
  </div>
</template>

<script>
  import { DatetimePicker,Toast,Popup,Picker,MessageBox  } from 'mint-ui';
    export default {
        name: "",
        data() {
            return {
              tijiao: true,
              mingcheng:"",
              beizhu: "",
              birthday:"请选择日期",  //出生日期
              startDate:new Date(new Date().setDate(new Date().getDate()+1)),
            }
        },
      mounted(){

      },
        methods: {
          openPicker () {
            this.$refs.picker.open()
          },
          handleConfirm (data) {
           this.birthday = data;   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
            var d = new Date(data);
            this.birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            console.log(this.birthday)
          },
          navBack() {
              this.$router.go(-1)
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
          mingchengFun(){
            this.mingcheng = this.mingcheng.replace(/(^\s+)|(\s+$)/g,'');
          },
          xuanzeFun(e) {
            if ($(e.srcElement).hasClass("cur")) {
              $(e.srcElement).removeClass("cur")
            } else {
              $(e.srcElement).addClass("cur")
            }
          },
          tijiaoFun(){//提取公共方法
            this.$http({
              url: this.changeData() + '/project/auth/projectReported',
              method: "post",
              params: {
                projectId: this.$route.query.projectId, //项目ID【必传】
                customerId: this.$route.query.customerId, //客户ID【必传】
                appointmentTime: this.birthday, //预约时间
                brandName: this.mingcheng, //品牌名称
                description:this.beizhu, //备注
              }
            }).then(function(res){
              console.log(res)
              var that = this;
              if(res.data.code == "101"){
                Toast('提交成功');
                this.tijiao = false;
                setTimeout(function () {
                  that.$router.push({path:"/source"})
                  // if(that.$route.query.projectType == 1){
                  //   that.$router.push({path: "/sellDetail",query:{projectId:that.$route.query.projectId,projectType:that.$route.query.projectType,houseType:that.$route.query.houseType}})
                  // }else if(this.$route.query.projectType == 2){
                  //   that.$router.push({path: "/merchantsDetail",query:{projectId:that.$route.query.projectId,projectType:that.$route.query.projectType,houseType:that.$route.query.houseType}})
                  // }
                },2000)
              }
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          },
          commit(){
            if(this.$route.query.projectType == 1){
              if(this.birthday == "" || this.beizhu == ""){
                Toast('请输入必填项');
              }else{
                this.tijiaoFun();
              }
            }else{
              if(this.mingcheng == "" || this.birthday == "" || this.beizhu == ""){
                Toast('请输入必填项');
              }else{
                this.tijiaoFun();
              }
            }

          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "../../../static/css/nav.css";
  .writeReport{
    width: 7.5rem;
    height: 100vh;
    position: relative;
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
        background: url("../../../static/images/report/tianxie.png") no-repeat;
        -webkit-background-size: 5.11rem 0.58rem;
        background-size: 5.11rem 0.58rem;
      }
    }
    .list{
      background: #fff;
      ul{
        li{
          padding:0 .3rem;
          height: 1rem;
          line-height: 1rem;
          font-size: .3rem;
          border-bottom: 0.01rem solid #EAEAEA;
          &.other{
            height: 2.8rem;
          }
          span{
            float: right;
            b{
              display: inline-block;
              vertical-align: middle;
              margin-left: .1rem;
              width: 0.15rem;
              height: 0.28rem;
              background: url("../../../static/images/common/more.png") no-repeat ;
              -webkit-background-size: 100% 100%;
              background-size: 100% 100%;
            }
          }
          input{
            vertical-align: .015rem;
            font-size: .3rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
          textarea{
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            padding-left: .2rem;
            padding-top: .2rem;
            vertical-align: text-top;
            width: 5.6rem;
            height: 2rem;
            border: none;
            background: #F7F8FA;
            border-radius: .1rem;
          }
        }
      }
    }
    .btn{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0;
      text-align: center;
      span,b{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
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
        &.cur{
          background: #e9e9e9;
          color: #898989;
        }
      }
    }
  }
</style>
