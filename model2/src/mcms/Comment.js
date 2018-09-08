import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Comment extends Base {
    constructor() {
        super()
    }
    /**
			 * 评论列表
			------
			 * 获取文章的评论列表
			 * @callmethod comment.list(data,function(json){...});
			 * @param {{type:commentBasicId,have:true}}  文章编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcsuper.comment.list(data,function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			*/
    list(data, func) {
        if (super.isEmpty(data)) {
            return;
        };
        //将data参数转json
        var newDataJson = super.turnJson(data);
        if (super.isEmpty(newDataJson.commentBasicId)) {
            super.alert("文章编号不能为空");
            return;
        };
        post(this.baseUrl + "/comment/list.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.params = data;
        // this.ajaxCfg.url = this.base + "/comment/list.do";
        // super.ajax(this.ajaxCfg, func);
    }
}