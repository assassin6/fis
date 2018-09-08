import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class Cart extends Base {
    constructor() {
        super()
    }
    /**
    * 购物车商品列表
    ------
    * @callmethod people.mall.cart.list(function(returnJson){...});
    * @param {{type:string}}  cartIds 购物车编号，多个用","隔开
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.mall.cart.list(function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * [
    *	{"cartDiscount": 折扣,
    *	"cartId": 自增长编号,
    *	"cartNum": 数量,	
    *	"cartPrice": 价格,
    *	"cartThumbnail": "缩略图", 
    *	"cartTime": "添加日期", 
    *	"cartTitle": "标题"
    *	}
    *	]
    * @return {{type:cartDiscount}} 折扣
    * @return {{type:cartId}} 自增长编号
    * @return {{type:cartNum}} 数量
    * @return {{type:cartPrice}} 价格
    * @return {{type:cartThumbnail}} 缩略图
    * @return {{type:cartTime}} 添加日期
    * @return {{type:cartTitle}} 标题
    */
    list(data, func) {
        get(this.baseUrl + "/people/mall/order/cart.do",data)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/mall/order/cart.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
    * 加入购物车
    ------
    * 添加到购物车，如果购物车内已经存在一样的信息，系统会只更新相同信息的数量
    * @callmethod people.mall.cart.save(data,function(returnJson){...});
    * @param {{type:string,have:true}} cartId 购物车编号
    * @param {{type:string,have:true}} cartBasicId 信息编号
    * @param {{type:int,have:true}} cartNum 数量
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.mall.cart.save($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 提示信息
    */
    save(data, func) {
        if (validator.isNull(data)) {
            return;
        }

        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.cartBasicId)) {
            super.alert("信息编号不能为空");
            return;
        }
        if (!validator.isInt(newDataJson.cartBasicId)) {
            super.alert("信息编号必须为整型");
            return;
        }

        if (validator.isNull(newDataJson.cartNum)) {
            super.alert("商品数量不能为空");
            return;
        }
        if (!validator.isInt(newDataJson.cartNum)) {
            super.alert("商品数量必须为整型");
            return;
        }
        post(this.baseUrl + "/people/mall/order/cart.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/mall/order/cart/save.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
    * 删除购物车中的商品
    ------
    * 当执行单个删除时直接在地址中传入ID即可
    * 当执行批量删除时多个cartId直接用逗号隔开,id=1,2,3,45,
    * @callmethod people.mall.cart.del(data,function(returnJson){...});
    * @param {{type:string,have:true}} cartIds 购物车编号
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.mall.cart.del($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 提示信息
    */
    del(data, func) {
        if (validator.isNull(data)) {
            super.alert("购物车编号不能为空");
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.cartIds)) {
            super.alert("购物车编号不能为空");
            return;
        }
        var idArray = new Array;
        var dotNum = 0;
        idArray = newDataJson.cartIds.split(",");
        for (var index = 0; index < newDataJson.cartIds.length; index++) {
            if (newDataJson.cartIds[index] === ',') {
                dotNum++;
            }
        }
        if (dotNum >= idArray.length) {
            super.alert("输入参数格式有误");
            return;
        }
        //cartIds 购物车编号，多个用逗号隔开 cartIds=1,2,3,4，cartProductDetailIds用逗号隔开
        delete(this.baseUrl + "/people/mall/order/cart.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/mall/order/cart/delete.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
    * 更新购物车
    ------
    * 只能更新购物车的数量
    * @callmethod people.mall.cart.update(data,function(returnJson){...});
    * @param {{type:string,have:true}} cartId 购物车编号
    * @param {{type:string,have:true}} cartBasicId 信息编号
    * @param {{type:int,have:true}} cartNum 数量
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.mall.cart.update($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 提示信息
    */
    update(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.cartId)) {
            super.alert("购物车编号不能为空");
            return;
        }
        if (!validator.isInt(newDataJson.cartId)) {
            super.alert("购物车编号必须为整型");
            return;
        }
        if (validator.isNull(newDataJson.cartBasicId)) {
            super.alert("信息编号不能为空");
            return;
        }
        if (!validator.isInt(newDataJson.cartBasicId)) {
            super.alert("信息编号必须为整型");
            return;
        }
        if (validator.isNull(newDataJson.cartNum)) {
            super.alert("商品数量不能为空");
            return;
        }
        if (!validator.isInt(newDataJson.cartNum)) {
            super.alert("商品数量必须为整型");
            return;
        }
        //json格式
        put(this.baseUrl + "/people/mall/order/cart.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/mall/order/cart/update.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
}