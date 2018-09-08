import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Mall extends Base {
	constructor() {
		super()
	}
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
	search(data, func) {
		if (validator.isNull(data)) {
			super.alert("必须存在一个搜索条件")
			return;
		}
		post(this.baseUrl + "/mmall/search.do",data)
        .then(func, (err) => {
            console.log(err)
        })
		// this.ajaxCfg.url = this.base + "/mmall/search.do";
		// this.ajaxCfg.params = data;
		// super.ajax(this.ajaxCfg, func)
	}
}