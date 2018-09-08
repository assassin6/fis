<template>
    <div id='mstoreShow' @mousewheel='pageScroll'>
        <div id="head"></div>
        <div class="mstore-show" id="mstore">
            <!-- 幻灯 -->
            <div class="ms-white-background" id="mstore-banner">
                <mstore-banner ref='mstoreBanner' />
            </div>
            <!-- 标签页 -->
            <div class="mstore-tabs">
                <mstore-classify ref='mstoreClassify' />
                <div class="tab-content ms-mstore-list ms-overflow-hidden ms-width-show">
                    <mstore-show-list ref='mstoreShowList' />
                </div>
            </div>
            <div class="ms-mstore-guide" v-show="guide" style="display: none;">
                <div class="ms-position-relative">
                    <img class="ms-cursor" src="../assets/images/close.png" @click="showGuide" />
                    <p class="ms-mstore-guide-title">MSTORE流程引导</p>
                    <p class="ms-mstore-guide-one">1.下载并启动铭飞系统并登录管理员账号</p>
                    <p class="ms-mstore-guide-two">2.进入后台主界面，点击右上角MSTORE图标</p>
                    <p class="ms-mstore-guide-three">3.输入MS社区账号密码并点击登录</p>
                    <p class="ms-mstore-guide-four">4.模板直接下载、插件在线安装，点击查看模板教程</p>
                </div>
            </div>
            <mstore-hover-button ref='mstoreHoveBanner' />
        </div>
        <div id="footer"></div>
    </div>
</template>
<style lang="less" >
    @import "../assets/less/base.less";
    @import "../assets/less/mstore-classify.less";
    @import "../assets/less/mstore-list.less";
    @import "../assets/less/mstore-banner.less";
    @import "../assets/less/mstore-new-list.less";
</style>
<script>
    import Banner from './Banner'
    import Classify from './Classify'
    import ShowList from './ShowList'
    import HoverButton from './HoverButton'
    export default {
        name: 'Show',
        data() {
            return {
                loading: false, //加载
                guide: false, //显示引导页
            }
        },
        components: {
            'mstore-banner': Banner,
            'mstore-show-list': ShowList,
            'mstore-classify': Classify,
            'mstore-hover-button': HoverButton,
        },
        methods: {
            showGuide: function () {
                this.guide = !this.guide;
                if (this.guide) {
                    document.body.style.overflow = "hidden";
                    $('#mstore-banner').addClass("ms-background-vague");
                    $('.mstore-tabs').addClass("ms-background-vague");
                } else {
                    document.body.style.overflow = "auto";
                    $('#mstore-banner').removeClass("ms-background-vague");
                    $('.mstore-tabs').removeClass("ms-background-vague");
                }

            },
            pageScroll() {
                var currentHeight = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离
                var currentHeightY = $(".mstore-banner").height();
                if (currentHeight >= 400) {
                    $(".ms-top").fadeIn()
                } else {
                    $(".ms-top").fadeOut()
                }
                if (currentHeight >= currentHeightY) { //判断
                    $('.ms-classification').addClass("ms-classift-fixed");
                    if (this.$refs.mstoreClassify.upgraderVersionType == 2) {
                        $('.ms-mstore-list').addClass("ms-model-margin");
                    } else {
                        $('.ms-mstore-list').addClass("ms-plug-margin");
                    }
                } else {
                    $('.ms-classification').removeClass("ms-classift-fixed");
                    if (this.$refs.mstoreClassify.upgraderVersionType == 2) {
                        $('.ms-mstore-list').removeClass("ms-model-margin");
                    } else {
                        $('.ms-mstore-list').removeClass("ms-plug-margin");
                    }
                }
                var scrollHeight = $(document).height();
                var windowHeight = window.innerHeight;
                if (this.$refs.mstoreClassify.pageNo == "no") {
                    return;
                }
                if (!this.$refs.mstoreShowList.loadNum) { return }
                if (Math.abs(parseInt(currentHeight) + windowHeight - scrollHeight) < 3) {
                    if (this.$refs.mstoreShowList.listDownLoadText == "无") {
                        return;
                    }
                    this.$refs.mstoreShowList.loadNum = false;
                    this.$refs.mstoreShowList.listDownLoadText = "正在载入....";
                    this.$refs.mstoreShowList.mstoreListLoad();
                }
            }
        },
        mounted: function () {
            var width = document.body.clientWidth;
            width = Number(Number(width) - Number(1200)) / Number(2);
            width = Number(width) - Number(45);
            if (width > 30) {
                $(".ms-hover-button").css({
                    right: width + "px",
                });
            }
        },
    }
</script>