import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class Impression extends Base {
    constructor() {
        super()
    }
    /**
    * 获取商品印象
    ------
    * @callmethod people.mall.impression.get(data,function(json){...});
    * @param {{type:string,have:true}} piBasicId 商品编号
    * @param {{type:string,have:true}} piId 印象自增长编号
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.mall.impression.get($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function
    * [
    * {
    * "piId":自增长编号,
    * "piBasicId":商品编号,
    * "piTitle":"印象",
    * "piPeopleId":添加用户,
    * "piAmount":数量,
    * "piDatetime":"添加时间"
    * }
    * ]
      * @return{{type:piId}} 自增长编号
    * @return{{type:piBasicId}} 商品编号
    * @return{{type:piTitle}} 印象
    * @return{{type:piPeopleId}} 添加用户
    * @return{{type:piAmount}} 数量
    * @return{{type:piDatetime}} 添加时间
    */
    get(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.piBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.piBasicId)) {
            super.alert("商品编号必须为整数");
            return;
        }
        if (validator.isNull(newDataJson.piId)) {
            super.alert("印象自增长编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.piId)) {
            super.alert("印象自增长编号必须为整数");
            return;
        }
        get(this.baseUrl + "/people/mall/productImpression/"+newDataJson.piId+".do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/productImpression/get.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 保存商品印象
      ------
     * @callmethod people.mall.impression.save(data,function(json){...});
     * @param {{type:string,have:true}} piBasicId 商品编号
     * @param {{type:string,have:true}} piTitle 印象
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples 
     * ...
     * mmall.people.mall.impression.save($("form").serialize(),function(returnJson){
     *	alert(JSON.stringify(returnJson));
     * }); 
     * ...
     * @function
     * [
     * {
     * "piBasicId":商品编号,
     * "piTitle":"印象",
     * "piDatatime":"时间",
     * "piId":自增长编号,
     * "piPeopleId":添加用户
     * }
     * ]
     * @return{{type:piBasicId}} 商品编号
     * @return{{type:piTitle}} 印象
     * @return{{type:piDatatime}} 时间
     * @return{{type:piId}} 自增长编号
     * @return{{type:piPeopleId}} 添加用户
     */
    save(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.piBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.piBasicId)) {
            super.alert("商品编号必须为整数");
            return;
        }
        if (validator.isNull(newDataJson.piTitle)) {
            super.alert("印象不能为空");
            return;
        }
        post(this.baseUrl + "/people/mall/productImpression.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/productImpression/save.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 删除商品印象
      -----
     * @callmethod people.mall.impression.delete(data,function(json){...});
     * @param {{type:string,have:true}} piId 自增长编号 批量删除商品印象
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples 
     * ...
     * mmall.people.mall.impression.del($("form").serialize(),function(returnJson){
     *	alert(JSON.stringify(returnJson));
     * }); 
     * ...
     * @function
     * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
     * @return{{type:code}} 错误编码
     * @return{{type:result}} true 成功、false失败
     * @return{{type:resultMsg}} 错误信息
     */
    del(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.piId)) {
            super.alert("印象编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.cartBasicId)) {
            super.alert("印象编号必须为整型");
            return;
        }
        delete(this.baseUrl + "/people/mall/productImpression.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/productImpression/delete.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 更新商品印象
      -----
     * @callmethod people.mall.impression.update(data,function(json){...});
     * @param {{type:string,have:true}} piBasicId 商品编号
     * @param {{type:string,have:true}} piTitle 印象
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples 
     * ...
     * mmall.people.mall.impression.update($("form").serialize(),function(returnJson){
     *	alert(JSON.stringify(returnJson));
     * }); 
     * ...
     * @function
     * [
     * {
     * "piBasicId":商品编号,
     * "piTitle":"印象"
     * }
     * ]
     * @return{{type:piBasicId}} 商品编号
     * @return{{type:piTitle}} 印象
     */
    update(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.piBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.piBasicId)) {
            super.alert("商品编号必须为整型");
            return;
        }
        if (validator.isNull(newDataJson.piTitle)) {
            super.alert("印象不能为空");
            return;
        }
        put(this.baseUrl + "/people/mall/productImpression.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/productImpression/update.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 查询商品印象列表
      -----
     * @callmethod people.mall.impression.list(data,function(json){...});
     * @param {{type:string,have:true}} piBasicId 商品编号
     * @param {{type:function,have:true}}  回调方法 返回值（returJson）
     * @examples 
     * ...
     * mmall.people.mall.impression.list($("form").serialize(),function(returnJson){
     *	alert(JSON.stringify(returnJson));
     * }); 
     * ...
     * @function
     * [
     * {
     * "piId":自增长编号,
     * "piBasicId":商品编号,
     * "piTitle":"印象",
     * "piPeopleId":添加用户,
     * "piAmount":数量,
     * "piDatetime":"添加时间"
     * }
     * ]
     * @return{{type:piId}} 自增长编号
     * @return{{type:piBasicId}} 商品编号
     * @return{{type:piTitle}} 印象
     * @return{{type:piPeopleId}} 添加用户
     * @return{{type:piAmount}} 数量
     * @return{{type:piDatetime}} 添加时间
     */
    list(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.piBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.piBasicId)) {
            super.alert("商品编号必须为整数");
            return;
        }
        get(this.baseUrl + "/people/mall/productImpression.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/productImpression/list.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
}