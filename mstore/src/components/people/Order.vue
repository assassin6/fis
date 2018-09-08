<template>
  <div class="user_cententbody" id="vue-order">
    <div class="loading-pic" v-show="loading == 'loading'"></div>
    <!--我的收益订单-->
    <div class="user_cententbodynav">我的收益订单</div>
    <div class="alert alert-info" style="display: none;" role="alert" v-show="loading == 'nolist'">
      <p>价值源自分享，分享优质模版与插件会获得爱好者更多的RMB赞助。
        <router-link to='/'>立即分享</router-link>
      </p>
      <p>温馨提示：相信这个世界是美好的！别让好代码在您的硬盘里面睡觉，勇敢的分享出来吧。</p>
    </div>
    <table v-show="loading == 'list'" style="display: none;" id="incomeList" data-show-export="true" data-method="get" data-pagination="true"
      data-page-size="10" data-side-pagination="server">
    </table>
  </div>
</template>
<script>
  export default {
    name: "peopleOrder",
    data() {
      return {
        loading: 'loading'
      }

    },
    //提示淡入淡出
    mounted: function () {
      var target = this;
      $(".bootstrap-table").hide();
      $("#incomeList").bootstrapTable({
        url: mstore.getBaseUrl()+"/people/mstore/incomeList"+mstore.getUrlExt(), //ms.base + "mstore/userList.do",
        contentType: "application/x-www-form-urlencoded",
        queryParamsType: "undefined",
        toolbar: "#toolbar",
        columns: [{
          field: 'upgraderOrderPeopleIcon',
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
          field: 'upgraderOrderPeopleNickName',
          title: '用户昵称',
          align: 'left',
          valign: 'middle',
          width: '170px',
        }, {
          field: 'upgraderOrderVersionName',
          title: '版本名称',
          align: 'left',
          valign: 'middle',
          width: '390px',
        }, {
          field: 'upgraderOrderPrice',
          title: '收益',
          align: 'right',
          valign: 'middle',
          width: '100px',
          formatter: function (value, row) {
            return "￥"+value;
          }
        }, {
          field: 'upgraderOrderTime',
          title: '交易时间',
          align: 'center',
          valign: 'middle',
        },]
      })
      $('#incomeList').on('load-success.bs.table', function () {
        if ($('#incomeList').bootstrapTable('getData').length <= 0) {
          target.loading = "nolist";
          $(".bootstrap-table").hide();
        } else {
          target.loading = "list";
        }
      })
    }
  }
</script>
<style>
  .fixed-table-pagination {
    margin: 0 10px;
  }
</style>