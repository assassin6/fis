<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};
	return { 
		people:{ 
			mall:{
				productImpression:{
					"version" : "1.0.0",
					/**
					* 获取商品印象
						------
					* @callmethod people.mall.productImpression.get(data,function(json){...});
					* @param {{type:string,have:true}} piBasicId 商品编号
					* @param {{type:string,have:true}} piId 印象自增长编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.productImpression.get($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function
					* [
					* {
					* "piId":自增长编号,
					* "piBasicId":商品编号,
					* "piTitle":"印象",
					* "piPeopleId":添加用户,
					* "piAmount":数量,
					* "piDatetime":"添加时间"
					* }
					* ]
				 	* @return{{type:piId}} 自增长编号
					* @return{{type:piBasicId}} 商品编号
					* @return{{type:piTitle}} 印象
					* @return{{type:piPeopleId}} 添加用户
					* @return{{type:piAmount}} 数量
					* @return{{type:piDatetime}} 添加时间
					*/
					get : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						} else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整数");
							return;
						}
						if (validator.isNull(newDataJson.piId)){
							ms.alert("印象自增长编号不能为空");
							return;
						} else if (!validator.isInt(newDataJson.piId)){
							ms.alert("印象自增长编号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/get.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 保存商品印象
					  ------
					 * @callmethod people.mall.productImpression.save(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:string,have:true}} piTitle 印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.save($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piBasicId":商品编号,
					 * "piTitle":"印象",
					 * "piDatatime":"时间",
					 * "piId":自增长编号,
					 * "piPeopleId":添加用户
					 * }
					 * ]
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 * @return{{type:piDatatime}} 时间
					 * @return{{type:piId}} 自增长编号
					 * @return{{type:piPeopleId}} 添加用户
					 */
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.piBasicId)) {
							ms.alert("商品编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.piBasicId)) {
							ms.alert("商品编号必须为整数");
							return;
						}
						if(validator.isNull(newDataJson.piTitle)) {
							ms.alert("印象不能为空");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 删除商品印象
					  -----
					 * @callmethod people.mall.productImpression.delete(data,function(json){...});
					 * @param {{type:string,have:true}} piId 自增长编号 批量删除商品印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.del($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					 * @return{{type:code}} 错误编码
					 * @return{{type:result}} true 成功、false失败
					 * @return{{type:resultMsg}} 错误信息
					 */
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piId)){
							ms.alert("印象编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("印象编号必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 更新商品印象信息商品印象
					  -----
					 * @callmethod people.mall.productImpression.update(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:string,have:true}} piTitle 印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.update($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piBasicId":商品编号,
					 * "piTitle":"印象"
					 * }
					 * ]
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 */
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整型");
							return;
						}
						if(validator.isNull(newDataJson.piTitle)) {
							ms.alert("印象不能为空");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 查询商品印象列表
					  -----
					 * @callmethod people.mall.productImpression.list(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:function,have:true}}  回调方法 返回值（returJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.list($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piId":自增长编号,
					 * "piBasicId":商品编号,
					 * "piTitle":"印象",
					 * "piPeopleId":添加用户,
					 * "piAmount":数量,
					 * "piDatetime":"添加时间"
					 * }
					 * ]
					 * @return{{type:piId}} 自增长编号
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 * @return{{type:piPeopleId}} 添加用户
					 * @return{{type:piAmount}} 数量
					 * @return{{type:piDatetime}} 添加时间
					 */
					list : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/list.do";
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
		people:{ 
			mall:{
				productImpression:{
					"version" : "1.0.0",
					/**
					* 获取商品印象
						------
					* @callmethod people.mall.productImpression.get(data,function(json){...});
					* @param {{type:string,have:true}} piBasicId 商品编号
					* @param {{type:string,have:true}} piId 印象自增长编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.productImpression.get($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function
					* [
					* {
					* "piId":自增长编号,
					* "piBasicId":商品编号,
					* "piTitle":"印象",
					* "piPeopleId":添加用户,
					* "piAmount":数量,
					* "piDatetime":"添加时间"
					* }
					* ]
				 	* @return{{type:piId}} 自增长编号
					* @return{{type:piBasicId}} 商品编号
					* @return{{type:piTitle}} 印象
					* @return{{type:piPeopleId}} 添加用户
					* @return{{type:piAmount}} 数量
					* @return{{type:piDatetime}} 添加时间
					*/
					get : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						} else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整数");
							return;
						}
						if (validator.isNull(newDataJson.piId)){
							ms.alert("印象自增长编号不能为空");
							return;
						} else if (!validator.isInt(newDataJson.piId)){
							ms.alert("印象自增长编号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/get.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 保存商品印象
					  ------
					 * @callmethod people.mall.productImpression.save(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:string,have:true}} piTitle 印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.save($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piBasicId":商品编号,
					 * "piTitle":"印象",
					 * "piDatatime":"时间",
					 * "piId":自增长编号,
					 * "piPeopleId":添加用户
					 * }
					 * ]
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 * @return{{type:piDatatime}} 时间
					 * @return{{type:piId}} 自增长编号
					 * @return{{type:piPeopleId}} 添加用户
					 */
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.piBasicId)) {
							ms.alert("商品编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.piBasicId)) {
							ms.alert("商品编号必须为整数");
							return;
						}
						if(validator.isNull(newDataJson.piTitle)) {
							ms.alert("印象不能为空");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 删除商品印象
					  -----
					 * @callmethod people.mall.productImpression.delete(data,function(json){...});
					 * @param {{type:string,have:true}} piId 自增长编号 批量删除商品印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.del($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					 * @return{{type:code}} 错误编码
					 * @return{{type:result}} true 成功、false失败
					 * @return{{type:resultMsg}} 错误信息
					 */
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piId)){
							ms.alert("印象编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("印象编号必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 更新商品印象信息商品印象
					  -----
					 * @callmethod people.mall.productImpression.update(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:string,have:true}} piTitle 印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.update($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piBasicId":商品编号,
					 * "piTitle":"印象"
					 * }
					 * ]
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 */
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整型");
							return;
						}
						if(validator.isNull(newDataJson.piTitle)) {
							ms.alert("印象不能为空");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 查询商品印象列表
					  -----
					 * @callmethod people.mall.productImpression.list(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:function,have:true}}  回调方法 返回值（returJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.productImpression.list($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piId":自增长编号,
					 * "piBasicId":商品编号,
					 * "piTitle":"印象",
					 * "piPeopleId":添加用户,
					 * "piAmount":数量,
					 * "piDatetime":"添加时间"
					 * }
					 * ]
					 * @return{{type:piId}} 自增长编号
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 * @return{{type:piPeopleId}} 添加用户
					 * @return{{type:piAmount}} 数量
					 * @return{{type:piDatetime}} 添加时间
					 */
					list : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				},
			},
		},
	}
>>>>>>> commit
});