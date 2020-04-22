
import Customer from './Customer.js';

class Manager {
  constructor() {
  }

  findCustomerId(userData, name) {
     let matchedUser = userData.find(
       user => name === user.name
     )
     if(matchedUser === undefined) {
       return null
     }
     return matchedUser.id
  }

  findPastCustomerBookings(bookingData, todayDate, id) {
    let customer = new Customer({id});
    return customer.pastBookings(bookingData, todayDate)
  }

  findTodayCustomerBookings(bookingData, todayDate, id) {
    let customer = new Customer({id});
    return customer.presentBookings(bookingData, todayDate)
  }

  findFutureCustomerBookings(bookingData, todayDate, id) {
    let customer = new Customer({id});
    return customer.futureBookings(bookingData, todayDate)
  }
}

export default Manager;
