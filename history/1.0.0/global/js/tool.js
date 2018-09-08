<<<<<<< HEAD
define(function(require, exports, module) {
	var ms = require("ms");
	return {
		"version" : "1.0.0",
		marginDel:function(id,size){
			$("#"+id).each(function(){
				var dataNo = $(this).attr("data-no");
				if(dataNo % size == 0 ){
				    $(this).css("margin-right","0px")
				}
			})
		},
	}
=======
define(function(require, exports, module) {
	var ms = require("ms");
	return {
		"version" : "1.0.0",
		marginDel:function(id,size){
			$("#"+id).each(function(){
				var dataNo = $(this).attr("data-no");
				if(dataNo % size == 0 ){
				    $(this).css("margin-right","0px")
				}
			})
		},
	}
>>>>>>> commit
})