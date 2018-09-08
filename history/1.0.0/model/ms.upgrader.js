/**
 * msotre&升级器
 */
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		"version" : "1.0.0",
		people : {
			/**
			 * @name 用户分享列表
			 * @param func
			 *            回调方法
			 * @return json数据
			 */
			list : function(func) {
				ajaxCfg.url = "/people/upgrader/version/list.do";
				ms.ajax(ajaxCfg, func)
			},
			save : function(data, func) {
				ajaxCfg.url = "/people/upgrader/version/save.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func)
			},
			"delete" : function(id, func) {
				ajaxCfg.url = "/people/upgrader/version/delete.do";
				ms.ajax(ajaxCfg, func)
			},
			release : function(id, data,func) {
				ajaxCfg.url = "/people/upgrader/version/"+id+"/release.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func)
			},
			edit : function(id, func) {
				ajaxCfg.url = "/people/upgrader/version/"+id+"/edit.do";
				ms.ajax(ajaxCfg, func)
			},
			data : function(func) {
				ajaxCfg.url = "/people/upgrader/version/data.do";
				ms.ajax(ajaxCfg, func);
			},
			payList : function(func) {
				ajaxCfg.url = "/people/upgrader/upgraderPeopleVersion/payList.do";
				ms.ajax(ajaxCfg, func);
			},
			downList : function(func) {
				ajaxCfg.url = "/people/upgrader/upgraderPeopleVersion/downList.do";
				ms.ajax(ajaxCfg, func);
			},
			userList : function(func) {
				ajaxCfg.url = "/people/upgrader/upgraderPeopleVersion/userList.do";
				ms.ajax(ajaxCfg, func);
			},
			topSponsor : function(func){
				ajaxCfg.url = "/ms/topSponsor.do";
				ms.ajax(ajaxCfg, func);
			},
			topShareUser : function(func){
				ajaxCfg.url = "/ms/topShareUser.do";
				ms.ajax(ajaxCfg, func);
			},
			topDown : function(func){
				ajaxCfg.url = "/ms/topDown.do";
				ms.ajax(ajaxCfg, func);
			},
		},
	}


});