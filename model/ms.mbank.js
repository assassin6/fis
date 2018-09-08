/**
 * 支付中心
 */
define(function(require, exports, module) {
	var ms = require("ms");
	return {
		"version" : "1.0.0",
		/**
		* 支付网关，用于从点击付款到显示选择付款方式的界面，例如：在订单列表、订单详情、下单时的付款按钮事件上面
		------
		* @callmethod bank.toPay(json);
		* @param  {{type:string,have:true}}  orderNo 订单号
		* @param  {{type:string,have:true}}  orderName 名称
		* @param  {{type:string,have:true}}  orderDesc 描述
		* @param  {{type:doubule,have:true}}  orderPrice 价格
		* @param  {{type:string,have:true}}  page 自定义支付页面 以http://打头的绝对路径
		* @examples 
		* ...
		*   bank.toPay({
		* 	  orderNo:orderNo,
		* 	  orderPrice:price,
		* 	  orderDesc:orderDesc,
		* 	  payPage:"{ms:global.host/}/people/successOrder.do",//支付页面，通常是自定义页面
		*   });
		* ...
		* @return {{type:url}} 重定向到 page 页面
		*/
		toPay : function(json) {
			var orderNo = json.orderNo;
			var orderName = json.orderName;
			var orderDesc = json.orderDesc;
			var orderPrice = json.orderPrice;
			var page = json.payPage;
			// 创建Form  
		    var form = $('<form style="display:none"></form>').attr('method', 'post').attr('target', '_self');  
		    form.attr('action', ms.base+"/bank/pay/gateway.do");
		    form.append($('<input type="text" name="orderNo" />').attr('value', orderNo));  
		    form.append($('<input type="text" name="orderName" />').attr('value', orderName));  
		    form.append($('<input type="text" name="orderDesc" />').attr('value', orderDesc));  
		    form.append($('<input type="text" name="orderPrice" />').attr('value', orderPrice)); 
		    form.append($('<input type="text" name="page" />').attr('value', page)); 
		    $.post(ms.base+"/bank/pay/gateway.do", form.serialize(),function(data){
		    	if(data.result) {
		    		location.href=data.resultMsg;
		    	}else{
		    		alert("发起支付失败！");
		    	}
		    });
		},
		
		/**
		* 确定支付，手机端适合：alipay、weixin两种支付 PC端适合：alipay、weixinQr两种支付
		------
		* @callmethod bank.pay(json);
		* @param  {{type:string,have:true}}  type 支付类型  alipay-支付宝  weixin-公众号 werxinQr-微信扫码
		* @param  {{type:string}}  orderNo 订单号 type为alipay、weixinQr时必须传递参数
		* @param  {{type:string}}  orderName 名称 type为alipay时必须传递参数
		* @param  {{type:string}}  orderDesc 描述 type为alipay时必须传递参数
		* @param  {{type:string}}  orderPrice 价格 type为alipay时必须传递参数
		* @param  {{type:string}}  returnUrl 支付成功后跳转的地址，以http://打头的绝对路径 type为alipay时必须传递参数
		* @param  {{type:string}}  showUrl 订单相关信息的显示地址，以http://打头的绝对路径 主要用户在支付页面是用户可以点击这个链接地址查看相关信息 type为alipay时有效
		* 
		* @param  {{type:string}}  appId type为weixin时必须传递参数，参考例子格式
		* @param  {{type:string}}  timeStamp  type为weixin时必须传递参数，参考例子格式
		* @param  {{type:string}}  nonceStr type为weixin时必须传递参数，参考例子格式
		* @param  {{type:string}}  package type为weixin时必须传递参数，参考例子格式
		* @param  {{type:string}}  signType type为weixin时必须传递参数，参考例子格式
		* 
		* @param  {{type:string}}  target type为weixinQr时必须传递参数，img标签选择器，用于显示支付二维码，参考例子格式
		* @param  {{type:string}}  width type为weixinQr时必须传递参数，参考例子格式 默认200
		* @param  {{type:string}}  height type为weixinQr时必须传递参数，参考例子格式 默认200
		* @param  {{type:string}}  qrcode type为weixin时必须传递参数，参考例子格式
		* 
		* 
		* @param  {{type:function}}  success type为weixin、weixinQr有效，支付成功后处理的业务，例如跳转到订单列表
		* 
		* 
		* @examples 
		* ...
		*  公众号支付模版，通常又一个按钮的click事件触发，只需要根据实际的业务情况修改success里面的业务方法
		*  bank.pay({
		* 	type:"weixin",
		* 	appId:"{appId/}",
		* 	timeStamp:"{timeStamp/}",
		* 	nonceStr:"{nonceStr/}",
		*  	package:"{package/}",
 		* 	signType:"{signType/}",
		*  	paySign:"{sign/}",
  		*  	success:function() {
		* 		alert('支付成功后的操作');   //通常是返回到订单列表界面              		
		*   }
		* });
		* 
		* 微信扫码支付，扫码支付是，建议是点击确认支付弹出支付二维码遮罩框
		* bank.pay({
		*   type:"weixinQr",
		* 	orderNo:"{orderNo/}",
		* 	target:"#weixinQrImg",
		*   width:200,
 		*   height:200,
  		*   qrcode:"{qrcode/}",
		*   success:function() {
		* 	 alert("支付成功后操作"); //通常是返回到订单列表界面
		*   }
		* });
		* 
		* 支付宝支付
		*  bank.pay({
		*  	type:"alipay",
		*  	orderNo:"{orderNo/}",
		*   orderName:"{ms:global.name/}",
		*   orderPrice:"{orderPrice/}",
		* 	orderDesc:"{orderDesc/}",
		* 	showUrl:"http://www.baidu.com",
		*   returnUrl:"{ms:global.host/}/people/myOrder.do?orderStatus=2"
		*  }); 
		* 
		* ...
		* 
		* @function 
		* 执行success方法
		*/		
		pay : function(json) {
			var type = json.type;
			var orderNo = json.orderNo;
			var orderName = json.orderName;
			var orderDesc = json.orderDesc;
			var orderPrice = json.orderPrice;
			var returnUrl = json.returnUrl;
			var showUrl = json.showUrl;
			var success = json.success;
			
			
			//判断是否是微信打开，微信打开就只支持公众号支付
			if(type=="weixin") {
				if(!this.isWeixin()) {
					alert('请在微信里访问该页面！');
					return;
				}
           		function onBridgeReady(){
       			   WeixinJSBridge.invoke(
       			       'getBrandWCPayRequest', {
       			           "appId":json.appId,     //公众号名称，由商户传入     
       			           "timeStamp":json.timeStamp,         //时间戳，自1970年以来的秒数     
       			           "nonceStr":json.nonceStr, //随机串     
       			           "package":"prepay_id="+json.package,     
       			           "signType":"MD5",         //微信签名方式：     
       			           "paySign":json.paySign //微信签名 
       			       },
       			       function(res){     
       			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
       			        	   alert("支付成功");
       			        	   if(success) {
       			        		   eval(success());
       			        	   }
       			           } else if(res.err_msg == "get_brand_wcpay_request:ok") {
       			        	   
       			           } else {
       			        	   alert("支付异常"+JSON.stringify(res));
       			           } 
       			       }
       			   ); 
       			}
            		
   			    if (typeof WeixinJSBridge == "undefined") {
   			    	if( document.addEventListener ){
   			    		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
   			    	}else if (document.attachEvent){
   			    		document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
   			    		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
   			    	}
   		    	} else {
   		    		   onBridgeReady();
   		    	}                        
			} else if(type=="weixinQr") { //微信二维码支付
				var target = json.target;
				var width = json.width;
				var height = json.height;
				var qrcode = json.qrcode;
				$(target).attr("src",ms.base+"/qrcode?contents="+qrcode+"&width="+width+"&height="+height);
						

				//去掉定时器的方法 
				 
				function checkOrder() {
						$.post(ms.base+"/people/order/detail.do", { orderNo:orderNo,orderStatus:2},function(data){
							if(data) {
								console.log(data);
	      			        	if(success) {
	      			        		eval(success());
	       			        	}
								window.clearInterval(check);
							}
					    });
				}
				var check = window.setInterval(checkOrder,1000); 
				
			} else if(type=="alipay") { //默认使用支付宝
				
				   // 创建Form  
			    var form = $('<form style="display:none"></form>').attr('method', 'post').attr('target', '_blank');
			    form.attr('action', ms.base+"/bank/alipay/pay.do");
			    form.append($('<input type="text" name="orderNo" />').attr('value', orderNo));  
			    form.append($('<input type="text" name="orderName" />').attr('value', orderName));  
			    form.append($('<input type="text" name="orderDesc" />').attr('value', orderDesc));  
			    form.append($('<input type="text" name="orderPrice" />').attr('value', orderPrice));
			    form.append($('<input type="text" name="returnUrl" />').attr('value', returnUrl));
			    form.append($('<input type="text" name="showurl" />').attr('value', showUrl));
				form.append($('<input type="text" name="notifyUrl" value="'+ms.base+'/bank/alipay/notify.do" />'));
				$(document.body).append(form);
			    form.submit(); 				
			}
		},
		
		/**
		* 判断是否是微信浏览器，提供外部进行业务判断，例如：微信里面不支持支付宝支付，可以通过这个方法对支付宝功能进行隐藏
		------
		* @callmethod bank.isWeixin(function(){...});
		* @examples 
		* ...
		* ms.bank.isWeixin();
		* ...
		* @return {{type:true}} 是：微信 否：不是微信 
		*/		
		isWeixin: function() {
			var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        return true;
		    }else{
		        return false;
		    }
		}
	}

});