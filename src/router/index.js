import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index.js"

// 一级路由
import NavBar from '@/components/navBar'

//首页
import Home from '@/components/home/home'

//客源
import Source from '@/components/source/source'
import SourceAccess from '@/components/source/sourceAccess'
import SourceThree from '@/components/source/sourceThree'

//我的
import Mine from '@/components/mine/mine'

// 登录
import Login from '@/components/login/login'

// --- 首页 ---
// 选择城市
import CitySelection from '@/components/home/citySelection'
// 资讯频道
import News from '@/components/news/news'
// 资讯详情
import NewsDetails from '@/components/news/newsDetails'
// 地图找房
import MapSeekShop from '@/components/mapSeekShop/mapSeekShop'
// 需求发布
import Publish from '@/components/publish/publish'
// 我的发布
import MyPublish from '@/components/publish/myPublish'
// 发布招商
import PublishCM from '@/components/publish/publishCM'
// 发布销售
import PublishSell from '@/components/publish/publishSell'
// 品牌管理
import BrandManagement from '@/components/brand/brandManagement'
// 我的品牌
import BrandDetails from '@/components/brand/brandDetails'
// 发布品牌
import PublishBrand from '@/components/brand/publishBrand'
// 发布品牌协议
import BrandAgreement from '@/components/brand/brandAgreement'
// 品牌纠错
import BrandCorrect from '@/components/brand/brandCorrect'
// 增加品牌联系人
import AddBrandUser from '@/components/brand/addBrandUser'
//
import BrandSearch from '@/components/brand/brandSearch'

// 个人信息
import PersonInfo from '@/components/mine/personInfo'
// 关于我们
import AboutUs from '@/components/mine/aboutUs'
// 我的消息
import Message from '@/components/message/message'
// 消息详情
import MessageInfo from '@/components/message/messageInfo'
// 我的关注
import Concern from '@/components/concern/concern'
// 需求管理
import DemandManagement from '@/components/demand/demandManagement'
// 需求详细
import DemandDetails from '@/components/demand/demandDetails'
// 上传身份证
import IdCard from '@/components/idCard/idCard'
// 上传身份证说明
import IdCardExplain from '@/components/idCard/idCardExplain'
// 上传营业执照
import BusinessLicense from '@/components/idCard/businessLicense'
// 上传营业执照认证说明
import BusinessLicenseExplain from '@/components/idCard/businessLicenseExplain'

//会员
import Payment from '@/components/member/payment'
import Order from '@/components/member/order'
import BuyMember from '@/components/member/buyMember'
import BuyMemberH5 from '@/components/member/buyMemberH5'
import MyMember from '@/components/member/myMember'

//余额
import Balance from '@/components/money/balance'
import BalanceDetails from '@/components/money/balanceDetails'
import ApplyState from '@/components/money/applyState'
import ClearRules from '@/components/money/clearRules'
import BindCard from '@/components/money/bindCard'
import BindCardMsg from '@/components/money/bindCardMsg'
import ManageCard from '@/components/money/manageCard'

//团队
import MyGroup from '@/components/group/myGroup'
import GroupMember from '@/components/group/groupMember'
import GroupDetail from '@/components/group/groupDetail'

//奖励
import MyAward from '@/components/award/myAward'
import AwardExplain from '@/components/award/awardExplain'

//二维码
import GroupTcp from '@/components/code/groupTcp'
import Promotion from '@/components/code/promotion'
import PromotionLogin from '@/components/code/promotionLogin'
import Develop from '@/components/code/develop'
import DevelopLogin from '@/components/code/developLogin'

//招商
import MerchantsList from '@/components/merchants/merchantsList'
import MerchantsDetail from '@/components/merchants/merchantsDetail'

// 销售
import SellList from '@/components/sell/sellList'
import SellDetail from '@/components/sell/sellDetail'

//地图
import ShopMap from '@/components/shopMap/shopMap'

//搜索
import ShopSearch from '@/components/Search/shopSearch'
import SourceSearch from '@/components/Search/sourceSearch'
import IndexSearch from '@/components/Search/indexSearch'

//客户报备
import WriteReport from '@/components/report/writeReport'
import SelectReport from '@/components/report/selectReport'
import ClientEntering from '@/components/report/clientEntering'

//八月新品
import NewProduct from '@/components/home/newProduct'
import MakeAbargain from '@/components/home/makeAbargain'

// 广告页
import Banner1 from '@/components/banner/banner1'
import Banner2 from '@/components/banner/banner2'

Vue.use(Router)

const router =  new Router({
  // base: "/",
  mode: "history",
  scrollBehavior: ()=>({y:0}),//路由切换以后返回到顶部
  routes: [

    {path: '*',name:'navBar',redirect: "/home",component: NavBar,
        children:[
          {path: '/home',component: Home},
          {path: '/source',component: Source},
          {path: '/mine',component: Mine}
        ]
    },
    //会员模块
    {path: '/payment',component: Payment},
    {path: '/order',component: Order},
    {path: '/buymember',component: BuyMember},
    {path: '/buymemberH5',component: BuyMemberH5},
    {path: '/mymember',component: MyMember},
    //余额模块
    {path: '/balance',component: Balance,},
    {path: '/balanceDetails',component: BalanceDetails},
    {path: '/applyState',component: ApplyState},
    {path: '/clearRules',component: ClearRules},
    {path: '/bindCard',component: BindCard},
    {path: '/bindCardMsg',component: BindCardMsg},
    {path: '/manageCard',component: ManageCard},
    //团队模块
    {path: '/myGroup',component: MyGroup},
    {path: '/groupMember',component: GroupMember},
    {path: '/groupDetail',component: GroupDetail},
    //我的奖励
    {path: '/myAward',component: MyAward},
    {path: '/awardExplain',component: AwardExplain},
    //二维码页面
    {path: '/groupTcp',component: GroupTcp},
    {path: '/promotion',component: Promotion},
    {path: '/promotionLogin',component: PromotionLogin},
    {path: '/develop',component: Develop},
    {path: '/developLogin',component: DevelopLogin},
    //招商
    {path: '/merchantsList',component: MerchantsList,meta:{keepAlive: true}},
    {path: '/merchantsDetail',component: MerchantsDetail},
    //销售
    {path: '/sellList',component: SellList,meta:{keepAlive: true}},
    {path: '/sellDetail',component: SellDetail},
    //客户报备
    {path: '/writeReport',component: WriteReport},
    {path: '/selectReport',component: SelectReport},
    {path: '/clientEntering',component: ClientEntering},
    //地图
    {path: '/shopMap',component: ShopMap},
    //搜索
    {path: '/shopSearch',component: ShopSearch},
    {path: '/sourceSearch',component: SourceSearch},
    {path: '/indexSearch',component: IndexSearch},
    //八月新品,成交前十
    {path: '/newProduct',component: NewProduct},
    {path: '/makeAbargain',component: MakeAbargain},
    //客源
    {path: '/sourceAccess',component: SourceAccess},
    {path: '/sourceThree',component: SourceThree},

    //田蕊慈
    // 登录
    {path: '/login',component: Login},
    // 首页
    {path: '/news',component: News},
    {path: '/newsDetails',component: NewsDetails},
    {path: '/citySelection',component: CitySelection},
    {path: '/mapSeekShop',component: MapSeekShop},
    {path: '/publish',component: Publish},
    {path: '/myPublish',component: MyPublish},
    {path: '/publishCM',component: PublishCM},
    {path: '/publishSell',component: PublishSell},
    {path: '/brandManagement',component: BrandManagement},
    {path: '/brandDetails',component: BrandDetails},
    {path: '/PublishBrand',component: PublishBrand},
    {path: '/brandAgreement',component: BrandAgreement},
    {path: '/brandCorrect',component: BrandCorrect},
    {path: '/addBrandUser',component: AddBrandUser},
    {path: '/brandSearch',component: BrandSearch},
    // 我的
    {path: '/personInfo',component: PersonInfo},
    {path: '/payment',component: Payment},
    {path: '/message',component: Message},
    {path: '/messageInfo',component: MessageInfo},
    {path: '/concern',component: Concern},
    {path: '/demandManagement',component: DemandManagement},
    {path: '/demandDetails',component: DemandDetails},
    {path: '/aboutUs',component: AboutUs},
    {path: '/idCard',component: IdCard},
    {path: '/idCardExplain',component: IdCardExplain},
    {path: '/businessLicense',component: BusinessLicense},
    {path: '/businessLicenseExplain',component: BusinessLicenseExplain},
    // 广告页
    {path: '/banner1',component: Banner1},
    {path: '/banner2',component: Banner2},
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = Number(localStorage.scrollTop);
      }
      return { x: 0, y: to.meta.savedPosition || 0}
    }
  }
})

export default router;
