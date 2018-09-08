import _Article from "../mcms/Article";
import _Attention from "../mcms/Attention";
import _Comment from "../mcms/Comment";
import _peopleAttention from "../mcms/people/Attention";
import _peopleComment from "../mcms/people/Comment";
import Base from "../Base";
const article = new _Article();
const attention = new _Attention();
const commemt = new _Comment();
const peopleAttention = new _peopleAttention();
const peopleComment = new _peopleComment();
export default class Mcms extends Base {
  constructor() {
    super();
    this.article = article;
    this.attention = attention;
    this.commemt = commemt;
    this.people = {
      attention: peopleAttention,
      comment: peopleComment
    };
  }
  setBaseUrl(str) {
    super.setBaseUrl(str);
    article.setBaseUrl(str);
    attention.setBaseUrl(str);
    commemt.setBaseUrl(str);
    peopleAttention.setBaseUrl(str);
    peopleComment.setBaseUrl(str);
  }
  isDebugMode(str) {
    super.isDebugMode(str);
    article.isDebugMode(str);
    attention.isDebugMode(str);
    commemt.isDebugMode(str);
    peopleAttention.isDebugMode(str);
    peopleComment.isDebugMode(str);
  }
}
window.mcms = new Mcms();
