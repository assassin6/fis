<template>
    <div class="ms-classification" id="ms-classification">
        <ul class="nav nav-tabs ms-vertical-center" role="tablist">
            <li role="presentation" class="ms-model ms-cursor" :class="{'active':upgraderVersionType == 2}">
                <a @click="filter('model')">
                    <span class="ms-cursor">模板</span>
                </a>
            </li>
            <li role="presentation" class="ms-plug ms-cursor" :class="{'active':upgraderVersionType == 1}">
                <a @click="filter('pulg')">
                    <span class="ms-cursor">插件</span>
                </a>
            </li>
        </ul>
        <ul class="ms-padding-bottom ms-overflow-hidden ms-classification-list" :class="{'ms-not-height':upgraderVersionType == '1'}">
            <li class="col-sm-1 col-md-1 ms-classification-list-title">分类：</li>
            <template v-for="sort,index in classificationList">
                <li class="col-sm-1 col-md-1 ms-padding-0 ms-cursor text-center" :class="{'ms-active':upgraderVersionIndustry == index}"
                    @click="classification('2',index)">{{sort}}</li>
            </template>
        </ul>
        <ul class="ms-overflow-hidden ms-vertical-center ms-color-list" v-show="upgraderVersionType == 2">
            <li class="ms-fl ms-color-title col-sm-1 col-md-1">颜色：</li>
            <li class="ms-fl ms-cursor" v-for="(color,index) in colorList" :class="'ms-color-'+activeColor+'-active'" @click="chooseColor(color,index,'2')">
                <p :class="'ms-'+color">
                    <img v-if="color == 'no'" class="ms-no-color" src="../assets/images/no-color.png" />
                    <span v-if="color != 'no'" :class="'ms-color-'+color"></span>
                </p>
            </li>

        </ul>
        <ul class="ms-overflow-hidden ms-sort">
            <template v-for="sort in sortList">
                <li class="ms-fl ms-sort-button ms-cursor ms-vertical-center" :class="{'ms-sort-active':orderBy == sort.id}" @click="chooseSort(sort.id)">
                    <span class="ms-sort-text">{{sort.name}}</span>
                    <span class="glyphicon glyphicon-arrow-down"></span>
                </li>
            </template>
            <li class="ms-fr ms-cursor" @click="chooseShowMobile" v-show="upgraderVersionType == 2">
                <img v-show="showMobile" onmousemove="this.src='../assets/images/mobile-active.png'" onmouseout="this.src='../assets/images/mobile-gray.png'"
                    title="显示有手机端的模板" src="../assets/images/mobile-gray.png" />
                <img v-show="!showMobile" style="display: none;" title="显示全部" src="../assets/images/mobile-active.png" />
            </li>
        </ul>
    </div>
</template>
<script>
    //非父子组件之间通信
    import bus from '../assets/js/eventBus.js'
    export default {
        name: "Classify",
        data() {
            return {
                upgraderVersionIndustry: 0, //选中的分类
                classificationList: ['全部模板', '互联网', '通讯-数码', '广告-传媒', '建材-家居', '酒店-旅游', '食品-果蔬', '服装-礼品', '摄像-婚庆', '运动健身', '教育-培训', '保健-医疗', '金融-投资', '法律-政府', '汽车-汽配', '机械-设备', '化工-能源', '农业-养殖', '门户', '商城'], //分类
                colorList: ['no', 'red', 'orange', 'blur', 'black', 'gray', 'green'], //颜色
                activeColor: "no", //选中的颜色
                sortList: [{
                    name: '最新',
                    id: 'uv_id'
                },
                {
                    name: '热门',
                    id: 'uv_download'
                },
                {
                    name: '星级',
                    id: 'uv_start'
                },
                ], //排序
                showMobile: true, //是否只显示有手机端模板的模板
                upgraderVersionType: 2, //1为插件，2为模板
                upgraderVersionColor: 0,
                upgraderVersionMobileImg: 'all',
                orderBy: "uv_id",
                pageNo: 1, //第几页
                classificationDivHeight: 0,//DIV高度
            }
        },
        methods: {
            //判断高度
            judgeHeight() {
                var data = Math.abs(document.documentElement.scrollTop || document.body.scrollTop);
                return (data - this.classificationDivHeight) / 4.3 + ((data - this.classificationDivHeight) > 0) ? 430 : 0;
            },
            classification: function (type, index) {
                this.upgraderVersionType = type;
                this.upgraderVersionIndustry = index;
                this.pageNo = 1;
                this.filter('no');
            },
            chooseColor: function (color, index, type) {
                this.activeColor = color;
                this.upgraderVersionType = type;
                this.upgraderVersionColor = index;
                this.pageNo = 1;
                this.filter('no');
            },
            chooseSort: function (sort) {
                this.orderBy = sort;
                this.pageNo = 1;
                this.filter('no');
            },
            chooseShowMobile: function () {
                if (this.showMobile) {
                    this.upgraderVersionMobileImg = "yes";
                } else {
                    this.upgraderVersionMobileImg = "all";
                }
                this.pageNo = 1;
                this.filter('no');
                this.showMobile = !this.showMobile;
            },
            filter: function (id) {
                if (id == 'model') {
                    this.activeTemplate = "全部";
                    this.activeColor = "no";
                    this.upgraderVersionType = 2;
                    this.upgraderVersionIndustry = 0;
                    this.upgraderVersionColor = 0;
                    this.orderBy = "uv_id";
                    this.pageSize = 9;
                    this.pageNo = 1;
                    this.showMobile = true;
                    vueList.saveList = [];
                    if ($('.ms-classification').hasClass("ms-classift-fixed")) {
                        $('.ms-mstore-list').removeClass("ms-plug-margin");
                        $('.ms-mstore-list').addClass("ms-model-margin");
                    }
                }
                if (id == 'pulg') {
                    this.activePlug = "全部";
                    this.upgraderVersionType = 1;
                    this.upgraderVersionIndustry = 0;
                    this.upgraderVersionColor = 0;
                    this.upgraderVersionMobileImg = 'all';
                    this.orderBy = "uv_id";
                    this.pageSize = 9;
                    this.pageNo = 1;
                    bus.$emit('saveList',[])
                    //vueList.saveList = [];
                    if ($('.ms-classification').hasClass("ms-classift-fixed")) {
                        $('.ms-mstore-list').removeClass("ms-model-margin");
                        $('.ms-mstore-list').addClass("ms-plug-margin");
                    }
                }
                if (this.upgraderVersionMobileImg == 'all') {
                    var data ={
                        upgraderVersionType:this.upgraderVersionType,
                        upgraderVersionIndustry:this.upgraderVersionIndustry,
                        upgraderVersionColor:this.upgraderVersionColor,
                        orderBy:this.orderBy,
                        pageSize:9,
                        pageNo:this.pageNo
                    }
                    //var data = "?upgraderVersionType=" + this.upgraderVersionType + "&upgraderVersionIndustry=" + this.upgraderVersionIndustry + "&upgraderVersionColor=" + this.upgraderVersionColor + "&orderBy=" + this.orderBy + "&pageSize=9" + "&pageNo=" + this.pageNo;
                } else {
                    var data ={
                        upgraderVersionType:this.upgraderVersionType,
                        upgraderVersionIndustry:this.upgraderVersionIndustry,
                        upgraderVersionColor:this.upgraderVersionColor,
                        orderBy:this.orderBy,
                        upgraderVersionMobileImg:1,
                        pageSize:9,
                        pageNo:this.pageNo
                    }
                    //var data = "?upgraderVersionType=" + this.upgraderVersionType + "&upgraderVersionIndustry=" + this.upgraderVersionIndustry + "&upgraderVersionColor=" + this.upgraderVersionColor + "&orderBy=" + this.orderBy + "&upgraderVersionMobileImg=1" + "&pageSize=9" + "&pageNo=" + this.pageNo;
                }
                if (id == "load") {
                    bus.$emit('queryData',[data,'load'])
                    //vueList.query(data, 'load');
                } else {
                    $('html,body').animate({ scrollTop: this.classificationDivHeight }, this.judgeHeight(), function () {
                        //vueList.saveList = [];
                        bus.$emit('saveList',[])
                        bus.$emit('queryData',[data,'first'])
                        //vueList.query(data, 'first');
                    })
                }
            },
        },
        mounted() {
            bus.$on('filter',(data)=>{
                this.pageNo += 1
                this.filter(data)
            })
            this.classificationDivHeight = $(".ms-classification").offset().top - 220;
        },
    }
</script>