import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Brand extends Base {
	constructor() {
		super()
	}
	/**
	* 品牌列表
	------
	* 获取当前商城中的品牌列表，也可以根据栏目Id获取当前栏目中的品牌
	* @callmethod brand.list(categoryId,function(returnJson){...});
	* @param {{type:int}} categoryCategoryId 商品分类编号
	* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
	* @examples 
	* ...
	* mmall.brand.list($("form").serialize(),function(returnJson){
	*	alert(JSON.stringify(returnJson));
	* });
	* ...
	* @function 
	* {"categoryTitle":"乐视","categoryDescription":"","categoryCategoryId":"6053"}
	* @return {{type:categoryTitle}} 品牌名
	* @return {{type:categoryDescription}} 类别描述
	* @return {{type:categoryCategoryId}} 商品分类编号
	* @return {{type:categorySmallImg}} 品牌缩略图
	*/
	list(categoryCategoryId, func) {
		if (!validator.isNull(categoryCategoryId)) {
			if (!validator.isInt(categoryCategoryId)) {
				super.alert("商品分类必须为整型");
				return;
			} else {
				this.ajaxCfg.params = "categoryCategoryId=" + categoryCategoryId;
			}
		} else {
			this.ajaxCfg.params = categoryCategoryId;
		}
		get(this.baseUrl + "/mall/brand.do?categoryCategoryId="+categoryCategoryId)
        .then(func, (err) => {
            console.log(err)
        })	
		// this.ajaxCfg.url = this.base + "/mall/brand/list.do";
		// super.ajax(this.ajaxCfg, func);
	}
	// showBase(){
	// 	console.log('a')
	// 	console.log("super:"+super.getBaseUrl())
	// 	console.log("this:"+this.getBaseUrl())
	// 	console.log("baseurl:"+super.baseUrl)
	// 	console.log('b')
	// }
}
