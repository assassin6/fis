(function(window) {

	document.write("<script src='http://cdn.mingsoft.net/plugins/validator/5.5.0/validator.js'><\/script>"); 
	function ms() {
		this.version = "1.0.0"
		this.base = "";
	}

	/**
	 * ms对象配置，
	 * 
	 * @param configData
	 *            json数据格式
	 * @param configData.base
	 *            字符串类型 项目发布地址，一般使用{ms:global.host/}标签值
	 * @param configData.filter
	 *            函数类型 会员后台等登录拦截，具体可以在函数体内设置
	 *            
	 * 使用方式:
	 * ms.config({
	 * 	base:"项目地址",
	 * 	filter: {
	 * 		people:{
	 * 			loginUrl:'http://www.mingsoft.net/login.do'
	 * 		}
	 * 	}
	 * });
	 */
	ms.prototype.config = function(configData) {
		ms.base = configData.base;
		if (isObject(configData.filter)) {
			ms.filter = configData.filter;
		}
		if (isObject(ms.filter.people)) {
			var value = encodeURIComponent(ms.filter.people.loginUrl)
			document.cookie="people_login_url="+value;
			/*seajs.use("ms", function(ms) {

				//filter方法里面设置cookie  cookie的name值为people_login_url ，value为登录地址,地址必须encodeURIComponent转码  encodeURIComponent(地址)
				ms.filter(ms.filter.people);
			});*/
		}
	}
	
	ms.prototype.load = function(models, func) {

		seajs.config({
			// 只定base目录，类似java中的src目录
			base: "http://cdn.mingsoft.net/model/1.0.0/",
            alias: {
                "ms": "ms.min",
                "ms.people": "ms.people.min",
                "ms.mcms": "ms.mcms.min",
                "ms.mbbs": "ms.mbbs.min",
                "ms.mcode": "ms.mcode.min",
                "ms.upgrader": "ms.upgrader.min",
                "ms.address": "ms.address.min",
                "ms.attention": "ms.attention.min",
                "ms.brand": "ms.brand.min",
                "ms.cart": "ms.cart.min",
                "ms.order": "ms.order.min",
                "ms.orderComment": "ms.orderComment.min",
                "ms.pay": "ms.pay.min",
                "ms.productImpression": "ms.productImpression.min",
                "ms.upload": "ms.upload.min"
            },
			// 下面配置自己理解
			charset : 'utf-8',
			timeout : 20000,
			debug : 0,
			vars : {
				'base' : ms.base
			}
		});

		seajs.use(models, function() {
			func.apply(this, arguments);
		});

		
	}

	/**
	 * util-lang.js - The minimal language enhancement
	 */

	function isType(type) {
		return function(obj) {
			return {}.toString.call(obj) == "[object " + type + "]"
		}
	}

	var isObject = isType("Object")
	var isString = isType("String")
	var isArray = Array.isArray || isType("Array")
	var isFunction = isType("Function")

	window.ms = new ms();
})(window);