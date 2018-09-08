define(function(require, exports, module) {
	// 使用此模块需要引入http://res.wx.qq.com/open/js/jweixin-1.2.0.js 官方js文件
	var ms = require("ms");
	var wx = require("http://res.wx.qq.com/open/js/jweixin-1.2.0.js");
	return {
		"appId" : null,

		/**
		 * 判断是否是微信浏览器，提供外部进行业务判断，例如：微信里面不支持支付宝支付，可以通过这个方法对支付宝功能进行隐藏 ------
		 * 
		 * @callmethod mweixin.isWeixin(function(){...});
		 * @examples ... ms.mweixin.isWeixin(); ...
		 * @return {{type:true}} 是：微信 否：不是微信
		 */
		isWeixin : function() {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 获取授权地址 ------
		 * 
		 * @param {{type:string,have:true}}
		 *            link 分享链接
		 * @param {{type:string,have:true}}
		 *            appId 微信appId
		 * @param {{type:string}}
		 *            state 扩展参数
		 * @examples ...
		 *           mweixin.authLink.({link:"http://www.baidu.com",appId:wx0923i112})
		 *           ...
		 */
		authLink : function(data) {

			if (!this.isWeixin()) {
				ms.alert("请在用微信打开此页面");
				return;
			}
			var state = "";
			if (validator.isNull(data.link)) {
				ms.alert("授权链接不能为空(link)");
				return;
			}
			if (validator.isNull(data.appId)) {
				ms.alert("微信appId不能为空(link)");
				return;
			}
			if (data.state != undefined) {
				state = data.state;
			}
			var _url = encodeURIComponent(ms.base
					+ "/mweixin/oauth/login.do?url="
					+ encodeURIComponent(data.link) + "&appId=" + data.appId);
			return "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
					+ data.appId + "&redirect_uri=" + _url
					+ "&response_type=code&scope=snsapi_userinfo&state="
					+ state + "#wechat_redirect";

		},
		
		/**
		    * 微信分享
		    ------
			* @param {{type:string,have:true}} title  分享标题
			* @param {{type:string,have:true}} desc  分享描述
			* @param {{type:string,have:true}} link  分享链接
			* @param {{type:string,have:true}} imgUrl  分享缩略图
			* @param  {{type:function}} success 分享成功回调方法 
			* @param  {{type:function}}  cancel 取消分享回调方法 
			* @examples 
			* ...
			* ms.load(["ms.weixin"],function(weixin){
			* 	weixin.config({appId:xxxxxxxx});
			*   weixin.share(
			*    {
			*    	 appId:'wx7cce6e06b8270c8a',
			*    	 title: '铭飞123', // 分享标题
			*    	 desc: '测试', // 分享描述
			*    	 link: 'http://iweixiao.mingsoft.net', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			*    	 imgUrl: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png', // 分享图标
			*    	 success: function () { 
			*    	    	                    	
			*    	 },
			*    	 cancel: function () { 
			*    	 }
			*    };
			*   );
			* })
			* ...
			* @function 
			* {result:"true"}
			* @return {{type:result}} true成功、false失败
		    */
		share : function(data) {
			wx.ready(function() {
				wx.onMenuShareAppMessage(data);
				// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
				wx.onMenuShareTimeline(data);
				// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
				wx.onMenuShareQQ(data);
				// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
				wx.onMenuShareWeibo(data);
			});
		},
		
		
			/**
		    * 微信js api配置
		    ------
		    * 用户发送验证码，可以通过邮箱或手机发送
			* @callmethod config({appId:xxxxxx});
			* @param {{type:string,have:true}} appId  微信应用编号
			* @examples 
			* ...
			* ms.load(["ms.weixin"],function(weixin){
			* 	weixin.config({appId:xxxxxxxx});
			* })
			* ...
		    */
		config : function(data) {
			if (validator.isNull(data.appId)) {
				ms.alert("微信appId不能为空(link)");
				return;
			}
			$.get(ms.base + "/mweixin/weixin/config.do", {
				appId : data.appId,
				url : location.href.split('#')[0]
			}, function(config) {
				wx.config({
					debug : false,
					appId : config.appId,
					timestamp : config.timestamp,
					nonceStr : config.nonceStr,
					signature : config.signature,
					jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
							'onMenuShareAppMessage', 'onMenuShareQQ',
							'onMenuShareWeibo', 'hideMenuItems',
							'showMenuItems', 'hideAllNonBaseMenuItem',
							'showAllNonBaseMenuItem', 'translateVoice',
							'startRecord', 'stopRecord', 'onRecordEnd',
							'playVoice', 'pauseVoice', 'stopVoice',
							'uploadVoice', 'downloadVoice', 'chooseImage',
							'previewImage', 'uploadImage', 'downloadImage',
							'getNetworkType', 'openLocation', 'getLocation',
							'hideOptionMenu', 'showOptionMenu', 'closeWindow',
							'scanQRCode', 'chooseWXPay',
							'openProductSpecificView', 'addCard', 'chooseCard',
							'openCard' ]
				});

				// wx.ready(function() {
				// wx.checkJsApi({
				// jsApiList : [ 'onMenuShareTimeline',
				// 'onMenuShareAppMessage', 'onMenuShareQQ',
				// 'onMenuShareWeibo', 'onMenuShareQZone' ], //
				// 需要检测的JS接口列表，所有JS接口列表见附录2,
				// success : function(res) {
				// // 以键值对的形式返回，可用的api值true，不可用为false
				// //
				// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				// console.log("++++++++");
				// console.log(res);
				// },
				// fail : function(res) {
				// alert('err:' + res);
				// }
				// });

				// });

			});
		}
	}

})