import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Product extends Base {
	constructor() {
		super()
	}
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
	search(data, func) {
		if (validator.isNull(data)) {
			return;
		}
		var newnDataJson = super.turnJson(data);
		if (validator.isNull(newnDataJson.category) && validator.isNull(newnDataJson.brand)) {
			super.alert("商品分类id和品牌id必须存在一个");
			return;
		};
		post(this.baseUrl + "/mall/product/search.do",newnDataJson)//不改
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mall/product/search.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func)
	}
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
	getEntityF(data, func) {
		if (validator.isNull(data)) {
			return;
		}
		var newnDataJson = super.turnJson(data);
		if (validator.isNull(newnDataJson.productId)) {
			super.alert("商品编号不能为空");
			return;
		} else if (!validator.isInt(newnDataJson.productId)) {
			super.alert("商品编号必须为整形");
			return;
		};
		get(this.baseUrl + "/mall/product/"+newnDataJson.productId+".do",newnDataJson)//mall/product/id.do id=293
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mall/product/" + data + "/getEntity.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func);
	}
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
	getOthersPurchase(data, func) {
		if (validator.isNull(data)) {
			return;
		}
		var newnDataJson = super.turnJson(data);
		if (validator.isNull(newnDataJson.productId)) {
			super.alert("商品分类id不能为空");
			return;
		};
		get(this.baseUrl + "/mall/product/list/"+newnDataJson.productId+".do",newnDataJson)//mall/product/list/id.do id=1
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mall/product/getOthersPurchase.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func)
	}
}