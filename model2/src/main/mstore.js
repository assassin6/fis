import _mstore from "../mstore/mstore";
import _people from "../mstore/people/people";
import Base from "../Base";
const mstore = new _mstore();
const people = new _people();
export default class Mstore extends Base {
  constructor() {
    super();
    this.mstore = mstore;
    this.people = people;
    this.people.people = people;
  }
  setBaseUrl(str) {
    super.setBaseUrl(str)
    people.setBaseUrl(str);
    mstore.setBaseUrl(str);
  }
  isDebugMode(str){
    super.isDebugMode(str)
    people.isDebugMode(str);
    mstore.isDebugMode(str);
  }
}
window.mstore = new Mstore();
