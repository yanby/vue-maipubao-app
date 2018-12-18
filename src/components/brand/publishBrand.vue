<template>
    <div class="publishBrand">
        <div class="nav clearfix">
            <img class="navBack fl" src="../../../static/images/common/back.png" alt="" @click="navBack()">
            <h2 class="navTitle fl">发布品牌</h2>
        </div>
        <div class="publishBrandTop">
            <div class="brandLogo">
                <p><i>*</i>品牌LOGO：</p>
                <span class="uploadLogo">
                    <img :src="imgDataUrl">
                    <input type="file" accept="image/*" name="file_head" class="uploadLogoImg" @change="uploadImgLogo($event)"/>
                </span>   
            </div>
            <ul>
                <li class="firstLi">
                    <p><i>*</i>品牌名称：</p>
                    <input type="" name="" class="login_tel" placeholder="请输入品牌名称" v-model="brandName" @blur.prevent="blurFn()" maxlength="15">
                </li>
                <li>
                    <p><i></i>品牌业态：</p>
                    <span @click="showBrandTypeWrap = true">{{typePulldownTxt}}</span><b></b>
                </li>
                <li>
                    <p><i></i>品牌定位：</p>
                    <span @click="showBrandPosition = true">{{brandOrientationTxt}}</span><b></b>
                </li>
                <li class="lastLi">
                    <p><i></i>拓展区域：</p>
                    <span class="areaTxtWidth" @click="areaResponsible1">{{areaTxtStr1}}</span><b></b>
                </li>               
            </ul>
        </div>

        <div class="publishBrandTop">
            <ul>
                <li>
                    <p><i>*</i>联系电话：</p>
                    <input type="tel" name="" class="login_code" v-model="userTel" placeholder="请输入联系人电话" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11">
                </li>
                <li>
                    <p><i>*</i>联系人姓名：</p>
                    <input type="" name="" class="login_code" v-model="userName" placeholder="请输入联系人姓名" maxlength="10">
                </li>
                <li>
                    <p><i>*</i>职&emsp;&emsp;位：</p>
                    <span class="postSpanWidth" @click="showPostListWrap = true">{{postTxt}}</span><b></b>
                </li>
                <li class="lastLi">
                    <p><i>*</i>负责区域：</p>
                    <span class="areaTxtWidth" @click="areaResponsible2()">{{areaTxtStr2}}</span><b></b>
                </li>
            </ul>
            <h4 v-if="showAddUserBtn"><span @click="addUserBtn">增加联系人信息<img src="../../../static/images/brand/addUser.png"></span></h4>
        </div>

        <div class="addUser" v-if="showAddUser">
            <ul>
                <li>
                    <p><i>*</i>联系电话：</p>
                    <input type="tel" name="" class="login_code" v-model="userTel2" placeholder="请输入联系人电话" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11">
                    <img src="../../../static/images/brand/redClose.png" class="redClose" @click="redClose">
                </li>
                <li>
                    <p><i>*</i>联系人姓名：</p>
                    <input type="" name="" class="login_code" v-model="userName2" placeholder="请输入联系人姓名" maxlength="10">
                </li>
                <li>
                    <p><i>*</i>职&emsp;&emsp;位：</p>
                    <span @click="showPostListWrap2 = true">{{postTxt2}}</span><b></b>
                </li>
                <li class="lastLi">
                    <p><i>*</i>负责区域：</p>
                    <span class="areaTxtWidth" @click="areaResponsible3()">{{areaTxtStr3}}</span><b></b>
                </li>
            </ul>
        </div>
        
        <!-- 提交审核 -->
        <div class="submitBox">
            <dl>
                <!-- <dt><img src="../../../static/images/mine/round.png"></dt> -->
                <!-- <dt><img src="../../../static/images/mine/selected.png"></dt> -->

                <dt @click="selectBtn = true" v-if="selectBtn==false"><img src="../../../static/images/mine/round.png"></dt>
                <dt @click="selectBtn = false" v-else><img src="../../../static/images/mine/selected.png"></dt>
                <dd>我已阅读并同意《<span @click="agreemenBtn()">需求发布协议</span>》</dd>
            </dl>
            <p class="submitbtn" @click="submitbtn">确认发布</p>      
        </div>   

        <!-- 品牌业态 -->
        <div class="brandTypeWrap" v-if="showBrandTypeWrap">
            <div class="brandLeaderArea" @click.stop>
                <h3><p @click="showBrandTypeWrap = false">取消</p>请选择品牌业态</h3>
                <ul>
                    <li class="li1" v-for="(item,index) in brandTypeArr">
                        <!-- <span @click="brandTypeBtn(item,item.id)">{{item.businessName}}</span> -->
                        <span @click="brandTypeBtn(item.id,index,item)" :class="{cityTxtColor:brandTypeChangeColor == index}">{{item.businessName}}</span>
                        <ol>
                            <!-- <li v-for="(item1,index1) in brandTypeChildArr.levelTwoList" @click="brandTypeChildBtn(item1.id)">{{item1.businessName}}</li> -->
                            <li v-for="(item1,index1) in brandTypeChildArr.levelTwoList" :class="{areaTxtColor2:brandTypeChangeColor2 == index1}" @click="brandTypeChildBtn(item1.id,item1.p_id,index1,item1.businessName)">{{item1.businessName}}</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 品牌定位 -->
        <div class="expandAreaWrap" v-if="showBrandPosition">
            <div class="expandArea" @click.stop>
                <h3><p @click="showBrandPosition = false">取消</p>请选择品牌定位</h3>
                <ul>
                    <li v-for="(item,index) in brandPositionArr">
                        <span :class="{changeBlue:showChangeBlue == index}" @click="brandPositionBtn(item.d_value,index,item.d_name)">{{item.d_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 品牌拓展区域 -->
        <div class="expandAreaWrap" v-if="showExpandAreaWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="showExpandAreaWrap = false">取消</p>请选择品牌拓展区域<h5 @click="areaDefine1">确定</h5></h3>
                <ul>
                    <li v-for="item in expandAreasArr">
                        <span @click.stop="expandAreasBtn($event,item.regions_id,item.id,item.area_name)">{{item.area_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 请选择职位1 -->
        <div class="expandAreaWrap postListWrap" v-if="showPostListWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="showPostListWrap = false">取消</p>请选择职位</h3>
                <ul>
                    <li v-for="(item,index) in postListArr">
                        <span :class="{changeBlue:showPostChangeBlue == index}" @click="postListBtn(item.d_value,index,item.d_name)">{{item.d_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 负责人拓展区域 -->
        <div class="expandAreaWrap" v-if="showPostExpandAreaWrap">
            <div class="expandArea" @click.stop>
                <h3><p @click="showPostExpandAreaWrap = false">取消</p>请选择品牌拓展区域<h5 @click="areaDefine2()">确定</h5></h3>
                <ul>
                    <li v-for="(item,index) in expandAreasArr1">
                        <span @click.stop="postExpandAreasBtn1($event,item.regions_id,item.id,item.area_name)">{{item.area_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 请选择职位2 -->
        <div class="expandAreaWrap postListWrap" v-if="showPostListWrap2">
            <div class="expandArea" @click.stop>
                <h3><p @click="showPostListWrap2 = false">取消</p>请选择职位</h3>
                <ul>
                    <li v-for="(item,index) in postListArr2">
                        <span :class="{changeBlue:showPostChangeBlue2 == index}" @click="postListBtn2(item.d_value,index,item.d_name)">{{item.d_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 负责人拓展区域2 -->
        <div class="expandAreaWrap" v-if="showPostExpandAreaWrap2">
            <div class="expandArea" @click.stop>
                <h3><p @click="showPostExpandAreaWrap2 = false">取消</p>请选择品牌拓展区域<h5 @click="areaDefine3()">确定</h5></h3>
                <ul>
                    <li v-for="item in expandAreasArr2">
                        <span @click.stop="postExpandAreasBtn2($event,item.regions_id,item.id,item.area_name)">{{item.area_name}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 弹窗提示 -->
        <div class="promptWrap" v-if="showPromptWrap">
            <div class="promptBox">
                <p>确定要取消发布吗？</p>
                <ul>
                    <li class="li1" @click="goPublishCancel()">取消</li>
                    <li class="li2" @click="goPublish()">确定</li>
                </ul>
            </div>
        </div>

        <!-- 协议 -->
        <div class="protocolsWrap" v-if="protocolsWrap">
            <div class="protocolsBoxWrap">
                <img src="../../../static/images/publish/blueClose.png" class="blueCloseImg" @click="agreementClose()">
                <div class="protocolsBox">
                    <!-- <h3>需求发布协议</h3> -->
                    <!-- <p v-html="agreementInfo"></p> -->
                    <p v-html="agreementInfo"></p>
                </div>
            </div>
        </div>

    </div>
</template> 
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import $ from '../../../static/js/jquery.min.js';
import axios from 'axios';
import qs from 'qs';
import { Indicator } from 'mint-ui';
export default {
name: "publishBrand",
    data () {
        return {
            sessionCityId: "110100",  // 全局城市Id
            sessionProvinceId: "110000", // 全局省Id
            // oss
            host: "",
            policy: "",
            signature: "",
            accessid: "",
            dir: "",
            expire: "",
            callback: "",  

            typeUrl: "", // 返回按钮跳转链接             
            brandName: '', // 品牌名称                    
                  
            imgDataUrl: '../../../static/images/brand/uploadPhoto.png', 
            imgUrl: "",
            isImgShow: "0",

            // 品牌定位
            brandOrientationTxt: "请选择品牌定位", // 品牌定位
            brandPositionArr: [], // 品牌拓展区域
            showBrandPosition: false, // 是否出现品牌定位下拉
            brandPositionId: "",
            showChangeBlue: 0, 
            brandTypeChildArr2: {
                levelTwoList: [{
                    businessName: "美食广场",
                    id: "27",
                    p_id: "26",
                },{
                    businessName: "中餐",
                    id: "28",
                    p_id: "26",
                },{
                    businessName: "快餐",
                    id: "29",
                    p_id: "26",
                },{
                    businessName: "特色餐饮",
                    id: "30",
                    p_id: "26",
                },{
                    businessName: "自助餐",
                    id: "31",
                    p_id: "26",
                },{
                    businessName: "甜品|软饮",
                    id: "32",
                    p_id: "26",
                },{
                    businessName: "面包糕点",
                    id: "33",
                    p_id: "26",
                },{
                    businessName: "休闲|轻餐|咖啡",
                    id: "34",
                    p_id: "26",
                },{
                    businessName: "异国美食",
                    id: "35",
                    p_id: "26",
                },{
                    businessName: "食品专卖",
                    id: "36",
                    p_id: "26",
                },{
                    businessName: "火锅烧烤",
                    id: "37",
                    p_id: "26",
                },{
                    businessName: "小吃零食",
                    id: "38",
                    p_id: "26",
                }]
            },
            
            // 品牌业态
            brandTypeArr: [],   // 品牌业态      
            brandTypeChildArr: [], // 品牌业态二级菜单
            showBrandTypeWrap: false, // 是否出现品牌业态下拉
            brandTypeId: "",
            brandTypeChildId: "",
            typePulldownTxt: "请选择品牌业态", // 品牌业态
            brandTypeChangeColor: 0,
            brandTypeChangeColor2: 0,    

            // 拓展区域
            areaArr: [], 
            strAreaId: "", //拓展区域id
            expandAreasArr: [],  // 品牌拓展区域下拉  
            showExpandAreaWrap: false,  // 是否出现品牌拓展区域下拉
            expandAreasId: [],   
            areaTxtArr1: [],
            areaTxt1: "",
            areaTxtId1: "",
            areaTxtStr1: "请选择拓展区域",

            showAddUserBtn: true, // 增加显示联系人信息
            showAddUser: false, // 是否显示新增联系人
            
            // 联系人1
            userTel: '', // 联系电话(1)
            userName: '', // 联系人姓名(1)
            // 职位
            postListArr: [],
            showPostListWrap: false,
            postListId: "",
            showPostExpandAreaWrap: false,
            showPostChangeBlue: 0,
            postTxt: "请选择职位",
            // 负责区域
            expandAreasArr1: [],
            areaArr2: [], 
            strAreaId2: "", //拓展区域id
            expandAreasArr2: [],  // 品牌拓展区域下拉  
            showExpandAreaWrap2: false,  // 是否出现品牌拓展区域下拉
            expandAreasId2: [],
            areaTxtArr2: [],
            areaTxt2: "",
            areaTxtId2: "",
            areaTxtStr2: "请选择负责区域",

            // 联系人2
            // 职位
            postListArr2: [],
            showPostListWrap2: false, 
            showPostChangeBlue2: 0,
            postTxt2: "请选择职位",
            postListId2: "",
            userTel2: '', // 联系电话(2)
            userName2: '', // 联系人姓名(2)

            // 负责区域2
            expandAreasArr2: [],
            areaArr3: [], 
            strAreaId3: "", //拓展区域id
            expandAreasArr3: [],  // 品牌拓展区域下拉  
            showExpandAreaWrap3: false,  // 是否出现品牌拓展区域下拉
            expandAreasId3: [],
            showPostExpandAreaWrap2: false, // 区域
            areaTxtArr3: [],
            areaTxt3: "",
            areaTxtId3: "",
            areaTxtStr3: "请选择负责区域",

            // 弹窗
            showPromptWrap: false, // 提示弹窗 

            fileImg: "", 

            // 协议
            protocolsWrap: false,
            selectBtn: true, 

            // 协议内容
            agreementInfo: ""
           
        }
    },
    computed:{

    },
    watch:{
　　　　　　　　
　　},
    methods:{
        // 点击返回按钮
        navBack(){  
            $('body').css({
             "overflow": "hidden",
            })
            $('html').css({
             "overflow": "hidden",
            })    
            this.showPromptWrap = true;     
        },
        goPublish(){
            $('body').css({
                "overflow": ""
            })
            $('html').css({
                "overflow": ""
            })
            if(this.typeUrl == 'brandDetails'){
                this.$router.push({path: "/brandDetails"});  
            }else if(this.typeUrl == 'publish'){
                this.$router.push({path: "/publish"}); 
            }else{
                this.$router.push({path: "/brandManagement"}); 
            }
        },
        goPublishCancel(){
            $('body').css({
                "overflow": ""
            })
            $('html').css({
                "overflow": ""
            })
            this.showPromptWrap = false;
        },

        // 点击增加联系人信息
        addUserBtn(){
            this.showAddUserBtn = false;
            this.showAddUser = true;
        },
        // 点击红色删除按钮
        redClose(){
            this.userTel2 = ""; //联系人2手机号
            this.userName2 = "";//联系人2姓名
            this.postTxt2 = "请选择职位";
            this.postListId2 = ""; //岗位ID
            this.areaTxtId3 = ""; //【管理区域】
            this.areaTxtArr3 = [];
            this.areaTxt3 = "";
            this.areaTxtStr3 = "请选择拓展区域";

            this.showAddUserBtn = true;
            this.showAddUser = false;
        },
        // 提交审核
        submitbtn(){
            let _this = this;
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(this.showAddUser == false){
                if(this.brandName == '' || _this.isImgShow == "0" || this.userTel == '' || this.userName == '' || this.postListId == '' || this.areaTxtId2 == ''){
                    Toast({
                        message: '请输入必填项内容',
                        duration: 3000
                    });
                }else if(!reg.test(this.userTel)){
                    Toast({
                        message: '请输入正确的手机号',
                        duration: 3000
                    });
                }else if(this.selectBtn == false){
                    Toast({
                        message: '请同意需求发布协议',
                        duration: 3000
                    });
                }else{
                    Indicator.open({
                        text: '上传中...',
                        spinnerType: 'fading-circle'
                    });
                    _this.upImg();
                }
            }else if(this.showAddUser == true){
                if(this.brandName == '' || _this.isImgShow == "0" || this.userTel == '' || this.userName == '' || this.postListId == '' || 
                    this.areaTxtId2 == ''|| this.userTel2 == '' || this.userName2 == '' || this.postListId2 == '' || this.areaTxtId3 == ''){
                    Toast({
                        message: '请输入必填项内容',
                        duration: 3000
                    });
                }else if(!reg.test(this.userTel)){
                    Toast({
                        message: '请输入正确的手机号',
                        duration: 3000
                    });
                }else if(!reg.test(this.userTel2)){
                    Toast({
                        message: '请输入正确的手机号',
                        duration: 3000
                    });
                }else if(this.selectBtn == false){
                    Toast({
                        message: '请同意需求发布协议',
                        duration: 3000
                    });
                }else{
                    Indicator.open({
                        text: '上传中...',
                        spinnerType: 'fading-circle'
                    });
                    _this.upImg();
                }               
            }
        },

        //当选择完成图片之后调用
        uploadImgLogo(event){
            //1. 拿到fileinput里面的文件, 这个file是一个file对象， file对象不能直接展示的
            let _this = this;
            
            var file = event.target.files[0];
            this.fileImg = file;
            // console.log(file);
     
            //2. 读取文件，成功img标签可以直接使用的格式
            //FileReader类就是专门用来读文件的
            var reader = new FileReader();
     
            //3. 开始读文件
            //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串， 这个字符串可以直接作用img标签的图片资源使用
     
            reader.readAsDataURL(file);
     
            //4. 因为文件读取是一个耗时操作， 所以它在回调函数中，才能够拿到读取的结果
            reader.onload = function() {
                // console.log(reader.result);
                //直接使用读取的结果
                _this.imgDataUrl = reader.result;
                // console.log("图片预览");
                // console.log(_this.imgDataUrl);
                _this.isImgShow = "1";
            }
            this.imgDataUrl = file;
        },
        upImg(){
            let _this = this;
            var ossData = new FormData();
            ossData.append('OSSAccessKeyId', _this.accessid);
            ossData.append('policy', _this.policy);
            ossData.append('Signature', _this.signature);
            ossData.append('key', _this.dir + _this.random_string(32));
            ossData.append('success_action_status', 200); // 指定返回的状态码
            ossData.append("callback", _this.callback);
            ossData.append("file", this.fileImg);
            this.$http.post(this.host, ossData, { headers: {"Content-Type": "multipart/form-data"}})
            .then(ret => {
                // console.log(ret);
                // console.log(this.host+"/"+ret.data.fileName);
                _this.imgUrl = ret.data.fileName;   
                _this.upData();            
            }).catch(err => {
                console.log(err)
            }); 
        },
        upData(){
            // 品牌列表         
            let url = this.changeData() + '/brand/auth/brandReleased'
            let data = {
                "provinceId": this.sessionProvinceId, //【省ID】
                "cityId": this.sessionCityId, //【市ID】
                "brandName": this.brandName, //【品牌名称】
                "logo": "/" + this.imgUrl, // 品牌Logo
                "brandPositioning": this.brandPositionId, //【品牌定位ID】
                "brandBusiness": this.brandTypeId, //【业态】
                "brandExpandArea": this.areaTxtId1, //【拓展区域】
                "mobile1": this.userTel, // 联系人1手机号
                "userName1": this.userName, // 联系人1姓名
                "post1": this.postListId, //岗位ID
                "brandContactsArea1": this.areaTxtId2, //【管理区域】
                "mobile2": this.userTel2, //联系人2手机号
                "userName2": this.userName2, //联系人2姓名
                "post2": this.postListId2, //岗位ID
                "brandContactsArea2": this.areaTxtId3 //【管理区域】
            }
            let obj = qs.stringify(data);
            axios(url,{
                method: 'post',
                data: obj
            }).then(data => {
                // console.log(data);
                if(data.data.code == "101"){
                    Indicator.close();
                    Toast({
                        message: '发布成功',
                        duration: 3000
                    });
                    this.$router.push({path: "/myPublish"}); 
                }else if(data.data.code == "102"){
                    Indicator.close();
                    Toast({
                        message: data.data.message,
                        duration: 3000
                    });
                }
            }).catch(err => {
                console.log(err)
            });
        },

        // 选择品牌业态
        brandTypeBtn(id,index,item){
            this.brandTypeChildArr = item;
            this.brandTypeChangeColor = index; 
            this.brandTypeChangeColor2 = "";
        },
        brandTypeChildBtn(id,brandTypeParentId,index,name){
            var str = brandTypeParentId + "-" + id;
            this.brandTypeChangeColor2 = index; 
            this.brandTypeId = str; // 业态ID
            this.showBrandTypeWrap = false;
            this.typePulldownTxt = name; 
            // console.log(this.brandTypeId);
            // console.log(this.typePulldownTxt);
        },

        // 选择品牌定位
        brandPositionBtn(id,index,name){
            // console.log(id);
            this.brandPositionId = id;
            this.showChangeBlue = index;
            this.brandOrientationTxt = name;
            this.showBrandPosition = false;
        },
       
        // 拓展区域
        expandAreasBtn(e,regionsId,id,name){
            if(e.target.className.indexOf("changeColor") == -1) {
                e.target.className = "spanColor changeColor"; //切换按钮样式
                var str = regionsId+"-"+id;
                this.areaArr.push(str);
                this.strAreaId = this.areaArr.join(";");
                // console.log(this.strAreaId);
                // cityName
                var areaName = name;
                this.areaTxtArr1.push(areaName);
                this.areaTxt1 = this.areaTxtArr1.join("、");
                // console.log(this.areaTxt1);
            }else{
                e.target.className = "spanColor";//切换按钮样式
                //写逻辑
                var str = regionsId+"-"+id;
                var array = this.areaArr;
                var index = array.indexOf(str);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.areaArr = array;
                this.strAreaId = this.areaArr.join(";");
                // console.log(this.strAreaId);

                // cityName 
                var areaName = name;
                var areaNameArray = this.areaTxtArr1;
                var areaNameIndex = areaNameArray.indexOf(areaName);
                // console.log(areaNameIndex);
                if (areaNameIndex > -1) {
                    areaNameArray.splice(areaNameIndex, 1);
                }
                this.areaTxtArr1 = areaNameArray;
                // console.log(this.areaTxtArr1);
                this.areaTxt1 = this.areaTxtArr1.join("、");
                // console.log(this.areaTxt1);
            }
        },
        // 点击拓展区域
        areaResponsible1(){
            this.areaArr = [],
            this.strAreaId = "",
            this.areaTxt1 = "",
            this.areaTxtArr1 = [],
            this.showExpandAreaWrap = true;
        },
        // 拓展区域确定按钮
        areaDefine1(){
            if(this.areaTxt1 == ""){
                this.areaTxtStr1 = "请选择拓展区域";
            }else{
                this.areaTxtStr1 = this.areaTxt1;
                this.areaTxtId1 = this.strAreaId;
                // console.log(this.areaTxtStr1);
                // console.log(this.areaTxtId1);
            }   
            this.showExpandAreaWrap = false;   
        },

        // 职位
        postListBtn(id,index,name){
            // console.log(id);
            this.postListId = id;
            // console.log(this.postListId);
            this.showPostChangeBlue = index;
            this.showPostListWrap = false;
            this.postTxtShow = false;
            this.postTxt = name;
        },
        // 职位2
        postListBtn2(id,index,name){
            this.postListId2 = id;
            // console.log(this.postListId2);
            this.showPostChangeBlue2 = index;
            this.showPostListWrap2 = false;
            this.postTxt2 = name;
        },

        // 添加联系人1区域
        postExpandAreasBtn1(e,regionsId,id,name){
            if(e.target.className.indexOf("changeColor") == -1) {
                e.target.className = "spanColor changeColor"; //切换按钮样式
                var str = regionsId+"-"+id;
                this.areaArr2.push(str);
                this.strAreaId2 = this.areaArr2.join(";");
                // console.log(this.strAreaId2);
                // cityName
                var areaName = name;
                this.areaTxtArr2.push(areaName);
                this.areaTxt2 = this.areaTxtArr2.join("、");
                // console.log(this.areaTxt2);
            }else{
                e.target.className = "spanColor";//切换按钮样式
                //写逻辑
                var str = regionsId+"-"+id;
                var array = this.areaArr2;
                var index = array.indexOf(str);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.areaArr2 = array;
                this.strAreaId2 = this.areaArr2.join(";");
                console.log(this.strAreaId2);
                // cityName 
                var areaName = name;
                var areaNameArray = this.areaTxtArr2;
                var areaNameIndex = areaNameArray.indexOf(areaName);
                console.log(areaNameIndex);
                if (areaNameIndex > -1) {
                    areaNameArray.splice(areaNameIndex, 1);
                }
                this.areaTxtArr2 = areaNameArray;
                // console.log(this.areaTxtArr2);
                this.areaTxt2 = this.areaTxtArr2.join("、");
                // console.log(this.areaTxt2);
            }
        },
        // 点击负责区域（第一个联系人）
        areaResponsible2(){
            this.areaArr2 = [],
            this.strAreaId2 = "",
            this.areaTxt2 = "",
            this.areaTxtArr2 = [],
            this.showPostExpandAreaWrap = true;
        },
        // 拓展区域确定按钮
        areaDefine2(){
            if(this.areaTxt2 == ""){
                this.areaTxtStr2 = "请选择负责区域";
            }else{
                this.areaTxtStr2 = this.areaTxt2;
                this.areaTxtId2 = this.strAreaId2;
                // console.log(this.areaTxtStr2);
                // console.log(this.areaTxtId2);
            }   
            this.showPostExpandAreaWrap = false;   
        },

        // 添加联系人2区域
        postExpandAreasBtn2(e,regionsId,id,name){
            if(e.target.className.indexOf("changeColor") == -1) {
                e.target.className = "spanColor changeColor"; //切换按钮样式
                var str = regionsId+"-"+id;
                this.areaArr3.push(str);
                this.strAreaId3 = this.areaArr3.join(";");
                // console.log(this.strAreaId3);
                // cityName
                var areaName = name;
                this.areaTxtArr3.push(areaName);
                this.areaTxt3 = this.areaTxtArr3.join("、");
                // console.log(this.areaTxt3);
            }else{
                e.target.className = "spanColor";//切换按钮样式
                //写逻辑
                var str = regionsId+"-"+id;
                var array = this.areaArr3;
                var index = array.indexOf(str);
                if (index > -1) {
                    array.splice(index, 1);
                }
                this.areaArr3 = array;
                this.strAreaId3 = this.areaArr3.join(";");
                // console.log(this.strAreaId3);
                // cityName 
                var areaName = name;
                var areaNameArray = this.areaTxtArr3;
                var areaNameIndex = areaNameArray.indexOf(areaName);
                // console.log(areaNameIndex);
                if (areaNameIndex > -1) {
                    areaNameArray.splice(areaNameIndex, 1);
                }
                this.areaTxtArr3 = areaNameArray;
                // console.log(this.areaTxtArr3);
                this.areaTxt3 = this.areaTxtArr3.join("、");
                // console.log(this.areaTxt3);
            }
        },
        // 点击负责区域（第二个联系人）
        areaResponsible3(){
            this.areaArr3 = [],
            this.strAreaId3 = "",
            this.areaTxt3 = "",
            this.areaTxtArr3 = [],
            this.showPostExpandAreaWrap2 = true;
        },
        // 拓展区域确定按钮
        areaDefine3(){
            if(this.areaTxt3 == ""){
                this.areaTxtStr3 = "请选择负责区域";
            }else{
                this.areaTxtStr3 = this.areaTxt3;
                this.areaTxtId3 = this.strAreaId3;
                // console.log(this.areaTxtStr3);
                // console.log(this.areaTxtId3);
            }   
            this.showPostExpandAreaWrap2 = false;   
        },

        random_string(len){
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';   
            var maxPos = chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },

        // 接口调用
        brandListData(){
            let _this = this
            let url = this.changeData() + '/brand/brandReleasedPage'
            axios(url,{
                method: 'post',
            }).then(data => {
                // console.log(data);               
                // 品牌业态
                this.brandTypeArr = data.data.brandBusinessList;
                // 品牌业态第一个子数组
                var brandssssss = data.data.brandBusinessList[0].levelTwoList[1];
                // 需求定位
                this.brandPositionArr = data.data.brandPositioningList;
                // 拓展区域
                this.expandAreasArr = data.data.expandAreaList;
                // 职位
                this.postListArr = data.data.brandPostList;
                // 职位2
                this.postListArr2 = data.data.brandPostList;
                // 负责区域1
                this.expandAreasArr1 = data.data.expandAreaList;
                // 负责区域2
                this.expandAreasArr2 = data.data.expandAreaList;

            }).catch(err => {
                console.log(err)
            });
        },
        ossData(){
            let url = this.changeData() + '/oss/policy'
            axios(url,{
                method: 'post',
                url: url
            }).then(ret => {
                // console.log(ret);
                this.host = ret.data.host;
                this.policy = ret.data.policy;
                this.signature = ret.data.signature;
                this.accessid = ret.data.accessid;
                this.dir = ret.data.dir;
                this.expire = ret.data.expire;
                this.callback = ret.data.callback;
            }).catch(err => {
                console.log(err)
            }); 
        },
        // 获取协议内容
        agreementData(){
            let _this = this
            let url = this.changeData() + '/member/getAgreement'
            axios(url,{
                method: 'post',
                params: {
                    agreementType: "0"
                }
            }).then(data => {
                // console.log(data);
                this.agreementInfo = data.data.data.content;
            }).catch(err => {
                console.log(err)
            });
        },
        // 点击需求发布协议按钮
        agreemenBtn(){
            $('body').css({
             "overflow": "hidden",
            })
            $('html').css({
             "overflow": "hidden",
            })   
            this.protocolsWrap = true; 
        },
        agreementClose(){
            $(".alertGift").addClass('hide');
                $('body').css({
                 "overflow": ""
                })
                $('html').css({
                 "overflow": ""
            })
            this.protocolsWrap  = false
        },
        // 失去焦点
        blurFn(){
            let _this = this
            if(this.brandName != ""){
                let url = this.changeData() + '/brand/auth/valideBrandName'
                axios(url,{
                    method: 'post',
                    params: {
                        brandName: this.brandName
                    }
                }).then(data => {
                    // console.log(data);
                    // this.agreementInfo = data.data.data.content;
                    if(data.data.status == false){
                        // alert(1)
                        Toast({
                            message: '品牌名称已存在',
                            duration: 3000
                        });
                        this.brandName = "";
                    }
                }).catch(err => {
                    console.log(err)
                });
            } 
        }
    },
    mounted() {
           	             
    },
    created() {
        this.sessionCityId = sessionStorage.cityId;
        // console.log(this.sessionCityId);
        this.sessionProvinceId = sessionStorage.provinceId;
        // console.log(this.sessionProvinceId);

        this.userTel = localStorage.iphone;
        // console.log(this.userTel);

        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (urlInfo.indexOf("?") != -1) {
                var str = urlInfo.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //通过url取数
        var request = new Object();
        request = GetRequest();
        this.typeUrl = request['url'];

        this.brandListData();

        this.brandTypeBtn("","0",this.brandTypeChildArr2);

        this.ossData();

        // 获取协议内容
        this.agreementData();

    } 
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "../../../static/css/commonNav.css";
input{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width: 4.8rem;
    background: transparent;
    font-size: .3rem;
    /*光标颜色*/
    /*caret-color: #eaeaea;*/ 
    color: #333;
}
input::-webkit-input-placeholder{
    color: #d3d6dd;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #d3d6dd;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #d3d6dd;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #d3d6dd;
}
.publishBrand{
    width: 7.5rem;
    padding-top: .9rem;
    margin: 0 auto;
}
.publishBrandTop{
    width: 6.9rem;
    background: #fff;
    padding: 0 .3rem 0px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    margin-top: .14rem;
    margin-bottom: .14rem;
    .brandLogo{
        margin-top: .14rem;
        position: relative;
        border-bottom: 1px solid #eaeaea;
        padding-bottom: .26rem;
        padding-top: .5rem;
        i{
           color: #ff5245; 
        }
        p{
            color: #111111;
            font-size: .3rem;
            display: inline;
            float: left;
            margin-right: .2rem;           
        }
        .uploadLogo{
            width: 2.32rem;
            height: 1.74rem;
            position: relative;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            img{
                width: 2.32rem;
                height: 1.74rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            .uploadLogoImg{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0px;
                top: 0px;     
                opacity: 0;          
                img{
                    width: 2.32rem;
                    height: 1.74rem;
                }
            }
        }      
    }
    ul{
        li{
            line-height: .88rem;
            font-size: .3rem;
            border-bottom: 1px solid #eaeaea;
            color: #333;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            p{
                float: left;
                i{
                    display: inline-block;
                    width: .12rem;
                    color: #FF5245;
                }
            }
            input{
                /*position: relative;
                top: -.01rem;*/
                line-height: .4rem;
                font-size: .3rem;
            }
        }
        .lastLi{
            border-bottom: none;
        }
        span{
            display: inline-block;
            height: .6rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;           
        }
        b{
            display: inline-block;
            width:0;
            height:0;
            border-width: .1rem .08rem 0;
            border-style:solid;
            border-color: #111 transparent transparent;
            position:relative;
            top: -.08rem;
            left: .1rem;
        }
    }
    h4{
        font-size: .3rem;
        color: #64abff;
        line-height: .9rem;
        border-top: 1px solid #eaeaea;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        img{
            width: .3rem;
            height: .3rem;
            position: relative;
            left: .1rem;
            top: -.05rem;
        }
    }
}
/*新增联系人*/
.addUser{
    width: 7.5rem;
    margin: .14rem 0;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    ul{
        width: 6.9rem;
        margin-left: .3rem;
        li{
            line-height: .88rem;
            font-size: .3rem;
            border-bottom: 1px solid #eaeaea;
            color: #333;
            p{
                float: left;
                i{
                    color: #FF5245;
                }
            }
            span{
                display: inline-block;
                height: .6rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;  
                }
            input{
                /*position: relative;
                top: -.01rem;*/
                line-height: .4rem;
                font-size: .3rem;
            }
            b{
                display: inline-block;
                width:0;
                height:0;
                border-width: .1rem .08rem 0;
                border-style:solid;
                border-color: #111 transparent transparent;
                position:relative;
                top: -.06rem;
                left: .1rem;
            }
            .redClose{
                width: .34rem;
                height: .34rem;
            }

        }
        .lastLi{
            border-bottom: none;
        }
    }
}
/*提交审核*/
.submitBox{
    width: 7.5rem;
    padding-bottom: .4rem;
    dl{
        height: 1rem;
        padding-top: .35rem;
        dt{
            float: left;
            img{
                width: .4rem;
                height: .4rem;
                margin-left: .3rem;
                margin-right: .2rem;
                margin-top: -.04rem;
            }
        }
        dd{
            float: left;
            color: #333;
            font-size: .3rem;
            span{
                color: #64abff;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            /*.brandAgreementBtn{
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }*/
        }
    }
    .submitbtn{
        width: 6.9rem;
        border-radius: 6px;
        line-height: .9rem;
        text-align: center;
        color: #fff;
        background: #64abff;
        font-size: .34rem;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        margin-left: .3rem;
        margin-bottom: .4rem;
    }
}
/*品牌业态下拉*/
.brandTypeWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 9999999;
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
    .brandLeaderArea{
        width: 7.5rem;
        height: 5.64rem;
        position: absolute;
        bottom: 0;
        background: #fff;
        border-radius: 10px 10px 0 0;
        h3{
            height: .9rem;
            line-height: .3rem;
            color: #333;
            font-size: .3rem;
            text-align: center;
            position: relative;
            line-height: .9rem;
            p{
               position: absolute;
               left: .6rem;
               color: #898989;
            }
        }
        ul{
            height: 4.72rem;
            width: 7.5rem;
            overflow-x: auto;
            border-top: 1px solid #eaeaea;
            .li1{
                height: .9rem;
                width: 3.75rem;
                box-sizing: border-box;
                text-align: center;
                display: block;
                color: #333333;
                font-size: .3rem;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                z-index: 111;
                line-height: .9rem;                         
                span{
                    color: #333333;
                    font-size: .3rem;
                }
                .cityTxtColor{
                    color: #7ab5ff;
                }
                ol{
                    height: 4.72rem;
                    width: 3.75rem;                           
                    position: absolute;
                    left: 3.75rem;
                    /*top: .9rem;  */
                    bottom: 0;
                    z-index: 100000;   
                    overflow-x: auto; 
                    background: #fafafa;                     
                    li{
                        width: 3.75rem;
                        height: .9rem;
                        font-size: .3rem;
                        line-height: .9rem;                        
                        z-index: 100000;  
                    }
                    .areaTxtColor2{
                        color: #7ab5ff;
                    }
                }                   
            }
        }
    }
}
/* 区域下拉 */
.expandAreaWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 999999999;
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
    .expandArea{
        width: 7.5rem;
        height: 5.64rem;
        position: absolute;
        bottom: 0;
        background: #fff;
        h3{
            height: .9rem;
            line-height: .3rem;
            color: #333;
            font-size: .3rem;
            text-align: center;
            position: relative;
            line-height: .9rem;
            border-bottom: 1px solid #eaeaea;
            p{
               position: absolute;
               left: .6rem;
               color: #898989;
            }
            h5{
                position: absolute;
                right: .6rem;
                color: #64abff;
                top: 0;
            }
        }
        ul{
            width: 7.5rem;
            height: 4.74rem;
            background: #fff;
            overflow-x: auto;
            padding-top: .14rem;
            li{
                line-height: .8rem;
                color: #333;
                font-size: .3rem;
                text-align: center;       
                -webkit-tap-highlight-color: rgba(0,0,0,0);        
                span{
                    display: inline-block;
                    line-height: .8rem;
                }
                .changeBlue{
                    color: #7ab5ff;
                }
                .spanColor{
                    display: inline-block;
                    color: #333;
                }
                .changeColor{
                    display: inline-block;
                    color: #64abff;
                }
            }
        }
    }
}
.areaTxtWidth{
    max-width: 3rem;
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
/* 弹窗处理 */
.promptWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999999999999;
    position: fixed;
    top: 0;
    .promptBox{
        width: 6.6rem;
        height: 2.6rem;
        background: #fff;
        position: fixed;
        top: 4.6rem;
        /*left: .45rem;*/
        left: 0px;
        right: 0px;
        margin-left:auto;
        margin-right:auto;
        border-radius: 10px;
        padding-top: .6rem;
        p{
            width: 6rem;
            color: #333;
            font-size: .32rem;
            text-align: center;
            margin: .3rem auto 0;
            line-height: .8rem;
        }
        ul{
            position: absolute;
            bottom: -.02rem;
            li{
                width: 3.3rem;
                font-size: .34rem;
                line-height: .88rem;
                float: left;
                color: #898989;
                text-align: center;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            .li1{
                border-top: 1px solid #eaeaea;
                
            }
            .li2{
                background: #64abff;
                color: #fff;
                border-radius: 0 0 10px 0;
            }
        }
    } 
}
/*协议*/
.protocolsWrap{
    width: 7.5rem;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999999;
    position: fixed;
    top: 0;
    .protocolsBoxWrap{
        width: 5.62rem;
        padding: .3rem .48rem .3rem;
        height: 8.4rem;
        background: #fff;
        position: fixed;
        top: 1.4rem;
        left: .46rem;
        .blueCloseImg{
            width: .38rem;
            height: .38rem;
            position: absolute;
            right: -.1rem;
            top: -.2rem;
        }
        .protocolsBox{
            width: 5.62rem;
            height: 8.4rem;
            overflow-y: scroll;
            /*h3{
                color: #333;
                font-size: .34rem;
                text-align: center;
                margin-bottom: .2rem;
            }*/
            p{
                color: #333;
                font-size: .28rem;
            }
        }
    }
}
</style>
