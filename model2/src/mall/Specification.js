import Base from '../Base'
import { post, get, put, patch } from '../Http'
export default class Specification extends Base {
    constructor() {
        super()
    }
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
    list(productId, onSelect, func) {

        if (!validator.isNull("" + productId)) {
            if (!validator.isInt(productId)) {
                super.alert("商品id必须为整型");
                return;
            }
        } else {
            super.alert("商品id不能为空");
        }
        g_container = $("body");
        var areaTmpl = g_container.find("*[data-specs='ms-specs-area']");
        //areaTmpl.hide();
        areaTmpl.find("*[data-specs='ms-specs-key']").text("规格");
        areaTmpl.find("*[data-specs='ms-specs-text']").text("加载中...");

        // get(this.baseUrl + "/mall/productSpecification/list" + productId + ".do";
        // .then(func, (err) => {
        //     console.log(err)
        // })
        this.ajaxCfg.url = this.base + "/mall/productSpecification/" + productId + ".do";
        this.ajaxCfg.params = productId;
        super.ajax(this.ajaxCfg, function (json) {
            //var _json = eval("("+ json +")");
            //将规格展现到页面
            initProductSpecs(json);
            //将返回的规格组合用object形式转换
            var specDetails = initSpecDetails(json.productSpecDetails);
            //点击规格组合切换对应规格组价格
            specsVauleClick(g_container, onSelect, specDetails);

        });
        //处理接口返回的规格
        function initProductSpecs(specArr) {
            this.productSpecs = {};
            // 初始化商品规格数据，把相同名字的规格作为键，他的值 为所包含规格值的数组
            // 例如 {"颜色"：["白"，"红"], "尺寸":["S", "M", "L"]}
            for (var i in specArr.productSpecs) {
                var specData = specArr.productSpecs[i];
                var specName = specData.specName;

                if (!this.productSpecs[specName]) {
                    this.productSpecs[specName] = [];
                }
                this.productSpecs[specName].push(specData);
            }

            //将键值进行分开获取并展现到页面
            //需要规定规格区间ms-specs-area，规格键与值ms-specs-key,ms-specs-value及规格图片ms-specs-pic

            for (var key in this.productSpecs) {
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
                specTmpl.attr("data-specs-key", key);
                //循环当前规格组的规格属性值
                for (var i in arr) {

                    //复制规格值并追加到规格值区域
                    var specItem = specTmpl.clone(true);
                    specTmpl.after(specItem);
                    //对应赋值图片和文字
                    var img = specItem.find("*[data-specs='ms-specs-img']");
                    if (arr[i].img != "") {
                        img.attr("src", arr[i].img);
                    } else {
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
            for (var i in arr) {
                var detail = arr[i];
                var valuesStr = detail.specValues;
                var valuesObj = {};

                var valueArr = valuesStr.split(',');
                for (var j in valueArr) {

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
        function specsVauleClick(g_container, onSelect, specDetails) {
            var specValues = {};
            var specObj = g_container.find("*[data-specs='ms-specs-value']");
            var specText = specObj.find("*[data-specs='ms-specs-text']");
            //价格
            var productPrice = $("body").find("*[data-specs='ms-specs-price']");
            var productPriceText = productPrice.text();
            //库存
            var productStock = $("body").find("*[data-specs='ms-specs-stock']");
            var productStockText = productStock.text();

            specObj.click(function () {
                var specKey = $(this).attr("data-specs-key");
                var specValue = $(this).find(specText).text();
                if ($(this).hasClass(onSelect)) {
                    //如果已经选中，那取消选中，并且还原价格和库存
                    $(this).removeClass(onSelect);
                    delete specValues[specKey];
                    if (productPrice.length > 0) {
                        productPrice.text(productPriceText);
                    }
                    if (productStock.length > 0) {
                        productStock.text(productStockText);
                    }
                } else {
                    //如果没有选中，那取消同类其他选中，加上当前选中样式
                    $(this).siblings().removeClass(onSelect);
                    $(this).addClass(onSelect);
                    //找到当前点击的规格名称及规格值

                    specValues[specKey] = specValue;

                    for (var i in specDetails) {
                        if (objEqual(specDetails[i].specValues, specValues)) {
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
        function objEqual(obj1, obj2) {
            var len1 = getObjLength(obj1);
            var len2 = getObjLength(obj2);

            if (len1 != len2) return false;
            for (var i in obj1) {
                if (obj1[i] != obj2[i]) {
                    return false;
                }
            }
            return true;
        }

        // 获取Object长度
        function getObjLength(obj) {
            var c = 0;
            for (var i in obj) {
                c++;
            }
            return c;
        }
    }
    /**
			*获取指定分类标准规格列表
			------
			* 获取商品的标准规格
			*/
    queryByCategoryId(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newnDataJson = super.turnJson(data);
        if (validator.isNull(newnDataJson.categoryId)) {
            super.alert("商品分类ID不能为空");
            return;
        };
        get(this.baseUrl + "/mall/specification/"+newnDataJson.categoryId+".do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/mall/specification/queryByCategoryId.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
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
    detail(data, func) {
        if (validator.isNull(data)) {
            return;
        }
        var newnDataJson = super.turnJson(data);
        if (validator.isNull(newnDataJson.detailId)) {
            super.alert("商品规格编号不能为空");
            return;
        } else if (!validator.isInt(newnDataJson.detailId)) {
            super.alert("商品规格编号必须为整形");
            return;
        };
        get(this.baseUrl + "/mall/specificationDetail/"+newnDataJson.detailId+".do",newnDataJson)
        .then(func, (err) => {
            console.log(err)
        })
        // this.ajaxCfg.url = this.base + "/mall/specificationDetail/" + data + "/get.do";
        // this.ajaxCfg.params = data;
        // super.ajax(this.ajaxCfg, func);
    }
} 