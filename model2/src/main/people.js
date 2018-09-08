import _people from '../people/People'
import _peopleAddress from '../people/people/Address'
import _peopleBasic from '../people/people/Basic'
import _peopleUser from '../people/people/User'
import Base from '../Base'
const people = new _people()
const peopleAddress =new _peopleAddress()
const peopleBasic = new _peopleBasic()
const peopleUser = new _peopleUser()
export default class People_ extends Base{
    constructor(){
        super()
        this.people=people
        this.people.address=peopleAddress
        this.people.basic=peopleBasic
        this.people.user=peopleUser
    }
    setBaseUrl(str){
        super.setBaseUrl(str)
        people.setBaseUrl(str)
        peopleAddress.setBaseUrl(str)
        peopleBasic.setBaseUrl(str)
        peopleUser.setBaseUrl(str)
    }
    isDebugMode(str){
        super.isDebugMode(str)
        people.isDebugMode(str)
        peopleAddress.isDebugMode(str)
        peopleBasic.isDebugMode(str)
        peopleUser.isDebugMode(str)
    }
}

window.people=new People_()