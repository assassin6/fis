import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Comment extends Base {
    constructor() {
        super()
    }
    /**
    * 商品评价列表
    ------
    * @callmethod comment.list(data,function(returnJson){....});
    * @param {{type:int,have:true}} commentBasicId 商品编号
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples
    * ...
    * mmall.comment.list($("form").serialize(),function(returnJson){
    * 		alert(JSON.stringify(returnJson));	
    * });
    * ...
    * @function
    * [
    * {
    * "ocCommentId":评论编号,
    * "ocOrderId":订单编号,
    * "ocImpression":"印象",
    * "ocProduct":商品符合度,
    * "ocService":店家服务态度,
    * "ocLogistics":物流发货速度,
    * "ocServiceDescribe":"评价服务"
    * }
    * ]
    * @return {{type:ocCommentId}} 评论编号
    * @return {{type:ocOrderId}} 订单编号
    * @return {{type:ocImpression}} 印象
    * @return {{type:ocProduct}} 商品符合度
    * @return {{type:ocService}} 店家服务态度
    * @return {{type:ocLogistics}} 物流发货速度
    * @return {{type:ocServiceDescribe}} 评价服务
    */
    list(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newnDataJson = super.turnJson(data);
        if (validator.isNull(newnDataJson.commentBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newnDataJson.commentBasicId)) {
            super.alert("商品编号应该为整形");
            return;
        };
        get(this.baseUrl + "/mall/orderComment.do",newnDataJson)//json格式
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/mall/orderComment/list.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 商品评论汇总
     ------
     * @callmethod comment.summar(data,function(returnJson){....});
     * @param {{type:int,have:true}} commentBasicId 商品编号
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples
     * ...
     * mmall.comment.summar($("form").serialize(),function(returnJson){
     * 		alert(JSON.stringify(returnJson));	
     * });
     * ...
     * @function
     * [
     * {
     * "commenTcount":评论编号,
     * "goodRate":好评率,
     * "goodCount":"好评",
     * "generalCount":"中评",
     * "poorCount":"差评"
     * }
     * ]
     * @return {{type:commenTcount}} 评论编号
     * @return {{type:goodRate}} 好评率
     * @return {{type:goodCount}} 好评
     * @return {{type:generalCount}} 中评
     * @return {{type:poorCount}} 差评
     */
    summar(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newnDataJson = super.turnJson(data);
        if (validator.isNull(newnDataJson.commentBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newnDataJson.commentBasicId)) {
            super.alert("商品编号应该为整形");
            return;
        };
        get(this.baseUrl + "/mall/orderComment/summar.do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/mall/orderComment/summar.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    showBase(){
		console.log('a')
		console.log("super:"+super.getBaseUrl())
		console.log("this:"+this.getBaseUrl())
		console.log("baseurl:"+super.baseUrl)
		
	}
}