<template>
  <div id="vue-support">
    <div class="loading-pic" v-show="loading"></div>
    <!--更新提示-->
    <div class="user_cententbody" v-show="!loading" style="display:none">
      <!--我的用户数-->
      <div class="user_cententbodynav" style="margin: 0;">我的赞助</div>
      <p class="tip">提示：你的赞助开发者能够使其提供更好的分享！</p>
      <div class="alert alert-info listNone hide-default" role="alert" v-show='noSupport'>
        <p>您的每一次赞助都是对开源、对开发者最大的肯定！</p>
        <p>温馨提示：您对开发者的肯定能让开发者持续提供更多更好的分享。</p>
      </div>
      <table id="supportList" data-show-export="true" data-method="get" data-pagination="true" data-page-size="50" data-side-pagination="server">
      </table>
      <!--<table class="table table-hover hide-default">
            <thead>
              <tr>
                <th>订单号</th>
                <th>版本名称</th>
                <th>作者</th>
                <th style="width:12%;text-align:center">价格</th>
                <th style="text-align:center">赞助时间</th>
              </tr>
            </thead>
            <template v-for="support in supportList">
              <tbody id="supportList">
                <tr>
                  <td style="width:15%">{{support.upgraderOrderNo}}</td>
                  <td style="width:40%">{{support.upgraderOrderVersionName}}</td>
                  <td style="width:10%">{{support.upgraderOrderPublishPeopleNickName}}</td>
                  <td style="text-align:center">
                    {{support.upgraderOrderPrice}}
                  </td>
                  <td style="text-align:center">{{support.upgraderOrderTime}}</td>
                </tr>
              </tbody>
            </template>
          </table>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: "peopleSupport",
    data() {
      return {
        supportList: [], //我的赞助列表
        loading: false, //加载
        noSupport: true
      }
    },
    //获取我的赞助列表
    mounted: function () {
      this.loading = true;
      var target = this;
      $("#supportList").bootstrapTable({
        url: mstore.getBaseUrl() + "/people/mstore/payList" + mstore.getUrlExt(), //ms.base + "mstore/userList.do",
        contentType: "application/x-www-form-urlencoded",
        queryParamsType: "undefined",
        toolbar: "#toolbar",
        columns: [{
          field: 'upgraderOrderPublishPeopleIcon',
          title: '用户头像',
          align: 'center',
          valign: 'middle',
          width: '40px',
          formatter: function (value, row) {
            if (value == null || value == "") {
              value = "http://cdn.mingsoft.net/global/images/msheader.png";
            }
            return "<img style='width:40px;border-radius:50%;' src=" + value + ">"
          }
        }, {
          field: 'upgraderOrderNo',
          title: '订单号',
          align: 'center',
          valign: 'middle',
          width: '160px',
        }, {
          field: 'upgraderOrderPublishPeopleNickName',
          title: '作者',
          align: 'left',
          valign: 'middle',
          width: '200px',
        }, {
          field: 'upgraderOrderVersionName',
          title: '版本名称',
          align: 'left',
          valign: 'middle',
          width: '270px',
        }, {
          field: 'upgraderOrderPrice',
          title: '价格',
          align: 'right',
          valign: 'middle',
          width: '75px',
          formatter: function (value, row) {
            return  "￥"+value  ;
          }
        }, {
          field: 'upgraderOrderTime',
          title: '赞助时间',
          align: 'center',
          valign: 'middle',
        },]
      })
      $('#supportList').on('load-success.bs.table', function () {
        if ($('#supportList').bootstrapTable('getData').length <= 0) {
          $(".listNone").fadeIn();
          $(".bootstrap-table").hide();
        } else {
          target.noSupport=false
          $("table").fadeIn();
        }
        target.loading = false;
      })
    },
  }
</script>
<style>
  .fixed-table-pagination {
    margin: 0 10px;
  }
</style>