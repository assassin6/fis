define(function(require, exports, module) {
	var ms = require("ms");
	var ajaxCfg = {
		"type" : "post",
		"dataType" : "json"
	};
	return {
		//商品品牌
		brand : {
			/**
			* 品牌列表
			------
			* 获取当前商城中的品牌列表，也可以根据栏目Id获取当前栏目中的品牌
			* @callmethod brand.list(categoryId,function(returnJson){...});
			* @param {{type:int}} categoryCategoryId 商品分类编号
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* mmall.brand.list($("form").serialize(),function(returnJson){
			*	alert(JSON.stringify(returnJson));
			* });
			* ...
			* @function 
			* {"categoryTitle":"乐视","categoryDescription":"","categoryCategoryId":"6053"}
			* @return {{type:categoryTitle}} 品牌名
			* @return {{type:categoryDescription}} 类别描述
			* @return {{type:categoryCategoryId}} 商品分类编号
			* @return {{type:categorySmallImg}} 品牌缩略图
			*/
			list : function(categoryCategoryId,func){
				if (!validator.isNull(categoryCategoryId)) {							
					if (!validator.isInt(categoryCategoryId)) {
						ms.alert("商品分类必须为整型");							
						return;
					}else{
						ajaxCfg.params = "categoryCategoryId="+categoryCategoryId;
					}
				}else{
					ajaxCfg.params = categoryCategoryId;
				}
				ajaxCfg.url = ms.base + "/mall/brand/list.do";
				ms.ajax(ajaxCfg, func);	
			},
		},

		//商品规格
		specification : {
			/**
			* 获取当前商品规格
			------
			* 传入商品编号和规格区域元素对象，并按照规范将规格区域的模板定好，后台规格将按照规定的规格模板自动追加到页面
			* 通过data-specs为命名空间，取商品规格全部数据，并绑定了在文档上的事件，无需写一行javascript代码：
			*	价格 ms-specs-price，如果使用只能唯一，选择不同组合规则的商品显示对应价格
			* 	库存 ms-specs-stock，如果使用只能唯一，选择不同组合规格的商品显示对应库存
			* 	规格模板 ms-specs-area
			* 	规格名称 ms-specs-key
			* 	规格值（循环对象）ms-specs-value
			* 	规格图片容器 ms-specs-img
			* 	规格值名称容器 ms-specs-text
			* 具体用法请参照实例
			* @callmethod specification.list(productId,onSelect,function(returnJson){...});
			* @param {{type:int,have:true}} productId 商品id
			* @param {{type:string,have:true}} onSelect 规格选中样式
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）此时返回的是选中一组规格后，当前规格组的属性
			* @examples 
			* ...
			* 价格：<span data-specs="ms-specs-price">{ms:field.price/}</span><!--商品价格-->
			* <div class="spec"><!--规格区域 该元素以字符串形式传入接口-->
			* 	<div data-specs="ms-specs-area"><!--规格模板，多个规格会按这个模板形式自动追加-->
			* 		<label data-specs="ms-specs-key">规格名称</label><!--规格名称-->
			* 		<ul>
			* 			<li data-specs="ms-specs-value"><!--规格是多个，当前这个li容器只需一个作为模板会根据后台设置的规格值进行追加-->
			* 				<img  data-specs="ms-specs-img" src="规格图"/><!--规格图片的追加，如果没有将隐藏-->
			* 				<span data-specs="ms-specs-text">规格值</span><!--规格值名称-->
			* 			</li>
			* 		</ul>
			* 	</div>
			* </div>
			* 库存：<span data-specs="ms-specs-stock">{ms:field.stock/}</span><!--库存-->
			* ...
			* mmall.specification.list("{ms:field.id/}","sel");
			* ...
			* @function 
			* {"code":"4","detailId":"1","order":"true","price":"52","productId":"26","stock":"100","specValues":{"颜色":"白色","重量":"100kg"}}
			* @return {{type:productId}} 商品id
			* @return {{type:price}} 当前组合规格价格
			* @return {{type:stock}} 当前组合规格库存
			* @return {{type:detailId}} 当前组合规格的编号（唯一）
			* @return {{type:specValues}} 当前组合规格的规格属性
			*/
			list : function(productId,onSelect,func){

				if (!validator.isNull(""+productId)) {							
					if (!validator.isInt(productId)) {
						ms.alert("商品id必须为整型");							
						return;
					}
				}else{
					ms.alert("商品id不能为空");
				}
				g_container = $("body");
				var areaTmpl = g_container.find("*[data-specs='ms-specs-area']");
				//areaTmpl.hide();
				areaTmpl.find("*[data-specs='ms-specs-key']").text("规格");
				areaTmpl.find("*[data-specs='ms-specs-text']").text("加载中...");

				ajaxCfg.url = ms.base + "/mall/productSpecification/"+productId+"/list.do";
				ajaxCfg.params = productId;
				ms.ajax(ajaxCfg, function(json){
					//var _json = eval("("+ json +")");
					//将规格展现到页面
					initProductSpecs(json);
					//将返回的规格组合用object形式转换
					var specDetails = initSpecDetails(json.productSpecDetails);
					//点击规格组合切换对应规格组价格
					specsVauleClick(g_container,onSelect,specDetails);

				});
				//处理接口返回的规格
			    function initProductSpecs(specArr) {
			        this.productSpecs = {};
			        // 初始化商品规格数据，把相同名字的规格作为键，他的值 为所包含规格值的数组
					// 例如 {"颜色"：["白"，"红"], "尺寸":["S", "M", "L"]}
			        for (var i in specArr.productSpecs){
			            var specData = specArr.productSpecs[i];
			            var specName = specData.specName;

			            if (!this.productSpecs[specName]){
			                this.productSpecs[specName] = [];
			            }
			            this.productSpecs[specName].push(specData);
			        }
			        
			        //将键值进行分开获取并展现到页面
			        //需要规定规格区间ms-specs-area，规格键与值ms-specs-key,ms-specs-value及规格图片ms-specs-pic
			        
			        for(var key in this.productSpecs){
			        	var arr = this.productSpecs[key];

			        	//复制规格组追加到规格区域
			        	var area = areaTmpl.clone();
			        	areaTmpl.after(area);
			        	//将规格键值赋值到规格区域的ms-specs-key标记中
			        	var label = area.find("*[data-specs='ms-specs-key']");
			        	label.text(key);
			        	//找到规格组的规格值区域
			        	//var specContainer = area.find("*[data-specs='ms-specs-values']");
			        	var specTmpl = area.find("*[data-specs='ms-specs-value']");
			        	specTmpl.attr("data-specs-key",key);
			        	//循环当前规格组的规格属性值
			        	for(var i in arr){

			        		//复制规格值并追加到规格值区域
			        		var specItem = specTmpl.clone(true);
			        		specTmpl.after(specItem);
			        		//对应赋值图片和文字
			  				var img = specItem.find("*[data-specs='ms-specs-img']");
			  				if(arr[i].img != ""){
			  					img.attr("src",arr[i].img);
			  				}else{
			  					img.hide();
			  				}
			  				var text = specItem.find("*[data-specs='ms-specs-text']");
			  				text.text(arr[i].specValue);	
			  				
			        	}
			        	//移除规格值模板
			        	specTmpl.remove();
			        }
			        //移除规格区域模板
			        areaTmpl.remove();
			        
			    }

			    // 初始化规格明细数据， 把规格值的字符串，处理成Object形式
				// 例如 “尺寸：S，颜色：白” 转化成 {"尺寸":S, "颜色":"白"}
			    function initSpecDetails(arr) {
			        for (var i in arr){
			            var detail = arr[i];
			            var valuesStr = detail.specValues;
			            var valuesObj = {};

			            var valueArr = valuesStr.split(',');
			            for (var j in valueArr){

			                var valueStr = valueArr[j];
			                var data = valueStr.split(':');
			                var specName = data[0];
			                var specValue = data[1];
			                valuesObj[specName] = specValue;
			            }
			            // obj数据覆盖字符串数据
			            detail.specValues = valuesObj;
			        }
			        return arr;
			    }

			    //将点击的规格属性值进行object拼装，同一个规格只能保留一个值
			    function specsVauleClick(g_container,onSelect,specDetails){
			    	var specValues = {};
			    	var specObj = g_container.find("*[data-specs='ms-specs-value']");
			    	var specText = specObj.find("*[data-specs='ms-specs-text']");
			    	//价格
			    	var productPrice = $("body").find("*[data-specs='ms-specs-price']");
			    	var productPriceText = productPrice.text();
			    	//库存
			    	var productStock = $("body").find("*[data-specs='ms-specs-stock']");
			    	var productStockText = productStock.text();

			    	specObj.click(function(){
			    		var specKey = $(this).attr("data-specs-key");
				    	var specValue = $(this).find(specText).text();
			    		if($(this).hasClass(onSelect)){
			    			//如果已经选中，那取消选中，并且还原价格和库存
			    			$(this).removeClass(onSelect);
			    			delete specValues[specKey];
			    			if(productPrice.length > 0){
			    				productPrice.text(productPriceText);
			    			}
			    			if(productStock.length > 0){
			    				productStock.text(productStockText);
			    			}
			    		}else{
			    			//如果没有选中，那取消同类其他选中，加上当前选中样式
			    			$(this).siblings().removeClass(onSelect);
				    		$(this).addClass(onSelect);
				    		//找到当前点击的规格名称及规格值
				    		
				    		specValues[specKey] = specValue;

				    		for(var i in specDetails){
				    			if(objEqual(specDetails[i].specValues,specValues)){
				    				//alert(specDetails[i].price)
				    				if (func != null && func != undefined) {
				    					func(specDetails[i]);
				    				}
				    				productPrice.text(specDetails[i].price);
					    			productStock.text(specDetails[i].stock);
					    			
				    			}
				    		}

			    		}
			    	})
			    }

				// 判断两个object 相等
			    function objEqual(obj1, obj2){
			        var len1 = getObjLength(obj1);
			        var len2 = getObjLength(obj2);

			        if (len1 != len2) return false;
		        	for (var i in obj1){
			            if (obj1[i] != obj2[i]){
			                return false;
			            }
			        }
			        return true;
			    }
				
				// 获取Object长度
				function getObjLength(obj) {
			        var c = 0;
			        for (var i in obj){
			            c ++;
			        }
			        return c;
			    }
			},
			/**
			*获取指定分类标准规格列表
			------
			* 获取商品的标准规格
			*/
			queryByCategoryId:function(data,func){
                if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.categoryId)){
					ms.alert("商品分类ID不能为空");
					return;
				};
				ajaxCfg.url = ms.base + "/mall/specification/queryByCategoryId.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
            },
			/**
			 *根据商品规格明细id获取商品详细数据
			------
			 * 可以在只有规格数据时取到当前商品的全部信息
			 * @callmethod specification.detail(data,function(returnJson){...});
			 * @param {{type:int,have:true}} detailId 商品规格明细id
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mmall.specification.detail($("form").serialize(),function(returnJson){
			 *	alert(JSON.stringify(returnJson));
			 * });
			 * ...
			 * @function 
			 * {"resultMsg":
			 *	"{"product":
			 *		{
			 *		"basicCategoryId":155,
		 	 *		"basicPic":"/upload/mall/product/1/1468565697974.jpg",
		 	 *		"basicTitle":"豫灵潭 雨前一级 纯手工野生信阳毛尖 罐裝 100g",
		 	 *		"column":{
	 		 * 			"categoryTitle":"信阳毛尖",
	 		 *			"productBrand":163,
	 		 *			"productContent":"商品详情html内容",
	 		 *			"productCostPrice":15.2,
	 		 *			"productId":222,
	 		 *			"productLinkUrl":"/151/155\\\\222.html",
	 		 *			"productPrice":96.12,
	 		 *			"productStock":99,
	 		 *			"detail":{
	 		 *				"detailId":53,
	 		 *				"price":3,
	 		 *				"productId":222,
	 		 *				"specValues":"尺寸:1,
	 		 *				数量:5",
	 		 *				"stock":"2",
	 		 *			}",
	 		 *			"result":true,
	 		 *			"code":"06030000"
	 		 *		}
	 		 *	}
			 * }
			 * @return {{type:basicCategoryId}} 商品分类id
			 * @return {{type:productId}} 商品id
			 * @return {{type:basicPic}} 商品图片
			 * @return {{type:basicTitle}} 商品标题
			 * @return {{type:categoryTitle}} 商品所属栏目名称
			 * @return {{type:productBrand}} 商品所属品牌
			 * @return {{type:productContent}} 商品详细内容
			 * @return {{type:productCostPrice}} 商品现价
			 * @return {{type:productPrice}} 商品原价
			 * @return {{type:productStock}} 商品库存
			 * @return {{type:productLinkUrl}} 商品详细链接
			 * @return {{type:detail}} 商品规格信息
			 */
			detail : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.detailId)){
					ms.alert("商品规格编号不能为空");
					return;
				}else if(!validator.isInt(newnDataJson.detailId)){
					ms.alert("商品规格编号必须为整形");
					return;
				};
				ajaxCfg.url = ms.base + "/mall/specificationDetail/"+data+"/get.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
			},
		},
		mall:{
			/**
			 *搜索引擎搜索商品(推荐)
			 ------
			 * 通过商品的品牌，所属栏目、规格等进行搜索筛选，还可进行按价格或销量等排序，返回值默认是商品所属列表页，也可以用json获取返回值进行处理。该接口必须存在一个搜索条件
			 * @callmethod mall.search(data,function(returnJson){....});
			 * @param {{type:int}} category 商品分类id(必须存在一个搜索条件)
			 * @param {{type:int}} brand 品牌id
			 * @param {{type:string}} keyword 搜索关键字
			 * @param {{type:int}} pageNumber 当前页码
			 * @param {{type:int}} pageSize 一页显示数量，默认20条
			 * @param {{type:string}} spec 规格筛选： 多个规格筛选用","分割,相同规格多选用@分割。如 spec=尺寸:1寸@2寸,形状:圆形
			 * @param {{type:string}} productPrice 按价格排序，格式：min-max, 没有上线或下限可以缺省，没有"-" 表示精确价格筛选。如 &price=0.3-234
			 * @param {{type:string}} productSale 按销量排序，格式：min-max, 没有上线或下限可以缺省，没有"-" 表示精确价格筛选。如 &price=0.3-234
			 * @param {{type:string}} sort 声明 升序降序  排序字段-方式,不写方式默认降序 desc。如 sort=sale-asc 按销量排序
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mmall.mall.search($("form").serialize(),function(returnJson){
			 * 	alert(JSON.stringify(returnJson.resultMsg));	
			 * });
			 * ...
			 * @function
			 * { "data": [ { "basicHit": 10000, "basicCategoryId": 900,
			 * "productGood": 0.9, "basicComment": 100, "basicThumbnails":
			 *  "/upload/mall/product/1574///1500458469564.jpg!350x350.jpg",
			 *  "basicTitle": "【鸿星尔克】秋冬儿童新款运动鞋休闲鞋", "id": "9", "productSale":
			 *  99, "productBrand": 1000, "productStock": 100,
			 *  "basicUpdateTime": 1501310573655, "productSpecs":
			 *  "[{\"createBy\":0,\"delFlag\":0,\"img\":\"/upload/mall/product/1574///1500459392916.jpg!60x60.jpg\",\"productId\":15797,\"psId\":33,\"specName\":\"颜色\",\"specValue\":\"粉色\",\"updateBy\":0},{\"createBy\":0,\"delFlag\":0,\"img\":\"/upload/mall/product/1574///1500459395122.jpg!60x60.jpg\",\"productId\":15797,\"psId\":34,\"specName\":\"颜色\",\"specValue\":\"黑色\",\"updateBy\":0},{\"createBy\":0,\"delFlag\":0,\"img\":\"/upload/mall/product/1574///1500459397436.jpg!60x60.jpg\",\"productId\":15797,\"psId\":35,\"specName\":\"颜色\",\"specValue\":\"红色\",\"updateBy\":0}]",
			 *  "productSpecDetails":
			 *  "[{\"code\":\"001\",\"createBy\":0,\"delFlag\":0,\"detailId\":36,\"price\":0.01,\"productId\":15797,\"sale\":0,\"sort\":0,\"specValues\":\"颜色:粉色:/upload/mall/product/1574///1500459392916.jpg!60x60.jpg\",\"stock\":94,\"updateBy\":0},{\"code\":\"002\",\"createBy\":0,\"delFlag\":0,\"detailId\":37,\"price\":0.02,\"productId\":15797,\"sale\":0,\"sort\":0,\"specValues\":\"颜色:黑色:/upload/mall/product/1574///1500459395122.jpg!60x60.jpg\",\"stock\":92,\"updateBy\":0}]",
			 *  "productCostPrice": 509, "productPrice": 293.99,
 			 *  "page": { "pageSize": 1, "currentPage": 0, "totalPage": 2,
			 *  "totalCount": 2 } }
			 * @return {{type:basicTitle}} 商品标题
			 * @return {{type:basicThumbnails}} 商品缩略图
			 * @return {{type:basicCategoryId}} 商品分类id
			 * @return {{type:productSale}} 商品销量
			 * @return {{type:productBrand}} 商品品牌id
			 * @return {{type:basicComment}} 商品评论数
			 * @return {{type:productStock}} 商品库存数
			 * @return {{type:productSpecs}} 商品规格明细
			 * @return {{type:productCostPrice}} 商品原价
			 * @return {{type:productPrice}} 商品现价
			 * @return {{type:pageSize}} 一页显示数量，默认20条
			 * @return {{type:currentPage}} 当前页码
			 * @return {{type:totalPage}} 总页数
			 * @return {{type:totalCount}} 总记录条数
			 */
			search : function(data,func){
				if(validator.isNull(data)){
					ms.alert("必须存在一个搜索条件")
					return;
				}
				ajaxCfg.url = ms.base + "/mmall/search.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg,func)
			},

		},
		//商品信息
		product : {
			/**
			 *商品搜索
			 ------
			 * 通过商品的品牌，所属栏目、规格等进行搜索筛选，还可进行按价格或销量等排序，返回值默认是商品所属列表页，也可以用json获取返回值进行处理。
			 * @callmethod product.search(data,function(returnJson){....});
			 * @param {{type:int,have:true}} category 商品分类id(商品分类id和品牌id必须存在一个)
			 * @param {{type:int,have:true}} brand 品牌id
			 * @param {{type:string}} spec 规格筛选： 多个规格筛选用","分割,相同规格多选用@分割。如 spec=尺寸:1寸@2寸,形状:圆形
			 * @param {{type:string}} price 按价格排序，格式：min-max, 没有上线或下限可以缺省，没有"-" 表示精确价格筛选。如 &price=0.3-234
			 * @param {{type:string}} dataType 返回的数据类型,默认为html格式，根据模板生成的html页面，json 异步返回json数据，在页面需要获取到Json数据进行操作时可选择为json。如 dataType=json
			 * @param {{type:string}} sort 声明 升序降序  排序字段-方式,不写方式默认降序 desc。如 sort=sale-asc 按销量排序
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples 
			 * ...
			 * mmall.product.search($("form").serialize(),function(returnJson){
			 * 	alert(JSON.stringify(returnJson.resultMsg));	
			 * });
			 * ...
			 * @function
			 * 待补充
			 * @return {{type:function}}  待补充
			 */
			search : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.category) && validator.isNull(newnDataJson.brand)){
					ms.alert("商品分类id和品牌id必须存在一个");
					return;
				};

				ajaxCfg.url = ms.base + "/mall/product/search.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg,func)
			},

			/**
			 *根据商品id获取商品详细数据
			 ------
			 * @callmethod product.getEntity(data,function(returnJson){....});
			 * @param {{type:int,have:true}} productId 商品分类id
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples
			 * ...
			 * mmall.product.getEntity($("form").serialize(),function(returnJson){
			 * 	alert(JSON.stringify(returnJson.resultMsg));	
			 * });
			 * ...
			 * @function
			 * 待补充
			 * @return {{type:function}}  待补充
			 */
			getEntity : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.productId)){
					ms.alert("商品编号不能为空");
					return;
				}else if(!validator.isInt(newnDataJson.productId)){
					ms.alert("商品编号必须为整形");
					return;
				};
				ajaxCfg.url = ms.base + "/mall/product/"+data+"/getEntity.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
			},

			/**
			 *购买了该商品的用户还购买的商品
			 ------
			 * @callmethod product.getOthersPurchase(data,function(returnJson){....});
			 * @param {{type:int,have:true}} productId 商品分类id
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples
			 * ...
			 * mmall.product.getOthersPurchase($("form").serialize(),function(returnJson){
			 * 	alert(JSON.stringify(returnJson.resultMsg));	
			 * });
			 * ...
			 * @function
			 * [{
			 * 	code:"06980000"
			 * 	result:true
			 * 	resultMsg:"[
			 * 		{
		     *	 	"basicCategoryId":207,
			 *		"basicPic":"/upload/mall/product/1/\\\\1484905377060.jpg!350x350.jpg",
			 *		"basicTitle":"烟花烫女装气质复古时尚不规则套装 安晴",
			 *		"productBrand":222,
			 *		"productContent":"<p><img src=\"/upload/editor//1484905552184.jpg\" style=\"\" title=\"1484905552184.jpg\"/></p><p><img src=\"/upload/editor//1484905552270.jpg\" style=\"\" title=\"1484905552270.jpg\"/></p><p><img src=\"http://localhost:8181/upload/editor//1484905552201.jpg\" title=\"1484905552201.jpg\" style=\"white-space: normal;\"/></p><p style=\"text-align: center;\"><br/></p>",
			 *		"productCostPrice":506,
			 *		"productId":294,"
			 *		"productLinkUrl":"/203/207\\294.html",
			 *		"productPrice":258,
			 *		}]"
			 *  	}
			 * 	]
			 * }]
			 * @return {{type:basicCategoryId}} 商品分类id
			 * @return {{type:productId}} 商品id
			 * @return {{type:basicPic}} 商品图片
			 * @return {{type:basicTitle}} 商品标题
			 * @return {{type:productBrand}} 商品所属品牌
			 * @return {{type:productContent}} 商品详细内容
			 * @return {{type:productCostPrice}} 商品现价
			 * @return {{type:productPrice}} 商品原价
			 * @return {{type:productLinkUrl}} 商品详细链接
			 */
			getOthersPurchase : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.productId)){
					ms.alert("商品分类id不能为空");
					return;
				};

				ajaxCfg.url = ms.base + "/mall/product/getOthersPurchase.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg,func)
			},
			
		},
		
		//商品评价
		comment : {
			/**
			 * 商品评价列表
			 ------
			 * @callmethod comment.list(data,function(returnJson){....});
			 * @param {{type:int,have:true}} commentBasicId 商品编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples
			 * ...
			 * mmall.comment.list($("form").serialize(),function(returnJson){
			 * 		alert(JSON.stringify(returnJson));	
			 * });
			 * ...
			 * @function
			 * [
			 * {
			 * "ocCommentId":评论编号,
			 * "ocOrderId":订单编号,
			 * "ocImpression":"印象",
			 * "ocProduct":商品符合度,
			 * "ocService":店家服务态度,
			 * "ocLogistics":物流发货速度,
			 * "ocServiceDescribe":"评价服务"
			 * }
			 * ]
			 * @return {{type:ocCommentId}} 评论编号
			 * @return {{type:ocOrderId}} 订单编号
			 * @return {{type:ocImpression}} 印象
			 * @return {{type:ocProduct}} 商品符合度
			 * @return {{type:ocService}} 店家服务态度
			 * @return {{type:ocLogistics}} 物流发货速度
			 * @return {{type:ocServiceDescribe}} 评价服务
			 */
			list : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.commentBasicId)){
					ms.alert("商品编号不能为空");
					return;
				}else if(!validator.isInt(newnDataJson.commentBasicId)){
					ms.alert("商品编号应该为整形");
					return;
				};
				ajaxCfg.url = ms.base + "/mall/orderComment/list.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
			},
			/**
			 * 商品评论汇总
			 ------
			 * @callmethod comment.summar(data,function(returnJson){....});
			 * @param {{type:int,have:true}} commentBasicId 商品编号
			 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			 * @examples
			 * ...
			 * mmall.comment.summar($("form").serialize(),function(returnJson){
			 * 		alert(JSON.stringify(returnJson));	
			 * });
			 * ...
			 * @function
			 * [
			 * {
			 * "commenTcount":评论编号,
			 * "goodRate":好评率,
			 * "goodCount":"好评",
			 * "generalCount":"中评",
			 * "poorCount":"差评"
			 * }
			 * ]
			 * @return {{type:commenTcount}} 评论编号
			 * @return {{type:goodRate}} 好评率
			 * @return {{type:goodCount}} 好评
			 * @return {{type:generalCount}} 中评
			 * @return {{type:poorCount}} 差评
			 */
			summar : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newnDataJson=ms.turnJson(data);
				if(validator.isNull(newnDataJson.commentBasicId)){
					ms.alert("商品编号不能为空");
					return;
				}else if(!validator.isInt(newnDataJson.commentBasicId)){
					ms.alert("商品编号应该为整形");
					return;
				};
				ajaxCfg.url = ms.base + "/mall/orderComment/summar.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
			}
		},

		//商品印象
		impression : {
			/**
			* 获取商品印象
				------
			* @callmethod productImpression.get(data,function(json){...});
			* @param {{type:string,have:true}} piBasicId 商品编号
			* @param {{type:string,have:true}} piId 印象自增长编号
			* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
			* @examples 
			* ...
			* mmall.productImpression.get($("form").serialize(),function(returnJson){
			*	alert(JSON.stringify(returnJson));
			* });
			* ...
			* @function
			* [
			* {
			* "piId":自增长编号,
			* "piBasicId":商品编号,
			* "piTitle":"印象",
			* "piPeopleId":添加用户,
			* "piAmount":数量,
			* "piDatetime":"添加时间"
			* }
			* ]
		 	* @return{{type:piId}} 自增长编号
			* @return{{type:piBasicId}} 商品编号
			* @return{{type:piTitle}} 印象
			* @return{{type:piPeopleId}} 添加用户
			* @return{{type:piAmount}} 数量
			* @return{{type:piDatetime}} 添加时间
			*/
			get : function(data,func){
				if(validator.isNull(data)){
					return;
				}
				var newDataJson = ms.turnJson(data);
				if (validator.isNull(newDataJson.piBasicId)){
					ms.alert("商品编号不能为空");
					return;
				} else if (!validator.isInt(newDataJson.piBasicId)){
					ms.alert("商品编号必须为整数");
					return;
				}
				if (validator.isNull(newDataJson.piId)){
					ms.alert("印象自增长编号不能为空");
					return;
				} else if (!validator.isInt(newDataJson.piId)){
					ms.alert("印象自增长编号必须为整数");
					return;
				}
				ajaxCfg.url = ms.base + "/mall/productImpression/get.do";
				ajaxCfg.params = data;
				ms.ajax(ajaxCfg, func);
			},
		},
		people : {
			mall : {
				//商品收藏
				attention:{
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
					save:function(data,func){
						if (validator.isNull(data)){
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.basicAttentionBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
							ms.alert("商品编号应该为整型");
							return;
						};
						if(validator.isNull(newDataJson.basicAttentionType)){
							ms.alert("关注类型不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/attention/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
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
					isExists : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.basicAttentionBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.basicAttentionBasicId)){
							ms.alert("商品编号为整型");
							return;
						};
						if(validator.isNull(newDataJson.basicAttentionType)){
							ms.alert("关注类型不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/attention/isExists.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
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
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.basicId)){
							ms.alert("basicId不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.basicId.split(",");
						for (var index = 0; index < newDataJson.basicId.length; index++) {
							if(newDataJson.basicId[index] === ','){
								dotNum++;
							}
						}
						if (dotNum >= idArray.length){
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/attention/delete.do";
						ajaxCfg.params = data ;
						ms.ajax(ajaxCfg, func);	
					},
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
					list : function(data,func){
						if (validator.isNull(data)){
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.basicAttentionType)){
							ms.alert("列表的类型不能为空");
							return;
						}
						if(validator.isNull(newDataJson.pageNo)){
							ms.alert("页码不能为空");
							return;
						}else if(!validator.isInt(newDataJson.pageNo)){
							ms.alert("页码应为整型");
							return;
						}
						if(validator.isNull(newDataJson.pageSize)){
							ms.alert("分页数量不能为空");
							return;
						}else if(!validator.isInt(newDataJson.pageSize)){
							ms.alert("分页数量应为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/attention/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				},

				//购物车
				cart : {
					/**
					* 购物车商品列表
					------
					* @callmethod people.mall.cart.list(function(returnJson){...});
					* @param {{type:string}}  cartIds 购物车编号，多个用","隔开
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.cart.list(function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* [
					*	{"cartDiscount": 折扣,
					*	"cartId": 自增长编号,
					*	"cartNum": 数量,	
					*	"cartPrice": 价格,
					*	"cartThumbnail": "缩略图", 
					*	"cartTime": "添加日期", 
					*	"cartTitle": "标题"
					*	}
					*	]
					* @return {{type:cartDiscount}} 折扣
					* @return {{type:cartId}} 自增长编号
					* @return {{type:cartNum}} 数量
					* @return {{type:cartPrice}} 价格
					* @return {{type:cartThumbnail}} 缩略图
					* @return {{type:cartTime}} 添加日期
					* @return {{type:cartTitle}} 标题
					*/
					list : function(data,func){
						ajaxCfg.url = ms.base + "/people/mall/order/cart/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 加入购物车
					------
					* 添加到购物车，如果购物车内已经存在一样的信息，系统会只更新相同信息的数量
					* @callmethod people.mall.cart.save(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartId 购物车编号
					* @param {{type:string,have:true}} cartBasicId 信息编号
					* @param {{type:int,have:true}} cartNum 数量
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.cart.save($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartBasicId)){
							ms.alert("信息编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("信息编号必须为整型");
							return;
						}

						if (validator.isNull(newDataJson.cartNum)){
							ms.alert("商品数量不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartNum)){
							ms.alert("商品数量必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/order/cart/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 删除购物车中的商品
					------
					* 当执行单个删除时直接在地址中传入ID即可
					* 当执行批量删除时多个cartId直接用逗号隔开,id=1,2,3,45,
					* @callmethod people.mall.cart.del(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartIds 购物车编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.cart.del($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					del : function(data,func){
						if (validator.isNull(data)){
							ms.alert("购物车编号不能为空");
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartIds)){
							ms.alert("购物车编号不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.cartIds.split(",");
						for (var index = 0; index < newDataJson.cartIds.length; index++) {
							if(newDataJson.cartIds[index] === ','){
								dotNum++;
							}
						}
						if (dotNum >= idArray.length){
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/order/cart/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 更新购物车
					------
					* 只能更新购物车的数量
					* @callmethod people.mall.cart.update(data,function(returnJson){...});
					* @param {{type:string,have:true}} cartId 购物车编号
					* @param {{type:string,have:true}} cartBasicId 信息编号
					* @param {{type:int,have:true}} cartNum 数量
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.cart.update($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					* @return {{type:code}} 错误编码
					* @return {{type:result}} true成功、false失败
					* @return {{type:resultMsg}} 提示信息
					*/
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartId)){
							ms.alert("购物车编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartId)){
							ms.alert("购物车编号必须为整型");
							return;
						}
						if (validator.isNull(newDataJson.cartBasicId)){
							ms.alert("信息编号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("信息编号必须为整型");
							return;
						}
						if (validator.isNull(newDataJson.cartNum)){
							ms.alert("商品数量不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.cartNum)){
							ms.alert("商品数量必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/order/cart/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				},

				//订单
				order : {
					/**
					* 订单详情
					------
					* @callmethod people.mall.order.datail(data,function(returnJson){...});
					* @param {{type:strings,have:true}} orderNo 订单号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.datail($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* [
					* {
					* "orderUserName":"收货人",
					* "orderPhone":"联系电话",
					* "orderAddress":"收货地址",
					* "orderDescription":"订单描述留言",
					* "orderExpress":快递方式,
					* "orderExpressTitle":快递派送描述,
					* "orderInvoiceName":发票抬头,
					* "orderInvoiceDefinite":发票明细,
					* "orderInvoiceType":发票类型,
					* "orderPayment":支付方式,
					* "orderStatus":订单状态-数值,
					* "orderExpressInfo":订单物流信息
					* }
					* ]
					* @return {{type:orderUserName}} 收货人
					* @return {{type:orderPhone}} 联系电话
					* @return {{type:orderAddress}} 收货地址
					* @return {{type:orderDescription}} 订单描述留言
					* @return {{type:orderExpress}} 快递方式
					* @return {{type:orderExpressTitle}} 快递派送描述
					* @return {{type:orderInvoiceName}} 发票抬头
					* @return {{type:orderInvoiceDefinite}} 发票明细
					* @return {{type:orderInvoiceType}} 发票类型
					* @return {{type:orderPayment}} 支付方式
					* @return {{type:orderStatus}} 订单状态－数值
					* @return {{type:orderExpressInfo}} 订单物流信息
					*/
					detail: function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderNo)){
							ms.alert("订单号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.orderNo)){
							ms.alert("订单号应为整型");
							return;
						};			
						ajaxCfg.url = ms.base + "/people/mall/order/detail.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 删除订单
					------
					* 删除订单，只能删除交易已完成与交易关闭的订单
					* @callmethod people.mall.order.del(data,function(returnJson){...});
					* @param {{type:strings,have:true}} orderNo 订单号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.del($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {result:"true｜false"}
					* @return {{type:result}} true成功、false失败
					*/
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderNo)){
							ms.alert("订单号不能为空");
							return;
						}
						if (!validator.isInt(newDataJson.orderNo)){
							ms.alert("订单号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/order/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 提交订单
					 ------
					 * @callmethod people.mall.order.submit(data,function(returnJson){...});
					 * @param {{type:string,have:true}} borderUserName 收货人
					 * @param {{type:string,have:true}} orderPhone 联系电话
					 * @param {{type:string,have:true}} orderAddress 收货地址
					 * @param {{type:string}} orderDescription 订单描述留言
					 * @param {{type:string,have:true}} orderExpress 快递方式
					 * @param {{type:string,have:true}} orderPayment 支付方式
					 * @param {{type:string,have:true}} orderStatus 订单状态
					 * @param {{type:string,have:true}} cartIds 购物车编号
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mpeople.people.mall.order.submit($("form").serialize(),function(returnJson){
	  	      		 *		alert(JSON.stringify(returnJson));
	  	    		 *	})
	  	    		 *...
	  	    		 * @function 
	  	    		 * 无
					 */
					submit : function(data,func){
						if (validator.isNull(data)){
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderUserName)){
							ms.alert("收货人姓名不能为空");
							return;
						};
						if(validator.isNull(newDataJson.orderPhone)){
							ms.alert("联系电话不能为空");
							return;
						}else if(!validator.isMobilePhone(newDataJson.orderPhone,'zh-CN')){
							ms.alert("请输入正确的电话");
							return;
						};
						if(validator.isNull(newDataJson.orderAddress)){
							ms.alert("收货地址不能为空");
							return;
						};
						if(validator.isNull(newDataJson.orderExpress)){
							ms.alert("快递方式不能为空");
							return;
						};
						if(validator.isNull(newDataJson.orderPayment)){
							ms.alert("支付方式不能为空");
							return;
						};
						if(validator.isNull(newDataJson.orderStatus)){
							ms.alert("订单状态不能为空");
							return;
						};
						if(validator.isNull(newDataJson.cartIds)){
							ms.alert("购物车编号不能为空");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newDataJson.cartIds.split(",");
						for (var index = 0; index < newDataJson.cartIds.length; index++) {
							if(newDataJson.cartIds[index] === ','){
								dotNum++;
							}
						}
						if (dotNum >= idArray.length){
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/order/submit.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**确认收货
					------
					*/
					confirm : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderNo)){
							ms.alert("订单号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.orderNo)){
							ms.alert("订单号应为整型");
							return;
						};			
						ajaxCfg.url = ms.base + "/people/mall/order/confirm.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 关闭订单
					------
					* 关闭订单，只能关闭未支付订单
					* @callmethod people.mall.order.close(data,function(returnJson){...});
					* @param {{type:strings,have:true}} orderNo 订单号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.close($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* {result:"true｜false"}
					* @return {{type:result}} true成功、false失败
					*/
					close: function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderNo)){
							ms.alert("订单号不能为空");
							return;
						}else if(!validator.isInt(newDataJson.orderNo)){
							ms.alert("订单号应为整型");
							return;
						};			
						ajaxCfg.url = ms.base + "/people/order/close.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 订单信息
					------
					* 订单信息，主要用户核对购物车订单信息
					* @callmethod people.mall.order.info(data,function(returnJson){...});
					* @param {{type:strings,have:true}} cartId 购物车编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.info($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function 
					* { 
					*	"cartDiscount": 折扣, 
					*	"cartId": 自增长编号, 
					*	"cartNum": 数量, 
					*	"cartPrice": 价格, 
					*	"cartThumbnail": "缩略图", 
					*	"cartTime": "添加日期", 
					*	"cartTitle": "标题"
					* }
					* @return {{type:cartDiscount}} 折扣
					* @return {{type:cartId}} 自增长编号
					* @return {{type:cartNum}} 数量
					* @return {{type:cartPrice}} 价格
					* @return {{type:cartThumbnail}} 缩略图
					* @return {{type:cartTime}} 添加日期
					* @return {{type:cartTitle}} 标题
					*/
					info: function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.cartId)){
							ms.alert("购物车编号不能为空");
							return;
						};			
						ajaxCfg.url = ms.base + "/people/order/info.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					* 订单列表
					------
					* 订单列表，主要用户核对购物车订单列表信息
					* @callmethod people.mall.order.list(data,function(returnJson){...});
					* @param {{type:strings,have:true}} orderStatus  订单状态
					* @param {{type:strings,have:true}} orderExpress 配送方式
					* @param {{type:strings,have:true}} orderPayment 支付方式
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.order.list($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function {
					* [ {
					* "orderId": 订单自增长编号,
					* "orderPeopleId": 用户编号, 
					* "orderNo": "订单号", 
					* "orderTime": "下单日期",
					* "orderPrice": 订单金额, 
					* "orderUserName": "收货人", 
					* "orderPhone": "联系电话", 
					* "orderAddress": "收货地址", 
					* "orderDescription": "订单描述留言", 
					* "orderExpress": 快递方式, 
					* "orderExpressTitle": 快递方式-送货上门, 
					* "orderPayment": 支付方式－数值, 
					* "orderPaymentTitle": "支付方式－面付", 
					* "orderStatus": 订单状态－数值, 
					* "orderStatusTitle": "订单状态－已付款", 
					* "orderCategoryId": 订单分类－平台自定义, 
					* "orderModelId": 所属模块-平台自定义, 
					* "peopleUser": {
					* "peopleUserIcon": "头像", 
					* "peopleUserNickName": "昵称", 
					* "peopleUserRealName": "真实姓名", 
					* }
					* "goods": [
					* {
					* "goodsBasicId": 信息编号, 
					* "goodsName": "标题", 	
					* "goodsNum": 数量, 
					* "goodsPrice": 价格, 
					* "goodsRebate": 折扣, 
					* "goodsThumbnail": "缩略图", 
					* }
					* ]
					* }]
					* }
					* @return {{type:orderId}} 订单自增长编号
					* @return {{type:orderPeopleId}} 用户编号
					* @return {{type:orderNo}} 订单号
					* @return {{type:orderTime}} 下单日期
					* @return {{type:orderPrice}} 订单金额 
					* @return {{type:orderUserName}} 收货人
					* @return {{type:orderPhone}} 联系电话
					* @return {{type:orderAddress}} 收货地址
					* @return {{type:orderDescription}} 订单描述留言
					* @return {{type:orderExpress}} 快递方式
					* @return {{type:orderExpressTitle}} 快递方式-送货上门
					* @return {{type:orderPayment}} 支付方式-数值
					* @return {{type:orderPaymentTitle}} 支付方式－面付
					* @return {{type:orderStatus}} 订单状态-数值
					* @return {{type:orderStatusTitle}} 订单状态－已付款
					* @return {{type:orderCategoryId}} 订单分类－平台自定义
					* @return {{type:orderModelId}} 所属模块-平台自定义
					* @return {{type:peopleUserIcon}} 头像
					* @return {{type:peopleUserNickName}} 昵称
					* @return {{type:peopleUserRealName}} 真实姓名
					* @return {{type:goodsBasicId}} 信息编号
					* @return {{type:goodsName}} 标题
					* @return {{type:goodsNum}} 数量
					* @return {{type:goodsPrice}} 价格
					* @return {{type:goodsThumbnail}} 缩略图
					**/
					list : function(data,func){
						if (validator.isNull(data)){  
							return;
						};
						//将data参数转json
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.orderStatus) && validator.isNull(newDataJson.orderExpress) && validator.isNull(newDataJson.orderPayment)){
							ms.alert("订单状态，配送方式，支付方式中至少有一个不为空");
							return;
						}
						
						if (!validator.isNull(newDataJson.orderStatus)){
							if(!validator.isInt(newDataJson.orderStatus)){
								ms.alert("订单状态为整型");
								return;
							}
						}
						if (!validator.isNull(newDataJson.orderExpress)){
							if(!validator.isInt(newDataJson.orderExpress)){
								ms.alert("配送方式为整型");
								return;
							}
						}
						if (!validator.isNull(newDataJson.orderPayment)){
							if(!validator.isInt(newDataJson.orderPayment)){
								ms.alert("支付方式为整型");
								return;
							}
						}
						ajaxCfg.url = ms.base + "/people/mall/order/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				},

				//商品评论
				comment : {
					/**
					 * 删除评论
					 ------
					 * ocCommentId:多个ocCommentId直接用逗号隔开,例如ocCommentId=1,2,3,4 批量删除订单评价
					 * @callmethod people.mall.comment.del(data,function(returnJson){....});
					 * @param {{type:int,have:true}} ocCommentId 评论编号
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples
					 * ...
					 * mmall.people.mall.comment.del($("form").serialize(),function(returnJson){
					 *		alert(JSON.stringify(data,returnJson));	
					 *});
					 * ...
					 * @function
					 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					 *@return {{type:code}} 错误编码
					 *@return {{type:result}} true 成功、false 失败
					 *@return {{type:resultMsg}} 错误信息
					 */
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						};
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.ocCommentId)){
							ms.alert("评论编号不能为空");
							return;
						};
						if(!validator.isInt(newnDataJson.ocCommentId)){
							ms.alert("评论编号应该为整形");
							return;
						}
						var idArray = new Array;
						var dotNum = 0;
						idArray = newnDataJson.ocCommentId.split(",");
						for(var index = 0; index<newnDataJson.ocCommentId.length; index++) {
							if(newnDataJson.ocCommentId[index] === ",") {
								dotNum++;
							}
						}
						if(dotNum >= idArray.length) {
							ms.alert("输入参数格式有误");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/orderComment/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 评论列表
					 ------
					 * @callmethod people.mall.comment.list(data,function(returnJson){....});
					 * @param {{type:int,have:true}} commentBasicId 商品编号
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples
					 * ...
					 * mmall.people.mall.comment.list($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					list : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.commentBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if(!validator.isInt(newnDataJson.commentBasicId)){
							ms.alert("商品编号应该为整形");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 *保存评论
					 ------
					 * @callmethod people.mall.comment.save(data,function(returnJson){....});
					 * @param {{type:int,have:true}} commentBasicId 商品编号
					 * @param {{type:int,have:true}} ocOrderId 订单编号
					 * @param {{type:string,have:true}} ocImpression 印象
					 * @param {{type:string,have:true}} ocProduct 商品符合度
					 * @param {{type:string,have:true}} ocService 店家服务态度
					 * @param {{type:string,have:true}} ocLogistics 物流发货速度
					 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples
					 * ...
					 * mmall.people.mall.comment.save($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						} 
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.commentBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if(!validator.isInt(newnDataJson.commentBasicId)){
							ms.alert("商品编号应该为整形");
							return;
						};
						if(validator.isNull(newnDataJson.ocOrderId)){
							ms.alert("订单编号不能为空");
							return;
						};						
						if(validator.isNull(newnDataJson.commentContent)){
							ms.alert("评论内容不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocImpression)){
							ms.alert("印象不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocProduct)){
							ms.alert("商品符合度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocService)){
							ms.alert("店家服务态度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocLogistics)){
							ms.alert("物流发货速度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocServiceDescribe)){
							ms.alert("评价服务不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 *更新评论
					 ------
					 * @callmethod people.mall.comment.update(data,function(returnJson){....});
					 * @param {{type:int,have:true}} ocCommentId 评论编号
					 * @param {{type:int,have:true}} ocOrderId 订单编号
					 * @param {{type:string,have:true}} ocImpression 印象
					 * @param {{type:string,have:true}} ocProduct 商品符合度
					 * @param {{type:string,have:true}} ocService 店家服务态度
					 * @param {{type:string,have:true}} ocLogistics 物流发货速度
					 * @param {{type:string,have:true}} ocServiceDescribe 评价服务
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples
					 * ...
					 * mmall.people.mall.comment.update($("form").serialize(),function(returnJson){
					 * 		alert(JSON.stringify(returnJson));	
					 * });
					 * ...
					 * @function
					 * [
					 * {
					 * "ocCommentId":评论编号,
					 * "ocOrderId":订单编号,
					 * "ocImpression":"印象",
					 * "ocProduct":商品符合度,
					 * "ocService":店家服务态度,
					 * "ocLogistics":物流发货速度,
					 * "ocServiceDescribe":"评价服务"
					 * }
					 * ]
					 * @return {{type:ocCommentId}} 评论编号
					 * @return {{type:ocOrderId}} 订单编号
					 * @return {{type:ocImpression}} 印象
					 * @return {{type:ocProduct}} 商品符合度
					 * @return {{type:ocService}} 店家服务态度
					 * @return {{type:ocLogistics}} 物流发货速度
					 * @return {{type:ocServiceDescribe}} 评价服务
					 */
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newnDataJson=ms.turnJson(data);
						if(validator.isNull(newnDataJson.ocImpression)){
							ms.alert("印象不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocProduct)){
							ms.alert("商品符合度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocService)){
							ms.alert("店家服务态度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocLogistics)){
							ms.alert("物流发货速度不能为空");
							return;
						};
						if(validator.isNull(newnDataJson.ocServiceDescribe)){
							ms.alert("评价服务不能为空");
							return;
						};
						ajaxCfg.url = ms.base + "/people/mall/orderComment/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
				},

				//商品印象
				impression : {
					/**
					* 获取商品印象
					------
					* @callmethod people.mall.impression.get(data,function(json){...});
					* @param {{type:string,have:true}} piBasicId 商品编号
					* @param {{type:string,have:true}} piId 印象自增长编号
					* @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					* @examples 
					* ...
					* mmall.people.mall.impression.get($("form").serialize(),function(returnJson){
					*	alert(JSON.stringify(returnJson));
					* });
					* ...
					* @function
					* [
					* {
					* "piId":自增长编号,
					* "piBasicId":商品编号,
					* "piTitle":"印象",
					* "piPeopleId":添加用户,
					* "piAmount":数量,
					* "piDatetime":"添加时间"
					* }
					* ]
				 	* @return{{type:piId}} 自增长编号
					* @return{{type:piBasicId}} 商品编号
					* @return{{type:piTitle}} 印象
					* @return{{type:piPeopleId}} 添加用户
					* @return{{type:piAmount}} 数量
					* @return{{type:piDatetime}} 添加时间
					*/
					get : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						} else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整数");
							return;
						}
						if (validator.isNull(newDataJson.piId)){
							ms.alert("印象自增长编号不能为空");
							return;
						} else if (!validator.isInt(newDataJson.piId)){
							ms.alert("印象自增长编号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/get.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 保存商品印象
					  ------
					 * @callmethod people.mall.impression.save(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:string,have:true}} piTitle 印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.impression.save($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piBasicId":商品编号,
					 * "piTitle":"印象",
					 * "piDatatime":"时间",
					 * "piId":自增长编号,
					 * "piPeopleId":添加用户
					 * }
					 * ]
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 * @return{{type:piDatatime}} 时间
					 * @return{{type:piId}} 自增长编号
					 * @return{{type:piPeopleId}} 添加用户
					 */
					save : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if(validator.isNull(newDataJson.piBasicId)) {
							ms.alert("商品编号不能为空");
							return;
						} else if(!validator.isInt(newDataJson.piBasicId)) {
							ms.alert("商品编号必须为整数");
							return;
						}
						if(validator.isNull(newDataJson.piTitle)) {
							ms.alert("印象不能为空");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/save.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);
					},
					/**
					 * 删除商品印象
					  -----
					 * @callmethod people.mall.impression.delete(data,function(json){...});
					 * @param {{type:string,have:true}} piId 自增长编号 批量删除商品印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.impression.del($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * {code:"错误编码",result:"true｜false",resultMsg:"错误信息"}
					 * @return{{type:code}} 错误编码
					 * @return{{type:result}} true 成功、false失败
					 * @return{{type:resultMsg}} 错误信息
					 */
					del : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piId)){
							ms.alert("印象编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.cartBasicId)){
							ms.alert("印象编号必须为整型");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/delete.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 更新商品印象
					  -----
					 * @callmethod people.mall.impression.update(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:string,have:true}} piTitle 印象
					 * @param {{type:function,have:true}}  回调方法 返回值（returnJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.impression.update($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piBasicId":商品编号,
					 * "piTitle":"印象"
					 * }
					 * ]
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 */
					update : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整型");
							return;
						}
						if(validator.isNull(newDataJson.piTitle)) {
							ms.alert("印象不能为空");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/update.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
					/**
					 * 查询商品印象列表
					  -----
					 * @callmethod people.mall.impression.list(data,function(json){...});
					 * @param {{type:string,have:true}} piBasicId 商品编号
					 * @param {{type:function,have:true}}  回调方法 返回值（returJson）
					 * @examples 
					 * ...
					 * mmall.people.mall.impression.list($("form").serialize(),function(returnJson){
					 *	alert(JSON.stringify(returnJson));
					 * }); 
					 * ...
					 * @function
					 * [
					 * {
					 * "piId":自增长编号,
					 * "piBasicId":商品编号,
					 * "piTitle":"印象",
					 * "piPeopleId":添加用户,
					 * "piAmount":数量,
					 * "piDatetime":"添加时间"
					 * }
					 * ]
					 * @return{{type:piId}} 自增长编号
					 * @return{{type:piBasicId}} 商品编号
					 * @return{{type:piTitle}} 印象
					 * @return{{type:piPeopleId}} 添加用户
					 * @return{{type:piAmount}} 数量
					 * @return{{type:piDatetime}} 添加时间
					 */
					list : function(data,func){
						if(validator.isNull(data)){
							return;
						}
						var newDataJson = ms.turnJson(data);
						if (validator.isNull(newDataJson.piBasicId)){
							ms.alert("商品编号不能为空");
							return;
						}else if (!validator.isInt(newDataJson.piBasicId)){
							ms.alert("商品编号必须为整数");
							return;
						}
						ajaxCfg.url = ms.base + "/people/mall/productImpression/list.do";
						ajaxCfg.params = data;
						ms.ajax(ajaxCfg, func);	
					},
				},
			},
		},
	}
});