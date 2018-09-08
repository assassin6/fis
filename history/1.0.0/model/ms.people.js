define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};

	return {
		"version" : "1.0.0",
		/**
		* 注册
		------
		* 用户可以用名称、手机号、邮箱三者之一进行注册
		* 几种注册流程的形式：
		* 1、普通用户名称、登录密码，优先用户名注册,登录密码最长度范围6～12个字符；
		* 2、邮箱、邮箱验证码、登录密码（邮箱必须是可接收验证码）；
		* 3、手机号、短信验证码、登录密码；
		* 注意： 1、注册页面必须存在图片验证码
		* 2、如果需要接收验证码操作，需要使用“发送验证码”配合使用才能完成注册流程
		* @callmethod register(data,function(returnJson){...});
		* @param {{type:string}} peoplePhone 手机号
		* @param {{type:string}} peopleName 用名称 用户名长度在3～12个字符之间，只能是字母数字混合
		* @param {{type:string}} peopleMail 邮箱
		* @param {{type:string,have:true}} peoplePassword 注册密码 
		* @param {{type:strings,have:true}} rand_code 验证码
		* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="registe">
		*	<input type="text" name="peopleName" /> <!--注册用户名-->
		*	<input type="password" name="peoplePassword"/> <!--注册密码-->
		*	<input type="password" name="rePassword"/> <!--确认注册密码，需要做前端验证，此接口不提供验证-->
		*	<input type="text"  name="rand_code" /> <!--验证码-->
        *  	<img id="registeCode"/> 
		* </form>
		* ...
		* ms.load(["ms","ms.people"],function(ms,mpeople){
		* 	//验证码加载与点击刷新
		* 	ms.code("registeCode");
		* 	$("#registeCode").click(function(){
		*		ms.code("registeCode");
		* 	});
		* 	mpeople.register($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	})
		* })
		* ...
		* @function 
		* {"resultMsg":"注册成功","result":true,"code":"07010100"}
		* @return {{type:resultMsg}} 提示信息
		* @return {{type:code}} 错误编码
		* @return {{type:result}} true成功、false失败
		*/
		register : function(data,func){
			ajaxCfg.url = ms.base + "/register.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if (ms.isEmpty(newDataJson.peoplePhone) && ms.isEmpty(newDataJson.peopleName) && ms.isEmpty(newDataJson.peopleMail)){
				ms.alert("用户名，手机号，邮箱必须有一个不为空");
				return;
			};
			if(!ms.isEmpty(newDataJson.peoplePhone)){
				if(!validator.isMobilePhone(newDataJson.peoplePhone,'zh-CN')){
					ms.alert("请输入正确的手机号");
					return;
				}
			};
			if(!ms.isEmpty(newDataJson.peopleMail)){
				if(!validator.isEmail(newDataJson.peopleMail)){
					ms.alert("请输入正确的邮箱");
					return;
				}
			};
			if (ms.isEmpty(newDataJson.peoplePassword)){
				ms.alert("注册密码不能为空");
				return;
			};
			if (ms.isEmpty(newDataJson.rand_code)){
				ms.alert("验证码不能为空");
				return;
			};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);	
		},
	    /**
	    *登录
	    ------
	    * 登录验证,登录必须存在验证码 
		* @callmethod checkLogin(data,function(returnJson){...});
		* @param {{type:string,have:true}} peopleName 用户名
		* @param {{type:string,have:true}} peoplePassword 登录密码
		* @param {{type:string,have:true}} rand_code 验证码
		* @param {{type:string}} peopleAutoLogin 自动登录 如果大于0表示开启自动登录，1表示自动登录保留1天
		* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="login">
		*	<input type="text" name="peopleName" /> <!--登录用户名，手机号或邮箱-->
		*	<input type="password" name="peoplePassword"/> <!--登录密码-->
		*	<input type="text"  name="rand_code" /> <!--验证码-->
        *  	<img id="loginCode"/> 
        * ...
		* </form>
		* ...
		* ms.load(["ms","ms.people"],function(ms,mpeople){
		* 	//验证码加载与点击刷新
		* 	ms.code("loginCode");
		* 	$("#loginCode").click(function(){
		*		ms.code("loginCode");
		* 	});
		* 	mpeople.checkLogin($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* ...
		* @function 
		* {"resultMsg":"{
		*	\"peopleAppId\":0,
		*	\"peopleAutoLogin\":0,
		*	\"peopleId\":9020,
		*	\"peopleMailCheck\":0,
		*	\"peopleName\":\"mstest\",
		*	\"peoplePhoneCheck\":0,
		*	\"peopleState\":0}",
		* "result":true,
		* "code":"07010200"}
		* @return {{type:code}} 错误编码
		* @return {{type:result}} true成功、false失败
		* @return {{type:resultMsg}} 提示信息
		* @return {{type:resultData}} {"peopleAutoLogin":自动登录多少天,"peopleName":用户,"peopleId":用户编号,"peopleMail ":用户邮箱}
	    */
	    checkLogin : function(data,func){
	    	ajaxCfg.url = ms.base + "/checkLogin.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if (ms.isEmpty(newDataJson.peopleName)){
				ms.alert("用户名不能为空");
				return;
			};
			if (ms.isEmpty(newDataJson.peoplePassword)){
				ms.alert("密码不能为空");
				return;
			};
			if (ms.isEmpty(newDataJson.rand_code)){
				ms.alert("验证码不能为空");
				return;
			};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);	
	    },
	    /**
		*验证登录状态
		------
		* @callmethod checkLoginStatus(function(returnJson){...});
		* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* ms.load(["ms.people"],function(mpeople){
		* 	mpeople.checkLoginStatus(function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* @function 
		* {result:"false"}
		* @return {{type:result}} true成功、false失败
		*/
	    checkLoginStatus : function(func) {
	        ajaxCfg.url = ms.base + "/checkLoginStatus.do";
	        ms.ajax(ajaxCfg, func);
	    },
		/**
	    * 发送验证码
	    ------
	    * 用户发送验证码，可以通过邮箱或手机发送
		* @callmethod sendCode(data,function(returnJson){...});
		* @param {{type:string,have:true}} receive  接收地址，只能是邮箱或手机号，邮箱需要使用邮箱插件，手机号需要短信插件
		* @param {{type:string,have:true}} modelCode 对应邮件插件的模块编号
		* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="sendEmailCode">
		*	<input type="text" name="receive" /> <!--接收地址，本案例为邮箱-->
		*	<input type="text" name="modelCode" type="hidden" value="后台邮件插件模块编号"/>
        * ...
		* </form>
		* ...
		* ms.load(["ms.people"],function(mpeople){
		* 	mpeople.sendCode($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* ...
		* @function 
		* {result:"true"}
		* @return {{type:result}} true成功、false失败
	    */
	    sendCode : function(data,func){
	    	if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
	    	if(ms.isEmpty(newDataJson.receive)){
	    		ms.alert("接收地址不能为空");
				return;
	    	}
	    	if(ms.isEmpty(newDataJson.modelCode)){
	    		ms.alert("对应邮件插件的模块编号不能为空");
				return;
	    	};
	    	ajaxCfg.params = data;
	    	ajaxCfg.url = ms.base + "/sendCode.do";
	        ms.ajax(ajaxCfg,func);
	    },
	    /**
	    * 验证用户接收的验证码
	    ------
	    * 验证用户输入的系统发送邮件或者短信验证码是否正确
		* @callmethod checkSendCode(data,function(returnJson){...});
		* @param {{type:string,have:true}} receive  接收地址，只能是邮箱或手机号，邮箱需要使用邮箱插件，手机号需要短信插件
		* @param {{type:string,have:true}} code 对应接收的验证码
		* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="sendEmailCode">
		*	<input type="text" name="receive" /> <!--接收地址，本案例为邮箱-->
		*	<input type="text" name="modelCode" type="hidden" value="后台邮件插件模块编号"/>
		* ...
		*	<input type="text" name="code" />
		* ...
		* </form>
		* ...
		* ms.load(["ms.people"],function(mpeople){
		* 	mpeople.checkSendCode($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* @function 
		* {result:"true"}
		* @return {{type:result}} true成功、false失败
	    */
	    checkSendCode : function(data,func){
			ajaxCfg.url = ms.base + "/checkSendCode.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if(ms.isEmpty(newDataJson.receive)){
	    		ms.alert("接收地址不能为空");
				return;
	    	}
	    	if(ms.isEmpty(newDataJson.code)){
	    		ms.alert("接收的验证码不能为空");
				return;
	    	};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);
	    },
	    /**
	    * 验证已保存用户
	    ------
	    * 验证用户名、手机号、邮箱是否已保存，同一时间只能判断一种，优先用户名称 
	    * 适用场景:
		* 1、用户注册是对用户名、邮箱或手机号唯一性判断 
		* 2、用户取回密码是判断账号是否存在
		* @callmethod check(data,function(returnJson){...});
		* @param  {{type:string}}  peopleName 用户名称验证
		* @param  {{type:string}}  peopleMail 用户邮箱验证
		* @param  {{type:string}}  peoplePhone 用户手机验证
		* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		*...
		* <form>
		* ...
		*	<input type="text" name="peopleName" /> <!--接收地址，本案例为用户名判断-->
		* ...
		* </form>
		* ...
		* ms.load(["ms.people"],function(mpeople){
		* 	mpeople.check($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* @function 
		* {result:"true"}
		* @return {{type:code}} 模块编码
		* @return {{type:result}} true存在｜false不存在或错误
		* @return {{type:resultMsg}} 错误信息
	    */
	    check:function(data,func){
			ajaxCfg.url = ms.base + "/check.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if (ms.isEmpty(newDataJson.peoplePhone) && ms.isEmpty(newDataJson.peopleName) && ms.isEmpty(newDataJson.peopleMail)){
				ms.alert("用户名，手机号，邮箱至少存在一个");
				return;
			};
			if(!ms.isEmpty(newDataJson.peoplePhone)){
				if(!validator.isMobilePhone(newDataJson.peoplePhone,'zh-CN')){
					ms.alert("请输入正确的手机号");
					return;
				}
			};
			if(!ms.isEmpty(newDataJson.peopleMail)){
				if(!validator.isEmail(newDataJson.peopleMail)){
					ms.alert("请输入正确的邮箱");
					return;
				}
			};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);	
	    },
	    /**
	    * 验证已绑定用户
	    ------
	    * 验证用户名、手机号、邮箱是否已保存并绑定，同一时间只能判断一种，优先用户名称 
	    * 适用场景:
		* 1、用户注册是对用户名、邮箱或手机号唯一性判断 
		* 2、用户取回密码是判断账号是否存在
		* 3、用户绑定邮箱或者手机号验证，邮箱或手机号是否存在并已绑定
		* @callmethod isExists(data,function(returnJson){...});
		* @param  {{type:string}}  peopleName 用户名称验证
		* @param  {{type:string}}  peopleMail 用户邮箱验证，注意：只验证绑定成功的邮箱 
		* @param  {{type:string}}  peoplePhone 用户手机验证，注意：只验证绑定成功的手机  
		* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form>
		* ...
		*	<input type="text" name="peopleName" /> <!--接收地址，本案例为用户名判断-->
		* ...
		* </form>
		* ...
		* ms.load(["ms.people"],function(mpeople){
		*	mpeople.isExists($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		*	});
		* })
		* @function 
		* {result:"true"}
		* @return {{type:code}} 模块编码
		* @return {{type:result}} true存在｜false不存在或错误
		* @return {{type:resultMsg}} 错误信息
	    */
	    isExists:function(data,func){
			ajaxCfg.url = ms.base + "/isExists.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if (ms.isEmpty(newDataJson.peoplePhone) && ms.isEmpty(newDataJson.peopleName) && ms.isEmpty(newDataJson.peopleMail)){
				ms.alert("用户名，手机号，邮箱至少存在一个");
				return;
			};
			if(!ms.isEmpty(newDataJson.peoplePhone)){
				if(!validator.isMobilePhone(newDataJson.peoplePhone,'zh-CN')){
					ms.alert("请输入正确的手机号");
					return;
				}
			};
			if(!ms.isEmpty(newDataJson.peopleMail)){
				if(!validator.isEmail(newDataJson.peopleMail)){
					ms.alert("请输入正确的邮箱");
					return;
				}
			};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);	
	    },
		/**
		*验证图片验证码
		------
		*例如流程需要短信验证或邮箱验证，为有效防止恶意发送验证码。提供给ajax异步请求使用 
		*注意：页面提交对验证码表单属性名称必须是rand_code，否则无效
		* @callmethod checkCode(rand_code,function(returnJson){...});
		* @param {{type:strings,have:true}} rand_code 验证码
		* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="picCode">
		*	<input type="text"  name="rand_code" /> <!--填写验证码-->
        *  	<img id="picCode"/> <!--图片验证码-->
		* </form>
		*...
		* ms.load(["ms","ms.people"],function(ms,mpeople){
		* 	//验证码加载与点击刷新
		* 	ms.code("picCode");
		* 	$("#picCode").click(function(){
		*		ms.code("picCode");
		* 	});
		* })
		* var code = $("input[name=rand_code]").val();
		* mpeople.checkCode(code,function(returnJson){
		*	alert(JSON.stringify(returnJson));
		* });
		* @function 
		* {code:"错误编码",result:"true成功、false失败",resultMsg: "提示信息"}
		* @return {{type:code}} 错误编码
		* @return {{type:result}} true成功、false失败
		* @return {{type:resultMsg}} 提示信息
		*/
		checkCode : function(rand_code,func){
			if (ms.isEmpty(rand_code)){
				ms.alert("验证码不能为空");
				return;
			};
			ajaxCfg.params = "rand_code="+rand_code;
			ajaxCfg.url = ms.base + "/checkCode.do";
			ms.ajax(ajaxCfg, func);	
		},
	    /*
	    * 重置密码
	    ------
	    * 当用户忘记登录密码时可以通过注册绑定的邮箱或绑定的手机号进行取回，操作过程中需要通过邮件模块与短信模块发送验证码给用户
	    * 业务场景：用户输入手机号（邮箱），点击发送验证码,发送间隔时间为60秒,用户将接收到的验证码输入提交,此接口不会对用户再次输入新密码进行判断，需要开发者做前端判断
	    * @callmethod resetPassword(data,function(returnJson){...});
		* @param {{type:string,have:true}} peoplePassword 用户新密码 
		* @param {{type:string,have:true}} rand_code  验证码
		* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="resetPassword">
		* ...
		*	<input type="text" name="peoplePassword"/>
		*	<input type="text"  name="peopleCode" /> <!--短信验证码验证码-->
		*	<input type="text"  name="rand_code" /> <!--验证码-->
        *  	<img id="resetPasswordCode"/> 
		* ...
		* </form>
		* ...
		* ms.load(["ms","ms.people"],function(ms,mpeople){
		* 	//验证码加载与点击刷新
		* 	ms.code("resetPasswordCode");
		* 	$("#resetPasswordCode").click(function(){
		*		ms.code("resetPasswordCode");
		* 	});
		* 	mpeople.resetPassword($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* ...
		* @function 
		* {code:"0777700",result:true,resultMsg: "提示信息"}
		* @return {{type:code}} 错误编码
		* @return {{type:result}} true成功、false失败
		* @return {{type:resultMsg}} 提示信息
		*/
	    resetPassword : function(data,func){
			ajaxCfg.url = ms.base + "/resetPassword.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if(ms.isEmpty(newDataJson.peoplePassword)){
	    		ms.alert("用户新密码");
				return;
	    	};
	    	if(ms.isEmpty(newDataJson.peopleCode)){
	    		ms.alert("接收的验证码不能为空");
				return;
	    	};
	    	if(ms.isEmpty(newDataJson.rand_code)){
	    		ms.alert("图片验证码不能为空");
				return;
	    	};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);
	    },
		
	    /**
	    * 验证重置密码收到的验证码
	    ------
	    * 忘记密码时需要将第一步验证用户时的接收验证码作为重置密码的验证码
		* @callmethod checkResetPasswordCode(data,function(returnJson){...});
		* @param {{type:string,have:true}} peopleCode  短信、邮箱验证码 
		* @param {{type:string,have:true}} rand_code  验证码，可能会传递经过多个流程，具体根据业务确定
		* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
		* @examples 
		* ...
		* <form name="resetPassword">
		* ...
		*	<input type="text" name="peopleCode"/>
		*	<input type="text"  name="rand_code" /> <!--验证码-->
        *  	<img id="checkResetPasswordCodeCode"/> 
		* ...
		* </form>
		* ...
		* ms.load(["ms","ms.people"],function(ms,mpeople){
		* 	//验证码加载与点击刷新
		* 	ms.code("checkResetPasswordCodeCode");
		* 	$("#checkResetPasswordCodeCode").click(function(){
		*		ms.code("checkResetPasswordCodeCode");
		* 	});
		* 	mpeople.checkResetPasswordCode($("form").serialize(),function(returnJson){
		*		alert(JSON.stringify(returnJson));
		* 	});
		* })
		* @function 
		* {result:"true"}
		* @return {{type:result}} true成功、false失败
	    */
	    checkResetPasswordCode : function(data,func){
			ajaxCfg.url = ms.base + "/checkResetPasswordCode.do";
			if (ms.isEmpty(data)){
				return;
			};
			//将data参数转json
			var newDataJson = ms.turnJson(data);
			if(ms.isEmpty(newDataJson.peopleCode)){
	    		ms.alert("接收的验证码不能为空");
				return;
	    	};
	    	if(ms.isEmpty(newDataJson.rand_code)){
	    		ms.alert("图片验证码不能为空");
				return;
	    	};
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);
	    },
	    /**
    	* 获取地区
    	------
    	*/
    	city : function(func){
    		ajaxCfg.url = ms.base +  "/category/city.do";
			ms.ajax(ajaxCfg, func);	
    	},
		people : {
			/**
		    *退出
		    ------
			* @callmethod people.quit(function(){...});
			* @param  {{type:function,have:true}}  回调方法 无返回值
			* @examples 
			* ...
			* <a href="#" class="quitLogin">退出</a>
			* ...
			* ms.load(["ms.people"],function(mpeople){
			*	$(".quitLogin").click(function(){
			*		mpeople.people.quit(function(){
			* 			alert("退出成功");
			* 		});
			* 	}) 	
			* })
			* ...
			* @function 
			* 无返回值
			* @return {{type:none}} 无返回值
		    */
		    quit : function(func){
		        ajaxCfg.url =  ms.base + "/people/quit.do";
		        ms.ajax(ajaxCfg, func);
		    },
			/**
			* 设置密码
			------
			* @callmethod people.resetPassword(data,function(returnJson){...});
			* @param {{type:String,have:true}} peoplePassword 用户密码
			* @param {{type:function}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* ms.load(["ms.people"],function(mpeople){
			* 	mpeople.people.resetPassword($("form").serialize(),function(returnJson){
			* 		alert(JSON.stringify(returnJson));
			* 	})
			* })
			* ...
			* @function 
			* {"resultMsg":"","result":true}
			* @return {{type:resultMsg}} 提示信息
			* @return {{type:result}} true成功、false失败
			*/
			resetPassword : function(data,func) {
				if (validator.isNull(data)) {
					ms.alert("数据不能为空");
					return;
				}
				var newDataJson = ms.turnJson(data);					
				if (validator.isNull(newDataJson.peoplePassword)) {
					ms.alert("密码不能为空");
					return;
				}
				ajaxCfg.url = ms.base + "/people/resetPassword.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
			},
		    /**
		    * 验证用户接收的验证码
		    ------
			* @callmethod people.checkLogin(function(returnJson){...});
			* @param {{type:string}} peopleCode 短信、邮箱验证码 
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* ms.load(["ms.people"],function(mpeople){
			* 	mpeople.people.checkLogin(peopleCode,function(returnJson){
			*		alert(JSON.stringify(returnJson));
			* 	});
			* });
			* ...
			* @function
			* {code:"模块编码",result:true}
			* @return {{type:code}} 编码
			* @return {{type:result}} true成功、false失败
		    */
		    checkPeopleCode : function(peopleCode,func){
		    	if (ms.isEmpty(peopleCode)){
					return;
				};
				ajaxCfg.params = "peopleCode="+peopleCode;
		    	ajaxCfg.url =  ms.base + "/people/checkPeopleCode.do";
		        ms.ajax(ajaxCfg, func);
		    },
		    /**
		    * 更新手机号或邮箱
		    ------
		    * 更新用户信息中保存的手机号或者邮箱号，二者必须存在一个
			* @callmethod people.update(function(returnJson){...});
			* @param {{type:string}} peopleMail 邮箱 
			* @param {{type:string}} peoplePhone 手机号 
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* <form name="update">
			* ...
			*	<input type="text" name="peoplePhone"/>
			* ...
			* </form>
			* ...
			* ms.load(["ms.people"],function(mpeople){
			* 	mpeople.people.update($("form").serialize(),function(returnJson){
			*		alert(JSON.stringify(returnJson));
			* 	});
			* });
			* ...
			* @function
			* {code:"模块编码",result:true,resultMsg:""}
			* @return {{type:code}} 模块编码
			* @return {{type:result}} true成功、false失败
			* @return {{type:resultMsg}} 错误信息
		    */
		    update : function(data,func){
				ajaxCfg.url = ms.base +  "/people/update.do";
				if (ms.isEmpty(data)){
					return;
				};
				//将data参数转json
				var newDataJson = ms.turnJson(data);
				if (ms.isEmpty(newDataJson.peoplePhone) && ms.isEmpty(newDataJson.peopleMail)){
					ms.alert("手机号，邮箱必须有一个不为空");
					return;
				};
				if(!ms.isEmpty(newDataJson.peoplePhone)){
					if(!validator.isMobilePhone(newDataJson.peoplePhone,'zh-CN')){
						ms.alert("请输入正确的手机号");
						return;
					}
				};
				
				if(!ms.isEmpty(newDataJson.peopleMail)){
					if(!validator.isEmail(newDataJson.peopleMail)){
						ms.alert("请输入正确的邮箱");
						return;
					}
				};
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);	
		    },
		    /**
		    * 获取用户基本信息
		    ------
		    * @callmethod people.info(function(returnJson){...});
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* ms.load(["ms.people"],function(mpeople){
			* 	mpeople.people.info(function(returnJson){
			*		alert(JSON.stringify(returnJson));
			* 	});
			* });
			* ...
			* @function
			* {
			*	"peopleAutoLogin":0,
			*	"peopleName":"mstest",
			*	"peopleDateTime":"2016-05-08 13:14:00",
			*	"peopleId":5201314,
			* }
			* @return {{type:peopleAutoLogin}} 自动登录多少天
			* @return {{type:peopleName}} 用户名
			* @return {{type:peopleDateTime}} 用户登录时间
			* @return {{type:peopleId}} 用户编号
		    */
		    info : function(func){
		    	ajaxCfg.url =  ms.base + "/people/info.do";
			    ms.ajax(ajaxCfg, func);
		    },
		    /**
		    * 修改密码
		    ------
		    * 如果修改密码，在输入新密码后需要再次填入确认密码，需要前端自行判断新密码与再次确认密码是否一致，接口未做判断
			* @callmethod people.changePassword(data,function(returnJson){...});
			* @param {{type:string,have:true}} peopleOldPassword 原密码
			* @param {{type:string,have:true}} peoplePassword 新密码
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* ms.load(["ms.people"],function(mpeople){
			* 	mpeople.people.changePassword($("form").serialize(),function(returnJson){
			*		alert(JSON.stringify(returnJson));
			* 	});
			* });
			* ...
			* @function
			* {code:"模块编码",result:true,resultMsg:""}
			* @return {{type:code}} 模块编码
			* @return {{type:result}} true成功、false失败
			* @return {{type:resultMsg}} 错误信息
		    */
		    changePassword : function(data,func){
				if (ms.isEmpty(data)){
					return;
				};
				//将data参数转json
				var newDataJson = ms.turnJson(data);
				if (ms.isEmpty(newDataJson.peopleOldPassword)){
					ms.alert("原密码不能为空");
					return;
				};
				if (ms.isEmpty(newDataJson.peoplePassword)){
					ms.alert("新密码不能为空");
					return;
				}
				ajaxCfg.params = data;
		    	ajaxCfg.url =  ms.base + "/people/changePassword.do";
		        ms.ajax(ajaxCfg, func);
		    },
		    user : {
				/**
				* 获取用户详细信息
				------
				* @callmethod people.user.info(function(returnJson){...});
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* ms.load(["ms.people"],function(mpeople){
				* 	mpeople.people.user.info(function(returnJson){
				*		alert(JSON.stringify(returnJson));
				* 	});
				* })
				* ...
				* @function
				* {
				*	"peopleId":9020,
				*	"peopleAutoLogin":0,
				*	"peopleDateTime":"2016-05-08 21:42:06",
				*	"peopleMailCheck":0,
				*	"peopleName":"mstest",
				*	"peoplePhoneCheck":0,
				*	"peopleState":0,
				*	"peopleUserSex":1
				* }
				* @return {{type:peopleId}} 用户id 示例值：>0
				* @return {{type:peopleUserNickName}} 昵称
				* @return {{type:peopleUserCard}} 身份证号码 
				* @return {{type:peopleUserIcon}} 头像
				* @return {{type:peopleUserBirthday}} 用户生日 示例值：“2014-12-29”
				* @return {{type:peopleUserRealName}} 真实姓名
				* @return {{type:peopleUserSex}} 用户性别 0未知\1男\2女
				*/
			    info : function(func) {
			        ajaxCfg.url =  ms.base + "/people/user/info.do";
			        ms.ajax(ajaxCfg, func);
			    },

				/**
				* 更新用户资料信息
				------
				* @callmethod people.user.update(data,function(returnJson){...});
				* @param {{type:string}} peopleUserNickName 昵称
				* @param {{type:string}} peopleUserCard 身份证号码 
				* @param {{type:string}} peopleUserIcon 头像
				* @param {{type:string}} peopleUserBirthday  用户生日 示例值：“2014-12-29”
				* @param {{type:string}} peopleUserRealName 真实姓名
				* @param {{type:string}} peopleUserSex 用户性别 0未知\1男\2女
				* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* ms.load(["ms.people"],function(mpeople){
				* 	mpeople.people.user.update($("form").serialize(),function(returnJson){
				*		alert(JSON.stringify(returnJson));
				* 	});
				* });
				* ...
				* @function
				* {
				*	"code":000,
				*	"result":true,
				*	"resultMsg":""
				* }
				* @return {{type:code}} 模块编码
				* @return {{type:result}} true成功、false失败
				* @return {{type:resultMsg}} 错误信息
				*/
			    update : function(data,func){
					ajaxCfg.url = ms.base +  "/people/user/update.do";
					if (ms.isEmpty(data)){
						return;
					};
					ajaxCfg.params = data;
					ms.ajax(ajaxCfg, func);	
			    },

			},
		    address : {
		        	
				/**
				* 保存用户地址
				------
				* @callmethod people.address.save(data,function(returnJson){...});
				* @param {{type:strings,have:true}} peopleAddressConsigneeName 姓名
				* @param {{type:strings,have:true}} peopleAddressAddress 地址
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
						ms.alert("姓名不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressAddress)){
						ms.alert("地址不能为空");
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
						ms.alert("地址的ID不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("地址的ID为整型数据");
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
				* @param {{type:strings,have:true}} peopleAddressConsigneeName 姓名
				* @param {{type:strings,have:true}} peopleAddressId 地址ID
				* @param {{type:strings,have:true}} peopleAddressAddress 地址
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
						ms.alert("姓名不能为空");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressId)){
						ms.alert("地址ID不能为空");
						return;
					}else if (!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("地址ID为整型");
						return;
					};
					if (validator.isNull(newnDataJson.peopleAddressAddress)){
						ms.alert("地址不能为空");
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
						ms.alert("地址的ID不能为空");
						return;
					}else if(!validator.isInt(newnDataJson.peopleAddressId)){
						ms.alert("地址的ID为整型数据");
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
						ms.alert("地址的ID不能为空");
						return;
					}else if(!validator.isInt(newDataJson.peopleAddressId)){
						ms.alert("地址的ID为整型数据");
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
				*	"peopleAddressConsigneeName": "姓名"
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
				* @return {{type:peopleAddressConsigneeName}} 姓名
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

});