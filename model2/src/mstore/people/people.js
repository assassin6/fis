import Base from "../../Base";
import { post, get, put, patch } from "../../Http";
export default class People extends Base {
  constructor() {
    super();
  }
  /**
     * 用户分享列表
     ------
        * @callmethod people.list(function(json){...})
        * @param {{type:function,have:true}}  回调方法 返回值（json）
        * @examples
        * ...
        * mmstore.people.list(function(json){
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
        *   "upgraderVersionZipUrl":下载地址,
        * }]
        * @return {{type:upgraderVersionName}} 模板标题
        * @return {{type:upgraderVersionDescription}} 模板描述
        * @return {{type:upgraderVersionImg}} 模板图片
        * @return {{type:upgraderVersionPeopleIcon}} 分享者头像
        * @return {{type:upgraderVersionPeopleName}} 分享者昵称
        * @return {{type:upgraderVersionUrl}} 帖子地址
        * @return {{type:upgraderVersionZipUrl}} 下载地址
        */
  list(func) {
    if (this.debugMode) {
      get(this.baseUrl + "/people/upgrader/version/list" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    } else {
      post(this.baseUrl + "/people/upgrader/version/list" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    }
    // ajaxCfg.url = this.storeUrl + "/people/upgrader/version/list"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  save(data, func) {
    post(
      this.baseUrl + "/people/upgrader/version/save" + this.urlExt,
      data
    ).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.storeUrl + "/people/upgrader/version/save"+this.urlExt;
    // ajaxCfg.params = data;
    // super.ajax(ajaxCfg, func);
  }
  delete(id, func) {
    post(this.baseUrl + "/people/upgrader/version/delete" + this.urlExt).then(
      func,
      err => {
        console.log(err);
      }
    );
    // ajaxCfg.url = this.storeUrl + "/people/upgrader/version/delete"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  release(id, data, func) {
    if (validator.isNull(id)) {
      alert("id不能为空");
      return;
    }
    if (
      !validator.isLength(id, {
        max: 55
      })
    ) {
      super.alert("id最多为55位");
      return;
    }
    post(
      this.baseUrl +
        "/people/upgrader/version/" +
        id +
        "/release" +
        this.urlExt,
      data
    ).then(func, err => {
      console.log(err);
    });
    // ajaxCfg.url = this.storeUrl + "/people/upgrader/version/" + id + "/release"+this.urlExt;
    // ajaxCfg.params = data;
    // super.ajax(ajaxCfg, func);
  }
  edit(id, func) {
    if (validator.isNull(id)) {
      alert("id不能为空");
      return;
    }
    if (
      !validator.isLength(id, {
        max: 55
      })
    ) {
      super.alert("id最多为55位");
      return;
    }
    if (this.debugMode) {
      get(
        this.baseUrl + "/people/upgrader/version/" + id + "/edit" + this.urlExt
      ).then(func, err => {
        console.log(err);
      });
    } else {
      post(
        this.baseUrl + "/people/upgrader/version/" + id + "/edit" + this.urlExt
      ).then(func, err => {
        console.log(err);
      });
    }
    // ajaxCfg.url = this.storeUrl + "/people/upgrader/version/" + id + "/edit"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  /**
*用户详情
------
* @callmethod people.data(function(json){...})
* @param {{type:function,have:true}}  回调方法 返回值（json）
* @examples
* ...
* mmstore.people.data(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @function
* [{
*   "down":下载量,
*   "share":分享数,
*   "user":用户数,
*   "pay":我的赞助,
*   "project":众包收益,
*   "income":分享收益,
* }]
* @return {{type:down}} 下载量
* @return {{type:share}} 分享数
* @return {{type:user}} 用户数
* @return {{type:pay}} 我的赞助
* @return {{type:project}} 众包收益
* @return {{type:income}} 分享收益
*/
  data(func) {
    if (this.debugMode) {
      get(this.baseUrl + "/people/mstore/data" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    } else {
      post(this.baseUrl + "/people/mstore/data" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    }
    // ajaxCfg.url = this.storeUrl + "/people/mstore/data"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  payList(func) {
    if (this.debugMode) {
      get(this.baseUrl + "/people/mstore/payList" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    } else {
      post(this.baseUrl + "/people/mstore/payList" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    }
    // ajaxCfg.url = this.storeUrl + "/people/mstore/payList"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  downList(func) {
    if (this.debugMode) {
      get(this.baseUrl + "/people/mstore/downList" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    } else {
      post(this.baseUrl + "/people/mstore/downList" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    }
    // ajaxCfg.url = this.storeUrl + "/people/mstore/downList"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  userList(data, func) {
    get(this.baseUrl + "/people/mstore/userList" + this.urlExt, data).then(
      func,
      err => {
        console.log(err);
      }
    );
    // ajaxCfg.url = this.storeUrl + "/people/mstore/userList"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  /**
* 获取相应的插件信息
------
* @param {{type:string,have:true}} id 插件id
* @examples 
* ...
* mmstore.templates.detail(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @return {{type:upgraderVersionDescription}} 版本描述
* @return {{type:upgraderVersionTime}} 版本信息更新时间
* @return {{type:upgraderVersionName}} 版本名称
* @return {{type:upgraderVersionPrice}} 版本价格
* @return {{type:upgraderVersionImg}} 缩略图
* @return {{type:upgraderVersionDownload}} 模板下载量
* @return {{type:upgraderVersionStart}} 模板星级
* @return {{type:upgraderVersionMaven}} maven依赖
* @return {{type:upgraderVersionReadme}} 使用信息
*/
  detail(data, func) {
    if (validator.isNull(data)) {
      alert("id不能为空");
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
    post(this.baseUrl + "/people/mstore/detail" + this.urlExt, data).then(
      func,
      err => {
        console.log(err);
      }
    );
    // ajaxCfg.url = super.base + "/people/mstore/detail"+this.urlExt;
    // ajaxCfg.params = data;
    // super.ajax(ajaxCfg, func);
  }
  /**
* 支付购买模版插件
------
* @param {{type:string,have:true}} id  模版插件编号
* @examples 
* ...
* mmstore.templates.pay(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @return {{type:data}} 支付链接
*/
  pay(id, func) {
    if (validator.isNull(id)) {
      alert("id不能为空");
      return;
    }
    if (
      !validator.isLength(id, {
        max: 55
      })
    ) {
      super.alert("id最多为55位");
      return;
    }
    post(this.baseUrl + "/people/mstore/" + id + "/pay" + this.urlExt).then(
      func,
      err => {
        console.log(err);
      }
    );
    // ajaxCfg.url = super.base + "/people/mstore/" + id + "/pay"+this.urlExt;
    // super.ajax(ajaxCfg, func);
  }
  /**
* 下载资源
------
* @callmethod mmstore.templates.down(id, function(json) {...})
* @param {{type:string,have:true}} id 模版插件编号
* @examples 
* ...
* mmstore.templates.down(function(json){
*   alert(JSON.stringify(returnJson));
* })
* ...
* @return {{type:data}} 如果用户下载的资源是需要收费的，但是用户用非法手段请求，就返回失败，如果用户第一次下载 就新增一条纪录，否则就直接更新历史数据，业务合法正常弹出下载浏览器界面
*/
  down(data, func) {
    if (validator.isNull(data)) {
      alert("id不能为空");
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
    post(this.baseUrl + "/people/mstore/down" + this.urlExt, data).then(
      func,
      err => {
        console.log(err);
      }
    );
    // ajaxCfg.url = super.base + "/people/mstore/down"+this.urlExt;
    // ajaxCfg.params = data;
    // super.ajax(ajaxCfg, func);
  }
  incomeList(func) {
    if (this.debugMode) {
      get(this.baseUrl + "/people/mstore/incomeList" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    } else {
      post(this.baseUrl + "/people/mstore/incomeList" + this.urlExt).then(
        func,
        err => {
          console.log(err);
        }
      );
    }
  }
  info(func) {
    if (this.debugMode) {
      get(this.baseUrl + "/people/user/info" + this.urlExt).then(func, err => {
        console.log(err);
      });
    } else {
      post(this.baseUrl + "/people/user/info" + this.urlExt).then(func, err => {
        console.log(err);
      });
    }
  }
}
