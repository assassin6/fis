define(function(require, exports, module) {
	var ms = require("ms");
	var people = require("ms.people");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		"version" : "1.0.0",
		forum : {
			/**
			* 获取版块列表
			------
			* @callmethod forum.list(function(returnJson){...});
			* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* ms.forum.list(function(returnJson){
			*	alert(JSON.stringify(returnJson));
			* });
			* ...
			* @function 
			* [
			*	{
			*		"categoryId":1,
			*		"categoryDateTime":"2015-10-24 10:00:00",
			*		"categoryDescription":"价值来自于分享",
			*		"categorySmallImg":"/upload/msMbbs.jpg",
			*		"categorySort":0,
			*		"categoryTitle":"论坛版块名称"
			*	}
			* ]
			* @return {{type:categoryId}} 版块编号 
			* @return {{type:categoryDateTime}} 版块创建时间 2015-10-24 10:00:00
			* @return {{type:categoryDescription}} 版块描述内容
			* @return {{type:categorySmallImg}} 版块缩略图
			* @return {{type:categorySort}} 版块排序
			* @return {{type:categoryTitle}} 版块标题
			*/
			list : function(func){
				ajaxCfg.url= ms.base + "/mbbs/forum/list.do";
			    ms.ajax(ajaxCfg, func);
			},

			/**
			* 查询category实体
			------
			* 通过categoryId查询category实体并以json的形式给前端
			* @callmethod forum.getByForumId(categoryId,function(returnJson){...});
			* @param  {{type:string,have:true}}  categoryId 版块id
			* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* ms.forum.getByForumId(categoryId,function(returnJson){
			*	alert(JSON.stringify(returnJson));
			* });
			* ...
			* @function 
			* }
			*	"categoryId":1,
			*	"categoryDateTime":"2015-10-24 10:00:00",
			*	"categoryDescription":"价值来自于分享",
			*	"categorySmallImg":"/upload/msMbbs.jpg",
			*	"categorySort":0,
			*	"categoryTitle":"论坛版块名称"
			* }
			* @return {{type:categoryId}} 版块编号 
			* @return {{type:categoryDateTime}} 版块创建时间 2015-10-24 10:00:00
			* @return {{type:categoryDescription}} 版块描述内容
			* @return {{type:categorySmallImg}} 版块缩略图
			* @return {{type:categorySort}} 版块排序
			* @return {{type:categoryTitle}} 版块标题
			*/
			getByForumId : function(categoryId,func){
				if (ms.isEmpty(categoryId)){
					return;
				};
		    	ajaxCfg.url =  ms.base + "/mbbs/forum/"+categoryId+"/getByForumId.do";
		        ms.ajax(ajaxCfg, func);
			},
		},
		people : {
			mbbs :{
				subject : {
					/**
					* 发帖
					------
					* @callmethod people.mbbs.subject.save(data,function(returnJson){...});
					* @param  {{type:json,have:true}}  basicTitle 贴子标题6到70个字
					* @param  {{type:json,have:true}}  basicCategoryId 论坛版块ID
					* @param  {{type:json,have:true}}  subjectContent 贴子内容
					* @param  {{type:json,have:true}}  rand_code 验证码
					* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* <form name="postSubject">
					*	<input type="text" name="basicTitle" /> <!--贴子标题-->
					*	<input name="basicCategoryId"/> <!--版块ID-->
					*	<input name="subjectForumFirstId"/> <!--版块ID-->
					*	<textarea name="subjectContent"></textarea> <!--贴子内容-->
					*	<input type="text"  name="rand_code" /> <!--验证码-->
                    *  	<img id="postCode"/> <!--图片验证码，调用方式请见图片验证码-->
					* </form>
					* ...
					* //验证码加载与点击刷新
					* ms.code("postCode");
					* $("#postCode").click(function(){
					*	ms.code("postCode");
					* });
					* mbbs.people.mbbs.subject.save($("form").serialize(),function(returnJson){
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
				    

				    	if (newDataJson.basicTitle.length < 6 || newDataJson.basicTitle.length >70) {
				    		ms.alert("贴子标题至少6个字且多于70个字");
				    		return;
				    	}
				    	
				    	if(ms.isEmpty(newDataJson.subjectContent)){
				    		ms.alert("贴子内容不能为空");
							return;
				    	};
				    	if(ms.isEmpty(newDataJson.basicCategoryId)){
				    		ms.alert("版块不能为空");
							return;
				    	};
				    	if(ms.isEmpty(newDataJson.rand_code)){
				    		ms.alert("验证码不能为空");
							return;
				    	};
						ajaxCfg.params = data;
				    	ajaxCfg.url = ms.base + "/people/mbbs/subject/save.do";
				        ms.ajax(ajaxCfg,func);
					},

					/**
					* 用户发布的帖子记录列表
					------
					* @callmethod people.mbbs.subject.list(data,function(returnJson){...});
					* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mbbs.people.mbbs.subject.list(function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {
					*	count:2,
					*	list:[{basicId:帖子编号，basicTitlte:标题}]
					* }
					* @return {{type:count}} 记录数量 
					* @return {{type:basicId}} 帖子编号
					* @return {{type:basicTitlte}} 标题
					*/
					list : function(func){
						ajaxCfg.url = ms.base + "/people/mbbs/subject/list.do";
				        ms.ajax(ajaxCfg,func);
					},
					/*
					*读取帖子信息
					------
					* @callmethod people.mbbs.subject.edit(basicId,function(returnJson){...});
					* @param  {{type:string,have:true}} basicId  帖子编号
					* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mbbs.people.mbbs.subject.edit(function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {
					*	count:2,
					*	list:[{basicId:帖子编号，basicTitlte:标题}]
					* }
					* @return {{type:basicTitle}} 标题 
					* @return {{type:subjectContent}} 帖子内容
					* @return {{type:basicCategoryId}} 板块分类
					*/
					edit : function(basicId,func){
						if (ms.isEmpty(basicId)){
							return;
						};
				    	ajaxCfg.url = ms.base + "/people/mbbs/subject/"+basicId+"/detail.do";
				        ms.ajax(ajaxCfg,func);
					},
					/*编辑贴子
					------
					*/
					update : function(basicId,data,func){
						if (ms.isEmpty(data)){
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
				    	if (newDataJson.basicTitle.length < 6 || newDataJson.basicTitle.length >70) {
				    		ms.alert("贴子标题至少6个字且多于70个字");
				    		return;
				    	}
				    	
				    	if(ms.isEmpty(newDataJson.subjectContent)){
				    		ms.alert("贴子内容不能为空");
							return;
				    	};
				    	if(ms.isEmpty(newDataJson.basicCategoryId)){
				    		ms.alert("版块不能为空");
							return;
				    	};
				    	if(ms.isEmpty(newDataJson.rand_code)){
				    		ms.alert("验证码不能为空");
							return;
				    	};
						ajaxCfg.params = data;
				    	ajaxCfg.url = ms.base + "/people/mbbs/subject/"+basicId+"/update.do";
				        ms.ajax(ajaxCfg,func);
					},
				},
				comment : {
					/**
					* 回帖
					------
					* @callmethod people.mbbs.comment.save(data,function(returnJson){...});
					* @param  {{type:json,have:true}}  commentBasicId 评论帖子编号
					* @param  {{type:json,have:true}}  commentContent 评论内容
					* @param  {{type:json,have:true}}  rand_code 验证码
					* @param  {{type:json}}  commentCommentId 评论的父评论编号，当对贴子直接进行评论，不需要此参数，对贴子已有评论进行回复时，此参数必要
					* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* <form name="comment">
					*	<input name="commentBasicId"/> <!--评论帖子编号-->
					*	<textarea name="commentContent"></textarea> <!--评论内容-->
					*	<input type="text"  name="rand_code" /> <!--验证码-->
					*	<input name="commentCommentId"/> <!--评论的父评论编号-->
                    *  	<img id="commentCode"/> <!--图片验证码，调用方式请见图片验证码-->
					* </form>
					* ...
					* //验证码加载与点击刷新
					* ms.code("commentCode");
					* $("#commentCode").click(function(){
					*	ms.code("commentCode");
					* });
					* mbbs.people.mbbs.comment.save($("form").serialize(),function(returnJson){
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
				    		ms.alert("评论帖子编号不能为空");
							return;
				    	};
				    	if(ms.isEmpty(newDataJson.rand_code)){
				    		ms.alert("验证码不能为空");
							return;
				    	};
						ajaxCfg.params = data;
				    	ajaxCfg.url = ms.base + "/people/mbbs/comment/save.do";
				        ms.ajax(ajaxCfg,func);
					},
					/**
					* 用户评论列表
					------
					* @callmethod people.mbbs.comment.list(function(returnJson){...});
					* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mbbs.people.mbbs.comment.list(function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {
					*	count:"错误编码",
					*	list:{
					*			"count":1,
					*			"list":[{
					*				"commentBasicId":被评论信息编号,
					*				"commentCommentId":父评论编号,
					*				"commentId":评论编号,
					*				"commentPoints":评论分数,
					*				"commentTime":"时间"
					*			}]
					*		}
					* }
					* @return {{type:count}} 错误编码 (返回值不知道怎么写)
					* @return {{type:basicId}} 帖子编号
					* @return {{type:basicTitlte}} 标题
					*/
					list : function(func){
						ajaxCfg.url = ms.base + "/people/mbbs/comment/list.do";
				        ms.ajax(ajaxCfg,func);
					},
				},
			},
		},

	}

});