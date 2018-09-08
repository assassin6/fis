<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		mall : {
			brand : {
				"version" : "1.0.0",
				/**
				* 品牌列表
				------
				* @callmethod mall.brand.list(data,function(returnJson){...});
				* @param {{type:int,have:false}} categoryCategoryId 商品分类编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.mall.brand.list($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {"categoryTitle":"乐视","categoryDescription":"","categoryCategoryId":"6053"}
				* @return {{type:categoryTitle}} 品牌名
				* @return {{type:categoryDescription}} 类别描述
				* @return {{type:categoryCategoryId}} 商品分类编号
				* @return {{type:categorySmallImg}} 品牌缩略图
				*/
				list : function(data,func){
					if (!validator.isNull(data)) {					
						var newDataJson = ms.turnJson(data);					
						if (!validator.isInt(newDataJson.categoryCategoryId)) {
							ms.alert("商品分类必须为整型");							
							return;
						}
					}
					ajaxCfg.url = ms.base + "/mall/brand/list.do";
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
		mall : {
			brand : {
				"version" : "1.0.0",
				/**
				* 品牌列表
				------
				* @callmethod mall.brand.list(data,function(returnJson){...});
				* @param {{type:int,have:false}} categoryCategoryId 商品分类编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.mall.brand.list($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {"categoryTitle":"乐视","categoryDescription":"","categoryCategoryId":"6053"}
				* @return {{type:categoryTitle}} 品牌名
				* @return {{type:categoryDescription}} 类别描述
				* @return {{type:categoryCategoryId}} 商品分类编号
				* @return {{type:categorySmallImg}} 品牌缩略图
				*/
				list : function(data,func){
					if (!validator.isNull(data)) {					
						var newDataJson = ms.turnJson(data);					
						if (!validator.isInt(newDataJson.categoryCategoryId)) {
							ms.alert("商品分类必须为整型");							
							return;
						}
					}
					ajaxCfg.url = ms.base + "/mall/brand/list.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
			},
		},
	}
>>>>>>> commit
});