<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
  <script src="{ms:globalskin.url/}/js/html5shiv.min.js">
    </script>
  <![endif]-->
<template>
  <div class="user_publicleft" id="vue-menu">
    <a class="user_info" href="{ms:global.host/}/people/bindEmail.do">
      <img :src="people.puIcon" class="user_icon" onerror="this.src='http://cdn.mingsoft.net/global/images/msheader.png'">
      <div class="user_name" v-text="people.puNickname"></div>
    </a>
    <ul class="user_menu" @mouseout="hover(4)">
      <li class="user_sharemenu " @mouseover="hover(0)">
        <div>
          <a href="javascript:;" @click='index' target="_blank">
            <i class="icon iconfont icon-logo icon-jinbi" :class="{'iconHover':iconIndex===0}"></i>我要分享</a>
        </div>

      </li>
      <li class="user_PM" @mouseover="hover(1)">
        <div>
          <a href="javascript:;" @click="linkPm" target="_blank">
            <i class="icon iconfont icon-logo icon-xiangmu" :class="{'iconHover':iconIndex===1}"></i>项目管理</a>
        </div>

      </li>
      <li class="user_mcodeMenu" @mouseover="hover(2)">
        <div>
          <a href="javascript:;" @click="linkMcode" target="_blank">
            <i class="icon iconfont icon-logo icon-daima" style="font-size: 16px;margin-right: -3px;" :class="{'iconHover':iconIndex===2}"></i>代码生成器</a>
        </div>

      </li>
      <li class="user_peopleInfoMenu" @mouseover="hover(3)">
        <div>
          <a href="http://ms.mingsoft.net/people/bindEmail.do">
            <i class="icon iconfont icon-logo icon-shenfen" :class="{'iconHover':iconIndex===3}"></i>基本信息</a>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
  import bus from '../../assets/js/eventBus.js'
  export default {
    name: 'peopleMenu',
    data() {
      return {
        people: '',
        iconIndex:4
      }
      //用户信息
    },
    //获取用户信息
    mounted: function () {
      var target = this;
      mstore.people.people.info(json => {
        target.people = json;
        var url = window.location.href;
        if (url.indexOf("share") > 0) {
          $(".user_sharemenu").addClass("user_menuOn");
        } else if (url.indexOf("bindEmail") > 0) {
          $(".user_peopleInfoMenu").addClass("user_menuOn");
        } else if (url.indexOf("mcode") > 0) {
          $(".user_mcodeMenu").addClass("user_menuOn");
        }
      })
    },
    methods: {
      linkPm() {
        if (this.people.peopleMailCheck == 1) {
          //          location.href = '';
          window.open("http://mpm.mingsoft.net/people/pm.do");
        } else {
          $('#bsExampleModalSm').modal('show');
        }
      },
      linkMcode() {
        if (this.people.peopleMailCheck == 1) {
          //           location.href = 'http://mcode.mingsoft.net/people/mcode.do';
          window.open("http://mcode.mingsoft.net/people/mcode.do");
        } else {
          $('#bsExampleModalSm').modal('show');
        }
      },
      index() {
        this.$router.push({ path: '/share' })
      },
      hover(index){
        this.iconIndex=index
      }
    }
  }
</script>
<style>
  body {
    background-color: #f3f3f3;
    position: static;
  }

  .daohang_li_menu {
    margin-top: 0 !important;
  }

  .user_center {
    width: 1170px;
    margin: 30px auto;
    border: 1px solid #eceaea;
    background: #f9f9f9;
    overflow: hidden;
  }

  .user_publicleft {
    width: 190px;
    background-color: #f9f9f9;
    /* border: 1px #ddd solid; */
    float: left;
    height: 550px;
    position: absolute;
  }

  .user_publicleft li:hover {
    background-color: #0099FF;
    color: #ffffff !important
  }
  .user_info {
    height: 145px;
    width: 100%;
    text-align: center;
    display: block;
    padding: 25px 0px;
  }

  a.user_info:hover {
    text-decoration: none;
  }

  .user_info img {
    border: 1px #ddd solid;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    padding: 3px;
  }

  .user_info .user_name {
    font-size: 18px;
    color: #666;
    overflow: hidden;
    margin-top: 5px;
    margin: 10px auto;
    white-space: nowrap;
    width: 110px;
    text-overflow: ellipsis;
  }

  .user_name {
    top: -34px !important;
    position: relative;
  }

  .user_menu {
    border-top: 5px #f9f9f9 solid;
  }

  .user_menu li {
    font-size: 14px;
    color: #666;
    text-align: left;
    height: 40px;
    line-height: 40px;
    padding-left: 53px;
  }

  .user_menu li a {
    color: #666;
    text-decoration: none;
    display: block;
  }

  .user_menu li a:hover {
    /* background-color: #f5f5f5; */
  }

  .user_menu li a {
    font-size: 14px;
    color: #333;
    margin: 0px;
  }

  .user_menu li.user_menuOn {
    background-color: #f5f5f5;
    /* color: #1c5b8b; */
  }

  .user_centent {
    width: 978px;
    float: right;
  }

  .user_cententdata {
    width: 100%;
    /* margin-bottom: 10px; */
  }

  .user_cententdata,
  .user_centent .user_cententbody {
    padding: 15px;
    overflow: hidden;
    background: #fff;
  }

  .ms-user-paddend {
    padding-right: 0px !important;
    padding-bottom: 0px !important;
  }

  .user_centent .user_cententbody {
    min-height: 543px;
  }

  .user_cententdata ul {
    border: 1px #ddd solid;
    border-right: 0px;
    float: left;
    margin-bottom: 0px;
  }

  .user_cententdata ul.user_dataright {
    float: right;
  }

  .user_downPay li {
    width: 152.5px !important;
  }

  .user_cententdata ul li {
    width: 156.5px;
    padding: 10px;
    border-right: 1px solid #ddd;
    text-align: center;
    float: left;
    cursor: pointer;
  }

  .user_cententdata ul li a {
    display: block;
    color: #333;
  }

  .user_cententdata ul li a:hover {
    text-decoration: none;
  }

  .user_cententdata ul li:hover {
    background-color: #fbfbfb;
  }

  .user_cententdata ul li div {
    font-size: 34px;
    color: #0099FF;
    text-align: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding-bottom: 5px;
  }

  .user_cententdata ul li div span {
    font-size: 18px;
  }

  .user_cententdata ul li div.income {
    color: #FFB848
  }

  .data_income p,
  .data_project p {
    display: inline-block;
    margin: 0 !important;
  }

  .user_cententbodynav {
    margin-bottom: 15px;
    font-size: 18px;
    clear: both;
  }
  .iconHover{
    color: #fff;
    font-size: 14px;
  }
</style>