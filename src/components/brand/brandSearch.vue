<template>
    <div class="brandSearch">
        <div class="searchWrap">
            <dl>
                <dt>
                    <img src="../../../static/images/home/search.png" class="searchImg">
                    <form action="javascript:return true;">
                    <!-- <input type="search" name="" placeholder="请输入品牌名称" v-model="info" maxlength="15" @keyup="show($event)"> -->
                        <input @keyup.13=show() type="search" v-model="info" maxlength="15" ref="input1" placeholder="请输入品牌名称">
                    </form>
                </dt>
                <dd @click="navBack()">取消</dd>
            </dl>            
        </div>
    </div>
</template>

<script>
export default {
name: "brandSearch",
    data () {
        return {
            info: "",
                               
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/brandManagement'});       
        },
        // show:function(ev){
        //     if(ev.keyCode == 13){
        //         alert('你按回车键了');

        //     }
        // },
        show(){
            // this.$refs.input1.blur();
            // alert("1");
            // alert(this.info);
            this.$router.push({path: '/brandManagement',query:{search: this.info}});                    
        }

    },
    mounted() {

    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
input::-webkit-input-placeholder{
    color: #898989;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #898989;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #898989;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #898989;
}
input,button{-webkit-appearance:none;outline:none}
.brandSearch{
    width: 7.5rem;
    margin: 0 auto;
}
.searchWrap{
    width: 7.5rem;
    height: 1rem;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    dl{
        width: 6.9rem;
        padding: .2rem .3rem .2rem .3rem;
        dt{
            width: 6.1rem;
            height: .64rem;
            position:relative;
            float: left;
            .searchImg{
                width: .28rem;
                height: .28rem;
                position: absolute;
                left: .26rem;
                top: .16rem;
            }
            input{
                width: 6.1rem;
                height: .64rem;
                background: #f0f1f2;
                /*border-radius: 6px;*/
                font-size: .28rem;
                color: #898989;
                padding-left: .7rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
        }
        dd{
            float: right;
            color: #111;
            font-size: .28rem;
            margin-top: .14rem;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
    }
}
</style>
