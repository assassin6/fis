import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class people extends Base {
    constructor() {
        super()
    }
    /**
    * 注册
    ------
    * 用户可以用名称、手机号、邮箱三者之一进行注册
    * 几种注册流程的形式：
    * 1、普通用户名称、登录密码，优先用户名注册,登录密码最长度范围3～30个字符；
    * 2、邮箱、邮箱验证码、登录密码（邮箱必须是可接收验证码）；
    * 3、手机号、短信验证码、登录密码；
    * 注意： 1、注册页面必须存在图片验证码
    * 2、如果需要接收验证码操作，需要使用“发送验证码”配合使用才能完成注册流程
    * @callmethod register(data,function(returnJson){...});
    * @param {{type:string}} peoplePhone 手机号
    * @param {{type:string}} peopleName 用名称 用户名长度在3～30个字符之间，只能是字母数字混合
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
    * super.load(["ms","super.people"],function(ms,mpeople){
    * 	//验证码加载与点击刷新
    * 	super.code("registeCode");
    * 	$("#registeCode").click(function(){
    *		super.code("registeCode");
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
    register(data, func) {
        //this.ajaxCfg.url =
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peoplePhone) && super.isEmpty(newDataJson.peopleName)) {//&& super.isEmpty(newDataJson.peopleMail)
            super.alert("用户名，手机号，邮箱必须有一个不为空");
            return;
        };
        if (!super.isEmpty(newDataJson.peoplePhone)) {
            if (!validator.isMobilePhone(newDataJson.peoplePhone, 'zh-CN')) {
                super.alert("请输入正确的手机号");
                return;
            }
        };
        // if (!super.isEmpty(newDataJson.peopleMail)) {
        //     if (!validator.isEmail(newDataJson.peopleMail)) {
        //         super.alert("请输入正确的邮箱");
        //         return;
        //     }
        // };
        if (super.isEmpty(newDataJson.peoplePassword)) {
            super.alert("注册密码不能为空");
            return;
        };
        if (super.isEmpty(newDataJson.rand_code)) {
            super.alert("验证码不能为空");
            return;
        };

        //ajax替代方式
        //this.ajaxCfg.params = data;
        //super.ajax(ajaxCfg, func);

        post(this.baseUrl + "/register.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
    }
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
    * super.load(["ms","super.people"],function(ms,mpeople){
    * 	//验证码加载与点击刷新
    * 	super.code("loginCode");
    * 	$("#loginCode").click(function(){
    *		super.code("loginCode");
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
    checkLogin(data, func) {
        //this.ajaxCfg.url = this.baseUrl + "/checkLogin.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peopleName)) {
            super.alert("用户名不能为空");
            return;
        };
        if (super.isEmpty(newDataJson.peoplePassword)) {
            super.alert("密码不能为空!");
            return;
        };
        if (super.isEmpty(newDataJson.rand_code)) {
            super.alert("验证码不能为空");
            return;
        };
        // this.ajaxCfg.params = data;
        // super.ajax(ajaxCfg, func);
        console.log(this.baseUrl)
        post(this.baseUrl + "/checkLogin.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
    }
    /**
    *验证登录状态
    ------
    * @callmethod checkLoginStatus(function(returnJson){...});
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * super.load(["super.people"],function(mpeople){
    * 	mpeople.checkLoginStatus(function(returnJson){
    *		alert(JSON.stringify(returnJson));
    * 	});
    * })
    * @function 
    * {result:"false"}
    * @return {{type:result}} true成功、false失败
    */
    checkLoginStatus(func) {
        post(this.baseUrl + "/checkLoginStatus.do")
            .then(func, (err) => {
                console.log(err)
            })
        // this.ajaxCfg.url = this.base + "/checkLoginStatus.do";
        // super.ajax(ajaxCfg, func);
    }
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
    * super.load(["super.people"],function(mpeople){
    * 	mpeople.sendCode($("form").serialize(),function(returnJson){
    *		alert(JSON.stringify(returnJson));
    * 	});
    * })
    * ...
    * @function 
    * {result:"true"}
    * @return {{type:result}} true成功、false失败
    */
    sendCode(data, func) {
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.receive)) {
            super.alert("接收地址不能为空");
            return;
        }
        if (super.isEmpty(newDataJson.modelCode)) {
            super.alert("对应邮件插件的模块编号不能为空");
            return;
        };
        post(this.baseUrl + "/sendCode.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        this.ajaxCfg.url = this.base + "/sendCode.do";
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["super.people"],function(mpeople){
    * 	mpeople.checkSendCode($("form").serialize(),function(returnJson){
    *		alert(JSON.stringify(returnJson));
    * 	});
    * })
    * @function 
    * {result:"true"}
    * @return {{type:result}} true成功、false失败
    */
    checkSendCode(data, func) {
        //        this.ajaxCfg.url = this.base + "/checkSendCode.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.receive)) {
            super.alert("接收地址不能为空");
            return;
        }
        if (super.isEmpty(newDataJson.code)) {
            super.alert("接收的验证码不能为空");
            return;
        };
        post(this.baseUrl + "/checkSendCode.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
    /**
    * 解绑邮箱验证用户接收的验证码
    ------
    * 解绑邮箱时，验证用户输入的系统发送邮件或者短信验证码是否正确
    * @callmethod cancelBind(data,function(returnJson){...});
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
    * super.load(["super.people"],function(mpeople){
    * 	mpeople.cancelBind($("form").serialize(),function(returnJson){
    *		alert(JSON.stringify(returnJson));
    * 	});
    * })
    * @function 
    * {result:"true"}
    * @return {{type:result}} true成功、false失败
    */
    cancelBind(data, func) {
        //        this.ajaxCfg.url = this.base + "/cancelBind.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.receive)) {
            super.alert("接收地址不能为空");
            return;
        }
        if (super.isEmpty(newDataJson.code)) {
            super.alert("接收的验证码不能为空");
            return;
        };
        post(this.baseUrl + "/cancelBind.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["super.people"],function(mpeople){
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
    check(data, func) {
        //        this.ajaxCfg.url = this.base + "/check.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peoplePhone) && super.isEmpty(newDataJson.peopleName) && super.isEmpty(newDataJson.peopleMail)) {
            super.alert("用户名，手机号，邮箱至少存在一个");
            return;
        };
        if (!super.isEmpty(newDataJson.peoplePhone)) {
            if (!validator.isMobilePhone(newDataJson.peoplePhone, 'zh-CN')) {
                super.alert("请输入正确的手机号");
                return;
            }
        };
        if (!super.isEmpty(newDataJson.peopleMail)) {
            if (!validator.isEmail(newDataJson.peopleMail)) {
                super.alert("请输入正确的邮箱");
                return;
            }
        };
        post(this.baseUrl + "/check.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["super.people"],function(mpeople){
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
    isExists(data, func) {
        //        this.ajaxCfg.url = this.base + "/isExists.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peoplePhone) && super.isEmpty(newDataJson.peopleName) && super.isEmpty(newDataJson.peopleMail)) {
            super.alert("用户名，手机号，邮箱至少存在一个");
            return;
        };
        if (!super.isEmpty(newDataJson.peoplePhone)) {
            if (!validator.isMobilePhone(newDataJson.peoplePhone, 'zh-CN')) {
                super.alert("请输入正确的手机号");
                return;
            }
        };
        if (!super.isEmpty(newDataJson.peopleMail)) {
            if (!validator.isEmail(newDataJson.peopleMail)) {
                super.alert("请输入正确的邮箱");
                return;
            }
        };
        post(this.baseUrl + "/isExists.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["ms","super.people"],function(ms,mpeople){
    * 	//验证码加载与点击刷新
    * 	super.code("picCode");
    * 	$("#picCode").click(function(){
    *		super.code("picCode");
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
    checkCode(rand_code, func) {
        if (super.isEmpty(rand_code)) {
            super.alert("验证码不能为空");
            return;
        };
        post(this.baseUrl + "/checkCode.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = "rand_code=" + rand_code;
        //        this.ajaxCfg.url = this.base + "/checkCode.do";
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["ms","super.people"],function(ms,mpeople){
    * 	//验证码加载与点击刷新
    * 	super.code("resetPasswordCode");
    * 	$("#resetPasswordCode").click(function(){
    *		super.code("resetPasswordCode");
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
    resetPassword(data, func) {
        //        this.ajaxCfg.url = this.base + "/resetPassword.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peoplePassword)) {
            super.alert("用户新密码");
            return;
        };
        if (super.isEmpty(newDataJson.peopleCode)) {
            super.alert("接收的验证码不能为空");
            return;
        };
        if (super.isEmpty(newDataJson.rand_code)) {
            super.alert("图片验证码不能为空");
            return;
        };
        post(this.baseUrl + "/resetPassword.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["ms","super.people"],function(ms,mpeople){
    * 	//验证码加载与点击刷新
    * 	super.code("checkResetPasswordCodeCode");
    * 	$("#checkResetPasswordCodeCode").click(function(){
    *		super.code("checkResetPasswordCodeCode");
    * 	});
    * 	mpeople.checkResetPasswordCode($("form").serialize(),function(returnJson){
    *		alert(JSON.stringify(returnJson));
    * 	});
    * })
    * @function 
    * {result:"true"}
    * @return {{type:result}} true成功、false失败
    */
    checkResetPasswordCode(data, func) {
        //        this.ajaxCfg.url = this.base + "/checkResetPasswordCode.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peopleCode)) {
            super.alert("接收的验证码不能为空");
            return;
        };
        if (super.isEmpty(newDataJson.rand_code)) {
            super.alert("图片验证码不能为空");
            return;
        };
        post(this.baseUrl + "/checkResetPasswordCode.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
    /**
    *退出
    ------
    * @callmethod people.quit(function(){...});
    * @param  {{type:function,have:true}}  回调方法 无返回值
    * @examples 
    * ...
    * <a href="#" class="quitLogin">退出</a>
    * ...
    * super.load(["super.people"],function(mpeople){
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
    quit(func) {
        post(this.baseUrl + "/people/quit.do")
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.url = this.base + "/people/quit.do";
        //        super.ajax(ajaxCfg, func);
    }
    /**
    * 设置密码
    ------
    * @callmethod people.resetPassword(data,function(returnJson){...});
    * @param {{type:String,have:true}} peoplePassword 用户密码
    * @param {{type:function}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * super.load(["super.people"],function(mpeople){
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
    resetPassword(data, func) {
        if (validator.isNull(data)) {
            super.alert("数据不能为空");
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.peoplePassword)) {
            super.alert("密码不能为空");
            return;
        }
        post(this.baseUrl + "/people/resetPassword.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.url = this.base + "/people/resetPassword.do";
        //        this.ajaxCfg.params = data;
        //        super.ajax(ajaxCfg, func);
    }
    /**
    * 验证用户接收的验证码
    ------
    * @callmethod people.checkPeopleCode(peopleCode,function(returnJson){...});
    * @param {{type:string,have:true}} peopleCode 短信、邮箱验证码 
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * super.load(["super.people"],function(mpeople){
    * 	mpeople.people.checkPeopleCode(peopleCode,function(returnJson){
    *		alert(JSON.stringify(returnJson));
    * 	});
    * });
    * ...
    * @function
    * {code:"模块编码",result:true}
    * @return {{type:code}} 编码
    * @return {{type:result}} true成功、false失败
    */
    checkPeopleCode(peopleCode, func) {
        if (super.isEmpty(peopleCode)) {
            return;
        };
        post(this.baseUrl + "/people/checkPeopleCode.do", peopleCode)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = "peopleCode=" + peopleCode;
        //        this.ajaxCfg.url = this.base + "/people/checkPeopleCode.do";
        //        super.ajax(ajaxCfg, func);
    }
    /**
    * 更新手机号或邮箱
    ------
    * 更新用户信息中保存的手机号或者邮箱号，二者必须存在一个
    * @callmethod people.update(data,function(returnJson){...});
    * @param {{type:string,have:true}} peopleMail 邮箱 
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
    * super.load(["super.people"],function(mpeople){
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
    update(data, func) {
        //        this.ajaxCfg.url = this.base + "/people/update.do";
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peoplePhone) && super.isEmpty(newDataJson.peopleMail)) {
            super.alert("手机号，邮箱必须有一个不为空");
            return;
        };
        if (!super.isEmpty(newDataJson.peoplePhone)) {
            if (!validator.isMobilePhone(newDataJson.peoplePhone, 'zh-CN')) {
                super.alert("请输入正确的手机号");
                return;
            }
        };

        if (!super.isEmpty(newDataJson.peopleMail)) {
            if (!validator.isEmail(newDataJson.peopleMail)) {
                super.alert("请输入正确的邮箱");
                return;
            }
        };
        post(this.baseUrl + "/people/checkPeopleCode.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        this.ajaxCfg.params = data;
        super.ajax(ajaxCfg, func);
    }
    /**
    * 获取用户基本信息
    ------
    * @callmethod people.info(function(returnJson){...});
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * super.load(["super.people"],function(mpeople){
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
    info(func) {
        post(this.baseUrl + "/people/info.do")
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.url = this.base + "/people/info.do";
        //        super.ajax(ajaxCfg, func);
    }
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
    * super.load(["super.people"],function(mpeople){
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
    changePassword(data, func) {
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.peopleOldPassword)) {
            super.alert("原密码不能为空");
            return;
        };
        if (super.isEmpty(newDataJson.peoplePassword)) {
            super.alert("新密码不能为空");
            return;
        }
        console.log(this.baseUrl + "/people/changePassword.do")
        console.log(newDataJson)
        post(this.baseUrl + "/people/changePassword.do", newDataJson)
            .then(func, (err) => {
                console.log(err)
            })
        //        this.ajaxCfg.params = data;
        //        this.ajaxCfg.url = this.base + "/people/changePassword.do";
        //        super.ajax(ajaxCfg, func);
    }
}