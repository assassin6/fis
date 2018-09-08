define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		"version" : "1.0.0",
		article : {

			/**
			 * 文章列表
			------
			 * 通过异步请求获得指定栏目下的文章列表
			 * @callmethod article.list(data,function(json){...});
			 * @param {{type:string,have:true}} pageNo 一页显示数量
			 * @param {{type:string,have:true}} pageSize 当前页码
			 * @param {{type:string,have:true}} basicCategoryId 文章栏目编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcms.article.list($("form").serialize(),function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			 */
			list : function(data,func){
				if (ms.isEmpty(data)){
					return;
				};
				//将data参数转json
				var newDataJson = ms.turnJson(data);
				if (ms.isEmpty(newDataJson.pageNo)){
					ms.alert("一页显示数量不能为空");
					return;
				};
				if (ms.isEmpty(newDataJson.pageSize)){
					ms.alert("当前页码不能为空");
					return;
				};
				if (ms.isEmpty(newDataJson.basicCategoryId)){
					ms.alert("分类编号不能为空");
					return;
				};
				ajaxCfg.url = ms.base + "/mcms/article/list.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);	
			},
			/**
			 * 文章内容
			------
			 * @callmethod article.detail(basicId,function(json){...});
			 * @param {{type:string,have:true}} basicId 文章编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcms.article.detail("{ms:field.id/}",function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			*/
			detail : function(basicId,func){
				if (ms.isEmpty(basicId)){
					ms.alert("文章编号不能为空");
					return;
				};
				ajaxCfg.url = ms.base +"/mcms/article/"+ basicId + "/detail.do";
				ms.ajax(ajaxCfg, func);	
			},
			/**
			 * 文章点击数
			------
			 * @callmethod article.hit(basicId,function(json){...});
			 * @param {{type:string,have:true}} basicId 文章编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcms.article.hit("{ms:field.id/}",function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			*/
			hit : function(basicId,func){
				if (ms.isEmpty(basicId)){
					ms.alert("文章编号不能为空");
					return;
				};
				ajaxCfg.url = ms.base +"/mcms/article/"+ basicId + "/hit.do";
				ms.ajax(ajaxCfg, func);	
			},

			
			
		},
		comment : {
			/**
			 * 评论列表
			------
			 * 获取文章的评论列表
			 * @callmethod comment.list(data,function(json){...});
			 * @param {{type:commentBasicId,have:true}}  文章编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcms.comment.list(data,function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			*/
			list : function(data,func){
				if (ms.isEmpty(data)){
					return;
				};
				//将data参数转json
				var newDataJson = ms.turnJson(data);
		    	if(ms.isEmpty(newDataJson.commentBasicId)){
		    		ms.alert("文章编号不能为空");
					return;
		    	};
		    	ajaxCfg.params = data;
				ajaxCfg.url = ms.base + "/comment/list.do";
		        ms.ajax(ajaxCfg,func);
			},
			people : {
				/**
				* 发布评论
				------
				* @callmethod comment.people.save(data,function(returnJson){...});
				* @param  {{type:json,have:true}}  commentBasicId 评论帖子编号
				* @param  {{type:json,have:true}}  commentContent 评论内容
				* @param  {{type:json,have:true}}  rand_code 验证码
				* @param  {{type:json}}  commentCommentId 评论的父评论编号，当对文章直接进行评论，不需要此参数，对文章已有评论进行回复时，此参数必要
				* @param  {{type:json}}  commentPicture 评论图片
				* @param  {{type:json}}  commentPoints 评论分数
				* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* <form name="comment">
				*	<input name="commentBasicId"/> <!--评论帖子编号-->
				*	<textarea name="commentContent"></textarea> <!--评论内容-->
				*	<input type="text"  name="rand_code" /> <!--验证码-->
                *  	<img id="commentCode"/> 
				* </form>
				* ...
				* //验证码加载与点击刷新
				* ms.code("commentCode");
				* $("#commentCode").click(function(){
				*	ms.code("commentCode");
				* });
				* mcms.comment.people.save($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* })
				* ...
				* @function 
				* {
				*	code:"错误编码",
				*	result:"true｜false",
				*	resultMsg:"错误信息"
				* }
				* @return {{type:code}} 模块编码
				* @return {{type:result}} true存在｜false不存在或错误
				* @return {{type:resultMsg}} 错误信息
				*/
				save : function(data,func){
					if (ms.isEmpty(data)){
						return;
					};
					//将data参数转json
					var newDataJson = ms.turnJson(data);
			    	if(ms.isEmpty(newDataJson.commentContent)){
			    		ms.alert("评论内容不能为空");
						return;
			    	};
			    	if(ms.isEmpty(newDataJson.commentBasicId)){
			    		ms.alert("评论文章编号不能为空");
						return;
			    	};
			    	if(ms.isEmpty(newDataJson.rand_code)){
			    		ms.alert("验证码不能为空");
						return;
			    	};
					ajaxCfg.params = data;
			    	ajaxCfg.url = ms.base + "/people/comment/save.do";
			        ms.ajax(ajaxCfg,func);
				},
			},
		},
		attention : {
			/**
			* 文章收藏数
			------
			根据文章收藏类型，返回对应的收藏数
			* @callmethod attention.people.save(data,function(returnJson){...});
			 * @param {{type:string,have:true}} basicAttentionBasicId 文章编号
			 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
			 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
			 * @examples 
			 * ...
			 * mcms.attention.count($("form").serialize(),function(returnJson){
      		 *		alert(JSON.stringify(returnJson));
    		 *	})
    		 * ...
    		 * @function 
    		 * 1
    		 * @return {{type:string}} 收藏数量
			 */
			count : function(data,func){
				if (validator.isNull(data)){
					return;
				};
				//将data参数转json
				var newDataJson = ms.turnJson(data);
				if(validator.isNull(newDataJson.basicAttentionType)){
					ms.alert("收藏类型不能为空");
					return;
				}
				if (validator.isNull(newDataJson.basicAttentionBasicId)){
					ms.alert("文章编号不能为空");
					return;
				}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
					ms.alert("文章编号应该为整型");
					return;
				};
				ajaxCfg.url = ms.base + "/attention/count.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);	
			},
			people : {
				/**
				 * 文章收藏
				 ------
				 可设置不同的关注类型，达到不同的关注操作与统计，比如关注类型为1可为收藏文章，为2是点赞，为3是踩，为4是关注等
				 * @callmethod attention.people.save(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 文章编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcms.attention.people.save($("form").serialize(),function(returnJson){
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
						ms.alert("文章编号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
						ms.alert("文章编号应该为整型");
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
				 * 判断文章是否收藏过
				 ------
				 * @callmethod attention.people.isExists(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcms.attention.people.isExists($("form").serialize(),function(returnJson){
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
						ms.alert("文章编号不能为空");
						return;
					}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
						ms.alert("文章编号为整型");
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
				 * @callmethod attention.people.del(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicId 信息编号集合 多个编号用逗号隔开,例如1,2,3,4
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcms.attention.people.del($("form").serialize(),function(returnJson){
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
					if(validator.isNull(newDataJson.basicAttentionType)){
						ms.alert("basicAttentionType不能为空");
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
				 * @callmethod attention.people.list(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
				 * @param {{type:string,have:true}} modelCode 模块编码
				 * @param {{type:string,have:true}} pageNo  页码
				 * @param {{type:string,have:true}} pageSize 一页显示数量
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcms.attention.people.list($("form").serialize(),function(returnJson){
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
			}
		}
	}
})