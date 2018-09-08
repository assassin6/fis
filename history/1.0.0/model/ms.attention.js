<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};
	return {
		people : {
			attention : {
				"version" : "1.0.0",
				/**
				 * 商品收藏
				 ------
				 * @callmethod people.attention.save(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.save($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 * ...
  	    		 * @function 
  	    		 * {"result":true,"code":"09000000"}
  	    		 * @return {{type:code}} 错误编码
  	    		 * @return {{type:result}} true成功、false失败
				 */
				save:function(data,func){
					if (validator.isNull(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号应该为整型");
						return;
					};
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("关注类型不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/people/attention/save.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 判断商品是否收藏过
				 ------
				 * @callmethod people.attention.isExists(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.isExists($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 * ...
  	    		 * @function 
  	    		 * {"result":true,"code":"09000000"}
  	    		 * @return {{type:code}} 错误编码
  	    		 * @return {{type:result}} true成功、false失败
				 */
				isExists : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号为整型");
						return;
					};
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("关注类型不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/people/attention/isExists.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 删除关注
				 ------
				 * @callmethod people.attention.del(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicId 信息编号集合 多个编号用逗号隔开,例如1,2,3,4
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.del($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * 无返回值
				 */
				del : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if(validator.isNull(newDataJson.basicId)){
						ms.alert("basicId不能为空");
						return;
					}
					var idArray = new Array;
					var dotNum = 0;
					idArray = newDataJson.basicId.split(",");
					for (var index = 0; index < newDataJson.basicId.length; index++) {
						if(newDataJson.basicId[index] === ','){
							dotNum++;
						}
					}
					if (dotNum >= idArray.length){
						ms.alert("输入参数格式有误");
						return;
					}
					ajaxCfg.url = ms.base + "/people/attention/delete.do";
					ajaxCfg.params = data ;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 收藏列表
				 ------
				 * @callmethod people.attention.list(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
				 * @param {{type:string,have:true}} modelCode 模块编码
				 * @param {{type:string,have:true}} pageNo  页码
				 * @param {{type:string,have:true}} pageSize 一页显示数量
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.list($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * { "list": [
				 *	{
				 *	"basicPic": "缩略图", 
				 *	"basicTitle": "标题", 
				 *	"basicComment": 评论数, 
				 *	"basicCollect": 收藏数量, 
				 *	"basicHit": 点数量, 
				 *	"basicAppId": 1, 
				 *	"basicCategoryId": 160, 
				 *	"basicDateTime": 1468568887000,
				 *	"basicThumbnails": "/upload/mall/product/1/1468568853464.jpg", 
				 *	"basicTypeIds": [ ], 
				 *	"basicUpdateTime": shan, 
				 *	}],
				 *	"page":{"endRow": 2, 
				 *	"firstPage": 1, 
				 *	"hasNextPage": true存在下一页false不存在, 
				 *	"hasPreviousPage": true存在上一页false不存在, 
				 *	"isFirstPage": true是第一页false不是第一页, 
				 *	"isLastPage": true是最后一页false不是最后一页, 
				 *	"lastPage": 最后一页的页码, 
				 *	"navigatePages": 导航数量，实现 1...5.6.7....10效果, 
				 *	"navigatepageNums": []导航页码集合, 
				 *	"nextPage": 下一页, 
				 *	"pageNum": 当前页码, 
				 *	"pageSize": 一页显示数量, 
				 *	"pages": 总页数, 
				 *	"prePage": 上一页, 
				 *	"size": 总记录, 
				 *	"startRow": , 
				 *	"total":总记录数量}
				 *	}
  	    		 * @return {{type:basicAppId}} 编号
  	    		 * @return {{type:basicTitle}} 标题
  	    		 * @return {{type:basicDateTime}} 时间
  	    		 * @return {{type:basicPic}} 缩略图
  	    		 * @return {{type:basicLinkUrl}} 链接
  	    		 * @return {{type:basicUpdateTime}} 更新时间
  	    		 * @return {{type:basicHit}} 点数量
				 */
				list : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("列表的类型不能为空");
						return;
					}
					if(validator.isNull(newDataJson.modelCode)){
						ms.alert("模块编码不能为空");
						return;
					}
					if(validator.isNull(newDataJson.pageNo)){
						ms.alert("页码不能为空");
						return;
					}else if(!validator.isInt(newDataJson.pageNo)){
						ms.alert("页码应为整型");
						return;
					}
					if(validator.isNull(newDataJson.pageSize)){
						ms.alert("分页数量不能为空");
						return;
					}else if(!validator.isInt(newDataJson.pageSize)){
						ms.alert("分页数量应为整型");
						return;
					}
					
					ajaxCfg.url = ms.base + "/people/attention/list.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},

			},
			mall : {
				attention:{
					/**
					 * 商品收藏列表
					 ------
					 * @callmethod people.mall.attention.list(data,function(returnJson){...});
					 * @param {{type:string,have:true}} pageNo  页码
					 * @param {{type:string,have:true}} pageSize 一页显示数量
					 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
					 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
					 * @examples 
					 * ...
					 * mpeople.people.mall.attention.list($("form").serialize(),function(returnJson){
	  	      		 *		alert(JSON.stringify(returnJson));
	  	    		 *	})
	  	    		 *...
	  	    		 * @function 
	  	    		 * [
	  	    		 * 	{"basicId":商品编号,
	  	    		 * 	"basicTitle":"商品标题",
	  	    		 *  "basicDateTime"："时间",
	  	    		 *  "basicPic":商品图片,
	  	    		 *  "productLinkUrl":商品链接,
	  	    		 *  "basicSort":"商品分类",
	  	    		 *  "productPrice":商品价格
	  	    		 * 	}
 	  	    		 * ]
	  	    		 * @return {{type:basicId}} 商品编号
	  	    		 * @return {{type:basicTitle}} 商品标题
	  	    		 * @return {{type:basicDateTime}} 时间
	  	    		 * @return {{type:basicPic}} 商品图片
	  	    		 * @return {{type:productLinkUrl}} 商品链接
	  	    		 * @return {{type:basicSort}} 商品分类
	  	    		 * @return {{type:productPrice}} 商品价格
					 */
					list : function(data,func){
						if (validator.isNull(data)){
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.basicAttentionType)){
							ms.alert("列表的类型不能为空");
							return;
						}
						if(validator.isNull(newDataJson.pageNo)){
							ms.alert("页码不能为空");
							return;
						}else if(!validator.isInt(newDataJson.pageNo)){
							ms.alert("页码应为整型");
							return;
						}
						if(validator.isNull(newDataJson.pageSize)){
							ms.alert("分页数量不能为空");
							return;
						}else if(!validator.isInt(newDataJson.pageSize)){
							ms.alert("分页数量应为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/attention/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					}
				}
			}
		}		
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
			attention : {
				"version" : "1.0.0",
				/**
				 * 商品收藏
				 ------
				 * @callmethod people.attention.save(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.save($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 * ...
  	    		 * @function 
  	    		 * {"result":true,"code":"09000000"}
  	    		 * @return {{type:code}} 错误编码
  	    		 * @return {{type:result}} true成功、false失败
				 */
				save:function(data,func){
					if (validator.isNull(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号应该为整型");
						return;
					};
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("关注类型不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/people/attention/save.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 判断商品是否收藏过
				 ------
				 * @callmethod people.attention.isExists(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.isExists($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 * ...
  	    		 * @function 
  	    		 * {"result":true,"code":"09000000"}
  	    		 * @return {{type:code}} 错误编码
  	    		 * @return {{type:result}} true成功、false失败
				 */
				isExists : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
						ms.alert("商品编号为整型");
						return;
					};
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("关注类型不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/people/attention/isExists.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 删除关注
				 ------
				 * @callmethod people.attention.del(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicId 信息编号集合 多个编号用逗号隔开,例如1,2,3,4
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.del($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * 无返回值
				 */
				del : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newDataJson = ms.turnJson(data);
					if(validator.isNull(newDataJson.basicId)){
						ms.alert("basicId不能为空");
						return;
					}
					var idArray = new Array;
					var dotNum = 0;
					idArray = newDataJson.basicId.split(",");
					for (var index = 0; index < newDataJson.basicId.length; index++) {
						if(newDataJson.basicId[index] === ','){
							dotNum++;
						}
					}
					if (dotNum >= idArray.length){
						ms.alert("输入参数格式有误");
						return;
					}
					ajaxCfg.url = ms.base + "/people/attention/delete.do";
					ajaxCfg.params = data ;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 收藏列表
				 ------
				 * @callmethod people.attention.list(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
				 * @param {{type:string,have:true}} modelCode 模块编码
				 * @param {{type:string,have:true}} pageNo  页码
				 * @param {{type:string,have:true}} pageSize 一页显示数量
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mpeople.people.attention.list($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * { "list": [
				 *	{
				 *	"basicPic": "缩略图", 
				 *	"basicTitle": "标题", 
				 *	"basicComment": 评论数, 
				 *	"basicCollect": 收藏数量, 
				 *	"basicHit": 点数量, 
				 *	"basicAppId": 1, 
				 *	"basicCategoryId": 160, 
				 *	"basicDateTime": 1468568887000,
				 *	"basicThumbnails": "/upload/mall/product/1/1468568853464.jpg", 
				 *	"basicTypeIds": [ ], 
				 *	"basicUpdateTime": shan, 
				 *	}],
				 *	"page":{"endRow": 2, 
				 *	"firstPage": 1, 
				 *	"hasNextPage": true存在下一页false不存在, 
				 *	"hasPreviousPage": true存在上一页false不存在, 
				 *	"isFirstPage": true是第一页false不是第一页, 
				 *	"isLastPage": true是最后一页false不是最后一页, 
				 *	"lastPage": 最后一页的页码, 
				 *	"navigatePages": 导航数量，实现 1...5.6.7....10效果, 
				 *	"navigatepageNums": []导航页码集合, 
				 *	"nextPage": 下一页, 
				 *	"pageNum": 当前页码, 
				 *	"pageSize": 一页显示数量, 
				 *	"pages": 总页数, 
				 *	"prePage": 上一页, 
				 *	"size": 总记录, 
				 *	"startRow": , 
				 *	"total":总记录数量}
				 *	}
  	    		 * @return {{type:basicAppId}} 编号
  	    		 * @return {{type:basicTitle}} 标题
  	    		 * @return {{type:basicDateTime}} 时间
  	    		 * @return {{type:basicPic}} 缩略图
  	    		 * @return {{type:basicLinkUrl}} 链接
  	    		 * @return {{type:basicUpdateTime}} 更新时间
  	    		 * @return {{type:basicHit}} 点数量
				 */
				list : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("列表的类型不能为空");
						return;
					}
					if(validator.isNull(newDataJson.modelCode)){
						ms.alert("模块编码不能为空");
						return;
					}
					if(validator.isNull(newDataJson.pageNo)){
						ms.alert("页码不能为空");
						return;
					}else if(!validator.isInt(newDataJson.pageNo)){
						ms.alert("页码应为整型");
						return;
					}
					if(validator.isNull(newDataJson.pageSize)){
						ms.alert("分页数量不能为空");
						return;
					}else if(!validator.isInt(newDataJson.pageSize)){
						ms.alert("分页数量应为整型");
						return;
					}
					
					ajaxCfg.url = ms.base + "/people/attention/list.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},

			},
			mall : {
				attention:{
					/**
					 * 商品收藏列表
					 ------
					 * @callmethod people.mall.attention.list(data,function(returnJson){...});
					 * @param {{type:string,have:true}} pageNo  页码
					 * @param {{type:string,have:true}} pageSize 一页显示数量
					 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
					 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
					 * @examples 
					 * ...
					 * mpeople.people.mall.attention.list($("form").serialize(),function(returnJson){
	  	      		 *		alert(JSON.stringify(returnJson));
	  	    		 *	})
	  	    		 *...
	  	    		 * @function 
	  	    		 * [
	  	    		 * 	{"basicId":商品编号,
	  	    		 * 	"basicTitle":"商品标题",
	  	    		 *  "basicDateTime"："时间",
	  	    		 *  "basicPic":商品图片,
	  	    		 *  "productLinkUrl":商品链接,
	  	    		 *  "basicSort":"商品分类",
	  	    		 *  "productPrice":商品价格
	  	    		 * 	}
 	  	    		 * ]
	  	    		 * @return {{type:basicId}} 商品编号
	  	    		 * @return {{type:basicTitle}} 商品标题
	  	    		 * @return {{type:basicDateTime}} 时间
	  	    		 * @return {{type:basicPic}} 商品图片
	  	    		 * @return {{type:productLinkUrl}} 商品链接
	  	    		 * @return {{type:basicSort}} 商品分类
	  	    		 * @return {{type:productPrice}} 商品价格
					 */
					list : function(data,func){
						if (validator.isNull(data)){
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.basicAttentionType)){
							ms.alert("列表的类型不能为空");
							return;
						}
						if(validator.isNull(newDataJson.pageNo)){
							ms.alert("页码不能为空");
							return;
						}else if(!validator.isInt(newDataJson.pageNo)){
							ms.alert("页码应为整型");
							return;
						}
						if(validator.isNull(newDataJson.pageSize)){
							ms.alert("分页数量不能为空");
							return;
						}else if(!validator.isInt(newDataJson.pageSize)){
							ms.alert("分页数量应为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/attention/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					}
				}
			}
		}		
	}
>>>>>>> commit
})