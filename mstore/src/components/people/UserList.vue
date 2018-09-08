<template>
  <div id="vue-user-list" @mousewheel='pageScroll'>

    <!--加载中-->
    <div class="loading-pic" v-show="loading"></div>
  
    <!--加载完显示开始-->
    <div class="user_cententbody" v-show="!loading" style="display:none">
  
      <div class="user_cententbodynav" style="margin: 0;">我的用户</div>
      <p class="tip">提示：用户越多表示您分享的作品非常受欢迎，分享收益RMB更多、接私活的几率更高！</p>

      <!--没有数据显示-->
      <div class="alert alert-info listNone hide-default" role="alert" v-show='noUser'>
        <p>分享才能收获更多用户粉丝哦！快快分享一个吧。
          <a class="label label-primary" @click='share'>立即分享</a>
        </p>
        <p>温馨提示：用户越多表示您分享的作品非常受欢迎，同时获得分享收益RMB更多、接私活的几率更高！</p>
      </div>

      <!--用户列表开始-->
      <div>
        <div class="ms-people-div" v-for="item in userList" >
          <img class="ms-people-icon" onerror="this.src='http://cdn.mingsoft.net/global/images/msheader.png'" v-if="item.upgraderPeopleVersionPeopleIcon != '' && item.upgraderPeopleVersionPeopleIcon != undefined"
            :src="item.upgraderPeopleVersionPeopleIcon" />
          <img class="ms-people-icon" v-else src="http://cdn.mingsoft.net/global/images/msheader.png" />
          <span class="ms-people-name" v-if="item.upgraderPeopleVersionPeopleNickName != '' && item.upgraderPeopleVersionPeopleNickName != undefined"
            v-text="item.upgraderPeopleVersionPeopleNickName"></span>
          <span class="ms-people-name" v-else>匿名用户</span>
        </div>
      </div>
      
      <!--下拉加载-->
      <div :class="{'ms-list-down-load-text':listDownLoadText == '无'}" v-show="listDownLoadText != '无'" class="ms-down-load-div">
        <i v-show="listDownLoadText =='下滑加载更多....'" class="iconfont">&#xe744;</i>
        <i v-show="listDownLoadText =='已经浏览完了，去看看别的'" class="iconfont">&#xe737;</i>
        <img v-show="listDownLoadText =='正在载入....'" src="http://cdn.mingsoft.net/global/images/loading.gif" />
        <span v-text="listDownLoadText"></span>
      </div>

    </div>
    <!--加载完显示结束-->

  </div>
</template>

<script>
  export default {
    name: "PeopleUserList",
    data() {
      return {
        userList: new Array(), //我的用户列表
        loading: true, //加载
        pageNo: 1, //当前加载分页
        saveList: new Array(), //我的用户列表储存
        listDownLoadText: "下滑加载更多....",//下拉显示文本
        noUser: false
      }
    },
    methods: {
      //懒加载用户列表
      list(num) {
        this.loading = true;
        var target = this;
        var param = {
          pageSize: 40,
          pageNo: eval(num)
        }
        mstore.people.people.userList(param, data => {
          if (!data||data.rows.length <= 0) {
            target.listDownLoadText = "无";
            target.noUser = true
            return
          }
          if (num == 1) {
            target.userList = data.rows;
          }
          if (data.total > target.saveList.length) {
            target.userList = target.saveList.concat(data.rows)
          } else {
            target.listDownLoadText = "已经浏览完了，去看看别的";
            setTimeout(function () {
              target.listDownLoadText = "无";
            }, 1500)
            target.pageNo = "no";
            target.loading = false;
            return
          }
          target.saveList = target.userList;
          target.loading = false;
          target.listDownLoadText = "下滑加载更多....";
        })
      },
      pageScroll() {
        var target = this
        var scrollTop = document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.offsetHeight;
        var windowHeight = window.innerHeight;
        if (this.listDownLoadText === "无") return;
        if (scrollTop + windowHeight == scrollHeight) {
          if (this.pageNo === "no") return;
          this.listDownLoadText = "正在载入....";
          target.list(target.pageNo += 1);
        }
      },
      share() {
        this.$router.push('share')
      }
    },
    //获取我的用户列表
    mounted: function () {
      this.list(this.pageNo);
    },
  }
  //滚动到底部
</script>