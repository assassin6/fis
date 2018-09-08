import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class Attention extends Base {
	constructor() {
		super()
	}
    /**
				 * 删除关注
				 ------
				 * @callmethod attention.people.del(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicId 信息编号集合 多个编号用逗号隔开,例如1,2,3,4
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcsuper.attention.people.del($("form").serialize(),function(returnJson){
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
		if (validator.isNull(newDataJson.basicAttentionType)) {
			super.alert("basicAttentionType不能为空");
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
				 * 判断文章是否收藏过
				 ------
				 * @callmethod attention.people.isExists(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 信息编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcsuper.attention.people.isExists($("form").serialize(),function(returnJson){
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
			super.alert("文章编号不能为空");
			return;
		} else if (!validator.isInt(newDataJson.basicAttentionBasicId)) {
			super.alert("文章编号为整型");
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
				 * 收藏列表
				 ------
				 * @callmethod attention.people.list(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台可以根据自身规则定义
				 * @param {{type:string,have:true}} modelCode 模块编码
				 * @param {{type:string,have:true}} pageNo  页码
				 * @param {{type:string,have:true}} pageSize 一页显示数量
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcsuper.attention.people.list($("form").serialize(),function(returnJson){
  	      		 *		alert(JSON.stringify(returnJson));
  	    		 *	})
  	    		 *...
  	    		 * @function 
  	    		 * { "list": [
				 *	{
				 *	"basicPic": "缩略图", 
				 *	"basicTitle": "标题", 
				 *	"basicComment": 评论数, 
				 *	"basicCollect": 收藏数量, 
				 *	"basicHit": 点数量, 
				 *	"basicAppId": 1, 
				 *	"basicCategoryId": 160, 
				 *	"basicDateTime": 1468568887000,
				 *	"basicThumbnails": "/upload/mall/product/1/1468568853464.jpg", 
				 *	"basicTypeIds": [ ], 
				 *	"basicUpdateTime": shan, 
				 *	}],
				 *	"page":{"endRow": 2, 
				 *	"firstPage": 1, 
				 *	"hasNextPage": true存在下一页false不存在, 
				 *	"hasPreviousPage": true存在上一页false不存在, 
				 *	"isFirstPage": true是第一页false不是第一页, 
				 *	"isLastPage": true是最后一页false不是最后一页, 
				 *	"lastPage": 最后一页的页码, 
				 *	"navigatePages": 导航数量，实现 1...5.6.7....10效果, 
				 *	"navigatepageNums": []导航页码集合, 
				 *	"nextPage": 下一页, 
				 *	"pageNum": 当前页码, 
				 *	"pageSize": 一页显示数量, 
				 *	"pages": 总页数, 
				 *	"prePage": 上一页, 
				 *	"size": 总记录, 
				 *	"startRow": , 
				 *	"total":总记录数量}
				 *	}
  	    		 * @return {{type:basicAppId}} 编号
  	    		 * @return {{type:basicTitle}} 标题
  	    		 * @return {{type:basicDateTime}} 时间
  	    		 * @return {{type:basicPic}} 缩略图
  	    		 * @return {{type:basicLinkUrl}} 链接
  	    		 * @return {{type:basicUpdateTime}} 更新时间
  	    		 * @return {{type:basicHit}} 点数量
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
		post(this.baseUrl + "/people/attention/list.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/people/attention/list.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func);
	}
    /**
				 * 文章收藏
				 ------
				 可设置不同的关注类型，达到不同的关注操作与统计，比如关注类型为1可为收藏文章，为2是点赞，为3是踩，为4是关注等
				 * @callmethod attention.people.save(data,function(returnJson){...});
				 * @param {{type:string,have:true}} basicAttentionBasicId 文章编号
				 * @param {{type:string,have:true}} basicAttentionType 关注类型 具体平台也可以根据自身的规则定义
				 * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
				 * @examples 
				 * ...
				 * mcsuper.attention.people.save($("form").serialize(),function(returnJson){
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
			super.alert("文章编号不能为空");
			return;
		} else if (!validator.isInt(newDataJson.basicAttentionBasicId)) {
			super.alert("文章编号应该为整型");
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
}