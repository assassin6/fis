import { post, get, put, patch } from './Http'
import { isRegExp } from 'util';
export default class Base {
	constructor() {
		this.version = 100
		this.baseUrl = '';
		this.ajaxCfg = {
			"type": "post",
			"dataType": "json"
		}
		this.debugMode=true
		//默认为开发模式，请求接口使用本地测试的json文件：development
		//生产模式，请求接口使用.do接口进行数据获取：production
		this.urlExt=''
	}
	getBaseUrl() {
		return this.baseUrl
	}
	setBaseUrl(str) {
		this.baseUrl = str
	}
	getUrlExt(){
		return this.urlExt
	}
	isDebugMode(boolean){
		this.debugMode = boolean
		if(boolean){
			this.urlExt='.json'
		} else {
			this.urlExt='.do'
		}
	}
	/**
	 * ajax请求
	 ------
	 * @callmethod ms.ajax(cfg,function(returnJson){...});
	 * @param {{type:json,have:true}} cfg json格式数据 
	 * @param {{type:function,have:true}}  func 回调方法
	 * @examples 
	 * ...
	 * var ajaxCfg = {
	 *	"type" : "post",
	 *	"dataType" : "json",
	 *	url" : ms.base+"/category/city.do"
	 * };
	 * ms.ajax(ajaxCfg, function(returnJson){
	 *	// 将地区信息追加到页面
	 *	$("#category_province_tmpl").tmpl(returnJson).appendTo(".province");
	 *	$("#category_city_tmpl").tmpl(returnJson).appendTo(".city");
	 * })
	 * ...
	 * @return {{type:result}} [{
	 *"categoryCategoryId":0,
	 *"categoryId":84,
	 *"categoryModelId":99,
	 *"categoryTitle":"上海"}]
	 */
	ajax(cfg, func) {
		var type = "post";
		var params = "";
		var dataType = "json";
		var before = function () { };


		if (cfg.before != null && cfg.before != undefined) {
			before = cfg.before;
		}

		if (!this.isEmpty(cfg.type)) {
			type = cfg.type;
		}

		if (!this.isEmpty(cfg.params)) {
			params = cfg.params;
		}

		if (!this.isEmpty(cfg.dataType)) {
			dataType = cfg.dataType;
		}

		if (this.isEmpty(cfg.url)) {
			alert("ms ajax 确实url参数");
			return;
		}

		//根据项目的发布路径补全项目请求路径
		if (cfg.url.indexOf("http:") < 0) {
			cfg.url = this.baseUrl + cfg.url;
		}
		var obj = this;
		$.ajax({
			type: type,
			url: cfg.url,
			dataType: dataType,
			data: params,
			beforeSend: function () {
				before();
			},
			success: function (json) {
				if (func != null && func != undefined) {
					func(json);
				}
			},
			error: function () {
				obj.error();
			},
		});
	}
	error() {

	}
	//@name 判断对象是否为空
	//@param target
	//参数，任意对象
	isEmpty(target) {
		if (target == "undefined" || target == null || target.replace(/(^\s*)|(\s*$)/g, "") == "") {
			return true;
		}
		return false;
	}

	//判断是否是json对象
	//@param target
	//判断对象
	//@return true:合法json对象 false:json格式错误
	isJson(target) {
		if (typeof (target) == "object") {
			return true;
		}
		return false;
	}
	isType(type) {
		return function (obj) {
			return {}.toString.call(obj) == "[object " + type + "]"
		}
	}

	isArray() {
		return Array.isArray || isType("Array");
	}

	/**
	 * 基础层弹框
	 ------
	 * @callmethod ms.alert(msg);
	 * @param {{type:string,have:true}} msg 弹框提示内容
	 * @examples 
	 * ...
	 * ms.alert("弹出框测试成功")
	 * ...
	 * 无返回值
	 * @return {{type:none}} 无返回值
	 */
	alert(msg) {
		alert(msg);
	}

	//将data结构参数转json
	turnJson(body) {
		var Array = {};
        body.split("&").forEach(function (t) {
          Array[t.split("=")[0]] = t.split("=")[1];
        });
        return Array;
	}
	/**
	 *获取图片验证码
	 ------
		 *如登录注册时需要的图片验证码
	 * @callmethod ms.code(target);
	 * @param {{type:string,have:true}} target 显示图片验证码的DOM对象
	 * @examples 
	 * ...
	 * <img id="mCode" title="点击刷新验证码" /> 
	 * ...
	 * ms.code("mCode"); //页面刷新加载验证码,点击刷新验证码
	 * ...
	 * 无返回值
	 * @return {{type:none}} 无返回值
	*/
	code(target) {
		var _target = document.getElementById(target);
		_target.src = this.baseUrl + '/code?t=' + new Date().getTime();
	}

	queryString(param) {
		var svalue = location.search.match(new RegExp("[\?\&]" + param
			+ "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
	/**
	* 获取地区
	------
	*/
	city(data, func) {
		var ajaxCfg = {
			"type": "post",
			"dataType": "json"
		};
		get(this.baseUrl + "/basic/city/query.do",data).then(func,err=>{
			console.log(err)
		})
		// ajaxCfg.url = this.baseUrl + "/basic/city/query.do";
		// ajaxCfg.params = data;
		// this.ajax(ajaxCfg, func);

	}

};