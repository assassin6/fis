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
					cart : {
						"version" : "1.0.0",
						/**
						* 购物车列表
						------
						* @callmethod people.mall.order.cart.list(function(returnJson){...});
						* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
						* @examples 
						* ...
						* mmall.people.mall.order.cart.list(function(returnJson){
						*	alert(JSON.stringify(returnJson));
						* });
						* ...
						* @function 
						* [
						*	{"cartDiscount": 折扣,
						*	"cartId": 自增长编号,
						*	"cartNum": 数量,	
						*	"cartPrice": 价格,
						*	"cartThumbnail": "缩略图", 
						*	"cartTime": "添加日期", 
						*	"cartTitle": "标题"
						*	}
						*	]
						* @return {{type:cartDiscount}} 折扣
						* @return {{type:cartId}} 自增长编号
						* @return {{type:cartNum}} 数量
						* @return {{type:cartPrice}} 价格
						* @return {{type:cartThumbnail}} 缩略图
						* @return {{type:cartTime}} 添加日期
						* @return {{type:cartTitle}} 标题
						*/
						list : function(func){
						ajaxCfg.url = ms.base + "/people/mall/order/cart/list.do";
						ms.ajax(ajaxCfg, func);	
						},
						/**
						* 购物车添加商品
						------
						* 添加到购物车，如果购物车内已经存在一样的信息，系统会只更新相同信息的数量
						* @callmethod people.mall.order.cart.save(data,function(returnJson){...});
						* @param {{type:string,have:true}} cartId 购物车编号
						* @param {{type:string,have:true}} cartBasicId 信息编号
						* @param {{type:int,have:true}} cartNum 数量
						* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
						* @examples 
						* ...
						* mmall.people.mall.order.cart.save($("form").serialize(),function(returnJson){
						*	alert(JSON.stringify(returnJson));
						* });
						* ...
						* @function 
						* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
						* @return {{type:code}} 错误编码
						* @return {{type:result}} true成功、false失败
						* @return {{type:resultMsg}} 提示信息
						*/
						save : function(data,func){
							if(validator.isNull(data)){
								return;
							}
							var newDataJson = ms.turnJson(data);
							if (validator.isNull(newDataJson.cartBasicId)){
								ms.alert("信息编号不能为空");
								return;
							}
							if (!validator.isInt(newDataJson.cartBasicId)){
								ms.alert("信息编号必须为整型");
								return;
							}
							if (validator.isNull(newDataJson.cartNum)){
								ms.alert("商品数量不能为空");
								return;
							}
							if (!validator.isInt(newDataJson.cartNum)){
								ms.alert("商品数量必须为整型");
								return;
							}
							ajaxCfg.url = ms.base + "/people/mall/order/cart/save.do";
							ajaxCfg.params = data;
							ms.ajax(ajaxCfg, func);	
						},
					},
				},
			},
			order : {
				cart : {
					
					/**
					* 删除购物车中的商品
					------
					* 当执行单个删除时直接在地址中传入ID即可
					* 当执行批量删除时多个cartId直接用逗号隔开,id=1,2,3,45,
					* @callmethod people.order.cart.del(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartId 购物车编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.order.cart.del($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					del : function(data,func){
						if (validator.isNull(data)){
							ms.alert("购物车编号不能为空");
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartId)){
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
						ajaxCfg.url = ms.base + "/people/order/cart/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 更新购物车
					------
					* 更新购物车,只能更新购物车的数量
					* @callmethod people.order.cart.update(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartId 购物车编号
					* @param {{type:string,have:true}} cartBasicId 信息编号
					* @param {{type:int,have:true}} cartNum 数量
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.order.cart.update($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartId)){
							ms.alert("购物车编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartId)){
							ms.alert("购物车编号必须为整型");
							return;
						}
						if (validator.isNull(newDataJson.cartBasicId)){
							ms.alert("信息编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("信息编号必须为整型");
							return;
						}
						if (validator.isNull(newDataJson.cartNum)){
							ms.alert("商品数量不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartNum)){
							ms.alert("商品数量必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/order/cart/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
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
					cart : {
						"version" : "1.0.0",
						/**
						* 购物车列表
						------
						* @callmethod people.mall.order.cart.list(function(returnJson){...});
						* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
						* @examples 
						* ...
						* mmall.people.mall.order.cart.list(function(returnJson){
						*	alert(JSON.stringify(returnJson));
						* });
						* ...
						* @function 
						* [
						*	{"cartDiscount": 折扣,
						*	"cartId": 自增长编号,
						*	"cartNum": 数量,	
						*	"cartPrice": 价格,
						*	"cartThumbnail": "缩略图", 
						*	"cartTime": "添加日期", 
						*	"cartTitle": "标题"
						*	}
						*	]
						* @return {{type:cartDiscount}} 折扣
						* @return {{type:cartId}} 自增长编号
						* @return {{type:cartNum}} 数量
						* @return {{type:cartPrice}} 价格
						* @return {{type:cartThumbnail}} 缩略图
						* @return {{type:cartTime}} 添加日期
						* @return {{type:cartTitle}} 标题
						*/
						list : function(func){
						ajaxCfg.url = ms.base + "/people/mall/order/cart/list.do";
						ms.ajax(ajaxCfg, func);	
						},
						/**
						* 购物车添加商品
						------
						* 添加到购物车，如果购物车内已经存在一样的信息，系统会只更新相同信息的数量
						* @callmethod people.mall.order.cart.save(data,function(returnJson){...});
						* @param {{type:string,have:true}} cartId 购物车编号
						* @param {{type:string,have:true}} cartBasicId 信息编号
						* @param {{type:int,have:true}} cartNum 数量
						* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
						* @examples 
						* ...
						* mmall.people.mall.order.cart.save($("form").serialize(),function(returnJson){
						*	alert(JSON.stringify(returnJson));
						* });
						* ...
						* @function 
						* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
						* @return {{type:code}} 错误编码
						* @return {{type:result}} true成功、false失败
						* @return {{type:resultMsg}} 提示信息
						*/
						save : function(data,func){
							if(validator.isNull(data)){
								return;
							}
							var newDataJson = ms.turnJson(data);
							if (validator.isNull(newDataJson.cartBasicId)){
								ms.alert("信息编号不能为空");
								return;
							}
							if (!validator.isInt(newDataJson.cartBasicId)){
								ms.alert("信息编号必须为整型");
								return;
							}
							if (validator.isNull(newDataJson.cartNum)){
								ms.alert("商品数量不能为空");
								return;
							}
							if (!validator.isInt(newDataJson.cartNum)){
								ms.alert("商品数量必须为整型");
								return;
							}
							ajaxCfg.url = ms.base + "/people/mall/order/cart/save.do";
							ajaxCfg.params = data;
							ms.ajax(ajaxCfg, func);	
						},
					},
				},
			},
			order : {
				cart : {
					
					/**
					* 删除购物车中的商品
					------
					* 当执行单个删除时直接在地址中传入ID即可
					* 当执行批量删除时多个cartId直接用逗号隔开,id=1,2,3,45,
					* @callmethod people.order.cart.del(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartId 购物车编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.order.cart.del($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					del : function(data,func){
						if (validator.isNull(data)){
							ms.alert("购物车编号不能为空");
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartId)){
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
						ajaxCfg.url = ms.base + "/people/order/cart/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 更新购物车
					------
					* 更新购物车,只能更新购物车的数量
					* @callmethod people.order.cart.update(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartId 购物车编号
					* @param {{type:string,have:true}} cartBasicId 信息编号
					* @param {{type:int,have:true}} cartNum 数量
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.order.cart.update($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartId)){
							ms.alert("购物车编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartId)){
							ms.alert("购物车编号必须为整型");
							return;
						}
						if (validator.isNull(newDataJson.cartBasicId)){
							ms.alert("信息编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("信息编号必须为整型");
							return;
						}
						if (validator.isNull(newDataJson.cartNum)){
							ms.alert("商品数量不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartNum)){
							ms.alert("商品数量必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/order/cart/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				},
			},
		},
	}
>>>>>>> commit
});