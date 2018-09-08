<template>
	<div id="app">
		<div id="head"></div>
		<div class="user_center">
			<people-menu></people-menu>
			<div class="user_centent">
				<!--个人中心内容部分头部固定数据-->
				<people-data></people-data>
				<!--更新提示-->
				<router-view />
			</div>
		</div>
		<div id="footer"></div>
	</div>
</template>
<!-- <form id="upgraderVersionForm" method="post">
	<input type="hidden" name="projectId" v-model="vueCenter.projectId" />
	<input type="hidden" name="projectUpgraderVersionId" v-model="vueCenter.projectUpgraderVersionId" />
</form> -->
<script>
	import peopleData from './Data.vue'
	import peopleMenu from './Menu.vue'
	//from check-login.htm
	$(function () {
		/*我要分享的步奏宽度分布*/
		var stepLi = $(".shareSteptxt li").length;
		$(".shareSteptxt li").width(858 / stepLi + "px");
		/*左侧菜单选中样式的添加*/
		var url = window.location.href;
		if (url.indexOf("share") > 0) {
			$(".user_sharemenu").addClass("user_menuOn");
		} else if (url.indexOf("bindEmail") > 0) {
			$(".user_peopleInfoMenu").addClass("user_menuOn");
		} else if (url.indexOf("mcode") > 0) {
			$(".user_mcodeMenu").addClass("user_menuOn");
		}
		// ms.load(["ms", "ms.people"], function (ms, people) {
		// 	//确认是否登录，没有登录则退到首页
		// 	people.checkLoginStatus(function (json) {
		// 		if (!json.result) {
		// 			location.href = ms.base + "/mbbs/main.do";
		// 		}
		// 	});
		// });
	});

	export default {
		components: {
			'people-data': peopleData,
			'people-menu': peopleMenu
		},
		name: "Center"
	};
</script>
<style>
	@import "../../assets/less/user.center.css";
</style>