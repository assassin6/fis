<template>
	<div class="ms-user-share ms-position-relative">
		<p class="ms-list-new-title">分享达人</p>
		<ul class="ms-user-list">
			<div class="ms-loading ms-height" v-show="loading" style="display: none;"></div>
			<template v-for="(item,index) in computeList">
				<li class="ms-user-share-list ms-fl" v-if="index < 25">
					<img v-if="item.upgraderOrderPeopleNickName != '匿名'" :src="item.upgraderVersionPeopleIcon" onerror="this.src='http://cdn.mingsoft.net/global/images/msheader.png'"
					/>
					<img v-else src='http://cdn.mingsoft.net/global/images/msheader.png' />
					<p class="ms-fl">{{item.upgraderVersionPeopleName}}</p>
				</li>
			</template>
		</ul>
		<div class="ms-drop-down-button" @click="peopleList.showPeopleList(shareList,'share')">
			<span class="glyphicon glyphicon-resize-vertical"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SharePeopleList',
		data() {
			return {
				loading: true,
				shareList: [], //列表
			}
		},
		computed: {
			computeList: function () {
				return this.shareList.filter(function (people) {
					var icon = people.upgraderVersionPeopleIcon.split('/');
					if (icon[2] == "ms.ming-soft.com") {
						people.upgraderVersionPeopleIcon = "http://cdn.mingsoft.net/global/images/msheader.png";
					}
					return people
				})
			}
		},
		beforeMount: function () { //加载执行
			var target = this;
			mmstore.mstore.topShareUser(function (data) { //赞助者信息
				target.shareList = data;
				target.loading = false;
			});
		}
	}
</script>