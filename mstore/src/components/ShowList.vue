<template>
    <div id="mstore-show-list">
        <div class="ms-loading ms-height" v-show="loading == true"></div>
        <div class="ms-no-data ms-height" style="display: none;" v-show="noData">
            <img src="../assets/images/no-data.png" /> {{error}}
        </div>
        <div class="col-sm-4 col-md-4 ms-overflow-hidden" style="display: none;" v-show="loading == false" v-for="item in list">
            <div class="thumbnail ms-overflow-hidden ms-cursor" @click="showGuide">
                <div class="ms-position-relative">
                    <span class="ms-mobile-images" v-if="item.upgraderVersionMobileImg!=null&&item.upgraderVersionMobileImg!=''" style="background: url(http://mstore.mingsoft.net/templets/86/cms/images/mobile.png) no-repeat;">
                        <div class="ms-mobile-div">
                            <img class="ms-mobile-img ms-model-img" @mouseout="imgMoutY()" @mouseover="imgMoverY()" :src="'http://mstore.mingsoft.net/'+item.upgraderVersionMobileImg"
                            />
                        </div>
                    </span>
                </div>
                <a class="ms-overflow-hidden ms-loading ms-position-relative ms-model-img-container">
                    <img class="ms-model-img" @mouseout="imgMout()" @mouseover="imgMover()" :src="'http://mstore.mingsoft.net/'+item.upgraderVersionImg"
                    />
                </a>
                <div class="ms-model-detail ms-overflow-hidden">
                    <div class="ms-model-title">
                        <span v-text="item.upgraderVersionName"></span>
                    </div>
                    <!--头像和昵称-->
                    <div class="ms-overflow-hidden ms-head">
                        <img class="ms-fl ms-header-icon" :title="item.upgraderVersionPeopleName" v-if="item.upgraderVersionPeopleIcon != 0" :src="item.upgraderVersionPeopleIcon"
                            onerror="this.src='http://cdn.mingsoft.net/global/images/msheader.png'">
                        <img class="ms-fl ms-header-icon" :title="item.upgraderVersionPeopleName" v-else src="http://cdn.mingsoft.net/global/images/msheader.png">
                        <div class="ms-fl mstore-star ms-overflow-hidden">
                            <img v-for="n in item.upgraderVersionStart" src="../assets/images/star.png" />
                            <img v-for="n in (5-item.upgraderVersionStart)" src="../assets/images/star-empty.png" />
                        </div>
                        <span class="ms-fr ms-model-monry" v-if="item.upgraderVersionPrice == 0">免费</span>
                        <span class="ms-fr ms-model-monry" v-else>￥{{item.upgraderVersionPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{'ms-list-down-load-text':listDownLoadText == '无'}" v-show="!noData" class="ms-down-load-div" style="display: none;">
            <i v-show="listDownLoadText =='下滑加载更多....'" class="iconfont">&#xe744;</i>
            <i v-show="listDownLoadText =='已经浏览完了，去看看别的'" class="iconfont">&#xe737;</i>
            <img v-show="listDownLoadText =='正在载入....'" src="http://cdn.mingsoft.net/global/images/loading.gif" />
            <span v-text="listDownLoadText"></span>
        </div>
    </div>
</template>
<script>
    import classification from './Classify'
    //非父子组件之间通信
    import bus from '../assets/js/eventBus.js'
    export default {
        name: 'ShowList',
        data() {
            return {
                loading: true,
                list: new Array(), //列表
                detailId: "", //模板或插件id
                htmlType: "", //模板类型
                error: "", //错误
                noData: "", //无数据
                listDownLoadText: "下滑加载更多....",
                saveList: [],
                loadNum: true,//加载次数限制
            }
        },
        methods: {
            //数据懒加载
            mstoreListLoad: function () {
                bus.$emit('filter', 'load')
                // classification.pageNo += 1;
                // classification.filter('load');
            },
            //图片滚动
            imgMover: function () {
                var _this = event.target;
                var ms_top = ($(_this).height()) - 245;
                if (ms_top < 0) {
                    ms_top = 0;
                }
                $(_this).stop(true);
                if (mstore.guide) {
                    return
                }
                $(_this).animate({
                    "top": -(ms_top)
                }, 2500);
            },
            //图片滚动
            imgMout: function () {
                var _this = event.target;
                $(_this).stop(true);
                if (mstore.guide) {
                    return
                }
                $(_this).animate({
                    "top": 0
                }, 2500);
            },
            //手机图片滚动
            imgMoverY: function () {
                var _this = event.target;
                var ms_top_2 = ($(_this).height()) - 190;
                if (ms_top_2 < 0) {
                    ms_top_2 = 0;
                }
                $(_this).stop(true);
                if (mstore.guide) {
                    return
                }
                $(_this).animate({
                    "top": -(ms_top_2),
                }, 2100);
            },
            //手机图片上滚动
            imgMoutY: function () {
                var _this = event.target;
                $(_this).stop(true);
                if (mstore.guide) {
                    return
                }
                $(_this).animate({
                    "top": 0,
                }, 2100);
            },
            query: function (data, type) {
                if (type == 'first') {
                    this.loading = true;
                }
                var target = this;
                mstore.mstore.list(data, function (json) { //模板列表
                    target.loadNum = true;
                    if (json.list.length > 0) {
                        target.loading = false;
                        if (type == 'first') {
                            target.list = json.list;
                            target.saveList = target.list;
                            target.noData = false;
                        }
                        if (type == 'load') {
                            if (json.total > target.list.length) {
                                target.list = target.saveList.concat(json.list)
                            } else {
                                target.listDownLoadText = "已经浏览完了，去看看别的";
                                classification.pageNo = "no";
                                return;
                            }
                            target.saveList = target.list;
                        }
                    } else {
                        target.noData = true;
                        target.loading = false;
                        target.list = [];
                        if (classification.upgraderVersionType == 1) {
                            target.error = "抱歉，暂无插件";
                        } else {
                            target.error = "抱歉，暂无模板";
                        }
                        return;
                    }
                    target.listDownLoadText = "下滑加载更多....";
                });
            },
            showGuide() {
                this.$parent.showGuide()
            }
        },
        beforeMount: function () { //加载执行
            //var data = "?upgraderVersionType=2&upgraderVersionIndustry=0&orderBy=uv_id&pageSize=9&pageNo=1";
            var data = {
                upgraderVersionType: 2,
                upgraderVersionIndustry: 0,
                orderBy: 'uv_id',
                pageSize: 9,
                pageNo: 0
            }
            this.query(data, 'first');
        },
        mounted() {
            bus.$on('svaeList', data => {
                console.log(data)
            })
            bus.$on('queryData', data => {
                this.query(data[0], data[1])
            })
        }
    }
</script>
<style scoped>
    .thumbnail {
        padding: 0 !important;
        height: 344px;
        border: none !important;
        border-radius: 0 !important;
        margin-bottom: 20px !important;
    }
</style>