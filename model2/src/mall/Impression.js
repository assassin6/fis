import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Impression extends Base {
	constructor() {
		super()
	}
	/**
	* 获取商品印象
		------
	* @callmethod productImpression.get(data,function(json){...});
	* @param {{type:string,have:true}} piBasicId 商品编号
	* @param {{type:string,have:true}} piId 印象自增长编号
	* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
	* @examples 
	* ...
	* mmall.productImpression.get($("form").serialize(),function(returnJson){
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
		get(this.baseUrl + "/mall/productImpression.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mall/productImpression/get.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func);
	}
}