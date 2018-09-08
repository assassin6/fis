<<<<<<< HEAD
 define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		"version" : "1.0.0",
		bank : {
			pay : {
				/**
				* 支付宝支付接口
				------
				* @callmethod bank.pay.alipay(data,function(returnJson){...});
				* @param {{type:URL,have:true}} notifyUrl 接口异步请求地址
				* @param {{type:URL,have:true}} returnUrl 返回地址
				* @param {{type:int,have:true}} orderNo 订单编号
				* @param {{type:string,have:true}} orderName 订单标题
				* @param {{type:string,have:true}} orderPrice 订单价格
				* @param {{type:string}} orderDesc 订单描述
				* @param {{type:URL,have:true}} showUrl 商品显示地址
				* @param {{type:function}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.bank.pay.alipay($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* })
				* ...
				* @function 
				* {"resultMsg":"","result":true}
				* @return {{type:resultMsg}} 提示信息
				* @return {{type:result}} true成功、false失败
				*/
				alipay : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newDataJson = ms.turnJson(data);
					if(validator.isNull(newDataJson.notifyUrl)){
						ms.alert("接口请求地址不能为空");
						return;
					}
					if (!validator.isURL(newDataJson.notifyUrl)){
						ms.alert("接口请求地址无效");
						return;
					}
					if (validator.isNull(newDataJson.returnUrl)){
						ms.alert("返回地址不能为空");
						return;
					}
					if (!validator.isURL(newDataJson.returnUrl)){
						ms.alert("返回地址无效");
						return;
					}
					if (validator.isNull(newDataJson.orderNo)){
						ms.alert("订单编号不能为空");
						return;
					}
					if (!validator.isInt(newDataJson.orderNo)){
						ms.alert("订单编号必须为整型");
						return;
					}
					if (validator.isNull(newDataJson.orderName)){
						ms.alert("订单标题不能为空");
						return;
					}
					if (validator.isNull(newDataJson.orderPrice)){
						ms.alert("订单价格不能为空");
						return;
					}
					if (!validator.isCurrency(newDataJson.orderPrice)){
						ms.alert("订单价格无效");
					}
					if (validator.isNull(newDataJson.showUrl)){
						ms.alert("商品显示地址不能为空");
						return;
					};
					if (!validator.isURL(newDataJson.showUrl)){
						ms.alert("商品显示地址无效");
						return;
					}
					ajaxCfg.url = ms.base + "/bank/pay/alipay.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
			},
		},
	}
=======
 define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		"version" : "1.0.0",
		bank : {
			pay : {
				/**
				* 支付宝支付接口
				------
				* @callmethod bank.pay.alipay(data,function(returnJson){...});
				* @param {{type:URL,have:true}} notifyUrl 接口异步请求地址
				* @param {{type:URL,have:true}} returnUrl 返回地址
				* @param {{type:int,have:true}} orderNo 订单编号
				* @param {{type:string,have:true}} orderName 订单标题
				* @param {{type:string,have:true}} orderPrice 订单价格
				* @param {{type:string}} orderDesc 订单描述
				* @param {{type:URL,have:true}} showUrl 商品显示地址
				* @param {{type:function}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.bank.pay.alipay($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* })
				* ...
				* @function 
				* {"resultMsg":"","result":true}
				* @return {{type:resultMsg}} 提示信息
				* @return {{type:result}} true成功、false失败
				*/
				alipay : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newDataJson = ms.turnJson(data);
					if(validator.isNull(newDataJson.notifyUrl)){
						ms.alert("接口请求地址不能为空");
						return;
					}
					if (!validator.isURL(newDataJson.notifyUrl)){
						ms.alert("接口请求地址无效");
						return;
					}
					if (validator.isNull(newDataJson.returnUrl)){
						ms.alert("返回地址不能为空");
						return;
					}
					if (!validator.isURL(newDataJson.returnUrl)){
						ms.alert("返回地址无效");
						return;
					}
					if (validator.isNull(newDataJson.orderNo)){
						ms.alert("订单编号不能为空");
						return;
					}
					if (!validator.isInt(newDataJson.orderNo)){
						ms.alert("订单编号必须为整型");
						return;
					}
					if (validator.isNull(newDataJson.orderName)){
						ms.alert("订单标题不能为空");
						return;
					}
					if (validator.isNull(newDataJson.orderPrice)){
						ms.alert("订单价格不能为空");
						return;
					}
					if (!validator.isCurrency(newDataJson.orderPrice)){
						ms.alert("订单价格无效");
					}
					if (validator.isNull(newDataJson.showUrl)){
						ms.alert("商品显示地址不能为空");
						return;
					};
					if (!validator.isURL(newDataJson.showUrl)){
						ms.alert("商品显示地址无效");
						return;
					}
					ajaxCfg.url = ms.base + "/bank/pay/alipay.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
			},
		},
	}
>>>>>>> commit
});