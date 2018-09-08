<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"newDataJsonType" : "json"
	};

	return {
		people : {
			address : {
				"version" : "1.0.0",
				/**
				* 保存用户收货地址
				------
				* 保存用户收货地址
				* @callmethod people.address.save(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressConsigneeName 收货人姓名
				* @param {{type:strings,have:true}} peopleAddressAddress 收货地址
				* @param {{type:strings,have:true}} peopleAddressPhone 联系电话
				* @param {{type:strings,have:true}} peopleAddressMail 邮箱
				* @param {{type:strings,have:true}} peopleAddressProvince 省
				* @param {{type:strings,have:true}} peopleAddressCity 市
				* @param {{type:strings,have:true}} peopleAddressDistrict 县
				* @param {{type:strings,have:true}} peopleAddressStreet 街道
				* @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.save($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {result:"true｜false"}
				* @return {{type:result}} true成功、false失败
				*/
				save : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressConsigneeName)){
						ms.alert("收货人姓名不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressAddress)){
						ms.alert("收货地址不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressPhone)){
						ms.alert("联系电话不能为空");
						return;
					}else if(!validator.isMobilePhone(newnDataJson.peopleAddressPhone,'zh-CN')){
						ms.alert("请输入正确的联系电话");
						return;
					};
					if((!validator.isEmail(newnDataJson.peopleAddressMail)) && (!validator.isNull(newnDataJson.peopleAddressMail))){
						ms.alert("请输入正确的邮箱");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressProvince) || validator.isNull(newnDataJson.peopleAddressCity) || validator.isNull(newnDataJson.peopleAddressDistrict) || validator.isNull(newnDataJson.peopleAddressStreet)){
						ms.alert("请把所在省、市、县、街道填写完整");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/save.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 设置默认地址
				------
				* 设置默认地址
				* @callmethod people.address.setDefault(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressId 自增长编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.setDefault($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				setDefault : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/setDefault.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 更新用户收货地址
				------
				* 更新用户收货地址
				* @callmethod people.address.update(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressConsigneeName 收货人姓名
				* @param {{type:strings,have:true}} peopleAddressId 收货地址ID
				* @param {{type:strings,have:true}} peopleAddressAddress 收货地址
				* @param {{type:strings,have:true}} peopleAddressPhone 联系电话
				* @param {{type:strings,have:true}} peopleAddressMail 邮箱
				* @param {{type:strings,have:true}} peopleAddressProvince 省
				* @param {{type:strings,have:true}} peopleAddressCity 市
				* @param {{type:strings,have:true}} peopleAddressDistrict 县
				* @param {{type:strings,have:true}} peopleAddressStreet 街道
				* @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.update($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",	result:"true｜false",resultMsg:"错误信息"}
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				update : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressConsigneeName)){
						ms.alert("收货人姓名不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("收货地址ID不能为空");
						return;
					}else if (!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("收货地址ID为整型");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressAddress)){
						ms.alert("收货地址不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressPhone)){
						ms.alert("联系电话不能为空");
						return;
					}else if(!validator.isMobilePhone(newnDataJson.peopleAddressPhone,'zh-CN')){
						ms.alert("请输入正确的联系电话");
						return;
					};
					if(!validator.isEmail(newnDataJson.peopleAddressMail) && !validator.isNull(newnDataJson.peopleAddressMail)){
						alert("请输入正确的邮箱");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressProvince) || validator.isNull(newnDataJson.peopleAddressCity) || validator.isNull(newnDataJson.peopleAddressDistrict) || validator.isNull(newnDataJson.peopleAddressStreet)){
						ms.alert("请把所在省、市、县、街道填写完整");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/update.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 删除收货信息
				------
				* 根据收货地址id删除收货信息
				* @callmethod people.address.del(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressId 自增长编号
				* @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				* @examples 
				* ...
				* mmall.people.address.del($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				del : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/delete.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 查询用户信息
				------
				* 通过peopleAddressId查询用户收货地址实体
				* @callmethod people.address.get(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressId 自增长编号
				* @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.get($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",
				*	result:"true｜false",
				*	resultMsg:"错误信息"
				* }
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				get : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.peopleAddressId)){
						ms.alert("收货地址的ID不能为空");
						return;
					}else if(!validator.isInt(newDataJson.peopleAddressId)){
						ms.alert("收货地址的ID为整型数据");
						return;
					};
					if (validator.isNull(newDataJson.peopleAddressDefault)){
						ms.alert("是否为默认不能为空");
						return;
					}else if(!validator.isInt(newDataJson.peopleAddressDefault)){
						ms.alert("是否为默认为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/get.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 用户收货地址列表
				------
				* 获取用户收货地址列表
				* @callmethod people.address.list(function(returnJson){...});
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.list(function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* [{
				*	peopleAddressId:"自增长编号"
				*	"peopleAddressConsigneeName": "收货人姓名"
				*	"peopleAddressAddress": "地址"
				*	"peopleAddressPhone": "手机号"
				*	"peopleAddressMail": "邮箱"
				*	"peopleAddressProvince": "省"
				*	"peopleAddressCity": "城市"
				*	"peopleAddressDistrict": "县／区"
				*	"peopleAddressStreet": "街道" 
				*	"peopleAddressDefault": 1默认 0非默认 
				*}]
				* @return {{type:peopleAddressId}} 自增长编号
				* @return {{type:peopleAddressConsigneeName}} 收货人姓名
				* @return {{type:peopleAddressAddress}} 地址
				* @return {{type:peopleAddressPhone}} 手机号
				* @return {{type:peopleAddressMail}} 邮箱
				* @return {{type:peopleAddressProvince}} 省
				* @return {{type:peopleAddressCity}} 市
				* @return {{type:peopleAddressDistrict}} 县/区
				* @return {{type:peopleAddressStreet}} 街道
				* @return {{type:peopleAddressDefault}} 1默认 0非默认
				*/
				list : function(func){
					ajaxCfg.url = ms.base + "/people/address/list.do";
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
		"newDataJsonType" : "json"
	};

	return {
		people : {
			address : {
				"version" : "1.0.0",
				/**
				* 保存用户收货地址
				------
				* 保存用户收货地址
				* @callmethod people.address.save(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressConsigneeName 收货人姓名
				* @param {{type:strings,have:true}} peopleAddressAddress 收货地址
				* @param {{type:strings,have:true}} peopleAddressPhone 联系电话
				* @param {{type:strings,have:true}} peopleAddressMail 邮箱
				* @param {{type:strings,have:true}} peopleAddressProvince 省
				* @param {{type:strings,have:true}} peopleAddressCity 市
				* @param {{type:strings,have:true}} peopleAddressDistrict 县
				* @param {{type:strings,have:true}} peopleAddressStreet 街道
				* @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.save($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* {result:"true｜false"}
				* @return {{type:result}} true成功、false失败
				*/
				save : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressConsigneeName)){
						ms.alert("收货人姓名不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressAddress)){
						ms.alert("收货地址不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressPhone)){
						ms.alert("联系电话不能为空");
						return;
					}else if(!validator.isMobilePhone(newnDataJson.peopleAddressPhone,'zh-CN')){
						ms.alert("请输入正确的联系电话");
						return;
					};
					if((!validator.isEmail(newnDataJson.peopleAddressMail)) && (!validator.isNull(newnDataJson.peopleAddressMail))){
						ms.alert("请输入正确的邮箱");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressProvince) || validator.isNull(newnDataJson.peopleAddressCity) || validator.isNull(newnDataJson.peopleAddressDistrict) || validator.isNull(newnDataJson.peopleAddressStreet)){
						ms.alert("请把所在省、市、县、街道填写完整");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/save.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 设置默认地址
				------
				* 设置默认地址
				* @callmethod people.address.setDefault(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressId 自增长编号
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.setDefault($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				setDefault : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/setDefault.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 更新用户收货地址
				------
				* 更新用户收货地址
				* @callmethod people.address.update(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressConsigneeName 收货人姓名
				* @param {{type:strings,have:true}} peopleAddressId 收货地址ID
				* @param {{type:strings,have:true}} peopleAddressAddress 收货地址
				* @param {{type:strings,have:true}} peopleAddressPhone 联系电话
				* @param {{type:strings,have:true}} peopleAddressMail 邮箱
				* @param {{type:strings,have:true}} peopleAddressProvince 省
				* @param {{type:strings,have:true}} peopleAddressCity 市
				* @param {{type:strings,have:true}} peopleAddressDistrict 县
				* @param {{type:strings,have:true}} peopleAddressStreet 街道
				* @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.update($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",	result:"true｜false",resultMsg:"错误信息"}
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				update : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressConsigneeName)){
						ms.alert("收货人姓名不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("收货地址ID不能为空");
						return;
					}else if (!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("收货地址ID为整型");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressAddress)){
						ms.alert("收货地址不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressPhone)){
						ms.alert("联系电话不能为空");
						return;
					}else if(!validator.isMobilePhone(newnDataJson.peopleAddressPhone,'zh-CN')){
						ms.alert("请输入正确的联系电话");
						return;
					};
					if(!validator.isEmail(newnDataJson.peopleAddressMail) && !validator.isNull(newnDataJson.peopleAddressMail)){
						alert("请输入正确的邮箱");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressProvince) || validator.isNull(newnDataJson.peopleAddressCity) || validator.isNull(newnDataJson.peopleAddressDistrict) || validator.isNull(newnDataJson.peopleAddressStreet)){
						ms.alert("请把所在省、市、县、街道填写完整");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressDefault)){
						ms.alert("是否为默认为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/update.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 删除收货信息
				------
				* 根据收货地址id删除收货信息
				* @callmethod people.address.del(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressId 自增长编号
				* @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				* @examples 
				* ...
				* mmall.people.address.del($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				del : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newnDataJson = ms.turnJson(data);
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("收货地址的ID为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/delete.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 查询用户信息
				------
				* 通过peopleAddressId查询用户收货地址实体
				* @callmethod people.address.get(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressId 自增长编号
				* @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.get($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* { code:"错误编码",
				*	result:"true｜false",
				*	resultMsg:"错误信息"
				* }
				* @return {{type:code}} 错误编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
				get : function(data,func){
					if (validator.isNull(data)){
						return;
					};
					var newDataJson = ms.turnJson(data);
					if (validator.isNull(newDataJson.peopleAddressId)){
						ms.alert("收货地址的ID不能为空");
						return;
					}else if(!validator.isInt(newDataJson.peopleAddressId)){
						ms.alert("收货地址的ID为整型数据");
						return;
					};
					if (validator.isNull(newDataJson.peopleAddressDefault)){
						ms.alert("是否为默认不能为空");
						return;
					}else if(!validator.isInt(newDataJson.peopleAddressDefault)){
						ms.alert("是否为默认为整型数据");
						return;
					};
					ajaxCfg.url = ms.base + "/people/address/get.do";
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
				},
				/**
				* 用户收货地址列表
				------
				* 获取用户收货地址列表
				* @callmethod people.address.list(function(returnJson){...});
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* mmall.people.address.list(function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* });
				* ...
				* @function 
				* [{
				*	peopleAddressId:"自增长编号"
				*	"peopleAddressConsigneeName": "收货人姓名"
				*	"peopleAddressAddress": "地址"
				*	"peopleAddressPhone": "手机号"
				*	"peopleAddressMail": "邮箱"
				*	"peopleAddressProvince": "省"
				*	"peopleAddressCity": "城市"
				*	"peopleAddressDistrict": "县／区"
				*	"peopleAddressStreet": "街道" 
				*	"peopleAddressDefault": 1默认 0非默认 
				*}]
				* @return {{type:peopleAddressId}} 自增长编号
				* @return {{type:peopleAddressConsigneeName}} 收货人姓名
				* @return {{type:peopleAddressAddress}} 地址
				* @return {{type:peopleAddressPhone}} 手机号
				* @return {{type:peopleAddressMail}} 邮箱
				* @return {{type:peopleAddressProvince}} 省
				* @return {{type:peopleAddressCity}} 市
				* @return {{type:peopleAddressDistrict}} 县/区
				* @return {{type:peopleAddressStreet}} 街道
				* @return {{type:peopleAddressDefault}} 1默认 0非默认
				*/
				list : function(func){
					ajaxCfg.url = ms.base + "/people/address/list.do";
					ms.ajax(ajaxCfg, func);	
				},
			},
		},
	}
>>>>>>> commit
});