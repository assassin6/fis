<<<<<<< HEAD
﻿define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type": "post",
		"dataType": "json",
	};
	return {
		"version": "1.0.0",
		people: {
			mcode: {
				project: {
					/*保存项目实体*/
					save: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.projectId)) {
							ms.alert("版本关联编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.projectId)) {
							ms.alert("版本关联编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.projectName)) {
							ms.alert("项目名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectPackage)) {
							ms.alert("项目包不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectAuthor)) {
							ms.alert("作者不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectVersion)) {
							ms.alert("版本不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/project/save.do";
						ms.ajax(ajaxCfg, func);
					},
					/*生成代码*/
					code: function(projectId, func) {
						if(validator.isNull(projectId)) {
							ms.alert("编号不能为空");
							return;
						} else if(!validator.isInt(projectId)) {
							ms.alert("编号为整型");
							return;
						};
						ajaxCfg.params = "projectId=" + projectId;
						ajaxCfg.url = ms.base + "/people/mcode/project/code.do";
						ms.ajax(ajaxCfg, func);
					},
					/*查询项目列表*/
					list: function(func) {
						ajaxCfg.url = ms.base + "/people/mcode/project/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*获取项目*/
					get: function(projectId, func) {
						if(!validator.isNull(projectId)) {
							if(!validator.isInt(projectId)) {
								ms.alert("版本编号为整型");
								return;
							}
						} else {
							return;
						}
						ajaxCfg.params = "projectId=" + projectId;
						ajaxCfg.url = ms.base + "/people/mcode/project/get.do";
						ms.ajax(ajaxCfg, func);
					},
					/*更新项目信息项目*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.projectId)) {
							ms.alert("版本关联编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.projectId)) {
							ms.alert("版本关联编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.projectName)) {
							ms.alert("项目名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectPackage)) {
							ms.alert("项目包不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectAuthor)) {
							ms.alert("作者不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectVersion)) {
							ms.alert("版本不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/project/update.do";
						ms.ajax(ajaxCfg, func);
					},
					/*删除项目实体*/
					del: function(data, func) {
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.projectId)) {
							ms.alert("basicId不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.projectId.split(",");
						for(var index = 0; index < newDataJson.projectId.length; index++) {
							if(newDataJson.projectId[index] === ',') {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mcode/project/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				},

				projectModel: {
					/*获取模块*/
					get: function(pmId, func) {
						if(validator.isNull(pmId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(pmId)) {
							ms.alert("模块编号为整型");
							return;
						};

						ajaxCfg.params = "pmId=" + pmId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/get.do";
						ms.ajax(ajaxCfg, func);
					},
					/*保存模块实体*/
					save: function(data, func, error) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmProjectId)) {
							ms.alert("项目编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmProjectId)) {
							ms.alert("项目编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.pmJdbc)) {
							ms.alert("IP不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmDatabase)) {
							ms.alert("数据库名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmUsername)) {
							ms.alert("账号不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmPassword)) {
							ms.alert("密码不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.error = error;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/save.do";
						ms.ajax(ajaxCfg, func);
					},
					/*查询模块列表*/
					list: function(pmProjectId, func) {
						if(validator.isNull(pmProjectId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(pmProjectId)) {
							ms.alert("模块编号为整型");
							return;
						};

						ajaxCfg.params = "pmProjectId=" + pmProjectId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*更新模块信息模块*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmProjectId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmProjectId)) {
							ms.alert("模块编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.pmName)) {
							ms.alert("模块名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmPackageName)) {
							ms.alert("模块包名不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmDatabase)) {
							ms.alert("数据库名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmUsername)) {
							ms.alert("账号不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmPassword)) {
							ms.alert("密码不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/update.do";
						ms.ajax(ajaxCfg, func);
					},
					/*删除模块*/
					del: function(data, func) {
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmId)) {
							ms.alert("basicId不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.pmId.split(",");
						for(var index = 0; index < newDataJson.pmId.length; index++) {
							if(newDataJson.pmId[index] === ',') {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				},

				projectModelObject: {
					/*获取对象*/
					get: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmoPmId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmoPmId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObject/get.do";
						ms.ajax(ajaxCfg, func);
					},
					/*保存对象*/

					/*查询对象列表*/
					list: function(pmoPmId, func) {
						if(validator.isNull(pmoPmId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(pmoPmId)) {
							ms.alert("模块编号为整型");
							return;
						};

						ajaxCfg.params = "pmoPmId=" + pmoPmId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObject/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*更新对象信息对象*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmoId)) {
							ms.alert("编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmoId)) {
							ms.alert("编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.pmoTableName)) {
							ms.alert("表名不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObject/update.do";
						ms.ajax(ajaxCfg, func);
					},
				},

				projectModelObjectField: {
					/*查询对象字段列表*/
					list: function(pmofPmoId, func) {
						if(validator.isNull(pmofPmoId)) {
							return;
						} else if(!validator.isInt(pmofPmoId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = "pmofPmoId=" + pmofPmoId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*保存对象字段实体*/
					save: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmofId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmofId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/save.do";
						ms.ajax(ajaxCfg, func);
					},

					/*更新对象字段实体*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmofId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmofId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/update.do";
						ms.ajax(ajaxCfg, func);
					},
					/*获取对象字段*/
					get: function(pmofId, func) {
						if(validator.isNull(pmofId)) {
							return;
						} else if(!validator.isInt(pmofId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = "pmofId=" + pmofId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/get.do";
						ms.ajax(ajaxCfg, func);
					},
				},
			},
		},

	}
});
=======
﻿define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type": "post",
		"dataType": "json",
	};
	return {
		"version": "1.0.0",
		people: {
			mcode: {
				project: {
					/*保存项目实体*/
					save: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.projectId)) {
							ms.alert("版本关联编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.projectId)) {
							ms.alert("版本关联编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.projectName)) {
							ms.alert("项目名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectPackage)) {
							ms.alert("项目包不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectAuthor)) {
							ms.alert("作者不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectVersion)) {
							ms.alert("版本不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/project/save.do";
						ms.ajax(ajaxCfg, func);
					},
					/*生成代码*/
					code: function(projectId, func) {
						if(validator.isNull(projectId)) {
							ms.alert("编号不能为空");
							return;
						} else if(!validator.isInt(projectId)) {
							ms.alert("编号为整型");
							return;
						};
						ajaxCfg.params = "projectId=" + projectId;
						ajaxCfg.url = ms.base + "/people/mcode/project/code.do";
						ms.ajax(ajaxCfg, func);
					},
					/*查询项目列表*/
					list: function(func) {
						ajaxCfg.url = ms.base + "/people/mcode/project/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*获取项目*/
					get: function(projectId, func) {
						if(!validator.isNull(projectId)) {
							if(!validator.isInt(projectId)) {
								ms.alert("版本编号为整型");
								return;
							}
						} else {
							return;
						}
						ajaxCfg.params = "projectId=" + projectId;
						ajaxCfg.url = ms.base + "/people/mcode/project/get.do";
						ms.ajax(ajaxCfg, func);
					},
					/*更新项目信息项目*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.projectId)) {
							ms.alert("版本关联编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.projectId)) {
							ms.alert("版本关联编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.projectName)) {
							ms.alert("项目名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectPackage)) {
							ms.alert("项目包不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectAuthor)) {
							ms.alert("作者不能为空");
							return;
						};
						if(validator.isNull(newDataJson.projectVersion)) {
							ms.alert("版本不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/project/update.do";
						ms.ajax(ajaxCfg, func);
					},
					/*删除项目实体*/
					del: function(data, func) {
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.projectId)) {
							ms.alert("basicId不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.projectId.split(",");
						for(var index = 0; index < newDataJson.projectId.length; index++) {
							if(newDataJson.projectId[index] === ',') {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mcode/project/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				},

				projectModel: {
					/*获取模块*/
					get: function(pmId, func) {
						if(validator.isNull(pmId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(pmId)) {
							ms.alert("模块编号为整型");
							return;
						};

						ajaxCfg.params = "pmId=" + pmId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/get.do";
						ms.ajax(ajaxCfg, func);
					},
					/*保存模块实体*/
					save: function(data, func, error) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmProjectId)) {
							ms.alert("项目编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmProjectId)) {
							ms.alert("项目编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.pmJdbc)) {
							ms.alert("IP不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmDatabase)) {
							ms.alert("数据库名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmUsername)) {
							ms.alert("账号不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmPassword)) {
							ms.alert("密码不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.error = error;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/save.do";
						ms.ajax(ajaxCfg, func);
					},
					/*查询模块列表*/
					list: function(pmProjectId, func) {
						if(validator.isNull(pmProjectId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(pmProjectId)) {
							ms.alert("模块编号为整型");
							return;
						};

						ajaxCfg.params = "pmProjectId=" + pmProjectId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*更新模块信息模块*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmProjectId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmProjectId)) {
							ms.alert("模块编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.pmName)) {
							ms.alert("模块名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmPackageName)) {
							ms.alert("模块包名不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmDatabase)) {
							ms.alert("数据库名称不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmUsername)) {
							ms.alert("账号不能为空");
							return;
						};
						if(validator.isNull(newDataJson.pmPassword)) {
							ms.alert("密码不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/update.do";
						ms.ajax(ajaxCfg, func);
					},
					/*删除模块*/
					del: function(data, func) {
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmId)) {
							ms.alert("basicId不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.pmId.split(",");
						for(var index = 0; index < newDataJson.pmId.length; index++) {
							if(newDataJson.pmId[index] === ',') {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mcode/projectModel/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				},

				projectModelObject: {
					/*获取对象*/
					get: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmoPmId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmoPmId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObject/get.do";
						ms.ajax(ajaxCfg, func);
					},
					/*保存对象*/

					/*查询对象列表*/
					list: function(pmoPmId, func) {
						if(validator.isNull(pmoPmId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(pmoPmId)) {
							ms.alert("模块编号为整型");
							return;
						};

						ajaxCfg.params = "pmoPmId=" + pmoPmId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObject/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*更新对象信息对象*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmoId)) {
							ms.alert("编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmoId)) {
							ms.alert("编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.pmoTableName)) {
							ms.alert("表名不能为空");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObject/update.do";
						ms.ajax(ajaxCfg, func);
					},
				},

				projectModelObjectField: {
					/*查询对象字段列表*/
					list: function(pmofPmoId, func) {
						if(validator.isNull(pmofPmoId)) {
							return;
						} else if(!validator.isInt(pmofPmoId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = "pmofPmoId=" + pmofPmoId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/list.do";
						ms.ajax(ajaxCfg, func);
					},
					/*保存对象字段实体*/
					save: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmofId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmofId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/save.do";
						ms.ajax(ajaxCfg, func);
					},

					/*更新对象字段实体*/
					update: function(data, func) {
						if(validator.isNull(data)) {
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.pmofId)) {
							ms.alert("模块编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.pmofId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = data;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/update.do";
						ms.ajax(ajaxCfg, func);
					},
					/*获取对象字段*/
					get: function(pmofId, func) {
						if(validator.isNull(pmofId)) {
							return;
						} else if(!validator.isInt(pmofId)) {
							ms.alert("模块编号为整型");
							return;
						};
						ajaxCfg.params = "pmofId=" + pmofId;
						ajaxCfg.url = ms.base + "/people/mcode/projectModelObjectField/get.do";
						ms.ajax(ajaxCfg, func);
					},
				},
			},
		},

	}
});
>>>>>>> commit
