import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Attention extends Base {
    constructor() {
        super()
    }
    /**
			* 文章收藏数
			------
			根据文章收藏类型，返回对应的收藏数
			* @callmethod attention.people.save(data,function(returnJson){...});
			 * @param {{type:string,have:true}} basicAttentionBasicId 文章编号
			 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
			 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
			 * @examples 
			 * ...
			 * mcsuper.attention.count($("form").serialize(),function(returnJson){
      		 *		alert(JSON.stringify(returnJson));
    		 *	})
    		 * ...
    		 * @function 
    		 * 1
    		 * @return {{type:string}} 收藏数量
			 */
    count(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.basicAttentionType)) {
            super.alert("收藏类型不能为空");
            return;
        }
        if (validator.isNull(newDataJson.basicAttentionBasicId)) {
            super.alert("文章编号不能为空");
            return;
        } else if (!validator.isInt(newDataJson.basicAttentionBasicId)) {
            super.alert("文章编号应该为整型");
            return;
        };
        post(this.baseUrl + "/attention/count.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/attention/count.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
}