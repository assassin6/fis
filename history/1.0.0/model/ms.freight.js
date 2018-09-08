<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};
	return {
		//运费
		cost : function(data,func){
			if(validator.isNull(data)){
				return;
			}
			var newnDataJson=ms.turnJson(data);
			if(validator.isNull(newnDataJson.freightCityId)){
				ms.alert("城市编号不能为空");
				return;
			}else if(!validator.isInt(newnDataJson.freightCityId)){
				ms.alert("城市编号必须为整形");
				return;
			};
			if(validator.isNull(newnDataJson.freightExpressId)){
				ms.alert("快递编号不能为空");
				return;
			}else if(!validator.isInt(newnDataJson.freightExpressId)){
				ms.alert("快递编号必须为整形");
				return;
			};
			if(validator.isNull(newnDataJson.scale)){
				ms.alert("快递重量不能为空");
				return;
			};
			ajaxCfg.url = ms.base + "/freight/cost.do";
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);
		},
	}

=======
define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};
	return {
		//运费
		cost : function(data,func){
			if(validator.isNull(data)){
				return;
			}
			var newnDataJson=ms.turnJson(data);
			if(validator.isNull(newnDataJson.freightCityId)){
				ms.alert("城市编号不能为空");
				return;
			}else if(!validator.isInt(newnDataJson.freightCityId)){
				ms.alert("城市编号必须为整形");
				return;
			};
			if(validator.isNull(newnDataJson.freightExpressId)){
				ms.alert("快递编号不能为空");
				return;
			}else if(!validator.isInt(newnDataJson.freightExpressId)){
				ms.alert("快递编号必须为整形");
				return;
			};
			if(validator.isNull(newnDataJson.scale)){
				ms.alert("快递重量不能为空");
				return;
			};
			ajaxCfg.url = ms.base + "/freight/cost.do";
			ajaxCfg.params = data;
			ms.ajax(ajaxCfg, func);
		},
	}

>>>>>>> commit
})