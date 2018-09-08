import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class basic extends Base {
    constructor(){
        super()
    }
    /**
    * 保存用户商品浏览记录列表
    ------
    * 用户登录后才会保存，一般放商品详情页，页面刷新如果用户登录则保存该商品浏览记录
    * @callmethod people.basic.people.save(data,function(returnJson){...});
    * @param {{type:string,have:true}} bpBasicId  商品id
    * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
    * @examples 
    * ...
    * mpeople.people.basic.people.save($("form").serialize(),function(returnJson){
            *		alert(JSON.stringify(returnJson));
        *	})
        *...
        * @function 
        * {
        *	bpBasicId:293
    *	bpDatetime:1502336702535
    *	bpId:6
    * 	bpPeopleId:193
    *	createBy:0
    *	delFlag:0
    *	updateBy:0
        * }
        * @return {{type:bpBasicId}} 商品编号
        * @return {{type:bpDatetime}} 时间
        * @return {{type:bpId}} 浏览历史编号
    */
    save(data, func) {
        if (validator.isNull(data)) {
            super.alert("浏览记录参数不能为空");
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.bpBasicId)) {
            super.alert("商品id不能为空");
            return;
        }
        post(this.baseUrl + "/people/basic/people/save.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/basic/people/save.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
    /**
     * 删除用户商品浏览记录列表
     ------
     * 根据浏览历史中商品id进行删除操作，可删除多个，多个用,隔开
     * @callmethod people.basic.people.del(data,function(returnJson){...});
     * @param {{type:string,have:true}} bpBasicId  商品id
     * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
     * @examples 
     * ...
     * mpeople.people.basic.people.del($("form").serialize(),function(returnJson){
             *		alert(JSON.stringify(returnJson));
         *	})
         *...
         * @function 
         * {result: true}
         * @return {{type:result}} 删除结果 true为删除成功 false为删除失败
     */
    del(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.bpBasicId)) {
            super.alert("商品id不能为空");
            return;
        }
        var idArray = new Array;
        var dotNum = 0;
        idArray = newDataJson.bpBasicId.split(",");
        for (var index = 0; index < newDataJson.bpBasicId.length; index++) {
            if (newDataJson.bpBasicId[index] === ',') {
                dotNum++;
            }
        }
        if (dotNum >= idArray.length) {
            super.alert("输入参数格式有误");
            return;
        }
        post(this.baseUrl + "/people/basic/people/delete.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/basic/people/delete.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
}