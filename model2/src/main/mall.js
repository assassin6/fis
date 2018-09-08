import _peopleAttention from '../mall/people/Attention'
import _peopleCart from '../mall/people/Cart'
import _peopleComment from '../mall/people/Comment'
import _peopleImpression from '../mall/people/Impression'
import _peopleOrder from '../mall/people/Order'
import _Brand from '../mall/Brand'
import _Comment from '../mall/Comment'
import _Impression from '../mall/Impression'
import _Mall from '../mall/Mall'
import _Product from '../mall/Product'
import _Specification from '../mall/Specification'
import Base from '../Base'
const peopleAttention = new _peopleAttention()
const peopleCart = new _peopleCart()
const peopleComment = new _peopleComment()
const peopleImpression = new _peopleImpression()
const peopleOrder = new _peopleOrder()
const brand = new _Brand()
const comment = new _Comment()
const impression = new _Impression()
const mall = new _Mall()
const product = new _Product()
const specification = new _Specification()
export default class Mall extends Base{
    constructor() {
        super()
        this.brand=brand
        this.people={
            attention:peopleAttention,
            cart:peopleCart,
            comment:peopleComment,
            impression:peopleImpression,
            order:peopleOrder

        }
        this.comment=comment
        this.impression=impression
        this.mall=mall
        this.product=product
        this.specification=specification
    }
    setBaseUrl(str){
        super.setBaseUrl(str)
        brand.setBaseUrl(str)
        comment.setBaseUrl(str)
        impression.setBaseUrl(str)
        mall.setBaseUrl(str)
        product.setBaseUrl(str)
        specification.setBaseUrl(str)
        peopleAttention.setBaseUrl(str)
        peopleCart.setBaseUrl(str)
        peopleComment.setBaseUrl(str)
        peopleImpression.setBaseUrl(str)
        peopleOrder.setBaseUrl(str)
    }
    isDebugMode(str){
        super.isDebugMode(str)
        brand.isDebugMode(str)
        comment.isDebugMode(str)
        impression.isDebugMode(str)
        mall.isDebugMode(str)
        product.isDebugMode(str)
        specification.isDebugMode(str)
        peopleAttention.isDebugMode(str)
        peopleCart.isDebugMode(str)
        peopleComment.isDebugMode(str)
        peopleImpression.isDebugMode(str)
        peopleOrder.isDebugMode(str)
    }
}
window.mall = new Mall()