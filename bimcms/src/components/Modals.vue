<template>
  <div>
    <!-- 模态框 -->
    <div class="modal fade" id="editProject">
      <div class="modal-dialog" style="width: 400px;top: 50%;margin-top: -200px">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title" style="display: inline;">BIM后台管理系统</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body" style="padding: 20px">
            <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="输入描述 1-30长度" style="font-size: 12px">
            </div>
            <div class="form-group">
              <textarea class="form-control" id="name" placeholder="输入描述 1-100长度" style="min-height: 150px;font-size: 12px" />
            </div>
            <div style="margin-bottom: 12px">
              <button type="button" class="btn btn-secondary confirmEdit" data-dismiss="modal">确认修改</button>
            </div>
            <div>
              <button type="button" class="btn btn-secondary deleteEdit" data-dismiss="modal">删除项目</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="modal fade" id="invitePeople">
      <div class="modal-dialog" style="width: 600px;top: 50%;margin-top: -225px">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title" style="display: inline;">BIM后台管理系统邀请成员</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body" style="padding: 19px;height:400px">
            <div class="form-group" style="width:100%;margin-bottom:12px;display:inline-block">
              <div style="float:left;margin-right:15px">
                <input type="text" class="form-control" id="name" placeholder="输入描述 1-30长度" style="font-size: 12px;width:350px;">
              </div>
              <button class="btn btn-default" style="width:auto;float:left;">
                发出邀请
              </button>
              <span style="float:right;line-height:34px">共人</span>
            </div>
            <div>
              <table id="inviteList" data-show-export="true" data-side-pagination="server"></table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="userMessage">
      <div class="modal-dialog" style="width: 350px;top: 50%;margin-top: -200px">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <div class="userPhoto">
              <img src="http://www.w3school.com.cn/ui2017/compatible_chrome.png" style="height: 60px;" />
            </div>
            <div class=userMail style="margin-top: 12px">
              <span>邮箱</span>
            </div>
            <div class="form-group">
              <div class="btn-group">
                <button type="button" class="btn btn-default" :class="{'buttonOn':changeStatus==='mes'}" @click=toChangeMes>
                  基本资料
                </button>
                <button type="button" class="btn btn-default" @click=toChangePas :class="{'buttonOn':changeStatus==='pas'}">
                  修改密码
                </button>
              </div>
            </div>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body">

            <div class="changeForm">
              <div class="changeMes">
                <div class="form-group">
                  <input type="text" class="form-control" id="name" placeholder="真实姓名">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="name" placeholder="手机号">
                </div>
                <div class="form-group" style="display: inline-block;">
                  <input type="text" class="form-control" id="name" placeholder="验证码" style="width: 204px;margin-right: 20px;float: left;">
                  <button type="button" class="btn btn-secondary" style="width:auto;float: right;">发送验证码</button>
                </div>
                <div>
                  <button type="button" class="btn btn-secondary changeUserMessage" data-dismiss="modal">确认修改</button>
                </div>
              </div>
              <div class="changePas">
                <div class="form-group">
                  <input type="text" class="form-control" id="name" placeholder="旧密码">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="name" placeholder="新密码">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="name" placeholder="确认密码">
                </div>
                <div>
                  <button type="button" class="btn btn-secondary changeUserMessage" data-dismiss="modal">确认修改</button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <div class="modal fade" id="componentDetail" aria-hidden=false data-backdrop=static>
      <div class="modal-dialog " style="width: 400px;margin-top: -260px;top: 50%;">
        <div class="modal-content " style="width: 400px;height: 520px;">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title" style="display: inline;">构件属性</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body" style="padding: 20px;">

          </div>
        </div>
      </div>
    </div>
    <div class="modal moveable fade" id="componentAttribute" aria-hidden=true data-backdrop=static>
      <div class="modal-dialog " style="width: 400px;margin-top: -260px;top: 50%;">
        <div class="modal-content " style="width: 400px;height: 520px;">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <span class="modal-title" style="display: inline;font-size: 16px;">构件属性</span>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body" style="overflow: hidden;position: relative;height: 454px;">
            <div style="position: relative;z-index: 1;">
              <div>
                <span>长度</span>
                <div style="float: right">
                  <i class="iconfont icon-zengjia" style="color:#5bb85d "></i>
                  <i class="iconfont icon-shanchu" style="color:#e37d7d "></i>
                </div>
              </div>
              <table id="length" data-show-export="true" data-side-pagination="server"></table>
            </div>
            <div style="position: relative;z-index: 1;">
              <div>
                <span>结构用途</span>
                <div style="float: right">
                  <i class="iconfont icon-bianji2" style="color:#0099ff "></i>
                  <i class="iconfont icon-zengjia" style="color:#5bb85d "></i>
                  <i class="iconfont icon-shanchu" style="color:#e37d7d "></i>
                </div>
              </div>
              <table id="purpose" data-show-export="true" data-side-pagination="server"></table>
            </div>
            <div style="position: absolute;bottom:0;height: 202px;width:370px;margin-top: 5px;z-index: 5;background-color: #ffffff">
              <div id=addType>
                <button type="button" class="btn-link" style="color:#5bb85d;outline: none">
                  <i class="iconfont icon-zengjia"></i>
                </button>
              </div>
              <div id=addNewType>
                <div>
                  <span>新增分类与属性</span>
                  <button type="button" class="close">&times;</button>
                </div>
                <form role="form">
                  <div class="form-group">
                    <input type="text" class="form-control" id="name" placeholder="状态类别，必填，1-10字符">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" id="name" placeholder="选择颜色">
                  </div>
                  <div class="form-group" style="padding-left: 0px;">
                    <input type="text" class="form-control" id="name" placeholder="状态名称，必填，1-50字符" maxlength="4">
                  </div>
                  <div class="btn-group btn-group-md">
                    <button type="button" class="btn btn-default" >
                      文字
                    </button>
                    <button type="button" class="btn btn-default">数值</button>
                    <button type="button" class="btn btn-default">日期</button>
                  </div>
                  <button type="submit" class="btn btn-default" style="width: 368px">确认新增构件状态</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="modal moveable fade" id="componentStatus" aria-hidden=false data-backdrop=static>
      <div class="modal-dialog " style="width: 400px;margin-top: -260px;top: 50%;">
        <div class="modal-content " style="width: 400px;height: 520px;">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <span class="modal-title" style="display: inline;font-size: 16px">构件状态(着色管理)</span>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body" style="overflow: auto">
            <div>
              <div>
                <span>项目进度</span>
                <div style="float: right">
                  <i class="iconfont icon-bianji2" style="color:#0099ff "></i>
                  <i class="iconfont icon-zengjia" style="color:#5bb85d "></i>
                  <i class="iconfont icon-shanchu" style="color:#e37d7d "></i>
                </div>
              </div>
              <table id="programProgress" data-show-export="true" data-side-pagination="server"></table>
            </div>
            <div>
              <div>
                <span>项目质量</span>
                <div style="float: right">
                  <i class="iconfont icon-bianji2" style="color:#0099ff"></i>
                  <i class="iconfont icon-zengjia" style="color:#5bb85d"></i>
                  <i class="iconfont icon-shanchu" style="color:#e37d7d"></i>
                </div>
              </div>
              <table id="programQuality" data-show-export="true" data-side-pagination="server"></table>
            </div>
            <div style="position: relative;height: 202px;overflow: hidden;margin-top: 5px">
              <div id=addButton>
                <button type="button" class="btn-link" style="color:#5bb85d;outline: none">
                  <i class="iconfont icon-zengjia"></i>
                </button>
              </div>
              <div id=addColor>
                <div>
                  <span>新增状态(着色)</span>
                  <button type="button" class="close">&times;</button>
                </div>
                <form role="form">
                  <div class="form-group">
                    <input type="text" class="form-control" id="name" placeholder="状态类别，必填，1-10字符">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" id="name" placeholder="选择颜色">
                  </div>
                  <div class="form-group" style="padding-left: 0px;">
                    <input type="text" class="form-control" id="name" placeholder="状态名称，必填，1-50字符" maxlength="4">
                  </div>
                  <button type="submit" class="btn btn-default" style="width: 368px">确认新增构件状态</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="editMessage" aria-hidden=false data-backdrop=static>
      <div class="modal-dialog " style="width: 400px;margin-top: -260px;top: 50%;">
        <div class="modal-content " style="width: 400px;height: 520px;">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <span class="modal-title" style="display: inline;">构件状态(着色管理)</span>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Modals',
    data() {
      return {
        changeStatus: 'mes'
      }
    },
    methods: {
      toChangeMes() {
        $("#userMessage .modal-body").animate({ scrollLeft: 0 }, 300);
        this.changeStatus = 'mes'
      },
      toChangePas() {
        $("#userMessage .modal-body").animate({ scrollLeft: '350px' }, 300);
        this.changeStatus = 'pas'
      },
      show() {

      },
      success() {

      }
    },
    mounted() {
      var target = this
      window.programQuality = {
        "click .show": target.show,
        "click .success": target.success
      };
      $('#addButton>button').click(() => {
        $('#addColor').animate({ bottom: 0 }, 400)
      })
      $('#addColor .close').click(() => {
        $('#addColor').animate({ bottom: '-202px' }, 400)
      })
      $('#addType>button').click(() => {
        $('#addNewType').animate({ bottom: 0 }, 400)
      })
      $('#addNewType .close').click(() => {
        $('#addNewType').animate({ bottom: '-300px' }, 400)
      })
      $('.moveable').on("show.bs.modal", function () {
        $(this).draggable({
          handle: ".modal-header"   // 只能点击头部拖动
        });
        $(this).css("overflow", "hidden"); // 防止出现滚动条，出现的话，你会把滚动条一起拖着走的
      });
      $("#inviteList").bootstrapTable({
        data: "",
        contentType: "application/x-www-form-urlencoded",
        columns: [
          {
            field: "peopleIcon",
            title: "头像",
            align: "center",
            valign: "middle",
            width: "80px",
            formatter: function (value, row) {
              if (value == null || value == "") {
                value = "http://cdn.mingsoft.net/global/images/msheader.png";
              }
              return (
                "<img style='width:40px;border-radius:50%;' src=" + value + ">"
              );
            }
          },
          {
            field: "peopleMail",
            title: "邮箱",
            align: "left",
            valign: "middle",
            width: "360px"
          },
          {
            field: "operate",
            title: "操作",
            align: "center",
            valign: "middle",
            width: "120px"
          }
        ]
      });
      $("#programProgress").bootstrapTable({
        data: [{
          color: 'yellowgreen',
          status: '已完成'
        },
        {
          color: 'red',
          status: '未变更'
        }],
        contentType: "application/x-www-form-urlencoded",
        columns: [
          {
            checkbox: true,
            formatter: (value, row, index) => {
              if (row.state == true)
                return {
                  disabled: false,//设置是否可用
                  checked: true//设置选中
                };
              return value;
            }
          },
          {
            field: "color",
            title: "颜色",
            align: "center",
            valign: "middle",
            width: "360px",
            formatter: function (value, row, index) {
              return [
                '<div class="colorBlock " style="background-color:' + row.color + '"></div>'
              ].join("");
            }
          },
          {
            field: "status",
            title: "状态",
            align: "center",
            valign: "middle",
            width: "360px"
          },
          {
            field: "upgraderOrderPublishPeopleNickName",
            title: "操作",
            align: "center",
            valign: "middle",
            width: "120px",
            formatter: function (value, row, index) {
              return [
                '<i class="iconfont icon-yanjing showOff"></i>',
                '<i class="iconfont icon-quanxian success"></>'
              ].join("");
            }
          }
        ]
      });
      $("#programQuality").bootstrapTable({
        data: [{
          attributeName: 'green',
          status: '好'
        },
        {
          attributeName: 'red',
          status: '差'
        }],
        contentType: "application/x-www-form-urlencoded",
        columns: [
          {
            checkbox: true,
            formatter: (value, row, index) => {
              if (row.state == true)
                return {
                  disabled: false,//设置是否可用
                  checked: true//设置选中
                };
              return value;
            }
          },
          {
            field: "attributeName",
            title: "属性名",
            align: "center",
            valign: "middle",
            width: "360px",
            formatter: function (value, row, index) {
              return [
                '<div class="colorBlock " style="background-color:' + row.attributeName + '"></div>'
              ].join("");
            }
          },
          {
            field: "status",
            title: "状态",
            align: "center",
            valign: "middle",
            width: "360px"
          },
          {
            field: "operate",
            title: "操作",
            align: "center",
            valign: "middle",
            width: "120px",
            events: programQuality,
            formatter: function (value, row, index) {
              return [
                '<i class="iconfont icon-yanjing showOff"></i>',
                '<i class="iconfont icon-quanxian success"></>'
              ].join("");
            }
          }
        ]
      });
      $("#length").bootstrapTable({
        data: [{
          attributeName: '长度',
          attributeData: '',
          type: '数字'
        },
        {
          attributeName: '体积',
          attributeData: '',
          type: '文字'
        }],
        contentType: "application/x-www-form-urlencoded",
        columns: [
          {
            checkbox: true,
            formatter: (value, row, index) => {
              if (row.state == true)
                return {
                  disabled: false,//设置是否可用
                  checked: true//设置选中
                };
              return value;
            }
          },
          {
            field: "attributeName",
            title: "属性名",
            align: "center",
            valign: "middle",
            width: "120px",
          },
          {
            field: "attributeData",
            title: "属性值",
            align: "center",
            valign: "middle",
            width: "120px"
          },
          {
            field: "type",
            title: "类型",
            align: "center",
            valign: "middle",
            width: "120px"
          }
        ]
      });
      $("#purpose").bootstrapTable({
        data: [{
          attributeName: '长度',
          attributeData: '',
          type: '数字'
        },
        {
          attributeName: '时间段',
          attributeData: '',
          type: '日期'
        }],
        contentType: "application/x-www-form-urlencoded",
        columns: [
          {
            checkbox: true,
            formatter: (value, row, index) => {
              if (row.state == true)
                return {
                  disabled: false,//设置是否可用
                  checked: true//设置选中
                };
              return value;
            }
          },
          {
            field: "attributeName",
            title: "属性名",
            align: "center",
            valign: "middle",
            width: "120px",
          },
          {
            field: "attributeData",
            title: "属性值",
            align: "center",
            valign: "middle",
            width: "120px"
          },
          {
            field: "type",
            title: "类型",
            align: "center",
            valign: "middle",
            width: "120px"
          }
        ]
      });
    }
  }
</script>
<style>
  .userPhoto,
  .userMail {
    min-width: 60px;
    width: 60px;
    margin: auto;
    text-align: center;
    margin-top: 12px
  }

  #userMessage .btn-group .btn {
    width: 80px;
    height: 30px;
    font-size: 12px;
  }

  #userMessage .btn-group {
    margin: auto;
    min-width: 160px;
    display: block;
    height: 30px;
    width: 170px;
    margin-top: 20px;
  }

  #userMessage .modal-header {
    border: none;
  }

  #userMessage .modal-body {
    padding: 0px;
    overflow-x: hidden;
  }

  .changeUserMessage {
    width: 100%;
    margin-top: 12px;
  }

  .changeForm {
    width: 700px;
    height: 204px;
    background-color: #ffffff;
  }

  .changePas {
    padding: 0 15px 15px 15px;
    float: left;
    width: 350px;
  }

  .changeMes {
    float: left;
    width: 350px;
    padding: 0 15px 15px 15px;
  }

  .showOff,
  .success {
    width: 16px;
    height: 16px;
  }

  .colorBlock {
    width: 100%;
    height: 25px;
  }

  #addButton,#addType{
    height: 43px;
    width: 43px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -21px;
  }

  #addColor{
    height: 202px;
    width: 368px;
    position: absolute;
    background-color: #ffffff;
    bottom: -202px;
    z-index: 6;
  }

  #addColor input,#addNewType input{
    width: 368px;
  }

  #addButton>button,#addType>button {
    height: 31px;
    margin: auto;
    width: 31px;
    padding: 1px;
  }

  #addButton>button>i,#addType>button>i {
    font-size: 30px;
  }

  .fixed-table-container thead th .th-inner,
  .fixed-table-container tbody td .th-inner {
    padding: 4px;
    line-height: 20px;
  }

  .bootstrap-table .table:not(.table-condensed)>tbody>tr>td,
  .table>tbody>tr>td {
    padding: 4px;
  }
  #addNewType{
   z-index: auto;
    bottom: 0px;
    position: absolute;
    background-color: #ffffff;
    bottom: -260px;
  }
  #addNewType .btn-group{
    margin: 15px 0px;
  }
  #addNewType .btn-group .btn {
    width: 122.7px;
    height: 30px;
    font-size: 12px;
  }
</style>