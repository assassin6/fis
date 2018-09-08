<template>
	<div class="user_cententbody" id="vue-share-upgrader">
		<div class="loading-pic" v-show="loading"></div>
		<div v-show="!loading" style="display:none">
			<!--我要发布-->
			<div class="user_cententbodynav">
				发布更新
				<p class="tip">提示：发布更新需提交审核才能正式发布，请耐心等待。</p>
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
                <li :class="{'onstep':modelStatus===1}">上传新版</li>
                <li :class="{'onstep':modelStatus===2}">审核申请</li>
                <li :class="{'onstep':modelStatus===3}">发布成功</li>
            </ul>
          </div>
				<form class="form-horizontal" name="upgraderVersionForm">
					<div class="form-group">
						<label class="col-sm-2 control-label">
							<span v-show="detail.upgraderVersionType == 2">模板</span>
							<span v-show="detail.upgraderVersionType == 1">插件</span>标题</label>
						<div class="col-sm-10">
							<p class="form-control-static upgrader_version_name" v-text="detail.upgraderVersionName"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">赞助费</label>
						<div class="col-sm-10">
							<p class="form-control-static upgrader_version_price" v-text="price"></p>
						</div>
					</div>
					<div class="form-group" v-show="detail.upgraderVersionType == 2">
						<label class="col-sm-2 control-label">是否原创</label>
						<div class="col-sm-10">
							<p class="form-control-static upgrader_version_original" v-text="original"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">
							<span tabindex="0" class="glyphicon glyphicon-question-sign ms-up-input-file" v-on:mouseout="showPopover('skinPopover')"
							 v-on:mouseover="showPopover('skinPopover')"></span>
							<div class="ms-prompt-img" id="skinPopover">
								<ul>
									<li class="ms-prompt-img-head">
										提示
									</li>
									<li class="ms-prompt-img-centent">
										图片文件最大为3M
									</li>
								</ul>
							</div>
							上传
							<span v-show="detail.upgraderVersionType == 2">首页</span>
							<span v-show="detail.upgraderVersionType == 1">插件</span>图
						</label>
						<div class="col-sm-10">
							<input type="hidden" value="" name="upgraderVersionImg">
							<div class="display-img" v-if="displayImgIf">
								<span @click="delImg('img')">删除</span>
								<img src="" :src="displayImg">
							</div>
							<div class="submit_img" id="browse" style="z-index: 1;">添加图片</div>
						</div>
					</div>
					<div class="form-group" v-show="detail.upgraderVersionMobileImg != undefined && detail.upgraderVersionType == 2 && detail.upgraderVersionMobileImg != ''">
						<label class="col-sm-2 control-label">
							<span tabindex="0" class="glyphicon glyphicon-question-sign ms-up-input-file" v-on:mouseout="showPopover('skinMobilePopover')"
							 v-on:mouseover="showPopover('skinMobilePopover')"></span>
							<div class="ms-prompt-img" id="skinMobilePopover">
								<ul>
									<li class="ms-prompt-img-head">
										提示
									</li>
									<li class="ms-prompt-img-centent">
										图片文件最大为3M
									</li>
								</ul>
							</div>
							上传手机缩略图
						</label>
						<div class="col-sm-10">
							<input type="hidden" value="" name="upgraderVersionMobileImg">
							<div class="display-img" v-if="displayMobileImgIf">
								<span @click="delImg('MobileImg')">删除</span>
								<img src="" :src="detail.upgraderVersionMobileImg">
							</div>
							<div class="submit_img" id="mobileImg" style="z-index: 1;">添加图片</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">
							<span tabindex="0" class="glyphicon glyphicon-question-sign ms-up-input-file" v-on:mouseout="showPopover('plugPopover')"
							 v-on:mouseover="showPopover('plugPopover')"></span>
							<div class="ms-prompt-img" id="plugPopover">
								<ul>
									<li class="ms-prompt-img-head">
										提示
									</li>
									<li class="ms-prompt-img-centent">
										<p v-show="detail.upgraderVersionType == 1">具体参考
											<a href="https://mingsoft-net.gitbooks.io/ms-upgrade/content/ben-di-ce-shi.html" target="_blank">MS-升级包编写流程</a>
										</p>
										压缩包最大为10M,格式为zip
									</li>
								</ul>
							</div>
							上传
							<span v-show="detail.upgraderVersionType == 2">模板</span>
							<span v-show="detail.upgraderVersionType == 1">插件</span>
						</label>
						<div class="col-sm-10">
							<input type="hidden" value="" name="upgraderVersionZipUrl">
							<div class="display-zip" v-if="displayZipIf">
								<b v-text="displayZip"></b>
								<span @click="delZip">删除</span>
							</div>
							<button type="button" class="btn btn-default hide-default" id="exampleInputFile">选择
								<span v-show="detail.upgraderVersionType == 2">模板</span>
								<span v-show="detail.upgraderVersionType == 1">升级包</span>
							</button>
						</div>
					</div>
					<div class="form-group">
						<label for="upgraderVersionDescription" class="col-sm-2 control-label">
							<span v-show="detail.upgraderVersionType == 2">模板</span>
							<span v-show="detail.upgraderVersionType == 1">插件</span>描述</label>
						<div class="col-sm-9">
							<textarea v-if="detail.upgraderVersionType == 2" v-model="detail.upgraderVersionDescription" class="form-control" style="height:90px;"
							 rows="3" maxlength="200" placeholder="必填，15-200个字符长度" name="upgraderVersionDescription" required data-bv-notempty-message="必填"
							 data-bv-stringlength="true" data-bv-stringlength-max="200" data-bv-stringlength-min="15" data-bv-stringlength-message="15-200个字符长度"></textarea>
							<textarea v-if="detail.upgraderVersionType == 1" v-model="detail.upgraderVersionDescription" class="form-control" style="height:90px;"
							 rows="3" maxlength="200" placeholder="必填，15-200个字符长度" name="upgraderVersionDescription" required data-bv-notempty-message="必填"
							 data-bv-stringlength="true" data-bv-stringlength-max="200" data-bv-stringlength-min="15" data-bv-stringlength-message="15-200个字符长度"></textarea>
						</div>
					</div>
					<div class="form-group plug none has-feedback" :class="{'block':detail.upgraderVersionType == 1}">
						<label class="col-sm-2 control-label">Maven依赖</label>
						<div class="col-sm-9">
							<textarea v-model="detail.upgraderVersionMaven" style="height:280px;" class="form-control" rows="3" maxlength="2000" placeholder="选填，0-2000个字符长度"
							 name="upgraderVersionMaven" data-bv-stringlength="true" data-bv-stringlength-max="2000" data-bv-stringlength-message="0-2000个字符长度"></textarea>
						</div>
					</div>
					<div class="form-group plug none has-feedback" :class="{'block':detail.upgraderVersionType == 1}">
						<label class="col-sm-2 control-label">Readme</label>
						<div class="col-sm-9">
							<textarea v-model="detail.upgraderVersionReadme" style="height:300px;" class="form-control" rows="3" maxlength="2000" placeholder="必填，1-2000个字符长度"
							 name="upgraderVersionReadme" required data-bv-notempty-message="必填" data-bv-stringlength="true" data-bv-stringlength-max="2000"
							 data-bv-stringlength-message="1-2000个字符长度"></textarea>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="button" class="btn btn-primary save_upgrader_version" @click="saveUpgraderVersion" v-text="upgraderText" style="width: 80px;">提交</button>
						</div>
					</div>
				</form>
			</div>
			<form id="fromHref" method="post" :action="fromHref"></form>
		</div>
	</div>
</template>
<script>
	export default {
		name: "peopleShareUpgrader",
		data() {
			return {
				detail: "", //详情
				original: "", //原创模板
				price: "", //模板收费
				upgraderText: "提交", //按钮文字
				displayZip: "", //文件地址
				displayImg: "", //图片地址
				displayImgIf: true, //图片切换
				displayMobileImgIf: true,//手机端图片切换
				displayZipIf: true, //文件切换
				fromHref: "",//链接地址
				loading: true,//加载
				modelStatus:1
			}

		},
		methods: {
			//点击提交
			saveUpgraderVersion() {
				var valid = $(".form-horizontal").data('bootstrapValidator').validate().isValid();
				console.log(valid)
				if (!valid) {
					return;
				}
				var target = this;
				target.fromHref = mstore.getBaseUrl() + "/html/86/index.html#/";
				var btn = event.target;
				//获取到上传图片和文件的内容
				var upgraderImg = $("input[name='upgraderVersionImg']").val();
				var upgraderZipUrl = $("input[name='upgraderVersionZipUrl']").val();
				if (mstore.isEmpty(upgraderImg)) {
					mstore.alert("请上传缩略图");
					return;
				}
				if (mstore.isEmpty(upgraderZipUrl)) {
					mstore.alert("请上传文件");
					return;
				}
				$(btn).attr("disabled", true);
				target.upgraderText = "提交中";
				mstore.people.people.release(target.$route.params.id, $("form[name='upgraderVersionForm']").serialize(),(json)=> {
					target.upgraderText = "提交";
					if (json.result) {
						mstore.alert("提交成功！管理员将在1-2天内审核");
						$("#fromHref").submit();
						location.href = mstore.getBaseUrl() + "/html/86/index.html#/";
					} else {
						mstore.alert(json.resultMsg);
					}
					$(btn).attr("disabled", false);
				});
			},
			//弹出框的显示/隐藏
			showPopover: function (id) {
				if ($("#" + id).is(":hidden")) {
					$("#" + id).show();
				} else {
					$("#" + id).hide();
				}
			},
			//点击删除当前图片
			delImg: function (type) {
				//去掉当前隐藏框内容
				if (type == 'img') {
					$("input[name=upgraderVersionImg]").remove();
					this.displayImgIf = false;
				} else {
					$("input[name=upgraderVersionMobileImg]").remove();
					this.displayMobileImgIf = false;
					$("input[name='upgraderVersionMobileImg']").val("");
				}
			},
			//点击删除当前文件
			delZip: function () {
				//去掉当前隐藏框内容
				$("input[name=upgraderVersionZipUrl]").remove();
				this.displayZipIf = false;
				$("#exampleInputFile").fadeIn();
			},
		},
		mounted: function () {
			this.loading = true;
			upload.init("browse", "upgraderVersionImg", "/upload/mstore/", {
				"domClass": "display-img",
				"size": "3000",
				"afterMsg": "添加图片"
			});
			upload.init("mobileImg", "upgraderVersionMobileImg", "/upload/mstore/", {
				"domClass": "display-img",
				"size": "3000",
				"afterMsg": "添加手机端图片"
			});
			upload.init("exampleInputFile", "upgraderVersionZipUrl", "/WEB-INF/mstore/mb/", {
				"domClass": "display-zip",
				"type": "file",
				"size": "10000",
				"afterMsg": "上传文件",
				"afterDom": "hide",
				success: function () {
					$(".display-zip b").hide();
					var url = $("input[name=upgraderVersionZipUrl]").val();
					$(".display-zip b").text(url);
					$(".display-zip b").show();
				}
			});
			var target = this;
			mstore.people.people.edit(target.$route.params.id, json=>{
				target.detail = JSON.parse(json.resultData)
				if (target.detail.upgraderVersionOriginal == 0) {
					target.original = "原创";
				} else {
					target.original = "仿站 参考地址：" + target.detail.upgraderVersionOriginalRefer;
				}
				if (target.detail.upgraderVersionPrice > 0) {
					target.price = "收费" + target.detail.upgraderVersionPrice + "元";
				} else {
					target.price = "免费分享";
				}
				target.displayZip = target.detail.upgraderVersionZipUrl;
				target.displayImg = target.detail.upgraderVersionImg;
				$("input[name=upgraderVersionZipUrl]").val(target.detail.upgraderVersionZipUrl);
				$("input[name=upgraderVersionImg]").val(target.detail.upgraderVersionImg);
				$("input[name=upgraderVersionMobileImg]").val(target.detail.upgraderVersionMobileImg);
				target.loading = false;
				setTimeout(function () {
					$('.form-horizontal').bootstrapValidator({});
				}, 200);
			})
		},
	}
</script>