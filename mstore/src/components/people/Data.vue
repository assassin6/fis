<template>
	<div class="user_cententdata" id="vue-data">
		<ul>
			<li @click='shared'>
				<div class="data_share" v-text="dataShare" @click='shared'>{{dataShare}}</div>分享数
			</li>
			<li @click='userList'>
				<div class="data_user" v-text="dataUser">{{dataUser}}</div>用户数
			</li>
			<li @click='order'>
				<div class="data_income" :title="dataIncome" v-text="dataIncome" style="overflow: hidden;">￥{{dataIncome}}</div>分享收益
			</li>
		</ul>
		<ul class="user_dataright user_downPay">
			<li @click='download'>
				<div class="data_down" v-text="dataDown">{{dataDown}}</div>我的下载
			</li>
			<li @click='support'>
				<div class="data_pay" v-text="dataPay">￥{{dataPay}}</div>我的赞助
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'peopleData',
		data() {
			return {
				dataShare: 0, //分享数
				dataUser: 0, //用户数
				dataIncome: "￥" + 0, //分享收益
				dataProject: "￥" + 0, //众包收益
				dataDown: 0, //我的下载
				dataPay: "￥" + 0, //我的赞助
			}
		},
		//获取数量
		mounted: function () {
			var target = this;
			// var ajaxCfg = {
			// 	"type": "post",
			// 	"dataType": "json",
			// };
			// ajaxCfg.url = "http://mstore.mingsoft.net/people/mstore/data.do";
			mstore.people.people.data(json => {
				if (json.success == false) {
					return;
				}
				target.dataShare = json.share;
				target.dataUser = json.user;
				target.dataIncome = "￥" + json.income;
				target.dataProject = "￥" + json.project;
				target.dataDown = json.down;
				target.dataPay = "￥" + json.pay;
			})
			// axios.post("http://mstore.mingsoft.net/people/mstore/data.do").then(function (json) {
			// 	if (json.success == false) {
			// 		return;
			// 	}
			// 	target.dataShare = json.share;
			// 	target.dataUser = json.user;
			// 	target.dataIncome = "￥" + json.income;
			// 	target.dataProject = "￥" + json.project;
			// 	target.dataDown = json.down;
			// 	target.dataPay = "￥" + json.pay;
			// });
		},
		methods: {
			shared() {
				this.$router.push('/')
			},
			userList() {
				this.$router.push({ path: '/userList' })
			},
			order() {
				this.$router.push({ path: '/order' })
			},
			download() {
				this.$router.push({ path: '/download' })
			},
			support() {
				this.$router.push({ path: '/support' })
			}
		}
	}
</script>