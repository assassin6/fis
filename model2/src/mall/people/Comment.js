import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class Comment extends Base {
    constructor() {
        super()
    }
    /**
     * 删除评论
     ------
     * ocCommentId:多个ocCommentId直接用逗号隔开,例如ocCommentId=1,2,3,4 批量删除订单评价
     * @callmethod people.mall.comment.del(data,function(returnJson){....});
     * @param {{type:int,have:true}} ocCommentId 评论编号
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples
     * ...
     * mmall.people.mall.comment.del($("form").serialize(),function(returnJson){
     *		alert(JSON.stringify(data,returnJson));	
     *});
     * ...
     * @function
     * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
     *@return {{type:code}} 错误编码
     *@return {{type:result}} true 成功、false 失败
     *@return {{type:resultMsg}} 错误信息
     */
    del(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        var newnDataJson = super.turnJson(data);
        if (validator.isNull(newnDataJson.ocCommentId)) {
            super.alert("评论编号不能为空");
            return;
        };
        if (!validator.isInt(newnDataJson.ocCommentId)) {
            super.alert("评论编号应该为整形");
            return;
        }
        var idArray = new Array;
        var dotNum = 0;
        idArray = newnDataJson.ocCommentId.split(",");
        for (var index = 0; index < newnDataJson.ocCommentId.length; index++) {
            if (newnDataJson.ocCommentId[index] === ",") {
                dotNum++;
            }
        }
        if (dotNum >= idArray.length) {
            super.alert("输入参数格式有误");
            return;
        }						
        delete(this.baseUrl + "/people/mall/orderComment.do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/mall/orderComment/delete.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 评论列表
     ------
     * @callmethod people.mall.comment.list(data,function(returnJson){....});
     * @param {{type:int,have:true}} commentBasicId 商品编号
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples
     * ...
     * mmall.people.mall.comment.list($("form").serialize(),function(returnJson){
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
        //ocCommentId=1&ocOrderId=2 多个参数
        get(this.baseUrl + "/people/mall/orderComment.do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/orderComment/list.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     *保存评论
     ------
     * @callmethod people.mall.comment.save(data,function(returnJson){....});
     * @param {{type:int,have:true}} commentBasicId 商品编号
     * @param {{type:int,have:true}} ocOrderId 订单编号
     * @param {{type:string,have:true}} ocImpression 印象
     * @param {{type:string,have:true}} ocProduct 商品符合度
     * @param {{type:string,have:true}} ocService 店家服务态度
     * @param {{type:string,have:true}} ocLogistics 物流发货速度
     * @param {{type:string,have:true}} ocServiceDescribe 评价服务
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples
     * ...
     * mmall.people.mall.comment.save($("form").serialize(),function(returnJson){
     * 		alert(JSON.stringify(returnJson));	
     * });
     * ...
     * @function
     * [
     * {
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
    save(data, func) {
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
        if (validator.isNull(newnDataJson.ocOrderId)) {
            super.alert("订单编号不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.commentContent)) {
            super.alert("评论内容不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocImpression)) {
            super.alert("印象不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocProduct)) {
            super.alert("商品符合度不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocService)) {
            super.alert("店家服务态度不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocLogistics)) {
            super.alert("物流发货速度不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocServiceDescribe)) {
            super.alert("评价服务不能为空");
            return;
        };
        post(this.baseUrl + "/people/mall/orderComment.do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/orderComment/save.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     *更新评论
     ------
     * @callmethod people.mall.comment.update(data,function(returnJson){....});
     * @param {{type:int,have:true}} ocCommentId 评论编号
     * @param {{type:int,have:true}} ocOrderId 订单编号
     * @param {{type:string,have:true}} ocImpression 印象
     * @param {{type:string,have:true}} ocProduct 商品符合度
     * @param {{type:string,have:true}} ocService 店家服务态度
     * @param {{type:string,have:true}} ocLogistics 物流发货速度
     * @param {{type:string,have:true}} ocServiceDescribe 评价服务
     * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
     * @examples
     * ...
     * mmall.people.mall.comment.update($("form").serialize(),function(returnJson){
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
    update(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newnDataJson = super.turnJson(data);
        if (validator.isNull(newnDataJson.ocImpression)) {
            super.alert("印象不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocProduct)) {
            super.alert("商品符合度不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocService)) {
            super.alert("店家服务态度不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocLogistics)) {
            super.alert("物流发货速度不能为空");
            return;
        };
        if (validator.isNull(newnDataJson.ocServiceDescribe)) {
            super.alert("评价服务不能为空");
            return;
        };
        put(this.baseUrl + "/people/mall/orderComment.do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/people/mall/orderComment/update.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
}