import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class Comment extends Base {
	constructor() {
		super()
	}
    /**
				* 发布评论
				------
				* @callmethod comment.people.save(data,function(returnJson){...});
				* @param  {{type:json,have:true}}  commentBasicId 评论帖子编号
				* @param  {{type:json,have:true}}  commentContent 评论内容
				* @param  {{type:json,have:true}}  rand_code 验证码
				* @param  {{type:json}}  commentCommentId 评论的父评论编号，当对文章直接进行评论，不需要此参数，对文章已有评论进行回复时，此参数必要
				* @param  {{type:json}}  commentPicture 评论图片
				* @param  {{type:json}}  commentPoints 评论分数
				* @param  {{type:function,have:true}}  回调方法 返回值（returnJson）
				* @examples 
				* ...
				* <form name="comment">
				*	<input name="commentBasicId"/> <!--评论帖子编号-->
				*	<textarea name="commentContent"></textarea> <!--评论内容-->
				*	<input type="text"  name="rand_code" /> <!--验证码-->
                *  	<img id="commentCode"/> 
				* </form>
				* ...
				* //验证码加载与点击刷新
				* super.code("commentCode");
				* $("#commentCode").click(function(){
				*	super.code("commentCode");
				* });
				* mcsuper.comment.people.save($("form").serialize(),function(returnJson){
				*	alert(JSON.stringify(returnJson));
				* })
				* ...
				* @function 
				* {
				*	code:"错误编码",
				*	result:"true｜false",
				*	resultMsg:"错误信息"
				* }
				* @return {{type:code}} 模块编码
				* @return {{type:result}} true存在｜false不存在或错误
				* @return {{type:resultMsg}} 错误信息
				*/
	save(data, func) {
		if (super.isEmpty(data)) {
			return;
		};
		//将data参数转json
		var newDataJson = super.turnJson(data);
		if (super.isEmpty(newDataJson.commentContent)) {
			super.alert("评论内容不能为空");
			return;
		};
		if (super.isEmpty(newDataJson.commentBasicId)) {
			super.alert("评论文章编号不能为空");
			return;
		};
		if (super.isEmpty(newDataJson.rand_code)) {
			super.alert("验证码不能为空");
			return;
		};
		post(this.baseUrl + "/people/comment/save.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.params = data;
		// this.ajaxCfg.url = this.base + "/people/comment/save.do";
		// super.ajax(this.ajaxCfg, func);
	}
}