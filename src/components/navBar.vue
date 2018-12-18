<template>
    <div class="navBar">
        <div class="nav-class">
            <dl class="dl1">
                <router-link to='/home' active-class="active1">
                    <dd>
                        <i class='icon1'></i>
                    </dd>
                    <dt>首页</dt>
                </router-link>
            </dl>

            <dl class="dl2">
                <span>
                    <router-link to='/source' active-class="active2">
                        <dd>
                            <i class='icon2'></i>
                        </dd>
                        <dt>客源</dt>
                    </router-link>
                </span>
            </dl>

            <dl class="dl3">
                <span>
                    <router-link to='/mine' active-class="active3">
                        <dd>
                            <i class='icon3'></i>
                        </dd>
                        <dt>我的</dt>
                    </router-link>
                </span>
            </dl>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'navBar',
    components: {
        // child
    },
    data () {
        return {
          // message:  ''
        }
    },
    methods:{
        goSource(){
            if(!localStorage.token){
                this.$router.push({path: '/login',query:{url: "source"}});
            }
        },
        goMine(){
            if(!localStorage.token){
                this.$router.push({path: '/login',query:{url:"mine"}});
            }
        }
    },
    mounted() {
　　　　
    },
    created(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
.navBar{
    width: 7.5rem;
    margin: 0 auto;
    .nav-class{
        width: 7.5rem;
        height: 1rem;
        background-color: #fff;
        position: fixed;
        bottom: 0px;
        color: #898989;
        font-size: 0.2rem;
        box-shadow:2px 0px 12px rgba(132,166,195,0.3);
        z-index: 100;
        dl{
            width: 33.33%;
            float: left;
            text-align: center;
            padding-top: .1rem;
            a{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                display: inline-block;
                width: 100%;
                height: 100%;

                dd{
                    height: 0.44rem;
                    width: 100%;
                    margin-top: .04rem;
                    margin-bottom: .04rem;
                    i{
                        display: inline-block;
                        height: 0.44rem;
                        width: 0.44rem;
                    }
                }
                dt{
                    font-size: .22rem;
                    font-weight: bold;
                }
            }
        }
        .dl1,.dl3{
            width: 25%;
        }
        .dl2{
            width: 50%;
        }
    }
}
dt{
    color: #c1c4ca;
}
.icon1{
    background: url(../../static/images/common/home.png) no-repeat;
    background-size: 100% 100%;
}
.icon2{
    background: url(../../static/images/common/source.png) no-repeat;
    background-size: 100% 100%;
}
.icon3{
    background: url(../../static/images/common/mine.png)no-repeat;
    background-size: 100% 100%;
}

.active1 dt{color: #64abff;}
.active1 .icon1{
    background: url(../../static/images/common/home2.png)no-repeat;
    background-size: 100% 100%;
}
.active2 dt{color: #64abff;}
.active2 .icon2{
    background: url(../../static/images/common/source2.png)no-repeat;
    background-size: 100% 100%;
}
.active3 dt{color: #64abff;}
.active3 .icon3{
    background: url(../../static/images/common/mine2.png)no-repeat;
    background-size: 100% 100%;
}
</style>
