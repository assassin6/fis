<<<<<<< HEAD
define(function(reuqire,exports,module){
	var ms = reuqire("ms");
	var ajaxCfg = {
			"type" : "post",
			"newDataJsonType" : "json"
		};
	return{
		mall : {
			orderComment : {
				"version" : "1.0.0",
				/**
				 * 删除商品评价
				 ------
				 * ocCommentId:多个ocCommentId直接用逗号隔开,例如ocCommentId=1,2,3,4 批量删除订单评价
				 * @callmethod mall.orderComment.del(data,function(returnJson){....});
				 * @param {{type:int,have:true}} ocCommentId 评论编号
				 * @examples
				 * ...
				 * mmall.mall.orderComment.del($("form").serialize(),function(returnJson){
				 *		alert(JSON.stringify(data,returnJson));	
				 *});
				 * ...
				 * @function
				 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
				 *@return {{type:code}} 错误编码
				 *@return {{type:result}} true 成功、false 失败
				 *@return {{type:resultMsg}} 错误信息
				 */
				del : function(data,func){
					if(validator.isNull(data)){
						return;
					};
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.ocCommentId)){
						ms.alert("评论编号不能为空");
						return;
					};
					if(!validator.isInt(newnDataJson.ocCommentId)){
						ms.alert("评论编号应该为整形");
						return;
					}
					var idArray = new Array;
					var dotNum = 0;
					idArray = newnDataJson.ocCommentId.split(",");
					for(var index = 0; index<newnDataJson.ocCommentId.length; index++) {
						if(newnDataJson.ocCommentId[index] === ",") {
							dotNum++;
						}
					}
					if(dotNum >= idArray.length) {
						ms.alert("输入参数格式有误");
						return;
					}
					ajaxCfg.url = ms.base + "/mall/orderComment/delete.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 获取订单评价
				------
				 * @callmethod mall.orderComment.get(data,function(returnJson){....});
				 * @param {{type:int,have:true}} ocCommentId 评论编号
				 * @param {{type:int,have:true}} ocOrderId 订单编号
				 * @param {{type:string,have:true}} ocImpression 印象
				 * @param {{type:string,have:true}} ocProduct 商品符合度
				 * @param {{type:string,have:true}} ocService 店家服务态度
				 * @param {{type:string,have:true}} ocLogistics 物流发货速度
				 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.get($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				get : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.ocImpression)){
						ms.alert("印象不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocProduct)){
						ms.alert("商品符合度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocService)){
						ms.alert("店家服务态度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocLogistics)){
						ms.alert("物流发货速度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocServiceDescribe)){
						ms.alert("评价服务不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/get.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 * 订单评价列表
				 ------
				 * 查询订单评价列表
				 * @callmethod mall.orderComment.list(data,function(returnJson){....});
				 * @param {{type:int,have:true}} ocCommentId 评论编号
				 * @param {{type:int,have:true}} ocOrderId 订单编号
				 * @param {{type:string,have:true}} ocImpression 印象
				 * @param {{type:string,have:true}} ocProduct 商品符合度
				 * @param {{type:string,have:true}} ocService 店家服务态度
				 * @param {{type:string,have:true}} ocLogistics 物流发货速度
				 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.list($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				list : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.commentBasicId)){
						ms.alert("商品编号不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.commentBasicId)){
						ms.alert("商品编号应该为整形");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/list.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 *保存订单评价
				 ------
				 *保存订单评价实体
				 *@callmethod mall.orderComment.save(data,function(returnJson){....});
				 *@param {{type:int,have:true}} ocCommentId 评论编号
				 *@param {{type:int,have:true}} ocOrderId 订单编号
				 *@param {{type:string,have:true}} ocImpression 印象
				 *@param {{type:string,have:true}} ocProduct 商品符合度
				 *@param {{type:string,have:true}} ocService 店家服务态度
				 *@param {{type:string,have:true}} ocLogistics 物流发货速度
				 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.save($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				save : function(data,func){
					if(validator.isNull(data)){
						return;
					} 
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.commentContent)){
						ms.alert("评论内容不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocImpression)){
						ms.alert("印象不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocProduct)){
						ms.alert("商品符合度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocService)){
						ms.alert("店家服务态度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocLogistics)){
						ms.alert("物流发货速度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocServiceDescribe)){
						ms.alert("评价服务不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/save.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 *更新订单评价
				 ------
				 *更新订单评价信息订单评价
				 *@callmethod mall.orderComment.update(data,function(returnJson){....});
				 *@param {{type:int,have:true}} ocCommentId 评论编号
				 *@param {{type:int,have:true}} ocOrderId 订单编号
				 *@param {{type:string,have:true}} ocImpression 印象
				 *@param {{type:string,have:true}} ocProduct 商品符合度
				 *@param {{type:string,have:true}} ocService 店家服务态度
				 *@param {{type:string,have:true}} ocLogistics 物流发货速度
				 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.update($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				update : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.ocImpression)){
						ms.alert("印象不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocProduct)){
						ms.alert("商品符合度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocService)){
						ms.alert("店家服务态度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocLogistics)){
						ms.alert("物流发货速度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocServiceDescribe)){
						ms.alert("评价服务不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/update.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
			}
		},
		people : {
			mall : {
				orderComment : {
					"version" : "1.0.0",
					/**
					 * 删除商品评价
					 ------
					 * ocCommentId:多个ocCommentId直接用逗号隔开,例如ocCommentId=1,2,3,4 批量删除订单评价
					 * @callmethod people.mall.orderComment.del(data,function(returnJson){....});
					 * @param {{type:int,have:true}} ocCommentId 评论编号
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.del($("form").serialize(),function(returnJson){
					 *		alert(JSON.stringify(data,returnJson));	
					 *});
					 * ...
					 * @function
					 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					 *@return {{type:code}} 错误编码
					 *@return {{type:result}} true 成功、false 失败
					 *@return {{type:resultMsg}} 错误信息
					 */
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						};
						var newnDataJson=ms.turnJson(data);
						if(!validator.isNull(newnDataJson.ocCommentId)){
							if(!validator.isInt(newnDataJson.ocCommentId)){
								ms.alert("评论编号应该为整形");
								return;
							}
						};
						var idArray = new Array;
						var dotNum = 0;
						idArray = newnDataJson.ocCommentId.split(",");
						for(var index = 0; index<newnDataJson.ocCommentId.length; index++) {
							if(newnDataJson.ocCommentId[index] === ",") {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/orderComment/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 订单评价列表
					 ------
					 * 查询订单评价列表
					 * @callmethod people.mall.orderComment.list(data,function(returnJson){....});
					 * @param {{type:int,have:true}} ocCommentId 评论编号
					 * @param {{type:int,have:true}} ocOrderId 订单编号
					 * @param {{type:string,have:true}} ocImpression 印象
					 * @param {{type:string,have:true}} ocProduct 商品符合度
					 * @param {{type:string,have:true}} ocService 店家服务态度
					 * @param {{type:string,have:true}} ocLogistics 物流发货速度
					 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.list($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					list : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.commentBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if(!validator.isInt(newnDataJson.commentBasicId)){
							ms.alert("商品编号应该为整形");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 *保存订单评价
					 ------
					 *保存订单评价实体
					 *@callmethod people.mall.orderComment.save(data,function(returnJson){....});
					 *@param {{type:int,have:true}} ocCommentId 评论编号
					 *@param {{type:int,have:true}} ocOrderId 订单编号
					 *@param {{type:string,have:true}} ocImpression 印象
					 *@param {{type:string,have:true}} ocProduct 商品符合度
					 *@param {{type:string,have:true}} ocService 店家服务态度
					 *@param {{type:string,have:true}} ocLogistics 物流发货速度
					 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.save($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						} 
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.commentContent)){
							ms.alert("评论内容不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocImpression)){
							ms.alert("印象不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocProduct)){
							ms.alert("商品符合度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocService)){
							ms.alert("店家服务态度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocLogistics)){
							ms.alert("物流发货速度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocServiceDescribe)){
							ms.alert("评价服务不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 *更新订单评价
					 ------
					 *更新订单评价信息订单评价
					 *@callmethod people.mall.orderComment.update(data,function(returnJson){....});
					 *@param {{type:int,have:true}} ocCommentId 评论编号
					 *@param {{type:int,have:true}} ocOrderId 订单编号
					 *@param {{type:string,have:true}} ocImpression 印象
					 *@param {{type:string,have:true}} ocProduct 商品符合度
					 *@param {{type:string,have:true}} ocService 店家服务态度
					 *@param {{type:string,have:true}} ocLogistics 物流发货速度
					 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.update($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.ocImpression)){
							ms.alert("印象不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocProduct)){
							ms.alert("商品符合度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocService)){
							ms.alert("店家服务态度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocLogistics)){
							ms.alert("物流发货速度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocServiceDescribe)){
							ms.alert("评价服务不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				}
			}
		}
	}
=======
define(function(reuqire,exports,module){
	var ms = reuqire("ms");
	var ajaxCfg = {
			"type" : "post",
			"newDataJsonType" : "json"
		};
	return{
		mall : {
			orderComment : {
				"version" : "1.0.0",
				/**
				 * 删除商品评价
				 ------
				 * ocCommentId:多个ocCommentId直接用逗号隔开,例如ocCommentId=1,2,3,4 批量删除订单评价
				 * @callmethod mall.orderComment.del(data,function(returnJson){....});
				 * @param {{type:int,have:true}} ocCommentId 评论编号
				 * @examples
				 * ...
				 * mmall.mall.orderComment.del($("form").serialize(),function(returnJson){
				 *		alert(JSON.stringify(data,returnJson));	
				 *});
				 * ...
				 * @function
				 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
				 *@return {{type:code}} 错误编码
				 *@return {{type:result}} true 成功、false 失败
				 *@return {{type:resultMsg}} 错误信息
				 */
				del : function(data,func){
					if(validator.isNull(data)){
						return;
					};
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.ocCommentId)){
						ms.alert("评论编号不能为空");
						return;
					};
					if(!validator.isInt(newnDataJson.ocCommentId)){
						ms.alert("评论编号应该为整形");
						return;
					}
					var idArray = new Array;
					var dotNum = 0;
					idArray = newnDataJson.ocCommentId.split(",");
					for(var index = 0; index<newnDataJson.ocCommentId.length; index++) {
						if(newnDataJson.ocCommentId[index] === ",") {
							dotNum++;
						}
					}
					if(dotNum >= idArray.length) {
						ms.alert("输入参数格式有误");
						return;
					}
					ajaxCfg.url = ms.base + "/mall/orderComment/delete.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				 * 获取订单评价
				------
				 * @callmethod mall.orderComment.get(data,function(returnJson){....});
				 * @param {{type:int,have:true}} ocCommentId 评论编号
				 * @param {{type:int,have:true}} ocOrderId 订单编号
				 * @param {{type:string,have:true}} ocImpression 印象
				 * @param {{type:string,have:true}} ocProduct 商品符合度
				 * @param {{type:string,have:true}} ocService 店家服务态度
				 * @param {{type:string,have:true}} ocLogistics 物流发货速度
				 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.get($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				get : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.ocImpression)){
						ms.alert("印象不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocProduct)){
						ms.alert("商品符合度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocService)){
						ms.alert("店家服务态度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocLogistics)){
						ms.alert("物流发货速度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocServiceDescribe)){
						ms.alert("评价服务不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/get.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 * 订单评价列表
				 ------
				 * 查询订单评价列表
				 * @callmethod mall.orderComment.list(data,function(returnJson){....});
				 * @param {{type:int,have:true}} ocCommentId 评论编号
				 * @param {{type:int,have:true}} ocOrderId 订单编号
				 * @param {{type:string,have:true}} ocImpression 印象
				 * @param {{type:string,have:true}} ocProduct 商品符合度
				 * @param {{type:string,have:true}} ocService 店家服务态度
				 * @param {{type:string,have:true}} ocLogistics 物流发货速度
				 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.list($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				list : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.commentBasicId)){
						ms.alert("商品编号不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.commentBasicId)){
						ms.alert("商品编号应该为整形");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/list.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 *保存订单评价
				 ------
				 *保存订单评价实体
				 *@callmethod mall.orderComment.save(data,function(returnJson){....});
				 *@param {{type:int,have:true}} ocCommentId 评论编号
				 *@param {{type:int,have:true}} ocOrderId 订单编号
				 *@param {{type:string,have:true}} ocImpression 印象
				 *@param {{type:string,have:true}} ocProduct 商品符合度
				 *@param {{type:string,have:true}} ocService 店家服务态度
				 *@param {{type:string,have:true}} ocLogistics 物流发货速度
				 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.save($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				save : function(data,func){
					if(validator.isNull(data)){
						return;
					} 
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.commentContent)){
						ms.alert("评论内容不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocImpression)){
						ms.alert("印象不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocProduct)){
						ms.alert("商品符合度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocService)){
						ms.alert("店家服务态度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocLogistics)){
						ms.alert("物流发货速度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocServiceDescribe)){
						ms.alert("评价服务不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/save.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
				/**
				 *更新订单评价
				 ------
				 *更新订单评价信息订单评价
				 *@callmethod mall.orderComment.update(data,function(returnJson){....});
				 *@param {{type:int,have:true}} ocCommentId 评论编号
				 *@param {{type:int,have:true}} ocOrderId 订单编号
				 *@param {{type:string,have:true}} ocImpression 印象
				 *@param {{type:string,have:true}} ocProduct 商品符合度
				 *@param {{type:string,have:true}} ocService 店家服务态度
				 *@param {{type:string,have:true}} ocLogistics 物流发货速度
				 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
				 * @examples
				 * ...
				 * mmall.mall.orderComment.update($("form").serialize(),function(returnJson){
				 * 		alert(JSON.stringify(returnJson));	
				 * });
				 * ...
				 * @function
				 * [
				 * {
				 * "ocCommentId":评论编号,
				 * "ocOrderId":订单编号,
				 * "ocImpression":"印象",
				 * "ocProduct":商品符合度,
				 * "ocService":店家服务态度,
				 * "ocLogistics":物流发货速度,
				 * "ocServiceDescribe":"评价服务"
				 * }
				 * ]
				 * @return {{type:ocCommentId}} 评论编号
				 * @return {{type:ocOrderId}} 订单编号
				 * @return {{type:ocImpression}} 印象
				 * @return {{type:ocProduct}} 商品符合度
				 * @return {{type:ocService}} 店家服务态度
				 * @return {{type:ocLogistics}} 物流发货速度
				 * @return {{type:ocServiceDescribe}} 评价服务
				 */
				update : function(data,func){
					if(validator.isNull(data)){
						return;
					}
					var newnDataJson=ms.turnJson(data);
					if(validator.isNull(newnDataJson.ocImpression)){
						ms.alert("印象不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocProduct)){
						ms.alert("商品符合度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocService)){
						ms.alert("店家服务态度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocLogistics)){
						ms.alert("物流发货速度不能为空");
						return;
					};
					if(validator.isNull(newnDataJson.ocServiceDescribe)){
						ms.alert("评价服务不能为空");
						return;
					};
					ajaxCfg.url = ms.base + "/mall/orderComment/update.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);
				},
			}
		},
		people : {
			mall : {
				orderComment : {
					"version" : "1.0.0",
					/**
					 * 删除商品评价
					 ------
					 * ocCommentId:多个ocCommentId直接用逗号隔开,例如ocCommentId=1,2,3,4 批量删除订单评价
					 * @callmethod people.mall.orderComment.del(data,function(returnJson){....});
					 * @param {{type:int,have:true}} ocCommentId 评论编号
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.del($("form").serialize(),function(returnJson){
					 *		alert(JSON.stringify(data,returnJson));	
					 *});
					 * ...
					 * @function
					 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					 *@return {{type:code}} 错误编码
					 *@return {{type:result}} true 成功、false 失败
					 *@return {{type:resultMsg}} 错误信息
					 */
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						};
						var newnDataJson=ms.turnJson(data);
						if(!validator.isNull(newnDataJson.ocCommentId)){
							if(!validator.isInt(newnDataJson.ocCommentId)){
								ms.alert("评论编号应该为整形");
								return;
							}
						};
						var idArray = new Array;
						var dotNum = 0;
						idArray = newnDataJson.ocCommentId.split(",");
						for(var index = 0; index<newnDataJson.ocCommentId.length; index++) {
							if(newnDataJson.ocCommentId[index] === ",") {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/orderComment/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 订单评价列表
					 ------
					 * 查询订单评价列表
					 * @callmethod people.mall.orderComment.list(data,function(returnJson){....});
					 * @param {{type:int,have:true}} ocCommentId 评论编号
					 * @param {{type:int,have:true}} ocOrderId 订单编号
					 * @param {{type:string,have:true}} ocImpression 印象
					 * @param {{type:string,have:true}} ocProduct 商品符合度
					 * @param {{type:string,have:true}} ocService 店家服务态度
					 * @param {{type:string,have:true}} ocLogistics 物流发货速度
					 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.list($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					list : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.commentBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if(!validator.isInt(newnDataJson.commentBasicId)){
							ms.alert("商品编号应该为整形");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 *保存订单评价
					 ------
					 *保存订单评价实体
					 *@callmethod people.mall.orderComment.save(data,function(returnJson){....});
					 *@param {{type:int,have:true}} ocCommentId 评论编号
					 *@param {{type:int,have:true}} ocOrderId 订单编号
					 *@param {{type:string,have:true}} ocImpression 印象
					 *@param {{type:string,have:true}} ocProduct 商品符合度
					 *@param {{type:string,have:true}} ocService 店家服务态度
					 *@param {{type:string,have:true}} ocLogistics 物流发货速度
					 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.save($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						} 
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.commentContent)){
							ms.alert("评论内容不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocImpression)){
							ms.alert("印象不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocProduct)){
							ms.alert("商品符合度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocService)){
							ms.alert("店家服务态度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocLogistics)){
							ms.alert("物流发货速度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocServiceDescribe)){
							ms.alert("评价服务不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 *更新订单评价
					 ------
					 *更新订单评价信息订单评价
					 *@callmethod people.mall.orderComment.update(data,function(returnJson){....});
					 *@param {{type:int,have:true}} ocCommentId 评论编号
					 *@param {{type:int,have:true}} ocOrderId 订单编号
					 *@param {{type:string,have:true}} ocImpression 印象
					 *@param {{type:string,have:true}} ocProduct 商品符合度
					 *@param {{type:string,have:true}} ocService 店家服务态度
					 *@param {{type:string,have:true}} ocLogistics 物流发货速度
					 *@param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @examples
					 * ...
					 * mmall.people.mall.orderComment.update($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.ocImpression)){
							ms.alert("印象不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocProduct)){
							ms.alert("商品符合度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocService)){
							ms.alert("店家服务态度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocLogistics)){
							ms.alert("物流发货速度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocServiceDescribe)){
							ms.alert("评价服务不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				}
			}
		}
	}
>>>>>>> commit
});