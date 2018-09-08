<template>
  <div class="user_cententbody" id="vue-share" style="min-height:985px;">
    <!--我要发布-->
    <div class="user_cententbodynav">
      我要分享
      <p class="tip">提示：模板插件需提交审核才能正式发布，请耐心等待。</p>
    </div>
    <div class="releaseBody">
      <div id='status'>
        <div class='lineOn' :class="{'lineOut':modelStatus===1}">
          <div class='statusOn' :class="{'statusOut':modelStatus===1}">1</div>
        </div>
        <div class='lineOn' :class="{'lineOut':modelStatus===2}">
          <div class='statusOn' :class="{'statusOut':modelStatus===2}">2</div>
        </div>
        <div class='lineOn' :class="{'lineOut':modelStatus===3}">
          <div class='statusOn' :class="{'statusOut':modelStatus===3}">3</div>
        </div>
      </div>
      <div id='statusText'>
        <ul class="shareSteptxt" style="font-size: 12px">
          <li :class="{'onstep':modelStatus===1}">提交分享</li>
          <li :class="{'onstep':modelStatus===2}">审核文件</li>
          <li :class="{'onstep':modelStatus===3}">发布成功</li>
        </ul>
      </div>
      <div class="releaseIn-margin-top">
      </div>
      <div class="releaseIn">
        <span class="skin-title" @click="clickSkinOrPlug('skin',true)" :class="{'active':shareActive=='skin'}">模板</span>
        <span class="plug-title" @click="clickSkinOrPlug('plug',true)" :class="{'active':shareActive=='plug'}">插件</span>
      </div>
      <form class="form-horizontal" id="upgraderVersion" :class="{'block':shareActive == 'skin'}">
        <input type="hidden" name="upgraderVersionType" id="upgraderVersionType" v-model="upgraderVersionType">
        <input type="hidden" name="mail_code" value="share" />
        <input type="hidden" name="projectUpgraderVersionId" id="projectUpgraderVersionId" />
        <input type="hidden" name="projectPeopleId" />
        <div class="form-group ms-set-height">
          <label class="col-sm-2 control-label">
            <span v-if="shareActive=='skin'">模板</span>
            标题</label>
          <div class="col-sm-5">
            <input type="text" v-if="shareActive=='skin'" class="form-control" maxlength="20" name="upgraderVersionName" placeholder="必填，1-20个字符长度"
              required data-bv-notempty-message="必填" data-bv-stringLength-message="1-20个字符长度">
            <input :value='uvMenu[0].modelTitle' @input="changeTitle($event.target.value)" type="text" v-else class="form-control none"
              :class="{'block':shareActive == 'plug'}" maxlength="20" name="upgraderVersionName" placeholder="必填，1-20个字符长度"
              required data-bv-notempty-message="必填" data-bv-stringLength-message="1-20个字符长度">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label ">
            <span tabindex="0" class="glyphicon glyphicon-question-sign ms-up-input-file" v-on:mouseout="showPopover('skinPopover')"
              v-on:mouseover="showPopover('skinPopover')"></span>
            <div class="ms-prompt-img" id="skinPopover">
              <ul>
                <li class="ms-prompt-img-head">
                  提示
                </li>
                <li class="ms-prompt-img-centent">
                  图片文件最大为3MB
                </li>
              </ul>
            </div>

            <span v-show="shareActive=='skin'">首页</span>
            缩略图
          </label>
          <div class="col-sm-10">
            <div class="submit_img" id="browse">添加图片</div>
          </div>
        </div>
        <div class="form-group none ms-set-height" :class="{'block':shareActive == 'skin'}">
          <label class="col-sm-2 control-label">是否有手机端</label>
          <div class="col-sm-10">
            <label class="radio-inline" @click="mobileImg('yes')">
              <input type="radio" name="mobileImg" value="1">是
            </label>
            <label class="radio-inline" @click="mobileImg('no')">
              <input type="radio" name="mobileImg" value="0" checked="checked">否
            </label>
          </div>
        </div>
        <div class="form-group none" :class="{'block':shareActive == 'skin'&&hasMobileImg}">
          <label class="col-sm-2 control-label">
            <span tabindex="0" class="glyphicon glyphicon-question-sign ms-up-input-file" v-show="shareActive=='skin'" v-on:mouseout="showPopover('skinMobilePopover')"
              v-on:mouseover="showPopover('skinMobilePopover')"></span>
            <div class="ms-prompt-img" id="skinMobilePopover">
              <ul>
                <li class="ms-prompt-img-head">
                  提示
                </li>
                <li class="ms-prompt-img-centent">
                  图片文件最大为3MB
                </li>
              </ul>
            </div>
            上传手机端首页图
          </label>
          <div class="col-sm-10">
            <div class="submit_img" id="mobileImg">添加图片</div>
          </div>
        </div>
        <div class="form-group ms-set-height" id="upgraderVersionPrice">
          <label for="upgraderVersionPrice" class="col-sm-2 control-label">赞助费</label>
          <div class="col-sm-2">
            <label class="radio-inline" @click="radioInline('free')">
              <input type="radio" name="free" value="0" checked="checked"> 免费
            </label>
            <label class="radio-inline" @click="radioInline('noFree')">
              <input type="radio" name="free" value="1" class="is_VersionPrice"> 收费
            </label>
          </div>
          <div class="col-sm-3 none" :class="{'block':priceShow == 'price'}">
            <input type="text" class="form-control" maxlength="4" name="upgraderVersionPrice" v-model="price" placeholder="必填，100-9000，整数"
              id="upgraderVersionPriceInput" required data-bv-notempty-message="必填" />
          </div>
        </div>
        <div class="form-group ms-set-height skin none" id="upgraderVersionOriginal" :class="{'block':shareActive == 'skin'}">
          <label for="upgraderVersionOriginal" class="col-sm-2 control-label">是否原创</label>
          <div class="col-sm-2">
            <label class="radio-inline" @click="radioInline('original')">
              <input type="radio" name="upgraderVersionOriginal" value="0" checked="checked" id="upgraderVersionOriginal">是
            </label>
            <label class="radio-inline" @click="radioInline('unoriginal')">
              <input type="radio" name="upgraderVersionOriginal" value="1" class="is_VersionOriginal"> 否
            </label>
          </div>
          <div class="col-sm-4 none ms-input-i" :class="{'block':urlShow == 'url'}">
            <input type="url" class="form-control" name="upgraderVersionOriginalRefer" id="upgraderVersionOriginalRefer" v-model="href"
              placeholder="必填，仅正确的Url格式网址" data-bv-uri-message="仅正确的Url格式网址" required data-bv-notempty-message="必填" />
          </div>
        </div>
        <!--项目信息-->

        <div class="form-group skin none" :class="{'block':shareActive == 'skin'}">
          <label class="col-sm-2 control-label">
            <span tabindex="0" class="glyphicon glyphicon-question-sign ms-up-input-file" v-on:mouseout="showPopover('plugPopover')"
              v-on:mouseover="showPopover('plugPopover')"></span>
            <div class="ms-prompt-img" id="plugPopover">
              <ul>
                <li class="ms-prompt-img-head">
                  提示
                </li>
                <li class="ms-prompt-img-centent">
                  <p v-show="shareActive=='plug'">具体参考
                    <a href="https://mingsoft-net.gitbooks.io/ms-upgrade/content/ben-di-ce-shi.html" target="_blank">MS-升级包编写流程</a>
                  </p>
                  压缩包最大为10M,格式为zip
                </li>
              </ul>
            </div>
            上传
            <span v-show="shareActive=='skin'">模板</span>
            <span v-show="shareActive=='plug'">插件</span>
          </label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-default" id="exampleInputFile">选择
              <span v-show="shareActive=='skin'">模板</span>
            </button>
          </div>
        </div>
        <div class="form-group plug none" :class="{'block':shareActive == 'plug'}">
          <label class="col-sm-2 control-label">
            源码压缩包
          </label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-default" id="zipUrl">选择ZIP文件夹
            </button>
          </div>
        </div>
        <div class="form-group plug none" :class="{'block':shareActive == 'plug'}">
          <label class="col-sm-2 control-label">
            SQL
          </label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-default" id="upSql">选择SQL文件
            </button>
          </div>
        </div>
        <div class="form-group plug none" :class="{'block':shareActive == 'plug'}">
          <label class="col-sm-2 control-label">
            升级器
          </label>
          <div class="col-sm-10">
            <button type="button" class="btn btn-default" id="upgraderVersionUpgraderZipUrl">选择class文件
            </button>
          </div>
        </div>
        <div class="form-group plug none" :class="{'block':shareActive == 'plug'}">
          <label class="col-sm-2 control-label">
            菜单

          </label>
          <div class="col-sm-10">
            <input name="uvMenu" type="hidden" v-model='uvMenu'>
            <div class="col-sm-10" style="padding-left: 0px">
              <table id="modelList" data-show-export="true" data-method="get" data-side-pagination="server">
              </table>
            </div>
          </div>


        </div>
        <!--<div class="form-group none" :class="{'block':shareActive == 'plug'}">
                                <label class="col-sm-2 control-label">
                           			菜单树形结构
                                </label>
                                <div class="col-sm-9">
        													<ul id="ms-ztree" class="ztree"></ul>
                                </div>
                            </div>-->
        <div class="form-group">
          <label for="upgraderVersionDescription" class="col-sm-2 control-label">
            简介</label>
          <div class="col-sm-9">
            <textarea style="height:90px;" v-if="shareActive=='skin'" class="form-control" rows="3" maxlength="200" placeholder="必填，15-200个字符长度"
              name="upgraderVersionDescription" required data-bv-notempty-message="必填" data-bv-stringlength="true" data-bv-stringlength-max="200"
              data-bv-stringlength-min="15" data-bv-stringlength-message="15-200个字符长度"></textarea>
            <textarea style="height:90px;" v-else class="form-control none" :class="{'block':shareActive == 'plug'}" rows="3" maxlength="200"
              placeholder="必填，15-200个字符长度" name="upgraderVersionDescription" required data-bv-notempty-message="必填" data-bv-stringlength="true"
              data-bv-stringlength-max="200" data-bv-stringlength-min="15" data-bv-stringlength-message="15-200个字符长度"></textarea>
          </div>
        </div>
        <div class="form-group plug none has-feedback" :class="{'block':shareActive == 'plug'}">
          <label class="col-sm-2 control-label">详情</label>
          <script id="editorTask" class="ms-task-info-input col-sm-10" type="text/plain" style="display: inline-block;overflow: hidden;"></script>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="button" class="btn btn-primary submit_share_skin" @click="submitShareSkin" v-text="shareText" style="width: 90px;height: 34px;">提交</button>
          </div>
        </div>
      </form>
      <form id="fromHref" method="post" :action="fromHref"></form>
    </div>
  </div>
</template>
<style scoped></style>
<script>
  $(function () {
    $("[data-toggle='popover']").popover({ html: true });
  });

  var vueShare;
  var ztreeDate;
  import bus from "../../assets/js/eventBus";
  //http://localhost:8080/templets/86/cms//js/mstore.mstore.js
  export default {
    name: "peopleShare",
    data() {
      return {
        shareActive: "skin", //显示模板或插件
        upgraderVersionType: 2, //分享类型，1为模板，2为插件
        shareText: "提交", //提交按钮文字
        priceShow: "", //显示赞助金额
        urlShow: "", //显示仿站地址
        price: "", //赞助金额
        href: "", //仿站地址
        fromHref: "", //链接地址
        hasMobileImg: false, //是否显示上传手机端图片按钮
        upgraderVersionReadme: "",
        modelStatus: 1,//模板审核状态 1：提交分享 2：审核文件 3：发布成功
        menuIndex: 1,
        uvMenu: [
          {
            "modelIcon": "&#xe971;",
            "modelId": 1,
            "modelModelId": null,
            "modelLv": 1,
            "modelTitle": "支付交易",
            "modelUrl": null
          }
        ]
      };
    },
    methods: {
      //手机端切换
      mobileImg(type) {
        if (type == "yes") {
          this.hasMobileImg = true;
        } else {
          this.hasMobileImg = false;
          $("input[name=upgraderVersionMobileImg]").val("");
          $("input[name=upgraderVersionMobileImg]")
            .next()
            .find("span")
            .trigger("click"); //删除保存的图片
        }
      },
      //弹出框的显示/隐藏
      showPopover(id) {
        if ($("#" + id).is(":hidden")) {
          $("#" + id).show();
        } else {
          $("#" + id).hide();
        }
      },
      //选择分享模板或插件
      clickSkinOrPlug(type, temp) {
        var title = "";
        var checkTitle = "";
        //清空表单
        if (type == "skin") {
          title = ".skin-title";
          checkTitle = ".plug-title";
        } else {
          title = ".plug-title";
          checkTitle = ".skin-title";
        }
        if (
          !$(title).hasClass("active") &&
          $(checkTitle).hasClass("active") &&
          temp
        ) {
          $("#upgraderVersion").bootstrapValidator({
            feedbackIcons: {
              valid: "glyphicon glyphicon-ok",
              invalid: "glyphicon glyphicon-remove",
              validating: "glyphicon glyphicon-refresh"
            },
            fields: {
              upgraderVersionPrice: {
                validators: {
                  between: {
                    min: 100,
                    max: 9000,
                    message: "100-9000，整数"
                  }
                }
              }
            }
          });
          //切换时清空数据
          $("#upgraderVersion")[0].reset();
          $("#upgraderVersion")
            .data("bootstrapValidator")
            .resetForm();
          this.hasMobileImg = false;
          this.urlShow = false;
          this.priceShow = false;
          this.price = "";
          this.href = "";
          $("input[name=upgraderVersionImg]")
            .next()
            .find("span")
            .trigger("click"); //切换时删除保存的图片和文件
          $("input[name=upgraderVersionZipUrl]")
            .next()
            .find("span")
            .trigger("click");
        }
        this.shareActive = type;
        if (type == "skin") {
          this.upgraderVersionType = 2;
        } else {
          this.upgraderVersionType = 1;
        }
      },
      //是否原创或是否免费
      radioInline(type) {
        if (type == "noFree") {
          this.priceShow = "price";
        } else if (type == "free") {
          this.priceShow = "";
          this.price = "";
          $("#upgraderVersion")
            .data("bootstrapValidator")
            .updateStatus("upgraderVersionPrice", "NOT_VALIDATED", null);
        } else if (type == "unoriginal") {
          this.urlShow = "url";
        } else {
          this.urlShow = "";
          this.href = "";
          $("#upgraderVersion")
            .data("bootstrapValidator")
            .updateStatus("upgraderVersionOriginalRefer", "NOT_VALIDATED", null);
        }
      },
      //提交分享
      submitShareSkin() {
        $("#upgraderVersion").bootstrapValidator({
          feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
          },
          fields: {
            upgraderVersionPrice: {
              validators: {
                between: {
                  min: 100,
                  max: 9000,
                  message: "100-9000，整数"
                }
              }
            }
          }
        });
        var valid = $("#upgraderVersion")
          .data("bootstrapValidator")
          .validate()
          .isValid();
        if (valid) {
          var target = this;
          target.fromHref = mstore.getBaseUrl() + "/html/86/index.html#/"; //跳转地址
          //验证
          var upgraderImg = $("input[name='upgraderVersionImg']").val();
          var upgraderZipUrl = $("input[name='upgraderVersionZipUrl']").val();
          var zipUrl = $("input[name='zipUrl']").val();
          var upSql = $("input[name='upSql']").val();
          var upgraderVersionUpgraderZipUrl = $("input[name='upgraderVersionUpgraderZipUrl']").val();
          var upgraderMobileImg = $(
            "input[name='upgraderVersionMobileImg']"
          ).val();
          if (mstore.isEmpty(upgraderImg)) {
            mstore.alert("请上传缩略图");
            return;
          }
          if (mstore.isEmpty(upgraderZipUrl)&&upgraderVersionType===2) {
            mstore.alert("请上传文件");
            return;
          }
          if (mstore.isEmpty(zipUrl)&&upgraderVersionType===1) {
            mstore.alert("请上源码压缩包");
            return;
          }
          if (mstore.isEmpty(upSql)&&upgraderVersionType===1) {
            mstore.alert("请上Sql文件");
            return;
          }
          if (mstore.isEmpty(upgraderVersionUpgraderZipUrl)&&upgraderVersionType===1) {
            mstore.alert("请上class文件");
            return;
          }
          if (
            mstore.isEmpty(upgraderMobileImg) &&
            this.hasMobileImg == true &&
            this.upgraderVersionType == 2
          ) {
            mstore.alert("请上传手机端缩略图");
            return;
          }
          $(".submit_share_skin").attr("disabled", true);
          this.shareText = "提交中...";
          //新建一个数组保存数据
          //                      if(this.upgraderVersionType == 1){
          //                      	var temp = ztreeDate.getNodes();
          //			                    function fun(data){
          //			                    	for(i=0;i<data.length;i++){
          //			                    		data[i] = Object.assign({},data[i],$("#"+data[i].tId +">a>.ms-share-zTree-input").serializeObject());
          //			                    		if(data[i].modelChildList != undefined){
          //			                    			fun(data[i].modelChildList);
          //			                    		}
          //			                    	}
          //			                    	return data;
          //			                    }
          //		                    	temp[0].modelChildList = fun(temp[0].modelChildList);
          //                      }
          //                        +((this.upgraderVersionType == 1)? ("&uvMenu="+JSON.stringify(temp[0].modelChildList)):'')
          //console.log(JSON.stringify(mstore.turnJson($("#upgraderVersion").serialize())))
          //var newJsonData = JSON.stringify(mstore.turnJson($("#upgraderVersion").serialize()))
          var newDataJson = mstore.turnJson($("#upgraderVersion").serialize())
          newDataJson=JSON.parse(decodeURIComponent(JSON.stringify(newDataJson)))
          console.log(newDataJson)
          mstore.people.people.save(newDataJson, json => {
            if (json.result != null) {
              mstore.alert(json.resultMsg + " !");
              target.shareText = "提交";
            } else {
              $("#projectUpgraderVersionId").val(json.upgraderVersionId);
              target.shareText = "提交";
              mstore.alert("分享申请成功，管理员将在1-2个工作日之内审核");
              //$("#fromHref").submit();
            }
            $(".submit_share_skin").attr("disabled", false);
          });
        }
      },
      deleteModel(e, value, row, index) { 
        var target = this;
        if (row.modelLv === 3) {
          target.uvMenu.splice(index, 1);
          $("#modelList").bootstrapTable("load", target.uvMenu);
          return;
        }
        if (row.modelLv === 2) {
          for (var i = target.uvMenu.length - 1; i >= 0; i--) {
            if (target.uvMenu[i].modelModelId == row.modelId || target.uvMenu[i].modelId == row.modelId) {
              target.uvMenu.splice(i, 1);
            }
          }
          $("#modelList").bootstrapTable("load", target.uvMenu);
          return;
        }
      },
      addModel(e, value, row, index) {
        var target = this;
        target.menuIndex += 1;
        var newModel = {
          "modelIcon": "",
          "modelId": "",
          "modelModelId": "",
          "modelLv": "",
          "modelParentIds": "",
          "modelTitle": " ",
          "modelUrl": ""
        };
        newModel.modelId = target.menuIndex;
        newModel.modelModelId = row.modelId;
        if (row.modelLv === 2) {
          newModel.modelLv = 3;
        }
        if (row.modelLv === 1) {
          newModel.modelLv = 2;
        }
        target.uvMenu.push(newModel);
        $("#modelList").bootstrapTable("load", target.uvMenu);
      },
      changeTitle(str) {
        var target = this;
        $("#modelList").bootstrapTable("load", target.uvMenu);
        console.log(target.uvMenu);
      }
    },
    mounted() {
      //副文本加载
      var editor = null;
      var target = this;
      window.deleteModel = {
        "click .delete": target.deleteModel,
        "click .add": target.addModel
      };
      $("#modelList").bootstrapTable({
        data: target.uvMenu,
        contentType: "application/x-www-form-urlencoded",
        idField: "modelId",
        treeShowField: "modelTitle",
        parentIdField: "modelModelId",
        columns: [
          {
            field: "modelIcon",
            title: "模块图标",
            align: "center",
            formatter: function (value, row, index) {
              if (value != null) {
                return "<i class='iconfont'>" + value + "</i>";
              } else {
                return "";
              }
            }
          },
          {
            field: "modelTitle",
            title: "模块标题",
            align: "center",
            editable: true
          },
          {
            field: "modelUrl",
            title: "模块连接地址",
            align: "center",
            editable: true,
            formatter: function (value, row, index) {
              if (value == null) {
                return " ";
              } else {
                return value;
              }
            }
          },
          {
            field: "modelIsMenu",
            title: "操作",
            align: "center",
            events: deleteModel,
            formatter: function (value, row, index) {
              if (row.modelLv === 1) {
                return [
                  '<button  type="button" class="btn btn-default add">新增子菜单</button>&nbsp;&nbsp;',
                  '<button  type="button" class="btn btn-default delete">删除</button>'
                ].join("");
              } else if (row.modelLv === 2) {
                return [
                  '<button type="button" class="btn btn-default add">新增权限</button>&nbsp;&nbsp;',
                  '<button type="button" class="btn btn-default delete">删除</button>'
                ].join("");
              } else if (row.modelLv === 3) {
                return [
                  '<button type="button" class="btn btn-default delete">删除</button>'
                ];
              }
            }
          }
        ]
      });
      var URL =
        window.UEDITOR_HOME_URL ||
        "http://mpm.mingsoft.net/static/plugins/ueditor/1.4.3.1/";
      if (editor == null) {
        editor = UE.getEditor("editorTask", {
          toolbars: [
            [
              "fullscreen",
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "removeformat",
              "blockquote",
              "|",
              "forecolor",
              "backcolor",
              "insertorderedlist",
              "insertunorderedlist",
              "|",
              "attachment",
              "simpleupload",
              "link"
            ]
          ],
          imageScaleEnabled: true,
          // 服务器统一请求接口路径
          serverUrl:
            URL +
            "jsp/msController.jsp?jsonConfig=%7BvideoUrlPrefix:'http://mpm.mingsoft.net/',fileUrlPrefix:'http://mpm.mingsoft.net/',imageUrlPrefix:'http://mpm.mingsoft.net/',imagePathFormat:'/upload/pm/editor/%7Btime%7D',filePathFormat:'/upload/pm/editor/%7Btime%7D',videoPathFormat:'/upload/pm/editor/%7Btime%7D'%7D",
          autoHeightEnabled: true,
          autoFloatEnabled: true,
          scaleEnabled: false,
          compressSide: 0,
          maxImageSideLength: 2000,
          maximumWords: 80000,
          zIndex: 10000,
          elementPathEnabled: false,
          wordCount: false,
          initialFrameWidth: 693
        });
        editor.ready(function () {
          editor.setHeight(200);
          var a = $("#ueditor_0").contents()[0].activeElement;
          $(a)
            .addClass("ms-webkit-scrollbar")
            .before(
              "<style>.ms-webkit-scrollbar::-webkit-scrollbar,::-webkit-scrollbar{width:10px;/*滚动条宽度*/height:1.5%;/*滚动条高度*/}/*定义滚动条轨道内阴影+圆角*/.ms-webkit-scrollbar::-webkit-scrollbar-track,::-webkit-scrollbar-track{border-radius:10px;/*滚动条的背景区域的圆角*/background-color:#eeeeee;/*滚动条的背景颜色*/}.ms-task-content::-webkit-scrollbar-track{border-radius:10px;background-color:#FFFFFF;}/*定义滑块内阴影+圆角*/.ms-webkit-scrollbar::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb{border-radius:10px;/*滚动条的圆角*/background-color:#dddddd;/*滚动条的背景颜色*/}</style>"
            );
        });
      }
      bus.$on("shareActive", data => {
        if (data.upgraderVersionType === 2) {
          shareActive = "skin";
        } else if (data.upgraderVersionType === 1) {
          shareActive = "plug";
        }
      });
      // if ('{upgraderVersionType/}' == '1') {
      //     this.clickSkinOrPlug('plug', false);
      // }
      //初始化上传控件
      upload.init("browse", "upgraderVersionImg", "/upload/mstore/", {
        domClass: "display-img",
        size: "3000",
        afterMsg: "添加图片"
      });
      upload.init("mobileImg", "upgraderVersionMobileImg", "/upload/mstore/", {
        domClass: "display-img",
        size: "3000",
        afterMsg: "添加手机端图片"
      });
      upload.init(
        "exampleInputFile",
        "upgraderVersionZipUrl",
        "/WEB-INF/mstore/mb/",
        {
          domClass: "display-zip",
          type: "file",
          size: "10000",
          afterMsg: "上传文件",
          afterDom: "hide",
          success: function () {
            $(".display-zip b").hide();
            var url = $("input[name=upgraderVersionZipUrl]").val();
            $(".display-zip b").text(url);
            $(".display-zip b").show();
          }
        }
      );
      upload.init("zipUrl", "zipUrl", "/upload/mstore/", {
        domClass: "display-zip",
        type: "file",
        size: "3000",
        afterMsg: "源码压缩包",
        afterDom: "hide",
        success: function () {
            $(".display-zip b").hide();
            var url = $("input[name=zipUrl]").val();
            $(".display-zip b").text(url);
            $(".display-zip b").show();
          }
      });
      upload.init("upSql", "upSql", "/upload/mstore/", {
        domClass: "display-zip",
        type: "file",
        size: "3000",
        afterMsg: "SQL",
        afterDom: "hide",
        success: function () {
            $(".display-zip b").hide();
            var url = $("input[name=upSql]").val();
            $(".display-zip b").text(url);
            $(".display-zip b").show();
          }
      });
      upload.init(
        "upgraderVersionUpgraderZipUrl",
        "upgraderVersionUpgraderZipUrl",
        "/upload/mstore/",
        {
          domClass: "display-zip",
          type: "file",
          size: "3000",
          afterMsg: "升级器",
          afterDom: "hide",
          success: function () {
            $(".display-zip b").hide();
            var url = $("input[name=upgraderVersionUpgraderZipUrl]").val();
            $(".display-zip b").text(url);
            $(".display-zip b").show();
          }
        }
      );
      //初始化树形
      //ztreeDate = $.fn.zTree.init($("#ms-ztree"), setting, zNodes);
    }
  };
  /*前端验证赞助金额有效值*/
  $(".fill_VersionPrice").bootstrapValidator({});

  //定义树形的配置
  var setting = {
    view: {
      addHoverDom: addHoverDom,
      removeHoverDom: removeHoverDom,
      selectedMulti: false,
      addDiyDom: addDiyDom
    },
    edit: {
      enable: true,
      editNameSelectAll: true,
      showRemoveBtn: showRemoveBtn,
      showRenameBtn: showRenameBtn
    },
    data: {
      simpleData: {
        enable: true
      }
    },
    callback: {
      beforeDrag: beforeDrag,
      beforeEditName: beforeEditName,
      beforeRemove: beforeRemove,
      beforeRename: beforeRename,
      onRemove: onRemove,
      onRename: onRename
    }
  };

  //定义树形的基本
  var zNodes = [
    {
      id: 1,
      pId: 0,
      name: "根节点",
      open: true
    }
  ];

  //以下为树形增删改的方法
  var log,
    className = "dark";

  function beforeDrag(treeId, treeNodes) {
    return false;
  }
  function addDiyDom(treeId, treeNode) {
    if (treeNode.parentNode && treeNode.parentNode.id != 2) return;
    var aObj = $("#" + treeNode.tId + "_a");
    var editStr =
      "<form class='ms-share-zTree-input'><input name='modelCode' /> <input name='modelTitle' /> <input name='modelIsMenu' /> <input name='modelUrl' /></form>";
    aObj.append(editStr);
    var btn = $("#diyBtn_" + treeNode.id);
    if (btn) btn.bind("click", function () { });
  }
  function beforeEditName(treeId, treeNode) {
    className = className === "dark" ? "" : "dark";
    showLog(
      "[ " +
      getTime() +
      " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " +
      treeNode.name
    );
    var zTree = $.fn.zTree.getZTreeObj("ms-ztree");
    zTree.selectNode(treeNode);
    setTimeout(function () {
      setTimeout(function () {
        zTree.editName(treeNode);
      }, 0);
    }, 0);
    return false;
  }

  function beforeRemove(treeId, treeNode) {
    className = className === "dark" ? "" : "dark";
    showLog(
      "[ " +
      getTime() +
      " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
      treeNode.name
    );
    var zTree = $.fn.zTree.getZTreeObj("ms-ztree");
    zTree.selectNode(treeNode);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
  }

  function onRemove(e, treeId, treeNode) {
    showLog(
      "[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name
    );
  }

  function beforeRename(treeId, treeNode, newName, isCancel) {
    className = className === "dark" ? "" : "dark";
    showLog(
      (isCancel ? "<span style='color:red'>" : "") +
      "[ " +
      getTime() +
      " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
      treeNode.name +
      (isCancel ? "</span>" : "")
    );
    if (newName.length == 0) {
      setTimeout(function () {
        var zTree = $.fn.zTree.getZTreeObj("ms-ztree");
        zTree.cancelEditName();
        alert("节点名称不能为空.");
      }, 0);
      return false;
    }
    return true;
  }

  function onRename(e, treeId, treeNode, isCancel) {
    showLog(
      (isCancel ? "<span style='color:red'>" : "") +
      "[ " +
      getTime() +
      " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
      treeNode.name +
      (isCancel ? "</span>" : "")
    );
  }

  function showRemoveBtn(treeId, treeNode) {
    return !treeNode.isFirstNode;
  }

  function showRenameBtn(treeId, treeNode) {
    return !treeNode.isLastNode;
  }

  function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
      log.get(0).removeChild(log.children("li")[0]);
    }
  }

  function getTime() {
    var now = new Date(),
      h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds(),
      ms = now.getMilliseconds();
    return h + ":" + m + ":" + s + " " + ms;
  }

  var newCount = 1;

  function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr =
      "<span class='button add' id='addBtn_" +
      treeNode.tId +
      "' title='add node' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn)
      btn.bind("click", function () {
        var zTree = $.fn.zTree.getZTreeObj("ms-ztree");
        zTree.addNodes(treeNode, {
          id: 100 + newCount,
          pId: treeNode.id,
          name: "节点"
        });
        return false;
      });
  }

  function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId)
      .unbind()
      .remove();
  }
</script>
<style>
  @media (min-width: 768px) {
    .form-horizontal .control-label {
      padding-top: 6px;
    }
  }

  .ms-input-i i {
    right: 15px;
  }

  .form-horizontal .form-group {
    min-height: 34px;
  }

  .form-horizontal .editable {
    padding-top: 0;
    display: inline-block;
  }

  .add,
  .delete {
    border: none;
    padding: 0;
    background: none;
  }

  .add:hover,
  .delete:hover {
    background-color: #f5f5f5;
  }

  .iconfont {
    font-size: 1rem;
  }
</style>