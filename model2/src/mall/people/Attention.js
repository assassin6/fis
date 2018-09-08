import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class Attention extends Base {
    constructor() {
        super()
    }
    /**
     * 收藏商品
     ------
     * @callmethod people.mall.attention.save(data,function(returnJson){...});
     * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
     * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
     * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
     * @examples 
     * ...
     * mmall.people.mall.attention.save($("form").serialize(),function(returnJson){
             *		alert(JSON.stringify(returnJson));
         *	})
         * ...
         * @function 
         * {"result":true,"code":"09000000"}
         * @return {{type:code}} 错误编码
         * @return {{type:result}} true成功、false失败
     */
    save(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.basicAttentionBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.basicAttentionBasicId)) {
            super.alert("商品编号应该为整型");
            return;
        };
        if (validator.isNull(newDataJson.basicAttentionType)) {
            super.alert("关注类型不能为空");
            return;
        };
        post(this.baseUrl + "/people/attention/save.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/attention/save.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 判断是否收藏
     ------
     * @callmethod people.mall.attention.isExists(data,function(returnJson){...});
     * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
     * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
     * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
     * @examples 
     * ...
     * mmall.people.mall.attention.isExists($("form").serialize(),function(returnJson){
             *		alert(JSON.stringify(returnJson));
         *	})
         * ...
         * @function 
         * {"result":true,"code":"09000000"}
         * @return {{type:code}} 错误编码
         * @return {{type:result}} true成功、false失败
     */
    isExists(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.basicAttentionBasicId)) {
            super.alert("商品编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.basicAttentionBasicId)) {
            super.alert("商品编号为整型");
            return;
        };
        if (validator.isNull(newDataJson.basicAttentionType)) {
            super.alert("关注类型不能为空");
            return;
        };
        post(this.baseUrl + "/people/attention/isExists.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/attention/isExists.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 取消收藏
     ------
     * @callmethod people.mall.attention.del(data,function(returnJson){...});
     * @param {{type:string,have:true}} basicId 信息编号集合 多个编号用逗号隔开,例如1,2,3,4
     * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
     * @examples 
     * ...
     * mmall.people.mall.attention.del($("form").serialize(),function(returnJson){
             *		alert(JSON.stringify(returnJson));
         *	})
         *...
         * @function 
         * 无返回值
     */
    del(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.basicId)) {
            super.alert("basicId不能为空");
            return;
        }
        var idArray = new Array;
        var dotNum = 0;
        idArray = newDataJson.basicId.split(",");
        for (var index = 0; index < newDataJson.basicId.length; index++) {
            if (newDataJson.basicId[index] === ',') {
                dotNum++;
            }
        }
        if (dotNum >= idArray.length) {
            super.alert("输入参数格式有误");
            return;
        }
        post(this.baseUrl + "/people/attention/delete.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/attention/delete.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
    /**
     * 收藏列表
     ------
     * @callmethod people.mall.attention.list(data,function(returnJson){...});
     * @param {{type:string,have:true}} pageNo  页码
     * @param {{type:string,have:true}} pageSize 一页显示数量
     * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
     * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
     * @examples 
     * ...
     * mmall.people.mall.attention.list($("form").serialize(),function(returnJson){
            *		alert(JSON.stringify(returnJson));
         *	})
         *...
         * @function 
         * [
         * 	{"basicId":商品编号,
         * 	"basicTitle":"商品标题",
         *  "basicDateTime"："时间",
         *  "basicPic":商品图片,
         *  "productLinkUrl":商品链接,
         *  "basicSort":"商品分类",
         *  "productPrice":商品价格
         * 	}
             * ]
         * @return {{type:basicId}} 商品编号
         * @return {{type:basicTitle}} 商品标题
         * @return {{type:basicDateTime}} 时间
         * @return {{type:basicPic}} 商品图片
         * @return {{type:productLinkUrl}} 商品链接
         * @return {{type:basicSort}} 商品分类
         * @return {{type:productPrice}} 商品价格
     */
    list(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.basicAttentionType)) {
            super.alert("列表的类型不能为空");
            return;
        }
        if (validator.isNull(newDataJson.pageNo)) {
            super.alert("页码不能为空");
            return;
        } else if (!validator.isInt(newDataJson.pageNo)) {
            super.alert("页码应为整型");
            return;
        }
        if (validator.isNull(newDataJson.pageSize)) {
            super.alert("分页数量不能为空");
            return;
        } else if (!validator.isInt(newDataJson.pageSize)) {
            super.alert("分页数量应为整型");
            return;
        }
        post(this.baseUrl + "/people/mall/attention/list.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })	
        // this.ajaxCfg.url = this.base + "/people/mall/attention/list.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
}