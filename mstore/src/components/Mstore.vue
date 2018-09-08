<template>
    <div class="mstore-show ms-gray-background ms-position-relative" id="mstore">
        <!-- 幻灯 -->
        <mstore-banner />
        <div id="ms-list-new" class="ms-overflow-hidden ms-list-new ms-gray-background ms-width-show">
            <mstore-new-list />
            <div class="col-sm-4 col-md-4">
                <mstore-share-people-list />
                <mstore-pay-people-list />
            </div>
        </div>
        <mstore-all-people-list />
        <!-- 标签页 -->
        <div class="mstore-tabs">
            <mstore-classify />
            <div class="tab-content ms-mstore-list ms-overflow-hidden ms-width-show">
                <mstore-list />
            </div>
        </div>
        <form id="mstoreModelId" method="post" target="_self" action="mstoreContent.do">
            <input type="hidden" name="detailId" />
            <input type="hidden" name="modelUrl" />
        </form>
        <mstore-hover-button />
    </div>
    <!-- <div id="footer"></div> -->
</template>
<script>
    window.onscroll = function () { //绑定scroll事件
        var currentHeight = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离
        var currentHeightY = $(".mstore-banner").height() + $("#ms-list-new").height();
        if (currentHeight >= 400) {
            $(".ms-top").fadeIn()
        } else {
            $(".ms-top").fadeOut()
        }
        $("#people-list").css({
            top: currentHeight + "px",
        });
        if (currentHeight >= currentHeightY) { //判断
            $('.ms-classification').addClass("ms-classift-fixed");
            if (classification.upgraderVersionType == 2) {
                $('.ms-mstore-list').addClass("ms-model-margin");
            } else {
                $('.ms-mstore-list').addClass("ms-plug-margin");
            }
        } else {
            $('.ms-classification').removeClass("ms-classift-fixed");
            if (classification.upgraderVersionType == 2) {
                $('.ms-mstore-list').removeClass("ms-model-margin");
            } else {
                $('.ms-mstore-list').removeClass("ms-plug-margin");
            }
        }
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (classification.pageNo == "no") {
            return;
        }
        if (Math.abs(parseInt(currentHeight) + windowHeight - scrollHeight) < 3) {
            if (!vueList.loadNum) {
                return
            }
            if (vueList.listDownLoadText == "无") {
                return;
            }
            vueList.loadNum = false;
            vueList.listDownLoadText = "正在载入....";
            vueList.mstoreListLoad();
        }
    }
    import Banner from './Banner'
    import Classify from './Classify'
    import ShowList from './ShowList'
    import HoverButton from './HoverButton'
    import List from './List'
    import NewList from './NewList'
    import AllPeopleList from './AllPeopleList'
    import SharePeopleList from './SharePeopleList'
    import PayPeopleList from './PayPeopleList'
    export default {
        name: 'Mstore',
        components: {
            'mstore-new-list': NewList,
            'mstore-list': List,
            'mstore-banner': Banner,
            'mstore-classify': Classify,
            'mstore-show-list': ShowList,
            'mstore-hover-button': HoverButton,
            'mstore-all-people-list': AllPeopleList,
            'mstore-share-people-list': SharePeopleList,
            'mstore-pay-people-list': PayPeopleList,
        },
    }
</script>