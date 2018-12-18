<template>
    <div class="aboutUs">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">关于我们</h2>
            <p class="logout" @click="logout()">退出登录</p>
        </div>
        <!-- 优铺介绍 -->
        <div class="aboutUP-wrap">
            <div class="up-introduce">
                <dl>
                    <dt>
                        <img src="../../../static/images/aboutUs/upLogo.png" class="upLogo">
                        <div class="up-titel">
                            <h2>优铺介绍</h2>
                            <i></i>
                            <p>Company Profile</p>
                        </div>
                    </dt>
                    <div class="titleNav">
                        <img src="../../../static/images/aboutUs/01@2x.png">
                    </div>
                    <dd>
                        <p>公司于2016年6月成立，同年11月品牌发布，2017年6月APP上线，总部设立北京，瞄准商业地产垂直细分市场的蓝海机遇，着力打造商业地产全产业链生态圈。优铺天使轮融资便已获得东方资产旗下东方邦信置业、优享创智（5Lmeet共享际）、中经大业资本、中投置地等机构数千万元投资。</p>
                    </dd>

                    <div class="titleNav">
                        <img src="../../../static/images/aboutUs/02@2x.png">
                    </div>
                    <dd>
                        <p>优铺深耕垂直细分市场，借助互联网和资本力量。</p>
                        <p>A、"租铺宝"聚焦一线城市商铺租赁业务，面对存量(二手商铺)市场，服务于商家；</p>
                        <p>B、"卖铺宝"面对增量(新项目商铺)市场，利用经纪人众包，为开发商服务，招商和销售；</p>
                        <p>C、优铺计划在三四线城市寻找合伙人加盟，技术输出、平台赋能、创新驱动，目标是形成覆盖全国的商铺租售系统；</p>
                    </dd>

                    <div class="titleNav">
                        <img src="../../../static/images/aboutUs/03@2x.png">
                    </div>
                    <dd>
                        <p>共享房源、业务众包，卖铺宝是中国第一款商铺销售APP，将开发商房源、客源、中介 渠道资源、品牌商家资源有机聚合，构建商业地产全产业链生态圈。</p>
                        <p>优铺也是中小经纪公司、招商公司、渠道公司的管理神器，实现商业精细化管理，不仅能够管理房源、客源， 更能够管理自己公司和外包公司的经纪人交易流程，数据实时掌握。</p>
                    </dd>

                    <div class="titleNav">
                        <img src="../../../static/images/aboutUs/04@2x.png">
                    </div>
                    <dd>
                        <p>在一线城市，一铺难求。2018年，随着北上深房地产市场从增量(新项目商铺)转向存量(二手商铺)，2018年4月推出“租铺宝”APP，商铺覆盖全市， 直接对接房东，让转店租店不再难。</p>
                    </dd>

                    <div class="titleNav">
                        <img src="../../../static/images/aboutUs/05@2x.png">
                    </div>
                    <dd>
                        <p>优铺成立商学院，与城市合伙人通过股权合作，为其进行平台赋能、品牌赋能、资本赋能、服务赋能、工具赋能，共同搭建覆盖全国的中国首席商铺租售O2O平台，赋能全国从事商业地产租售业务的中小型房地产中介公司，也能帮助住宅类公司向商业转型。</p>
                        <p>优铺采取直营与加盟相结合，北京、天津作为直营区域。直营城市计划发展到20个经济发达的一线城市，三四线城市将陆续在西宁、沧州、徐州、沈阳等城市落地。</p>
                    </dd>
                </dl>
            </div>

            <!-- 创始人 -->
            <div class="founder">
                <div class="up-titel">
                    <h2>创始人</h2>
                    <i></i>
                    <p>Founder</p>
                </div>
                <dl>
                    <dt>
                        <img src="../../../static/images/aboutUs/chen.png">
                        <p>陈云峰</p>
                    </dt>
                    <dd>
                        <h2>现任优铺网 创始人、董事长，中经联盟 创始人、秘书长。</h2>
                        <h3>职业经历：</h3>
                        <p>曾经是国美电器的核心人物，担任国美电器北京总部第一任全国营销总监和管理中心总经理；历任天津国美电器第一任总经理、上海国美电器总经理，香港国美电器开业副总指挥，为国美的发展立下汗马功劳。</p>
                        <p>2005年转战房地产行业，亲历中国房地产飞速发展的18年。曾任北京鹏润地产开发有限公司（明天房地产）营销总监、项目总经理、集团副总裁, 家乐园集团总裁，上市公司华业地产副总裁，负责北京、深圳、长春、大连、武汉、三亚营销与开发工作。</p>
                        <p>2008年，牵头创立中国房地产业行业最具影响力的主流社团——中经联盟，业内称为中国房地产经理人联盟，担任秘书长。</p>
                        <p>2016年，开始创业，创立优铺网，担任董事长。</p>
                        <p>2018年，成立优铺商学院，担任董事长。</p>
                        <h3>社会职务：</h3>
                        <p>中经联盟（中国房地产经理人联盟）秘书长，北京促进雄安产业发展促进会副会长，上海长宁区13届政协委员、中房经联商业地产专委会主席、中国房地产业协会商业地产专业委员会 副秘书长、天津工商联房地产商会商业地产专委会执行主任、河北省住宅与房地产协会商业地产专业委员会主任、北京理工大学客座教授、CCTV、BTV、中央人民广播电台特邀评论员、河北工业大学MBA实践指导教授、河北工业大学北京校友会副会长、秘书长。</p>
                    </dd>
                </dl>
            </div>

            <!-- 公司业务 -->
            <div class="business">
                <div class="businessMain">
                    <b></b>
                    <div class="up-titel">
                        <h2>公司业务</h2>
                        <i></i>
                        <p>Company Business</p>
                    </div>
                    <dl>
                        <dt>
                            <span class="span1"><img src="../../../static/images/aboutUs/zu.png"></span>
                            <span class="span2">租铺宝</span>
                        </dt>
                        <dd>
                            <p>
                                是致力于提升实体商业选址效率的互联网商铺交易服务平台，服务于商铺店主、开店创业者、品牌商家群体。租铺宝的商业模式从根本上改变传统商铺租赁行业信息不对称、选址效率低、风险难规避等弊端，旨在通过数据化、智能化、专业化的精准选址服务，依托真实海量的在线铺源，公开透明的交易原则，专业精准的匹配服务，重构开店体验，提高运营效率。
                            </p>
                        </dd>
                    </dl>

                    <dl>
                        <dt>
                            <span class="span1"><img src="../../../static/images/aboutUs/buy.png"></span>
                            <span class="span2">卖铺宝</span>
                        </dt>
                        <dd>
                            <p>
                                卖铺宝通过联动开发商、经纪人及品牌资源，打造专属商业地产的资源整合营运平台，以共享众包服务经纪世界，用数据战略引领商业地产。卖铺宝的商业模式从根本上改变了开发商、经纪人、品牌资源信息不对称、销售难、招商难等问题。卖铺宝致力于解决经纪人获取优质项目资源，快速成交；组建团 队，众包联动资源。同时用户可发布需求或发起合作，资源对接，实现互利共赢。
                            </p>
                        </dd>
                    </dl>

                    <dl>
                        <dt>
                            <span class="span1"><img src="../../../static/images/aboutUs/cap.png"></span>
                            <span class="span2">优铺商学院</span>
                        </dt>
                        <h4>定位于中国商业地产黄埔军校。</h4>
                        <dd>
                            <ul>
                                <li class="li1">开放股权：</li>
                                <li class="li2">加入优铺商学院平台股东，紧密利益捆绑，分享平台红利。</li>
                            </ul>

                            <ul>
                                <li class="li1">开放讲师：</li>
                                <li class="li2">平台讲师网聚商业地产行业精英，传道授业答疑解惑，最前沿实战实操经验交流。</li>
                            </ul>

                            <ul>
                                <li class="li1">开放资源：</li>
                                <li class="li2">平台开放开发商项目资源对接、品牌商家资源对接、整合各地区中介、代理渠道资源对接。</li>
                            </ul>

                            <ul>
                                <li class="li1">开放工具：</li>
                                <li class="li2">平台统一使用工具管理运营体系，建立规模化商业地产运营平台。</li>
                            </ul>

                            <ul>
                                <li class="li1">品牌输出：</li>
                                <li class="li2">优铺＋合伙人公司品牌，优铺为合伙人公司加持行业影响力。</li>
                            </ul>

                            <ul>
                                <li class="li1">模式输出：</li>
                                <li class="li2">优铺租铺宝、卖铺宝有效管理租售业务的房源、客源、经纪人。</li>
                            </ul>

                            <ul>
                                <li class="li1">加盟或<br/>者参股：</li>
                                <li class="li2">先采取加盟方式，实现获利转型；第二步优铺参股。</li>
                            </ul>

                            <ul>
                                <li class="li1">整体上<br/>市计划：</li>
                                <li class="li2">优铺计划2022年上市，2020年-2022年3年间，优铺收购51%股权，整体打包上市。</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>

            <!-- 公司优势 -->
            <div class="advantages">
                <div class="up-titel">
                    <h2>公司优势</h2>
                    <i></i>
                    <p>Company Advantages</p>
                </div>

                <dl>
                    <i><img src="../../../static/images/aboutUs/UP.png"></i>
                    <h3>共享平台资源，打造社群，彰显行业影响力</h3>
                    <p>"走正道、聚好人、做好事"中经联盟成立八年，已成为中国房地产行业最具影响力的主流社团，会员总数超过<span>3000</span>人，下设<span>33</span>个专业委员会和俱乐部，国内主流房地产企业的董事长、总经理、 副总经理、总监、乃至经理、品牌商家、知名学者、大学教授成为联盟的主力人群。</p>
                    <p>优铺依托中经联盟商业专委会资源，汇聚中国商业地产核心骨干精英，已发展成为在商业领域取得很高的行业影响力和知名度的社团。</p>
                </dl>

                <dl class="fine_line">
                    <h3>共享平台资源之粉丝社群经济</h3>
                    <p>优铺旗下卖铺宝APP——联动开发商、经纪人及品牌资源，打造专属商业地产的资源整合营运平台</p>
                    <p>优铺旗下租铺宝APP——服务于商铺店主、开店创业者、品牌商家群体的互联网商铺交易服务平台</p>
                    <img src="../../../static/images/aboutUs/upCode.png" class="img1">
                    <img src="../../../static/images/aboutUs/zupubao.png" class="img_zupubao">
                    <p>优铺公众号（北京优铺、天津优铺、河北优铺）累计网聚优质中国商业地产业内粉丝<span>80000</span>人。</p>
                    <img src="../../../static/images/aboutUs/upCode2.png" class="img2">
                    <p>中经联盟APP、公众号，中经联盟注册会员<span>3000</span>人。</p>
                    <p>活跃高质地产精英粉丝<span>100000</span>人。</p>
                    <img src="../../../static/images/aboutUs/upCode3.png" class="img3">
                </dl>

                <dl class="clearfloat">
                    <h3>共享平台资源之名牌活动</h3>
                    <ul>
                        <li class="liImg1"><img src="../../../static/images/aboutUs/real.png"></li>
                        <li class="text1">
                            <p>中国商业地产产业化峰会在北京、天津、河北等地，成功策划执行了11届中国商业地产产业化峰会，已成为中国商业地产内最具专业影响力、高标准高规格的交流活动品牌。</p>
                            <p>峰会商业界大咖云集，品牌悉数到场，业内专家行业骨干畅谈经验，发布行业最新资讯，分析商业趋势动态，依据评选大数据发布商业各领域TOP10，博得业内广泛赞誉和热捧。</p>
                        </li>

                    </ul>
                    <ul>
                         <li class="liImg2"><img src="../../../static/images/aboutUs/youpu.png"></li>
                        <li class="text2">
                            <p>优铺（北京）下午茶已举办91期，优铺（天津）下午茶已举办52期，每周四下午16:00-18:00，召集北京、天津两地商业地产圈里的招商人、品牌人。开发商就近期关注话题，展开研讨。每期一主题，每期结交新朋友。</p>
                            <p>优铺下午茶，已成为业内品质高、成效高、受追捧的精品论坛。优铺也将会把下午茶的会场走进购物中心、走进开发商的商街、走进品牌商家。</p>
                        </li>
                    </ul>
                </dl>
            </div>

            <!-- 发展战略 -->
            <div class="strategyBox">
                <div class="strategy">
                    <div class="up-titel">
                        <h2>发展战略</h2>
                        <i></i>
                        <p>Development Strategy</p>
                    </div>
                    <!-- <ul> -->
                        <dl>
                            <dt><img src="../../../static/images/aboutUs/01.png"></dt>
                            <dd>存量(二手商铺)+增量(新项目商铺)，双轴并行</dd>
                        </dl>
                        <dl>
                            <dt><img src="../../../static/images/aboutUs/02.png"></dt>
                            <dd>整合全国中小经纪公司、渠道公司、代理公司搭建优铺商学院</dd>
                        </dl>
                        <dl>
                            <dt><img src="../../../static/images/aboutUs/03.png"></dt>
                            <dd>布局全国，开启百城百位“城市合伙人”计划</dd>
                        </dl>
                        <dl>
                            <dt><img src="../../../static/images/aboutUs/04.png"></dt>
                            <dd>建立中国铺源大数据网络</dd>
                        </dl>
                    <!-- </ul> -->
                </div>
            </div>

            <!-- 企业文化 -->
            <div class="culture">
                <div class="up-titel">
                    <h2>企业文化</h2>
                    <i></i>
                    <p>The Enterprise Culture</p>
                </div>
                <img src="../../../static/images/aboutUs/culture.png">
            </div>

            <!-- 咨询电话 -->
            <div class="tel-phone">
                <h6>版本号:V3.2.0</h6>
                <p>咨询电话<span>|</span>4008988808</p>
            </div>

        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'aboutUs',
    data () {
        return {
            move: ""
        }
    },
    computed:{

    },
    methods:{
        // 点击返回按钮
        navBack(){        
            this.$router.push({path: '/mine'});            
        },
        logout(){
            Toast({
                message: '退出成功',
                duration: 3000
            }); 
            window.localStorage.clear();
            this.$router.push({path:"/home"});
        }
    },
    created() {

    },
    mounted() {
        //截取Url里面的参数
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        var request = new Object();
        request = GetRequest();

        this.move = request['move']; 
        if(this.move == "ios" || this.move == "android"){
            $(".nav").hide();
        }         
    },
}
</script>

<style scoped lang="scss">
@import "../../../static/css/commonNav.css";
.aboutUs{
    width: 7.5rem;
    background: #f7f8fa;
}
.logout{
    color: #111;
    font-size: .28rem;
    position: absolute;
    right: .26rem;
    top: .28rem;
}
.aboutUP-top{
    width: 7.5rem;
    height: 1rem;
    text-align: center;
    background: #fff;
    border-bottom: 0.02rem solid #eee;
    position: fixed;
    top: 0;
    z-index: 1000000;
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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        img{
            width: 0.4rem;
            height: 0.4rem;
        }
    }
}

.aboutUP-wrap{
    width: 7.5rem;
    background: #fff;
}
/*UP简介*/
.up-introduce{
    width: 7.1rem;
    padding-left:.2rem;
    padding-right: .2rem;
    dl{
        padding-top: 1rem;
        dt{
            text-align: center;
            .upLogo{
                display: inline-block;
                width: 3.12rem;
                height: .98rem;
                margin: 1rem 0px .5rem;
            }
        }
        dd{
            /*margin-top: .2rem;*/
            margin-bottom: .2rem;
            p{
                /*text-indent: 2em;*/
                font-size: .28rem;
                color: #888;
                line-height: .44rem;
                text-align: justify;
            }
        }
    }
    ul{
        li{
            width: 6.87rem;
            font-size: .28rem;
            color: #333;
            line-height: .44rem;
            span{
                width: 1.2rem;
                display: inline-block;
                font-weight: 600;
                text-align:justify;
                text-align-last:justify;
                text-justify:inter-ideograph;/*IE*/
            }
            b{
                display: inline-block;
                margin-left: .1rem;
                margin-right: .1rem;
            }
        }
    }
}

/* 创始人 */
.founder{
    width: 7.1rem;
    padding-left:.2rem;
    padding-right: .2rem;
    margin-top: 1rem;  
    dt{
        text-align: center;
        img{
            width: 2.59rem;
            height: 2.59rem;
        }
        p{
            color: #333;
            font-size: .3rem;
            line-height: 0.5rem;
            font-weight: 500;
        }
    }
    dd{
        margin-top: .1rem;
        h2{
            margin-bottom: .1rem;
            font-size: .3rem;
            color: #888;
        }
        h3{
            font-size: .3rem;
            color: #333;
        }
        p{
            /*text-indent: 2em;*/
            font-size: .28rem;
            color: #888;
            line-height: .44rem;
            text-align: justify;
        }
    }
}

/*公司业务*/
.business{
    width: 7.5rem;
    background: #F7F8FA;
    margin-top: .6rem;
    .businessMain{
        width: 7.1rem;
        padding-left:.2rem;
        padding-right: .2rem;
        padding-bottom: .1rem;
        /*margin-top: .5rem;*/
        b{
            /*width: 1rem;*/
            display: block;
            height: .001rem;
            /*background: red;*/
        }
        dl{
            dt{
                margin: .1rem 0;
                .span1{
                    img{
                        width: .3rem;
                        height: .3rem;
                        margin-right: .02rem;
                    }
                }
                .span2{
                    font-size: .3rem;
                    position: relative;
                    top: .04rem;
                }
            }
            h4{
                color: #1F2D6F;
                font-size: .28rem;
                font-weight: 600;

            }
            dd{
                p{
                    font-size: .28rem;
                    color: #888;
                    line-height: .44rem;
                    text-align: justify;
                    span{
                        color: #C53127;
                    }
                }
                ul{
                    height: 1rem;
                    .li1{
                        float: left;
                        color: #333;
                        font-size: .28rem;
                        width: 20%;


                    }
                    .li2{
                        float: left;
                        color: #888;
                        font-size: .28rem;
                        line-height: .44rem;
                        width: 80%;

                    }
                }
            }
        }
    }
}

/*公司优势*/
.advantages{
    width: 7.1rem;
    padding-left: .2rem;
    padding-right: .2rem;

    .fine_line{
        margin: .5rem 0 .2rem 0;
        padding-top: .1rem;
        padding-bottom: .3rem;
        border-top: .01rem solid #eee;
        border-bottom: .01rem solid #eee;
    }

    dl{

        i{
            display: block;
            text-align: center;
            img{
                width: 2.56rem;
                height: .92rem;
            }
        }
        h3{
            font-size: .3rem;
            font-weight: 600;
            color: #333;
            text-align: center;
            line-height: 1rem;
        }
        p{
            text-align: justify;
            color: #888;
            font-size: .26rem;
            line-height: .44rem;
            span{
                color: #C53127;
            }
        }

        .img1{
            width: 1rem;
            height: 1rem;
            margin: .2rem 0;
        }
        .img_zupubao{
            width: 1rem;
            height: 1rem;
            /*margin: .2rem 0;*/
            margin-left: .25rem;
        }
        .img2{
            height: 1.12rem;
            width: 3.72rem;
            margin: .2rem 0;
        }
        .img3{
            height: 1rem;
            width: 2.34rem;
            margin: .2rem 0;
        }
        .liImg1{
            width: 28%;
            float: left;
            img{
                width: 1.8rem;
                height: .6rem;
            }
        }
        .text1{
            width: 72%;
            float: left;
            color: #888;
            p{
                color: #888;
                font-size: .28rem;
                text-align: justify;
                line-height: .44rem;
            }
        }
        .liImg2{
            width: 27%;
            float: left;
            img{
                width: 1.55rem;
                height: .48rem;
                margin-left: .12rem;
            }
        }

        .text2{
            width: 72%;
            float: left;
            p{
                color: #888;
                font-size: .28rem;
                text-align: justify;
                line-height: .44rem;
            }
        }
    }
}

/*发展战略*/
.strategyBox{
    width: 7.5rem;
    background: #F7F8FA;
    /*padding-top: .001rem;*/
    margin-top: .9rem;
    .strategy{
        padding-top: .001rem;
        padding-right: .2rem;
        padding-left: .2rem;
    }
    dl{
        height: .8rem;
        /*background: red;*/
        /*line-height: .8rem;*/
        dt{
            width: 12%;
            float: left;
            img{
                width: .64rem;
                height: .38rem;
            }
        }
        dd{
            width: 88%;
            float: left;
            font-size: .28rem;
            /*line-height: .38rem;*/
            /*margin-top: .1rem;*/

        }
    }
}

/*企业文化*/
.culture{
    width: 7.1rem;
    padding-right: .2rem;
    padding-left: .2rem;
    img{
        width: 7.1rem;
        height: 3.08rem;
    }

}

/*咨询电话*/
.tel-phone{
    text-align: center;
    padding-top: .45rem;
    h6{
        color: #ccc;
        font-size: .28rem;
    }
    p{
        color: #ccc;
        font-size: .28rem;
        padding-top: .1rem;
        padding-bottom: .6rem;
        span{
            margin-left: .1rem;
            margin-right: .1rem;
        }
    }
}

/*标题封装*/
.up-titel{
    width: 7.1rem;
    height: 1.2rem;
    text-align: center;
    margin-top: .8rem;
    /*margin-bottom: .1rem;*/
    h2{
        font-size: .36rem;
        font-weight: 600;
        color: #111;
        /*margin-bottom: .1rem;*/
    }
    i{
        width: 2.67rem;
        height: .02rem;
        background: #ccc;
        display: inline-block;
        position: relative;
        top: -.32rem;
        margin-top: .4rem;
        margin-bottom: .1rem;
    }
    p{
        position: relative;
        top: -.5rem;
        color: #ccc;
        font-size: .2rem;
    }
    .pmgressbar{
        width: 1.2rem;
        height: .08rem;
        line-height: .6rem;
        margin-top: .01rem;
    }
}
.titleNav{
    width: 7.1rem;
    height: .52rem;
    margin-bottom: .2rem;
    img{
        width: 100%;
        height: 100%;
    }
}
li{
    list-style-type: none;
}
/*清除浮动代码*/
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
</style>













