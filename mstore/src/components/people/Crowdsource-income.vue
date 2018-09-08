<template>
	<div class="user_cententbody" id="vue-income">
		<!--我的收益订单-->
		<div class="user_cententbodynav">我的众包收益</div>
		<div class="alert alert-info listNone" role="alert" style="display: none;">
			<p>很遗憾！您暂时还没参加过平台众包项目，所以您只有 0 RMB</p>
			<p>温馨提示：相信高手都在人间，团结程序猿们的力量，想参加众包请关注开发者社区的众包板块。</p>
		</div>
	</div>
</template>
<script>
	export default {
		name: "peopleIncome",
		data() {
			return{

			}
		},
		//提示淡入淡出
		mounted: function () {
			$(".listNone").fadeIn();
		}
	}
</script>