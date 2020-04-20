
import Customer from './Customer.js';

class Manager {
  constructor() {

  }
  //search
  findCustomerId(userData, name) {
     let matchedUser = userData.find(
       user => name === user.name
     )
     if(matchedUser === undefined) {
       return null
     }
     return matchedUser.id
  }
}



export default Manager;
