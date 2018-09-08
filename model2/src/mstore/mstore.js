import Base from "../Base";
import { post, get, put, patch } from "../Http";
export default class Mstore extends Base {
  constructor() {
    super();
  }
  /**
     * 赞助者列表
     ------
    * @callmethod people.topSponsor(function(json){...})
    * @param {{type:function,have:true}}  回调方法 返回值（json）
    * @examples
    * ...
    * mmstore.people.topSponsor(function(json){
    *   alert(JSON.stringify(returnJson));
    * })
    * ...
    * @function
    * [{
    *   "upgraderOrderPeopleIcon":赞助者头像,
    *   "upgraderOrderPeopleNickName":赞助者昵称,
    * }]
    * @return {{type:upgraderOrderPeopleIcon}} 赞助者头像
    * @return {{type:upgraderOrderPeopleNickName}} 赞助者昵称
    */
  topSponsor(func) {
    post(this.baseUrl + "/mstore/topSponsor" + this.urlExt).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.baseUrl + "/mstore/topSponsor"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  /**
*分享者列表
------
* @callmethod people.topShareUser(function(json){...})
* @param {{type:function,have:true}}  回调方法 返回值（json）
* @examples
* ...
* mmstore.people.topShareUser(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @function
* [{
*   "upgraderVersionPeopleIcon":分享者头像,
*   "upgraderVersionPeopleName":分享者昵称,
* }]
* @return {{type:upgraderVersionPeopleIcon}} 分享者头像
* @return {{type:upgraderVersionPeopleName}} 分享者昵称
*/
  topShareUser(func) {
    post(this.baseUrl + "/mstore/topShareUser" + this.urlExt).then(
      func,
      err => {
        console.log(err);
      }
    );
    // ajaxCfg.url = this.baseUrl + "/mstore/topShareUser"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  topDown(func) {
    post(this.baseUrl + "/mstore/topDown" + this.urlExt).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.baseUrl + "/mstore/topDown"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  /**
     * 模板列表
     ------
    * @callmethod templates.list(data,function()...)}
    * @param {{type:int,have:true}}  upgraderVersionType  列表分类编号
    * @param {{type:int,have:true}}  upgraderVersionIndustry  模板分类编号
    * @param {{type:int,have:true}}  upgraderVersionColor  颜色分类编号
    * @param {{type:int,have:true}}  orderBy  排序类型
    * @param {{type:function,have:true}}  回调方法 返回值（json）
    * @examples
    * ...
    * mmstore.templates.list(function(json){
    *   alert(JSON.stringify(returnJson));
    * })
    * ...
    * @function
    * [{
    *   "upgraderVersionName":模板标题,
    *   "upgraderVersionDescription":模板描述,
    *   "upgraderVersionImg":模板图片,
    *   "upgraderVersionPeopleIcon":分享者头像,
    *   "upgraderVersionPeopleName":分享者昵称,
    *   "upgraderVersionUrl":帖子地址,
    * }]
    * @return {{type:upgraderVersionName}} 模板标题
    * @return {{type:upgraderVersionDescription}} 模板描述
    * @return {{type:upgraderVersionImg}} 模板图片
    * @return {{type:upgraderVersionPeopleIcon}} 分享者头像
    * @return {{type:upgraderVersionPeopleName}} 分享者昵称
    * @return {{type:upgraderVersionUrl}} 帖子地址
    */
  list(data, func) {
    if (validator.isNull(JSON.stringify(data))) {
      return;
    }
    get(this.baseUrl + "/mstore/list" + this.urlExt, data).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.baseUrl + "/mstore/list"+this.urlExt;
    // ajaxCfg.params = data;
    // super.ajax(ajaxCfg, func);
  }
  /**
* 模板数量
------
* @callmethod templates.number(data,function()...)}
* @param {{type:function,have:true}}  回调方法 返回值（json）
* @examples
* ...
* mmstore.templates.number(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @function
* [{
*   "all":模板总数,
*   "mouth":本月上新模板数量,
*   "week":本周上新模板数量,
* }]
* @return {{type:all}} 模板总数
* @return {{type:mouth}} 本月上新模板数量
* @return {{type:week}} 本周上新模板数量
*/
  count(func) {
    post(this.baseUrl + "/mstore/count" + this.urlExt).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.baseUrl + "/mstore/count"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  /**
* 获取论坛图片
------
* @callmethod mmstore.templates.modelImg(data, function(json){...});
* @param {{type:string,have:true}} subjectBasicId  基本ID
* @examples 
* ...
* mmstore.templates.modelImg(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @return {{type:data}} 图片链接
*/
  img(data, func) {
    if (validator.isNull(data)) {
      alert("模板id不能为空");
      return;
    }
    if (
      !validator.isLength(data, {
        max: 55
      })
    ) {
      super.alert("id最多为55位");
      return;
    }
    post(this.baseUrl + "mstore/img" + this.urlExt, data).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.baseUrl + "mstore/img"+this.urlExt;
    // ajaxCfg.params = data;
    // super.ajax(ajaxCfg, func);
  }
}
