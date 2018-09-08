<template>
    <div class="user_cententbody ms-user-paddend" id="vue-center">
        <div class="loading-pic" v-show="loading">
        </div>
        <div class="alert alert-info listNone hide-default" role="alert" v-if="List.length == 0" v-show="loading&&listEmpty">
            <p>铭飞MS平台给您提供崭新的开源分享模式，相信开源的力量，快快分享一个。
                <router-link class="label label-primary" @click='share'>立即分享</router-link>
            </p>
            <p>温馨提示：在我们向别人索取的同时，我们应该也要懂得分享，平台才会更美好</p>
        </div>
        <div class="share_list" v-show="!loading" style="display:block">
            <div class="user_cententbodynav">我分享的模板</div>
            <div class="thumbnail myshare_template" v-for="(skin,index) in List" v-if="skin.upgraderVersionType == 2">
                <div class="ms_templatePic">
                    <img class="lazy" :src="baseHost+skin.upgraderVersionImg" onerror='this.src="http://cdn.mingsoft.net/global/images/msheader.png"'
                    />
                    <div class="tipMsg" v-if="skin.upgraderVersionProgress == 0">发布审核中</div>
                    <!--<a class="tipMsg" data-container="body" data-toggle="popover" data-placement="bottom" style="width: 93%;" v-else-if="skin.upgraderVersionProgress == 1" v-on:click="mstoreKey">
                            <span style="font-size: 13px;" :class="{'none':keyt == 'hide'}">{{skin.upgraderVersionKey}}</span>
                            <span :class="{'none':keyt == 'show'}"><i class="icon iconfont icon-logo">&#xe724; </i>申请通过，点击查看mstore-key</span>
                        </a>
                        <div class="tipMsg" v-else-if="skin.upgraderVersionProgress == 2">开发中...</div>-->
                    <div class="tipMsg" v-else-if="skin.upgraderVersionProgress == 3">发布审核中</div>
                    <div class="tipMsg" v-else-if="skin.upgraderVersionProgress == 4">发布成功</div>
                    <a tabindex="0" class="tipMsg" data-trigger="focus" data-toggle="popover" data-placement="bottom" data-content="模板文件结构不符合要求，请按照SDK模板进行开发"
                        v-else="skin.upgraderVersionProgress == 30">
                        <i class="icon iconfont icon-logo">&#xe724; </i>发布审核失败
                    </a>
                </div>
                <div class="priceAndNum">
                    <div style="height: 50px;">
                        <span class="ms_templateTitle" v-text="skin.upgraderVersionName" style="font-size: 14px;
                    color: #333;"></span>
                        <span class="thumbnail_price" v-if="skin.upgraderVersionPrice == 0">免费分享</span>
                        <span class="thumbnail_price" v-else>赞助费：￥{{skin.upgraderVersionPrice}}</span>
                    </div>

                    <a class="btn btn-default" style="width:270px;background-color: #aaa;" disabled="disabled" v-if="skin.upgraderVersionProgress == 0">
                        请耐心等待审核 </a>
                    <!--<a class="btn btn-default down_sdk" :id="skin.upgraderVersionId" style="width:100%;" v-else-if="skin.upgraderVersionProgress == 1" v-on:click="downSdk(skin.upgraderVersionId)"> 下载SDK </a>-->
                    <!--<a class="btn btn-success" :href="'http://mstore.mingsoft.net/people/shareApply.do?id='+skin.upgraderVersionId" style="width:100%;" v-else-if="skin.upgraderVersionProgress == 2">发布</a>-->
                    <a class="btn btn-default" style="width:270px;background-color: #aaa;" disabled="disabled" v-else-if="skin.upgraderVersionProgress == 3">
                        请耐心等待审核 </a>
                    <a @click='upgrader(skin.upgraderVersionId)' class="btn btn-info" style="width:100%;" v-else-if="skin.upgraderVersionProgress == 4">更新版本</a>
                    <!--<a class="btn btn-default" style="width:100%;" v-else-if="skin.upgraderVersionProgress == 10" disabled="disabled"> 申请失败 </a>-->
                    <a class="btn btn-default" style="width:270px;background-color: #aaa;" v-else-if="skin.upgraderVersionProgress == 30" disabled="disabled">
                        发布审核失败 </a>
                </div>

            </div>
            <div class="thumbnail myshare_template" style="margin-right: 0px;">
                <!--<div class="myshare_price">价值源自于分享</div>-->
                <div class="myshare_new">
                    <a href="#" data-toggle="tooltip" data-placement="top" title="立即分享" @click='share(2)'>+</a>
                </div>
            </div>
            <div class="user_cententbodynav">我分享的插件</div>
            <div class="thumbnail myshare_thumbnail" v-for="plug in List" v-if="plug.upgraderVersionType == 1">
                <div class="ms_plugPic">
                    <img class="lazy" :src="baseHost+plug.upgraderVersionImg" onerror='this.src="http://cdn.mingsoft.net/global/images/msheader.png"'>
                    <div class="tipMsg" v-if="plug.upgraderVersionProgress == 0">发布审核中</div>
                    <!--<div class="tipMsg" v-else-if="plug.upgraderVersionProgress == 1">申请通过</div>-->
                    <!--<div class="tipMsg" v-else-if="plug.upgraderVersionProgress == 2">开发中</div>-->
                    <div class="tipMsg" v-else-if="plug.upgraderVersionProgress == 3">发布审核中</div>
                    <div class="tipMsg" v-else-if="plug.upgraderVersionProgress == 4">发布成功</div>
                    <!--<a tabindex="0" class="tipMsg" data-trigger="focus" data-toggle="popover" data-placement="bottom" data-content="企业模板建议免费发布" v-else-if="plug.upgraderVersionProgress == 10"><i class="icon iconfont icon-logo">&#xe724; </i>申请失败</a>-->
                    <a tabindex="0" class="tipMsg" data-trigger="focus" data-toggle="popover" data-placement="bottom" data-content="模板文件结构不符合要求，请按照SDK模板进行开发"
                        v-else>
                        <i class="icon iconfont icon-logo">&#xe724; </i>发布审核失败</a>
                </div>
                <div class="caption">
                    <div class="priceAndNum">
                        <div style="height:50px">
                            <span class="ms_plugTitle" v-text="plug.upgraderVersionName" style="max-width: 150px;" :title="plug.upgraderVersionName"></span>
                            <span class="thumbnail_price" v-if="plug.upgraderVersionPrice == 0">免费分享</span>
                            <span class="thumbnail_price" v-else>赞助费：￥{{plug.upgraderVersionPrice}}</span>
                            <span class="ms_plugDescription" v-text="plug.upgraderVersionDescription" :title='plug.upgraderVersionDescription' style="margin-top:5px;font-size:12px"></span>
                        </div>
                        <button type="button" class="btn btn-default" style="width:270px;background-color: #aaa;color: #fff" disabled="disabled" v-if="plug.upgraderVersionProgress == 0">
                            请耐心等待审核 </button>
                        <!--<a class="btn btn-success" style="width:100%;" v-else-if="plug.upgraderVersionProgress == 2" :href="'http://mstore.mingsoft.net/people/shareApply.do?id='+plug.upgraderVersionId">发布</a>-->
                        <button type="button" class="btn btn-default" style="width:270px;background-color: #aaa;color: #fff" disabled="disabled" v-else-if="plug.upgraderVersionProgress == 3">
                            请耐心等待审核 </button>
                        <a class="btn btn-info" style="width:100%;" v-else-if="plug.upgraderVersionProgress == 4" @click='upgrader(plug.upgraderVersionId)'>更新版本</a>
                        <!--<button type="button" class="btn btn-default" style="width:100%;" v-else-if="plug.upgraderVersionProgress == 10" disabled="disabled"> 申请失败 </button>-->
                        <button type="button" class="btn btn-default" style="width:270px;background-color: #aaa;color: #fff" v-else disabled="disabled"> 发布审核失败 </button>
                    </div>
                </div>
            </div>
            <div class="thumbnail myshare_thumbnail" style="margin-right: 0px;">
                <!--<div class="myshare_price">价值源自于分享</div>-->
                <div class="myshare_new">
                    <a href="#" data-toggle="tooltip" data-placement="top" title="立即分享" @click='share(1)'>+</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../../assets/js/eventBus'
    $(function () {
        /*我要分享的步奏宽度分布*/
        var stepLi = $(".shareSteptxt li").length;
        $(".shareSteptxt li").width(858 / stepLi + "px");
        /*左侧菜单选中样式的添加*/
        var url = window.location.href;
        if (url.indexOf("share") > 0) {
            $(".user_sharemenu").addClass("user_menuOn");
        } else if (url.indexOf("bindEmail") > 0) {
            $(".user_peopleInfoMenu").addClass("user_menuOn");
        } else if (url.indexOf("mcode") > 0) {
            $(".user_mcodeMenu").addClass("user_menuOn");
        }
        // ms.load(["ms", "ms.people"], function (ms, people) {
        // 	//确认是否登录，没有登录则退到首页
        // 	people.checkLoginStatus(function (json) {
        // 		if (!json.result) {
        // 			location.href = ms.base + "/mbbs/main.do";
        // 		}
        // 	});
        // });
    });
    export default {
        name: "peopleShared",
        data() {
            return {
                List: [{
                    "delFlag": null,
                    "updateBy": 0,
                    "upgraderVersionChildType": 0,
                    "upgraderVersionColor": 0,
                    "upgraderVersionDescription": "",
                    "upgraderVersionDownload": 0,
                    "upgraderVersionImg": "",
                    "upgraderVersionIndustry": 0,
                    "upgraderVersionMobileImg": "",
                    "upgraderVersionModelId": 0,
                    "upgraderVersionName": "",
                    "upgraderVersionNo": 0,
                    "upgraderVersionOriginal": 0,
                    "upgraderVersionOriginalRefer": "",
                    "upgraderVersionPeopleIcon": "",
                    "upgraderVersionPeopleId": 0,
                    "upgraderVersionPeopleName": "",
                    "upgraderVersionPrice": 0,
                    "upgraderVersionProgress": 0,
                    "upgraderVersionProgressDatetime": 0,
                    "upgraderVersionProgressTitle": "",
                    "upgraderVersionStart": 0,
                    "upgraderVersionStatus": 0,
                    "upgraderVersionTime": 0,
                    "upgraderVersionType": 0,
                    "upgraderVersionUrl": ""
                }], //插件列表
                //初始数据是为了防止前端报错，在加载数据之前不会报出‘name of undefine’的错误
                listEmpty: false,
                create: false, //插件生成按钮禁用
                projectId: "",
                action: "{ms:global.host/}/people/codeGeneration.do",
                projectUpgraderVersionId: "",
                baseHost: "{ms:global.host/}/", //定义一个基础地址，主要用于加在返回图片地址前
                baseUrl: "{ms:global.url/}/", //定义一个基础地址，主要用于加在返回页面地址前
                keyt: "hide", //显示秘钥
                loading: true, //加载
                base: "http://mstore.mingsoft.net/"
            }
        },
        methods: {
            //插件代码生成
            build: function (id) {
                var _this = event.target;
                var target = this;
                _this.text("跳转中...").attr("disabled", true);
                // mcode.people.mcode.project.get(id, function (json) {
                // 	target.projectId = json.projectId;
                // 	target.projectUpgraderVersionId = json.projectUpgraderVersionId;
                // 	$("#upgraderVersionForm").submit();
                // 	_this.text("在线生成代码").attr("disabled", false);
                // });
            },
            //下载SDK
            downSdk: function (id) {
                var _this = event.target;
                $(_this).hide();
                $("#upgraderVersionForm").attr(
                    "action",
                    this.base + "/people/upgrader/version/" + id + "/sdk.do"
                );
                $("#upgraderVersionForm").submit();
                $(_this).after(
                    '<a class="btn btn-success" href="' +
                    this.base +
                    "/people/shareApply.do?id=" +
                    id +
                    '" style="width:100%;" >发布</a>'
                );
            },
            //显示秘钥
            mstoreKey: function () {
                this.keyt = "show";
            },
            share() {
                this.$router.push('share')
            },
            upgrader(id) {
                this.$router.push('upgrader/' + id)
            }
        },
        beforeMount: function () {
            var target = this;
            this.loading = true;
            mstore.people.people.list(data => {
                if (data.length > 0) {
                    target.List = data;
                    $(".share_list").fadeIn();
                    $('[data-toggle="popover"]').popover();
                } else {
                    $(".listNone").fadeIn();
                }
                target.loading = false;
            })
        },
        mounted() {
            var target = this;
            mstore.people.people.list(data => {
                if (data.length > 0) {
                    target.List = data;
                    $(".share_list").fadeIn();
                    $('[data-toggle="popover"]').popover();
                } else {
                    target.listEmpty = true
                }
                target.loading = false;
            })
        }
    };
</script>
<style scoped type="text/css">
    .thumbnail {
        width: 306px;
        float: left;
        padding: 0px
    }

    .priceAndNum {
        padding: 12px 14px
    }
</style>