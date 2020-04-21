let domUpdates = {

  showTodayBookings(customer, bookingData, today) {
  return customer.presentBookings(bookingData, today);
},

  showFutureBookings(customer, bookingData, today) {
    return customer.futureBookings(bookingData, today);
  },

  showPastBookings(customer, bookingData, today) {
    return customer.pastBookings(bookingData, today);
  },

  showCustomerAmountSpent(customer, bookingData, today) {
    return customer.getTotalSpent(bookingData, roomData);
  }
}
export default domUpdates
