<template>
    <div id="people-list" class="ms-white-background ms-list-new" style="display:none;">
        <ul class="ms-overflow-hidden" id="people">
            <template v-for="item in computeList">
                <li class="ms-user-share-list ms-fl" v-if="listType == 'share'">
                    <img v-if="item.upgraderOrderPeopleNickName != '匿名'" :src="item.upgraderVersionPeopleIcon" onerror="this.src='http://cdn.mingsoft.net/global/images/msheader.png'"
                    />
                    <img v-else src='http://cdn.mingsoft.net/global/images/msheader.png' />
                    <p class="ms-fl">{{item.upgraderVersionPeopleName}}</p>
                </li>
                <li class="ms-user-share-list ms-fl" v-if="listType == 'pay'">
                    <img v-if="item.upgraderOrderPeopleNickName != '匿名'" :src="item.upgraderOrderPeopleIcon" onerror="this.src='http://cdn.mingsoft.net/global/images/msheader.png'"
                    />
                    <img v-else src='http://cdn.mingsoft.net/global/images/msheader.png' />
                    <p class="ms-fl">{{item.upgraderOrderPeopleNickName}}</p>
                </li>
            </template>
        </ul>
        <div class="ms-drop-down-button" @click="closePeopleList">
            <span class="glyphicon glyphicon-remove"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AllPeopleList',
        data() {
            return {
                peopleList: [],
                listType: "",
            }

        },
        computed: {
            computeList: function () {
                return this.peopleList.filter(function (people) {
                    if (people.upgraderVersionPeopleIcon == undefined) {
                        people.upgraderVersionPeopleIcon = "http://cdn.mingsoft.net/global/images/msheader.png";
                    }
                    var icon = people.upgraderVersionPeopleIcon.split('/');
                    if (icon[2] == "ms.ming-soft.com" && this.listType == "share") {
                        people.upgraderVersionPeopleIcon = "http://cdn.mingsoft.net/global/images/msheader.png";
                    }
                    return people
                })
            }
        },
        methods: {
            //展开分享、赞助列表
            showPeopleList: function (list, type) {
                this.peopleList = list;
                this.listType = type;
                // document.getElementById("people-list").scrollIntoView(true);
                $("#people-list").fadeIn();
            },
            //关闭分享、赞助列表
            closePeopleList: function () {
                $("#people-list").fadeOut();
                this.peopleList = [];
                this.listType = "";
            },
        },
        mounted() {
            var currentHeight = document.documentElement.scrollTop || document.body.scrollTop;//获取滚动距离
            var windowHeight = $(window).height();//获取浏览器窗口高度
            var div = $(".ms-user-share")[0].offsetParent.offsetLeft;//获取分享列表距离左边的距离
            // var height = $(".ms-user-share-list")[0].offsetHeight;//获取单个人员的高度
            // var num = Math.ceil(list/5);
            // num = Number(num)*Number(height+15);
            // windowHeight = windowHeight-20;
            // if(windowHeight <= num){
            //     $("#people-list").height(windowHeight);
            //     $("#people").height(windowHeight-20);
            // }else {
            //     $("#people-list").height(num);
            //     $("#people").height(num);
            // }
            $("#people-list").height(windowHeight - 17);
            $("#people").height(windowHeight - 57);
            $("#people-list").css({ left: div + "px" });
            $("#people-list").width($(".ms-user-pay").width());
        }
    }
</script>