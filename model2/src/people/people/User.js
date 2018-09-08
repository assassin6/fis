import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class user extends Base {
    constructor(){
        super()
    }
    /**
   * 获取用户详细信息
   ------
   * @callmethod people.user.info(function(returnJson){...});
   * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
   * @examples 
   * ...
   * super.load(["super.people"],function(mpeople){
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
    info(func) {
    	get(this.baseUrl + "/people/user/info.do")
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/user/info.do";
//        super.ajax(ajaxCfg, func);
    }

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
    * super.load(["super.people"],function(mpeople){
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
    update(data, func) {
//        this.ajaxCfg.url = this.base + "/people/user/update.do";
        if (super.isEmpty(data)) {
            return;
        };
        post(this.baseUrl + "/people/user/update.do",JSON.stringify(data))
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
}