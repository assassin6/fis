import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Article extends Base {
	constructor() {
		super()
	}
    /**
			 * 文章内容
			------
			 * @callmethod article.detail(basicId,function(json){...});
			 * @param {{type:string,have:true}} basicId 文章编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcsuper.article.detail("{ms:field.id/}",function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			*/
	detail(basicId, func) {
		if (super.isEmpty(basicId)) {
			super.alert("文章编号不能为空");
			return;
		};
		post(this.baseUrl + "/mcms/article/" + basicId + "/detail.do",basicId)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mcms/article/" + basicId + "/detail.do";
		// super.ajax(this.ajaxCfg, func);
	}
	/**
			 * 文章点击数
			------
			 * @callmethod article.hit(basicId,function(json){...});
			 * @param {{type:string,have:true}} basicId 文章编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mcsuper.article.hit("{ms:field.id/}",function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * }); 
			 * ...
			 * @function
			 * 待补充
			*/
	hit(basicId, func) {
		if (super.isEmpty(basicId)) {
			super.alert("文章编号不能为空");
			return;
		};
		post(this.baseUrl + "/mcms/article/" + basicId + "/hit.do",basicId)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mcms/article/" + basicId + "/hit.do";
		// super.ajax(this.ajaxCfg, func);
	}
	/**
			* 文章列表
		   ------
			* 通过异步请求获得指定栏目下的文章列表
			* @callmethod article.list(data,function(json){...});
			* @param {{type:string,have:true}} pageNo 一页显示数量
			* @param {{type:string,have:true}} pageSize 当前页码
			* @param {{type:string,have:true}} basicCategoryId 文章栏目编号
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* mcsuper.article.list($("form").serialize(),function(returnJson){
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
		if (super.isEmpty(newDataJson.pageNo)) {
			super.alert("一页显示数量不能为空");
			return;
		};
		if (super.isEmpty(newDataJson.pageSize)) {
			super.alert("当前页码不能为空");
			return;
		};
		if (super.isEmpty(newDataJson.basicCategoryId)) {
			super.alert("分类编号不能为空");
			return;
		};
		post(this.baseUrl + "/mcms/article/list.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mcms/article/list.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func);
	}
}