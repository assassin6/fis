import Base from '../../Base'
import { post, get, put, patch } from '../../Http'
export default class address extends Base {
    constructor(){
        super()
    }
    /**
    * 保存用户地址
    ------
    * @callmethod people.address.save(data,function(returnJson){...});
    * @param {{type:strings,have:true}} peopleAddressConsigneeName 姓名
    * @param {{type:strings,have:true}} peopleAddressAddress 地址
    * @param {{type:strings,have:true}} peopleAddressPhone 联系电话
    * @param {{type:strings,have:true}} peopleAddressMail 邮箱
    * @param {{type:strings,have:true}} peopleAddressProvince 省
    * @param {{type:strings,have:true}} peopleAddressProvinceId 省Id
    * @param {{type:strings}} peopleAddressCity 市
    * @param {{type:strings}} peopleAddressCityId 市Id
    * @param {{type:strings}} peopleAddressDistrict 县
    * @param {{type:strings}} peopleAddressDistrictId 县Id
    * @param {{type:strings}} peopleAddressStreet 街道
    * @param {{type:strings}} peopleAddressStreetId 街道Id
    * @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.address.save($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * {result:"true｜false"}
    * @return {{type:result}} true成功、false失败
    */
    save(data, func) {
        
        if (!data) {
            return;
        };
        //var newDataJson = super.turnJson(data);
        if (validator.isNull(data.peopleAddressConsigneeName)) {
            super.alert("姓名不能为空");
            return;
        };
        if (validator.isNull(data.peopleAddressAddress)) {
            super.alert("地址不能为空");
            return;
        };
        if (validator.isNull(data.peopleAddressPhone)) {
            super.alert("联系电话不能为空");
            return;
        } else if (!validator.isMobilePhone(data.peopleAddressPhone, 'zh-CN')) {
            super.alert("请输入正确的联系电话");
            return;
        };
        if ((!validator.isEmail(data.peopleAddressMail)) && (!validator.isNull(data.peopleAddressMail))) {
            super.alert("请输入正确的邮箱");
            return;
        };
        if (validator.isNull(data.peopleAddressProvince) && validator.isNull(data.peopleAddressProvinceId)) {
            super.alert("请把所在区域填写完整");
            return;
        };
        if (validator.isNull(data.peopleAddressDefault)) {
            super.alert("是否为默认不能为空");
            return;
        } else if (!validator.isInt(data.peopleAddressDefault)) {
            super.alert("是否为默认为整型数据");
            return;
        };
        post(this.baseUrl + "/people/address/save.do",data)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/address/save.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
    /**
    * 设置默认地址
    ------
    * 设置默认地址
    * @callmethod people.address.setDefault(data,function(returnJson){...});
    * @param {{type:strings,have:true}} peopleAddressId 自增长编号
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.address.setDefault($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * { code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 错误信息
    */
    setDefault(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.peopleAddressId)) {
            super.alert("地址的ID不能为空");
            return;
        } else if (!validator.isInt(newDataJson.peopleAddressId)) {
            super.alert("地址的ID为整型数据");
            return;
        };
        post(this.baseUrl + "/people/address/setDefault.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/address/setDefault.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
    /**
    * 更新用户收货地址
    ------
    * 更新用户收货地址
    * @callmethod people.address.update(data,function(returnJson){...});
    * @param {{type:strings,have:true}} peopleAddressConsigneeName 姓名
    * @param {{type:strings,have:true}} peopleAddressId 地址ID
    * @param {{type:strings,have:true}} peopleAddressAddress 地址
    * @param {{type:strings,have:true}} peopleAddressPhone 联系电话
    * @param {{type:strings,have:true}} peopleAddressMail 邮箱
    * @param {{type:strings,have:true}} peopleAddressProvince 省
    * @param {{type:strings,have:true}} peopleAddressProvinceId 省Id
    * @param {{type:strings}} peopleAddressCity 市
    * @param {{type:strings}} peopleAddressCityId 市Id
    * @param {{type:strings}} peopleAddressDistrict 县
    * @param {{type:strings}} peopleAddressDistrictId 县Id
    * @param {{type:strings}} peopleAddressStreet 街道
    * @param {{type:strings}} peopleAddressStreetId 街道Id
    * @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.address.update($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * { code:"错误编码",	result:"true｜false",resultMsg:"错误信息"}
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 错误信息
    */
    update(data, func) {
        if (!data) {
            return;
        };
        //var newDataJson = super.turnJson(data);
        if (validator.isNull(data.peopleAddressConsigneeName)) {
            super.alert("姓名不能为空");
            return;
        };
        if (validator.isNull(data.peopleAddressId)) {
            super.alert("地址ID不能为空");
            return;
        } else if (!validator.isInt(data.peopleAddressId)) {
            super.alert("地址ID为整型");
            return;
        };
        if (validator.isNull(data.peopleAddressAddress)) {
            super.alert("地址不能为空");
            return;
        };
        if (validator.isNull(data.peopleAddressPhone)) {
            super.alert("联系电话不能为空");
            return;
        } else if (!validator.isMobilePhone(data.peopleAddressPhone, 'zh-CN')) {
            super.alert("请输入正确的联系电话");
            return;
        };
        if (!validator.isEmail(data.peopleAddressMail) && !validator.isNull(data.peopleAddressMail)) {
            alert("请输入正确的邮箱");
            return;
        };
        if (validator.isNull(data.peopleAddressProvince) && 　validator.isNull(data.peopleAddressProvinceId)) {
            super.alert("请把所在区域填写完整");
            return;
        };
        if (validator.isNull(data.peopleAddressDefault)) {
            super.alert("是否为默认不能为空");
            return;
        } else if (!validator.isInt(data.peopleAddressDefault)) {
            super.alert("是否为默认为整型数据");
            return;
        };
        post(this.baseUrl + "/people/address/update.do",data)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/address/update.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
    /**
    * 删除收货信息
    ------
    * 根据收货地址id删除收货信息
    * @callmethod people.address.del(data,function(returnJson){...});
    * @param {{type:strings,have:true}} peopleAddressId 自增长编号
    * @param {{type:function,have:true}}  回调方法 返回值(returnJson)
    * @examples 
    * ...
    * mmall.people.address.del($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * { code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 错误信息
    */
    del(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.peopleAddressId)) {
            super.alert("地址的ID不能为空");
            return;
        } else if (!validator.isInt(newDataJson.peopleAddressId)) {
            super.alert("地址的ID为整型数据");
            return;
        };
        post(this.baseUrl + "/people/address/delete.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/address/delete.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
    /**
    * 查询用户信息
    ------
    * 通过peopleAddressId查询用户收货地址实体
    * @callmethod people.address.get(data,function(returnJson){...});
    * @param {{type:strings,have:true}} peopleAddressId 自增长编号
    * @param {{type:strings,have:true}} peopleAddressDefault 1默认 0非默认 
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.address.get($("form").serialize(),function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * { code:"错误编码",
    *	result:"true｜false",
    *	resultMsg:"错误信息"
    * }
    * @return {{type:code}} 错误编码
    * @return {{type:result}} true成功、false失败
    * @return {{type:resultMsg}} 错误信息
    */
    get(data, func) {
        if (validator.isNull(data)) {
            return;
        };
        var newDataJson = super.turnJson(data);
        if (validator.isNull(newDataJson.peopleAddressId)) {
            super.alert("地址的ID不能为空");
            return;
        } else if (!validator.isInt(newDataJson.peopleAddressId)) {
            super.alert("地址的ID为整型数据");
            return;
        };
        if (validator.isNull(newDataJson.peopleAddressDefault)) {
            super.alert("是否为默认不能为空");
            return;
        } else if (!validator.isInt(newDataJson.peopleAddressDefault)) {
            super.alert("是否为默认为整型数据");
            return;
        };
        // if (!data) {
        //     return;
        // };
        // var newDataJson = super.turnJson(data);
        // if (!newDataJson.peopleAddressId) {
        //     super.alert("地址的ID不能为空");
        //     return;
        // } else if (!validator.isInt(newDataJson.peopleAddressId)) {
        //     super.alert("地址的ID为整型数据");
        //     return;
        // };
        // if (!newDataJson.peopleAddressDefault) {
        //     super.alert("是否为默认不能为空");
        //     return;
        // } else if (!validator.isInt(newDataJson.peopleAddressDefault)) {
        //     super.alert("是否为默认为整型数据");
        //     return;
        // };
        get(this.baseUrl + "/people/address/get.do",newDataJson)
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/address/get.do";
//        this.ajaxCfg.params = data;
//        super.ajax(ajaxCfg, func);
    }
    /**
    * 用户收货地址列表
    ------
    * 获取用户收货地址列表
    * @callmethod people.address.list(function(returnJson){...});
    * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
    * @examples 
    * ...
    * mmall.people.address.list(function(returnJson){
    *	alert(JSON.stringify(returnJson));
    * });
    * ...
    * @function 
    * [{
    *	peopleAddressId:"自增长编号"
    *	"peopleAddressConsigneeName": "姓名"
    *	"peopleAddressAddress": "地址"
    *	"peopleAddressPhone": "手机号"
    *	"peopleAddressMail": "邮箱"
    *	"peopleAddressProvince": "省"
    *	"peopleAddressCity": "城市"
    *	"peopleAddressDistrict": "县／区"
    *	"peopleAddressStreet": "街道" 
    *	"peopleAddressDefault": 1默认 0非默认 
    *}]
    * @return {{type:peopleAddressId}} 自增长编号
    * @return {{type:peopleAddressConsigneeName}} 姓名
    * @return {{type:peopleAddressAddress}} 地址
    * @return {{type:peopleAddressPhone}} 手机号
    * @return {{type:peopleAddressMail}} 邮箱
    * @return {{type:peopleAddressProvince}} 省
    * @return {{type:peopleAddressCity}} 市
    * @return {{type:peopleAddressDistrict}} 县/区
    * @return {{type:peopleAddressStreet}} 街道
    * @return {{type:peopleAddressDefault}} 1默认 0非默认
    */
    list(func) {
    	post(this.baseUrl + "/people/address/list.do")
        .then(func, (err) => {
            console.log(err)
        })
//        this.ajaxCfg.url = this.base + "/people/address/list.do";
//        super.ajax(ajaxCfg, func);
    }
}