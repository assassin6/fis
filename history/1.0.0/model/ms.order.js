<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
	    "type" : "post",
		"dataType" : "json"
	};
	return {
		people : {
			mall : {
				order : {
					/**
					* 订单详情
					------
					* 关闭订单，只能关闭未支付订单
					* @callmethod people.mall.order.datail(data,function(returnJson){...});
					* @param {{type:strings,have:true}} orderNo 订单编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.datail($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* [
					* {
					* "orderUserName":"收货人",
					* "orderPhone":"联系电话",
					* "orderAddress":"收货地址",
					* "orderDescription":"订单描述留言",
					* "orderExpress":快递方式,
					* "orderExpressTitle":快递派送描述,
					* "orderInvoiceName":发票抬头,
					* "orderInvoiceDefinite":发票明细,
					* "orderInvoiceType":发票类型,
					* "orderPayment":支付方式,
					* "orderStatus":订单状态-数值,
					* "orderExpressInfo":订单物流信息
					* }
					* ]
					* @return {{type:orderUserName}} 收货人
					* @return {{type:orderPhone}} 联系电话
					* @return {{type:orderAddress}} 收货地址
					* @return {{type:orderDescription}} 订单描述留言
					* @return {{type:orderExpress}} 快递方式
					* @return {{type:orderExpressTitle}} 快递派送描述
					* @return {{type:orderInvoiceName}} 发票抬头
					* @return {{type:orderInvoiceDefinite}} 发票明细
					* @return {{type:orderInvoiceType}} 发票类型
					* @return {{type:orderPayment}} 支付方式
					* @return {{type:orderStatus}} 订单状态－数值
					* @return {{type:orderExpressInfo}} 订单物流信息
					*/
					detail: function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderNo)){
							ms.alert("订单号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.orderNo)){
							ms.alert("订单号应为整型");
							return;
						};			
						ajaxCfg.url = ms.base + "/people/mall/order/detail.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				}
			},
			order : {
				"version" : "1.0.0",
				/**
				* 删除订单
				------
				* 删除订单，只能删除交易已完成与交易关闭的订单
				* @callmethod people.order.del(data,function(returnJson){...});
				* @param {{type:strings,have:true}} orderId 订单编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.del($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {result:"true｜false"}
				* @return {{type:result}} true成功、false失败
				*/
				del : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderId)){
						ms.alert("订单编号不能为空");
						return;
					}
					if (!validator.isInt(newDataJson.orderId)){
						ms.alert("订单编号必须为整数");
						return;
					}
					ajaxCfg.url = ms.base + "/people/order/delete.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 * 提交订单
				 ------
				 * @callmethod people.order.submit(data,function(returnJson){...});
				 * @param {{type:string,have:true}} borderUserName 收货人
				 * @param {{type:string,have:true}} orderPhone 联系电话
				 * @param {{type:string,have:true}} orderAddress 收货地址
				 * @param {{type:string}} orderDescription 订单描述留言
				 * @param {{type:string,have:true}} orderExpress 快递方式
				 * @param {{type:string,have:true}} orderPayment 支付方式
				 * @param {{type:string,have:true}} orderStatus 订单状态
				 * @param {{type:string,have:true}} cartId 购物车编号
				 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				 * @examples 
				 * ...
				 * mpeople.people.order.submit($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * 无
				 */
				submit : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderUserName)){
						ms.alert("收货人姓名不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderPhone)){
						ms.alert("联系电话不能为空");
						return;
					}else if(!validator.isMobilePhone(newDataJson.orderPhone,'zh-CN')){
						ms.alert("请输入正确的电话");
						return;
					};
					if(validator.isNull(newDataJson.orderAddress)){
						ms.alert("收货地址不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderExpress)){
						ms.alert("快递方式不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderPayment)){
						ms.alert("支付方式不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderStatus)){
						ms.alert("订单状态不能为空");
						return;
					};
					if(validator.isNull(newDataJson.cartId)){
						ms.alert("购物车编号不能为空");
						return;
					}
					var idArray = new Array;
					var dotNum = 0;
					idArray = newDataJson.cartId.split(",");
					for (var index = 0; index < newDataJson.cartId.length; index++) {
						if(newDataJson.cartId[index] === ','){
							dotNum++;
						}
					}
					if (dotNum >= idArray.length){
						ms.alert("输入参数格式有误");
						return;
					}
					ajaxCfg.url = ms.base + "/people/order/submit.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 关闭订单
				------
				* 关闭订单，只能关闭未支付订单
				* @callmethod people.order.close(data,function(returnJson){...});
				* @param {{type:strings,have:true}} orderId 订单编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.close($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {result:"true｜false"}
				* @return {{type:result}} true成功、false失败
				*/
				close: function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderId)){
						ms.alert("订单号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.orderId)){
						ms.alert("订单号应为整型");
						return;
					};			
					ajaxCfg.url = ms.base + "/people/order/close.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 订单信息
				------
				* 订单信息，主要用户核对购物车订单信息
				* @callmethod people.order.info(data,function(returnJson){...});
				* @param {{type:strings,have:true}} cartId 购物车编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.info($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { 
				*	"cartDiscount": 折扣, 
				*	"cartId": 自增长编号, 
				*	"cartNum": 数量, 
				*	"cartPrice": 价格, 
				*	"cartThumbnail": "缩略图", 
				*	"cartTime": "添加日期", 
				*	"cartTitle": "标题"
				* }
				* @return {{type:cartDiscount}} 折扣
				* @return {{type:cartId}} 自增长编号
				* @return {{type:cartNum}} 数量
				* @return {{type:cartPrice}} 价格
				* @return {{type:cartThumbnail}} 缩略图
				* @return {{type:cartTime}} 添加日期
				* @return {{type:cartTitle}} 标题
				*/
				info: function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.cartId)){
						ms.alert("购物车编号不能为空");
						return;
					};			
					ajaxCfg.url = ms.base + "/people/order/info.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 订单列表
				------
				* 订单列表，主要用户核对购物车订单列表信息
				* @callmethod people.order.list(data,function(returnJson){...});
				* @param {{type:strings,have:true}} orderStatus  订单状态
				* @param {{type:strings,have:true}} orderExpress 配送方式
				* @param {{type:strings,have:true}} orderPayment 支付方式
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.list($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function {
				* [ {
				* "orderId": 订单自增长编号,
				* "orderPeopleId": 用户编号, 
				* "orderNo": "订单号", 
				* "orderTime": "下单日期",
				* "orderPrice": 订单金额, 
				* "orderUserName": "收货人", 
				* "orderPhone": "联系电话", 
				* "orderAddress": "收货地址", 
				* "orderDescription": "订单描述留言", 
				* "orderExpress": 快递方式, 
				* "orderExpressTitle": 快递方式-送货上门, 
				* "orderPayment": 支付方式－数值, 
				* "orderPaymentTitle": "支付方式－面付", 
				* "orderStatus": 订单状态－数值, 
				* "orderStatusTitle": "订单状态－已付款", 
				* "orderCategoryId": 订单分类－平台自定义, 
				* "orderModelId": 所属模块-平台自定义, 
				* "peopleUser": {
				* "peopleUserIcon": "头像", 
				* "peopleUserNickName": "昵称", 
				* "peopleUserRealName": "真实姓名", 
				* }
				* "goods": [
				* {
				* "goodsBasicId": 信息编号, 
				* "goodsName": "标题", 	
				* "goodsNum": 数量, 
				* "goodsPrice": 价格, 
				* "goodsRebate": 折扣, 
				* "goodsThumbnail": "缩略图", 
				* }
				* ]
				* }]
				* }
				* @return {{type:orderId}} 订单自增长编号
				* @return {{type:orderPeopleId}} 用户编号
				* @return {{type:orderNo}} 订单号
				* @return {{type:orderTime}} 下单日期
				* @return {{type:orderPrice}} 订单金额 
				* @return {{type:orderUserName}} 收货人
				* @return {{type:orderPhone}} 联系电话
				* @return {{type:orderAddress}} 收货地址
				* @return {{type:orderDescription}} 订单描述留言
				* @return {{type:orderExpress}} 快递方式
				* @return {{type:orderExpressTitle}} 快递方式-送货上门
				* @return {{type:orderPayment}} 支付方式-数值
				* @return {{type:orderPaymentTitle}} 支付方式－面付
				* @return {{type:orderStatus}} 订单状态-数值
				* @return {{type:orderStatusTitle}} 订单状态－已付款
				* @return {{type:orderCategoryId}} 订单分类－平台自定义
				* @return {{type:orderModelId}} 所属模块-平台自定义
				* @return {{type:peopleUserIcon}} 头像
				* @return {{type:peopleUserNickName}} 昵称
				* @return {{type:peopleUserRealName}} 真实姓名
				* @return {{type:goodsBasicId}} 信息编号
				* @return {{type:goodsName}} 标题
				* @return {{type:goodsNum}} 数量
				* @return {{type:goodsPrice}} 价格
				* @return {{type:goodsThumbnail}} 缩略图
				**/
				list : function(data,func){
					if (validator.isNull(data)){  
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderStatus) && validator.isNull(newDataJson.orderExpress) && validator.isNull(newDataJson.orderPayment)){
						ms.alert("订单状态，配送方式，支付方式中至少有一个不为空");
						return;
					}
					
					if (!validator.isNull(newDataJson.orderStatus)){
						if(!validator.isInt(newDataJson.orderStatus)){
							ms.alert("订单状态为整型");
							return;
						}
					}
					if (!validator.isNull(newDataJson.orderExpress)){
						if(!validator.isInt(newDataJson.orderExpress)){
							ms.alert("配送方式为整型");
							return;
						}
					}
					if (!validator.isNull(newDataJson.orderPayment)){
						if(!validator.isInt(newDataJson.orderPayment)){
							ms.alert("支付方式为整型");
							return;
						}
					}
					ajaxCfg.url = ms.base + "/people/order/list.do";
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
		people : {
			mall : {
				order : {
					/**
					* 订单详情
					------
					* 关闭订单，只能关闭未支付订单
					* @callmethod people.mall.order.datail(data,function(returnJson){...});
					* @param {{type:strings,have:true}} orderNo 订单编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.datail($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* [
					* {
					* "orderUserName":"收货人",
					* "orderPhone":"联系电话",
					* "orderAddress":"收货地址",
					* "orderDescription":"订单描述留言",
					* "orderExpress":快递方式,
					* "orderExpressTitle":快递派送描述,
					* "orderInvoiceName":发票抬头,
					* "orderInvoiceDefinite":发票明细,
					* "orderInvoiceType":发票类型,
					* "orderPayment":支付方式,
					* "orderStatus":订单状态-数值,
					* "orderExpressInfo":订单物流信息
					* }
					* ]
					* @return {{type:orderUserName}} 收货人
					* @return {{type:orderPhone}} 联系电话
					* @return {{type:orderAddress}} 收货地址
					* @return {{type:orderDescription}} 订单描述留言
					* @return {{type:orderExpress}} 快递方式
					* @return {{type:orderExpressTitle}} 快递派送描述
					* @return {{type:orderInvoiceName}} 发票抬头
					* @return {{type:orderInvoiceDefinite}} 发票明细
					* @return {{type:orderInvoiceType}} 发票类型
					* @return {{type:orderPayment}} 支付方式
					* @return {{type:orderStatus}} 订单状态－数值
					* @return {{type:orderExpressInfo}} 订单物流信息
					*/
					detail: function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderNo)){
							ms.alert("订单号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.orderNo)){
							ms.alert("订单号应为整型");
							return;
						};			
						ajaxCfg.url = ms.base + "/people/mall/order/detail.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				}
			},
			order : {
				"version" : "1.0.0",
				/**
				* 删除订单
				------
				* 删除订单，只能删除交易已完成与交易关闭的订单
				* @callmethod people.order.del(data,function(returnJson){...});
				* @param {{type:strings,have:true}} orderId 订单编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.del($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {result:"true｜false"}
				* @return {{type:result}} true成功、false失败
				*/
				del : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderId)){
						ms.alert("订单编号不能为空");
						return;
					}
					if (!validator.isInt(newDataJson.orderId)){
						ms.alert("订单编号必须为整数");
						return;
					}
					ajaxCfg.url = ms.base + "/people/order/delete.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 * 提交订单
				 ------
				 * @callmethod people.order.submit(data,function(returnJson){...});
				 * @param {{type:string,have:true}} borderUserName 收货人
				 * @param {{type:string,have:true}} orderPhone 联系电话
				 * @param {{type:string,have:true}} orderAddress 收货地址
				 * @param {{type:string}} orderDescription 订单描述留言
				 * @param {{type:string,have:true}} orderExpress 快递方式
				 * @param {{type:string,have:true}} orderPayment 支付方式
				 * @param {{type:string,have:true}} orderStatus 订单状态
				 * @param {{type:string,have:true}} cartId 购物车编号
				 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				 * @examples 
				 * ...
				 * mpeople.people.order.submit($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * 无
				 */
				submit : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderUserName)){
						ms.alert("收货人姓名不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderPhone)){
						ms.alert("联系电话不能为空");
						return;
					}else if(!validator.isMobilePhone(newDataJson.orderPhone,'zh-CN')){
						ms.alert("请输入正确的电话");
						return;
					};
					if(validator.isNull(newDataJson.orderAddress)){
						ms.alert("收货地址不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderExpress)){
						ms.alert("快递方式不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderPayment)){
						ms.alert("支付方式不能为空");
						return;
					};
					if(validator.isNull(newDataJson.orderStatus)){
						ms.alert("订单状态不能为空");
						return;
					};
					if(validator.isNull(newDataJson.cartId)){
						ms.alert("购物车编号不能为空");
						return;
					}
					var idArray = new Array;
					var dotNum = 0;
					idArray = newDataJson.cartId.split(",");
					for (var index = 0; index < newDataJson.cartId.length; index++) {
						if(newDataJson.cartId[index] === ','){
							dotNum++;
						}
					}
					if (dotNum >= idArray.length){
						ms.alert("输入参数格式有误");
						return;
					}
					ajaxCfg.url = ms.base + "/people/order/submit.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 关闭订单
				------
				* 关闭订单，只能关闭未支付订单
				* @callmethod people.order.close(data,function(returnJson){...});
				* @param {{type:strings,have:true}} orderId 订单编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.close($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {result:"true｜false"}
				* @return {{type:result}} true成功、false失败
				*/
				close: function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderId)){
						ms.alert("订单号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.orderId)){
						ms.alert("订单号应为整型");
						return;
					};			
					ajaxCfg.url = ms.base + "/people/order/close.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 订单信息
				------
				* 订单信息，主要用户核对购物车订单信息
				* @callmethod people.order.info(data,function(returnJson){...});
				* @param {{type:strings,have:true}} cartId 购物车编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.info($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { 
				*	"cartDiscount": 折扣, 
				*	"cartId": 自增长编号, 
				*	"cartNum": 数量, 
				*	"cartPrice": 价格, 
				*	"cartThumbnail": "缩略图", 
				*	"cartTime": "添加日期", 
				*	"cartTitle": "标题"
				* }
				* @return {{type:cartDiscount}} 折扣
				* @return {{type:cartId}} 自增长编号
				* @return {{type:cartNum}} 数量
				* @return {{type:cartPrice}} 价格
				* @return {{type:cartThumbnail}} 缩略图
				* @return {{type:cartTime}} 添加日期
				* @return {{type:cartTitle}} 标题
				*/
				info: function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.cartId)){
						ms.alert("购物车编号不能为空");
						return;
					};			
					ajaxCfg.url = ms.base + "/people/order/info.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 订单列表
				------
				* 订单列表，主要用户核对购物车订单列表信息
				* @callmethod people.order.list(data,function(returnJson){...});
				* @param {{type:strings,have:true}} orderStatus  订单状态
				* @param {{type:strings,have:true}} orderExpress 配送方式
				* @param {{type:strings,have:true}} orderPayment 支付方式
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.order.list($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function {
				* [ {
				* "orderId": 订单自增长编号,
				* "orderPeopleId": 用户编号, 
				* "orderNo": "订单号", 
				* "orderTime": "下单日期",
				* "orderPrice": 订单金额, 
				* "orderUserName": "收货人", 
				* "orderPhone": "联系电话", 
				* "orderAddress": "收货地址", 
				* "orderDescription": "订单描述留言", 
				* "orderExpress": 快递方式, 
				* "orderExpressTitle": 快递方式-送货上门, 
				* "orderPayment": 支付方式－数值, 
				* "orderPaymentTitle": "支付方式－面付", 
				* "orderStatus": 订单状态－数值, 
				* "orderStatusTitle": "订单状态－已付款", 
				* "orderCategoryId": 订单分类－平台自定义, 
				* "orderModelId": 所属模块-平台自定义, 
				* "peopleUser": {
				* "peopleUserIcon": "头像", 
				* "peopleUserNickName": "昵称", 
				* "peopleUserRealName": "真实姓名", 
				* }
				* "goods": [
				* {
				* "goodsBasicId": 信息编号, 
				* "goodsName": "标题", 	
				* "goodsNum": 数量, 
				* "goodsPrice": 价格, 
				* "goodsRebate": 折扣, 
				* "goodsThumbnail": "缩略图", 
				* }
				* ]
				* }]
				* }
				* @return {{type:orderId}} 订单自增长编号
				* @return {{type:orderPeopleId}} 用户编号
				* @return {{type:orderNo}} 订单号
				* @return {{type:orderTime}} 下单日期
				* @return {{type:orderPrice}} 订单金额 
				* @return {{type:orderUserName}} 收货人
				* @return {{type:orderPhone}} 联系电话
				* @return {{type:orderAddress}} 收货地址
				* @return {{type:orderDescription}} 订单描述留言
				* @return {{type:orderExpress}} 快递方式
				* @return {{type:orderExpressTitle}} 快递方式-送货上门
				* @return {{type:orderPayment}} 支付方式-数值
				* @return {{type:orderPaymentTitle}} 支付方式－面付
				* @return {{type:orderStatus}} 订单状态-数值
				* @return {{type:orderStatusTitle}} 订单状态－已付款
				* @return {{type:orderCategoryId}} 订单分类－平台自定义
				* @return {{type:orderModelId}} 所属模块-平台自定义
				* @return {{type:peopleUserIcon}} 头像
				* @return {{type:peopleUserNickName}} 昵称
				* @return {{type:peopleUserRealName}} 真实姓名
				* @return {{type:goodsBasicId}} 信息编号
				* @return {{type:goodsName}} 标题
				* @return {{type:goodsNum}} 数量
				* @return {{type:goodsPrice}} 价格
				* @return {{type:goodsThumbnail}} 缩略图
				**/
				list : function(data,func){
					if (validator.isNull(data)){  
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.orderStatus) && validator.isNull(newDataJson.orderExpress) && validator.isNull(newDataJson.orderPayment)){
						ms.alert("订单状态，配送方式，支付方式中至少有一个不为空");
						return;
					}
					
					if (!validator.isNull(newDataJson.orderStatus)){
						if(!validator.isInt(newDataJson.orderStatus)){
							ms.alert("订单状态为整型");
							return;
						}
					}
					if (!validator.isNull(newDataJson.orderExpress)){
						if(!validator.isInt(newDataJson.orderExpress)){
							ms.alert("配送方式为整型");
							return;
						}
					}
					if (!validator.isNull(newDataJson.orderPayment)){
						if(!validator.isInt(newDataJson.orderPayment)){
							ms.alert("支付方式为整型");
							return;
						}
					}
					ajaxCfg.url = ms.base + "/people/order/list.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
			},
		},
	}
>>>>>>> commit
});